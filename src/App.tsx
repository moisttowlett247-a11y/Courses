/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { backendTracks } from './data/coursesData';
import { bossRaids } from './data/bossRaidsData';
import { skillTreeNodes } from './data/skillTreeData';
import { initialInventoryItems } from './data/inventoryData';
import { LessonContent, UserStats, BossRaid, InventoryItem, EarnedCertificate } from './types/curriculum';
import { runInteractiveCode, ExecutionResult } from './utils/codeRunner';
import { playSound } from './utils/soundEffects';
import confetti from 'canvas-confetti';
import { Menu, Split, BookOpen, Code2 } from 'lucide-react';

// Layout & Components
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { TheoryViewer } from './components/lesson/TheoryViewer';
import { CodeEditor } from './components/lesson/CodeEditor';
import { TestResultsPanel } from './components/lesson/TestResultsPanel';
import { SqlPlayground } from './components/interactive/SqlPlayground';
import { TerminalEmulator } from './components/interactive/TerminalEmulator';
import { SystemDesignCanvas } from './components/interactive/SystemDesignCanvas';
import { BossRaidModal } from './components/boss/BossRaidModal';
import { CharacterSheet } from './components/gamification/CharacterSheet';
import { SkillTreeView } from './components/gamification/SkillTreeView';
import { DailyQuestsModal } from './components/gamification/DailyQuestsModal';
import { ArchmageAiDrawer } from './components/ai/ArchmageAiDrawer';
import { CertificationCenter } from './components/certification/CertificationCenter';
import { BugChallengesView } from './components/practice/BugChallengesView';
import { FlashcardsView } from './components/practice/FlashcardsView';
import { PortfolioProjectsView } from './components/practice/PortfolioProjectsView';
import { MockInterviewView } from './components/practice/MockInterviewView';
import { GuildsLeaderboardView } from './components/community/GuildsLeaderboardView';
import { VisualCodeStepper } from './components/debugger/VisualCodeStepper';
import { JargonModal } from './components/layout/JargonModal';

const initialUserStats: UserStats = {
  studentName: 'Backend Adventurer',
  level: 1,
  currentXp: 0,
  xpToNextLevel: 100,
  streakDays: 4,
  lastActiveDate: '2026-10-06',
  gems: 45,
  completedLessons: [],
  completedBosses: [],
  completedBugChallenges: [],
  masteredFlashcardIds: [],
  joinedGuildId: 'guild-python',
  unlockedSkills: ['skill-py-core', 'skill-go-structs', 'skill-sql-joins'],
  inventory: initialInventoryItems,
  earnedCertificates: [],
  equippedItems: {
    weapon: 'item-keeb-novice',
    armor: 'item-robe-apprentice'
  },
  radarStats: {
    concurrency: 20,
    algorithms: 15,
    systems: 25,
    databases: 30,
    cleanCode: 35
  },
  dailyQuests: [
    {
      id: 'quest-1',
      title: 'Pass 2 Backend Code Exercises',
      description: 'Run tests and satisfy all assertions in 2 lessons.',
      targetCount: 2,
      currentCount: 0,
      completed: false,
      xpReward: 100,
      gemReward: 10
    },
    {
      id: 'quest-2',
      title: 'Execute a SQL Join Query',
      description: 'Run an inner or left join query on the relational database.',
      targetCount: 1,
      currentCount: 1,
      completed: true,
      xpReward: 75,
      gemReward: 5
    }
  ]
};

export default function App() {
  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('bootforge_user_stats');
      return saved ? JSON.parse(saved) : initialUserStats;
    } catch {
      return initialUserStats;
    }
  });

  const [currentView, setCurrentView] = useState<string>('curriculum');
  const [selectedLesson, setSelectedLesson] = useState<LessonContent>(backendTracks[0].courses[0].lessons[0]);
  const [code, setCode] = useState<string>(backendTracks[0].courses[0].lessons[0].starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<ExecutionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'tests' | 'console'>('code');
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });
  const [layoutMode, setLayoutMode] = useState<'both' | 'theory' | 'editor'>('both');

  // Modals & Drawers
  const [isCharacterSheetOpen, setIsCharacterSheetOpen] = useState(false);
  const [isDailyQuestsOpen, setIsDailyQuestsOpen] = useState(false);
  const [isArchmageAiOpen, setIsArchmageAiOpen] = useState(false);
  const [isStepperOpen, setIsStepperOpen] = useState(false);
  const [isJargonModalOpen, setIsJargonModalOpen] = useState(false);
  const [aiDiagnoseMessage, setAiDiagnoseMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bootforge_user_stats', JSON.stringify(userStats));
    } catch (e) {}
  }, [userStats]);

  // When switching lessons
  const handleSelectLesson = (lesson: LessonContent) => {
    setSelectedLesson(lesson);
    setCode(lesson.starterCode);
    setTestResults(null);
    setRevealedHints([]);
    setCurrentView('curriculum');
  };

  // Run Code & Tests
  const handleRunCode = async () => {
    setIsRunning(true);
    const res = await runInteractiveCode(
      selectedLesson.language,
      code,
      selectedLesson.testCases,
      selectedLesson.solutionCode
    );
    setIsRunning(false);
    setTestResults(res);

    if (res.success) {
      playSound('pass');
      // If newly completed lesson
      if (!userStats.completedLessons.includes(selectedLesson.id)) {
        addXp(selectedLesson.xpReward);
        setUserStats(prev => ({
          ...prev,
          completedLessons: [...prev.completedLessons, selectedLesson.id],
          dailyQuests: prev.dailyQuests.map(q => 
            q.id === 'quest-1' ? { ...q, currentCount: Math.min(q.targetCount, q.currentCount + 1), completed: q.currentCount + 1 >= q.targetCount } : q
          )
        }));
      }
    } else {
      playSound('fail');
    }
  };

  // Add XP and handle leveling
  const addXp = (xp: number) => {
    setUserStats(prev => {
      let newXp = prev.currentXp + xp;
      let newLevel = prev.level;
      let newTarget = prev.xpToNextLevel;

      if (newXp >= newTarget) {
        newLevel += 1;
        newXp = newXp - newTarget;
        newTarget = Math.round(newTarget * 1.5);
        playSound('levelUp');
        confetti({ particleCount: 120, spread: 60 });
      }

      return {
        ...prev,
        level: newLevel,
        currentXp: newXp,
        xpToNextLevel: newTarget
      };
    });
  };

  const handleBossDefeated = (boss: BossRaid) => {
    addXp(boss.xpReward);
    setUserStats(prev => ({
      ...prev,
      completedBosses: [...prev.completedBosses, boss.id],
      inventory: [
        ...prev.inventory,
        {
          id: boss.lootReward.itemId,
          name: boss.lootReward.itemName,
          type: boss.lootReward.itemType as any,
          rarity: boss.lootReward.rarity,
          icon: 'Sparkles',
          description: boss.lootReward.description,
          statBonus: boss.lootReward.statBoost,
          equipped: true,
          unlockedAt: `Defeated ${boss.name}`
        }
      ]
    }));
  };

  const handleEquipItem = (item: InventoryItem) => {
    setUserStats(prev => ({
      ...prev,
      inventory: prev.inventory.map(i => 
        i.id === item.id 
          ? { ...i, equipped: !i.equipped } 
          : (i.type === item.type && !item.equipped ? { ...i, equipped: false } : i)
      )
    }));
  };

  const handleUnlockSkill = (skillId: string) => {
    const skill = skillTreeNodes.find(s => s.id === skillId);
    if (!skill) return;

    setUserStats(prev => ({
      ...prev,
      unlockedSkills: [...prev.unlockedSkills, skillId],
      radarStats: {
        ...prev.radarStats,
        [skill.statBonus.stat]: prev.radarStats[skill.statBonus.stat] + skill.statBonus.amount
      }
    }));
  };

  const handleCertificateEarned = (certificate: EarnedCertificate) => {
    setUserStats(prev => {
      const existing = prev.earnedCertificates || [];
      const updated = existing.filter(c => c.examId !== certificate.examId);
      return {
        ...prev,
        earnedCertificates: [...updated, certificate]
      };
    });
    addXp(300);
  };

  const handleUpdateStudentName = (name: string) => {
    setUserStats(prev => ({
      ...prev,
      studentName: name
    }));
  };

  const handleClaimQuest = (questId: string) => {
    const quest = userStats.dailyQuests.find(q => q.id === questId);
    if (!quest || !quest.completed) return;

    addXp(quest.xpReward);
    setUserStats(prev => ({
      ...prev,
      gems: prev.gems + quest.gemReward,
      dailyQuests: prev.dailyQuests.filter(q => q.id !== questId)
    }));
  };

  const handleBugFixed = (bugId: string, xp: number) => {
    addXp(xp);
    setUserStats(prev => {
      const alreadyFixed = prev.completedBugChallenges?.includes(bugId);
      return {
        ...prev,
        gems: prev.gems + 10,
        completedBugChallenges: alreadyFixed
          ? prev.completedBugChallenges
          : [...(prev.completedBugChallenges || []), bugId]
      };
    });
  };

  const handleToggleMasteredFlashcard = (cardId: string) => {
    setUserStats(prev => {
      const current = prev.masteredFlashcardIds || [];
      const isMastered = current.includes(cardId);
      const updated = isMastered
        ? current.filter(id => id !== cardId)
        : [...current, cardId];
      if (!isMastered) addXp(25);
      return {
        ...prev,
        masteredFlashcardIds: updated
      };
    });
  };

  const handleJoinGuild = (guildId: string) => {
    playSound('pass');
    setUserStats(prev => ({
      ...prev,
      joinedGuildId: guildId
    }));
  };

  const handleApplyGeneratedQuest = (quest: any) => {
    if (!quest) return;
    const customLesson: LessonContent = {
      id: quest.id || 'custom-quest',
      trackId: 'track-python',
      courseId: 'course-custom',
      title: quest.title,
      slug: 'custom-quest',
      difficulty: quest.difficulty || 'Adept',
      tier: quest.tier || 'intermediate',
      language: quest.language || 'python',
      xpReward: quest.xpReward || 120,
      readTimeMinutes: 5,
      theoryMarkdown: `### ${quest.title}\n\n${quest.lore}\n\n${quest.instructions}`,
      instructions: [quest.instructions],
      starterCode: quest.starterCode || '// Write solution here\n',
      solutionCode: quest.solutionCode || '',
      testCases: quest.tests?.map((t: any, i: number) => ({
        id: `custom-t-${i}`,
        name: t.name || `Test ${i+1}`,
        expectedOutput: t.expected
      })) || [{ id: 'c-1', name: 'Custom Test', expectedOutput: 'OK' }],
      hints: quest.hints || []
    };

    handleSelectLesson(customLesson);
    setIsArchmageAiOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
      {/* 3-Zone Navigation Top Bar */}
      <Navbar
        userStats={userStats}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenCharacterSheet={() => setIsCharacterSheetOpen(true)}
        onOpenArchmageAI={() => setIsArchmageAiOpen(true)}
        onOpenDailyQuests={() => setIsDailyQuestsOpen(true)}
        onOpenJargonModal={() => setIsJargonModalOpen(true)}
      />

      {/* Main Viewport Router */}
      <main className="flex-1 flex overflow-hidden">
        {currentView === 'curriculum' && (
          <div className="flex-1 flex overflow-hidden min-w-0">
            {/* Sidebar Syllabus */}
            <Sidebar
              tracks={backendTracks}
              selectedLessonId={selectedLesson.id}
              completedLessons={userStats.completedLessons}
              onSelectLesson={handleSelectLesson}
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              onNavigateToCertifications={() => setCurrentView('certifications')}
            />

            {/* Main Lesson Content Wrapper */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
              {/* Sub-Header Toolbar with Syllabus Toggle & View Switcher */}
              <div className="h-10 border-b border-slate-800 bg-slate-900/90 px-3 flex items-center justify-between gap-2 shrink-0 text-xs z-10">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    title={isSidebarOpen ? "Hide syllabus sidebar" : "Show syllabus sidebar"}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                      isSidebarOpen
                        ? 'bg-slate-800 border-slate-700 text-slate-200'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                    }`}
                  >
                    <Menu className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{isSidebarOpen ? 'Hide Syllabus' : 'Syllabus'}</span>
                  </button>

                  <span className="text-slate-600 hidden sm:inline">|</span>

                  <span className="text-slate-300 font-semibold truncate max-w-[140px] sm:max-w-xs md:max-w-md">
                    {selectedLesson.title}
                  </span>
                </div>

                {/* View Mode Segmented Switcher (Especially helpful on phones & desktop mode) */}
                <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800 shrink-0">
                  <button
                    onClick={() => setLayoutMode('theory')}
                    title="Full-width Theory view"
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      layoutMode === 'theory'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="h-3 w-3" />
                    <span className="hidden sm:inline">Theory</span>
                  </button>

                  <button
                    onClick={() => setLayoutMode('editor')}
                    title="Full-width Code Editor view (Max screen space for coding & running)"
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      layoutMode === 'editor'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="h-3 w-3" />
                    <span>Code</span>
                  </button>

                  <button
                    onClick={() => setLayoutMode('both')}
                    title="Split view (Side-by-side)"
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      layoutMode === 'both'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Split className="h-3 w-3" />
                    <span className="hidden sm:inline">Split</span>
                  </button>
                </div>
              </div>

              {/* Main Lesson Split Area */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-w-0">
                {/* Left: Theory & Instructions */}
                {(layoutMode === 'both' || layoutMode === 'theory') && (
                  <div className={`${
                    layoutMode === 'theory' ? 'w-full' : 'w-full md:w-1/2'
                  } border-r border-slate-800 bg-slate-950 overflow-hidden flex flex-col min-w-0`}>
                    <TheoryViewer
                      lesson={selectedLesson}
                      isCompleted={userStats.completedLessons.includes(selectedLesson.id)}
                      revealedHints={revealedHints}
                      onShowHint={(idx) => setRevealedHints(prev => [...prev, idx])}
                      onOpenAIHint={() => setIsArchmageAiOpen(true)}
                    />
                  </div>
                )}

                {/* Right: Code Editor & Test Results Panel */}
                {(layoutMode === 'both' || layoutMode === 'editor') && (
                  <div className={`${
                    layoutMode === 'editor' ? 'w-full' : 'w-full md:w-1/2'
                  } flex flex-col overflow-hidden bg-slate-950 min-w-0`}>
                    <div className="flex-1 overflow-hidden min-w-0">
                      <CodeEditor
                        code={code}
                        onChange={(newCode) => setCode(newCode)}
                        onRun={handleRunCode}
                        onReset={() => setCode(selectedLesson.starterCode)}
                        isRunning={isRunning}
                        language={selectedLesson.language}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onAskAI={() => setIsArchmageAiOpen(true)}
                        onOpenStepper={() => setIsStepperOpen(true)}
                      />
                    </div>

                    {/* Bottom Test Results Console */}
                    <TestResultsPanel
                      results={testResults}
                      isRunning={isRunning}
                      onRun={handleRunCode}
                      onAskAIDiagnose={(err) => {
                        setAiDiagnoseMessage(err);
                        setIsArchmageAiOpen(true);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'sql-playground' && <SqlPlayground />}

        {currentView === 'terminal' && <TerminalEmulator />}

        {currentView === 'architecture' && <SystemDesignCanvas />}

        {currentView === 'certifications' && (
          <CertificationCenter
            userStats={userStats}
            onCertificateEarned={handleCertificateEarned}
            onUpdateStudentName={handleUpdateStudentName}
            onNavigateToTrack={(trackId) => {
              const track = backendTracks.find(t => t.id === trackId);
              if (track && track.courses[0]?.lessons[0]) {
                handleSelectLesson(track.courses[0].lessons[0]);
              }
            }}
          />
        )}

        {currentView === 'boss-raids' && (
          <BossRaidModal
            bossRaids={bossRaids}
            completedBosses={userStats.completedBosses}
            onBossDefeated={handleBossDefeated}
            onClose={() => setCurrentView('curriculum')}
          />
        )}

        {currentView === 'skill-tree' && (
          <SkillTreeView
            skills={skillTreeNodes}
            userLevel={userStats.level}
            unlockedSkillIds={userStats.unlockedSkills}
            onUnlockSkill={handleUnlockSkill}
          />
        )}

        {currentView === 'bug-bounty' && (
          <BugChallengesView
            completedBugIds={userStats.completedBugChallenges || []}
            onBugFixed={handleBugFixed}
            onBackToCurriculum={() => setCurrentView('curriculum')}
          />
        )}

        {currentView === 'flashcards' && (
          <FlashcardsView
            masteredCardIds={userStats.masteredFlashcardIds || []}
            onToggleMastered={handleToggleMasteredFlashcard}
          />
        )}

        {currentView === 'portfolio' && (
          <PortfolioProjectsView />
        )}

        {currentView === 'interview' && (
          <MockInterviewView />
        )}

        {currentView === 'guilds' && (
          <GuildsLeaderboardView
            currentGuildId={userStats.joinedGuildId}
            onJoinGuild={handleJoinGuild}
            userXp={userStats.currentXp}
            userStreak={userStats.streakDays}
            userName={userStats.studentName}
          />
        )}
      </main>

      {/* Gamification Modals */}
      {isCharacterSheetOpen && (
        <CharacterSheet
          userStats={userStats}
          onEquipItem={handleEquipItem}
          onClose={() => setIsCharacterSheetOpen(false)}
        />
      )}

      {isDailyQuestsOpen && (
        <DailyQuestsModal
          userStats={userStats}
          onClaimQuest={handleClaimQuest}
          onClose={() => setIsDailyQuestsOpen(false)}
        />
      )}

      {/* Archmage AI Mentor Drawer */}
      <ArchmageAiDrawer
        isOpen={isArchmageAiOpen}
        onClose={() => {
          setIsArchmageAiOpen(false);
          setAiDiagnoseMessage(null);
        }}
        currentLessonContext={{
          title: selectedLesson.title,
          language: selectedLesson.language,
          instructions: selectedLesson.instructions,
          currentCode: code
        }}
        initialDiagnoseError={aiDiagnoseMessage}
        lastTestResults={testResults}
        onClearDiagnoseError={() => setAiDiagnoseMessage(null)}
        onApplyGeneratedQuest={handleApplyGeneratedQuest}
      />

      {/* Visual Memory Stepper Modal */}
      {isStepperOpen && (
        <VisualCodeStepper
          code={code}
          language={selectedLesson.language}
          onClose={() => setIsStepperOpen(false)}
        />
      )}

      {/* Beginner Jargon Buster Dictionary Modal */}
      <JargonModal
        isOpen={isJargonModalOpen}
        onClose={() => setIsJargonModalOpen(false)}
      />
    </div>
  );
}
