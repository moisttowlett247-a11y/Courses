import React, { useState } from 'react';
import { BossRaid, BossPhase } from '../../types/curriculum';
import { runInteractiveCode } from '../../utils/codeRunner';
import { playSound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Swords, ShieldAlert, Sparkles, Trophy, Play, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

interface BossRaidModalProps {
  bossRaids: BossRaid[];
  completedBosses: string[];
  onBossDefeated: (boss: BossRaid) => void;
  onClose: () => void;
}

export const BossRaidModal: React.FC<BossRaidModalProps> = ({
  bossRaids,
  completedBosses,
  onBossDefeated,
  onClose
}) => {
  const [selectedBoss, setSelectedBoss] = useState<BossRaid | null>(null);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [bossHp, setBossHp] = useState<number>(1000);
  const [code, setCode] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isVictory, setIsVictory] = useState(false);

  const startRaid = (boss: BossRaid) => {
    setSelectedBoss(boss);
    setCurrentPhaseIndex(0);
    setBossHp(boss.maxHp);
    setCode(boss.phases[0].starterCode);
    setBattleLog([`⚔️ Raid initiated: ${boss.name} (${boss.title}) emerged from the tech debt abyss!`]);
    setIsVictory(false);
  };

  const currentPhase: BossPhase | undefined = selectedBoss?.phases[currentPhaseIndex];

  const handleStrike = async () => {
    if (!selectedBoss || !currentPhase) return;
    setIsRunning(true);
    playSound('key');

    const result = await runInteractiveCode(
      selectedBoss.language,
      code,
      currentPhase.testCases,
      currentPhase.solutionCode
    );

    setIsRunning(false);

    if (result.success) {
      playSound('bossHit');
      const dmg = Math.round((currentPhase.damagePercent / 100) * selectedBoss.maxHp);
      const newHp = Math.max(0, bossHp - dmg);
      setBossHp(newHp);
      setBattleLog(prev => [
        `💥 CRITICAL HIT! Phase ${currentPhaseIndex + 1} code verified. Dealt ${dmg} damage to ${selectedBoss.name}!`,
        ...prev
      ]);

      if (currentPhaseIndex + 1 < selectedBoss.phases.length) {
        // Advance phase
        setCurrentPhaseIndex(prev => prev + 1);
        setCode(selectedBoss.phases[currentPhaseIndex + 1].starterCode);
      } else {
        // Victory!
        playSound('bossDefeat');
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        setIsVictory(true);
        onBossDefeated(selectedBoss);
      }
    } else {
      playSound('fail');
      setBattleLog(prev => [
        `🛡️ BOSS COUNTER-ATTACK! The boss deflected your code: ${result.output.split('\n')[0]}`,
        ...prev
      ]);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto">
      {!selectedBoss ? (
        // Boss Selection Arena
        <div className="max-w-6xl mx-auto p-6 space-y-6 w-full">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono font-semibold mb-1">
              <Swords className="h-4 w-4" /> LEGENDARY RAID DUNGEONS
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Backend Boss Raids
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Team up with your coding companions to dismantle massive legacy monoliths and concurrent race conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bossRaids.map((boss) => {
              const isBeaten = completedBosses.includes(boss.id);

              return (
                <div
                  key={boss.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-amber-500/40 transition-all flex flex-col group shadow-lg"
                >
                  <div className="h-48 w-full relative overflow-hidden bg-slate-900">
                    <img
                      src={boss.imagePath}
                      alt={boss.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute top-3 right-3">
                      {isBeaten ? (
                        <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold px-2.5 py-1 rounded">
                          <CheckCircle2 className="h-3 w-3" /> Defeated
                        </span>
                      ) : (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold px-2.5 py-1 rounded">
                          +{boss.xpReward} XP
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {boss.name}
                      </h2>
                      <div className="text-xs text-amber-400/90 font-medium mb-2">{boss.title}</div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {boss.loreDescription}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs space-y-1">
                      <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                        Legendary Loot Drop:
                      </div>
                      <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        {boss.lootReward.itemName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {boss.lootReward.statBoost}
                      </div>
                    </div>

                    <button
                      onClick={() => startRaid(boss)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 rounded-lg text-xs transition-all active:scale-95 shadow-md shadow-amber-500/10 cursor-pointer"
                    >
                      <Swords className="h-4 w-4" />
                      <span>{isBeaten ? 'Replay Raid Battle' : 'Enter Boss Raid Arena'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Active Boss Raid Battle View
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Battle Header */}
          <div className="border-b border-slate-800 bg-slate-900/90 px-6 py-3 flex items-center justify-between">
            <button
              onClick={() => setSelectedBoss(null)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Raid Hub
            </button>

            {/* Boss HP Bar */}
            <div className="w-96 space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-rose-400">{selectedBoss.name}</span>
                <span className="text-slate-400 tabular-nums">{bossHp} / {selectedBoss.maxHp} HP</span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-rose-900/50">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-500"
                  style={{ width: `${Math.round((bossHp / selectedBoss.maxHp) * 100)}%` }}
                />
              </div>
            </div>

            <div className="text-xs font-mono text-amber-400 font-semibold">
              Phase {currentPhaseIndex + 1} of {selectedBoss.phases.length}
            </div>
          </div>

          {/* Battle Stage Split */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Left: Lore & Objectives */}
            <div className="w-full lg:w-1/2 border-r border-slate-800 p-5 space-y-4 overflow-y-auto bg-slate-950">
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  {currentPhase?.title}
                </div>
                <blockquote className="italic text-xs text-rose-300/90 border-l-2 border-rose-500 pl-3">
                  {currentPhase?.loreQuote}
                </blockquote>
                <p className="text-xs text-slate-300 leading-relaxed pt-2">
                  {currentPhase?.description}
                </p>
              </div>

              {/* Combat Log */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3 space-y-1.5 font-mono text-[11px] max-h-48 overflow-y-auto">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Live Combat Log</div>
                {battleLog.map((log, idx) => (
                  <div key={idx} className="text-slate-300 leading-snug">{log}</div>
                ))}
              </div>

              {/* Victory Card */}
              {isVictory && (
                <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-5 text-center space-y-3 animate-pulse-subtle">
                  <Trophy className="h-10 w-10 text-amber-400 mx-auto" />
                  <h3 className="text-lg font-bold text-amber-300 font-fantasy">
                    VICTORY! {selectedBoss.name} DEFEATED!
                  </h3>
                  <p className="text-xs text-slate-300">
                    You have purged the legacy demons and claimed the legendary artifact:
                  </p>
                  <div className="inline-block rounded-lg border border-amber-500/40 bg-slate-900 p-3 text-xs">
                    <span className="font-bold text-amber-400">{selectedBoss.lootReward.itemName}</span>
                    <div className="text-[11px] text-slate-400">{selectedBoss.lootReward.statBoost}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Code Refactoring Arena */}
            <div className="w-full lg:w-1/2 flex flex-col bg-slate-950">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/40 text-xs font-mono">
                <span className="text-amber-400">boss_strike.{selectedBoss.language === 'python' ? 'py' : 'go'}</span>
                <button
                  onClick={handleStrike}
                  disabled={isRunning || isVictory}
                  className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-1.5 rounded text-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Swords className="h-3.5 w-3.5" />
                  <span>{isRunning ? 'Validating Strike...' : 'Cast Refactor Strike!'}</span>
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 p-4 bg-transparent text-slate-100 font-mono text-xs leading-relaxed resize-none outline-none focus:ring-0 selection:bg-rose-500/30"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
