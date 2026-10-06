import { MockInterviewPrompt } from '../types/curriculum';

export const mockInterviewPrompts: MockInterviewPrompt[] = [
  {
    id: 'int-py-01',
    roleTitle: 'Junior Python Backend Engineer',
    companyVibe: 'Fast-Growing Fintech Startup',
    interviewerPersona: 'Sarah (Lead Infrastructure Engineer)',
    question: 'Can you explain the difference between a List and a Dictionary in Python, and when you would choose one over the other for storing user records?',
    expectedKeyPoints: [
      'Lists are ordered sequences indexed by position (0, 1, 2)',
      'Dictionaries are key-value pairs indexed by unique hash keys',
      'Dictionaries provide fast O(1) lookup when searching by unique ID (like user_id)',
      'Lists take O(N) to search unless sorted'
    ],
    idealResponse: 'In Python, a List is an ordered sequence of items accessed by numeric position (0, 1, 2), ideal when order matters or when iterating over a collection. A Dictionary stores key-value pairs where lookups by key are nearly instant (O(1) time complexity). For user records, I would store them in a dictionary keyed by user_id so looking up a specific user does not require scanning through the entire list.',
    followUpQuestion: 'Great answer! What happens if you try to access a key in a dictionary that does not exist, and how do you handle it defensively?'
  },
  {
    id: 'int-sql-01',
    roleTitle: 'Junior Data & Backend Systems Engineer',
    companyVibe: 'Enterprise Cloud Platform',
    interviewerPersona: 'Marcus (Principal Database Architect)',
    question: 'Our database query is running very slowly when searching for users by their email address during login. What is likely happening, and how would you fix it?',
    expectedKeyPoints: [
      'Without an index, the database executes a full sequential table scan (O(N))',
      'Adding a B-Tree index on the email column speeds lookups to O(log N)',
      'Use EXPLAIN ANALYZE to verify query execution plans'
    ],
    idealResponse: 'The database is likely performing a full table scan, checking every single row on disk one-by-one. To fix this, I would create a B-Tree index on the email column: CREATE INDEX idx_users_email ON users(email). This creates an organized lookup tree that reduces search time from O(N) to O(log N). I would verify the speedup using EXPLAIN ANALYZE before and after.',
    followUpQuestion: 'Are there any downsides to adding indexes to every column in a table?'
  },
  {
    id: 'int-sys-01',
    roleTitle: 'Systems & Cloud Infrastructure Engineer',
    companyVibe: 'Global Streaming Service',
    interviewerPersona: 'Elena (Director of Reliability Engineering)',
    question: 'Our backend handles 10,000 requests per second. Every read request hits the PostgreSQL database, and CPU is at 98%. Walk me through how you would architect a solution to relieve the database.',
    expectedKeyPoints: [
      'Implement an in-memory cache layer like Redis',
      'Cache-aside pattern: check cache first, fallback to DB on miss',
      'Add PostgreSQL read replicas to split read traffic from write traffic',
      'Set proper TTL (Time-To-Live) on cached items to avoid stale data'
    ],
    idealResponse: 'I would introduce an in-memory caching tier using Redis following the Cache-Aside pattern. Over 80-90% of requests are typically read-only, and Redis serves reads in sub-millisecond RAM latency. Furthermore, I would provision PostgreSQL Read Replicas behind a load balancer to distribute remaining database queries away from the primary write node.',
    followUpQuestion: 'How would you handle the Thundering Herd problem if the Redis cache restarts?'
  }
];
