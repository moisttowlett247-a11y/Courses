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

// Initialize Google GenAI with recommended telemetry
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ 
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Helper to bound AI latency gracefully
function withTimeout<T>(promise: Promise<T>, ms: number = 3500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('AI request timeout')), ms))
  ]);
}

// Robust Gemini API Invocation with Model Fallback & Heuristic Companion
async function callGeminiWithFallback(prompt: string, isJson: boolean = false): Promise<string | null> {
  if (!ai) return null;

  const models = ['gemini-3.8-flash'];
  for (const model of models) {
    try {
      const response = await withTimeout(
        ai.models.generateContent({
          model,
          contents: prompt,
          config: isJson ? { responseMimeType: 'application/json' } : undefined
        }),
        9000
      );
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`[Gemini] Model ${model} unavailable or timed out: ${err.message || err}`);
    }
  }
  return null;
}

// Comprehensive Autonomous Code Explanation Engine (Universal Course Support)
function generateContextualExplanation(
  code: string,
  lessonTitle: string,
  language: string
): string {
  const lang = (language || '').toLowerCase();
  const trimmed = (code || '').trim();
  const lines = trimmed.split('\n').filter(l => l.trim().length > 0);

  let overview = `🧙‍♂️ **Boots' Architectural Code Breakdown: ${lessonTitle}**\n\n`;

  if (lang.includes('python')) {
    overview += `This Python program implements backend logic for **${lessonTitle}**.\n\n`;
    overview += `### 🧩 Step-by-Step Logic Flow:\n`;
    let step = 1;
    for (const line of lines) {
      const l = line.trim();
      if (l.startsWith('#')) continue;
      if (l.startsWith('def ')) {
        const fnName = l.replace('def ', '').split('(')[0];
        overview += `* **Step ${step++} (Function Definition):** Defines \`${fnName}\`, encapsulating the algorithm for reusable invocation.\n`;
      } else if (l.startsWith('class ')) {
        const className = l.replace('class ', '').split(':')[0].split('(')[0];
        overview += `* **Step ${step++} (Class Blueprint):** Declares class \`${className}\`, encapsulating state and object methods.\n`;
      } else if (l.startsWith('for ') || l.startsWith('while ')) {
        overview += `* **Step ${step++} (Iteration Loop):** Loops through sequential elements to compute aggregations, filter items, or transform data.\n`;
      } else if (l.startsWith('if ') || l.startsWith('elif ') || l.startsWith('else:')) {
        overview += `* **Step ${step++} (Conditional Gate):** Evaluates a boolean branch to route program execution based on specific conditions or edge cases.\n`;
      } else if (l.startsWith('return ')) {
        overview += `* **Step ${step++} (Value Output):** Exits the function, passing the computed result back to the caller.\n`;
      } else if (l.includes('=') && !l.includes('==')) {
        const varName = l.split('=')[0].trim();
        overview += `* **Step ${step++} (State Storage):** Assigns state to variable \`${varName}\` in local memory.\n`;
      }
    }
    overview += `\n### 💡 Key Backend Concepts Demonstrated:\n`;
    overview += `- **Deterministic Return:** Produces reliable output for unit testing assertions.\n`;
    overview += `- **Memory Stack:** Functions create local stack frames that are cleaned up on return.\n`;
    overview += `- **Python Idioms:** Leverages concise syntax with indentation-enforced block scoping.`;
    return overview;
  }

  if (lang.includes('go')) {
    overview += `This Go program structures high-performance concurrent or systems code for **${lessonTitle}**.\n\n`;
    overview += `### 🧩 Step-by-Step Logic Flow:\n`;
    let step = 1;
    for (const line of lines) {
      const l = line.trim();
      if (l.startsWith('//')) continue;
      if (l.startsWith('func ')) {
        const fnName = l.replace('func ', '').split('(')[0];
        overview += `* **Step ${step++} (Go Routine/Function):** Defines strongly typed function \`${fnName}\` with explicit parameter signatures and return types.\n`;
      } else if (l.includes('make(chan')) {
        overview += `* **Step ${step++} (CSP Channel):** Instantiates a typed Go channel for safe inter-goroutine communication without raw mutex locking.\n`;
      } else if (l.startsWith('go ')) {
        overview += `* **Step ${step++} (Goroutine Dispatch):** Spawns a lightweight green thread on the Go runtime scheduler (costing only ~2KB stack memory).\n`;
      } else if (l.includes('sync.WaitGroup') || l.includes('wg.')) {
        overview += `* **Step ${step++} (Concurrency Synchronization):** Uses \`sync.WaitGroup\` coordinates to wait for all parallel worker routines to finish before exiting.\n`;
      } else if (l.startsWith('for ') || l.startsWith('range ')) {
        overview += `* **Step ${step++} (Loop & Range):** Iterates over a slice, map, or channel stream.\n`;
      } else if (l.startsWith('return ')) {
        overview += `* **Step ${step++} (Type-Safe Return):** Returns the strictly typed result satisfying the Go compiler interface.\n`;
      }
    }
    overview += `\n### 💡 Key Go Concurrency Principles:\n`;
    overview += `- **CSP Model:** \"Do not communicate by sharing memory; share memory by communicating.\"\n`;
    overview += `- **Zero Allocation:** Avoids unnecessary pointer chasing and garbage collection overhead.`;
    return overview;
  }

  if (lang.includes('sql')) {
    overview += `This SQL script queries relational tables in a relational database management system (RDBMS) for **${lessonTitle}**.\n\n`;
    overview += `### 🧩 Relational Execution Order:\n`;
    overview += `1. **FROM / JOIN:** Identifies and matches underlying tables and schemas.\n`;
    overview += `2. **WHERE:** Filters individual rows before aggregation to minimize memory scan.\n`;
    overview += `3. **GROUP BY & Aggregations:** Computes group summaries (\`COUNT\`, \`SUM\`, \`AVG\`).\n`;
    overview += `4. **HAVING:** Filters aggregate groups.\n`;
    overview += `5. **SELECT:** Projects only requested columns back over the network.\n`;
    overview += `6. **ORDER BY & LIMIT:** Orders result sets using B-Tree index ordering and caps transmission size.\n\n`;
    overview += `### 💡 Database Optimization Note:\n`;
    overview += `Ensure columns in \`WHERE\` and \`JOIN\` clauses are covered by B-Tree indexes to prevent expensive $O(N)$ sequential table scans!`;
    return overview;
  }

  overview += `This solution implements deterministic logic for **${lessonTitle}**.\n\n`;
  overview += `It accepts inputs, processes state through structured control flow, and returns output matching the test specifications.`;
  return overview;
}

// Comprehensive Autonomous Code Diagnosis Engine (Universal Course Support)
function generateContextualDiagnosis(
  code: string,
  errorMessage: string,
  lessonTitle: string,
  language: string,
  testResults?: any
): string {
  const err = (errorMessage || '').toLowerCase();
  const src = (code || '').trim();
  const lang = (language || '').toLowerCase();

  // Test mismatch extraction
  let expectedDiff = '';
  if (testResults && typeof testResults === 'object') {
    const failedTest = testResults.testResults?.find((t: any) => !t.passed);
    if (failedTest) {
      expectedDiff = `\n- **Expected:** \`${JSON.stringify(failedTest.expected)}\`\n- **Computed:** \`${JSON.stringify(failedTest.actual)}\`\n`;
    }
  }

  // 1. Python Specific Errors
  if (lang.includes('python')) {
    if (src.includes('pass') && src.split('\n').length <= 4) {
      return `🧙‍♂️ **Unfinished Starter Code Detected:**\nYour function still contains the starter placeholder \`pass\`. The test suite is waiting for real logic! Replace \`pass\` with your calculation and return statement.`;
    }
    if (src.includes('print(') && !src.includes('return ')) {
      return `🧙‍♂️ **Console Print vs. Function Return:**\nYour code is using \`print(...)\` to display text on the terminal, but backend automated tests require a \`return\` statement! Functions without \`return\` evaluate to \`None\` in Python. Change \`print(...)\` to \`return ...\`.`;
    }
    if (err.includes('syntaxerror') && (err.includes('colon') || err.includes('expected \':\'') || err.includes('invalid syntax'))) {
      return `⚡ **Python Syntax Error (Missing Colon or Mismatched Brackets):**\nIn Python, statements such as \`def\`, \`if\`, \`else\`, \`for\`, and \`while\` must end with a colon (\`:\`). Check the line right before the error location.`;
    }
    if (err.includes('indentationerror')) {
      return `⚡ **Indentation Error:**\nPython uses indentation instead of curly braces to define code blocks. Ensure you consistently use 4 spaces inside functions, loops, and \`if\` statements.`;
    }
    if (err.includes('nameerror')) {
      return `⚡ **Name Error (Undefined Variable or Typo):**\nA variable or function was referenced before being defined, or there is a spelling typo. Check that all variable names match their declarations.`;
    }
    if (err.includes('typeerror')) {
      return `⚡ **Type Mismatch Error:**\nAn operation was performed on incompatible data types (e.g., concatenating a string with an integer, or invoking a non-callable object). Use \`str(val)\` or \`int(val)\` to convert types explicitly.`;
    }
    if (err.includes('indexerror') || err.includes('out of range')) {
      return `⚡ **Index Out of Range (Off-By-One Pitfall):**\nYour code attempted to access a list index that doesn't exist! Remember that Python arrays are zero-indexed (\`0\` to \`len - 1\`).`;
    }
    if (err.includes('keyerror')) {
      return `⚡ **Dictionary KeyError:**\nYou tried to look up a key that doesn't exist in the dictionary. Use \`dict.get(key, default_value)\` to safely look up keys without crashing!`;
    }
  }

  // 2. Go Specific Errors
  if (lang.includes('go')) {
    if (err.includes('deadlock') || err.includes('goroutines are asleep')) {
      return `⚡ **Go Channel Deadlock:**\nAll goroutines are blocked waiting on channel communication that will never arrive! Common causes:\n1. A channel reader (\`for val := range ch\`) never exits because the channel was never closed (\`close(ch)\`).\n2. Writing to an unbuffered channel without an active receiver running concurrently.`;
    }
    if (err.includes('nil pointer') || err.includes('invalid memory address')) {
      return `⚡ **Nil Pointer Dereference:**\nA pointer was dereferenced before being initialized. Check if a pointer or interface is \`nil\` before accessing its methods or fields.`;
    }
    if (!src.includes('return') && src.includes('func ') && !src.includes('func main')) {
      return `⚡ **Missing Return Value in Go:**\nThe Go compiler requires every non-void function execution path to return declared types. Ensure all branches end in a valid \`return\`.`;
    }
  }

  // 3. SQL Specific Errors
  if (lang.includes('sql')) {
    const upper = src.toUpperCase();
    if (!upper.includes('SELECT') && !upper.includes('INSERT') && !upper.includes('UPDATE') && !upper.includes('DELETE')) {
      return `⚡ **Missing SQL DML Clause:**\nRelational database engines require a command like \`SELECT\`, \`INSERT\`, \`UPDATE\`, or \`DELETE\`.`;
    }
    if (upper.includes('JOIN') && !upper.includes(' ON ') && !upper.includes(' USING ')) {
      return `⚡ **SQL Cartesian Explosion (Missing ON Clause):**\nEvery \`JOIN\` requires an \`ON\` clause specifying primary/foreign key equality (e.g. \`JOIN orders ON users.id = orders.user_id\`).`;
    }
    if (upper.includes('COUNT(') || upper.includes('SUM(') || upper.includes('AVG(')) {
      if (!upper.includes('GROUP BY') && (upper.includes(',') || upper.includes('FROM'))) {
        return `⚡ **SQL Aggregation Mismatch:**\nWhen selecting both non-aggregated columns and aggregate functions (\`COUNT\`, \`SUM\`), the non-aggregated columns must appear in a \`GROUP BY\` clause.`;
      }
    }
  }

  // 4. Output / Assertion Mismatch
  if (expectedDiff || err.includes('expected') || err.includes('assertion')) {
    return `⚡ **Test Assertion Mismatch in "${lessonTitle}":**${expectedDiff}\n**Boots' Guidance:** The algorithm executes, but computed values diverge from requirements. Inspect return data types (e.g. integer vs float vs string), string casing, and boundary conditions (empty inputs, 0, or single elements).`;
  }

  return `⚡ **Diagnostic Analysis for "${lessonTitle}":**\nExecution issue: \`${errorMessage || 'Assertion mismatch'}\`.\nInspect your function parameters, loop bounds, and return statements to align with lesson requirements.`;
}

// Comprehensive Autonomous AI Question & Answer Engine (Handles freeform coding questions)
function generateContextualAnswer(
  message: string,
  code: string,
  lessonTitle: string,
  language: string,
  testResults?: any
): string {
  const q = (message || '').toLowerCase();

  // Common programming questions
  if (q.includes('recursion') || q.includes('recursive')) {
    return `🧙‍♂️ **Recursion Masterclass:**\nRecursion is when a function calls itself to solve smaller subproblems.\nEvery recursive spell needs two pillars:\n1. **Base Case:** The stopping condition that prevents infinite looping (e.g., \`if n <= 1: return 1\`).\n2. **Recursive Step:** Progressing toward the base case with smaller input (e.g., \`return n * factorial(n - 1)\`).\nEach call adds a new stack frame in RAM until the base case returns!`;
  }

  if (q.includes('big o') || q.includes('complexity') || q.includes('time complexity')) {
    return `⚡ **Big-O Complexity Cheat Sheet:**\n- **O(1) Constant Time:** Hash table lookup, array index access, stack push/pop. Instant regardless of size.\n- **O(log N) Logarithmic Time:** Binary search on sorted data, balanced BST lookup. Halves remaining work each step.\n- **O(N) Linear Time:** Single pass loop over a list. Work grows directly with input size.\n- **O(N log N) Linearithmic Time:** Optimal comparison sorting (MergeSort, QuickSort, TimSort).\n- **O(N²) Quadratic Time:** Nested loops over the same array. Warning: Becomes slow with >10,000 items!\nIn backend engineering, we always aim for O(1) or O(log N) for read-heavy API paths.`;
  }

  if (q.includes('pointer') || q.includes('reference') || q.includes('memory')) {
    return `🧙‍♂️ **Pointers & Memory in Plain English:**\nThink of a variable as a mailbox with an address.\n- A **Value** is what's inside the mailbox (e.g., the letter).\n- A **Pointer** is a piece of paper that says *\"Go to 123 Main Street\"* (the memory address \`&x\`).\n- **Dereferencing (\`*p\`)** means visiting that address and reading or modifying what's inside.\nPointers allow high-speed zero-copy operations and shared state across goroutines without cloning giant structs!`;
  }

  if (q.includes('channel') || q.includes('goroutine') || q.includes('concurrency')) {
    return `⚡ **Go Concurrency & Channels:**\n- **Goroutine:** A lightweight thread managed by Go's runtime scheduler (starting at just 2KB stack memory, vs 1-2MB for OS threads).\n- **Channel (\`chan\`):** A synchronization pipe for passing typed data between goroutines safely.\n- **Rule of Thumb:** Close the channel on the *sender* side once all items are produced. Never close from the receiver!`;
  }

  if (q.includes('join') || q.includes('sql') || q.includes('database')) {
    return `🧙‍♂️ **SQL Joins Demystified:**\n- **INNER JOIN:** Keeps only rows where the keys match in BOTH tables.\n- **LEFT JOIN:** Keeps ALL rows from the left table, filling missing right table columns with \`NULL\`.\n- **RIGHT JOIN:** Keeps ALL rows from the right table.\n- **FULL OUTER JOIN:** Keeps rows from both tables, with \`NULL\` whenever a counterpart is missing.\nAlways index your join foreign keys with a B-Tree index to prevent slow table scans!`;
  }

  if (q.includes('self') || q.includes('oop') || q.includes('class')) {
    return `🧙‍♂️ **Object-Oriented State & \`self\`:**\nIn Python, \`self\` refers to the specific instance of the class currently executing the method.\nWhen you write \`self.balance = 100\`, you are storing the balance on *that specific account*, not globally on the whole class blueprint. Every instance method must receive \`self\` as its first parameter!`;
  }

  if (q.includes('edge case') || q.includes('guard')) {
    return `🛡️ **Essential Backend Edge Cases to Guard Against:**\n1. **Empty Collections:** Empty array \`[]\`, empty string \`""\`, empty query results.\n2. **Null / Nil References:** Variable is \`None\` / \`nil\` before accessing attributes.\n3. **Boundary Values:** Zero (\`0\`), negative numbers, maximum integers.\n4. **Off-by-One:** Array indices at \`0\` vs \`len(items)\`.\n5. **Duplicate Keys:** Collisions in dictionaries or primary keys.`;
  }

  if (q.includes('explain') || q.includes('what does this code do') || q.includes('how does this work')) {
    return generateContextualExplanation(code, lessonTitle, language);
  }

  if (q.includes('diagnose') || q.includes('why is it failing') || q.includes('error') || q.includes('bug')) {
    return generateContextualDiagnosis(code, q, lessonTitle, language, testResults);
  }

  return `🧙‍♂️ **Boots' Wisdom for "${lessonTitle}":**\nYou asked: *"${message}"*\n\nIn this challenge (${language.toUpperCase()}), keep your mental model focused on clean inputs, deterministic transformations, and clean return values. Break down your solution step-by-step, verify boundary edge cases, and run your tests often!`;
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

// AI Code Explanation Endpoint
app.post('/api/ai/explain', async (req, res) => {
  try {
    const { code, lessonTitle, trackTitle, language } = req.body;

    const prompt = `You are Boots the Archmage, a brilliant, approachable senior backend mentor from Boot.dev.
Explain the student's code for the lesson "${lessonTitle || 'Backend Challenge'}" in ${language || 'Python'}.

Student's Code:
\`\`\`${language}
${code}
\`\`\`

Provide an engaging, crystal-clear explanation:
1. High-level Summary: What this code does in plain English (simple analogy).
2. Step-by-Step Breakdown: Explain what each function, loop, or key line is doing and why.
3. Key Backend / Language Concepts: Highlight what idioms or computing concepts are at play.
4. Time & Space Complexity: Estimated Big-O.
Keep it encouraging, educational, and structured in Markdown.`;

    const aiText = await callGeminiWithFallback(prompt);

    if (aiText) {
      return res.json({
        explanation: aiText,
        source: 'gemini',
        success: true
      });
    }

    const fallbackExplanation = generateContextualExplanation(
      code || '',
      lessonTitle || 'Backend Challenge',
      language || 'Python'
    );

    res.json({
      explanation: fallbackExplanation,
      source: 'archmage-companion',
      success: true
    });
  } catch (err: any) {
    console.error('AI Explain Error:', err);
    res.json({
      explanation: generateContextualExplanation(req.body.code || '', req.body.lessonTitle || 'Challenge', req.body.language || 'Python'),
      source: 'offline-companion',
      success: true
    });
  }
});

// AI General Chat & Questions Endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, trackTitle, lessonTitle, instructions, currentCode, testResults, language, action } = req.body;

    const prompt = `You are Boots the Archmage, a friendly, witty, and deeply knowledgeable senior backend engineering tutor from BootForge (inspired by boot.dev).
The student is asking: "${message || 'Can you help me understand this challenge?'}"

Current Challenge Context:
- Track: ${trackTitle || 'Backend Engineering'}
- Lesson: ${lessonTitle || 'Interactive Challenge'}
- Language: ${language || 'Python'}
- Instructions:
${instructions || 'N/A'}

Student's Current Code:
\`\`\`${language}
${currentCode || '// No code written yet'}
\`\`\`

Test Results (if any):
${JSON.stringify(testResults, null, 2)}

Provide a direct, helpful, and insightful response answering their question. If they ask for an explanation or why something failed, explain the mental model clearly without doing all the work for them unless they specifically ask for code breakdown. Keep tone encouraging with light RPG flavor.`;

    const aiText = await callGeminiWithFallback(prompt);

    if (aiText) {
      return res.json({
        reply: aiText,
        source: 'gemini',
        success: true
      });
    }

    const fallbackAnswer = generateContextualAnswer(
      message || '',
      currentCode || '',
      lessonTitle || 'Backend Challenge',
      language || 'Python',
      testResults
    );

    res.json({
      reply: fallbackAnswer,
      source: 'archmage-companion',
      success: true
    });
  } catch (err: any) {
    console.error('AI Chat Error:', err);
    res.json({
      reply: generateContextualAnswer(req.body.message || '', req.body.currentCode || '', req.body.lessonTitle || 'Challenge', req.body.language || 'Python', req.body.testResults),
      source: 'offline-companion',
      success: true
    });
  }
});

// AI Archmage Hints Endpoint (Supports both legacy hint queries and customized prompts)
app.post('/api/ai/hint', async (req, res) => {
  try {
    const { message, trackTitle, lessonTitle, instructions, currentCode, testResults, language } = req.body;

    const userQuery = message || "Provide a structured, helpful, conceptual hint without giving away the exact full solution. Guide their mental model.";

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

Student Request:
${userQuery}

Provide a structured, helpful, conceptual hint without giving away the exact full solution. Guide their mental model. Keep it concise (2-4 sentences max), punchy, and encouraging with a slight fantasy RPG tutor flavor.`;

    const aiText = await callGeminiWithFallback(prompt);

    if (aiText) {
      return res.json({
        hint: aiText,
        reply: aiText,
        source: 'gemini',
        success: true
      });
    }

    // Heuristic fallback if Gemini is experiencing high demand (503) or offline
    const fallbackHint = message 
      ? generateContextualAnswer(message, currentCode || '', lessonTitle || 'Backend Challenge', language || 'Python', testResults)
      : generateContextualHint(
          trackTitle || 'Backend Engineering',
          lessonTitle || 'Backend Challenge',
          language || 'Python',
          instructions || '',
          currentCode || '',
          testResults
        );

    res.json({
      hint: fallbackHint,
      reply: fallbackHint,
      source: 'archmage-companion',
      success: true
    });
  } catch (err: any) {
    console.error('AI Hint Error:', err);
    res.json({
      hint: "🧙‍♂️ *Boots' Arcane Wisdom:* Step back and examine the invariants of your algorithm. Check your boundary conditions, variable types, and return values.",
      reply: "🧙‍♂️ *Boots' Arcane Wisdom:* Step back and examine the invariants of your algorithm. Check your boundary conditions, variable types, and return values.",
      source: 'offline-companion',
      success: true
    });
  }
});

// AI Error Diagnostics Endpoint
app.post('/api/ai/diagnose', async (req, res) => {
  try {
    const { code, errorMessage, lessonTitle, trackTitle, language, testResults } = req.body;

    const prompt = `You are Boots the Archmage backend mentor.
The student ran this ${language || 'code'} in lesson "${lessonTitle}":
\`\`\`${language}
${code}
\`\`\`

Error / Failed Assertion:
${errorMessage}

Test suite data:
${JSON.stringify(testResults, null, 2)}

Explain clearly and concisely:
1. What the error/assertion failure means in plain English.
2. The specific conceptual pitfall (e.g. off-by-one, nil pointer, unclosed channel, mutable default argument, print instead of return).
3. The architectural hint to fix it.
Do NOT write out the entire full replacement code solution; guide them to fix it themselves.`;

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
      language || 'Python',
      testResults
    );

    res.json({
      diagnosis: fallbackDiagnosis,
      source: 'archmage-companion',
      success: true
    });
  } catch (err: any) {
    console.error('AI Diagnose Error:', err);
    res.json({
      diagnosis: generateContextualDiagnosis(req.body.code || '', req.body.errorMessage || '', req.body.lessonTitle || 'Backend Challenge', req.body.language || 'Python', req.body.testResults),
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
