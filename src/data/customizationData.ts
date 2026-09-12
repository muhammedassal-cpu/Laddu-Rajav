import { CustomizableItem, SquirrelCostumeId, PalaceStyleId, BackgroundThemeId } from '../types';

export const KING_DRESS_ITEMS: CustomizableItem[] = [
  {
    id: 'kerala_mallu',
    category: 'king',
    name: 'കേരള മല്ലു രാജാവ്',
    emoji: '🌴👑',
    description: 'സ്വർണ്ണക്കസവുള്ള മുണ്ട്, മേൽമുണ്ട്, കടുക്കൻ കമ്മൽ, പിരിച്ചുവെച്ച കട്ടമീശ!',
    price: 0,
    unlocked: true,
    specialGag: 'മസിൽ പെരുപ്പിക്കലും പൊളി സാധനം അലർച്ചയും!'
  },
  {
    id: 'default',
    category: 'king',
    name: 'കൊട്ടാര വസ്ത്രം',
    emoji: '👑',
    description: 'പരമ്പരാഗത പട്ടു വസ്ത്രവും തിളങ്ങുന്ന രാജകീയ അലങ്കാരങ്ങളും.',
    price: 0,
    unlocked: true,
    specialGag: 'ഓരോ കുലുക്കത്തിലും തെറിക്കുന്ന പൊട്ടിച്ചിരി!'
  },
  {
    id: 'chef',
    category: 'king',
    name: 'ഷെഫ് രാജാവ്',
    emoji: '👨‍🍳',
    description: 'വെളുത്ത ഷെഫ് തൊപ്പിയും ഏപ്രണും ധരിച്ച് പലഹാരങ്ങൾ ഉണ്ടാക്കാൻ റെഡി!',
    price: 60,
    unlocked: false,
    specialGag: 'ഓടുമ്പോൾ മാവ് പൊടികൾ പറക്കുന്നു!'
  },
  {
    id: 'sports',
    category: 'king',
    name: 'സ്പോർട്സ് രാജാവ്',
    emoji: '🏃',
    description: 'കളർ ഹെഡ്ബാൻഡും ഹൈ-ജമ്പ് ഷൂസും ധരിച്ച സ്പോർട്സ് വീരൻ.',
    price: 120,
    unlocked: false,
    specialGag: 'നിൽക്കുമ്പോഴും ചാടിക്കൊണ്ടേയിരിക്കുന്നു!'
  },
  {
    id: 'dance',
    category: 'king',
    name: 'ഡാൻസ് രാജാവ്',
    emoji: '🕺',
    description: 'സ്റ്റൈലിഷ് കൂളിംഗ് ഗ്ലാസും അടിപൊളി ഡാൻസ് സ്റ്റെപ്പുകളും.',
    price: 180,
    unlocked: false,
    specialGag: 'വിജയിക്കുമ്പോൾ തോളനക്കി അടിപൊളി ഡാൻസ്!'
  },
  {
    id: 'superhero',
    category: 'king',
    name: 'സൂപ്പർഹീറോ രാജാവ്',
    emoji: '🦸',
    description: 'തകർപ്പൻ സൂപ്പർഹീറോ വേഷവും പറക്കുന്ന ചുവന്ന ഷാളും.',
    price: 250,
    unlocked: false,
    specialGag: 'സ്വന്തമായി ഹീറോ മ്യൂസിക് പാടുന്നു!'
  },
  {
    id: 'police',
    category: 'king',
    name: 'സിംഗം പോലീസ് രാജാവ്',
    emoji: '👮',
    description: 'കാക്കി യൂണിഫോമും പോലീസ് തൊപ്പിയും കൂളിംഗ് ഗ്ലാസും!',
    price: 280,
    unlocked: false,
    specialGag: 'വിസിൽ ഊതി കള്ളന്മാരെ പേടിപ്പിക്കുന്നു!'
  },
  {
    id: 'coconut',
    category: 'king',
    name: 'തേങ്ങാ തൊപ്പി രാജാവ്',
    emoji: '🥥',
    description: 'തലയിൽ തേങ്ങാ ചിരട്ട ഹെൽമെറ്റായി വെച്ച വിരുതൻ!',
    price: 320,
    unlocked: false,
    specialGag: 'തേങ്ങ തലയിൽ വീണാലും ടോംഗ് ശബ്ദത്തോടെ തെറിച്ചുപോകും!'
  },
  {
    id: 'kathakali',
    category: 'king',
    name: 'കഥകളി രാജാവ്',
    emoji: '🎭',
    description: 'കഥകളി കിരീടവും ആടയാഭരണങ്ങളും ചുവപ്പ് പച്ച വേഷവും!',
    price: 360,
    unlocked: false,
    specialGag: 'കണ്ണുരുട്ടി തകർപ്പൻ നവരസ അഭിനയം!'
  },
  {
    id: 'festival',
    category: 'king',
    name: 'ഉത്സവ രാജാവ്',
    emoji: '🪅',
    description: 'ചെണ്ടമേളവും പൂമാലകളും ചന്ദനക്കുറിയും ചാർത്തിയ ഉത്സവ ലുക്ക്!',
    price: 400,
    unlocked: false,
    specialGag: 'ചാടുമ്പോൾ വർണ്ണപ്പൊടികൾ ചിതറുന്നു!'
  },
  {
    id: 'fit_king',
    category: 'king',
    name: 'ഇതിഹാസ ഫിറ്റ് കിംഗ്',
    emoji: '✨👑',
    description: 'സ്വർണ്ണ തിളക്കമുള്ള ബോഡി ബിൽഡർ രാജാവ്! കസവ് മുണ്ട് കട്ടയ്ക്ക് നിൽക്കും!',
    price: 500,
    unlocked: false,
    specialGag: 'എപ്പോഴും ചുറ്റും സ്വർണ്ണ നക്ഷത്രങ്ങൾ മിന്നുന്നു!'
  }
];

export const SQUIRREL_ITEMS: CustomizableItem[] = [
  {
    id: 'sq_default',
    category: 'squirrel',
    name: 'നാടൻ ചിപ്പൻ',
    emoji: '🐿️',
    description: 'സ്വാഭാവിക മൂന്നു വരയുള്ള കേരള അണ്ണാൻ, കൊതിപ്പിക്കുന്ന നെയ്യ് ലഡുവുമായി!',
    price: 0,
    unlocked: true,
    specialGag: 'വാൽ ആട്ടി ലഡു കൊറിക്കുന്നു!'
  },
  {
    id: 'sq_kasavu',
    category: 'squirrel',
    name: 'കസവ് ചിപ്പൻ',
    emoji: '👑🐿️',
    description: 'മിനി സ്വർണ്ണ കിരീടവും കസവ് നേരിയതും ചന്ദനക്കുറിയും ചാർത്തിയ കുട്ടി രാജാവ്!',
    price: 80,
    unlocked: false,
    specialGag: 'രാജാവിനെ നോക്കി സല്യൂട്ട് അടിക്കുന്നു!'
  },
  {
    id: 'sq_ninja',
    category: 'squirrel',
    name: 'നിഞ്ച ചിപ്പൻ',
    emoji: '🥷🐿️',
    description: 'കറുത്ത നിഞ്ച മാസ്കും പറക്കുന്ന ചുവന്ന ഹെഡ്ബാൻഡും ഷൂറിക്കൻ ലഡുവും!',
    price: 140,
    unlocked: false,
    specialGag: 'വാൽ ചുഴറ്റി കാറ്റിൽ കരണം മറിയുന്നു!'
  },
  {
    id: 'sq_cool',
    category: 'squirrel',
    name: 'കൂൾ ചിപ്പൻ',
    emoji: '🕶️🐿️',
    description: 'റെട്രോ ഡാർക്ക് കൂളിംഗ് ഗ്ലാസും കഴുത്തിൽ കട്ടി സ്വർണ്ണ മാലയും തിരിച്ചു വെച്ച ക്യാപ്പും!',
    price: 200,
    unlocked: false,
    specialGag: 'ഗ്ലാസ് തള്ളി വെച്ച് വിങ്ക് ചെയ്യുന്നു!'
  },
  {
    id: 'sq_gym',
    category: 'squirrel',
    name: 'ജിം ചിപ്പൻ',
    emoji: '🏋️🐿️',
    description: 'റെഡ് സ്വെറ്റ്‌ബാൻഡും കറുത്ത ജിം ബനിയനും കൈയ്യിൽ മിനി ഇരുമ്പ് ഡംബലും!',
    price: 260,
    unlocked: false,
    specialGag: 'ഡംബൽ ഉയർത്തി കുഞ്ഞു ബൈസെപ്സ് പെരുപ്പിക്കുന്നു!'
  },
  {
    id: 'sq_theyyam',
    category: 'squirrel',
    name: 'തെയ്യം ചിപ്പൻ',
    emoji: '👹🐿️',
    description: 'തെയ്യം മുടിയും മുഖത്തെഴുത്തും കാലിൽ മണി കിലുങ്ങുന്ന ചിലമ്പും!',
    price: 340,
    unlocked: false,
    specialGag: 'ചിലമ്പ് കുലുക്കി കൊട്ടാര മുറ്റത്ത് ഉറഞ്ഞു തുള്ളുന്നു!'
  },
  {
    id: 'sq_superhero',
    category: 'squirrel',
    name: 'സൂപ്പർ ചിപ്പൻ',
    emoji: '⚡🐿️',
    description: 'പറക്കുന്ന ചുവന്ന ഹീറോ ഷാളും നെഞ്ചിൽ സുവർണ്ണ മിന്നൽ ചിഹ്നവും!',
    price: 450,
    unlocked: false,
    specialGag: 'റോക്കറ്റ് പോലെ മുകളിലേക്ക് പറന്നുയരുന്നു!'
  }
];

export const PALACE_ITEMS: CustomizableItem[] = [
  {
    id: 'palace_travancore',
    category: 'palace',
    name: 'തിരുവിതാംകൂർ തേക്ക് കൊട്ടാരം',
    emoji: '🛕',
    description: 'പാരമ്പര്യ തേക്ക് മരത്തൂണുകളും ഓട് മേഞ്ഞ മേൽക്കൂരയും തിളങ്ങുന്ന നിലവിളക്കുകളും പൂക്കളവും!',
    price: 0,
    unlocked: true,
    specialGag: 'നിലവിളക്കിലെ തിരി നാളം ശാന്തമായി തെളിയുന്നു.'
  },
  {
    id: 'palace_gold',
    category: 'palace',
    name: 'സ്വർണ്ണ ദർബാർ ഹാൾ',
    emoji: '✨🏛️',
    description: '24K ശുദ്ധ സ്വർണ്ണ തൂണുകളും രത്നക്കല്ലുകൾ പതിച്ച താഴികക്കുടവും രാജകീയ നീല പരവതാനിയും!',
    price: 150,
    unlocked: false,
    specialGag: 'ഓരോ കോണിലും സ്വർണ്ണ തിളക്കം കണ്ണ് ചിമ്മിക്കുന്നു!'
  },
  {
    id: 'palace_monsoon',
    category: 'palace',
    name: 'മഴ നനഞ്ഞ പൂമുഖം',
    emoji: '🌧️🪷',
    description: 'കുളിർമഴത്തുള്ളികളും താമര വിരിഞ്ഞ പിച്ചള ഉരുളിയും മഴച്ചാറ്റലും കരിങ്കൽ കൊത്തുപണികളും!',
    price: 240,
    unlocked: false,
    specialGag: 'മഴത്തുള്ളികൾ വീഴുമ്പോൾ പ്ലിങ്ക് പ്ലോങ്ക് സംഗീതം!'
  },
  {
    id: 'palace_pooram',
    category: 'palace',
    name: 'പൂര ഉത്സവാഘോഷ കൊട്ടാരം',
    emoji: '🥁🐘',
    description: 'സ്വർണ്ണ നെറ്റിപ്പട്ടങ്ങളും ചെണ്ടമേളവും മഞ്ഞ വാടാമല്ലി പൂമാലകളും തട്ടുകളുള്ള ദീപസ്തംഭവും!',
    price: 350,
    unlocked: false,
    specialGag: 'ഇലഞ്ഞിത്തറ മേളത്തിന്റെ മാന്ത്രിക മുരൾച്ച കേൾക്കാം!'
  },
  {
    id: 'palace_cyber',
    category: 'palace',
    name: 'സൈബർ നിയോൺ കൊട്ടാരം',
    emoji: '⚡👾',
    description: 'നിയോൺ നീല-വയലറ്റ് ഗേബിളുകളും ലേസർ നിലവിളക്കും സിന്ത്‌വേവ് ഫ്ലോർ ഗ്രിഡും!',
    price: 480,
    unlocked: false,
    specialGag: 'ലേസർ ദീപങ്ങൾ ഡിജിറ്റൽ താളത്തിനൊത്ത് മിന്നുന്നു!'
  }
];

export const BACKGROUND_ITEMS: CustomizableItem[] = [
  {
    id: 'palace',
    category: 'background',
    name: 'കൊട്ടാര മുറ്റം',
    emoji: '🛕',
    description: 'പാരമ്പര്യ കേരള രാജകൊട്ടാരത്തിന്റെ തലയെടുപ്പുള്ള കൊട്ടാരമുറ്റം.',
    price: 0,
    unlocked: true,
    specialGag: 'രാജകീയ തനിമയും ശാന്തതയും!'
  },
  {
    id: 'backwaters',
    category: 'background',
    name: 'ആലപ്പുഴ കായലോരം',
    emoji: '⛵',
    description: 'തെങ്ങോലകൾ കാറ്റിലാടുന്ന കായലും ഒഴുകുന്ന കെട്ടുവള്ളങ്ങളും തണുത്ത ഓളങ്ങളും.',
    price: 100,
    unlocked: false,
    specialGag: 'കായലിലെ ഓളങ്ങൾ തഴുകിപ്പോകുന്നു!'
  },
  {
    id: 'pooram',
    category: 'background',
    name: 'തൃശ്ശൂർ പൂരപ്പറമ്പ്',
    emoji: '🥁',
    description: 'ആകാശത്ത് പടക്കപ്പൊലിമയും വർണ്ണക്കുടമാറ്റവും ചെണ്ടമേളവും രാത്രിക്കാഴ്ചയും!',
    price: 180,
    unlocked: false,
    specialGag: 'പൂരപ്പറമ്പിലെ കുടമാറ്റം മിന്നിമറയുന്നു!'
  },
  {
    id: 'munnar',
    category: 'background',
    name: 'മൂന്നാർ മലനിരകൾ',
    emoji: '☕',
    description: 'തേയിലത്തോട്ടങ്ങളും കുളിർ തെന്നലും രാവിലെ വിരിയുന്ന മൂടൽമഞ്ഞും മലകളും.',
    price: 260,
    unlocked: false,
    specialGag: 'മൂടൽമഞ്ഞ് കൺമുന്നിൽ ഒഴുകി നീങ്ങുന്നു!'
  },
  {
    id: 'wayanad',
    category: 'background',
    name: 'വയനാടൻ കാട്',
    emoji: '🎋',
    description: 'കാട്ടരുവിയും പച്ചമുളങ്കാടുകളും വർണ്ണ പക്ഷികളും തണുത്ത വന്യതയും.',
    price: 360,
    unlocked: false,
    specialGag: 'മുളങ്കാടുകളിലൂടെ വീശുന്ന ഇളംകാറ്റ്!'
  },
  {
    id: 'varkala',
    category: 'background',
    name: 'വർക്കല ബീച്ച്',
    emoji: '🏖️',
    description: 'ചുവന്ന മലഞ്ചെരുവും അറബിക്കടലിൽ താഴുന്ന സന്ധ്യാ സൂര്യനും തിരമാലകളും!',
    price: 450,
    unlocked: false,
    specialGag: 'സന്ധ്യാ സൂര്യന്റെ സ്വർണ്ണക്കടൽ തിളക്കം!'
  }
];
