export const wordList = {
  kindergarten: [
    // Single Letters
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    // CVC Words (Consonant-Vowel-Consonant)
    "cat", "dog", "pig", "sun", "hat", "mom", "dad", "red", "big", "box"
  ],
  firstGrade: [
    // Dolch Pre-Primer & Primer
    "the", "to", "and", "a", "i", "you", "it", "in", "said", "for", 
    "up", "look", "is", "go", "we", "little", "down", "can", "see", 
    "not", "one", "my", "me", "blue", "red", "jump", "help", "make"
  ]
};

export const getRandomWord = (level = 'kindergarten') => {
  const list = wordList[level];
  return list[Math.floor(Math.random() * list.length)];
};