import React from 'react';
import { UserStats } from '../../types/curriculum';
import { Flame, Sparkles, Wand2, ShieldCheck, TerminalSquare, Compass } from 'lucide-react';

interface NavbarProps {
  userStats: UserStats;
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenCharacterSheet: () => void;
  onOpenArchmageAI: () => void;
  onOpenDailyQuests: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userStats,
  currentView,
  onNavigate,
  onOpenCharacterSheet,
  onOpenArchmageAI,
  onOpenDailyQuests
}) => {
  const xpPercent = Math.min(100, Math.round((userStats.currentXp / userStats.xpToNextLevel) * 100));

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur md:px-6">
      {/* Zone 1: Single text element wordmark */}
      <button 
        onClick={() => onNavigate('curriculum')}
        className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-bold shadow-sm shadow-amber-500/20">
          <TerminalSquare className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-fantasy text-lg font-bold tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors">
            BOOTFORGE
          </span>
        </div>
      </button>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={() => onNavigate('curriculum')}
          className={`hover:text-amber-400 transition-colors ${currentView === 'curriculum' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          Curriculum
        </button>
        <button
          onClick={() => onNavigate('boss-raids')}
          className={`hover:text-amber-400 transition-colors ${currentView === 'boss-raids' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          Boss Raids
        </button>
        <button
          onClick={() => onNavigate('sql-playground')}
          className={`hover:text-amber-400 transition-colors ${currentView === 'sql-playground' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          SQL Studio
        </button>
        <button
          onClick={() => onNavigate('terminal')}
          className={`hover:text-amber-400 transition-colors ${currentView === 'terminal' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          Linux Terminal
        </button>
        <button
          onClick={() => onNavigate('architecture')}
          className={`hover:text-amber-400 transition-colors ${currentView === 'architecture' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          System Design
        </button>
        <button
          onClick={() => onNavigate('skill-tree')}
          className={`hover:text-amber-400 transition-colors ${currentView === 'skill-tree' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          Skill Tree
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        {/* Streak & Quests trigger */}
        <button
          onClick={onOpenDailyQuests}
          title="Daily Quests & Streak"
          className="flex items-center gap-1.5 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-amber-400 border border-slate-800 hover:border-amber-500/40 transition-colors"
        >
          <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="font-mono tabular-nums">{userStats.streakDays}d Streak</span>
        </button>

        {/* AI Archmage button */}
        <button
          onClick={onOpenArchmageAI}
          title="Ask Archmage AI Mentor"
          className="flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1.5 text-xs font-semibold text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all active:scale-95"
        >
          <Wand2 className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline">Archmage AI</span>
        </button>

        {/* Adventurer Level & Character Sheet */}
        <button
          onClick={onOpenCharacterSheet}
          title="View Adventurer Character Sheet"
          className="flex items-center gap-2 rounded-md bg-slate-900 p-1.5 pr-3 text-xs border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500 text-[11px] font-bold text-slate-950 font-mono">
            {userStats.level}
          </div>
          <div className="hidden sm:flex flex-col items-start text-left">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Lvl {userStats.level}</span>
            <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
