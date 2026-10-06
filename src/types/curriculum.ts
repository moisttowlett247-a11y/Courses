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

export interface UserStats {
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  streakDays: number;
  lastActiveDate: string;
  gems: number;
  completedLessons: string[];
  completedBosses: string[];
  unlockedSkills: string[];
  inventory: InventoryItem[];
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
