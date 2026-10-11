import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, CheckCircle2, Sparkles, X, Layers, Database } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface VisualCodeStepperProps {
  code: string;
  language: string;
  onClose: () => void;
}

interface StepperState {
  currentLineIndex: number;
  variables: Record<string, any>;
  callStack: string[];
  explanation: string;
}

export const VisualCodeStepper: React.FC<VisualCodeStepperProps> = ({
  code,
  language,
  onClose
}) => {
  const rawLines = code.split('\n').filter(l => l.trim().length > 0 && !l.trim().startsWith('#'));
  const lines = rawLines.length > 0 ? rawLines : ['# No active code yet. Write functions or variables in the editor!'];
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Derive memory variables based on lines stepped through
  const simulateExecution = (stepIdx: number): StepperState => {
    const vars: Record<string, any> = {};
    const stack: string[] = ['main()'];
    let expl = 'Ready to begin execution. Click "Step Forward" to watch the computer execute line 1.';

    for (let i = 0; i <= stepIdx && i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('def ')) {
        const fnName = line.split('def ')[1].split('(')[0];
        stack.push(`${fnName}()`);
        expl = `Defining function "${fnName}". The computer stores this recipe in memory for later.`;
      } else if (line.startsWith('for ')) {
        expl = `Initiating "for" loop: ${line}. The computer iterates over the collection element-by-element.`;
      } else if (line.includes('.append(')) {
        const varName = line.split('.append(')[0].trim();
        const itemVal = line.split('.append(')[1].replace(/\);?$/, '').trim();
        if (Array.isArray(vars[varName])) {
          vars[varName] = [...vars[varName], itemVal.replace(/['"]/g, '')];
          expl = `Appended "${itemVal}" to list "${varName}". List now contains ${vars[varName].length} items!`;
        } else {
          expl = `Appending item to list "${varName}".`;
        }
      } else if (line.includes('=') && !line.includes('==') && !line.includes('!=') && !line.includes('<=') && !line.includes('>=') && !line.startsWith('return')) {
        const parts = line.split('=');
        const k = parts[0].trim();
        const v = parts.slice(1).join('=').trim();
        let parsedVal: any = v;

        if (v === 'True' || v === 'true') {
          parsedVal = true;
        } else if (v === 'False' || v === 'false') {
          parsedVal = false;
        } else if (v === 'None' || v === 'null') {
          parsedVal = null;
        } else if (!isNaN(Number(v))) {
          parsedVal = Number(v);
        } else if (v.startsWith('"') || v.startsWith("'")) {
          parsedVal = v.replace(/^['"]|['"]$/g, '');
        } else if (v.startsWith('[') && v.endsWith(']')) {
          try {
            parsedVal = v.replace(/^\[|\]$/g, '').split(',').map(s => {
              const item = s.trim().replace(/^['"]|['"]$/g, '');
              return isNaN(Number(item)) ? item : Number(item);
            }).filter(Boolean);
          } catch {
            parsedVal = [];
          }
        } else if (v in vars) {
          parsedVal = vars[v];
        } else if (/^[a-zA-Z0-9_\s\+\-\*\/]+$/.test(v)) {
          // Attempt simple arithmetic evaluation using existing variables
          try {
            let expr = v;
            for (const [varName, varVal] of Object.entries(vars)) {
              if (typeof varVal === 'number') {
                expr = expr.replace(new RegExp(`\\b${varName}\\b`, 'g'), String(varVal));
              }
            }
            if (/^[0-9\s\+\-\*\/]+$/.test(expr)) {
              parsedVal = Function(`'use strict'; return (${expr})`)();
            }
          } catch {
            parsedVal = v;
          }
        }
        
        vars[k] = parsedVal;
        expl = `Created variable jar "${k}" and stored value "${Array.isArray(parsedVal) ? JSON.stringify(parsedVal) : parsedVal}" inside it!`;
      } else if (line.startsWith('if ')) {
        expl = `Evaluating condition "${line.replace('if ', '')}". The computer checks if this statement is True or False.`;
      } else if (line.startsWith('return ')) {
        const retVal = line.replace('return ', '');
        expl = `Executing "return". The computer hands the final answer "${retVal}" back!`;
      }
    }

    return {
      currentLineIndex: stepIdx,
      variables: vars,
      callStack: stack,
      explanation: expl
    };
  };

  const state = simulateExecution(currentLineIndex);

  const handleStep = () => {
    playSound('key');
    if (currentLineIndex + 1 < lines.length) {
      setCurrentLineIndex(prev => prev + 1);
    } else {
      playSound('pass');
    }
  };

  const handleReset = () => {
    playSound('key');
    setCurrentLineIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl flex flex-col space-y-5 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/40">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                Visual Code Stepper & Memory Inspector
              </h2>
              <p className="text-[11px] text-slate-400">
                Watch how computer RAM updates line-by-line in slow motion!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleStep}
              disabled={currentLineIndex >= lines.length - 1}
              className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
              <span>Step Forward ⏭️</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg text-xs transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Line {currentLineIndex + 1} of {lines.length}
          </div>
        </div>

        {/* Main Visual Split: Code Execution Left, Memory Jars Right */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
          {/* Code Viewer with Glowing Active Line */}
          <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-mono text-xs overflow-y-auto space-y-1">
            <div className="text-[10px] text-slate-500 uppercase font-sans mb-2 font-semibold">
              Live Instruction Pointer
            </div>
            {lines.map((lineText, idx) => {
              const isActive = idx === currentLineIndex;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-1.5 rounded transition-all ${
                    isActive
                      ? 'bg-sky-500/20 border-l-4 border-sky-400 text-white font-bold shadow-md'
                      : idx < currentLineIndex
                      ? 'text-slate-400 opacity-60'
                      : 'text-slate-300'
                  }`}
                >
                  <span className="w-5 text-right text-[11px] text-slate-600 select-none">
                    {idx + 1}
                  </span>
                  <span className="w-4 select-none">
                    {isActive ? '👉' : '  '}
                  </span>
                  <span>{lineText}</span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Labeled Memory Jars & Call Stack */}
          <div className="w-full md:w-80 flex flex-col space-y-4 overflow-y-auto">
            {/* Plain English Explanation Box */}
            <div className="rounded-xl border border-sky-500/40 bg-sky-950/20 p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-sky-400 block tracking-wider">
                What the Computer is Doing Right Now:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {state.explanation}
              </p>
            </div>

            {/* Visual Variables / Jars Shelf */}
            <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="h-4 w-4" /> Memory Jars (Variables in RAM)
              </span>

              {Object.keys(state.variables).length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {Object.entries(state.variables).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3 rounded-lg border border-amber-500/40 bg-slate-950 text-center space-y-1 shadow-md animate-pulse-subtle"
                    >
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
                        🏺 Jar: {key}
                      </div>
                      <div className="text-base font-bold text-amber-300 font-mono">
                        {String(val)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500 text-center py-6">
                  No variable jars created yet. Step forward to declare variables!
                </div>
              )}
            </div>

            {/* Active Call Stack */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 space-y-1.5 font-mono text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Active Call Stack:
              </span>
              <div className="flex items-center gap-1 text-slate-300">
                {state.callStack.map((frame, idx) => (
                  <span key={idx} className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-amber-300">
                    {frame}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
