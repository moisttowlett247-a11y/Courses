import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Trophy, 
  Timer, 
  AlertCircle,
  HelpCircle,
  BarChart3,
  Terminal,
  Code
} from 'lucide-react';

interface Drill {
  id: string;
  category: 'Symbols & Syntax' | 'Variable Assignments' | 'Loops & Conditionals' | 'Function Declarations' | 'Full Snippet';
  title: string;
  promptText: string;
  language: string;
  description: string;
  tips: string;
}

const DRILLS: Drill[] = [
  {
    id: 'symbols-1',
    category: 'Symbols & Syntax',
    title: 'Code Punctuation Gauntlet',
    promptText: 'const total = items.map(x => x * 2).filter(x => x > 10);',
    language: 'javascript',
    description: 'Master fast typing of brackets, arrows, and dots without looking down at the keyboard.',
    tips: 'Use your right pinky for parentheses and curly brackets. Do not hesitate on the fat arrow =>.'
  },
  {
    id: 'python-dict',
    category: 'Symbols & Syntax',
    title: 'Python Dict & Slices',
    promptText: 'payload = {"user_id": 402, "roles": ["admin", "editor"]}',
    language: 'python',
    description: 'Drill curly braces {}, quotes, and colons in rapid succession.',
    tips: 'Keep your left hand anchored on ASDF for quick quotes and colons.'
  },
  {
    id: 'for-loop',
    category: 'Loops & Conditionals',
    title: 'Standard C/JS For Loop',
    promptText: 'for (let i = 0; i < maxLimit; i++) { count += i; }',
    language: 'javascript',
    description: 'The single most common loop pattern tested in college exams.',
    tips: 'Semicolons inside the condition are mandatory! Muscle memory here prevents 80% of syntax errors.'
  },
  {
    id: 'py-func',
    category: 'Function Declarations',
    title: 'Python Function with Types',
    promptText: 'def get_user_status(user_id: int) -> bool:',
    language: 'python',
    description: 'Type annotations and function definitions in Python 3.',
    tips: 'Notice the arrow -> before the return type and the colon : at the end.'
  },
  {
    id: 'go-err',
    category: 'Loops & Conditionals',
    title: 'Go Error Handling Pattern',
    promptText: 'if err != nil { return nil, fmt.Errorf("failed: %w", err) }',
    language: 'go',
    description: 'The golden error handling pattern in production Go backend systems.',
    tips: 'Typing != and := rapidly separates junior engineers from seasoned cloud architects.'
  },
  {
    id: 'sql-query',
    category: 'Full Snippet',
    title: 'SQL Join & Filter',
    promptText: 'SELECT u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.name;',
    language: 'sql',
    description: 'High-speed SQL data querying syntax.',
    tips: 'Uppercase keywords train deliberate typing cadence.'
  }
];

export const SpeedDrillsView: React.FC = () => {
  const [selectedDrillIndex, setSelectedDrillIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestWpm, setBestWpm] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentDrill = DRILLS[selectedDrillIndex];
  const targetText = currentDrill.promptText;

  // Reset when drill changes
  useEffect(() => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedDrillIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const val = e.target.value;
    
    // Start timer on first keystroke
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    setUserInput(val);

    // Calculate real-time stats
    let errors = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== targetText[i]) {
        errors++;
      }
    }

    const currentAccuracy = val.length > 0 
      ? Math.max(0, Math.round(((val.length - errors) / val.length) * 100))
      : 100;
    setAccuracy(currentAccuracy);

    // Check completion
    if (val === targetText) {
      const now = Date.now();
      setEndTime(now);
      setIsFinished(true);
      const elapsedMinutes = (now - (startTime || now)) / 60000;
      const words = targetText.length / 5;
      const finalWpm = Math.round(words / Math.max(elapsedMinutes, 0.01));
      setWpm(finalWpm);
      setStreak(s => s + 1);
      if (finalWpm > bestWpm) {
        setBestWpm(finalWpm);
      }
    }
  };

  const handleReset = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleNextDrill = () => {
    setSelectedDrillIndex((prev) => (prev + 1) % DRILLS.length);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
                <Keyboard className="h-3.5 w-3.5" />
                <span>Muscle Memory & Syntax Speed Drills</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Code Typing Speed & Symbol Reflexes
              </h1>
              <p className="mt-1 text-sm text-slate-300 max-w-xl">
                Beginners waste 60% of their coding time hunting for brackets, arrows, and quotes. Drill code typing to build unconscious keyboard reflex!
              </p>
            </div>

            {/* Scorecard Top Badges */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 flex flex-col items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Best Speed</span>
                <span className="text-xl font-mono font-bold text-amber-400">{bestWpm} <span className="text-xs text-slate-400">WPM</span></span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 flex flex-col items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Streak</span>
                <span className="text-xl font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  {streak}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drill Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {DRILLS.map((drill, idx) => (
            <button
              key={drill.id}
              onClick={() => setSelectedDrillIndex(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer flex items-center gap-2 ${
                selectedDrillIndex === idx
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{drill.title}</span>
              <span className="text-[10px] font-mono uppercase bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                {drill.language}
              </span>
            </button>
          ))}
        </div>

        {/* Active Drill Card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 flex flex-col gap-6 shadow-lg">
          {/* Drill info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">{currentDrill.category}</span>
              <h2 className="text-xl font-bold text-white mt-0.5">{currentDrill.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{currentDrill.description}</p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Prompt Display with character-by-character coloring */}
          <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 font-mono text-base md:text-lg tracking-wide leading-relaxed overflow-x-auto select-none">
            {targetText.split('').map((char, index) => {
              let charStyle = 'text-slate-500'; // Untyped
              if (index < userInput.length) {
                if (userInput[index] === char) {
                  charStyle = 'text-emerald-400 font-bold bg-emerald-500/10 rounded';
                } else {
                  charStyle = 'text-rose-400 font-bold bg-rose-500/30 rounded underline';
                }
              } else if (index === userInput.length) {
                charStyle = 'text-amber-300 border-b-2 border-amber-400 animate-pulse bg-amber-400/10';
              }

              return (
                <span key={index} className={charStyle}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* Typing Input */}
          <div className="flex flex-col gap-2">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              disabled={isFinished}
              placeholder={isFinished ? "Drill Complete! Click 'Next Drill'" : "Start typing the code above here..."}
              className="w-full bg-slate-950 border-2 border-amber-500/40 focus:border-amber-400 rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none placeholder:text-slate-600 transition-colors"
              autoFocus
            />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Timer className="h-3.5 w-3.5 text-amber-400" />
                <span>Timer starts automatically on first keypress</span>
              </span>
              <span className="font-mono">
                {userInput.length} / {targetText.length} chars
              </span>
            </div>
          </div>

          {/* Live Metrics Meter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Live Speed</span>
              <span className="text-xl font-mono font-bold text-amber-400">
                {isFinished ? wpm : (startTime ? Math.round((userInput.length / 5) / (Math.max(Date.now() - startTime, 1000) / 60000)) : 0)} <span className="text-xs text-slate-400">WPM</span>
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Accuracy</span>
              <span className={`text-xl font-mono font-bold ${accuracy >= 95 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {accuracy}%
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Status</span>
              <span className="text-sm font-semibold mt-1">
                {isFinished ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Done!
                  </span>
                ) : (
                  <span className="text-amber-300">In Progress</span>
                )}
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              {isFinished ? (
                <button
                  onClick={handleNextDrill}
                  className="w-full h-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Next Drill</span>
                  <Trophy className="h-3.5 w-3.5" />
                </button>
              ) : (
                <span className="text-xs text-slate-500 font-mono">Complete to unlock next</span>
              )}
            </div>
          </div>

          {/* Pro Ergonomic Tip */}
          <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-amber-300">Pro Ergonomics Tip: </span>
              {currentDrill.tips}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
