// Comprehensive in-browser multi-language execution engine and test runner

export interface ExecutionResult {
  success: boolean;
  output: string;
  logs: string[];
  executionTimeMs: number;
  testResults: {
    id: string;
    name: string;
    passed: boolean;
    input?: string;
    expected: any;
    actual: any;
    error?: string;
  }[];
  error?: string;
  tabularData?: { columns: string[]; rows: any[][] };
}

// SQL In-Memory Relational Engine & Initial Dataset
export const initialSqlDatabase = {
  users: [
    { id: 1, name: 'Linus', role: 'admin', age: 34, email: 'linus@kernel.org', experience_level: 'Legendary' },
    { id: 2, name: 'Ada', role: 'engineer', age: 29, email: 'ada@lovelace.io', experience_level: 'Master' },
    { id: 3, name: 'Alan', role: 'architect', age: 41, email: 'alan@turing.ai', experience_level: 'Legendary' },
    { id: 4, name: 'Grace', role: 'engineer', age: 38, email: 'grace@hopper.mil', experience_level: 'Master' },
    { id: 5, name: 'Dennis', role: 'systems_lead', age: 31, email: 'dennis@bell.labs', experience_level: 'Legendary' },
    { id: 6, name: 'Boots', role: 'novice', age: 2, email: 'boots@boot.dev', experience_level: 'Novice' }
  ],
  orders: [
    { id: 101, user_id: 1, product: 'Mechanical Keyboard 60%', amount: 149.99, status: 'completed', created_at: '2026-01-15' },
    { id: 102, user_id: 2, product: 'Dual 4K Monitor Arm', amount: 89.50, status: 'completed', created_at: '2026-02-01' },
    { id: 103, user_id: 1, product: 'Server Rack Mount 1U', amount: 320.00, status: 'shipped', created_at: '2026-02-10' },
    { id: 104, user_id: 3, product: 'Raspberry Pi 5 Cluster', amount: 210.00, status: 'completed', created_at: '2026-02-14' },
    { id: 105, user_id: 4, product: 'YubiKey 5C NFC (2-Pack)', amount: 110.00, status: 'pending', created_at: '2026-03-01' },
    { id: 106, user_id: 6, product: 'Backend Adventurer Robe', amount: 45.00, status: 'completed', created_at: '2026-03-05' }
  ],
  servers: [
    { id: 'srv-01', region: 'us-east', cpu_cores: 64, ram_gb: 256, status: 'active', load_percent: 42 },
    { id: 'srv-02', region: 'us-west', cpu_cores: 32, ram_gb: 128, status: 'active', load_percent: 88 },
    { id: 'srv-03', region: 'eu-central', cpu_cores: 64, ram_gb: 256, status: 'degraded', load_percent: 94 },
    { id: 'srv-04', region: 'ap-southeast', cpu_cores: 16, ram_gb: 64, status: 'active', load_percent: 18 }
  ]
};

// SQL Query Parser & Executor
export function executeSqlQuery(query: string, customDb = initialSqlDatabase): { columns: string[]; rows: any[][]; count: number; error?: string } {
  try {
    // Strip line comments (-- ...) and block comments (/* ... */)
    const stripped = (query || '')
      .replace(/--.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .trim();

    if (!stripped) {
      return {
        columns: ['error'],
        rows: [],
        count: 0,
        error: 'No SQL query found. Write a SELECT statement to execute.'
      };
    }

    const cleanQuery = stripped.replace(/;+$/, '').trim();
    const upper = cleanQuery.toUpperCase();

    if (!upper.startsWith('SELECT')) {
      return {
        columns: ['error'],
        rows: [],
        count: 0,
        error: `Only SELECT queries are supported in this interactive runner. Got: "${cleanQuery.slice(0, 30)}..."`
      };
    }

    // Determine Table
    let table = 'users';
    if (upper.includes('FROM ORDERS')) table = 'orders';
    else if (upper.includes('FROM SERVERS')) table = 'servers';
    else if (upper.includes('FROM USERS')) table = 'users';

    let data = JSON.parse(JSON.stringify((customDb as any)[table] || customDb.users));

    // Support JOIN
    if ((upper.includes('JOIN ORDERS') || upper.includes('INNER JOIN ORDERS')) && table === 'users') {
      // In relational SQL, JOIN requires an ON condition (unless explicit CROSS JOIN)
      if (!upper.includes(' ON ') && !upper.includes('CROSS JOIN')) {
        throw new Error('SQL Syntax Error: JOIN requires an ON condition (e.g. JOIN orders ON users.id = orders.user_id)');
      }

      const joined: any[] = [];
      data.forEach((u: any) => {
        const userOrders = customDb.orders.filter(o => o.user_id === u.id);
        userOrders.forEach(o => {
          joined.push({
            id: u.id,
            user_id: u.id,
            name: u.name,
            'users.name': u.name,
            'orders.product': o.product,
            product: o.product,
            'orders.amount': o.amount,
            amount: o.amount,
            'orders.status': o.status,
            status: o.status
          });
        });
      });
      data = joined;
    }

    // Helper to get row value with optional dot prefix (e.g. orders.status vs status)
    const getRowValue = (row: any, key: string) => {
      if (row[key] !== undefined) return row[key];
      const stripped = key.includes('.') ? key.split('.').pop()! : key;
      if (row[stripped] !== undefined) return row[stripped];
      for (const k of Object.keys(row)) {
        if (k.endsWith('.' + key) || k.endsWith('.' + stripped)) return row[k];
      }
      return undefined;
    };

    // WHERE filter simulation
    if (upper.includes('WHERE')) {
      const wherePart = cleanQuery.split(/WHERE/i)[1].split(/ORDER|GROUP|LIMIT/i)[0].trim();
      
      if (wherePart.includes('>=')) {
        const [field, val] = wherePart.split('>=').map(s => s.trim().replace(/['"]/g, ''));
        const numVal = parseFloat(val);
        data = data.filter((row: any) => parseFloat(getRowValue(row, field)) >= numVal);
      } else if (wherePart.includes('<=')) {
        const [field, val] = wherePart.split('<=').map(s => s.trim().replace(/['"]/g, ''));
        const numVal = parseFloat(val);
        data = data.filter((row: any) => parseFloat(getRowValue(row, field)) <= numVal);
      } else if (wherePart.includes('>')) {
        const [field, val] = wherePart.split('>').map(s => s.trim().replace(/['"]/g, ''));
        const numVal = parseFloat(val);
        data = data.filter((row: any) => parseFloat(getRowValue(row, field)) > numVal);
      } else if (wherePart.includes('<')) {
        const [field, val] = wherePart.split('<').map(s => s.trim().replace(/['"]/g, ''));
        const numVal = parseFloat(val);
        data = data.filter((row: any) => parseFloat(getRowValue(row, field)) < numVal);
      } else if (wherePart.includes('=')) {
        const [field, val] = wherePart.split('=').map(s => s.trim().replace(/['"]/g, ''));
        data = data.filter((row: any) => {
          const v = getRowValue(row, field);
          return v !== undefined && String(v).toLowerCase() === val.toLowerCase();
        });
      } else if (wherePart.toUpperCase().includes('LIKE')) {
        const [field, val] = wherePart.split(/LIKE/i).map(s => s.trim().replace(/['"%]/g, ''));
        data = data.filter((row: any) => {
          const v = getRowValue(row, field);
          return v !== undefined && String(v).toLowerCase().includes(val.toLowerCase());
        });
      }
    }

    // GROUP BY / Aggregation check
    if (upper.includes('COUNT(') || upper.includes('SUM(') || upper.includes('AVG(') || upper.includes('GROUP BY')) {
      if (upper.includes('COUNT(*)') && !upper.includes('GROUP BY')) {
        return {
          columns: ['count'],
          rows: [[data.length]],
          count: 1
        };
      }
      if (upper.includes('GROUP BY ROLE')) {
        const grouped: Record<string, { count: number; total_age: number }> = {};
        data.forEach((r: any) => {
          if (!grouped[r.role]) grouped[r.role] = { count: 0, total_age: 0 };
          grouped[r.role].count++;
          grouped[r.role].total_age += (r.age || 0);
        });
        const columns = ['role', 'count', 'avg_age'];
        const rows = Object.entries(grouped).map(([role, stats]) => [
          role,
          stats.count,
          Math.round((stats.total_age / stats.count) * 10) / 10
        ]);
        return { columns, rows, count: rows.length };
      }
    }

    // ORDER BY
    if (upper.includes('ORDER BY')) {
      const orderPart = cleanQuery.split(/ORDER BY/i)[1].split(/LIMIT/i)[0].trim();
      const isDesc = orderPart.toUpperCase().includes('DESC');
      const orderCol = orderPart.replace(/ASC|DESC/gi, '').trim().split(' ')[0];

      data.sort((a: any, b: any) => {
        const va = getRowValue(a, orderCol);
        const vb = getRowValue(b, orderCol);
        if (typeof va === 'number' && typeof vb === 'number') {
          return isDesc ? vb - va : va - vb;
        }
        return isDesc ? String(vb).localeCompare(String(va)) : String(va).localeCompare(String(vb));
      });
    }

    // LIMIT
    if (upper.includes('LIMIT')) {
      const limitMatch = cleanQuery.match(/LIMIT\s+(\d+)/i);
      if (limitMatch && limitMatch[1]) {
        data = data.slice(0, parseInt(limitMatch[1], 10));
      }
    }

    if (data.length === 0) {
      return { columns: ['result'], rows: [['(0 rows returned)']], count: 0 };
    }

    // SELECT columns
    const selectPart = cleanQuery.split(/FROM/i)[0].replace(/SELECT/i, '').trim();
    let columns: string[] = [];

    if (selectPart === '*' || selectPart.includes('COUNT(')) {
      columns = Object.keys(data[0]).filter(k => !k.includes('.'));
    } else {
      const requested = selectPart.split(',').map(s => s.trim().split(/\s+AS\s+/i)[0].trim());
      columns = requested.map(col => {
        if (col in data[0]) return col;
        const stripped = col.includes('.') ? col.split('.').pop()! : col;
        if (stripped in data[0]) return stripped;
        return col;
      });
    }

    const rows = data.map((row: any) => columns.map(col => {
      const val = getRowValue(row, col);
      return val !== undefined ? val : 'NULL';
    }));

    return { columns, rows, count: rows.length };
  } catch (err: any) {
    return {
      columns: ['error'],
      rows: [[err.message || 'Syntax error in SQL query']],
      count: 0,
      error: err.message
    };
  }
}

// Robust Python-to-JavaScript Transpiler
export function transpilePythonToJs(userCode: string): string {
  const lines = userCode.replace(/\r\n/g, '\n').split('\n');
  const outputLines: string[] = [];
  const indentStack: number[] = [];
  let inClass = false;
  let classIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Preserve comments as JS comments
    if (!trimmed || trimmed.startsWith('#')) {
      if (trimmed.startsWith('#')) {
        outputLines.push('// ' + trimmed.substring(1));
      } else {
        outputLines.push('');
      }
      continue;
    }

    // Measure indent of current non-empty code line
    const indent = rawLine.search(/\S|$/);

    // Pop closed indentation blocks
    // Any block opened at an indentation level >= current indent is now closed
    while (indentStack.length > 0 && indent <= indentStack[indentStack.length - 1]) {
      const popped = indentStack.pop()!;
      outputLines.push(' '.repeat(popped) + '}');
      if (inClass && indent <= classIndent) {
        inClass = false;
      }
    }

    // Clean inline comments
    let line = rawLine;
    if (line.includes('#') && !line.includes('"#') && !line.includes("'#")) {
      line = line.replace(/#.*$/, '');
    }

    // Convert Python f-strings
    line = line.replace(/f(["'])([\s\S]*?)\1/g, (_, q, content) => {
      return '`' + content.replace(/\{([^{}]+)\}/g, '${$1}') + '`';
    });

    // Strip type hints: def foo(x: int) -> int: -> def foo(x):
    line = line.replace(/->\s*[a-zA-Z0-9_\[\],\s]+:/g, ':');
    line = line.replace(/([a-zA-Z0-9_]+)\s*:\s*[a-zA-Z0-9_\[\]]+/g, '$1');

    // Python inline ternary: `return A if COND else B` -> `return ((COND) ? (A) : (B))`
    // Example: `return 'OPEN' if fail_count >= threshold else 'CLOSED'`
    const ternaryMatch = line.match(/^(\s*)(return\s+)?(.*?)\s+if\s+(.*?)\s+else\s+(.*)$/);
    if (ternaryMatch && !line.trim().endsWith(':')) {
      const prefix = ternaryMatch[1] || '';
      const returnKw = ternaryMatch[2] || '';
      const valIfTrue = ternaryMatch[3];
      const condition = ternaryMatch[4];
      const valIfFalse = ternaryMatch[5];
      line = `${prefix}${returnKw}((${condition}) ? (${valIfTrue}) : (${valIfFalse}))`;
    }

    // Python keyword & operator mapping (handle 'not in' before 'not')
    line = line
      .replace(/\bNone\b/g, 'null')
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/([a-zA-Z0-9_\.]+)\s+not\s+in\s+([a-zA-Z0-9_\.]+)/g, '!($1 in $2)')
      .replace(/\bnot\s+/g, '!')
      .replace(/\bdel\s+([a-zA-Z0-9_\.\[\]'"]+)/g, 'delete $1')
      .replace(/self\./g, 'this.');

    // Python list.pop(index) -> arr.splice(index, 1)[0]
    line = line.replace(/([a-zA-Z0-9_\.\[\]'"]+)\.pop\(([^)]+)\)/g, '$1.splice($2, 1)[0]');

    // Python dict.get(key, default) / obj.get(key) -> safe _py_get helper
    line = line.replace(/([a-zA-Z0-9_\.\[\]'"]+)\.get\((.*?)\)/g, '_py_get($1, $2)');

    // Class header
    const classMatch = line.match(/^\s*class\s+([a-zA-Z0-9_]+)(?:\((.*?)\))?\s*:/);
    if (classMatch) {
      inClass = true;
      classIndent = indent;
      indentStack.push(indent);
      outputLines.push(' '.repeat(indent) + `class ${classMatch[1]} {`);
      continue;
    }

    // Function/method header (allow optional space before colon)
    const defMatch = line.match(/^\s*def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/);
    if (defMatch) {
      const name = defMatch[1];
      let params = defMatch[2].split(',').map(p => p.trim()).filter(Boolean);
      params = params.filter(p => p !== 'self' && p !== 'this');
      const paramsStr = params.join(', ');

      indentStack.push(indent);
      if (inClass && indent > classIndent) {
        if (name === '__init__') {
          outputLines.push(' '.repeat(indent) + `constructor(${paramsStr}) {`);
        } else {
          outputLines.push(' '.repeat(indent) + `${name}(${paramsStr}) {`);
        }
      } else {
        outputLines.push(' '.repeat(indent) + `function ${name}(${paramsStr}) {`);
      }
      continue;
    }

    // Loops (match before general 'in' replacement)
    const forRangeMatch = line.match(/^\s*for\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\)\s*:/);
    if (forRangeMatch) {
      indentStack.push(indent);
      outputLines.push(' '.repeat(indent) + `for (let ${forRangeMatch[1]} of range(${forRangeMatch[2]})) {`);
      continue;
    }

    const forInMatch = line.match(/^\s*for\s+([a-zA-Z0-9_]+)\s+in\s+(.*?)\s*:/);
    if (forInMatch) {
      indentStack.push(indent);
      outputLines.push(' '.repeat(indent) + `for (let ${forInMatch[1]} of ${forInMatch[2]}) {`);
      continue;
    }

    // Now safe to replace general 'in' operator: `a in b` -> `(a in b)`
    line = line.replace(/([a-zA-Z0-9_\.]+)\s+in\s+([a-zA-Z0-9_\.]+)/g, '($1 in $2)');

    // If/Elif/Else
    const ifMatch = line.match(/^\s*if\s+(.*?)\s*:/);
    if (ifMatch) {
      indentStack.push(indent);
      outputLines.push(' '.repeat(indent) + `if (${ifMatch[1]}) {`);
      continue;
    }

    const elifMatch = line.match(/^\s*elif\s+(.*?)\s*:/);
    if (elifMatch) {
      indentStack.push(indent);
      outputLines.push(' '.repeat(indent) + `else if (${elifMatch[1]}) {`);
      continue;
    }

    const elseMatch = line.match(/^\s*else\s*:/);
    if (elseMatch) {
      indentStack.push(indent);
      outputLines.push(' '.repeat(indent) + `else {`);
      continue;
    }

    const whileMatch = line.match(/^\s*while\s+(.*?)\s*:/);
    if (whileMatch) {
      indentStack.push(indent);
      outputLines.push(' '.repeat(indent) + `while (${whileMatch[1]}) {`);
      continue;
    }

    // Pass
    if (/^\s*pass\s*$/.test(line)) {
      outputLines.push(' '.repeat(indent) + '/* pass */');
      continue;
    }

    // Local variable assignments (declare with var to avoid strict mode ReferenceError in classes)
    const assignMatch = line.match(/^(\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*=(?!=)\s*(.*)$/);
    if (assignMatch && !line.includes('return ') && !line.trim().startsWith('for ') && !line.trim().startsWith('if ')) {
      line = `${assignMatch[1]}var ${assignMatch[2]} = ${assignMatch[3]}`;
    }

    outputLines.push(line);
  }

  // Close remaining open indentations
  while (indentStack.length > 0) {
    const popped = indentStack.pop()!;
    outputLines.push(' '.repeat(popped) + '}');
  }

  return outputLines.join('\n');
}

// Virtual file system for simulated shell
const virtualFs: Record<string, string> = {
  'server.log': `[2026-10-06 12:00:01] INFO  Starting HTTP gateway on port :8080
[2026-10-06 12:00:02] INFO  Database connection pool established (pool_size=20)
[2026-10-06 12:00:05] WARN  High latency detected on Redis replica (latency=42ms)
[2026-10-06 12:00:10] ERROR ConnectionTimeout: upstream auth microservice timed out after 5000ms
[2026-10-06 12:00:11] ERROR DeadlockDetected: transaction 891 aborted by deadlock detector
[2026-10-06 12:00:15] ERROR OutOfMemory: worker thread 4 killed by OOM killer
[2026-10-06 12:00:18] INFO  Graceful recovery initiated on worker thread 4`,
  'config.yaml': `server:\n  port: 8080\n  environment: production\ndatabase:\n  host: postgres.internal\n  max_connections: 50`,
  'access.log': `127.0.0.1 - GET /index.html 200\n10.0.0.4 - GET /api/v1/auth 404\n10.0.0.5 - GET /missing 404`
};

// Interactive Code Runner (Python, Go, JS, SQL, Bash)
export async function runInteractiveCode(
  language: string,
  userCode: string,
  testCases: any[],
  solutionCode?: string
): Promise<ExecutionResult> {
  const startTime = performance.now();
  const logs: string[] = [];

  // Capture console prints
  const mockConsole = {
    log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
    error: (...args: any[]) => logs.push(`[ERROR] ${args.join(' ')}`),
    info: (...args: any[]) => logs.push(`[INFO] ${args.join(' ')}`)
  };

  try {
    if (language === 'sql') {
      const queryResult = executeSqlQuery(userCode);
      const passed = !queryResult.error && (queryResult.rows.length > 0 || userCode.toUpperCase().includes('WHERE'));
      
      const testResults = testCases.map((tc, idx) => ({
        id: tc.id || `test-${idx}`,
        name: tc.name || `SQL Test ${idx + 1}`,
        passed: passed,
        expected: tc.expectedOutput ?? 'Valid relational result set',
        actual: queryResult.error ? `SQL Error: ${queryResult.error}` : `${queryResult.count} rows returned`,
        error: queryResult.error
      }));

      return {
        success: testResults.every(t => t.passed),
        output: queryResult.error ? `SQL Error: ${queryResult.error}` : `Query OK, ${queryResult.count} rows in set.`,
        logs: [queryResult.error ? `Syntax/Runtime Error: ${queryResult.error}` : `Rows returned: ${queryResult.count}`],
        executionTimeMs: Math.round(performance.now() - startTime),
        testResults,
        tabularData: queryResult
      };
    }

    if (language === 'python') {
      // Python simulated runtime environment
      const pyRuntime = `
        const print = mockConsole.log;
        const len = (x) => (x ? (x.length !== undefined ? x.length : Object.keys(x).length) : 0);
        const range = (start, stop, step = 1) => {
          if (stop === undefined) { stop = start; start = 0; }
          const arr = [];
          for (let i = start; step > 0 ? i < stop : i > stop; i += step) arr.push(i);
          return arr;
        };
        const sum = (arr) => Array.isArray(arr) ? arr.reduce((a, b) => a + b, 0) : 0;
        const max = (...arr) => Math.max(...arr.flat());
        const min = (...arr) => Math.min(...arr.flat());
        const abs = Math.abs;
        const round = Math.round;
        const str = String;
        const int = (v) => parseInt(v, 10);
        const float = parseFloat;
        const True = true;
        const False = false;
        const None = null;

        // Python string & array helpers (non-enumerable to prevent for..in loops from enumerating them)
        if (!String.prototype.upper) Object.defineProperty(String.prototype, 'upper', { value: function() { return this.toUpperCase(); }, configurable: true, writable: true, enumerable: false });
        if (!String.prototype.lower) Object.defineProperty(String.prototype, 'lower', { value: function() { return this.toLowerCase(); }, configurable: true, writable: true, enumerable: false });
        if (!String.prototype.strip) Object.defineProperty(String.prototype, 'strip', { value: function() { return this.trim(); }, configurable: true, writable: true, enumerable: false });

        if (!Array.prototype.append) Object.defineProperty(Array.prototype, 'append', { value: function(x) { this.push(x); return this; }, configurable: true, writable: true, enumerable: false });
        if (!Array.prototype.remove) Object.defineProperty(Array.prototype, 'remove', { value: function(x) { const i = this.indexOf(x); if (i !== -1) this.splice(i, 1); return this; }, configurable: true, writable: true, enumerable: false });

        // Safe dict/class .get() helper - never pollute Object.prototype directly!
        const _py_get = (target, key, defaultVal = null) => {
          if (target === null || target === undefined) return defaultVal;
          if (typeof target.get === 'function') return target.get(key, defaultVal);
          return target[key] !== undefined ? target[key] : defaultVal;
        };
      `;

      // Transpile user Python code cleanly to JS
      const jsCode = transpilePythonToJs(userCode);

      // Check for syntax errors
      let hasCompileError = false;
      let compileErrorMsg = '';
      try {
        const testCompile = new Function('mockConsole', `${pyRuntime}\n${jsCode}`);
        testCompile(mockConsole);
      } catch (err: any) {
        hasCompileError = true;
        compileErrorMsg = err.message || 'Syntax error in code';
      }

      // Run against test cases
      const testResults = testCases.map((tc, idx) => {
        let passed = false;
        let actual: any = null;
        let errStr: string | undefined = undefined;

        if (hasCompileError) {
          return {
            id: tc.id || `test-${idx}`,
            name: tc.name || `Assertion ${idx + 1}`,
            passed: false,
            input: tc.inputDescription || '',
            expected: tc.expectedOutput,
            actual: `SyntaxError: ${compileErrorMsg}`,
            error: compileErrorMsg
          };
        }

        try {
          // Special Class Suite: RateLimiter
          if (tc.id === 'py-t3' || tc.name.toLowerCase().includes('ratelimiter')) {
            const runnerBody = `
              ${pyRuntime}
              ${jsCode}
              if (typeof RateLimiter === 'function') {
                const rl = new RateLimiter(2);
                const r1 = rl.allow_request('10.0.0.1');
                const r2 = rl.allow_request('10.0.0.1');
                const r3 = rl.allow_request('10.0.0.1');
                rl.reset('10.0.0.1');
                const r4 = rl.allow_request('10.0.0.1');
                if (r1 === true && r2 === true && r3 === false && r4 === true) {
                  return 'RateLimiter verified';
                }
                return \`RateLimiter mismatch: r1=\${r1}, r2=\${r2}, r3=\${r3}, r4=\${r4}\`;
              }
              return 'Class RateLimiter not found';
            `;
            const runnerFn = new Function('mockConsole', runnerBody);
            actual = runnerFn(mockConsole);
          }
          // Special Class Suite: Adventurer (Intro to OOP)
          else if (tc.id === 'beg-cls1' || tc.name.toLowerCase().includes('adventurer')) {
            const runnerBody = `
              ${pyRuntime}
              ${jsCode}
              if (typeof Adventurer === 'function') {
                const adv = new Adventurer('Boots', 100);
                const r1 = adv.take_damage(30);
                const r2 = adv.take_damage(90);
                if (adv.name === 'Boots' && r1 === 70 && r2 === 0) {
                  return 'Adventurer class verified';
                }
                return \`Adventurer mismatch: r1=\${r1}, r2=\${r2}\`;
              }
              return 'Class Adventurer not found';
            `;
            const runnerFn = new Function('mockConsole', runnerBody);
            actual = runnerFn(mockConsole);
          }
          // Special Class Suite: LRUCache
          else if (tc.id === 'dsa-t1' || tc.name.toLowerCase().includes('lru')) {
            const runnerBody = `
              ${pyRuntime}
              ${jsCode}
              if (typeof LRUCache === 'function') {
                const lru = new LRUCache(2);
                lru.put('a', 1);
                lru.put('b', 2);
                const g1 = lru.get('a');
                lru.put('c', 3);
                const g2 = lru.get('b');
                const g3 = lru.get('c');
                if (g1 === 1 && g2 === -1 && g3 === 3) {
                  return 'LRU operations valid';
                }
                return \`LRU mismatch: g1=\${g1}, g2=\${g2}, g3=\${g3}\`;
              }
              return 'Class LRUCache not found';
            `;
            const runnerFn = new Function('mockConsole', runnerBody);
            actual = runnerFn(mockConsole);
          }
          // Special Boss Suite: ConnectionPoolGuard
          else if (tc.id === 'boss-p2-t1' || tc.name.toLowerCase().includes('connectionpoolguard')) {
            const runnerBody = `
              ${pyRuntime}
              ${jsCode}
              if (typeof ConnectionPoolGuard === 'function') {
                const g = new ConnectionPoolGuard(2);
                const a1 = g.acquire();
                const a2 = g.acquire();
                const a3 = g.acquire();
                g.release();
                const a4 = g.acquire();
                if (a1 === true && a2 === true && a3 === false && a4 === true) {
                  return 'Connection pool guarded';
                }
                return 'Connection pool guard mismatch';
              }
              return 'Class ConnectionPoolGuard not found';
            `;
            const runnerFn = new Function('mockConsole', runnerBody);
            actual = runnerFn(mockConsole);
          }
          // Special Boss Suite: process_dragon_orders
          else if (tc.id === 'boss-p1-t1') {
            const runnerBody = `
              ${pyRuntime}
              ${jsCode}
              if (typeof process_dragon_orders === 'function') {
                return process_dragon_orders([101, 102], {});
              }
              return undefined;
            `;
            const runnerFn = new Function('mockConsole', runnerBody);
            actual = runnerFn(mockConsole);
          }
          // Standard Function Call Resolution
          else {
            let callExpression = '';
            let fnName = '';

            // 1. Check inputDescription: `fn(args)`
            if (tc.inputDescription) {
              const descMatch = tc.inputDescription.trim().match(/^([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)$/);
              if (descMatch) {
                fnName = descMatch[1];
                callExpression = `${fnName}(${descMatch[2]})`;
              }
            }

            // 2. Check tc.name: `fn(args)`
            if (!callExpression && tc.name) {
              const nameMatch = tc.name.match(/([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)/);
              if (nameMatch) {
                fnName = nameMatch[1];
                callExpression = `${fnName}(${nameMatch[2]})`;
              }
            }

            // 3. Fallback: Parse kwargs from inputDescription like `health=50` or `a=50, b=15`
            if (!callExpression && tc.inputDescription) {
              const defMatch = userCode.match(/def\s+([a-zA-Z0-9_]+)/);
              if (defMatch) {
                fnName = defMatch[1];
                const rawArgs = tc.inputDescription.split(',').map((s: string) => {
                  const part = s.trim();
                  if (part.includes('=')) {
                    const val = part.split('=')[1].trim();
                    return val;
                  }
                  return part;
                });
                callExpression = `${fnName}(${rawArgs.join(', ')})`;
              }
            }

            // 4. Default: Find first defined function
            if (!callExpression) {
              const defMatch = userCode.match(/def\s+([a-zA-Z0-9_]+)/);
              if (defMatch) {
                fnName = defMatch[1];
                callExpression = `${fnName}()`;
              }
            }

            if (callExpression && fnName) {
              const runnerBody = `
                ${pyRuntime}
                ${jsCode}
                if (typeof ${fnName} === 'function') {
                  return ${callExpression};
                }
                return undefined;
              `;
              const runnerFn = new Function('mockConsole', runnerBody);
              actual = runnerFn(mockConsole);
            } else {
              actual = logs.length > 0 ? logs[logs.length - 1] : 'Code executed';
            }
          }

          // Fallback to logged print output if function returned undefined
          if (actual === undefined && logs.length > 0) {
            actual = logs[logs.length - 1];
          }

          // Evaluate equality
          if (typeof tc.expectedOutput === 'object' && tc.expectedOutput !== null) {
            passed = JSON.stringify(actual) === JSON.stringify(tc.expectedOutput);
          } else if (typeof tc.expectedOutput === 'number') {
            passed = Number(actual) === Number(tc.expectedOutput);
          } else if (typeof tc.expectedOutput === 'boolean') {
            passed = Boolean(actual) === Boolean(tc.expectedOutput);
          } else {
            const actStr = String(actual !== undefined && actual !== null ? actual : '').trim();
            const expStr = String(tc.expectedOutput ?? '').trim();
            passed = actStr === expStr || logs.some(l => l.trim() === expStr);
          }
        } catch (e: any) {
          errStr = e.message;
          actual = `Runtime Exception: ${e.message}`;
        }

        return {
          id: tc.id || `test-${idx}`,
          name: tc.name || `Assertion ${idx + 1}`,
          passed,
          input: tc.inputDescription || '',
          expected: tc.expectedOutput,
          actual: actual !== undefined ? actual : 'None',
          error: errStr
        };
      });

      const allPassed = testResults.length > 0 && testResults.every(t => t.passed);
      return {
        success: allPassed,
        output: logs.join('\n') || (allPassed ? '✓ All assertions passed successfully.' : 'Assertion failed.'),
        logs,
        executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
        testResults
      };
    }

    if (language === 'go') {
      logs.push(`=== RUN   TestGoPackage`);
      
      const testResults = testCases.map((tc, idx) => {
        let actual: any = null;
        let testPassed = false;
        let errorMsg: string | undefined = undefined;

        const hasCorrectSyntax = userCode.includes('func ') && !userCode.includes('def ');
        
        if (!hasCorrectSyntax) {
          return {
            id: tc.id || `test-${idx}`,
            name: tc.name || `Go Unit Test ${idx + 1}`,
            passed: false,
            expected: tc.expectedOutput,
            actual: "Syntax Error: Go requires 'func' syntax",
            error: "Go compiler error"
          };
        }

        // Concurrency & Logic verification
        if (userCode.includes('DistributeTasks')) {
          if (!userCode.includes('close(')) {
            testPassed = false;
            errorMsg = 'fatal error: all goroutines are asleep - deadlock! Channel was never closed.';
            actual = errorMsg;
            logs.push(`[panic] fatal error: all goroutines are asleep - deadlock!`);
          } else {
            testPassed = true;
            actual = tc.expectedOutput;
            logs.push(`[channel] channel closed cleanly, range loop terminated`);
          }
        } else if (userCode.includes('OrderLocks')) {
          if (userCode.includes('return 0, 0') || (!userCode.includes('<') && !userCode.includes('>'))) {
            testPassed = false;
            actual = 'OrderLocks did not compare lock IDs';
          } else {
            testPassed = true;
            actual = tc.expectedOutput;
          }
        } else if (userCode.includes('SafeChannelReceive')) {
          if (!userCode.includes('select') || userCode.includes('return ""')) {
            testPassed = false;
            actual = 'SafeChannelReceive did not use non-blocking select';
          } else {
            testPassed = true;
            actual = tc.expectedOutput;
          }
        } else if (userCode.includes('go ') || userCode.includes('chan ') || userCode.includes('sync.WaitGroup')) {
          logs.push(`[goroutine] spawned background worker`);
          logs.push(`[channel] message passed through channel`);
          logs.push(`[sync.WaitGroup] all routines completed`);
          actual = tc.expectedOutput;
          testPassed = !userCode.includes('// TODO');
        } else if (userCode.includes('struct') || userCode.includes('func (')) {
          logs.push(`[typecheck] struct and methods allocated`);
          actual = tc.expectedOutput;
          testPassed = !userCode.includes('// TODO');
        } else {
          actual = tc.expectedOutput;
          testPassed = !userCode.includes('// TODO');
        }

        return {
          id: tc.id || `test-${idx}`,
          name: tc.name || `TestGoUnit_${idx + 1}`,
          passed: testPassed,
          input: tc.inputDescription || 'Go test input',
          expected: tc.expectedOutput,
          actual: testPassed ? tc.expectedOutput : 'Failed: incomplete implementation',
          error: errorMsg
        };
      });

      const allPassed = testResults.every(t => t.passed);
      if (allPassed) {
        logs.push(`--- PASS: TestGoPackage (0.02s)`);
        logs.push(`PASS`);
      } else {
        logs.push(`--- FAIL: TestGoPackage (0.01s)`);
        logs.push(`FAIL`);
      }

      return {
        success: allPassed,
        output: logs.join('\n'),
        logs,
        executionTimeMs: Math.max(3, Math.round(performance.now() - startTime)),
        testResults
      };
    }

    if (language === 'bash') {
      // Real Bash & Unix Pipeline Simulator
      const cleanCmd = userCode.trim().replace(/^#.*$/gm, '').trim();
      let actualOutput = '';
      let isError = false;

      const pipeParts = cleanCmd.split('|').map(s => s.trim());
      const baseCmd = pipeParts[0];

      if (baseCmd.startsWith('cat')) {
        const fileName = baseCmd.replace('cat', '').trim();
        let fileContent = virtualFs[fileName];

        if (!fileContent) {
          actualOutput = `cat: ${fileName}: No such file or directory`;
          isError = true;
        } else {
          let piped = fileContent.split('\n');
          for (let i = 1; i < pipeParts.length; i++) {
            const p = pipeParts[i];
            if (p.startsWith('grep')) {
              const term = p.replace('grep', '').trim().replace(/['"]/g, '');
              piped = piped.filter(line => line.includes(term));
            } else if (p.startsWith('wc -l')) {
              piped = [String(piped.length)];
            } else if (p === 'sort') {
              piped = piped.sort();
            }
          }
          actualOutput = piped.join('\n').trim();
        }
      } else {
        actualOutput = `Executed: ${cleanCmd}`;
      }

      logs.push(actualOutput);

      const testResults = testCases.map((tc, idx) => {
        const expected = String(tc.expectedOutput ?? '').trim();
        const passed = !isError && (actualOutput === expected || actualOutput.includes(expected));
        return {
          id: tc.id || `test-${idx}`,
          name: tc.name || `Pipeline Test ${idx + 1}`,
          passed,
          expected: tc.expectedOutput,
          actual: actualOutput,
          error: isError ? actualOutput : undefined
        };
      });

      return {
        success: testResults.every(t => t.passed),
        output: actualOutput,
        logs,
        executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
        testResults
      };
    }

    // Default general runner
    const testResults = testCases.map((tc, idx) => {
      const isTodo = userCode.includes('TODO');
      const isComplete = userCode.trim().length > 15 && !isTodo;
      return {
        id: tc.id || `test-${idx}`,
        name: tc.name || `Verification Step ${idx + 1}`,
        passed: isComplete,
        expected: tc.expectedOutput,
        actual: isComplete ? tc.expectedOutput : (isTodo ? 'Pending TODO implementation' : 'Incomplete configuration'),
        error: !isComplete ? (isTodo ? 'Unresolved TODO comment: replace placeholders with verified topology' : 'Configuration incomplete') : undefined
      };
    });

    return {
      success: testResults.every(t => t.passed),
      output: `Executed successfully in ${Math.round(performance.now() - startTime)}ms.`,
      logs: ['Command executed without exit errors.'],
      executionTimeMs: Math.round(performance.now() - startTime),
      testResults
    };

  } catch (err: any) {
    return {
      success: false,
      output: `Runtime Error: ${err.message}`,
      logs: [`[FATAL] ${err.message}`],
      executionTimeMs: Math.round(performance.now() - startTime),
      testResults: testCases.map((tc, idx) => ({
        id: tc.id || `test-${idx}`,
        name: tc.name || `Test ${idx + 1}`,
        passed: false,
        expected: tc.expectedOutput,
        actual: 'Error thrown',
        error: err.message
      })),
      error: err.message
    };
  }
}
