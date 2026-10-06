import { CertificationExam } from '../types/curriculum';

export const certificationExams: CertificationExam[] = [
  {
    id: 'cert-python-foundations',
    title: 'Python Backend Associate',
    subtitle: 'Official Foundation Credential for Python Backend Developers',
    credentialTitle: 'Certified Python Backend Associate',
    badgeName: 'Python Guildmaster Badge',
    trackId: 'track-zero-to-one',
    icon: 'Terminal',
    passingScorePercent: 75,
    certificateDescription: 'Demonstrates verified competency in Python syntax, variables, conditional decision logic, functions, collections, data models, and error management.',
    skillsMeasured: [
      'Understanding Code execution & Print outputs',
      'Text Strings and why quotes are mandatory',
      'Variables as memory containers & Simple arithmetic',
      'If/Else logic gates & comparison operators',
      'Functions as reusable units of work & Return statements',
      'Lists, Collections, and basic iteration'
    ],
    questions: [
      {
        id: 'py-q1',
        question: 'What is the real-world purpose of writing "return" inside a function?',
        codeSnippet: `def get_potion():
    return "Health Potion"`,
        options: [
          'It prints text onto a piece of paper.',
          'It hands the finished answer back to whoever called the function.',
          'It turns off the computer immediately.',
          'It deletes the function from memory.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Think of a waiter at a restaurant: when you order a dish, the waiter brings the cooked dish BACK to you. "return" is how a function hands you back its result!'
      },
      {
        id: 'py-q2',
        question: 'Why does Python require quotation marks ("...") around words like "Hello"?',
        codeSnippet: `message = "Hello"`,
        options: [
          'Quotes make the text look fancy.',
          'Quotes tell the computer: "This is normal human text, do not try to run it as a computer command."',
          'The computer will run out of battery without quotes.',
          'Quotes turn the words into numbers.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Without quotes, the computer searches for a secret program or command named Hello. Quotes tell it: "Relax, this is just plain text to read."'
      },
      {
        id: 'py-q3',
        question: 'What will be stored inside the variable "total" after this code runs?',
        codeSnippet: `gold = 20
bonus = 15
total = gold + bonus`,
        options: [
          '5',
          '35',
          '2015',
          'None'
        ],
        correctIndex: 1,
        simpleExplanation: 'Python does standard math! 20 + 15 = 35. The single equal sign (=) stores the result 35 into the jar labeled "total".'
      },
      {
        id: 'py-q4',
        question: 'What will this condition return when player_hp is 0?',
        codeSnippet: `def check_life(player_hp):
    if player_hp > 0:
        return "Alive"
    else:
        return "Game Over"`,
        options: [
          '"Alive"',
          '"Game Over"',
          '0',
          'Error: player_hp cannot be zero'
        ],
        correctIndex: 1,
        simpleExplanation: 'Because 0 is NOT strictly greater than 0, the "if" test fails! The computer jumps directly to the "else" branch and returns "Game Over".'
      },
      {
        id: 'py-q5',
        question: 'How do you add a new item into an existing list in Python?',
        codeSnippet: `backpack = ["Torch", "Bread"]`,
        options: [
          'backpack.push_in("Shield")',
          'backpack.append("Shield")',
          'backpack + "Shield"',
          'add(backpack, "Shield")'
        ],
        correctIndex: 1,
        simpleExplanation: 'In Python, lists have a built-in helper called .append(). Think of "appending" as putting another item into the bottom of your backpack.'
      },
      {
        id: 'py-q6',
        question: 'What is a "Variable" in programming?',
        options: [
          'A computer virus that changes passwords.',
          'A labeled storage container in computer memory that holds a piece of information.',
          'A button that changes the screen color.',
          'A special math formula only scientists use.'
        ],
        correctIndex: 1,
        simpleExplanation: 'A variable is just a sticky label on a jar. If you label a jar "coins" and put 50 in it, coins = 50!'
      },
      {
        id: 'py-q7',
        question: 'In an f-string like f"Level {lvl}", what do the curly brackets {} do?',
        codeSnippet: `lvl = 5
print(f"Level {lvl}")`,
        options: [
          'They create a special lock on the text.',
          'They tell Python to look up the variable inside and insert its real value.',
          'They make the text bold.',
          'They delete the variable.'
        ],
        correctIndex: 1,
        simpleExplanation: 'The curly brackets {} are a placeholder window! Python looks inside {}, finds lvl is 5, and swaps it in to make "Level 5".'
      },
      {
        id: 'py-q8',
        question: 'What does the double equals sign (==) mean in code compared to a single equals sign (=)?',
        options: [
          '= checks equality, while == creates a variable.',
          '= puts a value into a variable, while == checks if two things are equal to each other.',
          'They are completely identical and do the exact same thing.',
          '== multiplies by 2.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Crucial beginner rule: single (=) means "store this value". Double (==) means "ask: are these two things equal?"'
      }
    ]
  },
  {
    id: 'cert-sql-specialist',
    title: 'SQL & Database Specialist',
    subtitle: 'Industry-Standard Relational Data Querying & Modeling Credential',
    credentialTitle: 'Certified SQL Database Specialist',
    badgeName: 'Master of Relational Data',
    trackId: 'track-sql',
    icon: 'Database',
    passingScorePercent: 75,
    certificateDescription: 'Demonstrates verified ability to query relational tables, filter records with WHERE, join tables via foreign keys, and perform data aggregations.',
    skillsMeasured: [
      'Understanding Tables, Rows, and Columns',
      'SELECT queries and column projection',
      'Filtering records with WHERE and comparison operators',
      'Sorting with ORDER BY and pagination with LIMIT',
      'Connecting normalized data using INNER JOIN',
      'Summarizing datasets with GROUP BY and aggregate functions'
    ],
    questions: [
      {
        id: 'sql-q1',
        question: 'In a database, what is a "Table" most similar to in everyday life?',
        options: [
          'A dining table with 4 legs.',
          'A spreadsheet sheet with rows (records) and columns (attributes).',
          'A folder full of random images.',
          'A web browser.'
        ],
        correctIndex: 1,
        simpleExplanation: 'A database table is just a supercharged spreadsheet! Each row is a single record (like a user), and each column is a piece of info (like their age or email).'
      },
      {
        id: 'sql-q2',
        question: 'What does the asterisk (*) symbol mean in "SELECT * FROM users;"?',
        codeSnippet: `SELECT * FROM users;`,
        options: [
          'Multiply all numbers by 10.',
          'Select only the first row.',
          'Give me ALL columns in the table.',
          'Delete all records.'
        ],
        correctIndex: 2,
        simpleExplanation: 'The asterisk (*) is wildcard shorthand for "show me every single column available in this table".'
      },
      {
        id: 'sql-q3',
        question: 'Which SQL keyword lets you connect two separate tables together using a matching ID?',
        options: [
          'MERGE_EVERYTHING',
          'JOIN',
          'COMBINE',
          'ATTACH'
        ],
        correctIndex: 1,
        simpleExplanation: 'JOIN is the superpower of relational databases. It lets you link orders to users based on user_id = users.id!'
      },
      {
        id: 'sql-q4',
        question: 'Which clause would you use if you only want to find users who have an active account?',
        codeSnippet: `SELECT name FROM users WHERE status = 'active';`,
        options: [
          'GROUP BY status',
          'ORDER BY status',
          'WHERE status = "active"',
          'LIMIT 10'
        ],
        correctIndex: 2,
        simpleExplanation: 'WHERE is the filter gate of SQL. It acts like a sieve, only letting rows pass through that meet your exact condition.'
      },
      {
        id: 'sql-q5',
        question: 'What will the query "SELECT COUNT(*) FROM orders;" return?',
        options: [
          'The total money spent on all orders combined.',
          'The total number of rows (orders) in the table.',
          'The first order only.',
          'A list of all customer names.'
        ],
        correctIndex: 1,
        simpleExplanation: 'COUNT(*) counts the rows! If there are 42 orders placed, it will return the single number 42.'
      },
      {
        id: 'sql-q6',
        question: 'If you want results ordered from highest price to lowest price, what keyword do you use?',
        codeSnippet: `SELECT product, price FROM items ORDER BY price DESC;`,
        options: [
          'ORDER BY price ASC',
          'ORDER BY price DESC',
          'SORT BY price HIGH',
          'REVERSE price'
        ],
        correctIndex: 1,
        simpleExplanation: 'DESC stands for "Descending" (starting from top/biggest down to lowest). ASC stands for "Ascending" (1, 2, 3...).'
      }
    ]
  },
  {
    id: 'cert-golang-concurrency',
    title: 'Go Cloud Systems Practitioner',
    subtitle: 'High-Concurrency & Systems Programming Credential',
    credentialTitle: 'Certified Go Systems Practitioner',
    badgeName: 'Concurrent Gopher Sigil',
    trackId: 'track-golang',
    icon: 'Cpu',
    passingScorePercent: 75,
    certificateDescription: 'Demonstrates verified proficiency in Go statically typed syntax, pointer receivers, memory management, channels, and goroutine worker patterns.',
    skillsMeasured: [
      'Statically typed variable declarations and structs',
      'Value receivers vs Pointer receivers (*)',
      'Goroutines and lightweight background workers',
      'Typed channels and thread-safe communication',
      'Preventing deadlocks and synchronization with WaitGroups'
    ],
    questions: [
      {
        id: 'go-q1',
        question: 'In Go, what does placing the "go" keyword in front of a function call do?',
        codeSnippet: `go processOrder(id)`,
        options: [
          'It repeats the function 100 times.',
          'It launches the function concurrently in the background as a lightweight goroutine.',
          'It pauses the entire program until finished.',
          'It translates the function into Python.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Putting "go" before a function tells Go: "Run this in the background right now while I continue doing other work!"'
      },
      {
        id: 'go-q2',
        question: 'Why do we use Pointer Receivers (func (u *User) SetName) in Go?',
        codeSnippet: `func (u *User) SetName(name string) {
    u.Name = name
}`,
        options: [
          'To modify the original User in memory rather than creating an expensive copy.',
          'Because Go forbids regular functions.',
          'To make the code run slower.',
          'To print the user to the terminal.'
        ],
        correctIndex: 0,
        simpleExplanation: 'Without the pointer (*), Go makes a full duplicate copy of the User. The pointer points directly to the real User in memory!'
      },
      {
        id: 'go-q3',
        question: 'What is the primary rule of Go concurrency?',
        options: [
          '"Always share memory using complex locks and global variables."',
          '"Do not communicate by sharing memory; instead, share memory by communicating (using channels)."',
          '"Never use more than 1 CPU core."',
          '"Only run programs at night."'
        ],
        correctIndex: 1,
        simpleExplanation: 'This is the golden motto of Go! Instead of multiple workers grabbing the same shared memory box and fighting, they send messages safely through channels.'
      },
      {
        id: 'go-q4',
        question: 'What symbol is used to send or receive messages on a Go channel?',
        codeSnippet: `messages <- "Order Placed"
msg := <-messages`,
        options: [
          '=>',
          '<-',
          '++',
          '~>'
        ],
        correctIndex: 1,
        simpleExplanation: 'The arrow (<-) points in the direction data is flowing! "ch <- data" sends into channel; "var := <-ch" takes data out of channel.'
      }
    ]
  },
  {
    id: 'cert-master-backend',
    title: 'Master Backend Architect',
    subtitle: 'Comprehensive Capstone Credential for Distributed Systems',
    credentialTitle: 'Master Backend Systems Architect',
    badgeName: 'Grand Archmage of Distributed Systems',
    trackId: 'track-architecture',
    icon: 'Layers',
    passingScorePercent: 80,
    certificateDescription: 'Demonstrates end-to-end mastery of backend engineering: clean code architecture, database optimization, caching tiers, load balancers, and resilient system design.',
    skillsMeasured: [
      'Decomposing legacy monoliths into scalable microservices',
      'Horizontal scaling & L7 Load Balancers (Round Robin vs Least Conn)',
      'In-Memory Caching (Redis/Memcached) and cache hit ratios',
      'Connection pooling and avoiding database starvation',
      'Circuit breakers and graceful degradation during traffic spikes'
    ],
    questions: [
      {
        id: 'mast-q1',
        question: 'What is the primary difference between Vertical Scaling and Horizontal Scaling?',
        options: [
          'Vertical scaling means hiring taller developers.',
          'Vertical scaling means buying a bigger, more expensive machine; Horizontal scaling means adding more server machines side-by-side.',
          'Horizontal scaling is only for mobile apps.',
          'There is no difference.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Vertical scaling is like buying a bigger truck (which eventually hits a size limit). Horizontal scaling is like adding a fleet of 10 trucks that share the deliveries!'
      },
      {
        id: 'mast-q2',
        question: 'Why do high-traffic systems place a Redis cache in front of their SQL database?',
        options: [
          'To hide the database from the government.',
          'Because Redis stores hot data in ultra-fast RAM, answering reads in ~1 millisecond and protecting the disk database from crashing.',
          'Redis is cheaper than buying electricity.',
          'SQL databases cannot store numbers.'
        ],
        correctIndex: 1,
        simpleExplanation: 'RAM memory is 1,000x faster than disk! A Redis cache intercepts 90% of requests instantly, so your database doesn\'t melt down under peak traffic.'
      },
      {
        id: 'mast-q3',
        question: 'What is a "Circuit Breaker" pattern in backend microservices?',
        options: [
          'A physical switch on the server rack that flips during power surges.',
          'Software logic that automatically stops sending requests to a failing service to prevent cascading crashes across the entire system.',
          'A code tool that speeds up Python.',
          'A way to delete slow users.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Just like the breaker box in your house cuts power before wires catch fire, a software circuit breaker stops sending traffic to a crashing service so the rest of the app stays alive!'
      },
      {
        id: 'mast-q4',
        question: 'What is a "Deadlock" in concurrent backend systems?',
        options: [
          'When a computer permanently runs out of hard drive space.',
          'When two or more processes each hold a lock the other needs, causing both to wait forever in an unmoving freeze.',
          'When an internet cable is unplugged.',
          'When a password is forgotten.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Imagine two people trying to cross a narrow hallway: person A won\'t move until person B moves, and person B won\'t move until person A moves. Neither can move forever!'
      }
    ]
  }
];
