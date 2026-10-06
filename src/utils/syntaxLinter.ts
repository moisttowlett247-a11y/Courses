export interface SyntaxLintWarning {
  line: number;
  message: string;
  type: 'colon' | 'quotes' | 'indent' | 'parenthesis' | 'return';
}

export function lintUserCode(language: string, code: string): SyntaxLintWarning[] {
  const warnings: SyntaxLintWarning[] = [];
  if (!code || code.trim().length === 0) return warnings;

  const lines = code.split('\n');

  if (language === 'python') {
    lines.forEach((lineText, idx) => {
      const lineNum = idx + 1;
      const trimmed = lineText.trim();

      // Skip comment lines
      if (trimmed.startsWith('#') || trimmed.length === 0) return;

      // 1. Missing Colon check on def/if/elif/else/for/while
      const headerMatches = /^(def\s+[a-zA-Z0-9_]+\s*\(.*?\)|if\s+.+|elif\s+.+|else|for\s+.+\s+in\s+.+|while\s+.+)$/;
      if (headerMatches.test(trimmed) && !trimmed.endsWith(':')) {
        warnings.push({
          line: lineNum,
          message: `Did you forget a colon (:) at the end of line ${lineNum}? Python requires ":" at the end of headers.`,
          type: 'colon'
        });
      }

      // 2. Unclosed quote check on a single line
      const singleQuotes = (lineText.match(/'/g) || []).length;
      const doubleQuotes = (lineText.match(/"/g) || []).length;
      if (singleQuotes % 2 !== 0) {
        warnings.push({
          line: lineNum,
          message: `Unclosed single quote (') on line ${lineNum}. Make sure every opened quote is closed!`,
          type: 'quotes'
        });
      }
      if (doubleQuotes % 2 !== 0 && !lineText.includes('"""')) {
        warnings.push({
          line: lineNum,
          message: `Unclosed double quote (") on line ${lineNum}. Make sure every opened quote is closed!`,
          type: 'quotes'
        });
      }

      // 3. Unmatched parentheses () on a single line
      const openParens = (lineText.match(/\(/g) || []).length;
      const closeParens = (lineText.match(/\)/g) || []).length;
      if (openParens > closeParens) {
        warnings.push({
          line: lineNum,
          message: `Unclosed parenthesis '(' on line ${lineNum}. Remember to close it with ')'!`,
          type: 'parenthesis'
        });
      }
    });

    // 4. Missing return warning in function definition
    if (code.includes('def ') && !code.includes('return') && !code.includes('print')) {
      warnings.push({
        line: 1,
        message: 'Friendly tip: Your function might be missing a "return" statement to hand the answer back.',
        type: 'return'
      });
    }
  }

  return warnings;
}
