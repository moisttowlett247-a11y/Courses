import React from 'react';
import { UserStats, InventoryItem } from '../../types/curriculum';
import { Shield, Sparkles, Sword, Bot, Keyboard, Award, X, Check } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface CharacterSheetProps {
  userStats: UserStats;
  onEquipItem: (item: InventoryItem) => void;
  onClose: () => void;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({
  userStats,
  onEquipItem,
  onClose
}) => {
  const xpPercent = Math.min(100, Math.round((userStats.currentXp / userStats.xpToNextLevel) * 100));

  const statsList = [
    { label: 'Go Concurrency', val: userStats.radarStats.concurrency, color: 'text-cyan-400' },
    { label: 'DSA & Algorithms', val: userStats.radarStats.algorithms, color: 'text-purple-400' },
    { label: 'System Design', val: userStats.radarStats.systems, color: 'text-amber-400' },
    { label: 'Database & SQL', val: userStats.radarStats.databases, color: 'text-emerald-400' },
    { label: 'Clean Architecture', val: userStats.radarStats.cleanCode, color: 'text-sky-400' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold text-xl font-mono shadow-lg shadow-amber-500/20">
              {userStats.level}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-fantasy">
                Level {userStats.level} Backend Adventurer
              </h2>
              <p className="text-xs text-slate-400">
                Rank: {userStats.level >= 10 ? 'Archmage of Microservices' : userStats.level >= 5 ? 'Adept Systems Scripter' : 'Novice Byte Caster'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* XP Progression */}
          <div className="space-y-1.5 bg-slate-900/50 p-3.5 rounded-lg border border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Experience (XP)</span>
              <span className="font-mono text-amber-400 tabular-nums">
                {userStats.currentXp} / {userStats.xpToNextLevel} XP ({xpPercent}%)
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Radar / Core Stats Breakdown */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Core Backend Disciplines
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {statsList.map((st) => (
                <div key={st.label} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                  <span className="text-xs text-slate-300">{st.label}</span>
                  <span className={`text-xs font-mono font-bold ${st.color} tabular-nums`}>
                    {st.val} PTS
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Credentials Section */}
          {userStats.earnedCertificates && userStats.earnedCertificates.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="h-4 w-4" /> Earned Certifications ({userStats.earnedCertificates.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {userStats.earnedCertificates.map((cert) => (
                  <div key={cert.id} className="p-3 rounded-lg border border-amber-500/40 bg-amber-950/20 space-y-1">
                    <div className="font-bold text-xs text-amber-300 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                      <span>{cert.credentialTitle}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Score: <strong className="text-emerald-400">{cert.scorePercent}%</strong> · {cert.issuedDate}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      ID: {cert.verificationCode}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipped Gear & Inventory */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Equipped Artifacts & Gear
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userStats.inventory.map((item) => {
                const isEquipped = item.equipped;

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border flex flex-col justify-between space-y-2 transition-all ${
                      isEquipped
                        ? 'border-amber-500/50 bg-amber-950/20'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-200">{item.name}</span>
                        <span className={`text-[10px] uppercase font-semibold font-mono ${
                          item.rarity === 'Legendary' ? 'text-amber-400' : item.rarity === 'Epic' ? 'text-purple-400' : 'text-slate-400'
                        }`}>
                          {item.rarity}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                      <span className="text-[10px] font-mono text-amber-300 font-medium">
                        {item.statBonus}
                      </span>
                      <button
                        onClick={() => {
                          playSound('equip');
                          onEquipItem(item);
                        }}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-colors ${
                          isEquipped
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        {isEquipped ? 'Equipped' : 'Equip'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
