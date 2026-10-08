import { CertificationExam, CertStudyGuide } from '../types/curriculum';

export const certificationExams: CertificationExam[] = [
  {
    id: 'cert-python-foundations',
    title: 'Python Backend Associate',
    subtitle: 'Official Foundation Credential for Python Backend Developers',
    credentialTitle: 'Certified Python Backend Associate (CPBA)',
    badgeName: 'Python Guildmaster Badge',
    trackId: 'track-zero-to-one',
    icon: 'Terminal',
    passingScorePercent: 75,
    certificateDescription: 'Demonstrates verified competency in Python syntax, variables, conditional decision logic, functions, collections, data models, error handling, and API serialization.',
    skillsMeasured: [
      'Understanding Code execution lifecycle & print outputs',
      'Text Strings, f-string interpolation & type casting',
      'Variables as memory containers & arithmetic operations',
      'If/Else logic gates & boolean comparison operators',
      'Functions as reusable units of work & Return statements',
      'Lists, Collections, dictionaries & safe .get() key lookups',
      'Object-Oriented Design (Classes, __init__, and self encapsulation)',
      'Defensive error handling with try/except blocks'
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
          'Quotes tell the computer: "This is normal human text, do not try to run it as a computer command."',
          'Quotes make the text look fancy.',
          'The computer will run out of battery without quotes.',
          'Quotes turn the words into numbers.'
        ],
        correctIndex: 0,
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
          '2015',
          '35',
          'None'
        ],
        correctIndex: 2,
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
          '0',
          'Error: player_hp cannot be zero',
          '"Game Over"'
        ],
        correctIndex: 3,
        simpleExplanation: 'Because 0 is NOT strictly greater than 0, the "if" test fails! The computer jumps directly to the "else" branch and returns "Game Over".'
      },
      {
        id: 'py-q5',
        question: 'How do you add a new item into an existing list in Python?',
        codeSnippet: `backpack = ["Torch", "Bread"]`,
        options: [
          'backpack.append("Shield")',
          'backpack.push_in("Shield")',
          'backpack + "Shield"',
          'add(backpack, "Shield")'
        ],
        correctIndex: 0,
        simpleExplanation: 'In Python, lists have a built-in helper called .append(). Think of "appending" as putting another item into the bottom of your backpack.'
      },
      {
        id: 'py-q6',
        question: 'What is the purpose of Python\'s dictionary .get() method compared to square brackets user["role"]?',
        codeSnippet: `user = {"name": "Aria"}
role = user.get("role", "guest")`,
        options: [
          '.get() automatically encrypts the password.',
          '.get() safely returns a default fallback value instead of crashing with a KeyError if the key is missing.',
          '.get() deletes the dictionary forever.',
          '.get() converts the dictionary into a list.'
        ],
        correctIndex: 1,
        simpleExplanation: 'If you ask user["role"] when "role" does not exist, your server crashes with a KeyError! Using user.get("role", "guest") safely returns "guest" without throwing an error.'
      },
      {
        id: 'py-q7',
        question: 'What is the role of __init__ and "self" in a Python class?',
        codeSnippet: `class ServerNode:
    def __init__(self, host, port):
        self.host = host
        self.port = port`,
        options: [
          '__init__ is the constructor method run when creating a new object instance, and "self" references that specific instance.',
          '__init__ shuts down the web server when a user logs out.',
          '"self" is a global variable shared across all computers in the datacenter.',
          '__init__ compiles Python into machine code.'
        ],
        correctIndex: 0,
        simpleExplanation: '__init__ is the birth certificate constructor for an object. "self" tells Python: attach this host and port specifically to THIS instance of ServerNode.'
      },
      {
        id: 'py-q8',
        question: 'Why should backend systems use try/except blocks around external network calls and JSON decoding?',
        codeSnippet: `try:
    data = json.loads(payload)
except json.JSONDecodeError:
    return {"error": "Invalid payload"}, 400`,
        options: [
          'Because try/except makes code run 10x faster.',
          'To catch invalid inputs or errors defensively without allowing unhandled exceptions to crash the worker thread.',
          'Because Python forbids if/else statements inside web servers.',
          'To hide bugs so managers do not notice.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Defensive programming! External client requests can send corrupt payloads or lose connection. Wrapping in try/except lets you return a clean 400 Bad Request error rather than killing the server.'
      },
      {
        id: 'py-q9',
        question: 'What will be the output of formatting a text string using Python f-strings?',
        codeSnippet: `service = "auth-api"
port = 8080
banner = f"Listening on {service}:{port}"`,
        options: [
          '"Listening on {service}:{port}"',
          '"Listening on auth-api:8080"',
          '"Listening on 8080:auth-api"',
          'SyntaxError: f is not defined'
        ],
        correctIndex: 1,
        simpleExplanation: 'f-strings (formatted string literals) replace curly brace expressions like {service} and {port} with their actual variable values during runtime.'
      },
      {
        id: 'py-q10',
        question: 'What happens when you iterate over a dictionary using a "for key in dict:" loop?',
        codeSnippet: `server_stats = {"cpu": 45, "ram": 72, "disk": 30}
for k in server_stats:
    print(k)`,
        options: [
          'It prints the values (45, 72, 30).',
          'It prints the keys ("cpu", "ram", "disk").',
          'It crashes with an iteration error.',
          'It prints both keys and values separated by commas.'
        ],
        correctIndex: 1,
        simpleExplanation: 'By default, looping over a dictionary iterates through its keys. If you want both keys and values, you write "for k, v in server_stats.items():".'
      }
    ]
  },
  {
    id: 'cert-sql-specialist',
    title: 'SQL & Database Specialist',
    subtitle: 'Professional Relational Database Architecture & Querying Credential',
    credentialTitle: 'Certified SQL & Database Specialist (CSDS)',
    badgeName: 'Grand High Inquisitor of Data',
    trackId: 'track-sql',
    icon: 'Database',
    passingScorePercent: 75,
    certificateDescription: 'Demonstrates deep mastery of relational schema design, filtering, joins, aggregations, indexing mechanics, and ACID transaction safety.',
    skillsMeasured: [
      'SELECT projections, WHERE filters, and ORDER BY sorting',
      'Aggregation functions (COUNT, SUM, AVG) with GROUP BY',
      'HAVING clauses vs WHERE filter execution order',
      'INNER JOIN vs LEFT/RIGHT OUTER JOIN semantics',
      'Foreign Key constraints & Referential Integrity',
      'B-Tree Database Indexes & Query Execution Plans',
      'ACID properties & Transaction Isolation Levels'
    ],
    questions: [
      {
        id: 'sql-q1',
        question: 'Which SQL keyword is used to filter records before they are grouped by GROUP BY?',
        options: ['HAVING', 'WHERE', 'ORDER BY', 'LIMIT'],
        correctIndex: 1,
        simpleExplanation: 'WHERE filters individual raw table rows BEFORE any grouping happens. HAVING filters aggregate groups AFTER GROUP BY has evaluated!'
      },
      {
        id: 'sql-q2',
        question: 'What is the critical behavioral difference between an INNER JOIN and a LEFT JOIN?',
        codeSnippet: `SELECT u.name, o.total 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;`,
        options: [
          'LEFT JOIN deletes users without orders.',
          'INNER JOIN returns all users; LEFT JOIN returns only users with orders.',
          'LEFT JOIN keeps ALL rows from the left table (users) even if they have zero orders (filling order columns with NULL); INNER JOIN drops rows that have no match.',
          'There is no difference between them in SQL standards.'
        ],
        correctIndex: 2,
        simpleExplanation: 'Think of LEFT JOIN as "Keep everyone on the left side no matter what". If a user never bought anything, their name still appears with NULL order columns.'
      },
      {
        id: 'sql-q3',
        question: 'What is the logical execution order of clauses in an SQL query engine?',
        options: [
          'SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY',
          'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT',
          'ORDER BY -> LIMIT -> WHERE -> FROM -> SELECT',
          'WHERE -> SELECT -> FROM -> ORDER BY'
        ],
        correctIndex: 1,
        simpleExplanation: 'SQL engines first locate the source tables (FROM), filter raw rows (WHERE), group rows (GROUP BY), filter groups (HAVING), extract desired columns (SELECT), sort (ORDER BY), and finally cap results (LIMIT).'
      },
      {
        id: 'sql-q4',
        question: 'What is a B-Tree Database Index, and what is its primary trade-off?',
        options: [
          'It encrypts passwords but makes reading data impossible.',
          'It is a sorted tree structure that makes SELECT lookups run in fast O(log N) time, but slows down INSERT/UPDATE writes because the index tree must be updated.',
          'It is a backup hard drive stored in another building.',
          'It automatically converts PostgreSQL into MongoDB.'
        ],
        correctIndex: 1,
        simpleExplanation: 'An index is like the index at the back of a textbook: finding information takes seconds (O(log N)), but every time you add a new page (INSERT/UPDATE), you must update the index!'
      },
      {
        id: 'sql-q5',
        question: 'What does the "A" in the database acronym ACID stand for?',
        options: [
          'Automatic (runs without electricity)',
          'Algorithmic (uses artificial intelligence)',
          'Atomicity (all operations in a transaction succeed completely, or the entire transaction is rolled back with zero changes)',
          'Asynchronous (executes in the background)'
        ],
        correctIndex: 2,
        simpleExplanation: 'Atomicity means "All-or-Nothing". If you transfer $100 from checking to savings, and the server crashes after debiting checking, the debit is rolled back so money never vanishes into thin air.'
      },
      {
        id: 'sql-q6',
        question: 'Which query correctly counts the number of orders per user and shows only users with at least 5 orders?',
        codeSnippet: `SELECT user_id, COUNT(*) AS total_orders
FROM orders
GROUP BY user_id
???`,
        options: [
          'WHERE total_orders >= 5',
          'HAVING COUNT(*) >= 5',
          'ORDER BY 5',
          'LIMIT 5'
        ],
        correctIndex: 1,
        simpleExplanation: 'Because COUNT(*) is an aggregate metric calculated across grouped rows, it must be filtered using the HAVING clause, not WHERE!'
      },
      {
        id: 'sql-q7',
        question: 'What is SQL Injection, and how do backend engineers completely eliminate it?',
        options: [
          'A virus on USB sticks; fixed by unplugging the router.',
          'Attackers injecting malicious SQL commands into user inputs; eliminated by using Parameterized Prepared Statements rather than string concatenation.',
          'Running out of disk space on the database; fixed by deleting old tables.',
          'Slow queries; fixed by adding more RAM.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Never concatenate raw strings like `f"SELECT * FROM users WHERE name = \'{input}\'"`! Parameterized queries pass user input as pure data parameters, preventing the database parser from executing it as code.'
      },
      {
        id: 'sql-q8',
        question: 'What is a "Composite Index" on (department_id, salary), and how does the Leftmost Prefix rule apply?',
        options: [
          'It can only be used if you query salary first.',
          'It accelerates queries filtering on department_id alone, or department_id AND salary together, but CANNOT accelerate queries filtering on salary alone without department_id.',
          'It doubles the size of every table row.',
          'It only works on Sundays.'
        ],
        correctIndex: 1,
        simpleExplanation: 'A phone book is indexed by (Last Name, First Name). You can search for "Smith" easily, or "Smith, John", but searching for "John" with no last name requires scanning the entire book!'
      },
      {
        id: 'sql-q9',
        question: 'What does the command "EXPLAIN ANALYZE" do in PostgreSQL?',
        options: [
          'It translates SQL queries into English poetry.',
          'It executes the query and prints the exact execution plan with actual runtime node times, memory usage, and scan types (Seq Scan vs Index Scan).',
          'It drops all indexes from the table.',
          'It shuts down the PostgreSQL daemon.'
        ],
        correctIndex: 1,
        simpleExplanation: 'EXPLAIN ANALYZE is the ultimate query diagnostic tool. It shows whether the database performed an expensive full table sequential scan (Seq Scan) or leveraged your B-tree index (Index Scan).'
      },
      {
        id: 'sql-q10',
        question: 'What is the purpose of database Normalization (1NF, 2NF, 3NF)?',
        options: [
          'To make all tables have exactly 100 rows.',
          'To structure relational schemas to eliminate data redundancy, prevent update anomalies, and enforce data integrity.',
          'To convert text data into uppercase.',
          'To speed up full table scans by deleting foreign keys.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Normalization organizes data so each fact is stored in exactly ONE place. If a user changes their address, you update one row instead of 500 duplicate order rows!'
      }
    ]
  },
  {
    id: 'cert-linux-cloud',
    title: 'Linux & DevOps Cloud Practitioner',
    subtitle: 'Production Shell Navigation, Process Control & Containerization Credential',
    credentialTitle: 'Certified Linux & DevOps Cloud Practitioner (CLCP)',
    badgeName: 'Terminal Overlord Badge',
    trackId: 'track-linux-git',
    icon: 'Cpu',
    passingScorePercent: 75,
    certificateDescription: 'Validates production competency in POSIX shell scripting, Unix pipelines, standard I/O redirection, process signaling, Linux file permissions, and Docker container architecture.',
    skillsMeasured: [
      'POSIX filesystem navigation (pwd, cd, ls, find)',
      'Standard streams (stdin 0, stdout 1, stderr 2) & redirection',
      'Unix pipelines (|) combining grep, awk, sort, and uniq',
      'Process lifecycle, PID inspection, and signals (SIGTERM 15, SIGKILL 9)',
      'Linux permission octals (chmod 755, chown, user/group/others)',
      'Container virtualization vs Virtual Machines',
      'Dockerfile layer caching & multi-stage builds'
    ],
    questions: [
      {
        id: 'lnx-q1',
        question: 'What is the difference between Linux signal SIGTERM (signal 15) and SIGKILL (signal 9)?',
        codeSnippet: `kill -15 1248
kill -9 1248`,
        options: [
          'SIGTERM immediately cuts electricity to the computer.',
          'SIGTERM politely requests a process to terminate, giving it time to close database connections and finish active requests; SIGKILL cannot be intercepted and forcibly halts the process immediately.',
          'SIGKILL restarts the process in debug mode.',
          'SIGTERM only works on Python programs.'
        ],
        correctIndex: 1,
        simpleExplanation: 'SIGTERM is graceful: the program catches it, finishes saving work, and exits cleanly. SIGKILL is the kernel executioner: it terminates the process instantly without cleanup.'
      },
      {
        id: 'lnx-q2',
        question: 'How do you redirect both standard output (stdout) and standard error (stderr) to a log file in bash?',
        options: [
          'command > app.log 2>&1',
          'command << app.log',
          'command | app.log',
          'command && 2> app.log'
        ],
        correctIndex: 0,
        simpleExplanation: '`> app.log` redirects file descriptor 1 (stdout) into app.log, and `2>&1` redirects file descriptor 2 (stderr) into file descriptor 1 (stdout), sending all messages into the file.'
      },
      {
        id: 'lnx-q3',
        question: 'Which pipeline correctly counts the top 5 most frequent error IP addresses in an access.log file?',
        codeSnippet: `cat access.log | grep "ERROR" | ???`,
        options: [
          'sort | uniq -c | sort -rn | head -n 5',
          'head -n 5 | delete',
          'uniq | count | tail -n 5',
          'wc -l | head 5'
        ],
        correctIndex: 0,
        simpleExplanation: 'In Unix, `uniq -c` requires sorted input! So you run `sort` to cluster duplicates, `uniq -c` to count occurrences, `sort -rn` to sort numerically descending, and `head -n 5` to show top 5.'
      },
      {
        id: 'lnx-q4',
        question: 'What do the permissions "chmod 755 server.sh" grant to User, Group, and Others?',
        options: [
          'Everyone has full read, write, and execute permissions.',
          'User has Read/Write/Execute (7 = 4+2+1); Group has Read/Execute (5 = 4+1); Others have Read/Execute (5 = 4+1).',
          'Nobody can execute the file.',
          'The file is encrypted with a 755-bit key.'
        ],
        correctIndex: 1,
        simpleExplanation: 'In Linux permissions: Read = 4, Write = 2, Execute = 1. Therefore, 7 = 4+2+1 (rwx), and 5 = 4+1 (r-x). The owner can edit, while everyone else can only read and execute.'
      },
      {
        id: 'lnx-q5',
        question: 'Why do production Dockerfiles leverage Multi-Stage Builds?',
        codeSnippet: `FROM golang:1.22 AS builder
RUN go build -o /app/server
FROM alpine:latest
COPY --from=builder /app/server /server
CMD ["/server"]`,
        options: [
          'To generate two different websites at the same time.',
          'To separate the heavy compiler SDK tools from the final production runtime container, producing lightweight (~20MB vs ~1GB) secure images.',
          'Because Docker requires two stages for commercial licenses.',
          'To slow down container deployment.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Multi-stage builds leave compiler toolchains, header files, and build bloat behind in the build stage, copying only the final lean compiled binary into a minimal production image.'
      },
      {
        id: 'lnx-q6',
        question: 'What Linux kernel features provide the foundation for Docker containers?',
        options: [
          'Namespaces (isolated views of PID, network, mounts) and cgroups (resource limits on CPU, memory, I/O).',
          'Hypervisors and virtual BIOS hardware emulators.',
          'Python virtual environments and pip.',
          'Swap partitions and USB drivers.'
        ],
        correctIndex: 0,
        simpleExplanation: 'Containers are not full virtual machines! They are ordinary Linux processes isolated by kernel Namespaces (what the process can see) and constrained by Control Groups / cgroups (how much CPU/RAM it can use).'
      },
      {
        id: 'lnx-q7',
        question: 'What does the Unix command "tail -f /var/log/nginx/error.log" do?',
        options: [
          'Deletes the bottom of the log file.',
          'Prints the last lines and remains running, actively streaming new lines to the screen in real-time as they are written.',
          'Sends the file to an email address.',
          'Counts the characters in the file.'
        ],
        correctIndex: 1,
        simpleExplanation: 'The `-f` flag stands for "follow". It keeps the terminal connected and live-streams incoming log lines as backend traffic hits the server.'
      },
      {
        id: 'lnx-q8',
        question: 'What is the purpose of an exit code (return code) in Linux commands ($?)?',
        options: [
          'Exit code 0 indicates success; any non-zero exit code (1-255) indicates an error or failure.',
          'Exit code 0 means the computer crashed.',
          'Exit codes represent the amount of RAM consumed in megabytes.',
          'Exit codes are only used in game development.'
        ],
        correctIndex: 0,
        simpleExplanation: 'In Unix standard conventions: exit code 0 represents clean success (`true`). Any number from 1 to 255 signals an error, allowing shell scripts and CI/CD pipelines to fail fast.'
      },
      {
        id: 'lnx-q9',
        question: 'Why should backend applications run as non-root users inside Docker containers?',
        options: [
          'Non-root users get free internet bandwidth.',
          'To adhere to the Principle of Least Privilege and minimize blast radius if an attacker exploits a remote code execution vulnerability.',
          'Because Docker cannot run root users.',
          'Root users cannot read environment variables.'
        ],
        correctIndex: 1,
        simpleExplanation: 'If an attacker breaks through your web server while running as root inside a container, they might break out of container isolation with root privileges on the host server!'
      },
      {
        id: 'lnx-q10',
        question: 'What does the operator "&&" vs ";" mean when executing sequential shell commands?',
        codeSnippet: `build && test
build ; test`,
        options: [
          'They do the exact same thing.',
          '"build && test" only runs test if build succeeds (exit code 0); "build ; test" runs test regardless of whether build failed.',
          '"&&" runs both commands backwards.',
          'Neither command will run.'
        ],
        correctIndex: 1,
        simpleExplanation: '`&&` is short-circuit boolean AND: the second command only executes if the first command returned exit code 0. Semicolon `;` unconditionally runs the second command regardless of errors.'
      }
    ]
  },
  {
    id: 'cert-golang-concurrency',
    title: 'Go High-Concurrency Systems Practitioner',
    subtitle: 'Goroutines, Channels & Scalable Microservices Credential',
    credentialTitle: 'Certified Go High-Concurrency Systems Engineer (CGSE)',
    badgeName: 'Grand Concurrency Weaver Badge',
    trackId: 'track-golang',
    icon: 'Cpu',
    passingScorePercent: 75,
    certificateDescription: 'Demonstrates deep mastery of the Go runtime: goroutine scheduling, channel synchronization, pointer receivers, mutex locks, and context cancellation.',
    skillsMeasured: [
      'Value receivers vs Pointer receivers & memory mutation',
      'Goroutines vs OS Threads & Go M:N runtime scheduler',
      'Buffered vs Unbuffered Channels & Deadlock avoidance',
      'The select statement & multiplexing channel communication',
      'Sync.WaitGroup & sync.Mutex thread coordination',
      'Context package (context.WithTimeout) for request deadlines'
    ],
    questions: [
      {
        id: 'go-q1',
        question: 'In Go, what does placing the "go" keyword in front of a function call do?',
        codeSnippet: `go processOrder(id)`,
        options: [
          'It repeats the function 100 times.',
          'It launches the function concurrently in the background as a lightweight goroutine managed by the Go runtime scheduler.',
          'It pauses the entire program until finished.',
          'It translates the function into Python.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Putting "go" before a function tells Go: "Run this concurrently in the background right now on a lightweight goroutine while I continue doing other work!"'
      },
      {
        id: 'go-q2',
        question: 'Why do we use Pointer Receivers (func (u *User) SetName) in Go instead of Value Receivers (func (u User))?',
        codeSnippet: `func (u *User) SetName(name string) {
    u.Name = name
}`,
        options: [
          'To mutate the original User instance in memory rather than operating on a discardable copy, and to prevent expensive memory allocations.',
          'Because Go forbids regular value receivers.',
          'To make the code run slower for debugging.',
          'To print the user to the terminal.'
        ],
        correctIndex: 0,
        simpleExplanation: 'Without the pointer (*), Go passes structs by value (making a complete duplicate in memory). A pointer points directly to the original struct so changes persist!'
      },
      {
        id: 'go-q3',
        question: 'What is the golden motto of Go concurrency?',
        options: [
          '"Always share memory using complex locks and global variables."',
          '"Never use more than 1 CPU core."',
          '"Do not communicate by sharing memory; instead, share memory by communicating (using channels)."',
          '"Only run programs at night."'
        ],
        correctIndex: 2,
        simpleExplanation: 'This is the foundational philosophy of Go! Instead of multiple threads fighting over shared mutable memory with fragile locks, they communicate by safely passing messages through channels.'
      },
      {
        id: 'go-q4',
        question: 'What is the operational behavior of an Unbuffered Channel in Go (make(chan int))?',
        options: [
          'It can store an infinite amount of integers.',
          'A sender blocks until a receiver is ready to receive the value, synchronizing both goroutines in a synchronous rendezvous handshake.',
          'Values sent are immediately discarded.',
          'It only works with strings.'
        ],
        correctIndex: 1,
        simpleExplanation: 'An unbuffered channel has zero storage capacity. The sender holds up execution until the receiver reaches out to take the item, guaranteeing lockstep synchronization.'
      },
      {
        id: 'go-q5',
        question: 'What happens when a goroutine tries to read from an empty unbuffered channel with no other goroutines running?',
        codeSnippet: `func main() {
    ch := make(chan int)
    val := <-ch
}`,
        options: [
          'It returns 0 immediately.',
          'The Go runtime detects that all goroutines are asleep and panics with: "fatal error: all goroutines are asleep - deadlock!"',
          'It waits 5 seconds and exits cleanly.',
          'It converts the channel into a buffered channel.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Deadlock detection! Because main is blocked waiting on `<-ch`, and no background goroutine exists to send into `ch`, the Go runtime panics to alert you of the deadlock.'
      },
      {
        id: 'go-q6',
        question: 'What is the purpose of the "select" statement in Go?',
        codeSnippet: `select {
case msg := <-ch1:
    handleMsg(msg)
case <-time.After(2 * time.Second):
    handleTimeout()
}`,
        options: [
          'It selects a random number from 1 to 10.',
          'It allows a goroutine to wait on multiple communication channel operations simultaneously, executing the first case that is ready.',
          'It deletes unused channels from memory.',
          'It selects the fastest database query.'
        ],
        correctIndex: 1,
        simpleExplanation: '`select` is like a `switch` statement specifically for channels. It blocks until one of its channel cases can proceed, making it ideal for timeouts and multiplexing.'
      },
      {
        id: 'go-q7',
        question: 'Why must you pass a pointer to sync.WaitGroup when passing it into another function?',
        codeSnippet: `var wg sync.WaitGroup
go worker(&wg)`,
        options: [
          'Because sync.WaitGroup contains an internal counter that must not be copied; copying it creates a separate instance that never resolves.',
          'Because Go forbids passing structs into functions.',
          'It is purely an aesthetic convention with no functional difference.',
          'To encrypt the wait group.'
        ],
        correctIndex: 0,
        simpleExplanation: 'If you pass `wg` by value, the worker receives a copy of the WaitGroup. When the worker calls `wg.Done()`, it decrements the copy while the main function waits on the original forever!'
      },
      {
        id: 'go-q8',
        question: 'What is the role of Go\'s context.Context package in production backend APIs?',
        options: [
          'It writes CSS code for web browsers.',
          'It carries deadlines, cancellation signals, and request-scoped metadata across API boundaries and goroutine worker pools.',
          'It acts as an alternative to MySQL.',
          'It counts how many lines of code are in a file.'
        ],
        correctIndex: 1,
        simpleExplanation: 'When a web client cancels an HTTP request or disconnects, the parent context cancels, notifying all downstream database queries and goroutines to abort and free server resources.'
      },
      {
        id: 'go-q9',
        question: 'How much initial stack memory does a Go goroutine consume compared to a standard OS thread?',
        options: [
          'Goroutines require ~100MB; OS threads require ~1KB.',
          'Goroutines start at just ~2KB of dynamically resizable stack memory, whereas OS threads typically allocate 1MB to 8MB.',
          'They consume identical memory.',
          'Goroutines consume zero bytes of memory.'
        ],
        correctIndex: 1,
        simpleExplanation: 'This is why Go can effortlessly run 100,000+ goroutines concurrently on a laptop! A standard OS thread requires ~2MB, while a goroutine starts at just ~2KB and grows on demand.'
      },
      {
        id: 'go-q10',
        question: 'What tool does Go provide to detect data race bugs during development and testing?',
        options: [
          'go build -fast',
          'go test -race / go run -race',
          'go clean -all',
          'go format -race'
        ],
        correctIndex: 1,
        simpleExplanation: 'The built-in Race Detector (`-race`) instruments memory accesses at compile time, tracking concurrent read/write operations on unsynchronized variables and reporting exact file lines.'
      }
    ]
  },
  {
    id: 'cert-master-backend',
    title: 'Master Backend Architect',
    subtitle: 'Comprehensive Capstone Credential for Distributed Systems',
    credentialTitle: 'Master Backend Systems Architect (CMBA)',
    badgeName: 'Grand Archmage of Distributed Systems',
    trackId: 'track-architecture',
    icon: 'Layers',
    passingScorePercent: 80,
    certificateDescription: 'Demonstrates end-to-end mastery of backend engineering: clean code architecture, database optimization, caching tiers, load balancers, and resilient system design.',
    skillsMeasured: [
      'Vertical vs Horizontal scaling trade-offs & bottlenecks',
      'Layer 4 vs Layer 7 Load Balancing & balancing algorithms',
      'In-Memory Caching (LRU, Cache Stampede, Write-through vs Write-back)',
      'CAP Theorem trade-offs & PACELC consistency models',
      'Database Sharding, Consistent Hashing & partition keys',
      'Circuit breakers, rate limiting & graceful degradation'
    ],
    questions: [
      {
        id: 'mast-q1',
        question: 'What is the primary difference between Vertical Scaling and Horizontal Scaling?',
        options: [
          'Vertical scaling means hiring taller developers.',
          'Vertical scaling upgrades a single server with more CPU/RAM (bounded by hardware limits and single point of failure); Horizontal scaling adds multiple server nodes in parallel behind a load balancer.',
          'Horizontal scaling is only used for mobile apps.',
          'There is no functional difference.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Vertical scaling is like buying a larger truck (which eventually hits a physical ceiling). Horizontal scaling is deploying a fleet of 50 trucks that distribute deliveries across the network!'
      },
      {
        id: 'mast-q2',
        question: 'Why do high-traffic systems place a Redis cache in front of their SQL database?',
        options: [
          'Because Redis stores hot data in ultra-fast RAM, answering reads in sub-millisecond latencies and protecting the disk database from traffic exhaustion.',
          'To hide the database from the government.',
          'Redis is cheaper than buying electricity.',
          'SQL databases cannot store numbers.'
        ],
        correctIndex: 0,
        simpleExplanation: 'RAM memory is orders of magnitude faster than NVMe disk! A Redis cache intercepts 95%+ of read traffic, ensuring relational databases only process writes and cache misses.'
      },
      {
        id: 'mast-q3',
        question: 'What is a "Circuit Breaker" pattern in backend microservices?',
        options: [
          'A physical switch on the server rack that flips during power surges.',
          'A code tool that speeds up Python.',
          'Software logic that automatically stops sending requests to a failing downstream service to prevent cascading failures across the entire system.',
          'A way to delete slow users.'
        ],
        correctIndex: 2,
        simpleExplanation: 'Just like the breaker box in a house cuts power before wires ignite, a software circuit breaker trips open after repeated errors, immediately failing fast and returning cached fallbacks.'
      },
      {
        id: 'mast-q4',
        question: 'What is a "Deadlock" in concurrent backend systems?',
        options: [
          'When a computer permanently runs out of hard drive space.',
          'When an internet cable is unplugged.',
          'When a password is forgotten.',
          'When two or more processes each hold a resource lock the other needs, causing all involved threads to wait forever in an unmoving freeze.'
        ],
        correctIndex: 3,
        simpleExplanation: 'Thread A holds Lock 1 and requests Lock 2. Concurrently, Thread B holds Lock 2 and requests Lock 1. Neither can proceed, resulting in an indefinite deadlock freeze.'
      },
      {
        id: 'mast-q5',
        question: 'According to the CAP Theorem, what can a distributed data store guarantee during a network partition (P)?',
        options: [
          'Both 100% Consistency and 100% Availability simultaneously.',
          'It must choose between Consistency (returning errors or waiting for sync) OR Availability (returning local stale data without waiting for the partition to heal).',
          'It guarantees zero latency and infinite storage.',
          'Network partitions never happen in modern clouds.'
        ],
        correctIndex: 1,
        simpleExplanation: 'When network wires between datacenters fail (Partition), you must choose: either reject writes/reads until synchronized (Consistency / CP), or accept writes/reads independently (Availability / AP).'
      },
      {
        id: 'mast-q6',
        question: 'What is "Consistent Hashing", and why is it preferred over simple modulo hashing (hash(key) % N) for distributed cache clusters?',
        options: [
          'Consistent hashing prevents cache servers from overheating.',
          'When a cache node is added or removed, modulo hashing remaps almost all keys across the cluster; consistent hashing on a ring only remaps K/N keys, preventing massive cache stampedes.',
          'Consistent hashing converts data into alphabetical order.',
          'Modulo hashing is faster and always preferred in modern production.'
        ],
        correctIndex: 1,
        simpleExplanation: 'In modulo hashing, changing N from 10 to 11 breaks 90%+ of cache mappings, crashing the underlying database. With consistent hashing on a ring, only 1/Nth of keys need to move!'
      },
      {
        id: 'mast-q7',
        question: 'What is a "Cache Stampede" (also known as the dog-piling effect)?',
        options: [
          'When millions of computers connect to a cache at the exact same millisecond.',
          'When a popular cache key expires, and thousands of concurrent requests all miss the cache simultaneously, hitting the backend database at once and crashing it.',
          'A hardware failure in memory chips.',
          'When a cache deletes all keys randomly.'
        ],
        correctIndex: 1,
        simpleExplanation: 'If the homepage banner expires at 12:00:00, 10,000 incoming requests all see a cache miss and each query the database simultaneously! We solve this using mutex locking (single-flight) or probabilistic early expiration.'
      },
      {
        id: 'mast-q8',
        question: 'What is an "Idempotent" API endpoint, and why is it essential for payment and checkout systems?',
        options: [
          'An endpoint that only accepts cryptocurrency.',
          'An endpoint that produces the exact same system state whether called once or multiple times with the same idempotency key (preventing duplicate customer charges).',
          'An endpoint that executes without passwords.',
          'An endpoint that returns random responses.'
        ],
        correctIndex: 1,
        simpleExplanation: 'Network requests can drop or time out after the server charged the credit card. With idempotency keys (UUIDs), if the client retries the request, the server recognizes the key and does not charge twice!'
      },
      {
        id: 'mast-q9',
        question: 'What is the operational difference between Layer 4 (L4) and Layer 7 (L7) Load Balancers?',
        options: [
          'L4 load balancers only work on Mondays.',
          'L4 routes traffic based on TCP/UDP IP and port headers without inspecting payload content; L7 inspects HTTP/HTTPS headers, cookies, URL paths, and JSON payloads for intelligent routing.',
          'L7 load balancers cannot handle internet traffic.',
          'L4 load balancers are always written in Python.'
        ],
        correctIndex: 1,
        simpleExplanation: 'L4 operates at the transport layer (ultra-fast packet forwarding). L7 operates at the application layer (can route `/api/billing` to billing servers and `/images/*` to media clusters).'
      },
      {
        id: 'mast-q10',
        question: 'In an O(1) Least Recently Used (LRU) Cache, why is a Doubly Linked List paired with a Hash Map?',
        options: [
          'Because computers require two data structures for every program.',
          'The Hash Map provides O(1) key-to-node lookups, while the Doubly Linked List allows O(1) removal and insertion of nodes at the head (most recent) and tail (least recent).',
          'The Doubly Linked List sorts strings alphabetically.',
          'It allows data to be stored on disk instead of RAM.'
        ],
        correctIndex: 1,
        simpleExplanation: 'An array requires O(N) shifts to move an item to the front! A Doubly Linked List moves nodes to the head in O(1) by simply rewiring 4 pointers (prev and next).'
      }
    ]
  }
];

export const certificationStudyGuides: Record<string, CertStudyGuide> = {
  'cert-python-foundations': {
    examId: 'cert-python-foundations',
    title: 'Python Backend Associate (CPBA)',
    credentialTitle: 'Certified Python Backend Associate',
    examDurationMinutes: 30,
    totalQuestions: 10,
    passingScore: 75,
    domains: [
      {
        name: 'Domain 1: Execution Lifecycle & Primitive Data Types',
        weight: 25,
        coreObjectives: [
          'Understand print output vs function return values',
          'Variables as named memory references',
          'String formatting with f-strings and type coercion (int, float, str)'
        ],
        examTips: 'Remember: return hands the value back to the caller; print only displays text on the screen!'
      },
      {
        name: 'Domain 2: Control Flow & Boolean Logic',
        weight: 25,
        coreObjectives: [
          'If, elif, else branch execution order',
          'Comparison operators (==, !=, >, <, >=, <=) and boolean truthiness',
          'Iterative loops (for item in list) and range boundaries'
        ],
        examTips: 'Zero (0), empty string (""), empty list ([]), and None are all False in Python logic gates.'
      },
      {
        name: 'Domain 3: Collections & Key-Value Dictionaries',
        weight: 25,
        coreObjectives: [
          'List manipulation with .append() and index addressing',
          'Dictionaries for structured JSON-like record handling',
          'Safe extraction with .get(key, default) to prevent KeyErrors'
        ],
        examTips: 'Always prefer dict.get(k, default) over dict[k] in production APIs to prevent crashing on missing fields.'
      },
      {
        name: 'Domain 4: Object-Oriented Modeling & Defensive Error Handling',
        weight: 25,
        coreObjectives: [
          'Classes, __init__ constructor, and self instance scoping',
          'Encapsulating backend state and methods',
          'try/except defensive blocks for graceful 4xx/5xx handling'
        ],
        examTips: 'self is the first argument in every instance method; it points directly to the current object in memory.'
      }
    ],
    cramNotes: [
      {
        topic: 'Function Returns',
        summary: 'A function terminates execution immediately when executing a return statement.',
        codeSnippet: `def calc_tax(price):\n    return price * 0.1`
      },
      {
        topic: 'Safe Dictionary Lookups',
        summary: 'Never use dict[key] on untrusted user JSON. Use .get() to supply a fallback.',
        codeSnippet: `role = user_payload.get("role", "member")`
      },
      {
        topic: 'OOP Class Constructor',
        summary: '__init__ initializes state upon instantiation.',
        codeSnippet: `class Worker:\n    def __init__(self, id):\n        self.id = id`
      },
      {
        topic: 'Defensive Exception Handling',
        summary: 'Wrap network or parsing operations in try/except to prevent server thread crashes.',
        codeSnippet: `try:\n    val = int(user_str)\nexcept ValueError:\n    val = 0`
      }
    ],
    vendorEquivalents: [
      {
        provider: 'Python Institute',
        certName: 'PCAP™ – Certified Associate in Python Programming',
        overlap: '100% syllabus alignment across syntax, collections, OOP, and exceptions.'
      },
      {
        provider: 'AWS',
        certName: 'AWS Certified Cloud Practitioner (Compute Domain)',
        overlap: 'Core scripting and stateless microservice logic mapped to Lambda handlers.'
      }
    ]
  },
  'cert-sql-specialist': {
    examId: 'cert-sql-specialist',
    title: 'SQL & Database Specialist (CSDS)',
    credentialTitle: 'Certified SQL & Database Specialist',
    examDurationMinutes: 30,
    totalQuestions: 10,
    passingScore: 75,
    domains: [
      {
        name: 'Domain 1: Query Syntax & Clause Order of Execution',
        weight: 25,
        coreObjectives: [
          'SELECT column projections and expressions',
          'WHERE row-level boolean filtering',
          'Logical query execution pipeline: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT'
        ],
        examTips: 'WHERE filters rows before aggregation; HAVING filters groups after aggregation!'
      },
      {
        name: 'Domain 2: Relational Joins & Set Algebra',
        weight: 25,
        coreObjectives: [
          'INNER JOIN for matching intersections',
          'LEFT OUTER JOIN for preserving primary left-table rows with NULL fallbacks',
          'ON clause join predicates vs WHERE clause post-filters'
        ],
        examTips: 'If an outer join contains a WHERE condition on the right table, it may accidentally behave like an INNER JOIN unless the condition handles NULL.'
      },
      {
        name: 'Domain 3: Aggregations & Analytical Grouping',
        weight: 25,
        coreObjectives: [
          'COUNT(*), SUM(), AVG(), MIN(), MAX() functions',
          'GROUP BY clause requirements on non-aggregated projection columns',
          'HAVING criteria filtering grouped metrics'
        ],
        examTips: 'Any non-aggregate column in your SELECT list MUST appear in the GROUP BY clause.'
      },
      {
        name: 'Domain 4: Performance, Indexes & ACID Transactions',
        weight: 25,
        coreObjectives: [
          'B-Tree indexes and the Leftmost Prefix rule on composite keys',
          'EXPLAIN ANALYZE for detecting Sequential Scans',
          'ACID transaction guarantees and isolation levels against dirty reads'
        ],
        examTips: 'Indexes speed up read queries O(log N) but impose write overhead on INSERT, UPDATE, and DELETE.'
      }
    ],
    cramNotes: [
      {
        topic: 'Query Execution Order',
        summary: 'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT',
        codeSnippet: `SELECT dept, AVG(sal)\nFROM emps\nWHERE active = true\nGROUP BY dept\nHAVING AVG(sal) > 50000`
      },
      {
        topic: 'LEFT JOIN Rule',
        summary: 'Preserves every row from table A. Unmatched columns from table B return NULL.',
        codeSnippet: `SELECT u.name, o.id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id`
      },
      {
        topic: 'B-Tree Indexing Rule',
        summary: 'Composite index on (A, B) supports queries on A alone, and (A and B), but NOT on B alone.',
        codeSnippet: `CREATE INDEX idx_user_status ON users (tenant_id, status);`
      },
      {
        topic: 'ACID Guarantees',
        summary: 'Atomicity (All-or-Nothing), Consistency (Rules valid), Isolation (Independent), Durability (Persisted on disk).'
      }
    ],
    vendorEquivalents: [
      {
        provider: 'PostgreSQL Professional',
        certName: 'PostgreSQL Certified Associate / Professional',
        overlap: '95% alignment on SQL syntax, joins, EXPLAIN execution plans, and transaction isolation.'
      },
      {
        provider: 'Oracle',
        certName: 'Oracle Database SQL Certified Associate (1Z0-071)',
        overlap: '100% alignment on ANSI SQL standards, group functions, and multi-table joins.'
      }
    ]
  },
  'cert-linux-cloud': {
    examId: 'cert-linux-cloud',
    title: 'Linux & DevOps Cloud Practitioner (CLCP)',
    credentialTitle: 'Certified Linux & DevOps Cloud Practitioner',
    examDurationMinutes: 30,
    totalQuestions: 10,
    passingScore: 75,
    domains: [
      {
        name: 'Domain 1: Shell Navigation & Standard I/O Streams',
        weight: 25,
        coreObjectives: [
          'Filesystem directory hierarchies (/var, /etc, /usr, /tmp)',
          'Redirection operators (>, >>, <, 2>&1)',
          'Standard file descriptors: stdin (0), stdout (1), stderr (2)'
        ],
        examTips: 'Use `2>&1` to merge error outputs into standard output logs.'
      },
      {
        name: 'Domain 2: Unix Pipelines & Text Wrangling',
        weight: 25,
        coreObjectives: [
          'Chaining programs with pipes (|)',
          'Filtering lines with grep, egrep, and regular expressions',
          'Sorting and counting with sort, uniq -c, and head/tail'
        ],
        examTips: 'Always run `sort` before `uniq -c`, because uniq only collapses adjacent matching lines!'
      },
      {
        name: 'Domain 3: Process Lifecycle & POSIX Signaling',
        weight: 25,
        coreObjectives: [
          'Process identification (PID), ps aux, and top monitoring',
          'Signals: SIGTERM (15) for graceful drain vs SIGKILL (9) for forced kill',
          'Exit codes: 0 = success, non-zero = failure ($?)'
        ],
        examTips: 'Programs cannot catch, block, or ignore SIGKILL (9). Always send SIGTERM (15) first.'
      },
      {
        name: 'Domain 4: Permissions, Containers & Security',
        weight: 25,
        coreObjectives: [
          'Octal permissions (chmod 755 = rwxr-xr-x)',
          'Docker containerization via Linux Namespaces and cgroups',
          'Multi-stage builds and non-root least-privilege security'
        ],
        examTips: 'Read = 4, Write = 2, Execute = 1. Add them up for User, Group, and Others!'
      }
    ],
    cramNotes: [
      {
        topic: 'Octal Permission Calculation',
        summary: 'Read = 4, Write = 2, Execute = 1. 755 means Owner: 7 (rwx), Group: 5 (r-x), Others: 5 (r-x).',
        codeSnippet: `chmod 755 run.sh`
      },
      {
        topic: 'Graceful Process Drain',
        summary: 'SIGTERM (15) allows web server to close connections cleanly before exiting.',
        codeSnippet: `kill -15 <pid>`
      },
      {
        topic: 'Log Pipeline Extraction',
        summary: 'Extract top 10 unique IP addresses from web logs.',
        codeSnippet: `cat access.log | grep "500" | awk '{print $1}' | sort | uniq -c | sort -rn | head -n 10`
      },
      {
        topic: 'Docker Multi-Stage Build',
        summary: 'Compile binary in builder stage, copy only the artifact to minimal runtime.',
        codeSnippet: `FROM golang:1.22 AS b\nRUN go build -o /app\nFROM alpine\nCOPY --from=b /app /app`
      }
    ],
    vendorEquivalents: [
      {
        provider: 'Linux Foundation',
        certName: 'LFCS – Linux Foundation Certified System Administrator',
        overlap: 'Core shell scripting, process signaling, text stream pipelines, and file permissions.'
      },
      {
        provider: 'CompTIA',
        certName: 'CompTIA Linux+ (XK0-005)',
        overlap: 'Terminal navigation, system processes, container basics, and permissions.'
      }
    ]
  },
  'cert-golang-concurrency': {
    examId: 'cert-golang-concurrency',
    title: 'Go High-Concurrency Systems Engineer (CGSE)',
    credentialTitle: 'Certified Go High-Concurrency Systems Engineer',
    examDurationMinutes: 30,
    totalQuestions: 10,
    passingScore: 75,
    domains: [
      {
        name: 'Domain 1: Go Type System & Pointer Receivers',
        weight: 25,
        coreObjectives: [
          'Struct declarations and value vs pointer method receivers',
          'Memory mutation without heap allocation bloat',
          'Nil pointer checks and defensive panic guards'
        ],
        examTips: 'If any method of a struct needs a pointer receiver to mutate data, all related methods should use pointer receivers for consistency.'
      },
      {
        name: 'Domain 2: Goroutines & Runtime Scheduling',
        weight: 25,
        coreObjectives: [
          'Lightweight 2KB goroutine stacks vs 2MB OS threads',
          'M:N Go scheduler multiplexing goroutines onto OS threads',
          'Non-blocking concurrency with the "go" keyword'
        ],
        examTips: 'Goroutines have dynamically resizable stacks that start at ~2KB and grow automatically.'
      },
      {
        name: 'Domain 3: Channels & Synchronization Primitives',
        weight: 25,
        coreObjectives: [
          'Unbuffered channels for synchronous rendezvous handshakes',
          'Buffered channels for decoupled worker queues',
          'The select statement for multiplexing and timeout handling'
        ],
        examTips: 'Sending to or receiving from a nil channel blocks forever. Closing a closed channel panics!'
      },
      {
        name: 'Domain 4: Coordination, Context & Race Detection',
        weight: 25,
        coreObjectives: [
          'sync.WaitGroup counter coordination (Add, Done, Wait)',
          'context.WithTimeout and context.WithCancel for request lifetimes',
          'The Go Race Detector (-race flag) for catching race conditions'
        ],
        examTips: 'Always pass sync.WaitGroup as a pointer (*sync.WaitGroup) to functions, never by value!'
      }
    ],
    cramNotes: [
      {
        topic: 'Channel Direction Syntax',
        summary: 'Arrow indicates data flow direction. ch <- x is send; x := <-ch is receive.',
        codeSnippet: `ch <- "payload" // Send\nval := <-ch    // Receive`
      },
      {
        topic: 'Select Statement with Timeout',
        summary: 'Prevents indefinite hanging on slow backend microservice calls.',
        codeSnippet: `select {\ncase res := <-ch:\n    handle(res)\ncase <-time.After(3 * time.Second):\n    timeout()\n}`
      },
      {
        topic: 'sync.WaitGroup Pattern',
        summary: 'Add before launching goroutine; call Done inside defer.',
        codeSnippet: `var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    defer wg.Done()\n    work()\n}()\nwg.Wait()`
      },
      {
        topic: 'Context Cancellation',
        summary: 'Propagates cancellation down the call tree when user disconnects.',
        codeSnippet: `ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)\ndefer cancel()`
      }
    ],
    vendorEquivalents: [
      {
        provider: 'Google Cloud',
        certName: 'Google Cloud Professional Cloud Developer',
        overlap: 'High-performance microservices, containerized Go backends, and concurrency.'
      },
      {
        provider: 'Cloud Native Computing Foundation (CNCF)',
        certName: 'Certified Kubernetes Application Developer (CKAD)',
        overlap: 'Microservice concurrency, graceful shutdowns with SIGTERM, and Go cloud-native patterns.'
      }
    ]
  },
  'cert-master-backend': {
    examId: 'cert-master-backend',
    title: 'Master Backend Systems Architect (CMBA)',
    credentialTitle: 'Master Backend Systems Architect',
    examDurationMinutes: 30,
    totalQuestions: 10,
    passingScore: 80,
    domains: [
      {
        name: 'Domain 1: Scalability & Horizontal Load Balancing',
        weight: 25,
        coreObjectives: [
          'Vertical vs Horizontal scaling architectural trade-offs',
          'L4 vs L7 Load Balancer inspection depth',
          'Balancing algorithms: Round Robin, Weighted, Least Connections'
        ],
        examTips: 'Horizontal scaling requires stateless application servers so any request can hit any worker.'
      },
      {
        name: 'Domain 2: Distributed Data Stores & CAP Theorem',
        weight: 25,
        coreObjectives: [
          'CAP theorem choices during network partitions: CP vs AP',
          'Database horizontal sharding and partition key selection',
          'Consistent Hashing rings with virtual nodes to prevent rehash storms'
        ],
        examTips: 'You cannot choose CA when a network partition happens! You must choose Consistency (CP) or Availability (AP).'
      },
      {
        name: 'Domain 3: Caching Topologies & Low Latency Design',
        weight: 25,
        coreObjectives: [
          'O(1) LRU Cache architecture (Doubly Linked List + Hash Map)',
          'Cache topologies: Cache-Aside, Write-Through, Write-Back',
          'Cache stampede mitigation using mutex locks and probabilistic early refresh'
        ],
        examTips: 'Write-Back caches offer highest write throughput but risk data loss if the cache node crashes before flushing to disk.'
      },
      {
        name: 'Domain 4: Resiliency, Fault Tolerance & Idempotency',
        weight: 25,
        coreObjectives: [
          'Circuit Breaker pattern states: Closed, Open, Half-Open',
          'Idempotency keys preventing duplicate charge transactions',
          'Deadlock detection, prevention, and lock acquisition ordering'
        ],
        examTips: 'Always acquire multiple locks in the exact same deterministic global order across all threads to prevent deadlocks.'
      }
    ],
    cramNotes: [
      {
        topic: 'Consistent Hashing Ring',
        summary: 'Maps servers and keys to a 360° hash circle. Adding a node only moves K/N keys.',
        codeSnippet: `hash(key) -> angle on 360-degree ring -> assign to next clockwise server`
      },
      {
        topic: 'LRU Cache Mechanics',
        summary: 'Hash Map gives O(1) lookup. Doubly Linked List gives O(1) head insertion and tail eviction.',
        codeSnippet: `Node: { key, val, prev, next }\nMap[key] -> *Node`
      },
      {
        topic: 'Circuit Breaker State Machine',
        summary: 'Closed (Normal traffic) -> Trip threshold reached -> Open (Fails fast instantly) -> Timeout expires -> Half-Open (Canary test requests) -> Closed.'
      },
      {
        topic: 'Idempotency Key Verification',
        summary: 'Check if idempotency UUID exists in Redis. If found, return cached response; otherwise lock, execute, and store.'
      }
    ],
    vendorEquivalents: [
      {
        provider: 'Amazon Web Services (AWS)',
        certName: 'AWS Certified Solutions Architect – Professional (SAP-C02)',
        overlap: 'High-availability architecture, multi-region routing, caching, and distributed decoupling.'
      },
      {
        provider: 'Google Cloud (GCP)',
        certName: 'Google Cloud Professional Cloud Architect (PCA)',
        overlap: 'Distributed systems design, disaster recovery, scalability, and microservices resilience.'
      }
    ]
  }
};

export interface IndustryCertMapping {
  vendor: string;
  certTitle: string;
  code: string;
  level: 'Associate' | 'Professional' | 'Specialty';
  icon: string;
  overview: string;
  bootforgeEquivalencePercentage: number;
  mappedBootforgeTracks: string[];
  keyTopicsCovered: string[];
}

export const industryCertMappings: IndustryCertMapping[] = [
  {
    vendor: 'Amazon Web Services',
    certTitle: 'AWS Certified Solutions Architect – Associate',
    code: 'SAA-C03',
    level: 'Associate',
    icon: 'Cloud',
    overview: 'Demonstrates knowledge of how to architect and deploy secure and robust applications on AWS cloud technologies.',
    bootforgeEquivalencePercentage: 92,
    mappedBootforgeTracks: ['Architecture & System Design', 'Linux, Git & Shell', 'Relational Databases & SQL'],
    keyTopicsCovered: [
      'Multi-tier web application architecture',
      'Horizontal auto-scaling & Elastic Load Balancers (ALB / NLB)',
      'Relational database replication (RDS Multi-AZ & Read Replicas)',
      'ElastiCache (Redis) caching tiers & latency reduction',
      'Decoupled architectures with message queues (SQS / SNS / Kafka)'
    ]
  },
  {
    vendor: 'Google Cloud Platform',
    certTitle: 'Google Cloud Associate Cloud Engineer',
    code: 'GCP-ACE',
    level: 'Associate',
    icon: 'CloudRain',
    overview: 'Validates ability to deploy applications, monitor operations, and manage enterprise cloud infrastructure.',
    bootforgeEquivalencePercentage: 88,
    mappedBootforgeTracks: ['Linux, Git & Shell', 'Go Systems Programming', 'Architecture & System Design'],
    keyTopicsCovered: [
      'Linux container deployment & Docker image management',
      'Google Compute Engine virtual machines and bash automation',
      'Cloud SQL management, indexes, and automated backups',
      'Traffic balancing and health checks'
    ]
  },
  {
    vendor: 'Linux Foundation',
    certTitle: 'Linux Foundation Certified System Administrator',
    code: 'LFCS',
    level: 'Associate',
    icon: 'Terminal',
    overview: 'Practical, performance-based certification for candidates solving real problems at the Linux command line.',
    bootforgeEquivalencePercentage: 95,
    mappedBootforgeTracks: ['Linux, Git & Shell', 'Zero-to-Hero Foundations'],
    keyTopicsCovered: [
      'POSIX shell scripting, variables, loops, and conditions',
      'File streams, pipes (|), and grep regex log filtering',
      'Linux process management, signals (SIGTERM, SIGKILL), and top',
      'File permissions (chmod, chown), ownership, and octal masks'
    ]
  },
  {
    vendor: 'PostgreSQL Professional',
    certTitle: 'PostgreSQL Certified Associate',
    code: 'PGCA',
    level: 'Associate',
    icon: 'Database',
    overview: 'Verifies proficiency in SQL querying, schema modeling, indexes, and relational database administration.',
    bootforgeEquivalencePercentage: 96,
    mappedBootforgeTracks: ['Relational Databases & SQL', 'Architecture & System Design'],
    keyTopicsCovered: [
      'SQL querying, filtering, subqueries, and multi-table joins',
      'Aggregate grouping, HAVING conditions, and window functions',
      'B-Tree indexes, composite indexes, and EXPLAIN ANALYZE interpretation',
      'ACID transactions, write-ahead logs (WAL), and concurrency isolation'
    ]
  },
  {
    vendor: 'CompTIA',
    certTitle: 'CompTIA Security+',
    code: 'SY0-701',
    level: 'Associate',
    icon: 'Shield',
    overview: 'Global standard for validating baseline security skills, threat modeling, and application defense.',
    bootforgeEquivalencePercentage: 85,
    mappedBootforgeTracks: ['Relational Databases & SQL', 'Zero-to-Hero Foundations', 'Architecture & System Design'],
    keyTopicsCovered: [
      'SQL Injection prevention via prepared statements',
      'Authentication standards: JWT tokens, password hashing, OAuth',
      'Principle of least privilege and Role-Based Access Control (RBAC)',
      'TLS 1.3 encryption in transit and AES-256 encryption at rest'
    ]
  }
];
