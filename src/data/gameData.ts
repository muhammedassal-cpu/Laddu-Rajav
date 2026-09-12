import { GameLevel, Costume, FitnessStage, DailyChallenge } from '../types';

export const FITNESS_STAGES: FitnessStage[] = [
  {
    id: 1,
    name: "മടിയൻ രാജാവ്",
    emoji: "🍛",
    vibe: "കിടപ്പിലായ രാജാവ്, ഫുൾ ബിരിയാണിയും പഴംപൊരിയും!",
    tagline: "കിടക്കയിലെ ഭക്ഷണ പ്രിയൻ",
    minLevel: 1
  },
  {
    id: 2,
    name: "ഓട്ടക്കാരൻ രാജാവ്",
    emoji: "😎",
    vibe: "ചെറിയ നടത്തം തുടങ്ങി, ഇടയ്ക്കിടെ മുണ്ട് അഴിയുന്നു!",
    tagline: "കൊട്ടാരത്തിലെ വേഗക്കാരൻ",
    minLevel: 3
  },
  {
    id: 3,
    name: "മസിൽ രാജാവ്",
    emoji: "💪",
    vibe: "കണ്ണാടി കണ്ടാൽ മസിൽ പെരുപ്പിക്കും, കട്ട പോസ്!",
    tagline: "സ്വർണ്ണ പഴക്കുല തൂക്കുന്നവൻ",
    minLevel: 5
  },
  {
    id: 4,
    name: "സൂപ്പർ രാജാവ്",
    emoji: "⚡",
    vibe: "റോക്കറ്റ് വേഗത, പിന്നിൽ പുക മാത്രം!",
    tagline: "നാട്ടിലെ മിന്നൽ വീരൻ",
    minLevel: 7
  },
  {
    id: 5,
    name: "കേരള ഫിറ്റ് കിംഗ്",
    emoji: "👑",
    vibe: "മസിൽ പവർ സൂപ്പർഹീറോ! കസവ് മുണ്ട് ഇനി അഴിയില്ല!",
    tagline: "ലഡുവിന്റേയും ഫിറ്റ്നസിന്റെയും ഇതിഹാസ രാജാവ്",
    minLevel: 10
  }
];

export const INITIAL_LEVELS: GameLevel[] = [
  {
    id: 1,
    title: "മടിയൻ രാജാവിന്റെ മോശം പ്രഭാതം",
    subtitle: "കണ്ണാടിയിലെ തമാശ രംഗം",
    ladduTarget: 10,
    storageCap: 25,
    unlocked: true,
    completed: false,
    introGag: "രാജാവ് കണ്ണാടിയിലേക്ക് നോക്കി: 'ഈ കണ്ണാടിയിൽ എന്നെപ്പോലെ വേറൊരുത്തൻ ആരെടാ?!'",
    completionGag: "കോച്ച് മിർച്ചി ചിരിക്കുന്നു: 'ലെവൽ 1 കഴിഞ്ഞു. ഇനി 999 റൗണ്ട് ബാക്കി!'",
    primaryGame: 'running'
  },
  {
    id: 2,
    title: "ലഡു രഹസ്യം: സാധനങ്ങൾ തിന്നരുത്!",
    subtitle: "രാജകീയ അടുക്കള ബഹളം",
    ladduTarget: 20,
    storageCap: 25,
    unlocked: false,
    completed: false,
    introGag: "നെയ്യുടെ മണം! രാജാവിന്റെ നാവിൽ നിന്ന് വെള്ളമൊഴുകുന്നു!",
    completionGag: "രാജാവ് വലിയ ലഡു ഉണ്ടാക്കി: 'ഞാൻ ഒരു ശാസ്ത്രജ്ഞനായി!'",
    primaryGame: 'laddu_factory'
  },
  {
    id: 3,
    title: "ഓട് രാജാവേ ഓട്!",
    subtitle: "മാർക്കറ്റിലെ മിന്നൽ ഓട്ടം",
    ladduTarget: 35,
    storageCap: 30,
    unlocked: false,
    completed: false,
    introGag: "വാഴപ്പഴത്തൊലിയും കള്ളത്തേങ്ങയും റോഡിൽ നിരന്നിരിക്കുന്നു!",
    completionGag: "രാജാവ് സോഫയിൽ വീണു: 'ഞാൻ കായികതാരമായി അളിയാ!'",
    primaryGame: 'running'
  },
  {
    id: 4,
    title: "കുറി അടി: കല്ല് തിന്നല്ലേ!",
    subtitle: "ലക്ഷ്യത്തിലെ ഏറ് മത്സരം",
    ladduTarget: 50,
    storageCap: 35,
    unlocked: false,
    completed: false,
    introGag: "ലഡുവിന്റെ രൂപത്തിൽ കല്ലുകൾ ഉണ്ട്! രാജാവിന്റെ പല്ല് സൂക്ഷിക്കുക!",
    completionGag: "കല്ല് കടിക്കാതെ ജയിച്ചു! കോച്ച് മിർച്ചി അത്ഭുതപ്പെട്ടു!",
    primaryGame: 'kuri_adi'
  },
  {
    id: 5,
    title: "ഉത്സവപ്പറമ്പിലെ ബഹളം",
    subtitle: "ചെണ്ടമേളവും മിന്നൽ ചാട്ടവും",
    ladduTarget: 75,
    storageCap: 40,
    unlocked: false,
    completed: false,
    introGag: "നാടൻ വാഴപ്പഴവും കരിക്ക് കുലകളും ചാടിക്കടക്കണം!",
    completionGag: "പകുതി വഴി പിന്നിട്ടു! രാജാവിന്റെ വയറ് ചെറുതായി തുടങ്ങി!",
    primaryGame: 'running'
  },
  {
    id: 6,
    title: "മുളക് ചലഞ്ച്",
    subtitle: "എരിവ് കയറിയ ചെവിയിൽ നിന്ന് പുക!",
    ladduTarget: 90,
    storageCap: 45,
    unlocked: false,
    completed: false,
    introGag: "എരിവുള്ള കാന്താരി മുളക്! തെറ്റായ ഉന്നം വെച്ചാൽ ചെവിയിൽ നിന്ന് പുക വരും!",
    completionGag: "രാജാവ് തണുത്ത സംഭാരം കുടിച്ച് ആശ്വാസം കണ്ടെത്തി!",
    primaryGame: 'kuri_adi'
  },
  {
    id: 7,
    title: "രാജകീയ വ്യായാമ കുലുക്കം",
    subtitle: "സ്ക്വാട്ടും പുഷ്-അപ്പും മസിൽ പോസും",
    ladduTarget: 110,
    storageCap: 50,
    unlocked: false,
    completed: false,
    introGag: "സ്ക്വാട്ട് ചെയ്യുമ്പോൾ കസവ് മുണ്ട് അഴിയാതെ നോക്കണം!",
    completionGag: "അടിപൊളി കോംബോ! കോച്ച് മിർച്ചി കയ്യടിച്ചു!",
    primaryGame: 'workout'
  },
  {
    id: 8,
    title: "ലഡു ഫാക്ടറി സൂപ്പർ ചലഞ്ച്",
    subtitle: "മിന്നൽ വേഗത്തിൽ ലഡു ഉണ്ടാക്കൂ",
    ladduTarget: 130,
    storageCap: 60,
    unlocked: false,
    completed: false,
    introGag: "നെയ്യും കശുവണ്ടിയും മാന്ത്രിക ലഡു നിർമ്മാണവും!",
    completionGag: "ഗോൾഡൻ ലഡു തയ്യാർ! ലഡു പവർ ഇരട്ടിയായി!",
    primaryGame: 'laddu_factory'
  },
  {
    id: 9,
    title: "ഫൈനലിന് മുന്നോടിയായുള്ള പരിശീലനം",
    subtitle: "എല്ലാ തടസ്സങ്ങളും ഒരുമിച്ച്!",
    ladduTarget: 155,
    storageCap: 70,
    unlocked: false,
    completed: false,
    introGag: "കോച്ച് മിർച്ചി വിസിൽ അടിക്കുന്നു: 'ഇനി തോറ്റാൽ തീർന്നു!'",
    completionGag: "അവസാന ഘട്ടത്തിലേക്ക് സ്വാഗതം! ചാമ്പ്യൻഷിപ്പ് റെഡി!",
    primaryGame: 'running'
  },
  {
    id: 10,
    title: "കേരള ഫിറ്റ് കിംഗ് ചാമ്പ്യൻഷിപ്പ് 👑🔥",
    subtitle: "5-ഘട്ട ഫൈനലും മഹാ കിരീടധാരണവും",
    ladduTarget: 180,
    storageCap: 80,
    unlocked: false,
    completed: false,
    introGag: "5 ഘട്ടങ്ങൾ: ഓട്ടം, കുറി അടി, ലഡു നിർമ്മാണം, വർക്കൗട്ട്, ഫൈനൽ കോംബോ!",
    completionGag: "കേരള ഫിറ്റ് കിംഗ് വിജയിച്ചു! കസവ് മുണ്ടും മസിലും വേറെ ലെവൽ!",
    primaryGame: 'championship'
  }
];

export const INITIAL_COSTUMES: Costume[] = [
  {
    id: 'kerala_mallu',
    name: 'കേരള മല്ലു രാജാവ്',
    emoji: '🌴👑',
    description: 'സ്വർണ്ണക്കസവുള്ള മുണ്ട്, മേൽമുണ്ട്, കടുക്കൻ കമ്മൽ, പിരിച്ചുവെച്ച കട്ടമീശ!',
    price: 0,
    unlocked: true,
    specialGag: 'മസിൽ പെരുപ്പിക്കലും പൊളി സാധനം അലർച്ചയും!'
  },
  {
    id: 'default',
    name: 'കൊട്ടാര വസ്ത്രം',
    emoji: '👑',
    description: 'പരമ്പരാഗത പട്ടു വസ്ത്രവും തിളങ്ങുന്ന രാജകീയ അലങ്കാരങ്ങളും.',
    price: 0,
    unlocked: true,
    specialGag: 'ഓരോ കുലുക്കത്തിലും തെറിക്കുന്ന പൊട്ടിച്ചിരി!'
  },
  {
    id: 'chef',
    name: 'ഷെഫ് രാജാവ്',
    emoji: '👨‍🍳',
    description: 'വെളുത്ത ഷെഫ് തൊപ്പിയും ഏപ്രണും ധരിച്ച് പലഹാരങ്ങൾ ഉണ്ടാക്കാൻ റെഡി!',
    price: 60,
    unlocked: false,
    specialGag: 'ഓടുമ്പോൾ മാവ് പൊടികൾ പറക്കുന്നു!'
  },
  {
    id: 'sports',
    name: 'സ്പോർട്സ് രാജാവ്',
    emoji: '🏃',
    description: 'കളർ ഹെഡ്ബാൻഡും ഹൈ-ജമ്പ് ഷൂസും ധരിച്ച സ്പോർട്സ് വീരൻ.',
    price: 120,
    unlocked: false,
    specialGag: 'നിൽക്കുമ്പോഴും ചാടിക്കൊണ്ടേയിരിക്കുന്നു!'
  },
  {
    id: 'dance',
    name: 'ഡാൻസ് രാജാവ്',
    emoji: '🕺',
    description: 'സ്റ്റൈലിഷ് കൂളിംഗ് ഗ്ലാസും അടിപൊളി ഡാൻസ് സ്റ്റെപ്പുകളും.',
    price: 180,
    unlocked: false,
    specialGag: 'വിജയിക്കുമ്പോൾ തോളനക്കി അടിപൊളി ഡാൻസ്!'
  },
  {
    id: 'superhero',
    name: 'സൂപ്പർഹീറോ രാജാവ്',
    emoji: '🦸',
    description: 'തകർപ്പൻ സൂപ്പർഹീറോ വേഷവും പറക്കുന്ന ചുവന്ന ഷാളും.',
    price: 250,
    unlocked: false,
    specialGag: 'സ്വന്തമായി ഹീറോ മ്യൂസിക് പാടുന്നു!'
  },
  {
    id: 'coconut',
    name: 'തേങ്ങാ തൊപ്പി രാജാവ്',
    emoji: '🥥',
    description: 'തലയിൽ തേങ്ങാ ചിരട്ട ഹെൽമെറ്റായി വെച്ച വിരുതൻ!',
    price: 320,
    unlocked: false,
    specialGag: 'തേങ്ങ തലയിൽ വീണാലും ടോംഗ് ശബ്ദത്തോടെ തെറിച്ചുപോകും!'
  },
  {
    id: 'festival',
    name: 'ഉത്സവ രാജാവ്',
    emoji: '🪅',
    description: 'ചെണ്ടമേളവും പൂമാലകളും ചന്ദനക്കുറിയും ചാർത്തിയ ഉത്സവ ലുക്ക്!',
    price: 400,
    unlocked: false,
    specialGag: 'ചാടുമ്പോൾ വർണ്ണപ്പൊടികൾ ചിതറുന്നു!'
  },
  {
    id: 'fit_king',
    name: 'ഇതിഹാസ ഫിറ്റ് കിംഗ്',
    emoji: '✨👑',
    description: 'സ്വർണ്ണ തിളക്കമുള്ള ബോഡി ബിൽഡർ രാജാവ്! കസവ് മുണ്ട് കട്ടയ്ക്ക് നിൽക്കും!',
    price: 500,
    unlocked: false,
    specialGag: 'എപ്പോഴും ചുറ്റും സ്വർണ്ണ നക്ഷത്രങ്ങൾ മിന്നുന്നു!'
  }
];

export const INITIAL_DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'c1',
    title: "15 ലഡു ഉണ്ടാക്കുക",
    description: "രാജകീയ അടുക്കളയിൽ പുതിയ ലഡു ഉരുട്ടി പാക്ക് ചെയ്യുക.",
    target: 15,
    progress: 0,
    completed: false,
    rewardLaddus: 5,
    rewardCoins: 50
  },
  {
    id: 'c2',
    title: "2 ഓട്ട മത്സരങ്ങൾ ജയിക്കുക",
    description: "വാഴപ്പഴത്തൊലിയും സ്കൂട്ടറും ചാടിക്കടന്ന് വിജയം വരിക്കുക.",
    target: 2,
    progress: 0,
    completed: false,
    rewardLaddus: 6,
    rewardCoins: 60
  },
  {
    id: 'c3',
    title: "10 ഉന്നം കൃത്യമായി അടിക്കുക",
    description: "കുറി അടിയിൽ കല്ല് കടിക്കാതെ കൃത്യമായി ലഡുവിൽ അടിക്കുക.",
    target: 10,
    progress: 0,
    completed: false,
    rewardLaddus: 5,
    rewardCoins: 50
  }
];
