import React, { useState } from 'react';
import { 
  AlertTriangle, 
  HelpCircle, 
  Search, 
  ArrowRight, 
  Terminal, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  ExternalLink,
  BookOpen,
  Filter
} from 'lucide-react';

interface ErrorEntry {
  id: string;
  language: 'Python' | 'JavaScript' | 'Go' | 'SQL';
  errorName: string;
  exampleMessage: string;
  eli5Meaning: string;
  whyItHappened: string;
  howToFix: string;
  badCodeSnippet: string;
  goodCodeSnippet: string;
  frequencyRank: 'Very Common' | 'Common' | 'Sneaky Trap';
}

const ERROR_DATABASE: ErrorEntry[] = [
  {
    id: 'py-index-error',
    language: 'Python',
    errorName: 'IndexError: list index out of range',
    exampleMessage: 'IndexError: list index out of range (line 4)',
    eli5Meaning: 'You asked for a locker that does not exist in the hallway.',
    whyItHappened: 'You attempted to access an item at an index number greater than or equal to the length of the list, or the list was empty. Remember that computers start counting at 0, so a 3-item list only has indices 0, 1, and 2!',
    howToFix: 'Check `len(my_list)` before accessing, or make sure your loop boundary stops at `len(my_list) - 1`.',
    badCodeSnippet: `fruits = ["apple", "banana"]
# len is 2, so valid slots are 0 and 1
print(fruits[2])  # 💥 IndexError!`,
    goodCodeSnippet: `fruits = ["apple", "banana"]
if len(fruits) > 2:
    print(fruits[2])
else:
    print(fruits[-1]) # Safely grab last item: "banana"`,
    frequencyRank: 'Very Common'
  },
  {
    id: 'py-key-error',
    language: 'Python',
    errorName: 'KeyError',
    exampleMessage: "KeyError: 'age' (line 6)",
    eli5Meaning: 'You asked a librarian for a book title that has never been registered in their catalog.',
    whyItHappened: 'You tried to look up a key in a dictionary (like `user["age"]`), but that dictionary does not contain that key.',
    howToFix: 'Use the safe `.get()` method (e.g. `user.get("age", 0)`), or check `if "age" in user:` before accessing.',
    badCodeSnippet: `user = {"name": "Alex", "email": "alex@mail.com"}
print(user["age"])  # 💥 KeyError: 'age'`,
    goodCodeSnippet: `user = {"name": "Alex", "email": "alex@mail.com"}
# Safe lookup with fallback default:
age = user.get("age", 18) 
print("Age is:", age)  # Safe! Prints 18`,
    frequencyRank: 'Very Common'
  },
  {
    id: 'py-type-error-concat',
    language: 'Python',
    errorName: 'TypeError: can only concatenate str to str, not "int"',
    exampleMessage: 'TypeError: can only concatenate str (not "int") to str (line 3)',
    eli5Meaning: 'You tried to staple a number to a word without converting it into text first.',
    whyItHappened: 'Python is strongly typed. You cannot do `"Score: " + 100` because a string cannot be mathematically added to an integer.',
    howToFix: 'Convert the number with `str(100)` or use modern f-strings: `f"Score: {score}"`.',
    badCodeSnippet: `score = 95
print("Your score is: " + score) # 💥 TypeError!`,
    goodCodeSnippet: `score = 95
# Modern python f-string formats automatically:
print(f"Your score is: {score}") # Clean & Safe!`,
    frequencyRank: 'Very Common'
  },
  {
    id: 'js-undefined-prop',
    language: 'JavaScript',
    errorName: 'TypeError: Cannot read properties of undefined',
    exampleMessage: "TypeError: Cannot read properties of undefined (reading 'name')",
    eli5Meaning: 'You opened an empty box expecting an envelope, and asked for the address written on the envelope.',
    whyItHappened: 'You chained a dot access like `user.profile.name`, but `user.profile` was never defined or returned null.',
    howToFix: 'Use optional chaining `?.` introduced in modern JavaScript: `user?.profile?.name`.',
    badCodeSnippet: `const response = {}; // empty object
console.log(response.user.name); 
// 💥 TypeError: Cannot read properties of undefined (reading 'name')`,
    goodCodeSnippet: `const response = {};
// Optional chaining returns undefined instead of crashing:
console.log(response?.user?.name ?? "Guest"); // Prints "Guest"!`,
    frequencyRank: 'Very Common'
  },
  {
    id: 'js-nan',
    language: 'JavaScript',
    errorName: 'Result is NaN (Not a Number)',
    exampleMessage: 'Value displays as NaN in calculation output',
    eli5Meaning: 'You tried to multiply words by numbers or divided by an undefined value.',
    whyItHappened: 'JavaScript didn’t crash with a red error, but quietly converted bad math into the special floating-point value NaN.',
    howToFix: 'Validate that the input is a valid number with `Number.isNaN()` or use `parseInt(val, 10)`.',
    badCodeSnippet: `const price = "29.99";
const tax = price * undefined;
console.log(tax); // NaN!`,
    goodCodeSnippet: `const price = parseFloat("29.99");
const taxRate = 0.08;
const tax = Number.isNaN(price) ? 0 : price * taxRate;
console.log(tax); // 2.3992`,
    frequencyRank: 'Common'
  },
  {
    id: 'sql-null-trap',
    language: 'SQL',
    errorName: 'NULL comparison with = instead of IS NULL',
    exampleMessage: 'Query returns 0 rows unexpectedly when filtering for NULL',
    eli5Meaning: 'Asking "Is this empty void equal to another empty void?" SQL says UNKNOWN to everything.',
    whyItHappened: 'In SQL, `NULL` represents the absence of a value. Doing `WHERE email = NULL` always returns FALSE for every single row!',
    howToFix: 'Always write `WHERE email IS NULL` or `WHERE email IS NOT NULL`.',
    badCodeSnippet: `-- 💥 Returns 0 rows even if NULL values exist!
SELECT * FROM users WHERE invited_by = NULL;`,
    goodCodeSnippet: `-- ✅ Proper SQL syntax:
SELECT * FROM users WHERE invited_by IS NULL;`,
    frequencyRank: 'Sneaky Trap'
  },
  {
    id: 'go-nil-pointer',
    language: 'Go',
    errorName: 'panic: runtime error: invalid memory address or nil pointer dereference',
    exampleMessage: 'panic: runtime error: invalid memory address or nil pointer dereference [signal SIGSEGV]',
    eli5Meaning: 'You knocked on an address that points into thin air, and the whole city halted.',
    whyItHappened: 'You attempted to read or call a method on a pointer variable whose value was `nil`.',
    howToFix: 'Always check `if ptr != nil` before dereferencing or accessing fields.',
    badCodeSnippet: `var u *User // uninitialized, so it is nil!
fmt.Println(u.Name) // 💥 Panic! SIGSEGV nil pointer dereference`,
    goodCodeSnippet: `var u *User
if u != nil {
    fmt.Println(u.Name)
} else {
    fmt.Println("User not initialized")
}`,
    frequencyRank: 'Sneaky Trap'
  }
];

export const ErrorDecoderView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [selectedErrorId, setSelectedErrorId] = useState<string>(ERROR_DATABASE[0].id);

  const filtered = ERROR_DATABASE.filter(err => {
    const matchesLang = selectedLang === 'All' || err.language === selectedLang;
    const matchesSearch = err.errorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          err.eli5Meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          err.exampleMessage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLang && matchesSearch;
  });

  const selectedError = ERROR_DATABASE.find(e => e.id === selectedErrorId) || ERROR_DATABASE[0];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/40 p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Beginner Panic-Proof Field Guide</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Cryptic Error Message Decoder
              </h1>
              <p className="mt-1 text-sm text-slate-300 max-w-xl">
                Red terminal error messages scare every beginner into thinking they broke their computer. Search any cryptic error below to translate it into plain English!
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col gap-1.5 md:w-64 shrink-0">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Golden Rule of Errors</span>
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Errors are not personal failures — they are precise coordinates where your instructions and the CPU’s rules disagreed.
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search error e.g. 'out of range', 'undefined', 'TypeError'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto">
            {['All', 'Python', 'JavaScript', 'Go', 'SQL'].map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedLang === lang
                    ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Content Split: Error List on Left, Decoder on Right */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: List of Errors */}
          <div className="w-full lg:w-96 shrink-0 flex flex-col gap-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase px-1">Common Crash Scenarios ({filtered.length})</span>
            {filtered.map(err => {
              const isSelected = selectedError.id === err.id;
              return (
                <button
                  key={err.id}
                  onClick={() => setSelectedErrorId(err.id)}
                  className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-200 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {err.language}
                    </span>
                    <span className={`text-[10px] font-semibold ${
                      err.frequencyRank === 'Very Common' ? 'text-amber-400' : 'text-slate-400'
                    }`}>
                      {err.frequencyRank}
                    </span>
                  </div>

                  <span className="font-mono text-xs font-bold text-white mt-2 truncate">
                    {err.errorName}
                  </span>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                    {err.eli5Meaning}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Error Breakdown */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Header of Error */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col gap-5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                      {selectedError.language}
                    </span>
                    <span className="text-xs text-slate-400">• {selectedError.frequencyRank}</span>
                  </div>
                  <h2 className="text-xl font-bold font-mono text-white mt-2">
                    {selectedError.errorName}
                  </h2>
                </div>
              </div>

              {/* Terminal Preview */}
              <div className="bg-slate-950 rounded-xl p-4 border border-rose-500/30 flex items-start gap-3">
                <Terminal className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 overflow-x-auto font-mono text-xs text-rose-300">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">What You See in the Terminal:</span>
                  <code>{selectedError.exampleMessage}</code>
                </div>
              </div>

              {/* ELI5 Plain English Meaning */}
              <div className="bg-amber-950/20 rounded-xl p-4 border border-amber-500/20 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-amber-300">Plain-English (ELI5) Translation:</span>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    {selectedError.eli5Meaning}
                  </p>
                </div>
              </div>

              {/* Technical Reason & The Fix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span>Why It Happened</span>
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedError.whyItHappened}
                  </p>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>How to Fix It</span>
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedError.howToFix}
                  </p>
                </div>
              </div>

              {/* Code Comparison (Bad vs Good) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bad Code */}
                <div className="rounded-xl border border-rose-500/30 bg-slate-950 overflow-hidden">
                  <div className="bg-rose-950/40 px-3 py-2 border-b border-rose-500/20 text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                    <span>Broken Code (Throws Error)</span>
                  </div>
                  <div className="p-3 font-mono text-xs text-rose-200 overflow-x-auto">
                    <pre>{selectedError.badCodeSnippet}</pre>
                  </div>
                </div>

                {/* Good Code */}
                <div className="rounded-xl border border-emerald-500/30 bg-slate-950 overflow-hidden">
                  <div className="bg-emerald-950/40 px-3 py-2 border-b border-emerald-500/20 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Fixed Code (Production-Safe)</span>
                  </div>
                  <div className="p-3 font-mono text-xs text-emerald-200 overflow-x-auto">
                    <pre>{selectedError.goodCodeSnippet}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
