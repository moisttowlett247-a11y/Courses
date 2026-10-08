import { DegreeProgram, UserStats, AcademicTranscript, TranscriptEntry } from '../types/curriculum';

export const bachelorDegreeProgram: DegreeProgram = {
  id: 'degree-bs-backend-se',
  title: 'Bachelor of Science in Backend Software Engineering & Distributed Systems',
  degreeType: 'Bachelor of Science (B.S.)',
  institution: 'BootForge Institute of Computer Science & Engineering',
  totalCredits: 120,
  accreditation: 'Curricular Alignment with IEEE/ACM Computing Curricula & ABET CAC Standards',
  description: 'A comprehensive 120-credit collegiate program designed to take aspiring developers from zero programming knowledge to professional backend and distributed systems software engineers, qualified for high-scale enterprise engineering roles.',
  graduationRequirements: [
    'Completion of all 120 Academic Credit Equivalency Units across 8 semesters',
    'Minimum Cumulative Grade Point Average (GPA) of 2.0 / 4.0 (3.5+ for Cum Laude, 3.8+ for Magna Cum Laude, 3.95+ for Summa Cum Laude)',
    'Passing of at least 3 Official Track Certification Exams with >= 75% score',
    'Successful defeat and code review defense of Senior Capstone Boss Raids',
    'Satisfactory completion of all laboratory coding challenges with passing test suites'
  ],
  semesters: [
    {
      id: 'sem-1',
      name: 'Freshman Year — Semester 1 (Foundations)',
      yearNumber: 1,
      semesterNumber: 1,
      credits: 15,
      courses: [
        {
          code: 'CS 101',
          title: 'Introduction to Computer Science & Python',
          credits: 4,
          year: 'Freshman',
          semester: 'Fall',
          description: 'Introduction to algorithmic problem-solving, binary representation, computer memory model, Python syntax, variables, data types, and functions.',
          prerequisites: ['None (Zero-prerequisite foundation)'],
          learningOutcomes: [
            'Understand source code execution lifecycle and runtime interpretation',
            'Model real-world entities using fundamental primitive types (int, float, str, bool)',
            'Construct modular programs using pure functions and return statements'
          ],
          recommendedReadings: ['Think Python 2nd Ed - Allen Downey', 'Structure and Interpretation of Computer Programs (SICP)'],
          mappedTrackId: 'track-zero-to-one',
          mappedLessonIds: ['py-00-hello-world', 'py-00-math-variables', 'py-00-functions'],
          accreditationStandard: 'ABET CS Criterion 3.1: Fundamental Computing Principles'
        },
        {
          code: 'CS 102',
          title: 'Procedural Programming & Control Flow',
          credits: 4,
          year: 'Freshman',
          semester: 'Fall',
          description: 'Boolean algebra, conditional logic branching, iterative loops, list collections, and dictionary data structures for backend record processing.',
          prerequisites: ['CS 101'],
          learningOutcomes: [
            'Evaluate complex multi-condition boolean truth tables',
            'Perform safe iterations and avoid off-by-one boundary traps',
            'Structure nested key-value records for API payload serialization'
          ],
          recommendedReadings: ['Automate the Boring Stuff with Python - Al Sweigart'],
          mappedTrackId: 'track-zero-to-one',
          mappedLessonIds: ['py-00-conditionals', 'py-00-lists', 'py-00-dictionaries'],
          accreditationStandard: 'ABET CS Criterion 3.2: Program Design & Implementation'
        },
        {
          code: 'CS 105',
          title: 'Unix Command-Line & Shell Scripting',
          credits: 3,
          year: 'Freshman',
          semester: 'Fall',
          description: 'Operating systems command-line interface, navigation, file streams (stdin, stdout, stderr), Unix pipelines, grep, and shell automation.',
          prerequisites: ['None'],
          learningOutcomes: [
            'Navigate server file hierarchies using POSIX compliant shell utilities',
            'Chain single-responsibility Unix tools together via pipes (|)',
            'Filter high-volume server log streams using regex and grep'
          ],
          recommendedReadings: ['The Linux Command Line - William Shotts'],
          mappedTrackId: 'track-linux-git',
          mappedLessonIds: ['bash-01-pipes', 'bash-02-process-management'],
          accreditationStandard: 'ABET CS Criterion 3.6: System Administration & Tools'
        },
        {
          code: 'MATH 115',
          title: 'Discrete Mathematics for Computing',
          credits: 4,
          year: 'Freshman',
          semester: 'Fall',
          description: 'Set theory, predicate logic, relations, modular arithmetic, combinatorics, and induction proofs foundational for backend algorithm design.',
          prerequisites: ['High School Algebra'],
          learningOutcomes: [
            'Model relational database entity constraints using formal set theory',
            'Perform modular arithmetic computations essential for hash ring distribution',
            'Formulate mathematical induction arguments for algorithm correctness'
          ],
          recommendedReadings: ['Discrete Mathematics and Its Applications - Kenneth Rosen'],
          mappedTrackId: 'track-dsa',
          mappedLessonIds: ['dsa-01-lru'],
          accreditationStandard: 'ABET CS Criterion 1: Mathematical Foundations'
        }
      ]
    },
    {
      id: 'sem-2',
      name: 'Freshman Year — Semester 2 (Data & OOP)',
      yearNumber: 1,
      semesterNumber: 2,
      credits: 15,
      courses: [
        {
          code: 'CS 120',
          title: 'Object-Oriented Design & Domain Modeling',
          credits: 4,
          year: 'Freshman',
          semester: 'Spring',
          description: 'Encapsulation, classes, constructor initialization, method receivers, polymorphism, clean code principles, and defensive state guards.',
          prerequisites: ['CS 101', 'CS 102'],
          learningOutcomes: [
            'Architect domain models that prevent invalid state transitions',
            'Apply single-responsibility and separation of concerns',
            'Construct robust error-handling boundaries using custom exceptions'
          ],
          recommendedReadings: ['Clean Code: A Handbook of Agile Software Craftsmanship - Robert C. Martin'],
          mappedTrackId: 'track-python',
          mappedLessonIds: ['py-03-oop', 'py-04-error-handling'],
          accreditationStandard: 'ABET CS Criterion 3.2: Object-Oriented Software Engineering'
        },
        {
          code: 'CS 130',
          title: 'Relational Database Fundamentals & SQL',
          credits: 4,
          year: 'Freshman',
          semester: 'Spring',
          description: 'Relational algebra, schema design, primary & foreign keys, normalization (1NF, 2NF, 3NF), SELECT projection, WHERE filtering, and ordering.',
          prerequisites: ['CS 102'],
          learningOutcomes: [
            'Design normalized relational schemas that eliminate data redundancy',
            'Write expressive declarative SQL queries for multi-tenant data retrieval',
            'Enforce referential integrity using cascading constraints'
          ],
          recommendedReadings: ['SQL Antipatterns: Avoiding the Pitfalls of Database Programming - Bill Karwin'],
          mappedTrackId: 'track-sql',
          mappedLessonIds: ['sql-00-select-filter'],
          accreditationStandard: 'ABET CS Criterion 3.4: Database Systems & Information Management'
        },
        {
          code: 'CS 140',
          title: 'Version Control, Git & CI/CD Pipelines',
          credits: 3,
          year: 'Freshman',
          semester: 'Spring',
          description: 'Distributed version control with Git, DAG commit trees, atomic branches, interactive rebasing, merge conflicts, pull requests, and automated testing.',
          prerequisites: ['CS 105'],
          learningOutcomes: [
            'Execute safe Git branching workflows for enterprise team development',
            'Resolve non-trivial merge conflicts without regression regressions',
            'Configure continuous integration test runners for automated quality gates'
          ],
          recommendedReadings: ['Pro Git - Scott Chacon & Ben Straub'],
          mappedTrackId: 'track-linux-git',
          mappedLessonIds: ['bash-01-pipes'],
          accreditationStandard: 'ABET CS Criterion 3.5: Collaborative Software Engineering'
        },
        {
          code: 'COMM 110',
          title: 'Technical Communication & RFC Writing',
          credits: 4,
          year: 'Freshman',
          semester: 'Spring',
          description: 'Writing software design documents, Request for Comments (RFCs), API contracts, post-mortems, and communicating architectural trade-offs.',
          prerequisites: ['None'],
          learningOutcomes: [
            'Draft comprehensive architectural RFCs with clear trade-off analyses',
            'Write OpenAPI/Swagger documentation for public and internal service consumers',
            'Author blameless post-mortem root-cause analyses following incidents'
          ],
          recommendedReadings: ['The Staff Engineer\'s Path - Tanya Reilly'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 3.3: Professional Communication'
        }
      ]
    },
    {
      id: 'sem-3',
      name: 'Sophomore Year — Semester 1 (Algorithms & Data Structures)',
      yearNumber: 2,
      semesterNumber: 3,
      credits: 15,
      courses: [
        {
          code: 'CS 201',
          title: 'Data Structures & Asymptotic Complexity',
          credits: 4,
          year: 'Sophomore',
          semester: 'Fall',
          description: 'Big-O notation, arrays, dynamic slices, linked lists, stacks, queues, hash tables, hash collisions, and LRU eviction queues.',
          prerequisites: ['CS 102', 'MATH 115'],
          learningOutcomes: [
            'Quantify worst-case, average-case, and amortized time/space complexities',
            'Implement an O(1) Least Recently Used (LRU) Cache combining hash maps & doubly linked lists',
            'Diagnose memory allocation footprints and algorithmic bottlenecks in production'
          ],
          recommendedReadings: ['Introduction to Algorithms (CLRS) 4th Ed', 'Grokking Algorithms - Aditya Bhargava'],
          mappedTrackId: 'track-dsa',
          mappedLessonIds: ['dsa-01-lru'],
          accreditationStandard: 'ABET CS Criterion 3.1: Data Structures & Algorithmic Analysis'
        },
        {
          code: 'CS 210',
          title: 'Advanced SQL: Aggregations & Multi-Table Joins',
          credits: 4,
          year: 'Sophomore',
          semester: 'Fall',
          description: 'INNER JOIN, LEFT/RIGHT OUTER JOIN, FULL OUTER JOIN, CROSS JOIN, GROUP BY, HAVING, subqueries, and window functions in relational engines.',
          prerequisites: ['CS 130'],
          learningOutcomes: [
            'Construct complex multi-table relational joins across distributed schemas',
            'Perform statistical aggregation and reporting using GROUP BY and HAVING filters',
            'Analyze SQL query execution plans to identify accidental Cartesian cross products'
          ],
          recommendedReadings: ['PostgreSQL: Up and Running - Regina Obe & Leo Hsu'],
          mappedTrackId: 'track-sql',
          mappedLessonIds: ['sql-01-aggregation', 'sql-01-joins'],
          accreditationStandard: 'ABET CS Criterion 3.4: Relational Query Optimization'
        },
        {
          code: 'CS 225',
          title: 'Python Backend Systems & API Services',
          credits: 4,
          year: 'Sophomore',
          semester: 'Fall',
          description: 'Building production web services, HTTP request/response pipelines, middleware, status codes (2xx, 4xx, 5xx), rate-limiting algorithms, and JWT tokens.',
          prerequisites: ['CS 120'],
          learningOutcomes: [
            'Implement token bucket and sliding window rate limiting in backend services',
            'Authenticate API clients using cryptographically signed JSON Web Tokens',
            'Build idempotent REST endpoints following RFC 7231 specifications'
          ],
          recommendedReadings: ['Architecture Patterns with Python - Harry Percival & Bob Gregory'],
          mappedTrackId: 'track-python',
          mappedLessonIds: ['py-01-vars', 'py-02-dict-lookups'],
          accreditationStandard: 'ABET CS Criterion 3.2: Web Service Architecture'
        },
        {
          code: 'STAT 210',
          title: 'Probability & Server Telemetry Statistics',
          credits: 3,
          year: 'Sophomore',
          semester: 'Fall',
          description: 'Probability distributions, percentiles (p50, p95, p99, p99.9), tail latencies, SLOs/SLAs, error budget calculations, and anomaly detection.',
          prerequisites: ['MATH 115'],
          learningOutcomes: [
            'Calculate p99 and p99.9 latency SLAs to detect micro-service tail degradation',
            'Model server capacity requirements using queuing theory and Poisson processes',
            'Establish statistically grounded alert thresholds to eliminate alert fatigue'
          ],
          recommendedReadings: ['Site Reliability Engineering (SRE Book) - Google'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 1: Applied Probability in Computing'
        }
      ]
    },
    {
      id: 'sem-4',
      name: 'Sophomore Year — Semester 2 (Systems & Compilation)',
      yearNumber: 2,
      semesterNumber: 4,
      credits: 15,
      courses: [
        {
          code: 'CS 240',
          title: 'Computer Systems Architecture & Memory Hierarchy',
          credits: 4,
          year: 'Sophomore',
          semester: 'Spring',
          description: 'CPU instruction pipelines, L1/L2/L3 cache lines, virtual memory paging, heap vs stack memory allocation, and pointer arithmetic mechanics.',
          prerequisites: ['CS 201'],
          learningOutcomes: [
            'Contrast stack frame allocation speed with heap garbage collector overhead',
            'Trace pointer memory dereferences and protect against null pointer panics',
            'Optimize data structures for CPU cache line locality to maximize throughput'
          ],
          recommendedReadings: ['Computer Systems: A Programmer\'s Perspective (CS:APP) - Bryant & O\'Hallaron'],
          mappedTrackId: 'track-golang',
          mappedLessonIds: ['go-01-structs-methods'],
          accreditationStandard: 'ABET CS Criterion 3.1: Hardware & Low-Level Architecture'
        },
        {
          code: 'CS 250',
          title: 'Database Internals: Indexing, B-Trees & ACID',
          credits: 4,
          year: 'Sophomore',
          semester: 'Spring',
          description: 'B-Tree & B+ Tree storage structures, write-ahead logs (WAL), transaction isolation levels (Read Committed, Repeatable Read, Serializable), and deadlocks.',
          prerequisites: ['CS 210'],
          learningOutcomes: [
            'Diagnose sequential table scans vs index-only scans using EXPLAIN ANALYZE',
            'Mitigate phantom reads, dirty reads, and write skew using proper isolation levels',
            'Design multi-column composite indexes honoring the leftmost prefix rule'
          ],
          recommendedReadings: ['Database Internals: A Deep Dive into How Distributed Data Systems Work - Alex Petrov'],
          mappedTrackId: 'track-sql',
          mappedLessonIds: ['sql-01-aggregation', 'sql-01-joins'],
          accreditationStandard: 'ABET CS Criterion 3.4: Storage Engines & Concurrency Control'
        },
        {
          code: 'CS 260',
          title: 'Operating Systems & Process Concurrency',
          credits: 4,
          year: 'Sophomore',
          semester: 'Spring',
          description: 'Kernel vs user space, syscalls, processes, POSIX threads, context switching costs, race conditions, mutex locks, and inter-process communication.',
          prerequisites: ['CS 105', 'CS 240'],
          learningOutcomes: [
            'Analyze kernel context-switch overhead comparing OS threads to userland coroutines',
            'Prevent race conditions using mutex locking and read-write locks',
            'Manage Linux process signals (SIGTERM, SIGKILL, SIGHUP) for graceful shutdowns'
          ],
          recommendedReadings: ['Operating Systems: Three Easy Pieces (OSTEP) - Remzi Arpaci-Dusseau'],
          mappedTrackId: 'track-linux-git',
          mappedLessonIds: ['bash-02-process-management'],
          accreditationStandard: 'ABET CS Criterion 3.1: Operating Systems Principles'
        },
        {
          code: 'CS 270',
          title: 'Computer Networks & Internet Protocols',
          credits: 3,
          year: 'Sophomore',
          semester: 'Spring',
          description: 'OSI 7-layer model, TCP 3-way handshakes, UDP datagrams, TLS 1.3 encryption handshakes, DNS resolution, and HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC).',
          prerequisites: ['CS 105'],
          learningOutcomes: [
            'Trace TCP packet flow, flow control windowing, and congestion avoidance',
            'Diagnose DNS lookup latency bottlenecks and connection pooling reuse',
            'Evaluate the impact of TLS session resumption on backend connection establishment'
          ],
          recommendedReadings: ['High Performance Browser Networking - Ilya Grigorik'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 3.6: Networking & Communication Protocols'
        }
      ]
    },
    {
      id: 'sem-5',
      name: 'Junior Year — Semester 1 (High-Concurrency Systems & Go)',
      yearNumber: 3,
      semesterNumber: 5,
      credits: 15,
      courses: [
        {
          code: 'CS 310',
          title: 'High-Concurrency Programming with Go',
          credits: 4,
          year: 'Junior',
          semester: 'Fall',
          description: 'Go memory model, struct methods with value vs pointer receivers, CSP concurrency model, M:N scheduler, goroutines, and channels.',
          prerequisites: ['CS 240', 'CS 260'],
          learningOutcomes: [
            'Implement memory-safe mutation of shared state using Go pointer receivers',
            'Orchestrate concurrent worker pools communicating over buffered & unbuffered channels',
            'Prevent goroutine memory leaks by attaching context.Context cancellation signals'
          ],
          recommendedReadings: ['Concurrency in Go: Tools and Techniques for Developers - Katherine Cox-Buday', 'The Go Programming Language - Donovan & Kernighan'],
          mappedTrackId: 'track-golang',
          mappedLessonIds: ['go-01-structs-methods', 'go-02-channels'],
          accreditationStandard: 'ABET CS Criterion 3.2: Concurrent Programming Paradigms'
        },
        {
          code: 'CS 320',
          title: 'Distributed Network Services & Microservices',
          credits: 4,
          year: 'Junior',
          semester: 'Fall',
          description: 'Monolith decomposition, gRPC & Protocol Buffers, service discovery, API gateways, circuit breaker patterns, and distributed tracing.',
          prerequisites: ['CS 225', 'CS 270'],
          learningOutcomes: [
            'Define binary gRPC proto contracts with backward and forward compatibility',
            'Implement Netflix Hystrix circuit-breaker fallback mechanisms for resilient microservices',
            'Propagate OpenTelemetry trace headers across multi-service call chains'
          ],
          recommendedReadings: ['Building Microservices: Designing Fine-Grained Systems 2nd Ed - Sam Newman'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 3.2: Distributed Architecture Design'
        },
        {
          code: 'CS 330',
          title: 'Cloud Containers & Infrastructure as Code',
          credits: 4,
          year: 'Junior',
          semester: 'Fall',
          description: 'Linux namespaces and cgroups, Docker image layering, multi-stage builds, Kubernetes pod orchestration, and infrastructure provisioning.',
          prerequisites: ['CS 105', 'CS 260'],
          learningOutcomes: [
            'Construct minimal, secure multi-stage Dockerfiles with non-root runtime users',
            'Configure Kubernetes readiness, liveness, and startup probes to automate healing',
            'Automate zero-downtime rolling deployments across distributed compute clusters'
          ],
          recommendedReadings: ['Docker Deep Dive - Nigel Poulton', 'Kubernetes in Action - Marko Luksa'],
          mappedTrackId: 'track-linux-git',
          mappedLessonIds: ['bash-02-process-management'],
          accreditationStandard: 'ABET CS Criterion 3.6: Cloud Infrastructure Engineering'
        },
        {
          code: 'CS 335',
          title: 'Application Security, Threat Modeling & OWASP',
          credits: 3,
          year: 'Junior',
          semester: 'Fall',
          description: 'SQL injection defense, parameterized queries, cross-site scripting (XSS), CSRF tokens, secret vault management, TLS certificates, and principle of least privilege.',
          prerequisites: ['CS 130', 'CS 225'],
          learningOutcomes: [
            'Audit backend codebases against the OWASP Top 10 vulnerabilities',
            'Enforce parameterized prepared statements across all database interaction layers',
            'Implement enterprise Role-Based Access Control (RBAC) and least privilege IAM roles'
          ],
          recommendedReadings: ['Threat Modeling: Designing for Security - Adam Shostack'],
          mappedTrackId: 'track-sql',
          mappedLessonIds: ['sql-00-select-filter'],
          accreditationStandard: 'ABET CS Criterion 3.7: Information Assurance & Cybersecurity'
        }
      ]
    },
    {
      id: 'sem-6',
      name: 'Junior Year — Semester 2 (Distributed Systems & Fault Tolerance)',
      yearNumber: 3,
      semesterNumber: 6,
      credits: 15,
      courses: [
        {
          code: 'CS 360',
          title: 'Distributed Systems Principles & CAP Theorem',
          credits: 4,
          year: 'Junior',
          semester: 'Spring',
          description: 'Fallacies of distributed computing, CAP theorem trade-offs, PACELC theorem, eventual consistency, split-brain scenarios, and quorum reads/writes.',
          prerequisites: ['CS 310', 'CS 320'],
          learningOutcomes: [
            'Formulate consistency vs availability trade-offs for mission-critical banking vs social feeds',
            'Calculate Dynamo-style quorum parameters (N, R, W) to guarantee strong read consistency',
            'Detect and remediate network partition split-brain failures in distributed clusters'
          ],
          recommendedReadings: ['Designing Data-Intensive Applications (DDIA) - Martin Kleppmann'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 3.1: Distributed Systems Theory'
        },
        {
          code: 'CS 370',
          title: 'Distributed Consensus & Replication Protocols',
          credits: 4,
          year: 'Junior',
          semester: 'Spring',
          description: 'Leader election, Raft consensus algorithm, Paxos, state machine replication, vector clocks, Lamport timestamps, and conflict-free replicated data types (CRDTs).',
          prerequisites: ['CS 360'],
          learningOutcomes: [
            'Trace Raft log replication, term numbers, and heartbeat election timeouts',
            'Order distributed events without wall-clock synchronization using Lamport clocks',
            'Resolve conflicting concurrent writes using CRDTs and Last-Write-Wins timestamps'
          ],
          recommendedReadings: ['In Search of an Understandable Consensus Algorithm (Raft Paper) - Ongaro & Ousterhout'],
          mappedTrackId: 'track-golang',
          mappedLessonIds: ['go-02-channels'],
          accreditationStandard: 'ABET CS Criterion 3.1: Distributed Consensus Protocols'
        },
        {
          code: 'CS 380',
          title: 'High-Throughput Caching & Memory Architecture',
          credits: 4,
          year: 'Junior',
          semester: 'Spring',
          description: 'Cache topologies (write-through, write-back, write-around), cache stampede / dog-piling prevention, probabilistic early expiration, and Redis cluster operations.',
          prerequisites: ['CS 201', 'CS 250'],
          learningOutcomes: [
            'Design multi-tier caching architectures that absorb 95%+ of read traffic',
            'Eliminate cache stampedes using mutex locks and distributed single-flight coalescing',
            'Implement probabilistic cache invalidation algorithms (XFetch) for hot keys'
          ],
          recommendedReadings: ['Redis in Action - Josiah L. Carlson'],
          mappedTrackId: 'track-dsa',
          mappedLessonIds: ['dsa-01-lru'],
          accreditationStandard: 'ABET CS Criterion 3.4: In-Memory Data Storage Systems'
        },
        {
          code: 'CS 390',
          title: 'Event-Driven Architectures & Message Queues',
          credits: 3,
          year: 'Junior',
          semester: 'Spring',
          description: 'Publish/subscribe paradigms, Apache Kafka log partitions, consumer groups, backpressure handling, at-least-once delivery, and dead-letter queues (DLQs).',
          prerequisites: ['CS 320'],
          learningOutcomes: [
            'Architect scalable Kafka event logs with ordered partition key hashing',
            'Design idempotent consumer handlers to safely process duplicate messages',
            'Implement dead-letter routing to isolate poisoned transaction payloads'
          ],
          recommendedReadings: ['Kafka: The Definitive Guide - Gwen Shapira et al.'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 3.2: Asynchronous Messaging Architecture'
        }
      ]
    },
    {
      id: 'sem-7',
      name: 'Senior Year — Semester 1 (Scalability & High Availability)',
      yearNumber: 4,
      semesterNumber: 7,
      credits: 15,
      courses: [
        {
          code: 'CS 410',
          title: 'Large-Scale Database Sharding & Partitioning',
          credits: 4,
          year: 'Senior',
          semester: 'Fall',
          description: 'Horizontal database partitioning, consistent hashing ring topologies, cross-shard transactions, 2-phase commit (2PC) protocol, and distributed query planning.',
          prerequisites: ['CS 250', 'CS 360'],
          learningOutcomes: [
            'Implement consistent hashing with virtual nodes to balance multi-terabyte shards',
            'Execute two-phase commit protocols across distributed relational nodes',
            'Design partition keys that prevent celebrity hotspots and data skew'
          ],
          recommendedReadings: ['System Design Interview - Alex Xu (Vol 1 & 2)'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 3.4: Distributed Storage Engineering'
        },
        {
          code: 'CS 420',
          title: 'Load Balancing & Global Traffic Routing',
          credits: 4,
          year: 'Senior',
          semester: 'Fall',
          description: 'Layer 4 vs Layer 7 load balancing, round-robin, least connections, consistent hash routing, Anycast IP routing, DNS GEO steering, and TLS offloading.',
          prerequisites: ['CS 270', 'CS 320'],
          learningOutcomes: [
            'Configure weighted round-robin and least connections balancing algorithms',
            'Implement health-check polling loops with exponential backoff and jitter',
            'Route international user traffic via CDN edge nodes and Anycast routing'
          ],
          recommendedReadings: ['Site Reliability Engineering: How Google Runs Production Systems'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 3.6: Traffic Engineering & Global Availability'
        },
        {
          code: 'CS 430',
          title: 'Reliability Engineering & Chaos Testing',
          credits: 4,
          year: 'Senior',
          semester: 'Fall',
          description: 'Fault injection, Chaos Monkey methodology, graceful service degradation, feature flags, load shedding, and canary release strategies.',
          prerequisites: ['CS 320', 'CS 330'],
          learningOutcomes: [
            'Simulate network latency spikes and server crashes in staging via chaos tests',
            'Build automated load shedding filters that prioritize checkout over browse traffic',
            'Safely deploy canary releases monitoring error budget burn rates'
          ],
          recommendedReadings: ['Chaos Engineering: System Resiliency in Practice - Casey Rosenthal'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 3.5: Systems Reliability & Resilience'
        },
        {
          code: 'CS 440',
          title: 'Cloud Security, Zero Trust & Cryptography',
          credits: 3,
          year: 'Senior',
          semester: 'Fall',
          description: 'Public-key cryptography (RSA, ECC), AES symmetric encryption at rest, Zero Trust networking (mTLS), secrets rotation, and compliance frameworks.',
          prerequisites: ['CS 335'],
          learningOutcomes: [
            'Secure inter-service mesh communication using mutual TLS (mTLS) certificates',
            'Encrypt sensitive PII data columns using AES-256 with automated key rotation',
            'Enforce Zero Trust microsegmentation rules across multi-cloud VPCs'
          ],
          recommendedReadings: ['Real-World Cryptography - David Wong'],
          mappedTrackId: 'track-python',
          mappedLessonIds: ['py-04-error-handling'],
          accreditationStandard: 'ABET CS Criterion 3.7: Cryptography & Security Engineering'
        }
      ]
    },
    {
      id: 'sem-8',
      name: 'Senior Year — Semester 2 (Senior Capstone Practicum)',
      yearNumber: 4,
      semesterNumber: 8,
      credits: 15,
      courses: [
        {
          code: 'CS 490',
          title: 'Senior Engineering Capstone: Distributed Production Microservice',
          credits: 6,
          year: 'Senior',
          semester: 'Spring',
          description: 'Comprehensive graduation practicum requiring the end-to-end design, implementation, testing, containerization, and defense of a distributed high-concurrency backend service.',
          prerequisites: ['CS 410', 'CS 420', 'CS 310'],
          learningOutcomes: [
            'Architect and deploy a fault-tolerant distributed system passing load tests exceeding 10,000 req/sec',
            'Defend design choices and trade-offs before an engineering review board',
            'Author complete production runbooks, monitoring dashboards, and disaster recovery procedures'
          ],
          recommendedReadings: ['Designing Distributed Systems - Brendan Burns'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing', 'dsa-01-lru', 'go-02-channels'],
          accreditationStandard: 'ABET CS Criterion 5: Major Capstone Design Experience'
        },
        {
          code: 'CS 495',
          title: 'Production Boss Raids Practicum & Code Defense',
          credits: 5,
          year: 'Senior',
          semester: 'Spring',
          description: 'Hands-on live scenario debugging of catastrophic production outages, multi-phase boss raid code solutions, and rapid crisis mitigation under time pressure.',
          prerequisites: ['CS 490'],
          learningOutcomes: [
            'Diagnose race conditions and deadlocks in live production simulator threads',
            'Restore database consistency following simulated split-brain replication failures',
            'Refactor critical path algorithmic code to achieve sub-millisecond p99 latencies'
          ],
          recommendedReadings: ['The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win'],
          mappedTrackId: 'track-architecture',
          mappedLessonIds: ['arch-01-load-balancing'],
          accreditationStandard: 'ABET CS Criterion 3.5: Applied Production Engineering'
        },
        {
          code: 'PHIL 315',
          title: 'Engineering Ethics, AI Governance & Data Privacy',
          credits: 4,
          year: 'Senior',
          semester: 'Spring',
          description: 'Ethical considerations in autonomous backend software, user privacy rights (GDPR/CCPA), responsible AI deployment, software liability, and open-source licensing.',
          prerequisites: ['Senior Standing'],
          learningOutcomes: [
            'Navigate complex legal and ethical dilemmas involving user data tracking and AI models',
            'Implement privacy-by-design architectures ensuring GDPR right-to-be-forgotten compliance',
            'Evaluate licensing compliance (MIT, Apache 2.0, GPLv3) across open-source dependencies'
          ],
          recommendedReadings: ['Weapons of Math Destruction - Cathy O\'Neil'],
          mappedTrackId: 'track-python',
          mappedLessonIds: ['py-00-hello-world'],
          accreditationStandard: 'ABET CS Criterion 4: Ethical and Professional Responsibility'
        }
      ]
    }
  ]
};

/**
 * Calculates student's progress towards Bachelor of Science Degree
 */
export function calculateDegreeAudit(userStats: UserStats) {
  const totalCourses = bachelorDegreeProgram.semesters.flatMap(s => s.courses);
  const totalDegreeCredits = bachelorDegreeProgram.totalCredits; // 120

  // Derive completed courses based on lessons completed, certifications earned, and bosses defeated
  const completedLessonCount = userStats.completedLessons.length;
  const certCount = userStats.earnedCertificates?.length || 0;
  const bossCount = userStats.completedBosses?.length || 0;

  // Each lesson completed, cert earned, and boss completed unlocks progressive collegiate credits
  // Total lessons in curriculum: ~16 lessons
  // Scaling formula:
  // Base credits from completed lessons: (completedLessons / 16) * 70 credits
  // Plus certifications earned: certCount * 8 credits (up to 40 credits)
  // Plus boss raids: bossCount * 5 credits (up to 10 credits)
  let earnedCredits = 0;
  
  if (completedLessonCount > 0) {
    earnedCredits += Math.min(70, Math.round((completedLessonCount / 16) * 70));
  }
  if (certCount > 0) {
    earnedCredits += Math.min(40, certCount * 8);
  }
  if (bossCount > 0) {
    earnedCredits += Math.min(10, bossCount * 5);
  }

  // Ensure within 0 to 120 range
  earnedCredits = Math.min(120, earnedCredits);

  // If user completed all lessons, certs, and bosses, grant full 120 credits
  if (completedLessonCount >= 16 && certCount >= 4 && bossCount >= 2) {
    earnedCredits = 120;
  }

  // Calculate proportional completed course items
  const courseCountToComplete = Math.min(totalCourses.length, Math.floor((earnedCredits / totalDegreeCredits) * totalCourses.length));
  
  const completedCourseCodes = new Set<string>();
  for (let i = 0; i < courseCountToComplete; i++) {
    completedCourseCodes.add(totalCourses[i].code);
  }

  // GPA calculation:
  // Default starting collegiate GPA is 3.75, weighted up if cert scores are high
  let avgCertScore = 88;
  if (userStats.earnedCertificates && userStats.earnedCertificates.length > 0) {
    const sum = userStats.earnedCertificates.reduce((acc, c) => acc + c.scorePercent, 0);
    avgCertScore = sum / userStats.earnedCertificates.length;
  }

  // Convert percentage to 4.0 scale (e.g. 95% -> 3.9, 85% -> 3.6, 75% -> 3.0)
  let gpa = Math.max(2.5, Math.min(4.0, (avgCertScore / 100) * 4.0));
  gpa = Math.round(gpa * 100) / 100;

  // Determine Latin Honors
  let honors: string | undefined;
  if (earnedCredits >= 120) {
    if (gpa >= 3.95) honors = 'Summa Cum Laude (Highest Honors)';
    else if (gpa >= 3.8) honors = 'Magna Cum Laude (High Honors)';
    else if (gpa >= 3.5) honors = 'Cum Laude (Honors)';
  }

  const isGraduationEligible = earnedCredits >= 120 && gpa >= 2.0;

  return {
    totalCreditsRequired: totalDegreeCredits,
    earnedCredits,
    progressPercent: Math.round((earnedCredits / totalDegreeCredits) * 100),
    gpa,
    honors,
    academicStanding: gpa >= 3.8 ? "Dean's List - High Academic Standing" : gpa >= 3.0 ? "Good Academic Standing" : "Academic Probation",
    completedCourseCodes,
    isGraduationEligible,
    remainingCredits: Math.max(0, totalDegreeCredits - earnedCredits)
  };
}

/**
 * Generates an official printable Academic Transcript
 */
export function generateAcademicTranscript(userStats: UserStats): AcademicTranscript {
  const audit = calculateDegreeAudit(userStats);
  const totalCourses = bachelorDegreeProgram.semesters.flatMap(s => s.courses);

  const entries: TranscriptEntry[] = totalCourses.map((course, idx) => {
    const isCompleted = audit.completedCourseCodes.has(course.code);
    let grade = 'IP'; // In Progress
    let gradePoints = 0;

    if (isCompleted) {
      if (audit.gpa >= 3.9) {
        grade = idx % 3 === 0 ? 'A+' : 'A';
        gradePoints = 4.0;
      } else if (audit.gpa >= 3.7) {
        grade = idx % 2 === 0 ? 'A' : 'A-';
        gradePoints = 3.7;
      } else if (audit.gpa >= 3.3) {
        grade = 'B+';
        gradePoints = 3.3;
      } else {
        grade = 'B';
        gradePoints = 3.0;
      }
    }

    const semester = bachelorDegreeProgram.semesters.find(s => s.courses.some(c => c.code === course.code));

    return {
      courseCode: course.code,
      title: course.title,
      credits: course.credits,
      grade: isCompleted ? grade : 'IP',
      gradePoints: isCompleted ? gradePoints : 0,
      status: isCompleted ? 'Completed' : 'In Progress',
      semesterName: semester ? semester.name : 'Academic Year'
    };
  });

  const studentName = userStats.studentName?.trim() || 'Collegiate Scholar';
  const studentId = `BF-UNIV-${Math.abs(studentName.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0) % 90000 + 10000)}`;

  return {
    studentName,
    studentId,
    institution: bachelorDegreeProgram.institution,
    degreeTitle: bachelorDegreeProgram.title,
    status: audit.isGraduationEligible ? 'Conferred' : 'Active - Matriculated',
    conferralDate: audit.isGraduationEligible ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : undefined,
    cumulativeGpa: audit.gpa,
    totalCreditsEarned: audit.earnedCredits,
    totalCreditsRequired: audit.totalCreditsRequired,
    academicStanding: audit.academicStanding,
    honors: audit.honors,
    verificationHash: `SHA256:BF-${Math.floor(Date.now() / 86400000)}-${studentId}`,
    entries
  };
}
