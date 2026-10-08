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
      },
      {
        id: 'course-py-collections',
        trackId: 'track-zero-to-one',
        title: 'Level 1: Collections, Loops & OOP Foundations',
        description: 'Bridge beginner fundamentals to backend systems: store inventories in lists, automate with loops, map key-values with dictionaries, and build class blueprints.',
        iconName: 'Layers',
        language: 'python',
        level: 'Novice',
        tier: 'beginner',
        totalXp: 400,
        estimatedHours: 2,
        lessons: [
          {
            id: 'beg-06-lists',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-collections',
            title: '7. Lists & Inventories (Ordered Backpack Slots)',
            slug: 'beginner-lists-inventories',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 50,
            readTimeMinutes: 3,
            eli5Summary: 'A list is like an adventurer backpack with numbered slots: slot 0, slot 1, slot 2. You can add new loot anytime with .append()!',
            codeBreakdown: [
              { code: 'items = ["Sword", "Shield"]', simpleMeaning: 'Square brackets [] create a list containing multiple items separated by commas.' },
              { code: 'items.append("Potion")', simpleMeaning: '.append() puts a brand-new item into the very end of the list.' },
              { code: 'first = items[0]', simpleMeaning: 'In programming, slots start counting at 0! Index 0 is the first element.' }
            ],
            commonMistakes: [
              'Thinking the first element is index 1. In programming, counting always begins at index 0!',
              'Forgetting parentheses on .append("item").'
            ],
            quickCheckQuiz: {
              question: 'In Python, what is the index position of the first item in a list?',
              options: [
                'Index 1',
                'Index 0',
                'Index -1'
              ],
              correctIndex: 1,
              explanation: 'In almost every programming language including Python, indices are zero-based (start at 0).'
            },
            theoryMarkdown: `### The Adventurer's Backpack: Lists

Up until now, our variables could only hold a single value at a time (like \`gold = 50\`).

**A List lets you store hundreds of items inside a single ordered collection!**

\`\`\`python
# Creating an inventory list:
backpack = ["Wooden Sword", "Health Potion"]

# Adding a new item to the end:
backpack.append("Iron Shield")
# Now backpack is: ["Wooden Sword", "Health Potion", "Iron Shield"]

# Checking how many items we carry:
total_items = len(backpack)  # Evaluates to 3
\`\`\`

#### Your Mission:
Complete \`add_quest_item(inventory, new_item)\`. Add the \`new_item\` to the \`inventory\` list and return the updated \`inventory\`.`,
            instructions: [
              "Inside `add_quest_item(inventory, new_item)`, use `.append()` to add `new_item` to `inventory`.",
              "Return the updated `inventory` list.",
              "Click 'Run Code' to test your answer!"
            ],
            starterCode: `def add_quest_item(inventory, new_item):
    # Mission: Add new_item to the inventory list and return it!
    pass
`,
            solutionCode: `def add_quest_item(inventory, new_item):
    inventory.append(new_item)
    return inventory
`,
            testCases: [
              {
                id: 'beg-l1',
                name: 'add_quest_item(["Health Potion"], "Mana Elixir")',
                inputDescription: 'inventory=["Health Potion"], new_item="Mana Elixir"',
                expectedOutput: ['Health Potion', 'Mana Elixir']
              },
              {
                id: 'beg-l2',
                name: 'add_quest_item([], "Quest Scroll")',
                inputDescription: 'inventory=[], new_item="Quest Scroll"',
                expectedOutput: ['Quest Scroll']
              }
            ],
            hints: [
              "Call `inventory.append(new_item)` on the first line.",
              "Then on the next line, write `return inventory`."
            ]
          },
          {
            id: 'beg-07-loops',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-collections',
            title: '8. Loops (The Repetitive Assembly Line)',
            slug: 'beginner-loops-assembly-line',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 55,
            readTimeMinutes: 4,
            eli5Summary: 'A loop is like an assembly line conveyor belt: for every single item that slides down the belt, the computer does the exact same action automatically!',
            codeBreakdown: [
              { code: 'for coin in coin_piles:', simpleMeaning: 'Picks up each item from the collection one-by-one and names it "coin".' },
              { code: 'total += coin', simpleMeaning: 'Adds the coin to our running total (shorthand for total = total + coin).' }
            ],
            commonMistakes: [
              'Forgetting the colon (:) at the end of the "for ... in ...:" line.',
              'Resetting total inside the loop instead of before the loop starts.'
            ],
            quickCheckQuiz: {
              question: 'Why do backend developers use loops instead of copy-pasting code?',
              options: [
                'Loops take up less disk space.',
                'Because a loop can process 10,000 items with just 3 lines of code without retyping!',
                'Loops make computers run slower.'
              ],
              correctIndex: 1,
              explanation: 'Loops eliminate repetition: whether you have 3 items or 3,000,000 items, the same loop processes all of them effortlessly!'
            },
            theoryMarkdown: `### Automating Repetitive Work with \`for\` Loops

Imagine you opened 5 treasure chests in a dungeon dungeon. Without a loop, you would have to write:
\`\`\`python
total = chest1 + chest2 + chest3 + chest4 + chest5
\`\`\`
What if there were 10,000 chests? You would have to type 10,000 variable names!

**With a \`for\` loop, the computer iterates through all items automatically:**

\`\`\`python
coin_piles = [10, 20, 30]
total = 0

for coin in coin_piles:
    total += coin

# When the loop finishes, total is 60!
\`\`\`

Notice the colon \`:\` at the end of \`for coin in coin_piles:\` and the 4-space indent for the code inside the loop!`,
            instructions: [
              "Inside `sum_treasure_coins(coin_piles)`, create a variable `total = 0`.",
              "Write a `for coin in coin_piles:` loop to add each coin to `total` using `total += coin`.",
              "After the loop finishes, return `total`."
            ],
            starterCode: `def sum_treasure_coins(coin_piles):
    # Mission: Sum all coins in coin_piles using a for loop and return total!
    pass
`,
            solutionCode: `def sum_treasure_coins(coin_piles):
    total = 0
    for coin in coin_piles:
        total += coin
    return total
`,
            testCases: [
              {
                id: 'beg-loop1',
                name: 'sum_treasure_coins([10, 20, 30]) == 60',
                inputDescription: 'coin_piles=[10, 20, 30]',
                expectedOutput: 60
              },
              {
                id: 'beg-loop2',
                name: 'sum_treasure_coins([5, 15, 25, 35]) == 80',
                inputDescription: 'coin_piles=[5, 15, 25, 35]',
                expectedOutput: 80
              }
            ],
            hints: [
              "Create `total = 0` before starting the loop.",
              "Inside the loop, write `total += coin`.",
              "Make sure `return total` is aligned outside the loop (indented only 4 spaces)."
            ]
          },
          {
            id: 'beg-08-dicts',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-collections',
            title: '9. Dictionaries & Key-Value Stores (The Address Book)',
            slug: 'beginner-dictionaries-key-value',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 60,
            readTimeMinutes: 4,
            eli5Summary: 'A dictionary is like a phonebook or RPG character sheet: you don\'t look up slot numbers, you look up labeled names like "health" or "attack" to find values!',
            codeBreakdown: [
              { code: 'hero = {"name": "Boots", "hp": 100}', simpleMeaning: 'Curly braces {} define a dictionary of "key": value pairs.' },
              { code: 'hero["hp"]', simpleMeaning: 'Looks up the value stored under the key "hp".' },
              { code: 'if "hp" in hero:', simpleMeaning: 'Checks whether the key exists before reading it to prevent errors.' }
            ],
            commonMistakes: [
              'Looking up a key that does not exist in the dictionary without checking first, which causes a KeyError.',
              'Forgetting colons (:) between each key and its value inside the curly braces.'
            ],
            quickCheckQuiz: {
              question: 'How do you look up a value in a dictionary?',
              options: [
                'By its slot number starting at 0.',
                'By its unique key name inside square brackets, like dict["key"].',
                'By clicking on it.'
              ],
              correctIndex: 1,
              explanation: 'Dictionaries map labeled keys to values. You look up data using the key name!'
            },
            theoryMarkdown: `### The Power of Key-Value Mapping: Dictionaries

Lists are great when items are in a 0, 1, 2 line. But in backend engineering, data has names!
- A user has a \`"username"\`, an \`"email"\`, and an \`"account_id"\`.
- A character has \`"health"\`, \`"mana"\`, and \`"level"\`.

In Python, we store this using a **Dictionary** with curly braces \`{}\`:

\`\`\`python
# Character stats dictionary:
player = {
    "name": "Boots",
    "health": 100,
    "mana": 50
}

# Reading a value:
print(player["health"])  # Prints 100

# Checking if a key exists:
if "mana" in player:
    print("Mana found!")
\`\`\`

#### Your Mission:
In \`get_player_stat(stats, stat_name, default_val)\`, check if \`stat_name in stats\`. If it is present, return \`stats[stat_name]\`. Otherwise, return \`default_val\`!`,
            instructions: [
              "In `get_player_stat(stats, stat_name, default_val)`, write an `if` statement.",
              "If `stat_name in stats`, return `stats[stat_name]`.",
              "Otherwise (`else`), return `default_val`."
            ],
            starterCode: `def get_player_stat(stats, stat_name, default_val):
    # Mission: Check if stat_name exists in stats.
    # If yes, return stats[stat_name], else return default_val.
    pass
`,
            solutionCode: `def get_player_stat(stats, stat_name, default_val):
    if stat_name in stats:
        return stats[stat_name]
    return default_val
`,
            testCases: [
              {
                id: 'beg-dict1',
                name: 'get_player_stat({"health": 100}, "health", 0) == 100',
                inputDescription: 'stats={"health": 100}, stat_name="health", default_val=0',
                expectedOutput: 100
              },
              {
                id: 'beg-dict2',
                name: 'get_player_stat({"health": 100}, "mana", 25) == 25',
                inputDescription: 'stats={"health": 100}, stat_name="mana", default_val=25',
                expectedOutput: 25
              }
            ],
            hints: [
              "Use `if stat_name in stats:` to check if the dictionary contains the key.",
              "Return `stats[stat_name]` when present, and return `default_val` otherwise."
            ]
          },
          {
            id: 'beg-09-classes-intro',
            trackId: 'track-zero-to-one',
            courseId: 'course-py-collections',
            title: '10. Intro to Classes & Objects (The Character Sheet Blueprint)',
            slug: 'beginner-classes-blueprint',
            difficulty: 'Novice',
            tier: 'beginner',
            language: 'python',
            xpReward: 70,
            readTimeMinutes: 5,
            eli5Summary: 'A Class is like a blueprint or cookie cutter. An Object is the actual hero stamped out from that blueprint with their own live stats!',
            codeBreakdown: [
              { code: 'class Adventurer:', simpleMeaning: 'Declares a blueprint named Adventurer.' },
              { code: 'def __init__(self, name, hp):', simpleMeaning: 'The constructor method that initializes fresh object properties.' },
              { code: 'self.hp = hp', simpleMeaning: '"self" means "this specific hero instance". It attaches data directly to the object.' },
              { code: 'def take_damage(self, amount):', simpleMeaning: 'A method (function) that lives inside the class and updates its stats.' }
            ],
            commonMistakes: [
              'Forgetting the double underscores on "__init__" (it is two underscores on each side).',
              'Forgetting to put "self" as the first parameter of every class method.'
            ],
            quickCheckQuiz: {
              question: 'What does "self" represent inside a Python class?',
              options: [
                'The computer processor.',
                'The specific individual object instance running the code.',
                'A keyword that restarts the program.'
              ],
              correctIndex: 1,
              explanation: '"self" refers to the individual instance of the class (e.g. this specific hero character sheet).'
            },
            theoryMarkdown: `### The Blueprint of Backend Architecture: Classes

In backend engineering, you don't just write loose functions. You group data and actions together into **Classes** (Object-Oriented Programming):
- A \`DatabaseConnection\` class tracks its connection pool.
- A \`UserSession\` class tracks the logged-in token.
- An \`Adventurer\` class tracks player health and takes damage!

\`\`\`python
class Adventurer:
    # __init__ sets up the fresh character stats:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    # Methods are actions this hero can perform:
    def take_damage(self, amount):
        self.hp = max(0, self.hp - amount)
        return self.hp
\`\`\`

Notice:
1. \`__init__\` has two underscores on each side.
2. Every method has \`self\` as its first parameter so it can access \`self.hp\`!

#### Your Mission:
Implement the \`Adventurer\` class with \`__init__(self, name, hp)\` and \`take_damage(self, amount)\`. Clamping with \`max(0, self.hp - amount)\` ensures health never drops below 0!`,
            instructions: [
              "Create `class Adventurer:`.",
              "Inside, define `def __init__(self, name, hp):` and save `self.name = name` and `self.hp = hp`.",
              "Define `def take_damage(self, amount):` that deducts `amount` from `self.hp` (clamped with `max(0, self.hp - amount)`), and returns the new `self.hp`."
            ],
            starterCode: `class Adventurer:
    def __init__(self, name, hp):
        # Mission: Store name and hp inside self
        pass

    def take_damage(self, amount):
        # Mission: Subtract amount from self.hp (min 0) and return self.hp
        pass
`,
            solutionCode: `class Adventurer:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def take_damage(self, amount):
        self.hp = max(0, self.hp - amount)
        return self.hp
`,
            testCases: [
              {
                id: 'beg-cls1',
                name: 'Adventurer tracks stats and takes damage',
                expectedOutput: 'Adventurer class verified'
              }
            ],
            hints: [
              "In `__init__`, write `self.name = name` and `self.hp = hp`.",
              "In `take_damage`, write `self.hp = max(0, self.hp - amount)` and then `return self.hp`."
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
            eli5Summary: 'In the easy tier, you learned variables and strings. In backend servers, strings sent across the web often have messy spaces and weird cases. Sanitizing means cleaning up the string with .strip() and .upper() so servers recognize the names cleanly.',
            codeBreakdown: [
              { code: 'server_name.strip().upper()', simpleMeaning: 'Removes outer blank spaces and turns all letters into UPPERCASE.' },
              { code: 'max(0, active_connections)', simpleMeaning: 'Guards the number so negative counts are clamped to 0.' },
              { code: 'f"[SERVER: {cleaned}] Port: {port}..."', simpleMeaning: 'F-string interpolation: smoothly embeds variables inside the text string.' }
            ],
            commonMistakes: [
              'Calling strip without parentheses like server_name.strip instead of server_name.strip().',
              'Forgetting the f prefix on formatted strings like f"[SERVER: {name}]".'
            ],
            quickCheckQuiz: {
              question: 'Why do backend services sanitize incoming service names with .strip() and .upper()?',
              options: [
                'To make text take up more memory.',
                'To prevent accidental spaces like " auth-service " from failing exact route lookups and cache keys.',
                'Because Python does not support lowercase letters.'
              ],
              correctIndex: 1,
              explanation: 'In distributed systems, key mismatches like "auth" vs " auth " cause 404s and cache misses. Standardizing strings is fundamental defensive engineering!'
            },
            theoryMarkdown: `### Stepping from Basics to Real Backend Systems
Welcome to the **Intermediate Tier**! In Level 0 and Level 1, you mastered the building blocks: strings, variables, conditions, and basic classes. Now, we apply those fundamentals to write **production-ready server code**.

### Backend Payload Formatting & Sanitization
Backend microservices frequently serialize health metrics and node status banners. Two foundational habits keep services resilient:
1. **Sanitizing Strings**: Stripping leading/trailing whitespace and standardizing casing prevent duplicate keys and route lookup mismatches.
2. **Bounds Clamping**: Guarding integer metrics prevents invalid states like negative load or negative counts.

\`\`\`python
# Example: Sanitizing and bounding service metrics
raw_service = "  billing-worker  "
clean_service = raw_service.strip().upper()  # "BILLING-WORKER"

# Clamp values so they never go negative:
safe_queue = max(0, -10)  # Evaluates to 0
\`\`\`

#### Transition Note from Beginner to Intermediate:
Remember how in Level 0 you concatenated strings with \`+\`? In intermediate backend code, we prefer Python **f-strings** like \`f"[SERVER: {clean_name}] Port: {port}"\` for clean, readable serialization.`,
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
            id: 'py-02-dict-lookups',
            trackId: 'track-python',
            courseId: 'course-py-fundamentals',
            title: 'API Payload Parsers & Safe Key Extraction',
            slug: 'python-dict-payload-parsing',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'python',
            xpReward: 75,
            readTimeMinutes: 4,
            eli5Summary: 'In beginner dictionaries, you checked "if key in dict". In intermediate web APIs, we use .get("key", default) which does the exact same check in one clean, safe step that never crashes your server!',
            codeBreakdown: [
              { code: 'payload.get("user", {})', simpleMeaning: 'Safely extracts the nested user dictionary, falling back to an empty dict {} if missing.' },
              { code: 'user.get("role", "guest")', simpleMeaning: 'Safely extracts the role string, defaulting to "guest" if not found.' }
            ],
            commonMistakes: [
              'Using square brackets like payload["user"]["role"] which throws an unhandled KeyError when a client omits the field.',
              'Forgetting the fallback argument inside .get(key, default).'
            ],
            quickCheckQuiz: {
              question: 'Why should API servers use dict.get() instead of dict[key] for user payloads?',
              options: [
                'dict.get() is faster on Sundays.',
                'dict.get() provides a safe default instead of crashing the server with a KeyError if a field is missing.',
                'Because JSON only works with .get().'
              ],
              correctIndex: 1,
              explanation: 'Never trust external client input! dict.get("role", "guest") prevents unhandled crashes and enforces graceful fallback defaults.'
            },
            theoryMarkdown: `### Ingesting Client API Payloads Safely
In Level 1 (Lesson 9), you learned how dictionaries store key-value pairs like an address book. When building backend web endpoints (FastAPI, Flask, Django), JSON request bodies arrive from clients as nested dictionaries.

If your code accesses \`payload["user"]["role"]\` and the client forgot to provide the \`"user"\` object, Python raises an unhandled \`KeyError\` and crashes the HTTP request with a 500 Server Error!

**Defensive backend developers use \`.get()\` with sensible defaults:**

\`\`\`python
# Example: Safe nested lookup
payload = {"user": {"role": "admin"}}

# If "user" is missing, falls back to {}
user_obj = payload.get("user", {})

# If "role" is missing, falls back to "guest"
role = user_obj.get("role", "guest")
\`\`\`

#### Bridging Your Skills:
In the beginner tier, you wrote:
\`\`\`python
if "role" in user_obj:
    return user_obj["role"]
return "guest"
\`\`\`
\`.get("role", "guest")\` is the exact same logic distilled into professional, idiomatic backend Python!`,
            instructions: [
              "Implement `parse_user_role(payload)`.",
              "Extract the nested `user` dictionary safely using `.get('user', {})`.",
              "Extract the `role` field from that dictionary safely, defaulting to `\"guest\"` if not provided.",
              "Return the extracted role string."
            ],
            starterCode: `def parse_user_role(payload):
    # Mission: Extract the user's role safely from payload.
    # Return the role, or "guest" if missing!
    pass
`,
            solutionCode: `def parse_user_role(payload):
    user = payload.get("user", {})
    return user.get("role", "guest")
`,
            testCases: [
              {
                id: 'py-dict-t1',
                name: 'parse_user_role({"user": {"role": "admin"}}) == "admin"',
                inputDescription: 'payload={"user": {"role": "admin"}}',
                expectedOutput: 'admin'
              },
              {
                id: 'py-dict-t2',
                name: 'parse_user_role({}) == "guest"',
                inputDescription: 'payload={}',
                expectedOutput: 'guest'
              }
            ],
            hints: [
              "First get the user dictionary: `user = payload.get('user', {})`.",
              "Then return `user.get('role', 'guest')`."
            ]
          },
          {
            id: 'py-03-oop',
            trackId: 'track-python',
            courseId: 'course-py-fundamentals',
            title: 'Stateful Services: Building a Rate Limiter',
            slug: 'python-oop-rate-limiter',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'python',
            xpReward: 100,
            readTimeMinutes: 6,
            eli5Summary: 'In beginner Lesson 10, you built an Adventurer class with health. In real backend systems, we use that exact same class blueprint pattern to build services like Rate Limiters that remember how many requests each IP address has made!',
            codeBreakdown: [
              { code: 'self.client_requests = {}', simpleMeaning: 'An internal dictionary on the object that tracks request count for each client IP.' },
              { code: 'current = self.client_requests.get(client_ip, 0)', simpleMeaning: 'Safely gets current count or 0 if this IP has never visited before.' },
              { code: 'self.client_requests[client_ip] = current + 1', simpleMeaning: 'Increments the tally when the request is allowed.' }
            ],
            commonMistakes: [
              'Forgetting "self." when accessing class state (e.g. client_requests instead of self.client_requests).',
              'Incrementing the counter even when the limit has already been exceeded.'
            ],
            quickCheckQuiz: {
              question: 'Why do backend APIs employ a Rate Limiter?',
              options: [
                'To make website buttons look shinier.',
                'To protect servers and databases from Denial of Service (DoS) attacks and abusive traffic floods.',
                'To automatically restart the computer.'
              ],
              correctIndex: 1,
              explanation: 'Rate limiters prevent malicious bots or runaway scripts from overwhelming backend instances with thousands of requests per second.'
            },
            theoryMarkdown: `### Encapsulation & Stateful Backend Objects
In beginner Lesson 10, you learned how to create a class:
\`\`\`python
class Adventurer:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp
\`\`\`

Now in the intermediate tier, we elevate this pattern into a real backend infrastructure service: a **Rate Limiter**.

A Rate Limiter encapsulates a tracking dictionary and a maximum threshold:
\`\`\`python
class RateLimiter:
    def __init__(self, max_requests):
        self.max_requests = max_requests
        self.client_requests = {}
\`\`\`

When a client makes a request to \`allow_request(client_ip)\`:
1. Check how many times they have made requests so far: \`self.client_requests.get(client_ip, 0)\`.
2. If their count is less than \`self.max_requests\`, increment their counter by 1 and return \`True\`.
3. If they reached or exceeded the limit, return \`False\` (HTTP 429 Too Many Requests).
4. \`reset(client_ip)\` resets their count back to 0.`,
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
          },
          {
            id: 'py-04-error-handling',
            trackId: 'track-python',
            courseId: 'course-py-fundamentals',
            title: 'Defensive Error Handling: Try/Except & Validation',
            slug: 'python-error-handling-validation',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'python',
            xpReward: 85,
            readTimeMinutes: 5,
            eli5Summary: 'Try / Except is like a trapeze safety net: tell Python "TRY this risky action, and if it fails with an error, do NOT crash the program—catch the mistake and use a safe fallback instead!"',
            codeBreakdown: [
              { code: 'try: ... except (ValueError, TypeError): ...', simpleMeaning: 'Tells Python to catch conversion errors safely instead of crashing.' },
              { code: 'if 1 <= val <= 65535: return val', simpleMeaning: 'Validates that the port falls inside the legal TCP networking range.' },
              { code: 'return 8080', simpleMeaning: 'Guaranteed safe fallback default port for invalid or crashed input.' }
            ],
            commonMistakes: [
              'Using a bare "except:" without specifying exception types or fallback values.',
              'Forgetting to validate boundary conditions (e.g. port 0 or port 99999).'
            ],
            quickCheckQuiz: {
              question: 'Why are TCP server ports constrained to numbers between 1 and 65535?',
              options: [
                'Because 65535 is the speed of sound.',
                'Because TCP port headers use 16-bit unsigned integers in the networking stack ($2^{16} - 1 = 65535$).',
                'Because Python only supports 5 digits.'
              ],
              correctIndex: 1,
              explanation: 'In computer networking, TCP and UDP port headers are 16 bits wide, making 65535 the theoretical hardware maximum port number!'
            },
            theoryMarkdown: `### Defensive Backend Engineering: Try / Except & Boundary Validation
In the beginner tier, we assumed inputs were always clean numbers or strings. In real backend engineering, clients and environment variables send messy, unexpected strings.

A user might submit \`"8080"\` as text, or invalid nonsense like \`"eight-thousand"\` where an integer port is required. If your server executes \`int("eight-thousand")\` directly without protection, Python raises a \`ValueError\` and your entire backend crashes!

**Wrap risky type conversions in \`try / except\` blocks:**

\`\`\`python
# Example: Safe integer conversion with fallback
try:
    port = int(raw_input)
except (ValueError, TypeError):
    port = 8080  # Safe fallback default!
\`\`\`

#### Port Number Boundaries:
TCP port numbers must strictly be between **1** and **65535** (the 16-bit networking maximum). Any value outside this range should be rejected with a fallback!`,
            instructions: [
              "Implement `parse_server_port(raw_port)`.",
              "Convert `raw_port` to an integer inside a `try / except` block.",
              "If conversion succeeds AND the port is valid ($1 \\le port \\le 65535$), return that port number.",
              "If conversion fails or the port is out of range, return the standard fallback port `8080`."
            ],
            starterCode: `def parse_server_port(raw_port):
    # Mission: Safely parse raw_port as an integer.
    # Return the integer if valid (between 1 and 65535 inclusive),
    # otherwise return the default fallback port 8080!
    pass
`,
            solutionCode: `def parse_server_port(raw_port):
    val = int(raw_port)
    if val >= 1 and val <= 65535:
        return val
    return 8080
`,
            testCases: [
              {
                id: 'py-err-t1',
                name: 'parse_server_port("3000") == 3000',
                inputDescription: 'raw_port="3000"',
                expectedOutput: 3000
              },
              {
                id: 'py-err-t2',
                name: 'parse_server_port("99999") == 8080',
                inputDescription: 'raw_port="99999"',
                expectedOutput: 8080
              }
            ],
            hints: [
              "Parse with `int(raw_port)`.",
              "Check `if val >= 1 and val <= 65535: return val`.",
              "Otherwise return `8080`."
            ]
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
        description: 'Query, filter, aggregate, and join structured relational tables in SQL.',
        iconName: 'Table',
        language: 'sql',
        level: 'Apprentice',
        tier: 'intermediate',
        totalXp: 450,
        estimatedHours: 4,
        lessons: [
          {
            id: 'sql-00-select-filter',
            trackId: 'track-sql',
            courseId: 'course-sql-mastery',
            title: 'SQL 101: Filtering & Sorting Data',
            slug: 'sql-select-where-sorting',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'sql',
            xpReward: 65,
            readTimeMinutes: 4,
            interactiveType: 'sql',
            eli5Summary: 'SQL is like asking a giant digital spreadsheet questions in plain English: "Show me columns A and B from the users sheet, but only include rows WHERE age is at least 25, and ORDER BY age with the oldest first!"',
            codeBreakdown: [
              { code: 'SELECT name, role, age', simpleMeaning: 'Chooses the exact column headers you want returned in the result spreadsheet.' },
              { code: 'FROM users', simpleMeaning: 'Specifies which database table sheet to search.' },
              { code: 'WHERE age >= 25', simpleMeaning: 'Filters out any rows that do not meet this comparison condition.' },
              { code: 'ORDER BY age DESC;', simpleMeaning: 'Sorts rows from highest to lowest (DESCending).' }
            ],
            commonMistakes: [
              'Writing WHERE after ORDER BY (SQL clauses must follow the strict order: SELECT -> FROM -> WHERE -> ORDER BY).',
              'Forgetting the semicolon (;) at the end of the query statement.'
            ],
            quickCheckQuiz: {
              question: 'In SQL, what is the mandatory order of basic query clauses?',
              options: [
                'ORDER BY -> WHERE -> SELECT -> FROM',
                'SELECT -> FROM -> WHERE -> ORDER BY',
                'FROM -> SELECT -> WHERE -> ORDER BY'
              ],
              correctIndex: 1,
              explanation: 'SQL follows a strict grammatical clause order: SELECT what you want, FROM the table, WHERE filter conditions apply, ORDER BY your sort preferences.'
            },
            theoryMarkdown: `### The Relational Query Engine
In Python, you stored collections in lists and dictionaries. In enterprise backend systems, millions of user records are persisted in **Relational Databases** (PostgreSQL, SQLite, MySQL).

Rather than writing Python loops to search through millions of items, you use **SQL** (Structured Query Language). The database server executes your query directly against optimized disk storage in milliseconds!

\`\`\`sql
-- Example: Querying active engineer accounts
SELECT name, role, age
FROM users
WHERE age >= 25
ORDER BY age DESC;
\`\`\`

- \`SELECT col1, col2\`: Chooses which columns to return.
- \`FROM table\`: Specifies the table to inspect.
- \`WHERE condition\`: Filters only rows that meet the criteria.
- \`ORDER BY col DESC\`: Sorts highest-to-lowest (\`DESC\`) or lowest-to-highest (\`ASC\`).`,
            instructions: [
              "Write a SQL query to select `name`, `role`, and `age` from the `users` table.",
              "Filter for users where `age >= 25`.",
              "Order the results by `age DESC` (oldest first)."
            ],
            starterCode: `-- Mission:
-- 1. SELECT name, role, age FROM users
-- 2. WHERE age >= 25
-- 3. ORDER BY age DESC

`,
            solutionCode: `SELECT name, role, age
FROM users
WHERE age >= 25
ORDER BY age DESC;
`,
            testCases: [
              {
                id: 'sql-filt-t1',
                name: 'SELECT users with age >= 25',
                expectedOutput: 'Valid relational result set'
              }
            ],
            hints: [
              "Start with `SELECT name, role, age FROM users`.",
              "Add `WHERE age >= 25` and terminate with `ORDER BY age DESC;`."
            ]
          },
          {
            id: 'sql-01-aggregation',
            trackId: 'track-sql',
            courseId: 'course-sql-mastery',
            title: 'Aggregation & Metrics: COUNT & GROUP BY',
            slug: 'sql-count-group-by',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'sql',
            xpReward: 75,
            readTimeMinutes: 5,
            interactiveType: 'sql',
            eli5Summary: 'GROUP BY is like sorting a giant bag of Skittles by color into small bowls, and COUNT(*) counts how many candies ended up in each bowl!',
            codeBreakdown: [
              { code: 'SELECT role, COUNT(*) AS count', simpleMeaning: 'Displays each unique role title alongside the count of how many rows belong to that role.' },
              { code: 'FROM users', simpleMeaning: 'The source table containing the individual records.' },
              { code: 'GROUP BY role;', simpleMeaning: 'Groups identical role values together before calculating the aggregate count.' }
            ],
            commonMistakes: [
              'Selecting columns that are neither grouped nor aggregated (e.g. SELECT name, role, COUNT(*) without grouping by name).',
              'Forgetting the AS alias when renaming aggregate metrics.'
            ],
            quickCheckQuiz: {
              question: 'What does GROUP BY role do in a SQL aggregation query?',
              options: [
                'Deletes all duplicate roles from the database.',
                'Bundles rows that share the same role together so COUNT(*) calculates the tally for each distinct role.',
                'Sorts the table alphabetically.'
              ],
              correctIndex: 1,
              explanation: 'GROUP BY organizes data into buckets based on matching values, enabling aggregate functions (COUNT, SUM, AVG) to calculate totals per bucket.'
            },
            theoryMarkdown: `### Calculating Business Metrics with GROUP BY
Backend metrics dashboards constantly summarize raw operational data:
- How many orders were placed today?
- How many users belong to each user role?

**Aggregate functions** compute a single summary value across rows:
- \`COUNT(*)\`: Counts total rows in each group.
- \`GROUP BY column\`: Groups rows sharing the same value before calculating the aggregate!

\`\`\`sql
-- Example: Count users in each department
SELECT department, COUNT(*) AS total_staff
FROM employees
GROUP BY department;
\`\`\`

#### Bridging to Backend Analytics:
In Python, you would write a \`for\` loop with a dictionary counter. In SQL, \`GROUP BY\` and \`COUNT(*)\` let the database perform this calculation on millions of records at high hardware speed!`,
            instructions: [
              "Write a query to select `role` and `COUNT(*) AS count`.",
              "Pull data from the `users` table.",
              "Group the results using `GROUP BY role`."
            ],
            starterCode: `-- Mission:
-- 1. SELECT role, COUNT(*) AS count FROM users
-- 2. GROUP BY role

`,
            solutionCode: `SELECT role, COUNT(*) AS count
FROM users
GROUP BY role;
`,
            testCases: [
              {
                id: 'sql-agg-t1',
                name: 'GROUP BY role counts users',
                expectedOutput: 'Valid relational result set'
              }
            ],
            hints: [
              "Write `SELECT role, COUNT(*) AS count FROM users GROUP BY role;`."
            ]
          },
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
            eli5Summary: 'Tables in a database are like pieces of a jigsaw puzzle. An INNER JOIN connects user records to their orders by matching user.id = order.user_id, creating one complete receipt!',
            codeBreakdown: [
              { code: 'SELECT users.name, orders.product, orders.amount', simpleMeaning: 'Extracts specific columns across both joined tables using table.column notation.' },
              { code: 'FROM users', simpleMeaning: 'The primary starting table.' },
              { code: 'JOIN orders ON users.id = orders.user_id', simpleMeaning: 'Connects rows between users and orders where their ID values match.' },
              { code: 'WHERE orders.status = \'completed\'', simpleMeaning: 'Filters only for rows where the order status is completed.' },
              { code: 'ORDER BY orders.amount DESC;', simpleMeaning: 'Sorts by dollar amount descending so the biggest orders appear at the top.' }
            ],
            commonMistakes: [
              'Forgetting the ON clause (writing JOIN orders without ON users.id = orders.user_id results in an unintended cross-product Cartesian join).',
              'Ambiguous column names: omitting table prefixes when both tables share a column name like "id".'
            ],
            quickCheckQuiz: {
              question: 'Why do relational databases split data across multiple tables (users, orders) and connect them with JOINs?',
              options: [
                'To make queries harder to write.',
                'Database Normalization: to avoid duplicating customer addresses and profile data inside every single order row.',
                'Because SQL cannot store more than 3 columns in a single table.'
              ],
              correctIndex: 1,
              explanation: 'Database Normalization eliminates redundant duplicate data, saving disk space and ensuring that when a user updates their email, it only needs to be changed in one place!'
            },
            theoryMarkdown: `### Connecting Normalized Tables
Relational databases split data across multiple specialized tables to avoid data duplication (Database Normalization). 
- \`users\` table stores user profiles once.
- \`orders\` table stores purchases, linking back via \`user_id\` (a **Foreign Key**).

An **INNER JOIN** stitches rows from two tables together whenever matching keys exist on both sides:

\`\`\`sql
-- Example: Joining customers and shipments
SELECT customers.full_name, shipments.tracking_number, shipments.cost
FROM customers
INNER JOIN shipments ON customers.id = shipments.customer_id
WHERE shipments.status = 'delivered'
ORDER BY shipments.cost DESC;
\`\`\`

#### Critical Concepts:
1. **Primary Key**: The unique ID of a row in its home table (\`users.id\`).
2. **Foreign Key**: A reference column in another table pointing to that Primary Key (\`orders.user_id\`).
3. **ON Clause**: Specifies the equality match: \`ON users.id = orders.user_id\`.`,
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
        totalXp: 350,
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
            eli5Summary: 'The pipe character (|) is like plumbing in a kitchen: it hooks the water faucet of one command directly into the drain and hose of the next command, letting text stream smoothly through!',
            codeBreakdown: [
              { code: 'cat server.log', simpleMeaning: 'Reads the file contents and dumps the text into the output stream.' },
              { code: '| grep ERROR', simpleMeaning: 'Catches that text stream and filters out everything except lines containing "ERROR".' },
              { code: '| wc -l', simpleMeaning: 'Catches the filtered error stream and counts how many lines made it through.' }
            ],
            commonMistakes: [
              'Leaving spaces inside command names or typing backward slashes (\\) instead of the vertical pipe (|).',
              'Forgetting file extensions like typing cat server instead of cat server.log.'
            ],
            quickCheckQuiz: {
              question: 'In the Unix terminal, what does the vertical bar "|" (pipe) operator do?',
              options: [
                'Turns the screen off.',
                'Redirects the standard output (stdout) of the command on the left into the standard input (stdin) of the command on the right.',
                'Creates a new folder named pipe.'
              ],
              correctIndex: 1,
              explanation: 'Pipes connect programs like Lego blocks: program output flows seamlessly into the next program without saving temporary files to disk.'
            },
            theoryMarkdown: `### The Unix Philosophy & The Pipe (\`|\`)
In your Python programs, you chained function calls: \`count_errors(filter_errors(read_file()))\`.

In Linux production operations, backend developers use the exact same compositional thinking directly in the operating system shell using **Unix Pipes** (\`|\`).

The Unix philosophy is to build small, dedicated tools that do one job well, and connect them together with pipelines:
\`\`\`bash
# Example: Read an audit log, filter for 404 errors, and count matching lines:
cat audit.log | grep 404 | wc -l
\`\`\`

- \`cat file.log\`: Reads and dumps file contents to stdout.
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
          },
          {
            id: 'bash-02-grep-inspect',
            trackId: 'track-linux-git',
            courseId: 'course-linux-shell',
            title: 'System Diagnostics: Inspecting Configurations',
            slug: 'bash-grep-config-inspection',
            difficulty: 'Apprentice',
            tier: 'intermediate',
            language: 'bash',
            xpReward: 75,
            readTimeMinutes: 3,
            interactiveType: 'terminal',
            eli5Summary: 'grep is like pressing Ctrl+F (or Cmd+F) on your keyboard, but for massive server configuration files directly in the terminal command line!',
            codeBreakdown: [
              { code: 'cat config.yaml', simpleMeaning: 'Opens and reads the server settings file.' },
              { code: '| grep host', simpleMeaning: 'Searches through every single line and prints only the line that mentions "host".' }
            ],
            commonMistakes: [
              'Misspelling the search term (e.g. typing grep hots instead of grep host).',
              'Omitting the space between cat and the filename.'
            ],
            quickCheckQuiz: {
              question: 'Why do engineers use grep in incident triage instead of opening the file in a text editor?',
              options: [
                'Because grep is colorful.',
                'Because grep can instantly search multi-gigabyte log and config files without loading them into memory or freezing your terminal.',
                'Text editors are illegal on servers.'
              ],
              correctIndex: 1,
              explanation: 'grep is extremely fast and stream-based, letting you extract specific values from huge production files in milliseconds.'
            },
            theoryMarkdown: `### Inspecting Server Configurations with Grep
In production incidents, backend developers often need to verify which host or database URL an environment is configured to connect with. Rather than manually scanning huge YAML and JSON files, we pipe \`cat\` directly into \`grep\` to extract key configuration parameters immediately:

\`\`\`bash
# Example: Check which database host is configured
cat config.yaml | grep host
\`\`\`

#### Terminal Command Checklist:
1. \`cat\`: "Concatenate and display files".
2. \`grep\`: "Global Regular Expression Print".
3. \`|\`: The pipe connector sending lines between commands.`,
            instructions: [
              "Build a pipeline to read `config.yaml` using `cat`.",
              "Pipe the stream into `grep` to filter for the keyword `host`."
            ],
            starterCode: `# Mission: Read config.yaml and pipe into grep to search for "host"

`,
            solutionCode: `cat config.yaml | grep host
`,
            testCases: [
              {
                id: 'bash-t2',
                name: 'Pipeline inspects database host',
                expectedOutput: 'host: postgres.internal'
              }
            ],
            hints: [
              "Write `cat config.yaml | grep host`."
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
            eli5Summary: 'In the intermediate tier, you wrote Python classes where self modified data. In Go (the hard tier), we use a Pointer Receiver (*WebhookEvent) which holds the exact memory address of the object so updates affect the real struct without making wasteful memory copies!',
            codeBreakdown: [
              { code: 'type WebhookEvent struct { ... }', simpleMeaning: 'Declares a custom typed data structure with explicit typed fields (ID string, Retries int).' },
              { code: 'func (w *WebhookEvent) RecordAttempt(...)', simpleMeaning: 'Defines a method bound to WebhookEvent. The asterisk (*) indicates a pointer receiver.' },
              { code: 'w.Retries++', simpleMeaning: 'Increments the retries count directly on the original struct in computer RAM memory.' }
            ],
            commonMistakes: [
              'Omitting the asterisk (*) in (w *WebhookEvent): value receivers operate on a duplicate copy and fail to save mutations!',
              'Using dynamic Python syntax (Go is strictly typed; types must be declared for every struct field).'
            ],
            quickCheckQuiz: {
              question: 'In Go, why do mutating methods require a Pointer Receiver (*Struct) instead of a Value Receiver (Struct)?',
              options: [
                'Pointers make the text turn blue.',
                'A Value Receiver receives an isolated clone copy; only a Pointer Receiver modifies the original struct in memory.',
                'Go will not compile any function without a pointer.'
              ],
              correctIndex: 1,
              explanation: 'Go passes parameters by value (copy) by default. The pointer receiver (*Struct) passes the underlying memory address, allowing in-place state changes.'
            },
            theoryMarkdown: `### Welcome to the Hard / Advanced Tier!
In the Intermediate tier, you mastered interpreted Python and relational SQL queries. In the **Advanced Tier**, we enter **high-throughput, compiled systems engineering** (Go, In-Memory Algorithms, and Distributed Topologies).

### Go Structs & Pointer Receivers
Go does not have traditional OOP \`class\` keywords. Instead, data is modeled with **Structs**, and behavior is attached with **Receiver Functions**:

\`\`\`go
type WebhookEvent struct {
    ID        string
    Payload   string
    Retries   int
    Delivered bool
}

// Pointer receiver (*WebhookEvent) mutates the live struct:
func (w *WebhookEvent) RecordAttempt(success bool) {
    w.Retries++
    if success {
        w.Delivered = true
    }
}
\`\`\`

#### Bridging Your Mental Model from Python:
- In Python: \`def record_attempt(self, success):\` $\to$ \`self\` is passed automatically.
- In Go: \`func (w *WebhookEvent) RecordAttempt(success bool)\` $\to$ \`w *WebhookEvent\` explicitly tells Go: "Attach this method to WebhookEvent, and give me a direct pointer to the struct in memory so I can modify its fields directly!"`,
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
            eli5Summary: 'Channels and goroutines are like having a team of 4 workers standing around a conveyor belt. The boss drops tasks onto the belt (jobs <- task), workers pick them up concurrently, and sync.WaitGroup waits until every worker signals "Done!"',
            codeBreakdown: [
              { code: 'jobs := make(chan int, len(tasks))', simpleMeaning: 'Allocates a thread-safe message queue channel holding task integers.' },
              { code: 'go func() { ... }()', simpleMeaning: 'Spawns an ultra-fast concurrent worker (goroutine) running on a background thread.' },
              { code: 'mu.Lock(); totalSum += task; mu.Unlock()', simpleMeaning: 'Mutex lock protects the shared sum variable from simultaneous read/write race conditions.' },
              { code: 'wg.Wait()', simpleMeaning: 'Blocks execution until every worker calls wg.Done(), guaranteeing zero lost calculations.' }
            ],
            commonMistakes: [
              'Forgetting to close the channel (close(jobs)) causing range loops over the channel to block forever in a deadlock.',
              'Modifying shared variables concurrently without a sync.Mutex lock (creates data race bugs).'
            ],
            quickCheckQuiz: {
              question: 'Why do Go systems engineers use CSP Channels instead of shared raw memory variables?',
              options: [
                'Channels make font colors brighter.',
                'The Go philosophy is: "Do not communicate by sharing memory; instead, share memory by communicating" to eliminate race conditions and deadlocks.',
                'Channels consume zero CPU power.'
              ],
              correctIndex: 1,
              explanation: 'CSP (Communicating Sequential Processes) channels provide structured, safe data pipelines between concurrent routines, preventing messy race conditions.'
            },
            theoryMarkdown: `### CSP: Communicating Sequential Processes
Traditional backend threads in C++ and Java use heavy operating system threads (~1MB each). In Go, **Goroutines** are lightweight cooperative green threads that cost only ~2KB!

To coordinate between concurrent workers safely without data corruptions:
1. **Channels**: Thread-safe pipes for queueing and streaming jobs: \`jobs <- task\` and \`task := <-jobs\`.
2. **WaitGroup**: Synchronizes routine completion (\`wg.Add(1)\`, \`defer wg.Done()\`, \`wg.Wait()\`).
3. **Mutex**: Guards shared accumulation accumulators with \`mu.Lock()\` and \`mu.Unlock()\`.

\`\`\`go
// Example: Concurrently processing batches
jobs := make(chan int, len(tasks))
for _, t := range tasks {
    jobs <- t
}
close(jobs) // Crucial! Signals no more work will be sent
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
            eli5Summary: 'An LRU (Least Recently Used) cache is like a bookshelf that only holds 3 books. Whenever you pull a book out to read, you slide it to the front. When the shelf is full and a new book arrives, you throw away the book sitting at the very back that hasn\'t been touched in the longest time!',
            codeBreakdown: [
              { code: 'self.order.remove(key); self.order.append(key)', simpleMeaning: 'Marks the key as most recently used by shifting it to the newest end of the order queue.' },
              { code: 'oldest = self.order.pop(0); del self.cache[oldest]', simpleMeaning: 'Eviction step: when capacity is full, drops the oldest key from both memory order and dictionary.' },
              { code: 'self.cache[key] = value', simpleMeaning: 'Saves the new or updated value into the instant hash map.' }
            ],
            commonMistakes: [
              'Forgetting to update the recency order during get() requests (an item that gets read must be moved to the front!).',
              'Evicting from the cache dictionary without also popping from the order list, creating desynchronized state.'
            ],
            quickCheckQuiz: {
              question: 'Why do production cache systems like Redis and Memcached use LRU eviction?',
              options: [
                'To randomly delete data.',
                'The Principle of Locality: data accessed recently is statistically much more likely to be requested again soon than stale data.',
                'Because computer RAM cannot store more than 100 items.'
              ],
              correctIndex: 1,
              explanation: 'Temporal Locality governs computer systems: keeping recently used items in fast memory maximizes cache hit rates and protects backend databases.'
            },
            theoryMarkdown: `### In-Memory Cache Engineering: The O(1) LRU Cache
In the intermediate tier, you connected to relational SQL databases on disk. However, spinning disks and even NVMe SSDs take milliseconds. Systems like **Redis** keep hot data directly in RAM memory for sub-millisecond $O(1)$ response times.

When RAM runs out of space, the cache must choose what to discard. The gold standard algorithm is **LRU (Least Recently Used)**:
- **Hash Map** (\`self.cache\`): Provides instant $O(1)$ key-value lookups.
- **Recency Queue** (\`self.order\`): Tracks recency order. The head (index 0) is the least recently accessed item; the tail is the most recently accessed.

#### Algorithm Specification:
1. \`get(key)\`:
   - If key does not exist: return \`-1\`.
   - If key exists: remove it from \`self.order\`, append it to the end (marking it newly refreshed), and return \`self.cache[key]\`.
2. \`put(key, value)\`:
   - If key already exists: remove it from \`self.order\`.
   - If key is new AND \`len(self.cache) >= self.capacity\`: pop index 0 from \`self.order\` and \`del self.cache[oldest]\`.
   - Insert \`self.cache[key] = value\` and append \`key\` to \`self.order\`.`,
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
            eli5Summary: 'Horizontal architecture is like running a busy supermarket: instead of forcing 1 cashier to ring up 1,000 customers per minute until they collapse, you open 10 cashier lanes, put a greeter at the door (Load Balancer) to direct traffic, and keep the most popular items at front kiosks (Redis Cache)!',
            codeBreakdown: [
              { code: 'Client Fleet -> Load Balancer', simpleMeaning: 'Incoming web mobile/browser traffic is accepted by a reverse proxy (HAProxy / NGINX / AWS ALB).' },
              { code: 'Load Balancer -> Web Replicas', simpleMeaning: 'Stateless application worker containers handle business logic in parallel.' },
              { code: 'Web Replicas -> Redis Cache', simpleMeaning: 'Ultra-fast in-memory cache intercepts 90% of database queries with sub-millisecond hits.' },
              { code: 'Redis Cache -> PostgreSQL', simpleMeaning: 'Persistent relational database stores ACID-compliant source of truth.' }
            ],
            commonMistakes: [
              'Putting state (sessions/files) directly onto web server disks, preventing horizontal scaling.',
              'Failing to place an in-memory cache in front of relational databases under high read loads.'
            ],
            quickCheckQuiz: {
              question: 'What is the key advantage of Horizontal Scaling (adding server replicas) over Vertical Scaling (buying a bigger machine)?',
              options: [
                'Horizontal scaling makes computers smaller.',
                'Horizontal scaling allows near-infinite scaling without single points of failure (if one server node dies, others absorb the load).',
                'Vertical scaling is free.'
              ],
              correctIndex: 1,
              explanation: 'Vertical scaling hits hard physical hardware limits and remains a single point of failure. Horizontal scaling provides fault tolerance and elasticity.'
            },
            theoryMarkdown: `### The Pinnacle Capstone: Distributed Architecture & High Availability
Congratulations on reaching the final tier of backend engineering! You have traversed the complete path:
1. **Easy Tier**: Code syntax, variables, lists, dictionaries, basic loops, and classes.
2. **Medium Tier**: Real backend services, API payload parsing, rate limiters, SQL relational joins, and Unix pipelines.
3. **Hard Tier**: Concurrency in Go, in-memory LRU caching, and now **Distributed High-Availability Architecture**.

### Horizontal Microservice Topology
High-concurrency systems (Uber, Netflix, Stripe) withstand millions of requests per second through layered decoupling:
1. **L7 Load Balancer (Reverse Proxy)**: Terminates TLS/SSL, balances requests round-robin or least-connections across stateless web replicas.
2. **Stateless Web Replicas**: Docker/Kubernetes container pods running identical code without local state.
3. **In-Memory Caching (Redis Cluster)**: Answers read requests in ~1ms, deflecting 90%+ of traffic from disk.
4. **Relational Database Cluster (PostgreSQL Primary + Read Replicas)**: Stores permanent transactional data with replication failover.`,
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
