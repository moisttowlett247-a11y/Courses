import React, { useState } from 'react';
import { Flashcard } from '../../types/curriculum';
import { flashcardDecks } from '../../data/flashcardsData';
import { playSound } from '../../utils/soundEffects';
import { Sparkles, RotateCw, CheckCircle2, ChevronRight, ChevronLeft, Lightbulb, BookOpen } from 'lucide-react';

interface FlashcardsViewProps {
  masteredCardIds: string[];
  onToggleMastered: (cardId: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  masteredCardIds,
  onToggleMastered
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = ['All', 'Python', 'SQL', 'Go', 'Architecture'];

  const filteredCards = selectedCategory === 'All'
    ? flashcardDecks
    : flashcardDecks.filter(c => c.category === selectedCategory);

  const activeCard = filteredCards[currentCardIndex] || filteredCards[0];
  const isCurrentMastered = activeCard ? masteredCardIds.includes(activeCard.id) : false;

  const handleFlip = () => {
    playSound('key');
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    playSound('key');
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    playSound('key');
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleMasteryToggle = () => {
    if (!activeCard) return;
    playSound('pass');
    onToggleMastered(activeCard.id);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto p-6 items-center">
      <div className="max-w-3xl w-full space-y-6 my-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Certification Exam Cram Deck
          </div>
          <h1 className="text-2xl font-bold text-white font-fantasy">
            Spaced Repetition Flashcards
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Flip cards to cement essential syntax rules, keyword differences, and system design definitions before certification exams.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Flashcard Box */}
        {activeCard && (
          <div
            onClick={handleFlip}
            className="cursor-pointer min-h-[320px] rounded-2xl border-2 border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl flex flex-col justify-between transition-all hover:border-amber-500/50 relative overflow-hidden group select-none"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="uppercase text-amber-400 font-bold">{activeCard.category}</span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <RotateCw className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-500" /> Click to Flip Card
              </span>
            </div>

            {/* Front or Back Content */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                // Front: Question
                <div className="space-y-4 text-center">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Question:
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                    {activeCard.frontQuestion}
                  </h2>
                </div>
              ) : (
                // Back: Detailed Answer + ELI5 Analogy + Code
                <div className="space-y-4 text-left">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                    Answer & Concept:
                  </span>
                  <p className="text-sm text-slate-100 leading-relaxed font-sans font-medium">
                    {activeCard.backAnswer}
                  </p>

                  {/* ELI5 Real World Analogy */}
                  <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-950/20 text-xs text-amber-200 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-400">
                      <Lightbulb className="h-3.5 w-3.5" /> Plain-English Analogy:
                    </span>
                    <p>{activeCard.eli5Analogy}</p>
                  </div>

                  {/* Code Example */}
                  {activeCard.codeExample && (
                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5 font-mono text-[11px] text-sky-300 overflow-x-auto">
                      <pre>{activeCard.codeExample}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <span className="font-mono text-slate-500">
                Card {currentCardIndex + 1} of {filteredCards.length}
              </span>

              <span className={`flex items-center gap-1 font-mono text-[11px] ${
                isCurrentMastered ? 'text-emerald-400 font-bold' : 'text-slate-500'
              }`}>
                {isCurrentMastered ? '★ Mastered' : '○ In Progress'}
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>

          <button
            onClick={handleMasteryToggle}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              isCurrentMastered
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-md'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isCurrentMastered ? 'Marked as Mastered' : 'Mark as Mastered (Earn XP)'}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
