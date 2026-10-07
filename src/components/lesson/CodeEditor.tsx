import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, Code2, AlertCircle } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
  language: string;
  activeTab: 'code' | 'tests' | 'console';
  setActiveTab: (tab: 'code' | 'tests' | 'console') => void;
  onAskAI: () => void;
  onOpenStepper?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onReset,
  isRunning,
  language,
  activeTab,
  setActiveTab,
  onAskAI,
  onOpenStepper
}) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    playSound('key');

    // Run on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    // Support Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      const newVal = val.substring(0, start) + '    ' + val.substring(end);
      onChange(newVal);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-l border-slate-800 min-w-0 relative">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between gap-1 border-b border-slate-800 bg-slate-900/90 px-2 py-1.5 min-w-0">
        {/* Tabs */}
        <div className="flex items-center gap-1 min-w-0 shrink">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors min-w-0 ${
              activeTab === 'code'
                ? 'bg-slate-800 text-amber-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="font-mono text-[11px] truncate">{language === 'python' ? 'main.py' : language === 'go' ? 'main.go' : language === 'sql' ? 'query.sql' : 'solution.sh'}</span>
          </button>
        </div>

        {/* Action Controls - Guaranteed Never Cut Off */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <button
            onClick={onReset}
            title="Reset code to starter template"
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors shrink-0"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>

          {onOpenStepper && (
            <button
              onClick={onOpenStepper}
              title="Step through code line-by-line & view RAM memory variables"
              className="flex items-center gap-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-1.5 py-1 text-[11px] rounded transition-all active:scale-95 cursor-pointer font-medium shrink-0"
            >
              <Sparkles className="h-3 w-3 text-sky-400 shrink-0" />
              <span className="hidden xl:inline">Stepper</span>
            </button>
          )}

          {/* Primary Run Code Button - Highest priority, shrink-0, always visible */}
          <button
            onClick={onRun}
            disabled={isRunning}
            className="shrink-0 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-2.5 sm:px-3 py-1 text-xs rounded shadow-sm shadow-amber-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-slate-950 shrink-0" />
            <span className="font-semibold whitespace-nowrap">{isRunning ? 'Running...' : 'Run'}</span>
            <span className="hidden sm:inline font-semibold">Code</span>
            <span className="hidden 2xl:inline font-mono text-[10px] text-amber-950/70 ml-0.5">⌘↵</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-xs leading-5">
        {/* Line Numbers */}
        <div className="w-10 select-none bg-slate-950/80 py-3 pr-2 text-right text-slate-600 border-r border-slate-900 font-mono text-[11px]">
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>

        {/* Textarea Input */}
        <div className="relative flex-1 h-full">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="w-full h-full p-3 bg-transparent text-slate-100 resize-none outline-none font-mono text-xs leading-5 whitespace-pre focus:ring-0 selection:bg-amber-500/30"
            placeholder="// Write your solution here..."
          />

          {/* Quick Floating Run Button for Phone / Narrow Screens */}
          <div className="absolute bottom-3 right-3 z-20 md:hidden">
            <button
              onClick={onRun}
              disabled={isRunning}
              title="Run Code & Execute Tests"
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-full shadow-lg shadow-amber-500/30 text-xs active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-slate-950" />
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
