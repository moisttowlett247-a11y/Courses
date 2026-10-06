export type ProgrammingLanguage = 'python' | 'go' | 'sql' | 'bash' | 'docker' | 'system-design';

export type Difficulty = 'Novice' | 'Apprentice' | 'Adept' | 'Master' | 'Legendary';

export type TierLevel = 'beginner' | 'intermediate' | 'advanced';

export interface TestCase {
  id: string;
  name: string;
  inputDescription?: string;
  expectedOutput: string | number | boolean | object;
  hidden?: boolean;
}

export interface LineBreakdown {
  code: string;
  simpleMeaning: string;
}

export interface QuickCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  id: string;
  trackId: string;
  courseId: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  tier: TierLevel;
  language: ProgrammingLanguage;
  xpReward: number;
  readTimeMinutes: number;
  theoryMarkdown: string;
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  hints: string[];
  explanation?: string;
  interactiveType?: 'code' | 'sql' | 'terminal' | 'architecture';
  eli5Summary?: string;
  codeBreakdown?: LineBreakdown[];
  commonMistakes?: string[];
  quickCheckQuiz?: QuickCheck;
}

export interface Course {
  id: string;
  trackId: string;
  title: string;
  description: string;
  iconName: string;
  language: ProgrammingLanguage;
  level: Difficulty;
  tier: TierLevel;
  totalXp: number;
  estimatedHours: number;
  lessons: LessonContent[];
  bossId?: string;
}

export interface Track {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  tier: TierLevel;
  courses: Course[];
  certificationId?: string;
}

export interface BossPhase {
  phaseNumber: number;
  title: string;
  description: string;
  damagePercent: number;
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  hint: string;
  loreQuote: string;
}

export interface BossRaid {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  maxHp: number;
  imagePath: string;
  language: ProgrammingLanguage;
  xpReward: number;
  lootReward: {
    itemId: string;
    itemName: string;
    itemType: string;
    description: string;
    statBoost: string;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  };
  loreDescription: string;
  phases: BossPhase[];
}

export interface SkillNode {
  id: string;
  title: string;
  category: 'Languages' | 'Databases' | 'Systems' | 'DevOps' | 'Algorithms';
  description: string;
  icon: string;
  tier: number;
  prerequisites: string[];
  requiredLevel: number;
  unlocked: boolean;
  statBonus: {
    stat: 'concurrency' | 'algorithms' | 'systems' | 'databases' | 'cleanCode';
    amount: number;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'pet' | 'consumable';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  icon: string;
  description: string;
  statBonus: string;
  equipped: boolean;
  unlockedAt?: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  simpleExplanation: string;
}

export interface CertificationExam {
  id: string;
  title: string;
  subtitle: string;
  credentialTitle: string;
  badgeName: string;
  trackId: string;
  icon: string;
  passingScorePercent: number;
  skillsMeasured: string[];
  questions: ExamQuestion[];
  certificateDescription: string;
}

export interface EarnedCertificate {
  id: string;
  examId: string;
  credentialTitle: string;
  studentName: string;
  scorePercent: number;
  issuedDate: string;
  verificationCode: string;
  badgeName: string;
  honors: boolean;
}

// ==========================================
// NEW FEATURE TYPES (Bug Quests, Flashcards, Projects, Interviews, Guilds)
// ==========================================

export interface BugChallenge {
  id: string;
  title: string;
  language: ProgrammingLanguage;
  difficulty: Difficulty;
  bugType: 'Syntax Error' | 'Logic Bug' | 'Off-by-One' | 'Database Trap' | 'Concurrency Race';
  scenario: string;
  brokenCode: string;
  fixedSolution: string;
  bugHint: string;
  testCases: TestCase[];
  xpReward: number;
}

export interface Flashcard {
  id: string;
  category: 'Python' | 'SQL' | 'Go' | 'Architecture';
  frontQuestion: string;
  backAnswer: string;
  eli5Analogy: string;
  codeExample?: string;
  mastered?: boolean;
}

export interface PortfolioProjectFile {
  filename: string;
  code: string;
  language: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  tag: string;
  description: string;
  difficulty: Difficulty;
  techStack: string[];
  architectureOverview: string;
  learningOutcomes: string[];
  files: PortfolioProjectFile[];
  githubReadmeMarkdown: string;
}

export interface MockInterviewPrompt {
  id: string;
  roleTitle: string;
  companyVibe: string;
  question: string;
  interviewerPersona: string;
  expectedKeyPoints: string[];
  idealResponse: string;
  followUpQuestion: string;
}

export interface Guild {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  members: number;
  weeklyXp: number;
  perk: string;
}

export interface UserStats {
  studentName: string;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  streakDays: number;
  lastActiveDate: string;
  gems: number;
  completedLessons: string[];
  completedBosses: string[];
  completedBugChallenges: string[];
  masteredFlashcardIds: string[];
  joinedGuildId?: string;
  unlockedSkills: string[];
  inventory: InventoryItem[];
  earnedCertificates: EarnedCertificate[];
  equippedItems: {
    weapon?: string;
    armor?: string;
    accessory?: string;
    pet?: string;
  };
  radarStats: {
    concurrency: number;
    algorithms: number;
    systems: number;
    databases: number;
    cleanCode: number;
  };
  dailyQuests: {
    id: string;
    title: string;
    description: string;
    targetCount: number;
    currentCount: number;
    completed: boolean;
    xpReward: number;
    gemReward: number;
  }[];
}
