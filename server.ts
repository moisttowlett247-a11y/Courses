import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// Robust Gemini API Invocation with Model Fallback & Heuristic Companion
async function callGeminiWithFallback(prompt: string, isJson: boolean = false): Promise<string | null> {
  if (!ai) return null;

  const models = ['gemini-3.8-flash', 'gemini-flash-latest'];
  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: isJson ? { responseMimeType: 'application/json' } : undefined
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`[Gemini] Model ${model} unavailable: ${err.message || err}`);
    }
  }
  return null;
}

// Intelligent Contextual Heuristic Hint Generator (when Gemini is under 503 high load)
function generateContextualHint(
  trackTitle: string,
  lessonTitle: string,
  language: string,
  instructions: string,
  currentCode: string,
  testResults: any
): string {
  const code = (currentCode || '').trim();
  const lang = (language || '').toLowerCase();

  // 1. Check for unedited starter code
  if (code.includes('pass') && lang.includes('python')) {
    return "🧙‍♂️ *Boots' Arcane Wisdom:* You currently have `pass` occupying your function body. Replace `pass` with your active calculation and a `return` statement!";
  }
  if (code.includes('// TODO') || code.includes('# TODO')) {
    return "🧙‍♂️ *Boots' Arcane Wisdom:* The dungeon blueprint still contains pending `TODO` markers. Review the instructions step-by-step and replace each placeholder with real logic.";
  }

  // 2. Python specific analysis
  if (lang.includes('python')) {
    if (!code.includes('return ') && code.includes('def ')) {
      return "🧙‍♂️ *Boots' Arcane Wisdom:* Your function defines the spell signature, but I don't spot a `return` keyword! Remember that in Python, functions without `return` yield `None` to the caller.";
    }
    if (code.includes('range(len(') && code.includes('- 1')) {
      return "🧙‍♂️ *Boots' Arcane Wisdom:* Beware the classic dungeon off-by-one trap! In Python, `range(n)` already iterates up to index `n - 1`. Subtracting 1 cuts off your last element!";
    }
    if (code.includes('RateLimiter') && !code.includes('self.')) {
      return "🧙‍♂️ *Boots' Arcane Wisdom:* In object-oriented Python, instance variables must be attached to `self` (e.g. `self.client_requests`). Check that your instance methods access state through `self`.";
    }
  }

  // 3. Go specific analysis
  if (lang.includes('go')) {
    if (code.includes('chan ') && !code.includes('close(')) {
      return "🧙‍♂️ *Boots' Arcane Wisdom:* Beware of channel deadlocks! If a consumer uses `for item := range ch`, the loop never halts unless the producer explicitly invokes `close(ch)` after dispatching all items.";
    }
    if (code.includes('func ') && !code.includes('return')) {
      return "🧙‍♂️ *Boots' Arcane Wisdom:* Go compiler strictly requires non-void functions to return their declared types. Ensure all execution branches end with a valid `return`.";
    }
  }

  // 4. SQL specific analysis
  if (lang.includes('sql')) {
    const upper = code.toUpperCase();
    if (upper.includes('JOIN') && !upper.includes(' ON ')) {
      return "🧙‍♂️ *Boots' Arcane Wisdom:* Catastrophic Cartesian explosion averted! Every `JOIN` requires an `ON` clause specifying the foreign key match (e.g., `JOIN orders ON users.id = orders.user_id`).";
    }
    if (!upper.includes('SELECT')) {
      return "🧙‍♂️ *Boots' Arcane Wisdom:* The relational engine is waiting for a `SELECT` statement. Start your query with `SELECT column_names FROM table_name`.";
    }
  }

  // 5. Test results inspection
  if (testResults && typeof testResults === 'object') {
    const str = JSON.stringify(testResults);
    if (str.includes('Expected') && str.includes('Got')) {
      return "🧙‍♂️ *Boots' Arcane Wisdom:* Look closely at the expected vs actual test diff. Ensure return types match (e.g., string vs number) and string capitalizations/punctuation match the exact specification.";
    }
  }

  return `🧙‍♂️ *Boots' Arcane Wisdom:* Focus on "${lessonTitle}". Break down the problem: verify your function inputs, check edge cases (empty collections, boundary limits), and ensure your return value strictly matches the specification!`;
}

// Intelligent Contextual Heuristic Diagnosis
function generateContextualDiagnosis(
  code: string,
  errorMessage: string,
  lessonTitle: string,
  language: string
): string {
  const err = (errorMessage || '').toLowerCase();
  const src = (code || '').trim();

  if (err.includes('deadlock') || err.includes('goroutines are asleep')) {
    return "⚡ **Channel Deadlock Detected:** Goroutines are blocked waiting for values on a channel that will never arrive. Fix this by closing the channel (`close(ch)`) once the producer finishes writing, or using a non-blocking `select`.";
  }

  if (err.includes('syntaxerror') && (err.includes('colon') || err.includes('expected \':\''))) {
    return "⚡ **Syntax Error - Missing Colon:** In Python, statements like `def`, `if`, `else`, `elif`, and `for` must terminate with a colon `:` before the indented block.";
  }

  if (err.includes('expected') && err.includes('got')) {
    return `⚡ **Assertion Failure:** The computed output didn't match the test runner's expected result. Inspect the return type and data structures in your implementation of "${lessonTitle}".`;
  }

  if (err.includes('cannot read properties') || err.includes('undefined')) {
    return "⚡ **Uninitialized Reference:** A variable or object property was accessed before being defined or populated. Verify that your variables are instantiated before accessing their attributes.";
  }

  return `⚡ **Diagnostic Analysis:** The execution encountered an issue: ${errorMessage}. Verify that your parameters, loops, and return statements match the requirements for "${lessonTitle}".`;
}

// AI Archmage Hints Endpoint
app.post('/api/ai/hint', async (req, res) => {
  try {
    const { trackTitle, lessonTitle, instructions, currentCode, testResults, language } = req.body;

    const prompt = `You are Boots the Archmage, a friendly, witty, and deeply knowledgeable senior backend engineering tutor from Boot.dev.
The student is working on an interactive challenge:
Track: ${trackTitle || 'Backend Engineering'}
Lesson: ${lessonTitle || 'Backend Challenge'}
Language: ${language || 'Python/Go/SQL'}

Instructions:
${instructions}

Student's Current Code:
\`\`\`${language}
${currentCode}
\`\`\`

Test results / Output:
${JSON.stringify(testResults, null, 2)}

Provide a structured, helpful, conceptual hint without giving away the exact full solution. Guide their mental model. Keep it concise (2-4 sentences max), punchy, and encouraging with a slight fantasy RPG tutor flavor.`;

    const aiText = await callGeminiWithFallback(prompt);

    if (aiText) {
      return res.json({
        hint: aiText,
        source: 'gemini',
        success: true
      });
    }

    // Heuristic fallback if Gemini is experiencing high demand (503) or offline
    const fallbackHint = generateContextualHint(
      trackTitle || 'Backend Engineering',
      lessonTitle || 'Backend Challenge',
      language || 'Python',
      instructions || '',
      currentCode || '',
      testResults
    );

    res.json({
      hint: fallbackHint,
      source: 'archmage-companion',
      success: true
    });
  } catch (err: any) {
    console.error('AI Hint Error:', err);
    res.json({
      hint: "🧙‍♂️ *Boots' Arcane Wisdom:* Step back and examine the invariants of your algorithm. Check your boundary conditions, variable types, and return values.",
      source: 'offline-companion',
      success: true
    });
  }
});

// AI Error Diagnostics Endpoint
app.post('/api/ai/diagnose', async (req, res) => {
  try {
    const { code, errorMessage, lessonTitle, language } = req.body;

    const prompt = `You are Boots the Archmage backend mentor.
The student ran this ${language || 'code'} in lesson "${lessonTitle}":
\`\`\`${language}
${code}
\`\`\`

Error / Failed Assertion:
${errorMessage}

Explain clearly and concisely in 2-3 sentences:
1. What the error/assertion failure means in plain English.
2. The specific conceptual pitfall (e.g. off-by-one, nil pointer, unclosed transaction, mutable default argument).
Do NOT write out the full replacement code solution; guide them to fix it themselves.`;

    const aiText = await callGeminiWithFallback(prompt);

    if (aiText) {
      return res.json({
        diagnosis: aiText,
        source: 'gemini',
        success: true
      });
    }

    const fallbackDiagnosis = generateContextualDiagnosis(
      code || '',
      errorMessage || '',
      lessonTitle || 'Backend Challenge',
      language || 'Python'
    );

    res.json({
      diagnosis: fallbackDiagnosis,
      source: 'archmage-companion',
      success: true
    });
  } catch (err: any) {
    console.error('AI Diagnose Error:', err);
    res.json({
      diagnosis: `⚡ **Diagnostic Notice:** ${err.message || 'Execution failed.'} Double check function arguments and return types.`,
      source: 'offline-companion',
      success: true
    });
  }
});

// AI Dynamic Custom Challenge Generator
app.post('/api/ai/generate-quest', async (req, res) => {
  try {
    const { topic, difficulty, language } = req.body;

    const prompt = `Generate a Boot.dev style interactive backend coding challenge in JSON format.
Topic: ${topic || 'Data Structures / Concurrency / SQL'}
Difficulty: ${difficulty || 'Medium'} (Easy, Medium, Hard, Legendary Boss)
Language: ${language || 'go'}

Respond strictly with valid JSON conforming to this schema:
{
  "id": "custom-quest-id",
  "title": "Short catchy RPG-themed title",
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "language": "${language}",
  "lore": "1-2 sentences of backend fantasy RPG lore context",
  "instructions": "Clear step-by-step problem specifications",
  "starterCode": "Complete code with function stubs and docstrings/comments",
  "solutionCode": "The full working correct code",
  "tests": [
    {
      "name": "Test Case 1",
      "input": "input representation",
      "expected": "expected output representation"
    }
  ],
  "xpReward": 100,
  "hints": ["Hint 1", "Hint 2"]
}`;

    const aiText = await callGeminiWithFallback(prompt, true);
    if (aiText) {
      try {
        const parsed = JSON.parse(aiText);
        return res.json({ quest: parsed, success: true });
      } catch (e) {
        console.warn('Could not parse Gemini JSON quest, falling back to curated quest');
      }
    }

    // Curated high-octane quest fallback
    const fallbackQuests: Record<string, any> = {
      default: {
        id: `custom-quest-${Date.now()}`,
        title: `The Siege of Port ${topic || '8080'}: Worker Concurrency`,
        topic: topic || 'Concurrency',
        difficulty: difficulty || 'Medium',
        language: language || 'python',
        lore: 'A swarm of demonic HTTP requests descends upon the kingdom gate! You must forge a thread-safe token bucket limiter before buffer overflow consumes the realm.',
        instructions: '1. Create a function `is_request_allowed(tokens_left, cost)`.\n2. Return True if `tokens_left >= cost`, else False.\n3. Deduct cost from remaining tokens when allowed.',
        starterCode: `def is_request_allowed(tokens_left: int, cost: int) -> bool:
    # TODO: Implement token allowance check
    pass
`,
        solutionCode: `def is_request_allowed(tokens_left: int, cost: int) -> bool:
    return tokens_left >= cost
`,
        tests: [
          { name: "is_request_allowed(10, 5) == True", expected: true },
          { name: "is_request_allowed(3, 10) == False", expected: false }
        ],
        xpReward: 120,
        hints: ["Compare tokens_left directly against cost.", "Ensure a boolean True/False is returned."]
      }
    };

    res.json({ quest: fallbackQuests.default, success: true });
  } catch (err: any) {
    console.error('AI Quest Gen Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate quest' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
