import React, { useState, useEffect, useRef } from 'react';
import { Wand2, Sparkles, X, MessageSquare, Bot, ArrowRight, Loader2, Send, Trash2, ShieldAlert, CheckCircle2, Play, BookOpen, Search, HelpCircle, Copy, Check } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface ArchmageAiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonContext?: {
    title: string;
    language: string;
    instructions: string[];
    currentCode: string;
  };
  initialDiagnoseError?: string | null;
  initialAction?: 'diagnose' | 'explain' | 'hint' | 'chat';
  lastTestResults?: any;
  onClearDiagnoseError?: () => void;
  onApplyGeneratedQuest?: (quest: any) => void;
}

export const ArchmageAiDrawer: React.FC<ArchmageAiDrawerProps> = ({
  isOpen,
  onClose,
  currentLessonContext,
  initialDiagnoseError,
  initialAction,
  lastTestResults,
  onClearDiagnoseError,
  onApplyGeneratedQuest
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'archmage' | 'user'; text: string; quest?: any; source?: string }>>([
    {
      sender: 'archmage',
      text: "Greetings, backend adventurer! I am Boots the Senior Architect. I can explain code line-by-line in plain English, diagnose compiler errors and assertion mismatches for any course, provide conceptual hints, check Big-O complexity, or forge custom quests. How can I assist your quest today?"
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questTopic, setQuestTopic] = useState('Goroutines & Channels');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Handle initial actions on open (explain or diagnose)
  useEffect(() => {
    if (!isOpen) return;

    if (initialAction === 'explain' && currentLessonContext?.currentCode) {
      handleExplainCode();
    } else if (initialDiagnoseError) {
      handleDiagnoseError(initialDiagnoseError);
      if (onClearDiagnoseError) {
        onClearDiagnoseError();
      }
    } else if (initialAction === 'hint') {
      handleSendMessage("Can you give me a conceptual hint on how to solve this challenge without writing the full code?");
    }
  }, [isOpen, initialAction, initialDiagnoseError]);

  if (!isOpen) return null;

  // 1. Dedicated Explain Code Handler
  const handleExplainCode = async () => {
    if (isLoading) return;
    setIsLoading(true);
    playSound('key');

    const codeSnippet = currentLessonContext?.currentCode?.trim() || '// Starter code';
    setMessages(prev => [
      ...prev,
      { 
        sender: 'user', 
        text: `📖 Explain Code: Please break down my current solution for "${currentLessonContext?.title || 'this challenge'}" in ${currentLessonContext?.language || 'code'} in plain English.` 
      }
    ]);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeSnippet,
          lessonTitle: currentLessonContext?.title || 'Backend Challenge',
          language: currentLessonContext?.language || 'python'
        })
      });

      const data = await res.json();
      playSound('pass');
      setMessages(prev => [
        ...prev,
        {
          sender: 'archmage',
          text: data.explanation || "Code analysis complete.",
          source: data.source
        }
      ]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'archmage',
          text: `🧙‍♂️ **Code Breakdown for ${currentLessonContext?.title}:**\nThis ${currentLessonContext?.language} solution structures the logic required by the challenge. It processes incoming parameters, maintains deterministic state, and yields an output matching the test assertions.`,
          source: 'companion'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Dedicated Diagnose Error Handler
  const handleDiagnoseError = async (errText: string) => {
    if (isLoading) return;
    setIsLoading(true);
    playSound('key');
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: `🔍 Diagnose Test Failure:\n\`\`\`\n${errText}\n\`\`\`` }
    ]);

    try {
      const res = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: currentLessonContext?.currentCode || '',
          errorMessage: errText,
          lessonTitle: currentLessonContext?.title || 'Backend Challenge',
          language: currentLessonContext?.language || 'python',
          testResults: lastTestResults || null
        })
      });

      const data = await res.json();
      playSound('pass');
      setMessages(prev => [
        ...prev,
        {
          sender: 'archmage',
          text: data.diagnosis || data.hint || "Review the mismatch between expected return and computed output.",
          source: data.source
        }
      ]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'archmage',
          text: `⚡ **Diagnostic Insight:** The test runner reported: \`${errText}\`. Inspect your return statements, variable types, and edge case guards in "${currentLessonContext?.title || 'this challenge'}".`,
          source: 'companion'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Universal Message & Question Handler
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputVal;
    if (!textToSend.trim() || isLoading) return;

    playSound('key');
    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          trackTitle: 'Backend Engineering',
          lessonTitle: currentLessonContext?.title || 'General Backend',
          language: currentLessonContext?.language || 'Python',
          instructions: currentLessonContext?.instructions?.join('\n') || '',
          currentCode: currentLessonContext?.currentCode || '',
          testResults: lastTestResults || null
        })
      });

      const data = await res.json();
      playSound('pass');
      setMessages(prev => [
        ...prev,
        { 
          sender: 'archmage', 
          text: data.reply || data.hint || "Inspect your algorithm's invariants and time complexity.",
          source: data.source
        }
      ]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'archmage',
          text: "🧙‍♂️ *Boots' Arcane Wisdom:* Focus on validating your function signature, testing empty collections or nil values, and ensuring return types match the requirement.",
          source: 'companion'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Custom Challenge Forge Handler
  const handleGenerateCustomQuest = async () => {
    if (isLoading) return;
    setIsLoading(true);
    playSound('key');
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: `⚔️ Forge a custom quest on topic: "${questTopic}"!` }
    ]);

    try {
      const res = await fetch('/api/ai/generate-quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: questTopic,
          difficulty: 'Medium',
          language: currentLessonContext?.language || 'python'
        })
      });

      const data = await res.json();
      if (data.quest) {
        playSound('levelUp');
        setMessages(prev => [
          ...prev,
          {
            sender: 'archmage',
            text: `⚔️ **Quest Forged: ${data.quest.title}**\n\n${data.quest.lore}\n\n**Mission:**\n${data.quest.instructions}`,
            quest: data.quest
          }
        ]);
      }
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { sender: 'archmage', text: "Could not generate quest right now. Try selecting another topic." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleClearChat = () => {
    playSound('key');
    setMessages([
      {
        sender: 'archmage',
        text: "Scroll cleared! What backend obstacle shall we conquer next?"
      }
    ]);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] border-l border-slate-800 bg-slate-950/98 backdrop-blur-md shadow-2xl flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-3.5 bg-slate-900/80">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
            <Wand2 className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white font-fantasy tracking-wide">Boots the Archmage</h3>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="AI Mentor Online" />
            </div>
            <p className="text-[10px] text-amber-400/90 font-mono">Senior Backend Architect • 100% Course Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            title="Close AI Mentor"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Lesson Context Pill */}
      {currentLessonContext && (
        <div className="px-3.5 py-1.5 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="truncate max-w-[260px]">Course Context: <strong className="text-amber-300 font-normal">{currentLessonContext.title}</strong></span>
          <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">{currentLessonContext.language}</span>
        </div>
      )}

      {/* Primary Action Quick Ribbon */}
      <div className="p-2 border-b border-slate-800/80 bg-slate-900/40 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        {/* Explain Code Action */}
        <button
          onClick={handleExplainCode}
          disabled={isLoading}
          className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:bg-sky-500/20 hover:text-sky-200 transition-colors cursor-pointer font-semibold"
        >
          <BookOpen className="h-3 w-3" />
          <span>Explain Code</span>
        </button>

        {/* Diagnose Code Action (highlighted if tests failed) */}
        {lastTestResults && !lastTestResults.success ? (
          <button
            onClick={() => {
              const failed = lastTestResults.testResults?.find((t: any) => !t.passed);
              handleDiagnoseError(failed?.error || `Expected: ${JSON.stringify(failed?.expected)}, Got: ${JSON.stringify(failed?.actual)}`);
            }}
            disabled={isLoading}
            className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1 rounded bg-rose-950/70 border border-rose-500/60 text-rose-300 hover:text-white transition-colors cursor-pointer font-semibold animate-pulse"
          >
            <Search className="h-3 w-3" />
            <span>Diagnose Failure</span>
          </button>
        ) : (
          <button
            onClick={() => handleDiagnoseError("Check my code for bugs, missing return statements, or logic edge cases.")}
            disabled={isLoading}
            className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors cursor-pointer"
          >
            <Search className="h-3 w-3" />
            <span>Diagnose Code</span>
          </button>
        )}

        {/* Conceptual Hint Action */}
        <button
          onClick={() => handleSendMessage("Can you give me a conceptual hint on how to solve this challenge without writing the full code?")}
          disabled={isLoading}
          className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors cursor-pointer"
        >
          <HelpCircle className="h-3 w-3" />
          <span>Hint</span>
        </button>

        {/* Edge Cases */}
        <button
          onClick={() => handleSendMessage(`What are the key edge cases I should guard against in ${currentLessonContext?.title || 'this challenge'}?`)}
          disabled={isLoading}
          className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors cursor-pointer"
        >
          <span>🛡️ Edge Cases</span>
        </button>

        {/* Big-O Complexity */}
        <button
          onClick={() => handleSendMessage("What Big-O time and space complexity should I aim for?")}
          disabled={isLoading}
          className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors cursor-pointer"
        >
          <span>⚡ Big-O</span>
        </button>
      </div>

      {/* Custom Quest Generator Selector */}
      <div className="px-3 py-2 border-b border-slate-800/60 bg-amber-500/5 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-amber-300/90 font-medium">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Forge Quest:</span>
          <select
            value={questTopic}
            onChange={(e) => setQuestTopic(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 rounded px-1.5 py-0.5 text-[11px] focus:outline-none focus:border-amber-500"
          >
            <option value="Goroutines & Channels">Goroutines & Channels</option>
            <option value="SQL Relational Joins">SQL Relational Joins</option>
            <option value="LRU Cache & HashMaps">LRU Cache & HashMaps</option>
            <option value="Rate Limiter & Token Bucket">Rate Limiter & Token Bucket</option>
            <option value="Microservice Load Balancing">Microservices & Queues</option>
          </select>
        </div>
        <button
          onClick={handleGenerateCustomQuest}
          disabled={isLoading}
          className="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1"
        >
          <span>Forge</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs leading-relaxed">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-[92%] whitespace-pre-wrap break-words ${
                m.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-md'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-md font-sans'
              }`}
            >
              {m.text}

              {/* Copy message button */}
              {m.sender === 'archmage' && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{m.source === 'gemini' ? '⚡ Gemini 3.8 Flash' : '🧙‍♂️ Boots Autonomous Companion'}</span>
                  <button
                    onClick={() => handleCopyText(m.text, idx)}
                    className="flex items-center gap-1 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* If message includes an actionable generated quest */}
              {m.quest && onApplyGeneratedQuest && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-mono">Reward: +{m.quest.xpReward || 100} XP</span>
                  <button
                    onClick={() => {
                      onApplyGeneratedQuest(m.quest);
                      playSound('equip');
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[11px] transition-colors cursor-pointer shadow"
                  >
                    <Play className="h-3 w-3 fill-slate-950" />
                    <span>Load into Editor</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-slate-400 text-xs p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 w-fit">
            <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
            <span className="font-mono text-[11px]">Boots is consulting backend spellbook...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Boots to explain code, diagnose error, or explain concepts..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer shadow"
            title="Send Message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
