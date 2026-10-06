import { BugChallenge } from '../types/curriculum';

export const bugChallenges: BugChallenge[] = [
  {
    id: 'bug-py-missing-colon',
    title: 'The Ghost of the Missing Colon',
    language: 'python',
    difficulty: 'Novice',
    bugType: 'Syntax Error',
    scenario: 'A junior engineer wrote a function to check if a player can open a treasure chest, but Python refuses to run it with a confusing SyntaxError!',
    brokenCode: `def can_open_chest(keys, has_lockpick)
    if keys > 0 or has_lockpick == True
        return "Chest Opened!"
    else:
        return "Locked Tight"
`,
    fixedSolution: `def can_open_chest(keys, has_lockpick):
    if keys > 0 or has_lockpick == True:
        return "Chest Opened!"
    else:
        return "Locked Tight"
`,
    bugHint: 'In Python, header lines like `def ...` and `if ...` MUST end with a colon `:`! Check lines 1 and 2.',
    testCases: [
      {
        id: 'bug-t1',
        name: 'can_open_chest(1, False) == "Chest Opened!"',
        expectedOutput: 'Chest Opened!'
      },
      {
        id: 'bug-t2',
        name: 'can_open_chest(0, False) == "Locked Tight"',
        expectedOutput: 'Locked Tight'
      }
    ],
    xpReward: 60
  },
  {
    id: 'bug-py-off-by-one',
    title: 'The Dungeon Vault Off-by-One Trap',
    language: 'python',
    difficulty: 'Apprentice',
    bugType: 'Off-by-One',
    scenario: 'The vault inventory system was supposed to calculate total gold for all 4 party members, but it accidentally skips the last adventurer!',
    brokenCode: `def sum_party_gold(gold_list):
    total = 0
    # Sum each member's gold in the inventory
    for i in range(len(gold_list) - 1):
        total += gold_list[i]
    return total
`,
    fixedSolution: `def sum_party_gold(gold_list):
    total = 0
    for i in range(len(gold_list)):
        total += gold_list[i]
    return total
`,
    bugHint: 'Look closely at the loop boundaries. Python lists are 0-indexed. Does the range calculation cover every index in gold_list, or does it stop one item early?',
    testCases: [
      {
        id: 'bug-t3',
        name: 'sum_party_gold([10, 20, 30, 40]) == 100',
        expectedOutput: 100
      }
    ],
    xpReward: 80
  },
  {
    id: 'bug-sql-missing-join-on',
    title: 'The Catastrophic Cross Join Catastrophe',
    language: 'sql',
    difficulty: 'Apprentice',
    bugType: 'Database Trap',
    scenario: 'A query to find which user bought which weapon exploded the server by returning 100,000 duplicated rows because someone forgot the ON clause!',
    brokenCode: `SELECT users.name, orders.product, orders.amount
FROM users
JOIN orders
WHERE orders.status = 'completed';
`,
    fixedSolution: `SELECT users.name, orders.product, orders.amount
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';
`,
    bugHint: 'When joining two relational tables, how does the SQL engine know which user corresponds to which order? Look up how to connect tables via an ON clause with foreign keys.',
    testCases: [
      {
        id: 'bug-t4',
        name: 'Query joins users and orders correctly using foreign key',
        expectedOutput: 'Valid relational result set'
      }
    ],
    xpReward: 90
  },
  {
    id: 'bug-go-channel-deadlock',
    title: 'The Unclosed Channel Deadlock',
    language: 'go',
    difficulty: 'Adept',
    bugType: 'Concurrency Race',
    scenario: 'A background worker pool is hanging indefinitely because the producer forgets to signal when jobs are finished!',
    brokenCode: `package main

func DistributeTasks(numbers []int) int {
    ch := make(chan int, len(numbers))
    for _, n := range numbers {
        ch <- n
    }

    total := 0
    for val := range ch {
        total += val
    }
    return total
}
`,
    fixedSolution: `package main

func DistributeTasks(numbers []int) int {
    ch := make(chan int, len(numbers))
    for _, n := range numbers {
        ch <- n
    }
    close(ch)

    total := 0
    for val := range ch {
        total += val
    }
    return total
}
`,
    bugHint: 'A "for val := range ch" loop will continuously block and wait for incoming messages forever unless the channel is explicitly closed. What Go function signals that sending is complete?',
    testCases: [
      {
        id: 'bug-t5',
        name: 'DistributeTasks([]int{1, 2, 3}) == 6',
        expectedOutput: 6
      }
    ],
    xpReward: 120
  }
];
