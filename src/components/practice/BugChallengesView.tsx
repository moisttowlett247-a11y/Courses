import React, { useState } from 'react';
import { BugChallenge } from '../../types/curriculum';
import { bugChallenges } from '../../data/bugChallengesData';
import { runInteractiveCode } from '../../utils/codeRunner';
import { playSound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Bug, CheckCircle2, Play, Sparkles, ArrowLeft, HelpCircle, AlertCircle } from 'lucide-react';

interface BugChallengesViewProps {
  completedBugIds: string[];
  onBugFixed: (bugId: string, xp: number) => void;
  onBackToCurriculum: () => void;
}

export const BugChallengesView: React.FC<BugChallengesViewProps> = ({
  completedBugIds,
  onBugFixed,
  onBackToCurriculum
}) => {
  const [selectedBug, setSelectedBug] = useState<BugChallenge | null>(null);
  const [code, setCode] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [runMessage, setRunMessage] = useState<{ success: boolean; text: string } | null>(null);

  const startBugChallenge = (bug: BugChallenge) => {
    playSound('key');
    setSelectedBug(bug);
    setCode(bug.brokenCode);
    setShowHint(false);
    setRunMessage(null);
  };

  const handleRunFix = async () => {
    if (!selectedBug) return;
    setIsRunning(true);
    playSound('key');

    const result = await runInteractiveCode(
      selectedBug.language,
      code,
      selectedBug.testCases,
      selectedBug.fixedSolution
    );

    setIsRunning(false);

    if (result.success) {
      playSound('pass');
      confetti({ particleCount: 120, spread: 70 });
      setRunMessage({ success: true, text: '🎉 Bug neutralized! All test assertions verified successfully.' });
      onBugFixed(selectedBug.id, selectedBug.xpReward);
    } else {
      playSound('fail');
      setRunMessage({
        success: false,
        text: `⚠️ Bug still present: ${result.output.split('\n')[0] || 'Expected outputs did not match.'}`
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto p-6">
      {!selectedBug ? (
        <div className="max-w-5xl mx-auto space-y-6 w-full">
          {/* Header */}
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              <Bug className="h-4 w-4" /> Reverse Engineering & Diagnostic Lab
            </div>
            <h1 className="text-2xl font-bold text-white font-fantasy">
              "Fix the Bug" Diagnostic Challenges
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              70% of a backend engineer's job is hunting down subtle typos, off-by-one errors, and syntax traps. Find the bug, fix the code, and earn Debugger XP!
            </p>
          </div>

          {/* Bug Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bugChallenges.map((bug) => {
              const isResolved = completedBugIds.includes(bug.id);

              return (
                <div
                  key={bug.id}
                  className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all ${
                    isResolved
                      ? 'border-emerald-500/40 bg-emerald-950/15'
                      : 'border-slate-800 bg-slate-900/60 hover:border-rose-500/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">
                        {bug.bugType}
                      </span>
                      {isResolved ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Fixed
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-amber-400">
                          +{bug.xpReward} XP
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white">{bug.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {bug.scenario}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      Language: {bug.language}
                    </span>
                    <button
                      onClick={() => startBugChallenge(bug)}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer"
                    >
                      {isResolved ? 'Re-examine Code' : 'Hunt This Bug!'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Bug Fixing Workspace */
        <div className="flex-1 flex flex-col overflow-hidden max-w-5xl mx-auto w-full space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <button
              onClick={() => setSelectedBug(null)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Bug Lab
            </button>

            <span className="text-xs font-mono font-bold text-rose-400">
              Trap: {selectedBug.bugType}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
            {/* Scenario & Clues */}
            <div className="space-y-4 overflow-y-auto p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-xs">
              <div>
                <h2 className="text-base font-bold text-white mb-1">{selectedBug.title}</h2>
                <p className="text-slate-300 leading-relaxed">{selectedBug.scenario}</p>
              </div>

              {/* Clue button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs"
                >
                  <HelpCircle className="h-4 w-4" /> {showHint ? 'Hide Diagnostic Hint' : 'Need a Diagnostic Hint?'}
                </button>
                {showHint && (
                  <div className="mt-2 p-3 rounded-lg border border-amber-500/30 bg-amber-950/20 text-amber-200 leading-relaxed font-sans">
                    💡 <strong>Senior Engineer Clue:</strong> {selectedBug.bugHint}
                  </div>
                )}
              </div>

              {runMessage && (
                <div className={`p-3 rounded-lg border text-xs ${
                  runMessage.success 
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' 
                    : 'border-rose-500/40 bg-rose-950/40 text-rose-300'
                }`}>
                  {runMessage.text}
                </div>
              )}
            </div>

            {/* Code Fix Arena */}
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/60 text-xs font-mono">
                <span className="text-slate-400">broken_code.{selectedBug.language === 'python' ? 'py' : selectedBug.language === 'go' ? 'go' : 'sql'}</span>
                <button
                  onClick={handleRunFix}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-1.5 rounded text-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-slate-950" />
                  <span>{isRunning ? 'Verifying...' : 'Verify Fix'}</span>
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 p-4 bg-transparent text-slate-100 font-mono text-xs leading-relaxed resize-none outline-none focus:ring-0 selection:bg-rose-500/30"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
