import React, { useState, useEffect } from 'react';
import { LessonContent } from '../../types/curriculum';
import { jargonDictionary, JargonTerm } from '../../data/jargonData';
import { BookOpen, CheckCircle2, HelpCircle, Eye, EyeOff, Sparkles, ChevronDown, ChevronUp, BookA, X, AlertTriangle, Lightbulb, Code2 } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface TheoryViewerProps {
  lesson: LessonContent;
  isCompleted: boolean;
  onShowHint: (hintIndex: number) => void;
  revealedHints: number[];
  onOpenAIHint: () => void;
}

export const TheoryViewer: React.FC<TheoryViewerProps> = ({
  lesson,
  isCompleted,
  onShowHint,
  revealedHints,
  onOpenAIHint
}) => {
  const [showSolution, setShowSolution] = useState(false);
  const [confirmReveal, setConfirmReveal] = useState(false);
  const [showJargonModal, setShowJargonModal] = useState(false);
  const [showEli5, setShowEli5] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [checkedInstructions, setCheckedInstructions] = useState<number[]>([]);

  // Automatically hide solutions and breakdowns when switching lessons
  useEffect(() => {
    setShowSolution(false);
    setConfirmReveal(false);
    setShowBreakdown(false);
    setSelectedQuizOption(null);
    setQuizAnswered(false);
    setCheckedInstructions([]);
  }, [lesson.id]);

  const toggleInstruction = (idx: number) => {
    playSound('key');
    setCheckedInstructions(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectQuiz = (idx: number) => {
    playSound('key');
    setSelectedQuizOption(idx);
    setQuizAnswered(true);
    if (lesson.quickCheckQuiz && idx === lesson.quickCheckQuiz.correctIndex) {
      playSound('pass');
    } else {
      playSound('fail');
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-5 text-slate-200 space-y-5">
      {/* Title & Metadata */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 flex-wrap">
          <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
            lesson.tier === 'beginner' 
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' 
              : lesson.tier === 'intermediate'
              ? 'bg-sky-950/80 text-sky-300 border border-sky-500/40'
              : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
          }`}>
            {lesson.tier === 'beginner' ? '🟢 Beginner Level' : lesson.tier === 'intermediate' ? '🟡 Medium Level' : '🔴 Hard Level'}
          </span>
          <span aria-hidden="true">·</span>
          <span className="uppercase tracking-wider font-semibold text-amber-400 font-mono">
            {lesson.language}
          </span>
          <span aria-hidden="true">·</span>
          <span>{lesson.readTimeMinutes} min read</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-400 font-mono tabular-nums">+{lesson.xpReward} XP</span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-white">
          {lesson.title}
        </h1>

        {/* Jargon Dictionary Toolbar */}
        <div className="mt-2.5 flex items-center justify-between gap-2 p-2.5 rounded-lg border border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="text-sm">💡</span>
            <span>Zero confusion guarantee: Every concept is broken down in simple human words.</span>
          </div>

          <button
            onClick={() => setShowJargonModal(true)}
            className="text-[11px] font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer shrink-0"
          >
            <BookA className="h-3.5 w-3.5" /> Jargon Dictionary
          </button>
        </div>
      </div>

      {/* ELI5 (Explain Like I'm 5) Card */}
      {lesson.eli5Summary && (
        <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 to-slate-900 p-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4" /> Explain Like I'm 5 (Super Simple Analogy)
            </span>
            <button
              onClick={() => setShowEli5(!showEli5)}
              className="text-[11px] text-amber-400/80 hover:text-amber-300"
            >
              {showEli5 ? 'Hide' : 'Show'}
            </button>
          </div>
          {showEli5 && (
            <p className="text-xs text-amber-200/90 leading-relaxed pt-1">
              {lesson.eli5Summary}
            </p>
          )}
        </div>
      )}

      {/* Main Theory Explanation */}
      <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-4 leading-relaxed">
        {lesson.theoryMarkdown.split('\n\n').map((block, index) => {
          if (block.startsWith('### ')) {
            return (
              <h3 key={index} className="text-base font-semibold text-amber-200 mt-4 mb-2">
                {block.replace('### ', '')}
              </h3>
            );
          }
          if (block.startsWith('#### ')) {
            return (
              <h4 key={index} className="text-sm font-semibold text-slate-200 mt-3 mb-1">
                {block.replace('#### ', '')}
              </h4>
            );
          }
          if (block.startsWith('```')) {
            const lines = block.split('\n');
            const lang = lines[0].replace('```', '');
            const code = lines.slice(1, -1).join('\n');
            return (
              <div key={index} className="my-3 rounded-lg border border-slate-800 bg-slate-900/80 p-3 font-mono text-xs text-slate-300 overflow-x-auto">
                <div className="text-[10px] text-slate-500 uppercase mb-1 font-sans">{lang || 'code'}</div>
                <pre>{code}</pre>
              </div>
            );
          }
          return (
            <p key={index} className="text-xs leading-relaxed text-slate-300">
              {block}
            </p>
          );
        })}
      </div>

      {/* Line-by-Line Code Breakdown */}
      {lesson.codeBreakdown && lesson.codeBreakdown.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-sky-400" /> Syntax Pattern Guide
            </span>
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-[11px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              {showBreakdown ? 'Hide Syntax Guide' : 'Need a Syntax Clue? (Hidden)'}
            </button>
          </div>

          {showBreakdown && (
            <div className="space-y-2 pt-1">
              {lesson.codeBreakdown.map((item, idx) => (
                <div key={idx} className="rounded-lg border border-slate-800/80 bg-slate-950 p-2.5 space-y-1">
                  <div className="font-mono text-xs text-amber-300 bg-slate-900/80 px-2 py-1 rounded inline-block">
                    {item.code}
                  </div>
                  <div className="text-xs text-slate-300">
                    👉 <strong>What this does:</strong> {item.simpleMeaning}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Common Beginner Traps to Avoid */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <div className="rounded-xl border border-rose-900/40 bg-rose-950/15 p-4 space-y-2">
          <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4 text-rose-400" /> Common Traps to Watch Out For
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {lesson.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Interactive Quick Check Mini-Quiz */}
      {lesson.quickCheckQuiz && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4 space-y-3">
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
            <CheckCircle2 className="h-4 w-4" /> Quick Check: Test Your Mental Model
          </span>
          <p className="text-xs font-medium text-slate-200">
            {lesson.quickCheckQuiz.question}
          </p>

          <div className="space-y-2">
            {lesson.quickCheckQuiz.options.map((option, idx) => {
              const isSelected = selectedQuizOption === idx;
              const isCorrect = idx === lesson.quickCheckQuiz!.correctIndex;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectQuiz(idx)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                    quizAnswered && isSelected
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200 font-semibold'
                        : 'border-rose-500 bg-rose-950/50 text-rose-200'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <div className={`text-xs p-2.5 rounded-lg ${
              selectedQuizOption === lesson.quickCheckQuiz.correctIndex
                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
            }`}>
              {selectedQuizOption === lesson.quickCheckQuiz.correctIndex ? '🎉 Exactly right! ' : '💡 Not quite! '}
              {lesson.quickCheckQuiz.explanation}
            </div>
          )}
        </div>
      )}

      {/* Quest Instructions Checklist */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" /> Coding Mission Steps
          </h3>
          <span className="text-[11px] font-mono text-amber-300/80 tabular-nums">
            {checkedInstructions.length}/{lesson.instructions.length} completed
          </span>
        </div>

        <ul className="space-y-2">
          {lesson.instructions.map((inst, idx) => {
            const isChecked = checkedInstructions.includes(idx);
            return (
              <li 
                key={idx} 
                onClick={() => toggleInstruction(idx)}
                className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer group hover:text-white"
              >
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className={isChecked ? 'line-through text-slate-500' : ''}>
                  {inst}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Hints & AI Mentor */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-amber-400" /> Need Help?
          </h4>
          <button
            onClick={onOpenAIHint}
            className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30 transition-colors"
          >
            <Sparkles className="h-3 w-3" /> Ask Boots the AI Mentor
          </button>
        </div>

        {lesson.hints.map((hint, idx) => {
          const isRevealed = revealedHints.includes(idx);
          return (
            <div key={idx} className="rounded-md border border-slate-800 bg-slate-900/50 p-2.5 text-xs">
              {isRevealed ? (
                <p className="text-amber-200/90 leading-relaxed">
                  <span className="font-semibold text-amber-400 mr-1">Hint {idx + 1}:</span> {hint}
                </p>
              ) : (
                <button
                  onClick={() => onShowHint(idx)}
                  className="w-full text-left text-slate-400 hover:text-slate-200 flex items-center justify-between"
                >
                  <span>Reveal Friendly Hint {idx + 1}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          );
        })}

        {/* Reveal Solution Protected */}
        <div className="pt-2">
          {!showSolution ? (
            <div>
              {!confirmReveal ? (
                <button
                  onClick={() => setConfirmReveal(true)}
                  className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Stuck? Need to Peek at the Answer?
                </button>
              ) : (
                <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-950/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Challenge Guard: Try hints or the memory stepper first!</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Real coding confidence comes from figuring out the problem. Are you sure you want to reveal the full solution code?
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setConfirmReveal(false)}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                    >
                      Keep Trying
                    </button>
                    <button
                      onClick={() => {
                        setShowSolution(true);
                        setConfirmReveal(false);
                      }}
                      className="px-2.5 py-1 text-xs rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 cursor-pointer"
                    >
                      Reveal Answer Key
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowSolution(false)}
                  className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <EyeOff className="h-3.5 w-3.5" />
                  Hide Solution
                </button>
              </div>
              <div className="rounded-md border border-rose-900/40 bg-rose-950/20 p-3 font-mono text-xs text-slate-200 overflow-x-auto">
                <div className="text-[10px] text-rose-400 uppercase font-sans mb-1 font-bold">Answer & Solution Key</div>
                <pre>{lesson.solutionCode}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Jargon Buster Modal */}
      {showJargonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xl flex flex-col space-y-4 max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookA className="h-5 w-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Plain English Coding Dictionary</h3>
              </div>
              <button
                onClick={() => setShowJargonModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Programming words sound intimidating, but they are just everyday concepts with fancy names!
            </p>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {jargonDictionary.map((item) => (
                <div
                  key={item.term}
                  className="p-3 rounded-lg border border-slate-800/80 bg-slate-900/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 text-xs font-mono">{item.term}</span>
                  </div>
                  <div className="text-xs text-slate-200">
                    <strong>Meaning:</strong> {item.simpleMeaning}
                  </div>
                  <div className="text-[11px] text-amber-300/90 bg-slate-950/60 p-2 rounded border border-slate-800">
                    💡 <strong>Real-Life Analogy:</strong> {item.realWorldAnalogy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
