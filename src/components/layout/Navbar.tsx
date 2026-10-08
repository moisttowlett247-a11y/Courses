import React, { useState, useRef, useEffect } from 'react';
import { UserStats } from '../../types/curriculum';
import { 
  Flame, 
  Sparkles, 
  Wand2, 
  TerminalSquare, 
  Bug, 
  BookOpen, 
  FolderGit2, 
  MessageSquare, 
  Users, 
  ChevronDown,
  Database,
  Terminal,
  Layers,
  HelpCircle,
  Menu,
  X,
  ShieldCheck,
  Sword,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  userStats: UserStats;
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenCharacterSheet: () => void;
  onOpenArchmageAI: () => void;
  onOpenDailyQuests: () => void;
  onOpenJargonModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userStats,
  currentView,
  onNavigate,
  onOpenCharacterSheet,
  onOpenArchmageAI,
  onOpenDailyQuests,
  onOpenJargonModal
}) => {
  const [labsOpen, setLabsOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const xpPercent = Math.min(100, Math.round((userStats.currentXp / userStats.xpToNextLevel) * 100));

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLabsOpen(false);
        setPracticeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMobileNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-3 md:px-6 backdrop-blur relative">
      {/* Zone 1: Mobile Hamburger + Logo */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
          title="Open Menu"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        <button 
          onClick={() => onNavigate('curriculum')}
          className="flex items-center gap-2 text-left group transition-transform active:scale-95 shrink-0"
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
      </div>

      {/* Zone 2: Navigation links */}
      <nav ref={dropdownRef} className="hidden md:flex items-center gap-4 lg:gap-5 text-xs font-medium text-slate-400">
        <button
          onClick={() => onNavigate('curriculum')}
          className={`hover:text-amber-400 transition-colors ${currentView === 'curriculum' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          Curriculum
        </button>

        <button
          onClick={() => onNavigate('certifications')}
          className={`hover:text-amber-400 transition-colors flex items-center gap-1.5 ${currentView === 'certifications' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Degrees & Certs</span>
          {userStats.earnedCertificates && userStats.earnedCertificates.length > 0 && (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold">
              {userStats.earnedCertificates.length}
            </span>
          )}
        </button>

        <button
          onClick={() => onNavigate('boss-raids')}
          className={`hover:text-amber-400 transition-colors ${currentView === 'boss-raids' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          Boss Raids
        </button>

        {/* Practice Hub Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setPracticeOpen(!practiceOpen);
              setLabsOpen(false);
            }}
            className={`flex items-center gap-1 hover:text-amber-400 transition-colors ${
              ['bug-bounty', 'flashcards', 'portfolio', 'interview'].includes(currentView)
                ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5'
                : ''
            }`}
          >
            <span>Practice</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {practiceOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-md p-1.5 shadow-xl z-50 text-xs">
              <button
                onClick={() => {
                  onNavigate('bug-bounty');
                  setPracticeOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  currentView === 'bug-bounty' ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Bug className="h-4 w-4 text-rose-400" />
                <span>Bug Bounty Arena</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('flashcards');
                  setPracticeOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  currentView === 'flashcards' ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Exam Flashcards</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('portfolio');
                  setPracticeOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  currentView === 'portfolio' ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FolderGit2 className="h-4 w-4 text-emerald-400" />
                <span>Portfolio Projects</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('interview');
                  setPracticeOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  currentView === 'interview' ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <MessageSquare className="h-4 w-4 text-sky-400" />
                <span>Mock Interview</span>
              </button>
            </div>
          )}
        </div>

        {/* Labs Dropdown (SQL, Linux, Architecture) */}
        <div className="relative">
          <button
            onClick={() => {
              setLabsOpen(!labsOpen);
              setPracticeOpen(false);
            }}
            className={`flex items-center gap-1 hover:text-amber-400 transition-colors ${
              ['sql-playground', 'terminal', 'architecture'].includes(currentView)
                ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5'
                : ''
            }`}
          >
            <span>Labs</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {labsOpen && (
            <div className="absolute top-full left-0 mt-2 w-44 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-md p-1.5 shadow-xl z-50 text-xs">
              <button
                onClick={() => {
                  onNavigate('sql-playground');
                  setLabsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  currentView === 'sql-playground' ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Database className="h-4 w-4 text-cyan-400" />
                <span>SQL Studio</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('terminal');
                  setLabsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  currentView === 'terminal' ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span>Linux Terminal</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('architecture');
                  setLabsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  currentView === 'architecture' ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Layers className="h-4 w-4 text-purple-400" />
                <span>System Design</span>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => onNavigate('guilds')}
          className={`hover:text-amber-400 transition-colors flex items-center gap-1.5 ${currentView === 'guilds' ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''}`}
        >
          <Users className="h-3.5 w-3.5 text-amber-400" />
          <span>Guilds</span>
        </button>
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Jargon Buster Dictionary button */}
        <button
          onClick={onOpenJargonModal}
          title="Beginner's Jargon Buster (Coding Terms in Plain English)"
          className="flex items-center gap-1.5 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
        >
          <BookOpen className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden xl:inline">Jargon Buster</span>
        </button>

        {/* Streak & Quests trigger */}
        <button
          onClick={onOpenDailyQuests}
          title="Daily Quests & Streak"
          className="flex items-center gap-1.5 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-amber-400 border border-slate-800 hover:border-amber-500/40 transition-colors"
        >
          <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="font-mono tabular-nums">{userStats.streakDays}d</span>
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
          className="flex items-center gap-2 rounded-md bg-slate-900 p-1.5 pr-2.5 text-xs border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500 text-[11px] font-bold text-slate-950 font-mono">
            {userStats.level}
          </div>
          <div className="hidden sm:flex flex-col items-start text-left">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Lvl {userStats.level}</span>
            <div className="w-14 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-800 p-4 shadow-2xl z-50 flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Core Tracks</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleMobileNav('curriculum')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentView === 'curriculum'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <BookOpen className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Curriculum</span>
            </button>

            <button
              onClick={() => handleMobileNav('certifications')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentView === 'certifications'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <GraduationCap className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Degrees & Certifications</span>
            </button>

            <button
              onClick={() => handleMobileNav('boss-raids')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentView === 'boss-raids'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <Sword className="h-4 w-4 text-rose-400 shrink-0" />
              <span>Boss Raids</span>
            </button>

            <button
              onClick={() => handleMobileNav('guilds')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentView === 'guilds'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <Users className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Study Guilds</span>
            </button>
          </div>

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 pt-2 border-t border-slate-900">Practice Arena</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleMobileNav('bug-bounty')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentView === 'bug-bounty'
                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <Bug className="h-4 w-4 text-rose-400 shrink-0" />
              <span>Bug Bounty</span>
            </button>

            <button
              onClick={() => handleMobileNav('flashcards')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentView === 'flashcards'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => handleMobileNav('portfolio')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentView === 'portfolio'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <FolderGit2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Portfolio</span>
            </button>

            <button
              onClick={() => handleMobileNav('interview')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentView === 'interview'
                  ? 'bg-sky-500/15 border-sky-500/40 text-sky-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <MessageSquare className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Mock Interview</span>
            </button>
          </div>

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 pt-2 border-t border-slate-900">Interactive Labs</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => handleMobileNav('sql-playground')}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 text-center"
            >
              <Database className="h-4 w-4 text-cyan-400" />
              <span className="text-[11px]">SQL Studio</span>
            </button>

            <button
              onClick={() => handleMobileNav('terminal')}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 text-center"
            >
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="text-[11px]">Terminal</span>
            </button>

            <button
              onClick={() => handleMobileNav('architecture')}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 text-center"
            >
              <Layers className="h-4 w-4 text-purple-400" />
              <span className="text-[11px]">System Design</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

