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
  }
];
