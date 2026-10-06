import { Guild } from '../types/curriculum';

export const initialGuilds: Guild[] = [
  {
    id: 'guild-python-pioneers',
    name: 'Python Pioneers Guild',
    tagline: 'Mastering clean code, OOP architecture, and readable backend design.',
    icon: 'Terminal',
    color: '#38BDF8',
    members: 1420,
    weeklyXp: 84200,
    perk: '+10% XP bonus on Python lessons'
  },
  {
    id: 'guild-gopher-engineers',
    name: 'The Concurrent Gophers',
    tagline: 'High-speed systems programming, goroutines, and zero-downtime microservices.',
    icon: 'Cpu',
    color: '#00ADD8',
    members: 1180,
    weeklyXp: 79500,
    perk: '+10% XP bonus on Go lessons'
  },
  {
    id: 'guild-sql-order',
    name: 'Order of Relational Scribes',
    tagline: 'Index optimizers, join champions, and relational database architects.',
    icon: 'Database',
    color: '#10B981',
    members: 950,
    weeklyXp: 62400,
    perk: '+10% XP bonus on SQL lessons'
  },
  {
    id: 'guild-distributed-archons',
    name: 'Distributed Systems Archons',
    tagline: 'Slashing latency, slaying monolith dragons, and scaling to 100k RPS.',
    icon: 'Layers',
    color: '#F59E0B',
    members: 890,
    weeklyXp: 58900,
    perk: '+15% Damage boost in Boss Raids'
  }
];

export const weeklyLeaderboard = [
  { rank: 1, name: 'Ada_Lovelace_99', guild: 'The Concurrent Gophers', xp: 4850, streak: 28, badge: 'Grandmaster' },
  { rank: 2, name: 'Linus_Torvalds', guild: 'Python Pioneers Guild', xp: 4420, streak: 35, badge: 'Archon' },
  { rank: 3, name: 'Grace_Hopper_V', guild: 'Order of Relational Scribes', xp: 3990, streak: 21, badge: 'Master' },
  { rank: 4, name: 'Dennis_R', guild: 'The Concurrent Gophers', xp: 3650, streak: 19, badge: 'Adept' },
  { rank: 5, name: 'Boots_The_Bear', guild: 'Distributed Systems Archons', xp: 3200, streak: 14, badge: 'Adept' }
];
