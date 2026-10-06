import React, { useState } from 'react';
import { Wand2, Sparkles, X, MessageSquare, Bot, ArrowRight, Loader2, Send } from 'lucide-react';
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
  onApplyGeneratedQuest?: (quest: any) => void;
}

export const ArchmageAiDrawer: React.FC<ArchmageAiDrawerProps> = ({
  isOpen,
  onClose,
  currentLessonContext,
  onApplyGeneratedQuest
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'archmage' | 'user'; text: string }>>([
    {
      sender: 'archmage',
      text: "Greetings, backend adventurer! I am Boots the Archmage. I can grant you guidance without spoiling solutions, diagnose obscure compiler warnings, or forge custom practice quests. What do you require?"
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questTopic, setQuestTopic] = useState('Goroutines & Channels');

  if (!isOpen) return null;

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputVal;
    if (!textToSend.trim() || isLoading) return;

    playSound('key');
    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackTitle: 'Backend Engineering',
          lessonTitle: currentLessonContext?.title || 'General Backend',
          language: currentLessonContext?.language || 'Python',
          instructions: currentLessonContext?.instructions.join('\n') || textToSend,
          currentCode: currentLessonContext?.currentCode || '',
          testResults: textToSend
        })
      });

      const data = await res.json();
      playSound('pass');
      setMessages(prev => [
        ...prev,
        { sender: 'archmage', text: data.hint || data.diagnosis || "Inspect your algorithm's invariants and time complexity." }
      ]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        { sender: 'archmage', text: "The arcane link is momentarily quiet. Remember: in backend design, always consider edge cases like null pointers, negative integers, and connection pool timeouts." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCustomQuest = async () => {
    setIsLoading(true);
    playSound('key');
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: `Forge a custom quest for me on topic: ${questTopic}!` }
    ]);

    try {
      const res = await fetch('/api/ai/generate-quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: questTopic,
          difficulty: 'Medium',
          language: 'python'
        })
      });

      const data = await res.json();
      if (data.quest) {
        playSound('levelUp');
        setMessages(prev => [
          ...prev,
          {
            sender: 'archmage',
            text: `⚔️ Quest Forged: **${data.quest.title}**!\n\n${data.quest.lore}\n\n**Instructions:** ${data.quest.instructions}`
          }
        ]);
        if (onApplyGeneratedQuest) {
          onApplyGeneratedQuest(data.quest);
        }
      }
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { sender: 'archmage', text: "Could not generate quest right now. Try another topic." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 border-l border-slate-800 bg-slate-950/98 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
            <Wand2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-fantasy">Archmage AI Mentor</h3>
            <p className="text-[10px] text-amber-400/80 font-mono">Boots the Senior Architect</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Quick Prompts */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-900/30 flex gap-2 overflow-x-auto text-[11px]">
        <button
          onClick={() => handleSendMessage("Can you give me a conceptual hint on how to structure this function?")}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors"
        >
          💡 Hint on Logic
        </button>
        <button
          onClick={() => handleSendMessage("What Big-O time and space complexity should I aim for?")}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors"
        >
          ⚡ Big-O Check
        </button>
        <button
          onClick={handleGenerateCustomQuest}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors flex items-center gap-1"
        >
          <Sparkles className="h-3 w-3" /> Forge Custom Quest
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-[85%] whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs p-2">
            <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
            <span>Consulting backend spellbook...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60">
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
            placeholder="Ask the Archmage anything..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
