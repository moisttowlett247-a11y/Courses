import React from 'react';
import { Track, LessonContent } from '../../types/curriculum';
import { CheckCircle2, Circle, ChevronRight, Lock, BookOpen, Terminal, Cpu, Database, Network, Layers, Sparkles } from 'lucide-react';

interface SidebarProps {
  tracks: Track[];
  selectedLessonId: string;
  completedLessons: string[];
  onSelectLesson: (lesson: LessonContent) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tracks,
  selectedLessonId,
  completedLessons,
  onSelectLesson,
  isOpen
}) => {
  const getTrackIcon = (trackId: string) => {
    switch (trackId) {
      case 'track-python': return <Terminal className="h-4 w-4 text-sky-400" />;
      case 'track-golang': return <Cpu className="h-4 w-4 text-cyan-400" />;
      case 'track-dsa': return <Network className="h-4 w-4 text-purple-400" />;
      case 'track-sql': return <Database className="h-4 w-4 text-emerald-400" />;
      case 'track-architecture': return <Layers className="h-4 w-4 text-amber-400" />;
      default: return <BookOpen className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <aside className={`w-72 shrink-0 border-r border-slate-800 bg-slate-950 flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto transition-all ${isOpen ? 'block' : 'hidden md:block'}`}>
      <div className="p-3 border-b border-slate-800/80 bg-slate-900/40">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Backend Quest Lore
        </h2>
      </div>

      <div className="flex-1 p-2 space-y-4">
        {tracks.map((track) => {
          const allLessons = track.courses.flatMap(c => c.lessons);
          const completedCount = allLessons.filter(l => completedLessons.includes(l.id)).length;
          const progressPercent = Math.round((completedCount / (allLessons.length || 1)) * 100);

          return (
            <div key={track.id} className="space-y-1">
              <div className="flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2">
                  {getTrackIcon(track.id)}
                  <span className="truncate">{track.title}</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                  {completedCount}/{allLessons.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="px-2 pb-1">
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500/80 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Lessons List */}
              <div className="space-y-0.5 pt-1">
                {allLessons.map((lesson, idx) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isSelected = selectedLessonId === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-left text-xs transition-all ${
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
            </div>
          );
        })}
      </div>
    </aside>
  );
};
