import React, { useState } from 'react';
import { Track, LessonContent, TierLevel } from '../../types/curriculum';
import { CheckCircle2, Circle, BookOpen, Terminal, Cpu, Database, Network, Layers, Sparkles, Filter } from 'lucide-react';

interface SidebarProps {
  tracks: Track[];
  selectedLessonId: string;
  completedLessons: string[];
  onSelectLesson: (lesson: LessonContent) => void;
  isOpen: boolean;
  onToggle: () => void;
  onNavigateToCertifications?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tracks,
  selectedLessonId,
  completedLessons,
  onSelectLesson,
  isOpen,
  onNavigateToCertifications
}) => {
  const [selectedTier, setSelectedTier] = useState<TierLevel | 'all'>('all');

  const filteredTracks = selectedTier === 'all' 
    ? tracks 
    : tracks.filter(t => t.tier === selectedTier);

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="h-4 w-4 text-emerald-400" />;
      case 'Terminal': return <Terminal className="h-4 w-4 text-sky-400" />;
      case 'Cpu': return <Cpu className="h-4 w-4 text-cyan-400" />;
      case 'Network': return <Network className="h-4 w-4 text-purple-400" />;
      case 'Database': return <Database className="h-4 w-4 text-emerald-400" />;
      case 'Layers': return <Layers className="h-4 w-4 text-amber-400" />;
      default: return <BookOpen className="h-4 w-4 text-slate-400" />;
    }
  };

  const getTierBadge = (tier: TierLevel) => {
    switch (tier) {
      case 'beginner':
        return <span className="text-[10px] font-mono font-bold text-emerald-400">🟢 Beginner</span>;
      case 'intermediate':
        return <span className="text-[10px] font-mono font-bold text-sky-400">🟡 Medium</span>;
      case 'advanced':
        return <span className="text-[10px] font-mono font-bold text-rose-400">🔴 Hard</span>;
    }
  };

  return (
    <aside className={`w-80 shrink-0 border-r border-slate-800 bg-slate-950 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden transition-all ${isOpen ? 'block' : 'hidden md:block'}`}>
      {/* Tier Filter Tabs */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/60 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Difficulty Tier
          </span>
          <span className="text-[10px] text-amber-400 font-mono">Zero-to-Hero</span>
        </div>

        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-medium">
          <button
            onClick={() => setSelectedTier('all')}
            className={`py-1 rounded transition-colors text-center ${
              selectedTier === 'all'
                ? 'bg-slate-800 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedTier('beginner')}
            title="Start here if you have 0 coding knowledge"
            className={`py-1 rounded transition-colors text-center ${
              selectedTier === 'beginner'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => setSelectedTier('intermediate')}
            className={`py-1 rounded transition-colors text-center ${
              selectedTier === 'intermediate'
                ? 'bg-sky-950/80 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-slate-400 hover:text-sky-400'
            }`}
          >
            Med
          </button>
          <button
            onClick={() => setSelectedTier('advanced')}
            className={`py-1 rounded transition-colors text-center ${
              selectedTier === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40 font-semibold'
                : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            Hard
          </button>
        </div>
      </div>

      {/* Tracks & Lessons List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {filteredTracks.map((track) => {
          const allLessons = track.courses.flatMap(c => c.lessons);
          const completedCount = allLessons.filter(l => completedLessons.includes(l.id)).length;
          const progressPercent = Math.round((completedCount / (allLessons.length || 1)) * 100);

          return (
            <div key={track.id} className="space-y-1.5 rounded-lg border border-slate-800/80 bg-slate-900/30 p-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2 truncate">
                  {getTrackIcon(track.icon)}
                  <span className="truncate">{track.title}</span>
                </div>
                {getTierBadge(track.tier)}
              </div>

              {/* Tagline */}
              <p className="text-[11px] text-slate-400 leading-snug">
                {track.tagline}
              </p>

              {/* Progress bar */}
              <div className="pt-1">
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Lessons List */}
              <div className="space-y-1 pt-1.5">
                {allLessons.map((lesson, idx) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isSelected = selectedLessonId === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-left text-xs transition-all ${
                        isSelected 
                          ? 'bg-amber-500/15 text-amber-300 font-medium border border-amber-500/30' 
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {isCompleted ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                        )}
                        <span className="truncate">
                          {idx + 1}. {lesson.title}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-amber-400/80 shrink-0 tabular-nums">
                        +{lesson.xpReward} XP
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Take Track Certification Exam Link */}
              {onNavigateToCertifications && (
                <div className="pt-2 border-t border-slate-800/60 mt-1">
                  <button
                    onClick={onNavigateToCertifications}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <span>🎓 Track Certification Exam</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
