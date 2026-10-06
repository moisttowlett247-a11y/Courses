import { InventoryItem } from '../types/curriculum';

export const initialInventoryItems: InventoryItem[] = [
  {
    id: 'item-keeb-novice',
    name: 'Membrane Keyboard of The Intern',
    type: 'weapon',
    rarity: 'Common',
    icon: 'Keyboard',
    description: 'A modest beige keyboard with squishy rubber domes. Typing feels like pressing wet sponges.',
    statBonus: '+5 Clean Code',
    equipped: true,
    unlockedAt: 'Default Gear'
  },
  {
    id: 'item-robe-apprentice',
    name: 'Hoodie of Asynchronous Night Shifts',
    type: 'armor',
    rarity: 'Common',
    icon: 'Shield',
    description: 'Black cotton hoodie stained with espresso. Provides resistance against 3 AM production paging alerts.',
    statBonus: '+5 Systems',
    equipped: true,
    unlockedAt: 'Default Gear'
  },
  {
    id: 'item-pet-gopher',
    name: 'Gopher Familiar',
    type: 'pet',
    rarity: 'Rare',
    icon: 'Bot',
    description: 'A cheerful blue mascot that channels concurrent goroutines whenever your code compiles cleanly.',
    statBonus: '+15 Concurrency',
    equipped: false,
    unlockedAt: 'Go Track Unlock'
  },
  {
    id: 'item-keeb-mechanical-hhkb',
    name: 'Custom Lubed Topre Keyboard',
    type: 'weapon',
    rarity: 'Epic',
    icon: 'Keyboard',
    description: 'Every keystroke produces a deep "thock" sound, increasing typing speed and dopamine production by 40%.',
    statBonus: '+20 Algorithms, +15 Clean Code',
    equipped: false,
    unlockedAt: 'Reach Level 5'
  },
  {
    id: 'item-ring-o1',
    name: 'Signet Ring of O(1) Hash Collisions',
    type: 'accessory',
    rarity: 'Epic',
    icon: 'Sparkles',
    description: 'Enchanted by Donald Knuth himself. Guarantees constant time lookup in any unordered key-value store.',
    statBonus: '+25 Algorithms',
    equipped: false,
    unlockedAt: 'Complete DSA Track'
  }
];
