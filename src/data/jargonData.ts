export interface JargonTerm {
  term: string;
  simpleMeaning: string;
  realWorldAnalogy: string;
  example: string;
}

export const jargonDictionary: JargonTerm[] = [
  {
    term: 'Code',
    simpleMeaning: 'A list of step-by-step instructions written for a computer.',
    realWorldAnalogy: 'Like a recipe for baking cookies. If you follow each step in order, you get cookies.',
    example: 'print("Hello!")'
  },
  {
    term: 'String',
    simpleMeaning: 'Plain human text, letters, or words wrapped in quotes.',
    realWorldAnalogy: 'Words printed on a piece of paper. Quotes "" tell the computer "just read these words, don\'t treat them as a command".',
    example: '"Hello Adventurer!"'
  },
  {
    term: 'Variable',
    simpleMeaning: 'A labeled container or box that remembers a piece of information.',
    realWorldAnalogy: 'A labeled jar on your kitchen counter. If the jar is labeled "gold", and you put 50 inside, gold is 50.',
    example: 'player_hp = 100'
  },
  {
    term: 'Function',
    simpleMeaning: 'A reusable mini-machine that takes an input and gives you an answer.',
    realWorldAnalogy: 'A microwave or toaster. You put bread in, press start, and toast pops out.',
    example: 'def add_one(x):\n    return x + 1'
  },
  {
    term: 'Return',
    simpleMeaning: 'Handing the finished answer back to whoever asked for it.',
    realWorldAnalogy: 'When you ask a barista for coffee, they make it and hand it back to you.',
    example: 'return "Coffee"'
  },
  {
    term: 'If / Else',
    simpleMeaning: 'Making a decision based on whether something is True or False.',
    realWorldAnalogy: 'IF it is raining outside, take an umbrella. ELSE, wear sunglasses.',
    example: 'if hp > 0:\n    return "Alive"\nelse:\n    return "Game Over"'
  },
  {
    term: 'Boolean',
    simpleMeaning: 'A value that can only be either True or False (Yes or No).',
    realWorldAnalogy: 'A light switch that is either ON (True) or OFF (False).',
    example: 'is_door_locked = True'
  },
  {
    term: 'List / Array',
    simpleMeaning: 'An ordered backpack or shopping list that holds multiple items.',
    realWorldAnalogy: 'A grocery list with items written in order: 1. Apples, 2. Milk, 3. Bread.',
    example: 'inventory = ["Sword", "Shield", "Potion"]'
  },
  {
    term: 'Bug',
    simpleMeaning: 'A small typo or mistake in the code that confuses the computer.',
    realWorldAnalogy: 'Writing "Bake at 3500 degrees" instead of "350 degrees" in a recipe.',
    example: 'SyntaxError: missing quotes'
  },
  {
    term: 'Syntax',
    simpleMeaning: 'The spelling and grammar rules of a programming language.',
    realWorldAnalogy: 'Periods at the end of sentences and capital letters in English.',
    example: 'Colon : at the end of an if statement'
  },
  {
    term: 'Integer',
    simpleMeaning: 'A whole number without any decimal point (positive, negative, or zero).',
    realWorldAnalogy: 'Counting whole gold coins: 1, 2, 42. You cannot have 2.5 gold coins in an integer.',
    example: 'max_hp = 100'
  },
  {
    term: 'Float',
    simpleMeaning: 'A number that has fractional decimal places.',
    realWorldAnalogy: 'A kitchen measuring cup with 1.75 cups of flour or an item price of $19.99.',
    example: 'tax_rate = 0.0825'
  },
  {
    term: 'Parameter',
    simpleMeaning: 'A placeholder input variable that a function accepts when called.',
    realWorldAnalogy: 'The bread slot on a toaster: it specifies what item the toaster is ready to accept.',
    example: 'def greet(hero_name):'
  },
  {
    term: 'Algorithm',
    simpleMeaning: 'A clear step-by-step recipe to solve a specific problem or compute an answer.',
    realWorldAnalogy: 'Directions to assemble a bookshelf or sort a stack of cards from lowest to highest.',
    example: 'Binary Search or Breadth-First Search'
  },
  {
    term: 'Dictionary',
    simpleMeaning: 'A collection of labeled key-value pairs where you look up values by custom names.',
    realWorldAnalogy: 'A phone contacts book where you look up "Mom" to get her phone number.',
    example: 'stats = {"hp": 100, "mana": 50}'
  },
  {
    term: 'List',
    simpleMeaning: 'An ordered sequence of items accessible by zero-indexed numbers.',
    realWorldAnalogy: 'A numbered shelf: slot 0 holds potion, slot 1 holds sword.',
    example: 'items = ["Potion", "Shield"]'
  },
  {
    term: 'Slice',
    simpleMeaning: 'Taking a sub-section of a list or string from start index to end index.',
    realWorldAnalogy: 'Cutting out slices 2 through 4 from a loaf of bread.',
    example: 'sub_list = items[0:2]'
  },
  {
    term: 'Mutable',
    simpleMeaning: 'An object whose contents can be modified in place without making a whole new copy.',
    realWorldAnalogy: 'A dry-erase whiteboard you can wipe and rewrite, versus a printed stone tablet.',
    example: 'inventory.append("Gem")'
  },
  {
    term: 'SQL',
    simpleMeaning: 'Structured Query Language: the universal language used to talk to databases.',
    realWorldAnalogy: 'Asking the library librarian: "Find all books written after 2020 sorted by author."',
    example: 'SELECT name, age FROM users WHERE age >= 18;'
  },
  {
    term: 'Primary Key',
    simpleMeaning: 'A unique identifier for each row in a database table so rows are never mixed up.',
    realWorldAnalogy: 'Your passport number or driver\'s license ID: unique to exactly one human.',
    example: 'user_id INTEGER PRIMARY KEY'
  },
  {
    term: 'Foreign Key',
    simpleMeaning: 'A column in one table that links directly to the Primary Key of another table.',
    realWorldAnalogy: 'The customer number printed on an order receipt linking the order to the customer.',
    example: 'orders.user_id REFERENCES users(id)'
  },
  {
    term: 'Join',
    simpleMeaning: 'Combining rows from two different tables based on a related matching column.',
    realWorldAnalogy: 'Stitching a customer\'s address card next to their order invoice.',
    example: 'INNER JOIN orders ON users.id = orders.user_id'
  },
  {
    term: 'Index',
    simpleMeaning: 'A fast lookup data structure in a database that speeds up queries.',
    realWorldAnalogy: 'The alphabetical index in the back of a 1,000-page encyclopedia.',
    example: 'CREATE INDEX idx_users_email ON users(email);'
  },
  {
    term: 'Transaction',
    simpleMeaning: 'A group of database operations that either ALL succeed together or ALL rollback on error (ACID).',
    realWorldAnalogy: 'A bank transfer: withdrawing $100 from you and giving $100 to a friend must both happen or neither.',
    example: 'BEGIN TRANSACTION; ... COMMIT;'
  },
  {
    term: 'Goroutine',
    simpleMeaning: 'An ultra-lightweight thread managed by the Go runtime taking only ~2KB of memory.',
    realWorldAnalogy: 'A kitchen chef assigning 1,000 sous-chefs each to chop one carrot concurrently.',
    example: 'go processTask(task)'
  },
  {
    term: 'Channel',
    simpleMeaning: 'A thread-safe pipe in Go used to send data and synchronize between goroutines.',
    realWorldAnalogy: 'A pneumatic message tube between office rooms where data is dropped in and received.',
    example: 'ch <- result; data := <-ch'
  },
  {
    term: 'Deadlock',
    simpleMeaning: 'A freeze where two tasks each wait for a resource locked by the other, stuck forever.',
    realWorldAnalogy: 'Two stubborn drivers meeting in a one-lane bridge; neither will reverse, so neither moves.',
    example: 'Two goroutines acquiring Lock A and Lock B in reversed orders'
  },
  {
    term: 'API',
    simpleMeaning: 'Application Programming Interface: the contract and menu of endpoints a server offers.',
    realWorldAnalogy: 'The restaurant menu: you point at Item 4 and the kitchen sends out that dish.',
    example: 'GET /api/v1/users/42'
  },
  {
    term: 'JSON',
    simpleMeaning: 'JavaScript Object Notation: a universal human-readable text format for exchanging data.',
    realWorldAnalogy: 'A universal standardized mailing postcard format understood by every country.',
    example: '{"user": "Boots", "level": 10}'
  },
  {
    term: 'Microservice',
    simpleMeaning: 'Splitting an application into small, independent services that talk over HTTP or gRPC.',
    realWorldAnalogy: 'Specialized airport departments: baggage claim, ticket counter, security checkpoints.',
    example: 'Billing Service, Auth Service, Notification Service'
  },
  {
    term: 'Docker',
    simpleMeaning: 'A containerization tool that packages code, libraries, and dependencies into a single portable image.',
    realWorldAnalogy: 'A standardized shipping container that fits onto any ship, train, or truck worldwide.',
    example: 'docker run -p 8080:8080 my-backend:v1'
  },
  {
    term: 'Rate Limiter',
    simpleMeaning: 'A traffic guard that caps how many requests a user can make per minute to prevent overload.',
    realWorldAnalogy: 'A bouncer at a nightclub door letting only 5 people enter every minute.',
    example: 'Allow 60 requests per minute per IP'
  },
  {
    term: 'Cache',
    simpleMeaning: 'A high-speed temporary memory layer (like Redis) storing recent results to bypass slow disks.',
    realWorldAnalogy: 'Keeping your favorite jacket on the coat hook by the door instead of upstairs in the attic.',
    example: 'redis.get("user:42:profile")'
  },
  {
    term: 'Load Balancer',
    simpleMeaning: 'A reverse proxy that evenly distributes incoming web traffic across multiple backend servers.',
    realWorldAnalogy: 'A bank concierge directing each incoming customer to the next available teller window.',
    example: 'HAProxy or NGINX distributing traffic round-robin'
  }
];
