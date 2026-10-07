import React, { useState } from 'react';
import { jargonDictionary, JargonTerm } from '../../data/jargonData';
import { BookOpen, Search, Sparkles, X, Lightbulb, Code2 } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface JargonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JargonModal: React.FC<JargonModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState<JargonTerm>(jargonDictionary[0]);

  if (!isOpen) return null;

  const categories = ['All', 'Fundamentals', 'Python', 'Databases', 'Go', 'Architecture'];

  const filtered = jargonDictionary.filter(t => {
    const matchesSearch = 
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.simpleMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.realWorldAnalogy.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Fundamentals') return ['Variable', 'String', 'Integer', 'Float', 'Boolean', 'Function', 'Return', 'Parameter', 'Algorithm'].includes(t.term);
    if (selectedCategory === 'Python') return ['Dictionary', 'List', 'Slice', 'Mutable'].includes(t.term);
    if (selectedCategory === 'Databases') return ['SQL', 'Foreign Key', 'Primary Key', 'Index', 'Join', 'Transaction'].includes(t.term);
    if (selectedCategory === 'Go') return ['Goroutine', 'Channel', 'Deadlock'].includes(t.term);
    if (selectedCategory === 'Architecture') return ['API', 'JSON', 'Microservice', 'Docker', 'Rate Limiter', 'Cache', 'Load Balancer'].includes(t.term);
    return true;
  });

  const activeTerm = filtered.find(t => t.term === selectedTerm?.term) || filtered[0] || jargonDictionary[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-[85vh] rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl flex flex-col space-y-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Beginner's Jargon Buster & Dictionary
              </h2>
              <p className="text-xs text-slate-400">
                Every confusing technical term explained using simple kitchen, real-world analogies
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any term (e.g., Variable, String, Function, SQL, Docker, Return)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0 font-medium ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content split */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
          {/* Term list left */}
          <div className="w-full md:w-1/3 overflow-y-auto pr-1 space-y-1.5 border-r border-slate-800/80">
            {filtered.map((item) => (
              <button
                key={item.term}
                onClick={() => {
                  playSound('key');
                  setSelectedTerm(item);
                }}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors border ${
                  activeTerm.term === item.term
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold'
                    : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>{item.term}</span>
                  {activeTerm.term === item.term && (
                    <Sparkles className="h-3 w-3 text-amber-400" />
                  )}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {item.simpleMeaning}
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-500">
                No terms found matching "{searchQuery}"
              </div>
            )}
          </div>

          {/* Term detail right */}
          <div className="w-full md:w-2/3 overflow-y-auto p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col space-y-4">
            <div>
              <div className="text-[11px] font-mono uppercase text-amber-400 tracking-wider font-bold mb-1">
                Plain English Explanation
              </div>
              <h3 className="text-2xl font-bold text-white font-fantasy">
                {activeTerm.term}
              </h3>
            </div>

            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg">
              <div className="text-xs font-semibold text-slate-300 mb-1">
                What does it mean?
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {activeTerm.simpleMeaning}
              </p>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-300 mb-1">
                  Real-World ELI5 Analogy
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {activeTerm.realWorldAnalogy}
                </p>
              </div>
            </div>

            {activeTerm.example && (
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>How it looks in actual code:</span>
                </div>
                <pre className="p-3 bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800 rounded-lg overflow-x-auto whitespace-pre-wrap">
                  {activeTerm.example}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
