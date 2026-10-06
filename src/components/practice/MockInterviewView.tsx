import React, { useState } from 'react';
import { mockInterviewPrompts } from '../../data/mockInterviewData';
import { MockInterviewPrompt } from '../../types/curriculum';
import { playSound } from '../../utils/soundEffects';
import { MessageSquare, Bot, CheckCircle2, Sparkles, Send, ArrowRight, HelpCircle, User, Award } from 'lucide-react';

export const MockInterviewView: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showIdealAnswer, setShowIdealAnswer] = useState(false);

  const scenario = mockInterviewPrompts[selectedScenarioIndex] || mockInterviewPrompts[0];

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;
    playSound('pass');
    setSubmitted(true);
  };

  const handleNextScenario = () => {
    playSound('key');
    setSelectedScenarioIndex((prev) => (prev + 1) % mockInterviewPrompts.length);
    setUserAnswer('');
    setSubmitted(false);
    setShowIdealAnswer(false);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto p-6 items-center">
      <div className="max-w-3xl w-full space-y-6 my-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
            <MessageSquare className="h-4 w-4" /> Technical Interview Simulation Lab
          </div>
          <h1 className="text-2xl font-bold text-white font-fantasy">
            Backend Mock Interview Simulator
          </h1>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            Practice answering real-world architectural and language interview questions asked by senior tech leads at startups and cloud providers.
          </p>
        </div>

        {/* Interviewer Persona Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{scenario.interviewerPersona}</h3>
                <span className="text-[11px] text-sky-300 font-mono">
                  {scenario.roleTitle} · {scenario.companyVibe}
                </span>
              </div>
            </div>

            <span className="text-[11px] font-mono text-slate-500">
              Scenario {selectedScenarioIndex + 1} of {mockInterviewPrompts.length}
            </span>
          </div>

          {/* Prompt */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-medium leading-relaxed">
            "{scenario.question}"
          </div>

          {/* User Response Input */}
          {!submitted ? (
            <div className="space-y-3 pt-2">
              <label className="text-xs text-slate-400 font-semibold block">
                Type your answer (or explain in your own words):
              </label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows={4}
                placeholder="Explain the concept clearly as if talking to the tech lead..."
                className="w-full p-3 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-200 outline-none focus:border-sky-500 resize-none font-sans"
              />

              <div className="flex justify-end">
                <button
                  disabled={!userAnswer.trim()}
                  onClick={handleSubmitAnswer}
                  className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-xs transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Response for Evaluation</span>
                </button>
              </div>
            </div>
          ) : (
            /* Interview Evaluation & Rubric Breakdown */
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4" /> Interview Rubric Key Points:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {scenario.expectedKeyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reveal Ideal Senior Response */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowIdealAnswer(!showIdealAnswer)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{showIdealAnswer ? 'Hide Senior Response' : 'Compare with Ideal Senior Engineer Response'}</span>
                </button>

                {showIdealAnswer && (
                  <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 text-xs text-amber-200 leading-relaxed font-sans">
                    <strong className="block text-amber-400 mb-1">Model Response:</strong>
                    "{scenario.idealResponse}"
                  </div>
                )}
              </div>

              {/* Follow-up question challenge */}
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 text-xs space-y-1">
                <span className="font-bold text-sky-400 text-[11px] uppercase tracking-wider">
                  Interviewer Follow-Up Question:
                </span>
                <p className="text-slate-300 italic">
                  "{scenario.followUpQuestion}"
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextScenario}
                  className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors"
                >
                  <span>Next Interview Scenario</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
