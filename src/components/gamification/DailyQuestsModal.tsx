import React from 'react';
import { UserStats } from '../../types/curriculum';
import { Flame, CheckCircle2, Gift, X, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface DailyQuestsModalProps {
  userStats: UserStats;
  onClaimQuest: (questId: string) => void;
  onClose: () => void;
}

export const DailyQuestsModal: React.FC<DailyQuestsModalProps> = ({
  userStats,
  onClaimQuest,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xl flex flex-col space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Daily Backend Bounties</h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Current Streak: {userStats.streakDays} Consecutive Days 🔥
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quests List */}
        <div className="space-y-3">
          {userStats.dailyQuests.map((quest) => {
            const isFinished = quest.completed;
            const progressPercent = Math.min(100, Math.round((quest.currentCount / quest.targetCount) * 100));

            return (
              <div
                key={quest.id}
                className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">{quest.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{quest.description}</p>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="text-amber-400">+{quest.xpReward} XP</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="w-48 space-y-1">
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {quest.currentCount} / {quest.targetCount}
                    </span>
                  </div>

                  <button
                    disabled={!isFinished}
                    onClick={() => {
                      playSound('gem');
                      onClaimQuest(quest.id);
                    }}
                    className={`text-xs font-semibold px-3 py-1 rounded transition-colors ${
                      isFinished
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                        : 'bg-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {isFinished ? 'Claim Reward' : 'In Progress'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
