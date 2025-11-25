export const wordList = {
  // Level 1: Single Letters (easiest - learn keyboard layout)
  letters: [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ],

  // Level 2: Two-Letter Words (short and simple)
  twoLetter: [
    "at", "an", "am", "as", "ax",
    "be", "by", "do", "go", "he",
    "hi", "if", "in", "is", "it",
    "me", "my", "no", "of", "on",
    "or", "so", "to", "up", "us", "we"
  ],

  // Level 3: CVC Words (Consonant-Vowel-Consonant - core phonics)
  cvc: [
    // Short 'a' family
    "bat", "cat", "hat", "mat", "rat", "sat", "fat", "pat", "van", "man",
    "can", "ran", "pan", "tan", "bag", "tag", "wag", "rag", "dad", "mad",

    // Short 'e' family
    "bed", "red", "led", "fed", "pet", "met", "net", "wet", "set", "jet",
    "get", "let", "hen", "pen", "ten", "men", "den",

    // Short 'i' family
    "big", "dig", "fig", "pig", "wig", "bit", "fit", "hit", "kit", "sit",
    "lit", "pit", "bin", "fin", "pin", "tin", "win", "kid", "lid", "rid",

    // Short 'o' family
    "box", "fox", "dog", "log", "hog", "fog", "jog", "hot", "pot", "dot",
    "not", "got", "lot", "mom", "top", "hop", "mop", "pop", "cop",

    // Short 'u' family
    "bug", "hug", "mug", "rug", "tug", "jug", "bus", "gum", "sun", "run",
    "fun", "bun", "cup", "pup", "cut", "but", "nut", "hut"
  ],

  // Level 4: Kindergarten Sight Words (Dolch Pre-Primer)
  kindergarten: [
    "a", "and", "away", "big", "blue", "can", "come", "down", "find", "for",
    "funny", "go", "help", "here", "i", "in", "is", "it", "jump", "little",
    "look", "make", "me", "my", "not", "one", "play", "red", "run", "said",
    "see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you"
  ],

  // Level 5: First Grade Sight Words (Dolch Primer)
  firstGrade: [
    "all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came",
    "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like",
    "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran",
    "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this",
    "too", "under", "want", "was", "well", "went", "what", "white", "who", "will",
    "with", "yes"
  ],

  // Bonus: Fun Theme Words (animals, colors, family)
  animals: [
    "cat", "dog", "pig", "cow", "hen", "fox", "bee", "bug", "ant", "bat",
    "bear", "deer", "duck", "fish", "frog", "goat", "lion", "seal", "swan", "wolf"
  ],

  colors: [
    "red", "blue", "pink", "green", "white", "black", "brown", "yellow", "orange", "purple"
  ],

  family: [
    "mom", "dad", "son", "baby", "aunt", "uncle", "sister", "brother", "grandma", "grandpa"
  ]
};

// Get a random word from a specific level
export const getRandomWord = (level = 'kindergarten') => {
  const list = wordList[level];
  if (!list) {
    console.warn(`Level "${level}" not found, defaulting to kindergarten`);
    return wordList.kindergarten[0];
  }
  return list[Math.floor(Math.random() * list.length)];
};

// Get a random word from multiple levels (mix and match)
export const getRandomWordFromLevels = (levels = ['kindergarten']) => {
  const combinedList = levels.flatMap(level => wordList[level] || []);
  return combinedList[Math.floor(Math.random() * combinedList.length)];
};

// Get all available level names
export const getLevelNames = () => Object.keys(wordList);

// Suggested progression paths for different learning goals
export const learningPaths = {
  beginner: ['letters', 'twoLetter', 'cvc'],
  kindergarten: ['twoLetter', 'cvc', 'kindergarten', 'animals', 'colors', 'family'],
  firstGrade: ['cvc', 'kindergarten', 'firstGrade'],
  fun: ['animals', 'colors']
};