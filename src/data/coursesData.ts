import { Track } from '../types/curriculum';

export const backendTracks: Track[] = [
  {
    id: 'track-python',
    title: 'Python Backend Mastery',
    tagline: 'Master object-oriented architecture, data pipelines & backend server fundamentals',
    description: 'Learn production-grade Python from core memory model and clean OOP to functional programming and API error patterns.',
    icon: 'Terminal',
    accentColor: '#38BDF8', // Cyan/Sky
    courses: [
      {
        id: 'course-py-fundamentals',
        trackId: 'track-python',
        title: 'Python Backend Foundations',
        description: 'Deep dive into data types, memory references, control structures, and testing assertions.',
        iconName: 'Code2',
        language: 'python',
        level: 'Novice',
        totalXp: 450,
        estimatedHours: 4,
        lessons: [
          {
            id: 'py-01-vars',
            trackId: 'track-python',
            courseId: 'course-py-fundamentals',
            title: 'Variables, Type Coercion & Payload Parsing',
            slug: 'python-variables-types',
            difficulty: 'Novice',
            language: 'python',
            xpReward: 50,
            readTimeMinutes: 4,
            theoryMarkdown: `### Backend Payload Parsing & Memory Allocation

In backend services, raw incoming network requests (JSON or urlencoded form data) arrive as plain strings or byte arrays. As a backend engineer, your first duty is parsing, validating, and casting these inputs into strictly typed domain models.

\`\`\`python
# Backend type casting & validation pattern
def parse_user_port(raw_port: str) -> int:
    port = int(raw_port)
    if not (1 <= port <= 65535):
        raise ValueError("Invalid TCP port number")
    return port
\`\`\`

#### Immutability & Reference Semantics
Python variables are references to objects in memory. Primitive values like integers, floats, and strings are **immutable**, whereas lists, dicts, and custom class instances are **mutable**.`,
            instructions: [
              "Implement the function `format_server_banner(server_name, port, active_connections)`.",
              "The server name should be trimmed of whitespace and capitalized.",
              "Return a formatted string in the format: `[SERVER: <NAME>] Port: <PORT> | Active Load: <CONNECTIONS> clients`.",
              "If `active_connections` is negative, clamp it to `0`."
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
                inputDescription: 'server_name=" auth-service ", port=8080, active_connections=42',
                expectedOutput: '[SERVER: AUTH-SERVICE] Port: 8080 | Active Load: 42 clients'
              },
              {
                id: 'py-t2',
                name: 'format_server_banner("db_replica", 5432, -5)',
                inputDescription: 'server_name="db_replica", port=5432, active_connections=-5 (negative clamp)',
                expectedOutput: '[SERVER: DB_REPLICA] Port: 5432 | Active Load: 0 clients'
              }
            ],
            hints: [
              "Use `.strip()` to remove leading/trailing whitespace and `.upper()` for uppercase.",
              "Use `max(0, active_connections)` to ensure negative numbers become 0.",
              "Use Python f-strings: `f\"[SERVER: {cleaned_name}] Port: {port} | Active Load: {valid_connections} clients\"`"
            ]
          },
          {
            id: 'py-02-oop',
            trackId: 'track-python',
            courseId: 'course-py-fundamentals',
            title: 'Object-Oriented Backend Architecture: RateLimiter',
            slug: 'python-oop-rate-limiter',
            difficulty: 'Apprentice',
            language: 'python',
            xpReward: 100,
            readTimeMinutes: 6,
            theoryMarkdown: `### Encapsulation: Designing Stateful Services

Backend architectures rely heavily on clean object-oriented abstractions to encapsulate state and enforce invariants (e.g. rate limiters, token bucket algorithms, connection pools).

\`\`\`python
class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate
\`\`\`

A rate limiter protects upstream microservices from brute-force DDoS attacks by tracking request counts within rolling time windows.`,
            instructions: [
              "Create a `RateLimiter` class.",
              "In `__init__(self, max_requests)`: store `max_requests` and initialize an internal dictionary `self.client_requests = {}`.",
              "Implement `allow_request(self, client_ip)`: If the IP is not in the dictionary, set count to 1 and return `True`.",
              "If the count is strictly less than `max_requests`, increment the count and return `True`.",
              "Otherwise, return `False` (rate limited!).",
              "Implement `reset(self, client_ip)`: Reset the request count for that IP to 0."
            ],
            starterCode: `class RateLimiter:
    def __init__(self, max_requests):
        # TODO: Initialize state
        pass

    def allow_request(self, client_ip):
        # TODO: Check and update request counter
        pass

    def reset(self, client_ip):
        # TODO: Clear requests for specific client
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
                name: 'RateLimiter(2) allowing 2 requests then blocking',
                expectedOutput: 'RateLimiter verified'
              }
            ],
            hints: [
              "Use `.get(client_ip, 0)` to default unseen IP addresses to 0 requests.",
              "Return boolean `True` when permitted and `False` when blocked."
            ]
          },
          {
            id: 'py-03-exceptions',
            trackId: 'track-python',
            courseId: 'course-py-fundamentals',
            title: 'Custom Exception Hierarchies & Safe Middleware',
            slug: 'python-custom-exceptions',
            difficulty: 'Apprentice',
            language: 'python',
            xpReward: 80,
            readTimeMinutes: 5,
            theoryMarkdown: `### Enterprise Error Handling

Never allow raw unhandled database or network exceptions to leak to client frontends. Production backends map low-level failures to structured HTTP error contracts.

\`\`\`python
class ApiError(Exception):
    status_code = 500
    
class NotFoundError(ApiError):
    status_code = 404
\`\`\``,
            instructions: [
              "Write a function `safe_json_decode(payload_str)` that parses a comma-separated key=val string into a Python dict.",
              "Example payload: `'id=42,role=admin,status=active'` should return `{'id': '42', 'role': 'admin', 'status': 'active'}`.",
              "If the payload is empty or invalid, catch the error and return an empty dictionary `{}` instead of crashing."
            ],
            starterCode: `def safe_json_decode(payload_str):
    # TODO: Parse string into dictionary safely
    pass
`,
            solutionCode: `def safe_json_decode(payload_str):
    if not payload_str or not isinstance(payload_str, str):
        return {}
    result = {}
    try:
        parts = payload_str.split(',')
        for part in parts:
            if '=' in part:
                k, v = part.split('=', 1)
                result[k.strip()] = v.strip()
    except Exception:
        return {}
    return result
`,
            testCases: [
              {
                id: 'py-t4',
                name: 'safe_json_decode("id=101, user=linus, auth=true")',
                expectedOutput: {"id": "101", "user": "linus", "auth": "true"}
              }
            ],
            hints: [
              "Split the string by `,` then split each pair by `=`.",
              "Wrap in a `try...except` block to ensure resilience."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'track-golang',
    title: 'Go (Golang) Systems & Concurrency',
    tagline: 'Master high-throughput backend services, goroutines, channels, and pointers',
    description: 'Go powers modern cloud infrastructure (Docker, Kubernetes, Terraform). Master its statically typed speed and concurrent primitives.',
    icon: 'Cpu',
    accentColor: '#00ADD8', // Go Blue
    courses: [
      {
        id: 'course-go-concurrency',
        trackId: 'track-golang',
        title: 'Goroutines, Channels & Worker Pools',
        description: 'Build lock-free concurrent pipelines and high-speed background job processors in Go.',
        iconName: 'Zap',
        language: 'go',
        level: 'Adept',
        totalXp: 600,
        estimatedHours: 5,
        bossId: 'boss-deadlock-demon',
        lessons: [
          {
            id: 'go-01-structs-methods',
            trackId: 'track-golang',
            courseId: 'course-go-concurrency',
            title: 'Structs, Pointer Receivers & Memory Footprint',
            slug: 'go-structs-pointers',
            difficulty: 'Apprentice',
            language: 'go',
            xpReward: 90,
            readTimeMinutes: 5,
            theoryMarkdown: `### Go Structs & Value vs Pointer Semantics

In Go, there are no classes or inheritance. Instead, we compose **structs** and attach **methods**. Understanding when to use value receivers vs pointer receivers is critical for backend memory efficiency:

\`\`\`go
type ServerConfig struct {
    Host string
    Port int
    TLS  bool
}

// Pointer receiver modifies original struct without memory copies
func (s *ServerConfig) EnableTLS() {
    s.TLS = true
}
\`\`\`

- **Value Receiver \`(s ServerConfig)\`**: Passes a full copy. Safe from race conditions, but allocates extra memory on large structs.
- **Pointer Receiver \`(s *ServerConfig)\`**: Mutates the original instance in-place. High performance, zero allocations!`,
            instructions: [
              "Define a struct `type WebhookEvent struct` with fields: `ID string`, `Payload string`, `Retries int`, and `Delivered bool`.",
              "Add a pointer receiver method `func (w *WebhookEvent) RecordAttempt(success bool)`.",
              "If `success` is `true`, set `Delivered` to `true`.",
              "Always increment `Retries` by 1 on every invocation."
            ],
            starterCode: `package main

import "fmt"

type WebhookEvent struct {
    // TODO: Define fields ID, Payload, Retries, Delivered
}

func (w *WebhookEvent) RecordAttempt(success bool) {
    // TODO: Implement pointer receiver logic
}
`,
            solutionCode: `package main

import "fmt"

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
                name: 'WebhookEvent.RecordAttempt(false) increments retries',
                expectedOutput: 'Webhook state updated'
              }
            ],
            hints: [
              "Remember Go capitalizes exported struct fields (e.g. `ID`, `Retries`, `Delivered`).",
              "Use `w.Retries++` to increment."
            ]
          },
          {
            id: 'go-02-channels',
            trackId: 'track-golang',
            courseId: 'course-go-concurrency',
            title: 'Channels, Goroutines & Buffered Worker Pipelines',
            slug: 'go-channels-worker-pools',
            difficulty: 'Adept',
            language: 'go',
            xpReward: 140,
            readTimeMinutes: 7,
            theoryMarkdown: `### "Do not communicate by sharing memory; instead, share memory by communicating."

Go channels are typed conduits through which you can send and receive values with the channel operator \`<-\`.

\`\`\`go
// Buffered channel with capacity of 100 jobs
jobs := make(chan int, 100)

// Spawn background worker
go func() {
    for job := range jobs {
        process(job)
    }
}()
\`\`\`

Channels guarantee thread-safe synchronizations without manual mutex lock/unlock contention.`,
            instructions: [
              "Write a function `func ProcessBatch(tasks []int, workerCount int) int`.",
              "Create a channel `jobs := make(chan int, len(tasks))`.",
              "Send all tasks into the channel and close it.",
              "Sum up all numbers concurrently and return the total sum."
            ],
            starterCode: `package main

import "sync"

func ProcessBatch(tasks []int, workerCount int) int {
    // TODO: Implement concurrent worker pool with channels and sync.WaitGroup
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
            hints: [
              "Use `sync.WaitGroup` to wait for all goroutines to finish.",
              "Close the channel after sending tasks so workers exit the `range jobs` loop."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'track-dsa',
    title: 'Data Structures & Algorithms',
    tagline: 'Master Big-O analysis, Hash Maps, Binary Search Trees, Graphs & Caches',
    description: 'Learn the data structures that power database storage engines, in-memory caches, and distributed routing graphs.',
    icon: 'Network',
    accentColor: '#A855F7', // Purple
    courses: [
      {
        id: 'course-dsa-backend',
        trackId: 'track-dsa',
        title: 'Backend DSA: Trees, Queues & Caching',
        description: 'Implement LRU Caches, Priority Queues, and B-Tree indexing algorithms from first principles.',
        iconName: 'Binary',
        language: 'python',
        level: 'Adept',
        totalXp: 750,
        estimatedHours: 6,
        lessons: [
          {
            id: 'dsa-01-lru',
            trackId: 'track-dsa',
            courseId: 'course-dsa-backend',
            title: 'Building an O(1) LRU Cache (Least Recently Used)',
            slug: 'dsa-lru-cache',
            difficulty: 'Adept',
            language: 'python',
            xpReward: 160,
            readTimeMinutes: 8,
            theoryMarkdown: `### The Storage Architecture of Redis & Memcached

An **LRU (Least Recently Used) Cache** is a foundational data structure in backend engineering. When cache memory reaches capacity, the least recently accessed item is evicted.

#### How to achieve O(1) Get & O(1) Put:
1. **Hash Map**: Provides $O(1)$ key lookup to find the node.
2. **Doubly Linked List**: Allows $O(1)$ node removal and head insertion when an item is accessed!

\`\`\`
[Head: Most Recent] <-> [Node A] <-> [Node B] <-> [Tail: Oldest / Evict First]
\`\`\``,
            instructions: [
              "Implement an `LRUCache` class with capacity `cap`.",
              "`get(key)`: Return value if key exists and move to most recently used; return `-1` if absent.",
              "`put(key, value)`: Insert/update key-value pair. If capacity is exceeded, evict the oldest item."
            ],
            starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        # TODO: Initialize hash map and list tracking

    def get(self, key: str) -> int:
        # TODO: Return value & update recency
        pass

    def put(self, key: str, value: int) -> None:
        # TODO: Insert, update, and evict if full
        pass
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
                name: 'LRU put(a, 1), put(b, 2), get(a), put(c, 3) evicts b',
                expectedOutput: 'LRU operations valid'
              }
            ],
            hints: [
              "When an item is accessed via `get` or updated via `put`, move its key to the end of the order list.",
              "If cache length exceeds capacity, remove index 0 from order and delete from dictionary."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'track-sql',
    title: 'SQL & Database Engineering',
    tagline: 'Master Relational Schemas, Complex JOINs, Aggregations & Query Plans',
    description: 'Databases are the heart of every backend application. Learn PostgreSQL querying, B-tree indexes, transactions, and N+1 query optimization.',
    icon: 'Database',
    accentColor: '#10B981', // Emerald
    courses: [
      {
        id: 'course-sql-mastery',
        trackId: 'track-sql',
        title: 'Relational Database Queries & Schema Modeling',
        description: 'Execute live SQL queries on real relational datasets with join optimizations.',
        iconName: 'Table',
        language: 'sql',
        level: 'Novice',
        totalXp: 500,
        estimatedHours: 4,
        lessons: [
          {
            id: 'sql-01-joins',
            trackId: 'track-sql',
            courseId: 'course-sql-mastery',
            title: 'INNER JOINs & User Order Summaries',
            slug: 'sql-inner-joins',
            difficulty: 'Novice',
            language: 'sql',
            xpReward: 80,
            readTimeMinutes: 5,
            interactiveType: 'sql',
            theoryMarkdown: `### Relational Joins & Foreign Keys

In relational databases (PostgreSQL, SQLite, MySQL), normalization splits data into multiple tables to eliminate redundancy. Foreign keys link related rows.

\`\`\`sql
SELECT users.name, orders.product, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';
\`\`\`

The query engine executes an index scan or hash join to merge matching rows from both tables efficiently.`,
            instructions: [
              "Write a SQL query that selects `user_name`, `product`, and `amount`.",
              "Join the `users` table with the `orders` table using `users.id = orders.user_id`.",
              "Filter only orders where `status = 'completed'`.",
              "Order the results by `amount DESC`."
            ],
            starterCode: `-- Write your SQL query below
SELECT 
FROM users
JOIN orders ON 
WHERE 
ORDER BY 
`,
            solutionCode: `SELECT users.name AS user_name, orders.product, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed'
ORDER BY orders.amount DESC;
`,
            testCases: [
              {
                id: 'sql-t1',
                name: 'Query returns completed orders joined with user names',
                expectedOutput: 'Valid relational result set'
              }
            ],
            hints: [
              "Use `INNER JOIN orders ON users.id = orders.user_id`.",
              "Add `WHERE orders.status = 'completed'` and `ORDER BY amount DESC`."
            ]
          },
          {
            id: 'sql-02-groupby',
            trackId: 'track-sql',
            courseId: 'course-sql-mastery',
            title: 'GROUP BY, Aggregations & Metrics Reporting',
            slug: 'sql-aggregations',
            difficulty: 'Apprentice',
            language: 'sql',
            xpReward: 100,
            readTimeMinutes: 6,
            interactiveType: 'sql',
            theoryMarkdown: `### Aggregations & Data Warehousing

Backend reporting endpoints rely on SQL aggregation functions:
- \`COUNT(*)\`: Row count
- \`SUM(col)\`: Sum total
- \`AVG(col)\`: Average value

\`\`\`sql
SELECT role, COUNT(*) as headcount, AVG(age) as average_age
FROM users
GROUP BY role
ORDER BY headcount DESC;
\`\`\``,
            instructions: [
              "Write a SQL query to calculate user counts and average age grouped by `role`.",
              "Select `role`, `COUNT(*)` as `count`, and `AVG(age)` as `avg_age`.",
              "Group the results by `role`."
            ],
            starterCode: `-- Group users by role and compute statistics
SELECT role, COUNT(*) AS count, AVG(age) AS avg_age
FROM users
GROUP BY role;
`,
            solutionCode: `SELECT role, COUNT(*) AS count, AVG(age) AS avg_age
FROM users
GROUP BY role;
`,
            testCases: [
              {
                id: 'sql-t2',
                name: 'GROUP BY role yields accurate counts & avg_age',
                expectedOutput: 'Valid relational result set'
              }
            ],
            hints: [
              "Use `GROUP BY role` at the end of your query.",
              "Alias your aggregate columns with `AS count` and `AS avg_age`."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'track-architecture',
    title: 'Distributed Systems & Architecture',
    tagline: 'Design fault-tolerant backend architectures, load balancers, caching, and queues',
    description: 'Learn how massive backend systems scale to millions of concurrent users with zero downtime.',
    icon: 'Layers',
    accentColor: '#F59E0B', // Amber
    courses: [
      {
        id: 'course-sysdesign',
        trackId: 'track-architecture',
        title: 'System Design & High Availability',
        description: 'Interactive visual architecture design, traffic simulation, and disaster recovery.',
        iconName: 'Server',
        language: 'system-design',
        level: 'Master',
        totalXp: 800,
        estimatedHours: 8,
        bossId: 'boss-monolith-dragon',
        lessons: [
          {
            id: 'arch-01-load-balancing',
            trackId: 'track-architecture',
            courseId: 'course-sysdesign',
            title: 'Load Balancers & Horizontal Scaling Topologies',
            slug: 'arch-load-balancing',
            difficulty: 'Master',
            language: 'system-design',
            xpReward: 200,
            readTimeMinutes: 7,
            interactiveType: 'architecture',
            theoryMarkdown: `### Horizontal Scaling vs Vertical Scaling

When traffic surges, a single backend server quickly saturates CPU, memory, and file descriptor limits.

#### The Distributed Tier:
1. **DNS / Anycast CDN**: Routes user requests to closest edge point of presence.
2. **L4/L7 Load Balancers (HAProxy, Nginx, ALB)**: Distributes inbound HTTP connections across stateless worker pods using algorithms like **Round Robin**, **Least Connections**, or **IP Hash**.
3. **Stateless Web App Tier**: Replicas can be scaled from 2 to 500 pods dynamically.
4. **Caching Layer (Redis/Memcached)**: Offloads $95\%$ of read traffic from the database.
5. **Database Cluster**: Master (Writes) + Read Replicas with asynchronous replication.`,
            instructions: [
              "Use the interactive Architecture Sandbox to build a high-availability cluster.",
              "Connect: `Client Traffic` -> `Load Balancer` -> `Web App Pods (x3)` -> `Redis Cache` -> `Postgres Primary`.",
              "Simulate 10,000 RPS traffic and verify average latency remains under 25ms!"
            ],
            starterCode: `// Interactive visual architecture designer active
// Drag nodes onto the canvas and connect data conduits
`,
            solutionCode: `// Architecture topology verified: L7 LB -> 3 App Nodes -> Redis Read Cache -> Postgres Cluster
`,
            testCases: [
              {
                id: 'arch-t1',
                name: 'Topology meets high availability & sub-50ms latency standards',
                expectedOutput: 'Architecture validated'
              }
            ],
            hints: [
              "Place a Redis Cache between your web servers and PostgreSQL database to avoid query bottlenecks.",
              "Ensure at least 2 web server instances exist behind the load balancer for redundancy."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'track-linux-git',
    title: 'Linux Shell, Bash & Git Mastery',
    tagline: 'Master piping, grep, awk, file descriptors, process management, and Git rebasing',
    description: 'Backend engineers live in the terminal. Master the Unix philosophy and shell pipelines.',
    icon: 'TerminalSquare',
    accentColor: '#EC4899', // Pink
    courses: [
      {
        id: 'course-linux-shell',
        trackId: 'track-linux-git',
        title: 'Unix CLI, Pipelines & Process Control',
        description: 'Practice real Linux commands inside an interactive browser terminal.',
        iconName: 'Terminal',
        language: 'bash',
        level: 'Novice',
        totalXp: 400,
        estimatedHours: 3,
        lessons: [
          {
            id: 'bash-01-pipes',
            trackId: 'track-linux-git',
            courseId: 'course-linux-shell',
            title: 'Unix Pipelines & Log Stream Analysis',
            slug: 'bash-pipelines-grep',
            difficulty: 'Novice',
            language: 'bash',
            xpReward: 70,
            readTimeMinutes: 4,
            interactiveType: 'terminal',
            theoryMarkdown: `### The Unix Philosophy: Small Programs Composed via Pipes

In Unix, standard output (\`stdout\`, file descriptor 1) of one process can be redirected directly into standard input (\`stdin\`, file descriptor 0) of another using the pipe operator \`|\`.

\`\`\`bash
# Find all 500 error entries in server log and count unique IP addresses
cat access.log | grep " 500 " | awk '{print $1}' | sort | uniq -c | sort -nr
\`\`\``,
            instructions: [
              "Use the interactive terminal below.",
              "Run `cat server.log | grep ERROR` to inspect application crashes.",
              "Count the number of errors using `cat server.log | grep ERROR | wc -l`."
            ],
            starterCode: `# Type your bash pipeline commands in the interactive terminal
cat server.log | grep ERROR | wc -l
`,
            solutionCode: `cat server.log | grep ERROR | wc -l
`,
            testCases: [
              {
                id: 'bash-t1',
                name: 'Pipeline filters and counts log occurrences',
                expectedOutput: '3'
              }
            ],
            hints: [
              "Try typing `ls -la` to see the virtual directory structure.",
              "Use `grep ERROR` to filter lines containing the word ERROR."
            ]
          }
        ]
      }
    ]
  }
];
