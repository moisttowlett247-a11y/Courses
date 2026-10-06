import React, { useState } from 'react';
import { initialGuilds, weeklyLeaderboard } from '../../data/guildsData';
import { Guild } from '../../types/curriculum';
import { Users, Trophy, Flame, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface GuildsLeaderboardViewProps {
  currentGuildId?: string;
  onJoinGuild: (guildId: string) => void;
  userXp: number;
  userStreak: number;
  userName: string;
}

export const GuildsLeaderboardView: React.FC<GuildsLeaderboardViewProps> = ({
  currentGuildId,
  onJoinGuild,
  userXp,
  userStreak,
  userName
}) => {
  const [activeTab, setActiveTab] = useState<'guilds' | 'leaderboard'>('guilds');

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto space-y-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Users className="h-4 w-4" /> Community & Guild Competition
            </div>
            <h1 className="text-2xl font-bold text-white font-fantasy">
              Study Guilds & Weekly Leaderboards
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Join a specialized guild to unlock domain XP perks, compete on the global leaderboard, and protect your streak!
            </p>
          </div>

          {/* Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('guilds')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'guilds' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Study Guilds
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'leaderboard' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekly Leaderboard
            </button>
          </div>
        </div>

        {activeTab === 'guilds' ? (
          /* Guilds Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {initialGuilds.map((g) => {
              const isMember = currentGuildId === g.id;

              return (
                <div
                  key={g.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                    isMember
                      ? 'border-amber-500/60 bg-amber-950/20 shadow-lg'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-slate-950 shadow-md"
                          style={{ backgroundColor: g.color }}
                        >
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{g.name}</h3>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {g.members.toLocaleString()} Adventurers
                          </span>
                        </div>
                      </div>

                      {isMember && (
                        <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/40">
                          <CheckCircle2 className="h-3 w-3" /> Active Guild
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {g.tagline}
                    </p>

                    {/* Perk Box */}
                    <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-xs font-mono text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>{g.perk}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      Weekly XP: {g.weeklyXp.toLocaleString()}
                    </span>

                    <button
                      onClick={() => {
                        playSound('equip');
                        onJoinGuild(g.id);
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isMember
                          ? 'bg-slate-800 text-slate-400 cursor-default'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                      }`}
                    >
                      {isMember ? 'Joined' : 'Join Guild'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Leaderboard Table */
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Top Backend Adventurers (This Week)</span>
              <span className="font-mono text-amber-400">Resets in 3 days</span>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono text-[11px]">
                  <th className="p-3 pl-4">Rank</th>
                  <th className="p-3">Adventurer</th>
                  <th className="p-3">Guild</th>
                  <th className="p-3 text-right">Streak</th>
                  <th className="p-3 pr-4 text-right">Weekly XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                {weeklyLeaderboard.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-900/40">
                    <td className="p-3 pl-4 font-bold text-amber-400">
                      {row.rank === 1 ? '🥇 1' : row.rank === 2 ? '🥈 2' : row.rank === 3 ? '🥉 3' : `#${row.rank}`}
                    </td>
                    <td className="p-3 font-semibold text-white">
                      {row.name}
                    </td>
                    <td className="p-3 text-slate-400">{row.guild}</td>
                    <td className="p-3 text-right text-amber-400">
                      <span className="flex items-center justify-end gap-1">
                        <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span>{row.streak}d</span>
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-right text-emerald-400 font-bold">
                      +{row.xp.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
