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
  onAskAI
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
    <div className="flex flex-col h-full bg-slate-950 border-l border-slate-800">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-3 py-2">
        {/* Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'code'
                ? 'bg-slate-800 text-amber-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-mono">{language === 'python' ? 'main.py' : language === 'go' ? 'main.go' : language === 'sql' ? 'query.sql' : 'solution.sh'}</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            title="Reset code to starter template"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handleCopy}
            title="Copy code"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold px-3.5 py-1.5 text-xs rounded-md shadow-sm shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-slate-950" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            <span className="hidden md:inline font-mono text-[10px] text-amber-950/70 ml-1">⌘↵</span>
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
        </div>
      </div>
    </div>
  );
};
