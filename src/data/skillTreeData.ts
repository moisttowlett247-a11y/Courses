import { SkillNode } from '../types/curriculum';

export const skillTreeNodes: SkillNode[] = [
  {
    id: 'skill-py-core',
    title: 'Python Memory & Scopes',
    category: 'Languages',
    description: 'Understand pass-by-assignment, closures, and garbage collection mechanisms.',
    icon: 'Terminal',
    tier: 1,
    prerequisites: [],
    requiredLevel: 1,
    unlocked: true,
    statBonus: { stat: 'cleanCode', amount: 10 }
  },
  {
    id: 'skill-py-oop',
    title: 'Polymorphic Domain Modeling',
    category: 'Languages',
    description: 'Design extensible backend object hierarchies and dependency injection containers.',
    icon: 'Box',
    tier: 2,
    prerequisites: ['skill-py-core'],
    requiredLevel: 2,
    unlocked: false,
    statBonus: { stat: 'cleanCode', amount: 15 }
  },
  {
    id: 'skill-go-structs',
    title: 'Go Structs & Pointers',
    category: 'Languages',
    description: 'Master stack vs heap allocation, escape analysis, and pointer semantics.',
    icon: 'Cpu',
    tier: 1,
    prerequisites: [],
    requiredLevel: 1,
    unlocked: true,
    statBonus: { stat: 'concurrency', amount: 10 }
  },
  {
    id: 'skill-go-routines',
    title: 'Goroutines & Channels',
    category: 'Languages',
    description: 'Unlock multi-threaded asynchronous concurrency and channel multiplexing.',
    icon: 'Zap',
    tier: 2,
    prerequisites: ['skill-go-structs'],
    requiredLevel: 3,
    unlocked: false,
    statBonus: { stat: 'concurrency', amount: 25 }
  },
  {
    id: 'skill-sql-joins',
    title: 'Relational JOIN Mastery',
    category: 'Databases',
    description: 'Write optimal nested-loop, hash, and merge joins across millions of rows.',
    icon: 'Table',
    tier: 1,
    prerequisites: [],
    requiredLevel: 1,
    unlocked: true,
    statBonus: { stat: 'databases', amount: 15 }
  },
  {
    id: 'skill-sql-indexes',
    title: 'B-Tree & GiST Indexing',
    category: 'Databases',
    description: 'Eliminate sequential table scans with composite indexes and explain analyze.',
    icon: 'Key',
    tier: 2,
    prerequisites: ['skill-sql-joins'],
    requiredLevel: 3,
    unlocked: false,
    statBonus: { stat: 'databases', amount: 25 }
  },
  {
    id: 'skill-dsa-trees',
    title: 'Binary Trees & Graphs',
    category: 'Algorithms',
    description: 'Implement BFS, DFS, and Dijkstra shortest path routing algorithms.',
    icon: 'Network',
    tier: 2,
    prerequisites: [],
    requiredLevel: 2,
    unlocked: false,
    statBonus: { stat: 'algorithms', amount: 20 }
  },
  {
    id: 'skill-sys-lb',
    title: 'L7 Load Balancing & Reverse Proxies',
    category: 'Systems',
    description: 'Configure HAProxy, Nginx, and round-robin health-checking worker clusters.',
    icon: 'Layers',
    tier: 2,
    prerequisites: [],
    requiredLevel: 4,
    unlocked: false,
    statBonus: { stat: 'systems', amount: 25 }
  },
  {
    id: 'skill-sys-cache',
    title: 'Distributed Caching (Redis/Memcached)',
    category: 'Systems',
    description: 'Implement cache-aside, write-through, and cache-stampede mitigation strategies.',
    icon: 'HardDrive',
    tier: 3,
    prerequisites: ['skill-sys-lb'],
    requiredLevel: 5,
    unlocked: false,
    statBonus: { stat: 'systems', amount: 30 }
  }
];
