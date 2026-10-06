import { Track } from '../types/curriculum';

export const backendTracks: Track[] = [
  // ==========================================
  // 🟢 EASY / BEGINNER TIER (ABSOLUTELY ZERO PRIOR CODING KNOWLEDGE)
  // ==========================================
  {
    id: 'track-zero-to-one',
    title: 'Coding for Absolute Beginners',
    tagline: 'Start here if you have never seen or written a single line of code!',
    description: 'Learn to code using simple everyday analogies: cooking recipes, labeled jars, light switches, and kitchen blenders. Zero jargon!',
    icon: 'Sparkles',
    accentColor: '#10B981', // Emerald
    tier: 'beginner',
    courses: [
      {
        id: 'course-py-zero',
        trackId: 'track-zero-to-one',
        title: 'Level 0: What is Code?',
        description: 'Take your very first steps. No math skills or tech background needed.',
        iconName: 'BookOpen',
        language: 'python',
        level: 'Novice',
        tier: 'beginner',
        totalXp: 350,
        estimatedHours: 1,
        lessons: [
          {
            id: 'beg-00-what-is-code',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: '1. What is Code? (The Cooking Recipe)',
            slug: 'beginner-what-is-code',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 30,
            readTimeMinutes: 2,
            theoryMarkdown: `### What is Code? (Don't Panic!)

You do not need to be a math genius to code. 

**Code is just a cooking recipe for a computer.**

Think about baking cookies:
1. Turn on oven to 350°F.
2. Mix flour, sugar, and chocolate chips.
3. Bake for 12 minutes.

A computer does the exact same thing: it reads instructions **from top to bottom**, one line at a time!

#### Your First Mission:
Look at the code on the right. You don't need to change anything yet! Just click the glowing **"Run Code"** button (or press \`Ctrl+Enter\`) to run your first computer program!`,
            instructions: [
              "Look at the code on the right side of the screen.",
              "Click the glowing 'Run Code' button at the top right.",
              "Watch the computer follow your recipe and pass the test!"
            ],
            starterCode: `# This is your very first Python recipe!
# Lines starting with '#' are friendly notes for humans.
# The computer ignores them.

def start_adventure():
    # 'return' means "hand this finished answer back"
    return "I am now a programmer!"
`,
            solutionCode: `def start_adventure():
    return "I am now a programmer!"
`,
            testCases: [
              {
                id: 'beg-z1',
                name: 'start_adventure() hands back your success message',
                inputDescription: 'start_adventure()',
                expectedOutput: 'I am now a programmer!'
              }
            ],
            hints: [
              "You don't need to change any code for this first lesson!",
              "Just click the 'Run Code' button at the top right to claim your first XP!"
            ]
          },
          {
            id: 'beg-01-print',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: '2. Words & Text (Why Quotes Matter)',
            slug: 'beginner-words-quotes',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 35,
            readTimeMinutes: 3,
            theoryMarkdown: `### Teaching the Computer to Read Words

Computers are great with numbers, but when we want them to handle words (like names, messages, or dialogue), we must wrap the text in **quotes** \`"..."\`.

In coding, text inside quotes is called a **String** (because it's a string of characters tied together).

\`\`\`python
"Hello World!" # The computer treats this as readable text
\`\`\`

#### Why do we need quotes?
- If you write \`"cat"\` (with quotes), the computer knows you mean the animal word "cat".
- If you write \`cat\` (without quotes), the computer thinks you are trying to run a secret computer command named cat!`,
            instructions: [
              "Change the message in the code to say `\"Welcome to the Guild!\"` (make sure it's inside the quotes).",
              "Click 'Run Code' to test your answer."
            ],
            starterCode: `def guild_welcome():
    # Change "Change this text" to "Welcome to the Guild!"
    return "Change this text"
`,
            solutionCode: `def guild_welcome():
    return "Welcome to the Guild!"
`,
            testCases: [
              {
                id: 'beg-t1',
                name: 'guild_welcome() == "Welcome to the Guild!"',
                inputDescription: 'guild_welcome()',
                expectedOutput: 'Welcome to the Guild!'
              }
            ],
            hints: [
              "Keep the quotes! Your code should look like: `return \"Welcome to the Guild!\"`",
              "Make sure the spelling and punctuation match exactly."
            ]
          },
          {
            id: 'beg-02-variables',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: '3. Variables (Labeled Jars on a Shelf)',
            slug: 'beginner-variables-jars',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 40,
            readTimeMinutes: 3,
            theoryMarkdown: `### What is a Variable?

Imagine your kitchen counter has glass jars with sticky labels on them:
- Jar labeled **\`gold\`** $\to$ you put \`50\` inside it.
- Jar labeled **\`hero_name\`** $\to$ you put \`"Boots"\` inside it.

Whenever you want to know what's in the jar, you just use its name!

\`\`\`python
hero_name = "Boots"
gold = 50
\`\`\`

In Python, the \`=\` sign means **"put the value on the right into the jar on the left"**.`,
            instructions: [
              "Create a variable named `player_health` and set it equal to `100`.",
              "Return `player_health` at the end of the function."
            ],
            starterCode: `def get_starting_health():
    # TODO: Create a jar named player_health with 100 inside
    player_health = 100
    return player_health
`,
            solutionCode: `def get_starting_health():
    player_health = 100
    return player_health
`,
            testCases: [
              {
                id: 'beg-v1',
                name: 'get_starting_health() returns 100',
                inputDescription: 'get_starting_health()',
                expectedOutput: 100
              }
            ],
            hints: [
              "Write `player_health = 100`",
              "Then write `return player_health`"
            ]
          },
          {
            id: 'beg-03-math',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: '4. Everyday Math (+ and -)',
            slug: 'beginner-everyday-math',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 40,
            readTimeMinutes: 3,
            theoryMarkdown: `### Simple Math with Code

Coding math works just like a pocket calculator:
- \`+\` : Adds numbers together (\`10 + 5 = 15\`)
- \`-\` : Subtracts numbers (\`20 - 5 = 15\`)
- \`*\` : Multiplies numbers (\`4 * 5 = 20\`)

\`\`\`python
starting_gold = 50
quest_reward = 25
total_gold = starting_gold + quest_reward # 75
\`\`\``,
            instructions: [
              "Write a function `buy_health_potion(current_gold, potion_cost)`.",
              "Subtract `potion_cost` from `current_gold` and return the remaining gold."
            ],
            starterCode: `def buy_health_potion(current_gold, potion_cost):
    # TODO: Calculate remaining gold (current_gold minus potion_cost)
    pass
`,
            solutionCode: `def buy_health_potion(current_gold, potion_cost):
    return current_gold - potion_cost
`,
            testCases: [
              {
                id: 'beg-m1',
                name: 'buy_health_potion(50, 15) == 35',
                inputDescription: 'current_gold=50, potion_cost=15',
                expectedOutput: 35
              },
              {
                id: 'beg-m2',
                name: 'buy_health_potion(100, 40) == 60',
                inputDescription: 'current_gold=100, potion_cost=40',
                expectedOutput: 60
              }
            ],
            hints: [
              "Return `current_gold - potion_cost`"
            ]
          },
          {
            id: 'beg-04-conditions',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: '5. Making Decisions (If / Else)',
            slug: 'beginner-if-else-decisions',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 45,
            readTimeMinutes: 4,
            theoryMarkdown: `### Teaching the Computer to Choose

Think of how you make decisions in everyday life:
- **IF** the traffic light is green $\to$ drive forward.
- **ELSE** $\to$ stop your car.

In Python, we write this using \`if\` and \`else\`:

\`\`\`python
keys_in_pocket = 1

if keys_in_pocket > 0:
    return "Door Unlocked!"
else:
    return "Door Locked!"
\`\`\`

The \`>\` symbol means "greater than". If \`keys_in_pocket\` is 1, 1 is greater than 0, so the door unlocks!`,
            instructions: [
              "Write a function `check_player_status(health)`.",
              "IF `health > 0`, return `\"Player is Alive!\"`.",
              "ELSE, return `\"Player has Defeated!\"`."
            ],
            starterCode: `def check_player_status(health):
    # TODO: Check if health is greater than 0
    if health > 0:
        return "Player is Alive!"
    else:
        return "Player has Defeated!"
`,
            solutionCode: `def check_player_status(health):
    if health > 0:
        return "Player is Alive!"
    else:
        return "Player has Defeated!"
`,
            testCases: [
              {
                id: 'beg-c1',
                name: 'check_player_status(50) == "Player is Alive!"',
                inputDescription: 'health=50',
                expectedOutput: 'Player is Alive!'
              },
              {
                id: 'beg-c2',
                name: 'check_player_status(0) == "Player has Defeated!"',
                inputDescription: 'health=0',
                expectedOutput: 'Player has Defeated!'
              }
            ],
            hints: [
              "Use: `if health > 0:` and `else:`"
            ]
          },
          {
            id: 'beg-05-functions',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-zero',
            title: '6. Functions (The Magic Blender Button)',
            slug: 'beginner-functions-blender',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 50,
            readTimeMinutes: 4,
            theoryMarkdown: `### What is a Function?

Think of a kitchen blender.
1. You put strawberries inside (**Input / Parameter**).
2. You press the BLEND button (**The Function**).
3. Delicious strawberry smoothie pours out (**Output / Return**).

Instead of rebuilding the blender from scratch every morning, you just press the button!

\`\`\`python
# We define our recipe once:
def make_smoothie(fruit):
    return f"Fresh {fruit} Smoothie!"

# Now we can make as many as we want!
glass1 = make_smoothie("Mango")
glass2 = make_smoothie("Berry")
\`\`\``,
            instructions: [
              "Write a function named `cast_fireball(spell_power)`.",
              "It should return the text: `\"Casting Fireball with <spell_power> power!\"`.",
              "Example: `cast_fireball(50)` should return `\"Casting Fireball with 50 power!\"`."
            ],
            starterCode: `def cast_fireball(spell_power):
    # TODO: Combine the text and spell_power
    return f"Casting Fireball with {spell_power} power!"
`,
            solutionCode: `def cast_fireball(spell_power):
    return f"Casting Fireball with {spell_power} power!"
`,
            testCases: [
              {
                id: 'beg-f1',
                name: 'cast_fireball(50) returns formatted spell text',
                inputDescription: 'spell_power=50',
                expectedOutput: 'Casting Fireball with 50 power!'
              }
            ],
            hints: [
              "Use an f-string: `return f\"Casting Fireball with {spell_power} power!\"`"
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 🟡 MEDIUM / INTERMEDIATE TIER (BACKEND SYSTEMS & APPLICATION LOGIC)
  // ==========================================
  {
    id: 'track-python',
    title: 'Python Backend & OOP Architecture',
    tagline: 'Object-oriented patterns, data models, error middleware, and rate limiters',
    description: 'Bridge basic coding into real-world backend applications with clean classes and resilient error handling.',
    icon: 'Terminal',
    accentColor: '#38BDF8',
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
    title: 'SQL Relational Databases & Queries',
    tagline: 'Spreadsheets on steroids: connect tables and calculate metrics',
    description: 'Learn how to query, filter, join, and aggregate structured data.',
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

Relational databases split data across multiple tables. An **INNER JOIN** connects matching rows:

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
    description: 'The terminal is the command center for backend engineers. Learn pipes and grep.',
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
