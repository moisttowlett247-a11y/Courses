import { BossRaid } from '../types/curriculum';

export const bossRaids: BossRaid[] = [
  {
    id: 'boss-monolith-dragon',
    name: 'The Monolith Dragon',
    title: 'Goliath of Legacy Tech Debt',
    subtitle: 'A 500,000-line spaghetti monster that refuses to scale',
    maxHp: 1000,
    imagePath: '/src/assets/images/boss_monolith_dragon_1791316731722.jpg',
    language: 'python',
    xpReward: 500,
    loreDescription: 'Deep within the ancient mainframe dungeons dwells the Monolith Dragon. It breathes unindexed table locks and spews synchronous blocking calls that freeze payment gateways across the realm.',
    lootReward: {
      itemId: 'sword-microservices',
      itemName: 'Blade of Event-Driven Decoupling',
      itemType: 'weapon',
      description: 'Forged in the fires of Kafka message brokers. Slices through tight coupling with O(1) latency.',
      statBoost: '+25 System Architecture',
      rarity: 'Legendary'
    },
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Slaying the Synchronous Bottleneck',
        description: 'The Dragon attacks with a synchronous blocking loop! Refactor the legacy payment dispatcher to process orders asynchronously using a batch queue.',
        damagePercent: 35,
        loreQuote: '"Mwahaha! Your users shall wait 45 seconds for checkout confirmation!" — The Monolith',
        starterCode: `# The Dragon's synchronous slow dispatcher
def process_dragon_orders(order_ids, payment_gateway):
    # Fix: Process orders and return a list of confirmation status dicts
    # Each item should have {'order_id': id, 'status': 'processed'}
    pass
`,
        solutionCode: `def process_dragon_orders(order_ids, payment_gateway):
    results = []
    for oid in order_ids:
        results.append({'order_id': oid, 'status': 'processed'})
    return results
`,
        testCases: [
          {
            id: 'boss-p1-t1',
            name: 'process_dragon_orders([101, 102], mock_gateway)',
            expectedOutput: [{"order_id": 101, "status": "processed"}, {"order_id": 102, "status": "processed"}]
          }
        ],
        hint: 'Loop through `order_ids` and build the list of dictionaries with status "processed".'
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Database Connection Shielding',
        description: 'The Dragon tries to exhaust all PostgreSQL connection pool slots! Implement a connection guard that limits max concurrent connections.',
        damagePercent: 35,
        loreQuote: '"FATAL: sorry, too many clients already! Your database is mine!"',
        starterCode: `class ConnectionPoolGuard:
    def __init__(self, max_connections):
        self.max_connections = max_connections
        self.active_count = 0

    def acquire(self):
        # TODO: If active_count < max_connections, increment and return True; else return False
        pass

    def release(self):
        # TODO: Decrement active_count safely (minimum 0)
        pass
`,
        solutionCode: `class ConnectionPoolGuard:
    def __init__(self, max_connections):
        self.max_connections = max_connections
        self.active_count = 0

    def acquire(self):
        if self.active_count < self.max_connections:
            self.active_count += 1
            return True
        return False

    def release(self):
        self.active_count = max(0, self.active_count - 1)
`,
        testCases: [
          {
            id: 'boss-p2-t1',
            name: 'ConnectionPoolGuard prevents socket exhaustion',
            expectedOutput: 'Connection pool guarded'
          }
        ],
        hint: 'In `acquire()`, check if `self.active_count < self.max_connections`. If so, increment and return True.'
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: The Circuit Breaker Finishing Move',
        description: 'Deliver the final blow by implementing a Circuit Breaker that fails fast when error rate exceeds threshold!',
        damagePercent: 30,
        loreQuote: '"IMPOSSIBLE! My monolithic cascading failures are being contained!"',
        starterCode: `def circuit_breaker_state(fail_count, threshold):
    # TODO: Return 'OPEN' (blocked) if fail_count >= threshold, else 'CLOSED' (normal traffic)
    pass
`,
        solutionCode: `def circuit_breaker_state(fail_count, threshold):
    return 'OPEN' if fail_count >= threshold else 'CLOSED'
`,
        testCases: [
          {
            id: 'boss-p3-t1',
            name: 'circuit_breaker_state(5, 3) == "OPEN"',
            expectedOutput: 'OPEN'
          },
          {
            id: 'boss-p3-t2',
            name: 'circuit_breaker_state(1, 3) == "CLOSED"',
            expectedOutput: 'CLOSED'
          }
        ],
        hint: 'Return string "OPEN" when `fail_count >= threshold`, otherwise return "CLOSED".'
      }
    ]
  },
  {
    id: 'boss-deadlock-demon',
    name: 'The Deadlock Demon',
    title: 'Archon of Thread Starvation',
    subtitle: 'Entities bound by circular mutex contention and abandoned channels',
    maxHp: 1200,
    imagePath: '/src/assets/images/boss_deadlock_demon_1791316742309.jpg',
    language: 'go',
    xpReward: 600,
    loreDescription: 'Born from unguarded shared memory and reckless goroutine allocations, the Deadlock Demon freezes production servers in eternal thread suspension.',
    lootReward: {
      itemId: 'amulet-goroutine',
      itemName: 'Amulet of Lock-Free Concurrency',
      itemType: 'accessory',
      description: 'Imbued with the spirit of CSP (Communicating Sequential Processes). Prevents race conditions.',
      statBoost: '+30 Go Concurrency',
      rarity: 'Legendary'
    },
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Breaking the Circular Mutex Chain',
        description: 'Two goroutines are stuck waiting for each other\'s lock! Write a Go function that orders lock IDs numerically to guarantee deterministic lock hierarchy.',
        damagePercent: 50,
        loreQuote: '"Lock A holds Lock B, and Lock B holds Lock A... freeze forever in oblivion!"',
        starterCode: `package main

// OrderLocks returns (firstLock, secondLock) sorted in ascending order
func OrderLocks(lockA, lockB int) (int, int) {
    // TODO: Return smaller integer first to avoid circular deadlock
    return 0, 0
}
`,
        solutionCode: `package main

func OrderLocks(lockA, lockB int) (int, int) {
    if lockA < lockB {
        return lockA, lockB
    }
    return lockB, lockA
}
`,
        testCases: [
          {
            id: 'boss-g-p1',
            name: 'OrderLocks(42, 10) returns (10, 42)',
            expectedOutput: 'Lock ordering deterministic'
          }
        ],
        hint: 'Compare `lockA < lockB` and return the smaller one first.'
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Banishing the Demon with Non-blocking Channels',
        description: 'Implement a non-blocking channel receiver using Go select statement to slay the demon with 0 latency!',
        damagePercent: 50,
        loreQuote: '"NOOO! The goroutines are communicating without sharing memory!"',
        starterCode: `package main

func SafeChannelReceive(ch chan string) string {
    // TODO: Read from channel without blocking
    return ""
}
`,
        solutionCode: `package main

func SafeChannelReceive(ch chan string) string {
    select {
    case msg := <-ch:
        return msg
    default:
        return "empty_queue"
    }
}
`,
        testCases: [
          {
            id: 'boss-g-p2',
            name: 'SafeChannelReceive executes non-blocking select',
            expectedOutput: 'Channel read safely'
          }
        ],
        hint: 'Use Go `select` with a `case msg := <-ch:` and a `default:` branch.'
      }
    ]
  }
];
