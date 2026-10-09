import React, { useState } from 'react';
import { 
  Languages, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  Zap, 
  Layers,
  Code2,
  Terminal,
  Cpu,
  BrainCircuit,
  BookmarkCheck,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

interface ConceptComparison {
  id: string;
  title: string;
  category: 'Foundations' | 'Logic & Flow' | 'Data Structures' | 'Functions' | 'Async & Threads';
  conceptExplanation: string;
  eli5: string;
  collegeCourseTip: string;
  codeSnippets: {
    python: string;
    javascript: string;
    go: string;
    java: string;
    cpp: string;
  };
  keyTakeaway: string;
}

export const RosettaStoneView: React.FC = () => {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'python' | 'javascript' | 'go' | 'java' | 'cpp'>('all');
  const [copiedLang, setCopiedLang] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const concepts: ConceptComparison[] = [
    {
      id: 'variables',
      title: 'Variables & Data Types',
      category: 'Foundations',
      conceptExplanation: 'A variable is a labeled container in RAM memory storing a value. Dynamic languages (Python, JS) infer the type automatically, while static languages (Go, Java, C++) require explicitly declaring the type before compiling.',
      eli5: 'Think of variables like storage boxes in your closet. In Python, you just drop shoes inside and it figures it out. In C++ or Java, the box has a strict label stamped "SIZE 10 SNEAKERS ONLY" — put a shirt in and it refuses to close!',
      collegeCourseTip: 'In CS 101, professors love asking "What is strongly-typed vs dynamically-typed?" Point out that static typing catches typos at compile time before the program even runs.',
      codeSnippets: {
        python: `# Python: Dynamically typed (no type declaration needed)
user_name = "Alex"
user_age = 21
is_enrolled = True

print(f"Student {user_name} is {user_age} years old.")`,
        javascript: `// JavaScript: 'let' for mutable, 'const' for constants
const userName = "Alex";
let userAge = 21;
const isEnrolled = true;

console.log(\`Student \${userName} is \${userAge} years old.\`);`,
        go: `// Go: Statically typed with fast compiler inference :=
package main
import "fmt"

func main() {
    userName := "Alex" // infers string
    var userAge int = 21
    isEnrolled := true

    fmt.Printf("Student %s is %d years old.\\n", userName, userAge)
}`,
        java: `// Java: Strict static typing, everything inside a class
public class Main {
    public static void main(String[] args) {
        String userName = "Alex";
        int userAge = 21;
        boolean isEnrolled = true;

        System.out.println("Student " + userName + " is " + userAge + " years old.");
    }
}`,
        cpp: `// C++: High performance, manual types, standard IO
#include <iostream>
#include <string>

int main() {
    std::string userName = "Alex";
    int userAge = 21;
    bool isEnrolled = true;

    std::cout << "Student " << userName << " is " << userAge << " years old.\\n";
    return 0;
}`
      },
      keyTakeaway: 'The core logic is identical across all 5: allocate memory, store a label, retrieve it to print. Only the syntax decorations and type ceremonies change.'
    },
    {
      id: 'conditionals',
      title: 'Conditional Branching (if / else)',
      category: 'Logic & Flow',
      conceptExplanation: 'Branching evaluates a boolean condition (True or False). If true, the CPU executes instruction block A; otherwise, it jumps to block B.',
      eli5: 'A fork in the road: "If it is raining, open the umbrella. Else, put on sunglasses." The computer never does both.',
      collegeCourseTip: 'Pay attention to how different languages handle "truthiness". In Python 0 and empty lists [] are False. In JavaScript, 0 and empty strings "" are falsy, but empty arrays [] are truthy!',
      codeSnippets: {
        python: `# Python: Clean indentation replaces curly braces
score = 88

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C or below"

print("Grade:", grade)`,
        javascript: `// JavaScript: Parentheses around condition + curly braces
const score = 88;
let grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else {
    grade = "C or below";
}

console.log("Grade:", grade);`,
        go: `// Go: No parentheses around condition, braces mandatory
package main
import "fmt"

func main() {
    score := 88
    var grade string

    if score >= 90 {
        grade = "A"
    } else if score >= 80 {
        grade = "B"
    } else {
        grade = "C or below"
    }

    fmt.Println("Grade:", grade)
}`,
        java: `// Java: Same C-style syntax as JS and C++
public class Main {
    public static void main(String[] args) {
        int score = 88;
        String grade;

        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else {
            grade = "C or below";
        }

        System.out.println("Grade: " + grade);
    }
}`,
        cpp: `// C++: Exact same flow control structure
#include <iostream>
#include <string>

int main() {
    int score = 88;
    std::string grade;

    if (score >= 90) {
        grade = "A";
    } else if (score >= 80) {
        grade = "B";
    } else {
        grade = "C or below";
    }

    std::cout << "Grade: " << grade << std::endl;
    return 0;
}`
      },
      keyTakeaway: 'Notice how every language evaluates the exact same 3 branches. Master the logic once, and you can write conditionals in ANY language on day one.'
    },
    {
      id: 'loops',
      title: 'Loops & Iteration (Counting to 5)',
      category: 'Logic & Flow',
      conceptExplanation: 'A loop instructs the CPU to execute a block of statements repeatedly until a boundary termination condition is met.',
      eli5: 'Doing 5 jumping jacks: count "1, 2, 3, 4, 5", stop when you hit 5. If you forget to increment the counter, you jump forever (infinite loop)!',
      collegeCourseTip: 'Exams frequently test "Off-by-One" errors (e.g., using < vs <=, or starting at 0 vs 1). Notice that Python range(5) produces 0, 1, 2, 3, 4 (5 numbers total).',
      codeSnippets: {
        python: `# Python: For-in loop with range generator
for i in range(1, 6):
    print(f"Count: {i}")

# Or iterating directly over items:
items = ["apple", "banana", "cherry"]
for fruit in items:
    print(fruit)`,
        javascript: `// JavaScript: Standard C-style loop or modern for...of
for (let i = 1; i <= 5; i++) {
    console.log(\`Count: \${i}\`);
}

// Or array iteration:
const items = ["apple", "banana", "cherry"];
for (const fruit of items) {
    console.log(fruit);
}`,
        go: `// Go: Go only has ONE loop keyword ('for' does it all!)
package main
import "fmt"

func main() {
    for i := 1; i <= 5; i++ {
        fmt.Printf("Count: %d\\n", i)
    }

    // Range loop over slice:
    items := []string{"apple", "banana", "cherry"}
    for _, fruit := range items {
        fmt.Println(fruit)
    }
}`,
        java: `// Java: C-style for loop or enhanced for-each
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }

        String[] items = {"apple", "banana", "cherry"};
        for (String fruit : items) {
            System.out.println(fruit);
        }
    }
}`,
        cpp: `// C++: Traditional for loop or range-based for (C++11)
#include <iostream>
#include <vector>
#include <string>

int main() {
    for (int i = 1; i <= 5; ++i) {
        std::cout << "Count: " << i << "\\n";
    }

    std::vector<std::string> items = {"apple", "banana", "cherry"};
    for (const auto& fruit : items) {
        std::cout << fruit << "\\n";
    }
    return 0;
}`
      },
      keyTakeaway: 'The three essential ingredients of any loop: Initializer, Condition Check, and Step Increment. All languages require them.'
    },
    {
      id: 'functions',
      title: 'Functions & Return Values',
      category: 'Functions',
      conceptExplanation: 'A function packages reusable logic into a named subroutine with inputs (parameters) and an output (return value).',
      eli5: 'A toaster: you drop bread in (input), it toasts it (logic), and pops toast out (return value). You can toast 100 slices without rebuilding the toaster each time.',
      collegeCourseTip: 'Colleges test "Pass-by-Value vs Pass-by-Reference". In Python/JS, primitives are passed by value, objects by reference. In Go and C++, you can explicitly choose pointers (*) to pass by memory address.',
      codeSnippets: {
        python: `# Python: 'def' keyword with default or return value
def calculate_tax(subtotal: float, rate: float = 0.08) -> float:
    total_tax = subtotal * rate
    return round(total_tax, 2)

tax = calculate_tax(100.0)
print(f"Tax: \${tax}")`,
        javascript: `// JavaScript: Arrow function or traditional function
function calculateTax(subtotal, rate = 0.08) {
    const totalTax = subtotal * rate;
    return Number(totalTax.toFixed(2));
}

// Arrow syntax:
const calcTax = (subtotal, rate = 0.08) => +(subtotal * rate).toFixed(2);

console.log("Tax: $" + calculateTax(100.0));`,
        go: `// Go: Type declarations on params AND returns. Can return MULTIPLE values!
package main
import "fmt"

func calculateTax(subtotal float64, rate float64) float64 {
    return subtotal * rate
}

func main() {
    tax := calculateTax(100.0, 0.08)
    fmt.Printf("Tax: $%.2f\\n", tax)
}`,
        java: `// Java: Must specify return type and parameter types
public class Main {
    public static double calculateTax(double subtotal, double rate) {
        return Math.round((subtotal * rate) * 100.0) / 100.0;
    }

    public static void main(String[] args) {
        double tax = calculateTax(100.0, 0.08);
        System.out.println("Tax: $" + tax);
    }
}`,
        cpp: `// C++: Return type preceding function name
#include <iostream>
#include <iomanip>

double calculateTax(double subtotal, double rate = 0.08) {
    return subtotal * rate;
}

int main() {
    double tax = calculateTax(100.0);
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "Tax: $" << tax << "\\n";
    return 0;
}`
      },
      keyTakeaway: 'Writing functions turns spaghetti code into clean, testable modular blocks. Never repeat code — make a function.'
    },
    {
      id: 'arrays',
      title: 'Lists, Arrays & Key-Value Maps',
      category: 'Data Structures',
      conceptExplanation: 'Contiguous index-based memory storage (Arrays/Lists) for sequences, and Hash Tables (Dictionaries/Maps) for O(1) key-value lookup.',
      eli5: 'An Array is an egg carton (slot 0, slot 1, slot 2). A Map / Dictionary is a phonebook (lookup name "Bob" to get their number).',
      collegeCourseTip: 'Crucial for exams: 99% of languages use 0-INDEXING (the first element is at index 0, not index 1)! For maps, interviewers always ask why lookups are O(1) on average (Hashing).',
      codeSnippets: {
        python: `# Python: Lists [] and Dictionaries {}
users = ["Alice", "Bob", "Charlie"]
print("First:", users[0])  # Alice

# Hash Map (dict):
scores = {"Alice": 95, "Bob": 82}
print("Alice score:", scores["Alice"])`,
        javascript: `// JavaScript: Arrays [] and Objects / Map
const users = ["Alice", "Bob", "Charlie"];
console.log("First:", users[0]); // Alice

// Hash Map (Object or new Map()):
const scores = { Alice: 95, Bob: 82 };
console.log("Alice score:", scores["Alice"]);`,
        go: `// Go: Slices []string and Maps map[string]int
package main
import "fmt"

func main() {
    users := []string{"Alice", "Bob", "Charlie"}
    fmt.Println("First:", users[0])

    // Hash Map:
    scores := map[string]int{"Alice": 95, "Bob": 82}
    fmt.Println("Alice score:", scores["Alice"])
}`,
        java: `// Java: ArrayList and HashMap
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> users = Arrays.asList("Alice", "Bob", "Charlie");
        System.out.println("First: " + users.get(0));

        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 82);
        System.out.println("Alice score: " + scores.get("Alice"));
    }
}`,
        cpp: `// C++: std::vector and std::unordered_map
#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>

int main() {
    std::vector<std::string> users = {"Alice", "Bob", "Charlie"};
    std::cout << "First: " << users[0] << "\\n";

    std::unordered_map<std::string, int> scores = {{"Alice", 95}, {"Bob", 82}};
    std::cout << "Alice score: " << scores["Alice"] << "\\n";
    return 0;
}`
      },
      keyTakeaway: 'No matter the language, arrays give sequential access by number, while hash tables give instant lookup by key.'
    },
    {
      id: 'error-handling',
      title: 'Error & Exception Handling',
      category: 'Logic & Flow',
      conceptExplanation: 'Instead of crashing the entire system when an illegal operation occurs (like dividing by zero or missing file), languages intercept errors with try/catch or explicit error returns.',
      eli5: 'Like an emergency parachute. If something goes wrong mid-air, you do not hit the ground; the parachute deploys and you handle the emergency gracefully.',
      collegeCourseTip: 'Go is famous for NOT using exceptions (it returns error as a second value like (res, err)), whereas Python, JS, Java, and C++ use try/catch/except blocks.',
      codeSnippets: {
        python: `# Python: try / except / finally
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Cannot divide by zero!")
        return 0

result = safe_divide(10, 0)`,
        javascript: `// JavaScript: try / catch / finally
function safeDivide(a, b) {
    try {
        if (b === 0) throw new Error("Cannot divide by zero!");
        return a / b;
    } catch (err) {
        console.error(err.message);
        return 0;
    }
}`,
        go: `// Go: Explicit error returns (No exceptions!)
package main
import (
    "errors"
    "fmt"
)

func safeDivide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    res, err := safeDivide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
    }
}`,
        java: `// Java: Checked & Unchecked exceptions
public class Main {
    public static double safeDivide(double a, double b) {
        try {
            if (b == 0) throw new ArithmeticException("Divide by zero");
            return a / b;
        } catch (ArithmeticException e) {
            System.err.println(e.getMessage());
            return 0;
        }
    }
}`,
        cpp: `// C++: try / catch with std::exception
#include <iostream>
#include <stdexcept>

double safeDivide(double a, double b) {
    try {
        if (b == 0) throw std::runtime_error("Cannot divide by zero!");
        return a / b;
    } catch (const std::exception& e) {
        std::cerr << e.what() << "\\n";
        return 0;
    }
}`
      },
      keyTakeaway: 'Robust programs never crash silently. Handling errors makes you a senior-level engineer in the eyes of instructors and interviewers.'
    }
  ];

  const categories = ['All', 'Foundations', 'Logic & Flow', 'Data Structures', 'Functions'];

  const filteredConcepts = activeCategory === 'All'
    ? concepts
    : concepts.filter(c => c.category === activeCategory);

  const currentConcept = concepts[selectedConceptIndex] || concepts[0];

  const handleCopy = (lang: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  const languageMetadata = [
    { key: 'python', name: 'Python', color: 'text-amber-400', border: 'border-amber-500/40', badge: 'Beginner Gold Standard', desc: 'Readability, data science, fast prototyping' },
    { key: 'javascript', name: 'JavaScript / Node', color: 'text-yellow-400', border: 'border-yellow-500/40', badge: 'Web Standard', desc: 'Runs in all browsers, full-stack, async event loop' },
    { key: 'go', name: 'Go (Golang)', color: 'text-cyan-400', border: 'border-cyan-500/40', badge: 'Cloud & Systems', desc: 'Created by Google, ultra-fast concurrency, microservices' },
    { key: 'java', name: 'Java', color: 'text-orange-400', border: 'border-orange-500/40', badge: 'Collegiate & Enterprise', desc: 'Used in 65% of University CS 101/102 programs, OOP' },
    { key: 'cpp', name: 'C++', color: 'text-blue-400', border: 'border-blue-500/40', badge: 'Performance & Gaming', desc: 'Hardware control, game engines, pointers, low latency' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto p-4 md:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto w-full mb-6">
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
                <Languages className="h-3.5 w-3.5" />
                <span>Multi-Language Universal Decoder</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <span>The Coding Rosetta Stone</span>
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
                Proof that <strong>code logic is universal</strong>. Learn any concept once, and see it side-by-side across 
                <strong> Python, JavaScript, Go, Java, and C++</strong>. Master this and you can adapt to any college class or company tech stack effortlessly.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 shrink-0 md:w-72">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <BrainCircuit className="h-4 w-4" />
                <span>The Superpower of Polyglots</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Colleges often force students to switch from Python to Java to C++. Knowing the syntactic translations eliminates 90% of beginner anxiety.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar: Concept Selector */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Concepts List */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-2 flex flex-col gap-1.5 shadow-sm">
            <span className="text-[11px] font-mono text-slate-500 uppercase px-2 py-1">Core Programming Paradigms</span>
            {filteredConcepts.map((c) => {
              const originalIndex = concepts.findIndex(item => item.id === c.id);
              const isSelected = selectedConceptIndex === originalIndex;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedConceptIndex(originalIndex)}
                  className={`flex flex-col text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm'
                      : 'border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs">{c.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {c.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                    {c.eli5}
                  </p>
                </button>
              );
            })}
          </div>

          {/* College Secret Weapon Callout */}
          <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4 text-xs text-indigo-200">
            <div className="flex items-center gap-2 font-bold text-indigo-300 mb-1">
              <Lightbulb className="h-4 w-4" />
              <span>Collegiate Tip</span>
            </div>
            <p className="leading-relaxed">
              When starting college, your first class might be Java (AP CS A) or C++. Having this cross-reference open lets you translate complex lecture examples back into simple Python in seconds!
            </p>
          </div>
        </div>

        {/* Right Main Area: Selected Concept Translation Deck */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Concept Explanation Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Concept Deep Dive</span>
                <h2 className="text-xl font-bold text-white mt-0.5">{currentConcept.title}</h2>
              </div>

              {/* Language View Filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto">
                <button
                  onClick={() => setSelectedLanguage('all')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                    selectedLanguage === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All 5 Side-by-Side
                </button>
                {(['python', 'javascript', 'go', 'java', 'cpp'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2 py-1 rounded text-xs font-medium uppercase font-mono cursor-pointer ${
                      selectedLanguage === lang ? 'bg-slate-800 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'javascript' ? 'JS' : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation & ELI5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-950/60 rounded-lg p-3.5 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                  <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                  <span>How the CPU & Memory See It</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentConcept.conceptExplanation}
                </p>
              </div>

              <div className="bg-amber-950/20 rounded-lg p-3.5 border border-amber-500/20">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>ELI5 Everyday Analogy</span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {currentConcept.eli5}
                </p>
              </div>
            </div>

            {/* College & Exam Advantage */}
            <div className="mt-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3 flex items-start gap-2.5">
              <BookmarkCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-200">
                <span className="font-bold text-emerald-300">College Course Exam Advantage: </span>
                {currentConcept.collegeCourseTip}
              </div>
            </div>
          </div>

          {/* Multi-Language Code Snippets Grid */}
          <div className={`grid gap-4 ${
            selectedLanguage === 'all' 
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {languageMetadata
              .filter(m => selectedLanguage === 'all' || selectedLanguage === m.key)
              .map(meta => {
                const langKey = meta.key as keyof typeof currentConcept.codeSnippets;
                const snippet = currentConcept.codeSnippets[langKey];
                const isCopied = copiedLang === meta.key;

                return (
                  <div 
                    key={meta.key}
                    className="flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm hover:border-slate-700 transition-all"
                  >
                    {/* Header */}
                    <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-xs ${meta.color}`}>
                          {meta.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          {meta.badge}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopy(meta.key, snippet)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 cursor-pointer"
                        title="Copy code"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400 font-mono text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span className="font-mono text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Language Micro-Blurb */}
                    <div className="px-4 py-1.5 bg-slate-950/40 border-b border-slate-850 text-[11px] text-slate-400">
                      {meta.desc}
                    </div>

                    {/* Code Body */}
                    <div className="p-4 bg-slate-950/80 flex-1 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed selection:bg-amber-500/30">
                      <pre className="whitespace-pre">{snippet}</pre>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Universal Takeaway Footer */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <Zap className="h-5 w-5 text-amber-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">Universal Rule: </span>
              {currentConcept.keyTakeaway}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
