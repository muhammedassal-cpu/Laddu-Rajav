export interface MalayalamLetterItem {
  letter: string;
  translit: string;
  category: 'vowel' | 'consonant' | 'chillu';
  ipa: string;
  exampleWord: string;
  exampleTranslit: string;
  exampleMeaning: string;
  vowelFormants?: [number, number]; // [F1, F2] in Hz
}

export interface MalayalamWordItem {
  word: string;
  translit: string;
  meaning: string;
  category: 'food' | 'palace' | 'animals' | 'fitness' | 'numbers';
  emoji: string;
}

export interface MalayalamPhraseItem {
  phrase: string;
  translit: string;
  meaning: string;
  context: string;
  emoji: string;
}

// 1. ALL MALAYALAM LETTERS (അക്ഷരമാല)
export const MALAYALAM_LETTERS: MalayalamLetterItem[] = [
  // സ്വരാക്ഷരങ്ങൾ (Vowels)
  { letter: 'അ', translit: 'a', category: 'vowel', ipa: 'ʌ', exampleWord: 'അണ്ണാൻ', exampleTranslit: 'Annan', exampleMeaning: 'Squirrel', vowelFormants: [750, 1250] },
  { letter: 'ആ', translit: 'aa', category: 'vowel', ipa: 'aː', exampleWord: 'ആന', exampleTranslit: 'Aana', exampleMeaning: 'Elephant', vowelFormants: [820, 1180] },
  { letter: 'ഇ', translit: 'i', category: 'vowel', ipa: 'i', exampleWord: 'ഇല', exampleTranslit: 'Ila', exampleMeaning: 'Leaf', vowelFormants: [300, 2250] },
  { letter: 'ഈ', translit: 'ee', category: 'vowel', ipa: 'iː', exampleWord: 'ഈച്ച', exampleTranslit: 'Eecha', exampleMeaning: 'Housefly', vowelFormants: [280, 2400] },
  { letter: 'ഉ', translit: 'u', category: 'vowel', ipa: 'u', exampleWord: 'ഉണ്ണിയപ്പം', exampleTranslit: 'Unniyappam', exampleMeaning: 'Sweet Rice Fritter', vowelFormants: [350, 800] },
  { letter: 'ഊ', translit: 'oo', category: 'vowel', ipa: 'uː', exampleWord: 'ഊഞ്ഞാൽ', exampleTranslit: 'Oonjaal', exampleMeaning: 'Royal Swing', vowelFormants: [320, 750] },
  { letter: 'ഋ', translit: 'ru', category: 'vowel', ipa: 'rɨ', exampleWord: 'ഋഷി', exampleTranslit: 'Rishi', exampleMeaning: 'Sage', vowelFormants: [450, 1500] },
  { letter: 'എ', translit: 'e', category: 'vowel', ipa: 'e', exampleWord: 'എലി', exampleTranslit: 'Eli', exampleMeaning: 'Mouse', vowelFormants: [550, 1800] },
  { letter: 'ഏ', translit: 'ae', category: 'vowel', ipa: 'eː', exampleWord: 'ഏലം', exampleTranslit: 'Aelam', exampleMeaning: 'Cardamom', vowelFormants: [480, 1950] },
  { letter: 'ഐ', translit: 'ai', category: 'vowel', ipa: 'ai', exampleWord: 'ഐരാവതം', exampleTranslit: 'Airaavatham', exampleMeaning: 'Celestial Tusker', vowelFormants: [700, 2200] },
  { letter: 'ഒ', translit: 'o', category: 'vowel', ipa: 'o', exampleWord: 'ഒട്ടകം', exampleTranslit: 'Ottakam', exampleMeaning: 'Camel', vowelFormants: [520, 950] },
  { letter: 'ഓ', translit: 'oa', category: 'vowel', ipa: 'oː', exampleWord: 'ഓണം', exampleTranslit: 'Onam', exampleMeaning: 'Harvest Festival', vowelFormants: [460, 850] },
  { letter: 'ഔ', translit: 'au', category: 'vowel', ipa: 'au', exampleWord: 'ഔഷധം', exampleTranslit: 'Oushadham', exampleMeaning: 'Ayurvedic Medicine', vowelFormants: [650, 900] },
  { letter: 'അം', translit: 'am', category: 'vowel', ipa: 'am', exampleWord: 'അമ്പലം', exampleTranslit: 'Ambalam', exampleMeaning: 'Temple', vowelFormants: [750, 1250] },
  { letter: 'അഃ', translit: 'aha', category: 'vowel', ipa: 'aha', exampleWord: 'ദുഃഖം', exampleTranslit: 'Dukham', exampleMeaning: 'Sorrow', vowelFormants: [750, 1250] },

  // വ്യഞ്ജനാക്ഷരങ്ങൾ (Consonants) - ക വർഗ്ഗം
  { letter: 'ക', translit: 'ka', category: 'consonant', ipa: 'kʌ', exampleWord: 'കസവ്', exampleTranslit: 'Kasavu', exampleMeaning: 'Golden Zari border' },
  { letter: 'ഖ', translit: 'kha', category: 'consonant', ipa: 'kʰʌ', exampleWord: 'ഖഡ്ഗം', exampleTranslit: 'Khadgam', exampleMeaning: 'Royal Sword' },
  { letter: 'ഗ', translit: 'ga', category: 'consonant', ipa: 'ɡʌ', exampleWord: 'ഗദ', exampleTranslit: 'Gadha', exampleMeaning: 'Heavy Mace' },
  { letter: 'ഘ', translit: 'gha', category: 'consonant', ipa: 'ɡʱʌ', exampleWord: 'ഘടികാരം', exampleTranslit: 'Ghadikaaram', exampleMeaning: 'Clock' },
  { letter: 'ങ', translit: 'nga', category: 'consonant', ipa: 'ŋʌ', exampleWord: 'മാങ്ങ', exampleTranslit: 'Maanga', exampleMeaning: 'Mango' },

  // ച വർഗ്ഗം
  { letter: 'ച', translit: 'cha', category: 'consonant', ipa: 't͡ʃʌ', exampleWord: 'ചായ', exampleTranslit: 'Chaaya', exampleMeaning: 'Kerala Tea' },
  { letter: 'ഛ', translit: 'chha', category: 'consonant', ipa: 't͡ʃʰʌ', exampleWord: 'ഛത്രം', exampleTranslit: 'Chhathram', exampleMeaning: 'Royal Umbrella' },
  { letter: 'ജ', translit: 'ja', category: 'consonant', ipa: 'd͡ʒʌ', exampleWord: 'ജിലേബി', exampleTranslit: 'Jilebi', exampleMeaning: 'Sweet Jalebi' },
  { letter: 'ഝ', translit: 'jha', category: 'consonant', ipa: 'd͡ʒʱʌ', exampleWord: 'ഝഷം', exampleTranslit: 'Jhasham', exampleMeaning: 'Fish' },
  { letter: 'ഞ', translit: 'nya', category: 'consonant', ipa: 'ɲʌ', exampleWord: 'ഞണ്ട്', exampleTranslit: 'Njandu', exampleMeaning: 'Crab' },

  // ട വർഗ്ഗം (Retroflex)
  { letter: 'ട', translit: 'ta', category: 'consonant', ipa: 'ʈʌ', exampleWord: 'ട്രാഫിക്', exampleTranslit: 'Traffic', exampleMeaning: 'Traffic' },
  { letter: 'ഠ', translit: 'tha', category: 'consonant', ipa: 'ʈʰʌ', exampleWord: 'കണ്ഠം', exampleTranslit: 'Kantham', exampleMeaning: 'Throat' },
  { letter: 'ഡ', translit: 'da', category: 'consonant', ipa: 'ɖʌ', exampleWord: 'ഡമരു', exampleTranslit: 'Damaru', exampleMeaning: 'Hand drum' },
  { letter: 'ഢ', translit: 'dha', category: 'consonant', ipa: 'ɖʱʌ', exampleWord: 'ഢക്ക', exampleTranslit: 'Dhakka', exampleMeaning: 'Big drum' },
  { letter: 'ണ', translit: 'na', category: 'consonant', ipa: 'ɳʌ', exampleWord: 'മണി', exampleTranslit: 'Mani', exampleMeaning: 'Royal Bell' },

  // ത വർഗ്ഗം (Dental)
  { letter: 'ത', translit: 'tha', category: 'consonant', ipa: 't̪ʌ', exampleWord: 'തത്തമ്മ', exampleTranslit: 'Thathamma', exampleMeaning: 'Parrot' },
  { letter: 'ഥ', translit: 'thha', category: 'consonant', ipa: 't̪ʰʌ', exampleWord: 'രഥം', exampleTranslit: 'Ratham', exampleMeaning: 'Royal Chariot' },
  { letter: 'ദ', translit: 'da', category: 'consonant', ipa: 'd̪ʌ', exampleWord: 'ദീപം', exampleTranslit: 'Deepam', exampleMeaning: 'Oil Lamp' },
  { letter: 'ധ', translit: 'dha', category: 'consonant', ipa: 'd̪ʱʌ', exampleWord: 'ധനുസ്സ്', exampleTranslit: 'Dhanussu', exampleMeaning: 'Archery Bow' },
  { letter: 'ന', translit: 'na', category: 'consonant', ipa: 'n̪ʌ', exampleWord: 'നെയ്യ്', exampleTranslit: 'Neyy', exampleMeaning: 'Roasted Ghee' },

  // പ വർഗ്ഗം (Labial)
  { letter: 'പ', translit: 'pa', category: 'consonant', ipa: 'pʌ', exampleWord: 'പഴംപൊരി', exampleTranslit: 'Pazhampori', exampleMeaning: 'Banana Fritters' },
  { letter: 'ഫ', translit: 'pha', category: 'consonant', ipa: 'pʰʌ', exampleWord: 'ഫലം', exampleTranslit: 'Phalam', exampleMeaning: 'Fruit' },
  { letter: 'ബ', translit: 'ba', category: 'consonant', ipa: 'bʌ', exampleWord: 'ബലവാൻ', exampleTranslit: 'Balavaan', exampleMeaning: 'Strong King' },
  { letter: 'ഭ', translit: 'bha', category: 'consonant', ipa: 'bʱʌ', exampleWord: 'ഭാരതം', exampleTranslit: 'Bhaaratham', exampleMeaning: 'India' },
  { letter: 'മ', translit: 'ma', category: 'consonant', ipa: 'mʌ', exampleWord: 'മുണ്ട്', exampleTranslit: 'Mundu', exampleMeaning: 'Kerala Dhoti' },

  // മധ്യമങ്ങൾ & ഊഷ്മാക്കൾ (Semivowels, Sibilants, Special Malayalam Consonants)
  { letter: 'യ', translit: 'ya', category: 'consonant', ipa: 'jʌ', exampleWord: 'യോഗ', exampleTranslit: 'Yoga', exampleMeaning: 'Yoga Workout' },
  { letter: 'ര', translit: 'ra', category: 'consonant', ipa: 'ɾʌ', exampleWord: 'രാജാവ്', exampleTranslit: 'Raajaavu', exampleMeaning: 'The King' },
  { letter: 'ല', translit: 'la', category: 'consonant', ipa: 'lʌ', exampleWord: 'ലഡു', exampleTranslit: 'Laddu', exampleMeaning: 'Sweet Golden Laddu' },
  { letter: 'വ', translit: 'va', category: 'consonant', ipa: 'ʋʌ', exampleWord: 'വയറ്', exampleTranslit: 'Vayaru', exampleMeaning: 'Big Belly' },
  { letter: 'ശ', translit: 'sha', category: 'consonant', ipa: 'ʃʌ', exampleWord: 'ശംഖ്', exampleTranslit: 'Shankhu', exampleMeaning: 'Sacred Conch' },
  { letter: 'ഷ', translit: 'ssha', category: 'consonant', ipa: 'ʂʌ', exampleWord: 'ഷഡ്ഭുജം', exampleTranslit: 'Shadbhujam', exampleMeaning: 'Hexagon' },
  { letter: 'സ', translit: 'sa', category: 'consonant', ipa: 'sʌ', exampleWord: 'സദ്യ', exampleTranslit: 'Sadhya', exampleMeaning: 'Grand Kerala Feast' },
  { letter: 'ഹ', translit: 'ha', category: 'consonant', ipa: 'hʌ', exampleWord: 'ഹംസം', exampleTranslit: 'Hamsam', exampleMeaning: 'Swan' },
  { letter: 'ള', translit: 'lla', category: 'consonant', ipa: 'ɭʌ', exampleWord: 'കളി', exampleTranslit: 'Kali', exampleMeaning: 'Game' },
  { letter: 'ഴ', translit: 'zha', category: 'consonant', ipa: 'ɻʌ', exampleWord: 'മഴ', exampleTranslit: 'Mazha', exampleMeaning: 'Kerala Monsoon Rain' },
  { letter: 'റ', translit: 'rra', category: 'consonant', ipa: 'rʌ', exampleWord: 'റോക്കറ്റ്', exampleTranslit: 'Rocket', exampleMeaning: 'Speed Sprint' },

  // ചില്ലക്ഷരങ്ങൾ (Pure Consonant Chillu Endings)
  { letter: 'ൽ', translit: 'l', category: 'chillu', ipa: 'l', exampleWord: 'പാൽ', exampleTranslit: 'Paal', exampleMeaning: 'Fresh Milk' },
  { letter: 'ൾ', translit: 'll', category: 'chillu', ipa: 'ɭ', exampleWord: 'വാൾ', exampleTranslit: 'Vaal', exampleMeaning: 'Sword' },
  { letter: 'ൺ', translit: 'nn', category: 'chillu', ipa: 'ɳ', exampleWord: 'കണ്ണ്', exampleTranslit: 'Kannan', exampleMeaning: 'Eyes' },
  { letter: 'ൻ', translit: 'n', category: 'chillu', ipa: 'n', exampleWord: 'പൊൻ', exampleTranslit: 'Pon', exampleMeaning: 'Pure Gold' },
  { letter: 'ർ', translit: 'r', category: 'chillu', ipa: 'r', exampleWord: 'തേൻ', exampleTranslit: 'Then', exampleMeaning: 'Forest Honey' },
  { letter: 'ൿ', translit: 'k', category: 'chillu', ipa: 'k', exampleWord: 'വാൿ', exampleTranslit: 'Vaak', exampleMeaning: 'Royal Word' }
];

// 2. MALAYALAM ESSENTIAL WORDS (വാക്കുകൾ)
export const MALAYALAM_WORDS: MalayalamWordItem[] = [
  // ഭക്ഷണങ്ങൾ (Food Treats)
  { word: 'ലഡു', translit: 'Laddu', meaning: 'Sweet golden sweetmeat with roasted cashews', category: 'food', emoji: '🍬' },
  { word: 'പഴംപൊരി', translit: 'Pazhampori', meaning: 'Crispy fried sweet banana fritter', category: 'food', emoji: '🍌' },
  { word: 'ഉണ്ണിയപ്പം', translit: 'Unniyappam', meaning: 'Ghee-fried jaggery banana rice dumplings', category: 'food', emoji: '🥮' },
  { word: 'നെയ്യപ്പം', translit: 'Neyyappam', meaning: 'Crispy caramelized ghee delicacy', category: 'food', emoji: '🥞' },
  { word: 'പാലട പ്രഥമൻ', translit: 'Palada Prathaman', meaning: 'Rich pink boiled milk dessert with rice flakes', category: 'food', emoji: '🥣' },
  { word: 'കട്ടൻ ചായ', translit: 'Kattan Chaaya', meaning: 'Strong black tea with cardamom and ginger', category: 'food', emoji: '☕' },
  { word: 'കരിക്ക്', translit: 'Karikku', meaning: 'Fresh sweet tender coconut water', category: 'food', emoji: '🥥' },
  { word: 'പുട്ടും കടലയും', translit: 'Puttum Kadalayum', meaning: 'Steamed rice cylinders with black chickpea curry', category: 'food', emoji: '🍲' },

  // കൊട്ടാരം (Palace & Royal Life)
  { word: 'രാജാവ്', translit: 'Raajaavu', meaning: 'The royal King of Kerala', category: 'palace', emoji: '👑' },
  { word: 'സിംഹാസനം', translit: 'Simhaasanam', meaning: 'Golden lion throne', category: 'palace', emoji: '🪑' },
  { word: 'കിരീടം', translit: 'Kireedam', meaning: 'Gleaming jewel-studded royal crown', category: 'palace', emoji: '👑' },
  { word: 'കസവ് മുണ്ട്', translit: 'Kasavu Mundu', meaning: 'Traditional handwoven gold-bordered mundu', category: 'palace', emoji: '🥻' },
  { word: 'നിലവിളക്ക്', translit: 'Nilavilakku', meaning: 'Sacred Kerala tiered brass oil lamp', category: 'palace', emoji: '🪔' },
  { word: 'നെറ്റിപ്പട്ടം', translit: 'Nettipattam', meaning: 'Gilded elephant forehead caparison', category: 'palace', emoji: '✨' },
  { word: 'താഴികക്കുടം', translit: 'Thaazhikakkudam', meaning: 'Golden temple/palace pinnacle dome', category: 'palace', emoji: '🛕' },
  { word: 'പൂക്കളം', translit: 'Pookkalam', meaning: 'Floral carpet welcome pattern', category: 'palace', emoji: '🌸' },

  // മൃഗങ്ങൾ (Palace Pets & Animals)
  { word: 'അണ്ണാൻ', translit: 'Annan', meaning: 'Kerala three-striped palm squirrel', category: 'animals', emoji: '🐿️' },
  { word: 'കൊമ്പൻ ആന', translit: 'Komban Aana', meaning: 'Grand tusker elephant', category: 'animals', emoji: '🐘' },
  { word: 'ആട്', translit: 'Aadu', meaning: 'Cheeky domestic goat who munches leaves', category: 'animals', emoji: '🐐' },
  { word: 'തത്തമ്മ', translit: 'Thathamma', meaning: 'Bright green talking parakeet', category: 'animals', emoji: '🦜' },
  { word: 'പൂച്ച', translit: 'Poocha', meaning: 'Playful royal kitten who loves milk payasam', category: 'animals', emoji: '🐱' },

  // വ്യായാമവും കളിയും (Fitness & Action)
  { word: 'വ്യായാമം', translit: 'Vyaayaamam', meaning: 'Physical fitness exercise', category: 'fitness', emoji: '🏋️' },
  { word: 'ഓട്ടം', translit: 'Oottam', meaning: 'Running sprint to melt the king belly', category: 'fitness', emoji: '🏃' },
  { word: 'ചാട്ടം', translit: 'Chaattam', meaning: 'Jumping over obstacles', category: 'fitness', emoji: '🦘' },
  { word: 'കുറിയടി', translit: 'Kuri Adi', meaning: 'Precision traditional target hitting', category: 'fitness', emoji: '🎯' },
  { word: 'വയറ് കുറയ്ക്കൽ', translit: 'Vayaru Kuraykkal', meaning: 'Belly fat reduction mission', category: 'fitness', emoji: '🔥' },
  { word: 'വിയർപ്പ്', translit: 'Viyarppu', meaning: 'Sweat from intense royal workouts', category: 'fitness', emoji: '💦' },
  { word: 'മസിൽ', translit: 'Muscle', meaning: 'Biceps and athletic power', category: 'fitness', emoji: '💪' },

  // സംഖ്യകൾ (Malayalam Numbers)
  { word: 'ഒന്ന്', translit: 'Onnu', meaning: 'One (1)', category: 'numbers', emoji: '1️⃣' },
  { word: 'രണ്ട്', translit: 'Randu', meaning: 'Two (2)', category: 'numbers', emoji: '2️⃣' },
  { word: 'മൂന്ന്', translit: 'Moonnu', meaning: 'Three (3)', category: 'numbers', emoji: '3️⃣' },
  { word: 'നാല്', translit: 'Naalu', meaning: 'Four (4)', category: 'numbers', emoji: '4️⃣' },
  { word: 'അഞ്ച്', translit: 'Anchu', meaning: 'Five (5)', category: 'numbers', emoji: '5️⃣' },
  { word: 'ആറ്', translit: 'Aaru', meaning: 'Six (6)', category: 'numbers', emoji: '6️⃣' },
  { word: 'ഏഴ്', translit: 'Aezhu', meaning: 'Seven (7)', category: 'numbers', emoji: '7️⃣' },
  { word: 'എട്ട്', translit: 'Ettu', meaning: 'Eight (8)', category: 'numbers', emoji: '8️⃣' },
  { word: 'ഒൻപത്', translit: 'Onpathu', meaning: 'Nine (9)', category: 'numbers', emoji: '9️⃣' },
  { word: 'പത്ത്', translit: 'Pathu', meaning: 'Ten (10)', category: 'numbers', emoji: '🔟' }
];

// 3. VIRAL KERALA PHRASES & SLANG (നാടൻ ശൈലികൾ)
export const MALAYALAM_PHRASES: MalayalamPhraseItem[] = [
  {
    phrase: 'പൊളി മച്ചാനെ!',
    translit: 'Pwoli machanne!',
    meaning: 'Awesome bro! Smashed it completely!',
    context: 'Celebration when achieving high score or completing a fitness stage',
    emoji: '🔥'
  },
  {
    phrase: 'മച്ചാൻ തീ ആണ്!',
    translit: 'Machan thee aahn!',
    meaning: 'Bro is pure fire! Unstoppable energy!',
    context: 'When the King sprints fast without dropping his laddus',
    emoji: '⚡'
  },
  {
    phrase: 'തന്ത ഉണ്ടോ?!',
    translit: 'Thantha undo?!',
    meaning: 'Have you no shame?! (Playful roast)',
    context: 'Viral Kerala comedic retort when the King snacks lazily in the gym',
    emoji: '😂'
  },
  {
    phrase: 'മെല്ലെ അനങ്ങി പണി എടുക്ക്!',
    translit: 'Mell anagi pani edukk!',
    meaning: 'Move your lazy bones and get to work!',
    context: 'Coach Mirchi and Squirrel shouting at the King to start workout',
    emoji: '💪'
  },
  {
    phrase: 'സീൻ ഡാർക്ക് ആണല്ലോ അളിയാ!',
    translit: 'Scene dark aanallo aliya!',
    meaning: 'The situation is looking scary/dangerous bro!',
    context: 'When obstacles are approaching or time is running out',
    emoji: '😱'
  },
  {
    phrase: 'വേറെ ലെവൽ പെർഫോമൻസ്!',
    translit: 'Vere level performance!',
    meaning: 'Next-level magnificent performance!',
    context: 'When unlocking a new Kerala costume or clearing all levels',
    emoji: '👑'
  },
  {
    phrase: 'കസവ് മുണ്ട് അഴിയാതെ നോക്ക്!',
    translit: 'Kasavu mundu azhiyaathe nokku!',
    meaning: 'Take care your gold mundu does not slip off while running!',
    context: 'Running hurdle warning',
    emoji: '🏃'
  },
  {
    phrase: 'കട്ടയ്ക്ക് കൂടെയുണ്ട്!',
    translit: 'Kattakku koodeyundu!',
    meaning: 'Standing rock-solid behind you no matter what!',
    context: 'Friendship pledge from the Squirrel and pets',
    emoji: '🤝'
  },
  {
    phrase: 'പവർ വരട്ടെ!',
    translit: 'Power varatte!',
    meaning: 'Bring on the maximum royal energy!',
    context: 'Pre-game boost phrase',
    emoji: '🚀'
  },
  {
    phrase: 'അയ്യോ എന്റെ വാല് ചവിട്ടല്ലേ!',
    translit: 'Ayyoo ente vaalu chavittalle!',
    meaning: 'Hey! Do not step on my bushy squirrel tail!',
    context: 'When clicking the squirrel repeatedly',
    emoji: '🐿️'
  }
];
