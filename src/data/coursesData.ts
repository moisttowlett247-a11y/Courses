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
            eli5Summary: 'A computer is like a super-fast puppy: it has zero imagination, but it will follow your exact step-by-step instructions from top to bottom!',
            codeBreakdown: [
              { code: 'def recipe_name():', simpleMeaning: 'Tells Python: "I am creating a reusable set of instructions called recipe_name".' },
              { code: 'return "result text"', simpleMeaning: '"return" hands the finished answer back to whoever asked for it.' }
            ],
            commonMistakes: [
              'Deleting the colon (:) at the end of the line. In Python, colons are required at the end of recipe headers!',
              'Forgetting the 4 spaces of indentation. The steps inside a recipe must be indented so Python knows they belong together.'
            ],
            quickCheckQuiz: {
              question: 'What does a computer do when it runs your code?',
              options: [
                'It guesses what you meant even if words are misspelled.',
                'It follows every line of instruction from top to bottom in exact order.',
                'It closes all open apps.'
              ],
              correctIndex: 1,
              explanation: 'Computers are literal machines. They follow your instructions step-by-step in exact sequence!'
            },
            theoryMarkdown: `### What is Code? (Don't Panic!)

You do not need to be a math genius to code. 

**Code is just a cooking recipe for a computer.**

Think about baking cookies:
1. Turn on oven to 350°F.
2. Mix flour, sugar, and chocolate chips.
3. Bake for 12 minutes.

A computer does the exact same thing: it reads instructions **from top to bottom**, one line at a time!

#### How Functions Hand Back Answers
When your code finishes a task, it uses the special keyword **\`return\`** to hand the finished result back:

\`\`\`python
def bake_cookies():
    return "Fresh chocolate chip cookies ready!"
\`\`\`

#### Your First Mission:
Write a return statement inside \`start_adventure()\` that hands back the exact guild motto: \`"I am now a programmer!"\`. Then click **"Run Code"** to verify your answer!`,
            instructions: [
              "Inside the `start_adventure()` function, write a `return` statement.",
              "Return the exact text message: `\"I am now a programmer!\"` (wrapped in quotes).",
              "Click 'Run Code' to test your answer!"
            ],
            starterCode: `# Your First Coding Mission!
# Complete the function below to return your graduation motto:
# "I am now a programmer!"

def start_adventure():
    # Type your return statement here (remember to indent with 4 spaces):
    pass
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
              "Remember the `return` keyword hands back results. Your line should begin with `return`.",
              "Wrap the message in quotation marks, matching the letters and punctuation exactly: `\"I am now a programmer!\"`"
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
            eli5Summary: 'Putting text in quotes is like writing a label on a cardboard box. Without quotes, the computer thinks you are typing a secret computer command!',
            codeBreakdown: [
              { code: '"Your text here"', simpleMeaning: 'Quotation marks protect human words so Python treats them as readable text (a String).' },
              { code: 'return "Greeting"', simpleMeaning: 'Hands back the string safely.' }
            ],
            commonMistakes: [
              'Mixing different quotes like "Hello\' (start with double quotes, finish with double quotes!).',
              'Forgetting quotes entirely: writing return Welcome will cause an error because Python thinks Welcome is an unknown command.'
            ],
            quickCheckQuiz: {
              question: 'Why do words in code need quotation marks ("...") around them?',
              options: [
                'Because quotes make the computer speakers louder.',
                'To make words italic on the screen.',
                'To tell the computer: "This is human reading text, do not treat it as an executable command."'
              ],
              correctIndex: 2,
              explanation: 'Quotes are protective shields that tell the computer: "Treat this as pure text, do not try to execute it as computer code".'
            },
            theoryMarkdown: `### Teaching the Computer to Read Words

Computers are great with numbers, but when we want them to handle words (like names, messages, or dialogue), we must wrap the text in **quotes** \`"..."\`.

In coding, text inside quotes is called a **String** (because it's a string of characters tied together).

\`\`\`python
# Example of strings:
hero_title = "Knight of the Realm"
battle_cry = "For honor!"
\`\`\`

#### Why do we need quotes?
- If you write \`"cat"\` (with quotes), the computer knows you mean the animal word "cat".
- If you write \`cat\` (without quotes), the computer searches for a secret computer command or variable named cat!`,
            instructions: [
              "Make the `guild_welcome()` function return the greeting `\"Welcome to the Guild!\"`.",
              "Make sure your text is wrapped in quotes and includes the exclamation mark.",
              "Click 'Run Code' to test your answer."
            ],
            starterCode: `def guild_welcome():
    # Mission: Return the greeting message: "Welcome to the Guild!"
    # Replace pass with your return statement:
    pass
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
              "Remember that all text strings in Python must start and end with matching quotation marks.",
              "Double check your capitalization, spacing, and the exclamation mark at the end."
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
            eli5Summary: 'A variable is like sticking a label on a jar on your kitchen counter. If you write "gold" on the label and put 50 in, the jar remembers it!',
            codeBreakdown: [
              { code: 'box_name = 100', simpleMeaning: 'Creates a storage spot named box_name and puts the value 100 inside.' },
              { code: 'return box_name', simpleMeaning: 'Retrieves the value from that storage spot and hands it back.' }
            ],
            commonMistakes: [
              'Putting the value on the left side (e.g. 100 = player_health). The jar name MUST always be on the left!',
              'Putting spaces in the variable name (e.g. player health). In code, we use underscores like player_health.'
            ],
            quickCheckQuiz: {
              question: 'In the code `gold = 50`, what does the `=` symbol mean?',
              options: [
                'Put the value 50 into the container named gold.',
                'Check if gold is equal to 50.',
                'Delete 50 coins.'
              ],
              correctIndex: 0,
              explanation: 'A single = sign is the "assignment" symbol. It takes what is on the right and stores it into the name on the left.'
            },
            theoryMarkdown: `### What is a Variable?

Imagine your kitchen counter has glass jars with sticky labels on them:
- Jar labeled **\`mana_potions\`** $\to$ you put \`5\` inside it.
- Jar labeled **\`hero_name\`** $\to$ you put \`"Boots"\` inside it.

Whenever you want to know what's in the jar, you just use its name!

\`\`\`python
# Example: storing items in memory jars
player_mana = 50
companion_name = "Shadow"
\`\`\`

In Python, the \`=\` sign means **"put the value on the right into the jar on the left"**.`,
            instructions: [
              "Inside `get_starting_health()`, create a variable named `player_health` and set it equal to `100`.",
              "Return `player_health` at the end of the function."
            ],
            starterCode: `def get_starting_health():
    # Mission:
    # 1. Create a variable named player_health with the number 100 stored in it
    # 2. Return player_health
    pass
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
              "Remember: the container name goes on the left of `=`, and the value goes on the right.",
              "Numbers don't need quotes: assign the raw integer 100, then return the variable name on the next line."
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
            eli5Summary: 'Math in code is as easy as typing on your phone calculator: + adds coins together, and - subtracts what you spend at the shop!',
            codeBreakdown: [
              { code: 'total = a - b', simpleMeaning: 'Subtracts b from a and saves the difference into total.' },
              { code: 'return total', simpleMeaning: 'Hands back the calculated result.' }
            ],
            commonMistakes: [
              'Calculating the math but forgetting to write "return". Without return, the computer keeps the answer to itself!'
            ],
            quickCheckQuiz: {
              question: 'If you have 50 gold and buy an item for 15 gold, how does Python calculate your change?',
              options: [
                'current_gold + item_cost',
                'current_gold - item_cost',
                'current_gold / item_cost'
              ],
              correctIndex: 1,
              explanation: 'Minus (-) subtracts the cost from your current money, leaving you with 35 gold.'
            },
            theoryMarkdown: `### Simple Math with Code

Coding math works just like a pocket calculator:
- \`+\` : Adds numbers together (\`10 + 5 = 15\`)
- \`-\` : Subtracts numbers (\`20 - 5 = 15\`)
- \`*\` : Multiplies numbers (\`4 * 5 = 20\`)

\`\`\`python
# Example: computing remaining stamina
starting_stamina = 100
sprint_cost = 30
remaining = starting_stamina - sprint_cost  # 70
\`\`\``,
            instructions: [
              "Complete the function `buy_health_potion(current_gold, potion_cost)`.",
              "Subtract `potion_cost` from `current_gold`.",
              "Return the remaining gold."
            ],
            starterCode: `def buy_health_potion(current_gold, potion_cost):
    # Mission: Subtract potion_cost from current_gold and return the remaining amount
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
              "You can subtract values using the `-` operator with the parameters provided to the function.",
              "You can do the calculation directly on your return line, or store it in a variable first."
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
            eli5Summary: 'If/Else is like checking a traffic light: IF the light is green, drive forward. ELSE, stop the car. It teaches computers how to make choices!',
            codeBreakdown: [
              { code: 'if score > 0:', simpleMeaning: 'Checks if the condition is True. If yes, runs the indented lines below it.' },
              { code: 'else:', simpleMeaning: 'The fallback plan: runs only if the condition above was False.' }
            ],
            commonMistakes: [
              'Forgetting the colons (:) at the end of "if ...:" and "else:".',
              'Forgetting to indent the return statement under the if and else.'
            ],
            quickCheckQuiz: {
              question: 'When does the "else" branch run in an if-else block?',
              options: [
                'Never, it is just for decoration.',
                'Every single time, no matter what.',
                'Only when the "if" test turns out to be False.'
              ],
              correctIndex: 2,
              explanation: '"else" is the fallback plan. It only triggers when the main "if" condition does not match.'
            },
            theoryMarkdown: `### Teaching the Computer to Choose

Think of how you make decisions in everyday life:
- **IF** the fuel tank has gas $\to$ drive to the destination.
- **ELSE** $\to$ walk on foot.

In Python, we write this using \`if\` and \`else\`:

\`\`\`python
# Example: checking car fuel
fuel_liters = 15

if fuel_liters > 0:
    return "Car can drive"
else:
    return "Out of gas"
\`\`\`

The \`>\` symbol means "greater than". In Python, remember that lines starting with \`if\` or \`else\` always end with a colon \`:\`!`,
            instructions: [
              "Write logic inside `check_player_status(health)`.",
              "If `health` is strictly greater than `0`, return `\"Player is Alive!\"`.",
              "Otherwise (`else`), return `\"Player has Defeated!\"`."
            ],
            starterCode: `def check_player_status(health):
    # Mission:
    # 1. If health is greater than 0, return "Player is Alive!"
    # 2. Otherwise (else), return "Player has Defeated!"
    pass
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
              "Use the `>` comparison operator to check if `health` is greater than 0.",
              "Make sure both the `if` and `else` lines end with colons `:`, and their return statements are indented."
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
            eli5Summary: 'A function is like a blender: you define the recipe once, put strawberries in, and delicious smoothie comes out without rebuilding the blender!',
            codeBreakdown: [
              { code: 'def spell(level):', simpleMeaning: 'Creates a function that accepts an input value called level.' },
              { code: 'return f"Power is {level}"', simpleMeaning: 'An f-string dynamically inserts the variable inside curly braces {}.' }
            ],
            commonMistakes: [
              'Forgetting the lowercase "f" right in front of the quotes when building an f-string.'
            ],
            quickCheckQuiz: {
              question: 'Why do we write functions instead of just writing code directly?',
              options: [
                'Because computers delete code that is not inside functions.',
                'So we can reuse the recipe hundreds of times with different inputs without retyping!',
                'Functions make typing slower.'
              ],
              correctIndex: 1,
              explanation: 'Reusability is the superpower of functions. Write it once, call it anytime!'
            },
            theoryMarkdown: `### What is a Function?

Think of a kitchen blender.
1. You put strawberries inside (**Input / Parameter**).
2. You press the BLEND button (**The Function**).
3. Delicious strawberry smoothie pours out (**Output / Return**).

Instead of rebuilding the blender from scratch every morning, you just press the button!

#### Formatting Text with Variables (F-Strings)
In Python, if you put the letter \`f\` right in front of quotes, you can insert variables directly inside \`{curly_brackets}\`:

\`\`\`python
# Example: dynamic message
hero = "Boots"
damage = 25
announcement = f"Hero {hero} dealt {damage} damage!"
\`\`\``,
            instructions: [
              "Inside `cast_fireball(spell_power)`, format and return the spell text.",
              "Return: `\"Casting Fireball with <spell_power> power!\"` (e.g. for power 50, return `\"Casting Fireball with 50 power!\"`).",
              "Click 'Run Code' to test your answer."
            ],
            starterCode: `def cast_fireball(spell_power):
    # Mission: Return the formatted message:
    # "Casting Fireball with <spell_power> power!"
    pass
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
              "Try using an f-string: place an `f` before the opening quote, then insert `{spell_power}` inside.",
              "Check the capitalization and spacing of words like 'Casting Fireball with' and 'power!'."
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

Backend microservices frequently serialize health metrics and node status banners. Two foundational habits keep services resilient:
1. **Sanitizing Strings**: Stripping leading/trailing whitespace and standardizing casing prevent duplicate keys and route lookup mismatches.
2. **Bounds Clamping**: Guarding integer metrics prevents invalid states like negative load or negative counts.

\`\`\`python
# Example: Sanitizing and bounding service metrics
raw_service = "  billing-worker  "
clean_service = raw_service.strip().upper()  # "BILLING-WORKER"

# Clamp values so they never go negative:
safe_queue = max(0, -10)  # Evaluates to 0
\`\`\``,
            instructions: [
              "Implement `format_server_banner(server_name, port, active_connections)`.",
              "Clean `server_name` by stripping whitespace and converting to uppercase.",
              "Clamp `active_connections` so that negative values become `0`.",
              "Return the formatted banner string: `\"[SERVER: <NAME>] Port: <PORT> | Active Load: <CONNECTIONS> clients\"`."
            ],
            starterCode: `def format_server_banner(server_name, port, active_connections):
    # Mission:
    # 1. Clean server_name (strip whitespace and uppercase it)
    # 2. Ensure active_connections is never less than 0
    # 3. Return: "[SERVER: <NAME>] Port: <PORT> | Active Load: <CONNECTIONS> clients"
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
            hints: [
              "Use python string methods `.strip()` to trim whitespace and `.upper()` to convert to uppercase.",
              "Use `max(0, active_connections)` to ensure numbers below zero get lifted to 0."
            ]
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

Relational databases split data across multiple tables to avoid data duplication. An **INNER JOIN** connects rows from two tables whenever matching keys exist:

\`\`\`sql
-- Example: Joining customers and shipments
SELECT customers.full_name, shipments.tracking_number, shipments.cost
FROM customers
INNER JOIN shipments ON customers.id = shipments.customer_id
WHERE shipments.status = 'delivered'
ORDER BY shipments.cost DESC;
\`\`\``,
            instructions: [
              "Write a query to select `users.name`, `orders.product`, and `orders.amount`.",
              "Join `users` with `orders` on matching IDs: `users.id = orders.user_id`.",
              "Filter for orders where `orders.status = 'completed'`.",
              "Order the results by `orders.amount DESC` (highest amount first)."
            ],
            starterCode: `-- Mission:
-- 1. SELECT users.name, orders.product, orders.amount
-- 2. Join users with orders on users.id = orders.user_id
-- 3. Filter for orders where status is 'completed'
-- 4. Order results by orders.amount descending

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
            hints: [
              "Start with `SELECT users.name, orders.product, orders.amount FROM users`.",
              "Connect the tables using `JOIN orders ON users.id = orders.user_id`, followed by your `WHERE` and `ORDER BY` clauses."
            ]
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

The Unix philosophy is to build small, dedicated tools that do one job well, and connect them together using **pipes** (\`|\`). The pipe redirects the text output (stdout) of the left command straight into the input (stdin) of the right command!

\`\`\`bash
# Example: Read an audit log, filter for 404 errors, and count matching lines:
cat audit.log | grep 404 | wc -l
\`\`\`

- \`cat file.log\`: Reads and dumps file contents.
- \`grep KEYWORD\`: Filters only lines containing the keyword.
- \`wc -l\`: Counts total lines in the stream.`,
            instructions: [
              "Build a command pipeline using pipe operators (`|`).",
              "Read the contents of `server.log` with `cat`.",
              "Pipe into `grep` to filter only lines containing `ERROR`.",
              "Pipe into `wc -l` to count how many error lines exist."
            ],
            starterCode: `# Mission: Construct a Unix pipeline to count lines containing "ERROR" in server.log
# Connect cat, grep, and wc -l using the pipe symbol (|):

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
            hints: [
              "Chain three commands together using the pipe character `|`.",
              "First read `server.log` with `cat`, then filter for `ERROR` with `grep`, then count with `wc -l`."
            ]
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
              "Implement `LRUCache(capacity)`.",
              "`get(key)`: If key exists, move it to the end of `order` (mark as most recently used) and return value; else return -1.",
              "`put(key, value)`: If key exists, update value and order. If at capacity, evict the oldest key from `order` and `cache`. Store the new item."
            ],
            starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.order = []

    def get(self, key: str) -> int:
        # Mission: If key is not found, return -1.
        # Otherwise, update recency order and return the cached value.
        pass

    def put(self, key: str, value: int) -> None:
        # Mission: Insert or update key/value.
        # If at capacity, evict the least recently used key before inserting.
        # Ensure key is marked as most recently used.
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
                name: 'LRU Cache operations maintain recency order',
                expectedOutput: 'LRU operations valid'
              }
            ],
            hints: [
              "In `get()`: check `if key not in self.cache`. When found, remove `key` from `self.order` and append it to mark as newest.",
              "In `put()`: if `len(self.cache) >= self.capacity`, pop index 0 from `self.order` and delete that key from `self.cache`."
            ]
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
            starterCode: `// TODO: Connect horizontal cluster architecture components:
// Client Fleet -> Load Balancer -> Web Replicas -> Redis Cache -> PostgreSQL
`,
            solutionCode: `// Architecture Topology: Client Fleet -> Load Balancer -> Web Replicas -> Redis Cache -> PostgreSQL
// Verified sub-50ms latency across 10,000 simulated RPS
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
