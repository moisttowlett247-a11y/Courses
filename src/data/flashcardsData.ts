import { Flashcard } from '../types/curriculum';

export const flashcardDecks: Flashcard[] = [
  {
    id: 'fc-py-1',
    category: 'Python',
    frontQuestion: 'What is the difference between = and == in Python?',
    backAnswer: '= is for assignment (storing a value in a variable). == is for equality comparison (asking if two things are identical).',
    eli5Analogy: '= is putting a book on a shelf. == is checking if two books have the exact same cover.',
    codeExample: `gold = 50       # Assignment: stores 50
is_full = (gold == 50) # Equality check: True`
  },
  {
    id: 'fc-py-2',
    category: 'Python',
    frontQuestion: 'What is the difference between a List and a Tuple in Python?',
    backAnswer: 'A List is mutable (you can add, delete, or change items with .append()). A Tuple is immutable (frozen once created, wrapped in parentheses).',
    eli5Analogy: 'A List is a backpack you can pack and unpack. A Tuple is a stone tablet carved in stone that cannot be altered.',
    codeExample: `my_list = [1, 2]
my_list.append(3) # Allowed!

my_tuple = (1, 2)
# my_tuple.append(3) -> ERROR!`
  },
  {
    id: 'fc-sql-1',
    category: 'SQL',
    frontQuestion: 'What is the difference between WHERE and HAVING in SQL?',
    backAnswer: 'WHERE filters individual rows BEFORE they are grouped. HAVING filters grouped metric aggregates AFTER GROUP BY has run.',
    eli5Analogy: 'WHERE is checking everyone’s ID at the door. HAVING is checking if a party table has more than 5 guests after they sit down.',
    codeExample: `SELECT role, COUNT(*) 
FROM users 
WHERE age > 18        -- Filters individual rows first
GROUP BY role 
HAVING COUNT(*) > 2;  -- Filters the grouped results`
  },
  {
    id: 'fc-sql-2',
    category: 'SQL',
    frontQuestion: 'What is the difference between INNER JOIN and LEFT JOIN?',
    backAnswer: 'INNER JOIN only returns rows that have matches in BOTH tables. LEFT JOIN returns ALL rows from the left table, filling with NULL if no match exists.',
    eli5Analogy: 'INNER JOIN only pairs up couples who both showed up. LEFT JOIN lists everyone on your guest list, even if they arrived alone.',
    codeExample: `SELECT users.name, orders.product
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`
  },
  {
    id: 'fc-go-1',
    category: 'Go',
    frontQuestion: 'Why do we use Goroutines instead of traditional Operating System threads?',
    backAnswer: 'Goroutines are ultra-lightweight (starting at only ~2KB of stack memory compared to 1–2MB for OS threads). You can spawn hundreds of thousands of them without crashing the server.',
    eli5Analogy: 'An OS thread is like hiring a semi-truck driver. A Goroutine is like hiring an electric bicycle courier.',
    codeExample: `go processTask(id)`
  },
  {
    id: 'fc-go-2',
    category: 'Go',
    frontQuestion: 'What is a Channel in Go?',
    backAnswer: 'A typed communication pipe that lets concurrent goroutines send and receive values thread-safely without manual mutex locks.',
    eli5Analogy: 'A pneumatic mail tube between offices: one person drops a message in, and the other person catches it.',
    codeExample: `ch := make(chan string)
go func() { ch <- "Done" }()
msg := <-ch`
  },
  {
    id: 'fc-arch-1',
    category: 'Architecture',
    frontQuestion: 'What is a Cache Hit vs Cache Miss in Redis?',
    backAnswer: 'Cache Hit: The requested data was already in ultra-fast RAM cache (~1ms). Cache Miss: Data was absent, so the backend had to query the slower disk database.',
    eli5Analogy: 'Cache Hit is grabbing milk from the kitchen fridge. Cache Miss is realizing the fridge is empty and having to drive to the grocery store.',
    codeExample: `// Cache Hit: <1ms response
// Cache Miss: Query Postgres -> Save in Redis -> Return`
  },
  {
    id: 'fc-arch-2',
    category: 'Architecture',
    frontQuestion: 'What does Idempotency mean in REST APIs?',
    backAnswer: 'An operation is idempotent if performing it multiple times produces the exact same result as performing it once (e.g. GET, PUT, DELETE). POST is generally not idempotent.',
    eli5Analogy: 'Pressing the "Elevator Call" button 5 times doesn\'t summon 5 elevators—it just ensures the elevator comes once.',
    codeExample: `DELETE /users/42 -- Idempotent (user is deleted)
POST /orders/create -- Not idempotent (might charge twice!)`
  }
];
