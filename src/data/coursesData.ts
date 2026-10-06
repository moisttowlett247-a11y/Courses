import { Track } from '../types/curriculum';

export const backendTracks: Track[] = [
  // ==========================================
  // 🟢 EASY / BEGINNER TIER (ZERO CODING KNOWLEDGE REQUIRED)
  // ==========================================
  {
    id: 'track-zero-to-one',
    title: 'Python for Absolute Beginners',
    tagline: 'Start here if you have never written a single line of code in your life!',
    description: 'Learn the core building blocks of programming from scratch using friendly analogies: variables, math, conditions, functions, and lists.',
    icon: 'Sparkles',
    accentColor: '#10B981', // Emerald
    tier: 'beginner',
    courses: [
      {
        id: 'course-py-zero',
        trackId: 'track-zero-to-one',
        title: 'Level 1: The First Steps of a Coder',
        description: 'No prior experience required. Learn how computers read instructions line by line.',
        iconName: 'BookOpen',
        language: 'python',
        level: 'Novice',
        tier: 'beginner',
        totalXp: 350,
        estimatedHours: 2,
        lessons: [
          {
            id: 'beg-01-print',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: 'Your First Spell: Printing Output',
            slug: 'beginner-print-output',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 30,
            readTimeMinutes: 3,
            theoryMarkdown: `### Welcome to Coding, Adventurer!

When you write code, you are simply giving a computer a list of step-by-step instructions.

In Python, the most basic command is \`print()\`. It displays text on your terminal screen.

\`\`\`python
print("Hello Adventurer!")
\`\`\`

#### How it works:
1. \`print\` is a built-in Python command (a **function**).
2. The parentheses \`()\` mean "run this command with the contents inside".
3. The quotes \`"..."\` tell Python this is raw text (known in programming as a **String**).`,
            instructions: [
              "Write a function named `say_hello()`.",
              "Inside the function, return the text string `\"Hello Adventurer!\"` exactly.",
              "Run your code and watch the test pass!"
            ],
            starterCode: `# Type your first Python code below:
def say_hello():
    # Return the text "Hello Adventurer!"
    return "Hello Adventurer!"
`,
            solutionCode: `def say_hello():
    return "Hello Adventurer!"
`,
            testCases: [
              {
                id: 'beg-t1',
                name: 'say_hello() == "Hello Adventurer!"',
                inputDescription: 'say_hello()',
                expectedOutput: 'Hello Adventurer!'
              }
            ],
            hints: [
              "Make sure you include double quotes around the text: `\"Hello Adventurer!\"`",
              "Spelling and punctuation matter! Ensure the exclamation mark is inside the quotes."
            ]
          },
          {
            id: 'beg-02-variables',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: 'Variables: Labeled Boxes in Memory',
            slug: 'beginner-variables-boxes',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 40,
            readTimeMinutes: 4,
            theoryMarkdown: `### What is a Variable?

Think of a **variable** as a cardboard storage box with a label on the front. You can put numbers, text, or values inside it, and reference it later by name!

\`\`\`python
player_name = "Kaelen"
gold_coins = 50
\`\`\`

Here, \`player_name\` holds a text string, while \`gold_coins\` holds an integer number.

#### Combining Strings & Numbers
You can combine (concatenate) text and variables easily:
\`\`\`python
health = 100
status = f"Player health is {health} HP"
\`\`\``,
            instructions: [
              "Write a function `create_character_status(hero_name, level)`.",
              "It should return a status string: `\"Hero: <hero_name> | Level: <level>\"`.",
              "Example: `create_character_status(\"Boots\", 5)` should return `\"Hero: Boots | Level: 5\"`."
            ],
            starterCode: `def create_character_status(hero_name, level):
    # TODO: Combine hero_name and level into the status string
    pass
`,
            solutionCode: `def create_character_status(hero_name, level):
    return f"Hero: {hero_name} | Level: {level}"
`,
            testCases: [
              {
                id: 'beg-t2',
                name: 'create_character_status("Boots", 5)',
                inputDescription: 'hero_name="Boots", level=5',
                expectedOutput: 'Hero: Boots | Level: 5'
              },
              {
                id: 'beg-t2-2',
                name: 'create_character_status("Kael", 10)',
                inputDescription: 'hero_name="Kael", level=10',
                expectedOutput: 'Hero: Kael | Level: 10'
              }
            ],
            hints: [
              "Use an f-string: `f\"Hero: {hero_name} | Level: {level}\"`",
              "Make sure the spacing matches `Hero: <name> | Level: <lvl>`."
            ]
          },
          {
            id: 'beg-03-math',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: 'Simple Math & Damage Calculation',
            slug: 'beginner-math-operators',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 40,
            readTimeMinutes: 3,
            theoryMarkdown: `### Coding Arithmetic

Computers are lightning-fast calculators. Python has built-in math operators:
- \`+\` : Addition (\`5 + 3 = 8\`)
- \`-\` : Subtraction (\`10 - 4 = 6\`)
- \`*\` : Multiplication (\`6 * 7 = 42\`)
- \`/\` : Division (\`10 / 2 = 5.0\`)

\`\`\`python
base_damage = 20
bonus = 5
total = base_damage + bonus # 25
\`\`\``,
            instructions: [
              "Write a function `calculate_loot_split(total_gold, number_of_party_members)`.",
              "It should return the integer division amount each member gets (e.g. `total_gold // number_of_party_members`).",
              "Example: `calculate_loot_split(100, 4)` should return `25`."
            ],
            starterCode: `def calculate_loot_split(total_gold, number_of_party_members):
    # TODO: Calculate how much gold each member receives
    pass
`,
            solutionCode: `def calculate_loot_split(total_gold, number_of_party_members):
    return int(total_gold / number_of_party_members)
`,
            testCases: [
              {
                id: 'beg-m1',
                name: 'calculate_loot_split(100, 4) == 25',
                inputDescription: 'total_gold=100, members=4',
                expectedOutput: 25
              },
              {
                id: 'beg-m2',
                name: 'calculate_loot_split(90, 3) == 30',
                inputDescription: 'total_gold=90, members=3',
                expectedOutput: 30
              }
            ],
            hints: [
              "Divide `total_gold` by `number_of_party_members` using `int(total_gold / number_of_party_members)` or `total_gold // number_of_party_members`."
            ]
          },
          {
            id: 'beg-04-conditions',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: 'Making Decisions: If / Else Logic',
            slug: 'beginner-if-else-conditions',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 50,
            readTimeMinutes: 5,
            theoryMarkdown: `### Teaching the Computer How to Choose

Programs become powerful when they can make decisions based on changing conditions using \`if\` and \`else\`.

\`\`\`python
player_hp = 0

if player_hp > 0:
    print("Player is alive and fighting!")
else:
    print("Player has fallen in battle!")
\`\`\`

#### Comparison Symbols:
- \`>\` : Greater than
- \`<\` : Less than
- \`==\` : Is equal to (double equals checks equality!)
- \`>=\` : Greater than or equal to`,
            instructions: [
              "Write a function `can_enter_dungeon(player_level, required_level)`.",
              "If `player_level` is greater than or equal to `required_level`, return `True`.",
              "Otherwise, return `False`."
            ],
            starterCode: `def can_enter_dungeon(player_level, required_level):
    # TODO: Compare levels and return True or False
    pass
`,
            solutionCode: `def can_enter_dungeon(player_level, required_level):
    if player_level >= required_level:
        return True
    else:
        return False
`,
            testCases: [
              {
                id: 'beg-c1',
                name: 'can_enter_dungeon(10, 5) == True',
                inputDescription: 'player_level=10, required_level=5',
                expectedOutput: true
              },
              {
                id: 'beg-c2',
                name: 'can_enter_dungeon(2, 5) == False',
                inputDescription: 'player_level=2, required_level=5',
                expectedOutput: false
              }
            ],
            hints: [
              "Use: `if player_level >= required_level: return True`",
              "Add: `else: return False`"
            ]
          },
          {
            id: 'beg-05-lists',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: 'Lists: Managing Your Adventurer Inventory',
            slug: 'beginner-lists-inventory',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 50,
            readTimeMinutes: 4,
            theoryMarkdown: `### Working with Collections of Items

Instead of creating separate variables for every single item, we store collections in a **List**.

\`\`\`python
inventory = ["Wooden Sword", "Health Potion", "Torch"]

# Adding an item:
inventory.append("Shield")

# Checking how many items we have:
count = len(inventory) # 4
\`\`\`

Lists keep items in ordered sequence, starting at index \`0\`!`,
            instructions: [
              "Write a function `add_item_to_bag(bag, new_item)`.",
              "Add `new_item` to the `bag` list using `.append()`.",
              "Return the updated `bag` list."
            ],
            starterCode: `def add_item_to_bag(bag, new_item):
    # TODO: Append new_item to bag and return bag
    pass
`,
            solutionCode: `def add_item_to_bag(bag, new_item):
    bag.append(new_item)
    return bag
`,
            testCases: [
              {
                id: 'beg-l1',
                name: 'add_item_to_bag(["Sword"], "Shield")',
                inputDescription: 'bag=["Sword"], new_item="Shield"',
                expectedOutput: ["Sword", "Shield"]
              }
            ],
            hints: [
              "Call `bag.append(new_item)` then `return bag`."
            ]
          }
        ]
      },
      {
        id: 'course-sql-zero',
        trackId: 'track-zero-to-one',
        title: 'Beginner SQL: Talking to Databases',
        description: 'Learn how to retrieve and filter data from spreadsheet-like database tables.',
        iconName: 'Database',
        language: 'sql',
        level: 'Novice',
        tier: 'beginner',
        totalXp: 200,
        estimatedHours: 2,
        lessons: [
          {
            id: 'beg-sql-01',
            trackId: 'track-zero-to-one',
            courseId: 'course-sql-zero',
            title: 'Your First Database Query: SELECT *',
            slug: 'beginner-sql-select',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'sql',
            xpReward: 50,
            readTimeMinutes: 3,
            interactiveType: 'sql',
            theoryMarkdown: `### What is a Database?

A database is like a super-fast spreadsheet stored on a server.
- Each spreadsheet is called a **Table** (e.g. \`users\`, \`orders\`).
- Each row represents a single person or item.
- Each column represents a piece of information (e.g. \`name\`, \`role\`, \`age\`).

To ask the database for information, we write **SQL (Structured Query Language)**:

\`\`\`sql
SELECT * FROM users;
\`\`\`

The \`*\` means "give me ALL columns".`,
            instructions: [
              "Write a query to retrieve all columns from the `users` table.",
              "Run the query and inspect the tabular output!"
            ],
            starterCode: `-- Write your first query below:
SELECT * FROM users;
`,
            solutionCode: `SELECT * FROM users;
`,
            testCases: [
              {
                id: 'bsql-t1',
                name: 'SELECT * FROM users returns all records',
                expectedOutput: 'Valid relational result set'
              }
            ],
            hints: [
              "Simply write `SELECT * FROM users;` and click 'Run Code'!"
            ]
          },
          {
            id: 'beg-sql-02',
            trackId: 'track-zero-to-one',
            courseId: 'course-sql-zero',
            title: 'Filtering Rows with WHERE',
            slug: 'beginner-sql-where',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'sql',
            xpReward: 60,
            readTimeMinutes: 4,
            interactiveType: 'sql',
            theoryMarkdown: `### Finding Specific Records

What if you only want to find users who are older than 30? We use the \`WHERE\` keyword:

\`\`\`sql
SELECT name, age, role
FROM users
WHERE age > 30;
\`\`\`

This filters out anyone 30 or younger, returning only matching rows.`,
            instructions: [
              "Write a SQL query that selects `name`, `role`, and `age` from `users`.",
              "Only include users where `age > 30`.",
              "Order by `age DESC` (oldest first)."
            ],
            starterCode: `-- Select users older than 30
SELECT name, role, age
FROM users
WHERE age > 30
ORDER BY age DESC;
`,
            solutionCode: `SELECT name, role, age
FROM users
WHERE age > 30
ORDER BY age DESC;
`,
            testCases: [
              {
                id: 'bsql-t2',
                name: 'Filter users where age > 30',
                expectedOutput: 'Valid relational result set'
              }
            ],
            hints: [
              "Make sure you include `WHERE age > 30` before `ORDER BY age DESC`."
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 🟡 MEDIUM / INTERMEDIATE TIER (BACKEND ARCHITECTURE)
  // ==========================================
  {
    id: 'track-python',
    title: 'Python Backend & OOP Architecture',
    tagline: 'Object-oriented patterns, data models, error middleware, and rate limiters',
    description: 'Bridge basic coding into real-world backend applications with clean classes and resilient error handling.',
    icon: 'Terminal',
    accentColor: '#38BDF8', // Cyan/Sky
    tier: 'intermediate',
    courses: [
      {
        id: 'course-py-fundamentals',
        trackId: 'track-python',
        title: 'Backend OOP & Defensive Architecture',
        description: 'Design classes, custom exceptions, and token bucket rate limiters.',
        iconName: 'Code2',
        language: 'python',
        level: 'Apprentice',
        tier: 'intermediate',
        totalXp: 450,
        estimatedHours: 4,
        lessons: [
          {
            id: 'py-01-vars',
            trackId: 'track-python',
            courseId: 'course-py-fundamentals',
            title: 'Server Banners & Payload Formatting',
            slug: 'python-variables-types',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'python',
            xpReward: 60,
            readTimeMinutes: 4,
            theoryMarkdown: `### Backend Payload Formatting

Backend microservices frequently serialize status health checks and formatted banners.

\`\`\`python
def format_server_banner(server_name, port, active_connections):
    cleaned_name = server_name.strip().upper()
    valid_connections = max(0, active_connections)
    return f"[SERVER: {cleaned_name}] Port: {port} | Active Load: {valid_connections} clients"
\`\`\``,
            instructions: [
              "Implement `format_server_banner(server_name, port, active_connections)`.",
              "Trim whitespace and uppercase `server_name`.",
              "Clamp negative connections to `0`.",
              "Return `\"[SERVER: <NAME>] Port: <PORT> | Active Load: <CONNECTIONS> clients\"`."
            ],
            starterCode: `def format_server_banner(server_name, port, active_connections):
    # TODO: Clean server_name, validate connections, and return banner string
    pass
`,
            solutionCode: `def format_server_banner(server_name, port, active_connections):
    cleaned_name = server_name.strip().upper()
    valid_connections = max(0, active_connections)
    return f"[SERVER: {cleaned_name}] Port: {port} | Active Load: {valid_connections} clients"
`,
            testCases: [
              {
                id: 'py-t1',
                name: 'format_server_banner(" auth-service ", 8080, 42)',
                expectedOutput: '[SERVER: AUTH-SERVICE] Port: 8080 | Active Load: 42 clients'
              }
            ],
            hints: ["Use `.strip().upper()` and `max(0, active_connections)`."]
          },
          {
            id: 'py-02-oop',
            trackId: 'track-python',
            courseId: 'course-py-fundamentals',
            title: 'Stateful Services: Building a Rate Limiter',
            slug: 'python-oop-rate-limiter',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'python',
            xpReward: 100,
            readTimeMinutes: 6,
            theoryMarkdown: `### Encapsulation & Stateful Objects

Backend systems encapsulate tracking state inside classes:

\`\`\`python
class RateLimiter:
    def __init__(self, max_requests):
        self.max_requests = max_requests
        self.client_requests = {}
\`\`\``,
            instructions: [
              "Create a `RateLimiter` class with `__init__(self, max_requests)`.",
              "`allow_request(self, client_ip)`: Returns `True` if under limit and increments counter; else `False`.",
              "`reset(self, client_ip)`: Resets that IP's count to 0."
            ],
            starterCode: `class RateLimiter:
    def __init__(self, max_requests):
        self.max_requests = max_requests
        self.client_requests = {}

    def allow_request(self, client_ip):
        # TODO: Implement request tracking
        pass

    def reset(self, client_ip):
        # TODO: Reset client counter
        pass
`,
            solutionCode: `class RateLimiter:
    def __init__(self, max_requests):
        self.max_requests = max_requests
        self.client_requests = {}

    def allow_request(self, client_ip):
        current = self.client_requests.get(client_ip, 0)
        if current < self.max_requests:
            self.client_requests[client_ip] = current + 1
            return True
        return False

    def reset(self, client_ip):
        if client_ip in self.client_requests:
            self.client_requests[client_ip] = 0
`,
            testCases: [
              {
                id: 'py-t3',
                name: 'RateLimiter tracks request counts',
                expectedOutput: 'RateLimiter verified'
              }
            ],
            hints: ["Use `self.client_requests.get(client_ip, 0)`."]
          }
        ]
      }
    ]
  },
  {
    id: 'track-sql',
    title: 'SQL Relational JOINs & Aggregations',
    tagline: 'Connect tables, multi-table queries, and calculate analytics metrics',
    description: 'Master relational schema modeling, foreign keys, INNER JOINs, and GROUP BY reports.',
    icon: 'Database',
    accentColor: '#10B981',
    tier: 'intermediate',
    courses: [
      {
        id: 'course-sql-mastery',
        trackId: 'track-sql',
        title: 'Relational Joins & Data Analysis',
        description: 'Query multiple related tables simultaneously in SQL.',
        iconName: 'Table',
        language: 'sql',
        level: 'Apprentice',
        tier: 'intermediate',
        totalXp: 300,
        estimatedHours: 3,
        lessons: [
          {
            id: 'sql-01-joins',
            trackId: 'track-sql',
            courseId: 'course-sql-mastery',
            title: 'INNER JOINs: Merging Users & Orders',
            slug: 'sql-inner-joins',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'sql',
            xpReward: 80,
            readTimeMinutes: 5,
            interactiveType: 'sql',
            theoryMarkdown: `### Connecting Normalized Tables

Relational databases split data across multiple tables. An **INNER JOIN** connects matching rows using primary and foreign keys:

\`\`\`sql
SELECT users.name, orders.product, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';
\`\`\``,
            instructions: [
              "Join `users` and `orders` on `users.id = orders.user_id`.",
              "Filter for `orders.status = 'completed'`.",
              "Order by `orders.amount DESC`."
            ],
            starterCode: `SELECT users.name, orders.product, orders.amount
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed'
ORDER BY orders.amount DESC;
`,
            solutionCode: `SELECT users.name, orders.product, orders.amount
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed'
ORDER BY orders.amount DESC;
`,
            testCases: [
              {
                id: 'sql-t1',
                name: 'INNER JOIN returns completed orders',
                expectedOutput: 'Valid relational result set'
              }
            ],
            hints: ["Use `JOIN orders ON users.id = orders.user_id`."]
          }
        ]
      }
    ]
  },
  {
    id: 'track-linux-git',
    title: 'Linux Shell & Terminal Pipelines',
    tagline: 'Master Unix command pipes, log filtering with grep, and process control',
    description: 'The terminal is the home of backend developers. Learn pipes, streams, and grep.',
    icon: 'TerminalSquare',
    accentColor: '#EC4899',
    tier: 'intermediate',
    courses: [
      {
        id: 'course-linux-shell',
        trackId: 'track-linux-git',
        title: 'Unix Pipelines & Process Inspection',
        description: 'Run commands in a virtual Linux terminal.',
        iconName: 'Terminal',
        language: 'bash',
        level: 'Apprentice',
        tier: 'intermediate',
        totalXp: 250,
        estimatedHours: 2,
        lessons: [
          {
            id: 'bash-01-pipes',
            trackId: 'track-linux-git',
            courseId: 'course-linux-shell',
            title: 'Unix Pipelines: Filtering Server Logs',
            slug: 'bash-pipelines-grep',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'bash',
            xpReward: 70,
            readTimeMinutes: 4,
            interactiveType: 'terminal',
            theoryMarkdown: `### The Unix Pipe (\`|\`)

Redirect the output of one command into another:
\`\`\`bash
cat server.log | grep ERROR | wc -l
\`\`\``,
            instructions: [
              "Count the number of errors in `server.log` using `cat server.log | grep ERROR | wc -l`."
            ],
            starterCode: `cat server.log | grep ERROR | wc -l
`,
            solutionCode: `cat server.log | grep ERROR | wc -l
`,
            testCases: [
              {
                id: 'bash-t1',
                name: 'Pipeline counts errors',
                expectedOutput: '3'
              }
            ],
            hints: ["Type `cat server.log | grep ERROR | wc -l`."]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 🔴 HARD / ADVANCED TIER (CONCURRENCY, DISTRIBUTED SYSTEMS, BOSSES)
  // ==========================================
  {
    id: 'track-golang',
    title: 'Go (Golang) Systems & Concurrency',
    tagline: 'Goroutines, channels, pointer receivers, worker pools, and memory optimization',
    description: 'Master statically typed Go systems programming and lock-free concurrency primitives.',
    icon: 'Cpu',
    accentColor: '#00ADD8',
    tier: 'advanced',
    courses: [
      {
        id: 'course-go-concurrency',
        trackId: 'track-golang',
        title: 'Concurrent Go Pipelines',
        description: 'Build high-speed worker pools and thread-safe data pipelines.',
        iconName: 'Zap',
        language: 'go',
        level: 'Adept',
        tier: 'advanced',
        totalXp: 600,
        estimatedHours: 5,
        bossId: 'boss-deadlock-demon',
        lessons: [
          {
            id: 'go-01-structs-methods',
            trackId: 'track-golang',
            courseId: 'course-go-concurrency',
            title: 'Pointer Receivers & Webhook Events',
            slug: 'go-structs-pointers',
            difficulty: 'Adept',
            tier: 'advanced',
            language: 'go',
            xpReward: 90,
            readTimeMinutes: 5,
            theoryMarkdown: `### Go Pointer Receivers

Pointer receivers modify the original struct in memory without expensive copies:

\`\`\`go
type WebhookEvent struct {
    ID        string
    Payload   string
    Retries   int
    Delivered bool
}

func (w *WebhookEvent) RecordAttempt(success bool) {
    w.Retries++
    if success {
        w.Delivered = true
    }
}
\`\`\``,
            instructions: [
              "Define `type WebhookEvent struct`.",
              "Add pointer receiver `func (w *WebhookEvent) RecordAttempt(success bool)`."
            ],
            starterCode: `package main

type WebhookEvent struct {
    ID        string
    Payload   string
    Retries   int
    Delivered bool
}

func (w *WebhookEvent) RecordAttempt(success bool) {
    // TODO: Increment retries, set Delivered if success is true
}
`,
            solutionCode: `package main

type WebhookEvent struct {
    ID        string
    Payload   string
    Retries   int
    Delivered bool
}

func (w *WebhookEvent) RecordAttempt(success bool) {
    w.Retries++
    if success {
        w.Delivered = true
    }
}
`,
            testCases: [
              {
                id: 'go-t1',
                name: 'WebhookEvent.RecordAttempt updates state',
                expectedOutput: 'Webhook state updated'
              }
            ],
            hints: ["Use `w.Retries++` and `if success { w.Delivered = true }`."]
          },
          {
            id: 'go-02-channels',
            trackId: 'track-golang',
            courseId: 'course-go-concurrency',
            title: 'Channels & Concurrent Worker Pools',
            slug: 'go-channels-worker-pools',
            difficulty: 'Master',
            tier: 'advanced',
            language: 'go',
            xpReward: 150,
            readTimeMinutes: 7,
            theoryMarkdown: `### CSP: Communicating Sequential Processes

Use channels and goroutines for thread-safe asynchronous task execution:

\`\`\`go
jobs := make(chan int, len(tasks))
// distribute across worker pool
\`\`\``,
            instructions: [
              "Write `func ProcessBatch(tasks []int, workerCount int) int`.",
              "Process tasks concurrently across `workerCount` goroutines and return total sum."
            ],
            starterCode: `package main

import "sync"

func ProcessBatch(tasks []int, workerCount int) int {
    // TODO: Implement worker pool with channels and WaitGroup
    return 0
}
`,
            solutionCode: `package main

import "sync"

func ProcessBatch(tasks []int, workerCount int) int {
    jobs := make(chan int, len(tasks))
    for _, t := range tasks {
        jobs <- t
    }
    close(jobs)

    var wg sync.WaitGroup
    var mu sync.Mutex
    totalSum := 0

    for i := 0; i < workerCount; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for task := range jobs {
                mu.Lock()
                totalSum += task
                mu.Unlock()
            }
        }()
    }

    wg.Wait()
    return totalSum
}
`,
            testCases: [
              {
                id: 'go-t2',
                name: 'ProcessBatch([]int{10, 20, 30, 40}, 2) == 100',
                expectedOutput: 100
              }
            ],
            hints: ["Use `sync.WaitGroup` and `sync.Mutex`."]
          }
        ]
      }
    ]
  },
  {
    id: 'track-dsa',
    title: 'Data Structures & Algorithms: O(1) LRU Cache',
    tagline: 'Hash maps, doubly linked lists, binary trees, and memory eviction algorithms',
    description: 'Learn how Redis and database engines structure data in memory for sub-millisecond retrieval.',
    icon: 'Network',
    accentColor: '#A855F7',
    tier: 'advanced',
    courses: [
      {
        id: 'course-dsa-backend',
        trackId: 'track-dsa',
        title: 'Cache Engineering & Big-O Analysis',
        description: 'Build an O(1) Least Recently Used (LRU) Cache from scratch.',
        iconName: 'Binary',
        language: 'python',
        level: 'Master',
        tier: 'advanced',
        totalXp: 500,
        estimatedHours: 4,
        lessons: [
          {
            id: 'dsa-01-lru',
            trackId: 'track-dsa',
            courseId: 'course-dsa-backend',
            title: 'Implementing an O(1) LRU Cache',
            slug: 'dsa-lru-cache',
            difficulty: 'Master',
            tier: 'advanced',
            language: 'python',
            xpReward: 160,
            readTimeMinutes: 8,
            theoryMarkdown: `### Redis Storage Internals

An **LRU Cache** evicts the least recently accessed item when memory capacity is full:
- Hash Map gives $O(1)$ lookups.
- Doubly linked order list tracks recency.`,
            instructions: [
              "Implement `LRUCache(capacity)` with `get(key)` and `put(key, value)`."
            ],
            starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.order = []

    def get(self, key: str) -> int:
        if key not in self.cache:
            return -1
        self.order.remove(key)
        self.order.append(key)
        return self.cache[key]

    def put(self, key: str, value: int) -> None:
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) >= self.capacity:
            oldest = self.order.pop(0)
            del self.cache[oldest]
        self.cache[key] = value
        self.order.append(key)
`,
            solutionCode: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.order = []

    def get(self, key: str) -> int:
        if key not in self.cache:
            return -1
        self.order.remove(key)
        self.order.append(key)
        return self.cache[key]

    def put(self, key: str, value: int) -> None:
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) >= self.capacity:
            oldest = self.order.pop(0)
            del self.cache[oldest]
        self.cache[key] = value
        self.order.append(key)
`,
            testCases: [
              {
                id: 'dsa-t1',
                name: 'LRU Cache operations maintain recency order',
                expectedOutput: 'LRU operations valid'
              }
            ],
            hints: ["Move keys to the end of `order` on access."]
          }
        ]
      }
    ]
  },
  {
    id: 'track-architecture',
    title: 'Distributed Systems & High Availability',
    tagline: 'Horizontal scaling, L7 load balancers, caching layers, and fault recovery',
    description: 'Design systems that handle tens of thousands of requests per second with zero downtime.',
    icon: 'Layers',
    accentColor: '#F59E0B',
    tier: 'advanced',
    courses: [
      {
        id: 'course-sysdesign',
        trackId: 'track-architecture',
        title: 'Distributed Architecture & Scaling',
        description: 'Interactive architecture designer and traffic load simulation.',
        iconName: 'Server',
        language: 'system-design',
        level: 'Legendary',
        tier: 'advanced',
        totalXp: 800,
        estimatedHours: 8,
        bossId: 'boss-monolith-dragon',
        lessons: [
          {
            id: 'arch-01-load-balancing',
            trackId: 'track-architecture',
            courseId: 'course-sysdesign',
            title: 'L7 Load Balancing & Horizontal Clusters',
            slug: 'arch-load-balancing',
            difficulty: 'Legendary',
            tier: 'advanced',
            language: 'system-design',
            xpReward: 200,
            readTimeMinutes: 7,
            interactiveType: 'architecture',
            theoryMarkdown: `### Horizontal Microservice Topology

Architect high-concurrency systems with HAProxy, stateless pods, Redis cache, and Postgres read replicas.`,
            instructions: [
              "Launch the Architecture Simulator.",
              "Connect: Client Fleet -> Load Balancer -> Web Replicas -> Redis -> PostgreSQL.",
              "Simulate 10,000 RPS load!"
            ],
            starterCode: `// Launch the interactive architecture simulator to test scaling
`,
            solutionCode: `// Architecture topology verified
`,
            testCases: [
              {
                id: 'arch-t1',
                name: 'Architecture scales under load with sub-50ms latency',
                expectedOutput: 'Architecture validated'
              }
            ],
            hints: ["Enable Redis caching to offload 90% of reads from the database."]
          }
        ]
      }
    ]
  }
];
