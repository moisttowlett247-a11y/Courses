import React from 'react';
import { SkillNode } from '../../types/curriculum';
import { Zap, Cpu, Database, Network, HardDrive, Key, Box, Terminal, Layers, Check, Lock, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface SkillTreeViewProps {
  skills: SkillNode[];
  userLevel: number;
  unlockedSkillIds: string[];
  onUnlockSkill: (skillId: string) => void;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({
  skills,
  userLevel,
  unlockedSkillIds,
  onUnlockSkill
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="h-4 w-4" />;
      case 'Box': return <Box className="h-4 w-4" />;
      case 'Cpu': return <Cpu className="h-4 w-4" />;
      case 'Zap': return <Zap className="h-4 w-4" />;
      case 'Table': return <Database className="h-4 w-4" />;
      case 'Key': return <Key className="h-4 w-4" />;
      case 'Network': return <Network className="h-4 w-4" />;
      case 'Layers': return <Layers className="h-4 w-4" />;
      case 'HardDrive': return <HardDrive className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const categories = ['Languages', 'Databases', 'Algorithms', 'Systems'] as const;

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono font-semibold mb-1">
              <Sparkles className="h-4 w-4" /> TALENT SPECIFICATION TREE
            </div>
            <h1 className="text-2xl font-bold text-white font-fantasy">
              Backend Arcane Skill Tree
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Unlock passives and specialized talents across systems programming, concurrency, and distributed algorithms.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-950/20 px-4 py-2 text-xs font-mono">
            <span className="text-slate-400">Adventurer Level:</span>
            <span className="font-bold text-amber-400">{userLevel}</span>
          </div>
        </div>

        {/* Categories Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const catSkills = skills.filter(s => s.category === cat);

            return (
              <div key={cat} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-2">
                  <span>{cat} Mastery</span>
                </h2>

                <div className="space-y-3">
                  {catSkills.map((skill) => {
                    const isUnlocked = unlockedSkillIds.includes(skill.id);
                    const canUnlock = userLevel >= skill.requiredLevel && 
                      skill.prerequisites.every(p => unlockedSkillIds.includes(p));

                    return (
                      <div
                        key={skill.id}
                        className={`p-3.5 rounded-lg border transition-all ${
                          isUnlocked
                            ? 'border-amber-500/40 bg-amber-950/20'
                            : canUnlock
                            ? 'border-slate-700 bg-slate-900 hover:border-amber-500/40'
                            : 'border-slate-800/60 bg-slate-950/50 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              isUnlocked ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {getIcon(skill.icon)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <span>{skill.title}</span>
                                <span className="text-[10px] text-slate-500 font-mono">Tier {skill.tier}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                {skill.description}
                              </p>
                            </div>
                          </div>

                          <div>
                            {isUnlocked ? (
                              <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold font-mono">
                                <Check className="h-3 w-3" /> Mastered
                              </span>
                            ) : canUnlock ? (
                              <button
                                onClick={() => {
                                  playSound('pass');
                                  onUnlockSkill(skill.id);
                                }}
                                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 text-xs rounded transition-all active:scale-95"
                              >
                                Unlock
                              </button>
                            ) : (
                              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                                <Lock className="h-3 w-3" /> Lvl {skill.requiredLevel} Req
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 text-[10px] font-mono text-amber-300/80 pt-2 border-t border-slate-800/50 flex justify-between">
                          <span>Bonus: +{skill.statBonus.amount} {skill.statBonus.stat}</span>
                          {skill.prerequisites.length > 0 && (
                            <span className="text-slate-500">Requires previous tier</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
