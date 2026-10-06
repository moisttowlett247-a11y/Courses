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
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// AI Archmage Hints Endpoint
app.post('/api/ai/hint', async (req, res) => {
  try {
    const { trackTitle, lessonTitle, theory, instructions, currentCode, testResults, language } = req.body;
    
    if (!ai) {
      return res.json({
        hint: "💡 Tip: Double-check your edge cases and return types. Verify that your variables and logic match the required function signature.",
        explanation: "AI Mentor is in offline companion mode."
      });
    }

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      hint: response.text || "Review your return value and edge conditions carefully!",
      success: true
    });
  } catch (err: any) {
    console.error('AI Hint Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate hint' });
  }
});

// AI Error Diagnostics Endpoint
app.post('/api/ai/diagnose', async (req, res) => {
  try {
    const { code, errorMessage, lessonTitle, language } = req.body;

    if (!ai) {
      return res.json({
        diagnosis: "The code encountered a runtime or assertion error. Inspect the traceback and expected vs actual values.",
        success: true
      });
    }

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      diagnosis: response.text || "Inspect the mismatch between expected return and computed output.",
      success: true
    });
  } catch (err: any) {
    console.error('AI Diagnose Error:', err);
    res.status(500).json({ error: err.message || 'Failed to diagnose' });
  }
});

// AI Dynamic Custom Challenge Generator
app.post('/api/ai/generate-quest', async (req, res) => {
  try {
    const { topic, difficulty, language } = req.body;

    if (!ai) {
      return res.json({
        quest: {
          title: `Mastery Challenge: ${topic || 'Concurrency'}`,
          description: `Implement an optimized algorithm for ${topic} in ${language || 'Go'}.`,
          starterCode: `// Implement your solution here\n`,
          testCases: [
            { input: "Sample input", expected: "Sample output" }
          ],
          xp: 150
        }
      });
    }

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ quest: parsed, success: true });
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
