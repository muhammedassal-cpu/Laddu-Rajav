import React, { useState } from 'react';
import { X, Volume2, Search, BookOpen, Sparkles, HelpCircle, Check } from 'lucide-react';
import { 
  MALAYALAM_LETTERS, 
  MALAYALAM_WORDS, 
  MALAYALAM_PHRASES,
  MalayalamLetterItem,
  MalayalamWordItem,
  MalayalamPhraseItem
} from '../data/malayalamDictionary';
import { sound } from '../utils/audio';

interface MalayalamDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DictionaryTab = 'letters' | 'words' | 'phrases';
type LetterCategoryFilter = 'all' | 'vowel' | 'consonant' | 'chillu';
type WordCategoryFilter = 'all' | 'food' | 'palace' | 'animals' | 'fitness' | 'numbers';

export const MalayalamDictionaryModal: React.FC<MalayalamDictionaryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<DictionaryTab>('letters');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [letterFilter, setLetterFilter] = useState<LetterCategoryFilter>('all');
  const [wordFilter, setWordFilter] = useState<WordCategoryFilter>('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePlayLetter = (item: MalayalamLetterItem) => {
    setCurrentlyPlaying(item.letter);
    sound.speakMalayalamLetter(item.letter, item.translit, item.vowelFormants);
    setTimeout(() => {
      setCurrentlyPlaying((prev) => (prev === item.letter ? null : prev));
    }, 1200);
  };

  const handlePlayWord = (item: MalayalamWordItem) => {
    setCurrentlyPlaying(item.word);
    sound.speakMalayalamWord(item.word, item.translit);
    setTimeout(() => {
      setCurrentlyPlaying((prev) => (prev === item.word ? null : prev));
    }, 1400);
  };

  const handlePlayPhrase = (item: MalayalamPhraseItem) => {
    setCurrentlyPlaying(item.phrase);
    sound.speakMalayalamWord(item.phrase, item.translit);
    setTimeout(() => {
      setCurrentlyPlaying((prev) => (prev === item.phrase ? null : prev));
    }, 2000);
  };

  // Filtered Letters
  const filteredLetters = MALAYALAM_LETTERS.filter((item) => {
    const matchesCategory = letterFilter === 'all' || item.category === letterFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesSearch = 
      item.letter.includes(q) || 
      item.translit.toLowerCase().includes(q) ||
      item.exampleWord.includes(q) ||
      item.exampleMeaning.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Filtered Words
  const filteredWords = MALAYALAM_WORDS.filter((item) => {
    const matchesCategory = wordFilter === 'all' || item.category === wordFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesSearch = 
      item.word.includes(q) || 
      item.translit.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Filtered Phrases
  const filteredPhrases = MALAYALAM_PHRASES.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.phrase.includes(q) || 
      item.translit.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.context.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-amber-50 rounded-3xl border-4 border-amber-400 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b-4 border-amber-600 shadow-md">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center text-2xl shadow-inner">
              📖
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white drop-shadow font-cartoon leading-tight flex items-center gap-2">
                <span>മലയാള ശബ്ദ നിഘണ്ടു</span>
                <span className="text-xs font-bold bg-amber-900/40 text-yellow-200 px-2 py-0.5 rounded-full border border-yellow-300/30">
                  ശരിയായ ഉച്ചാരണം 🎙️
                </span>
              </h2>
              <p className="text-xs text-amber-100 font-bold hidden sm:block">
                അക്ഷരങ്ങളും വാക്കുകളും തൊട്ട് ശരിയായ കേരള ഉച്ചാരണം കേട്ടു പഠിക്കാം!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-1.5 sm:p-2 bg-amber-700/60 hover:bg-red-600 text-white rounded-2xl transition-colors cartoon-btn"
            title="അടയ്ക്കുക"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Search & Main Category Tabs */}
        <div className="p-3 sm:p-4 bg-white border-b-2 border-amber-200 flex flex-col gap-3">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="മലയാളത്തിലോ ഇംഗ്ലീഷിലോ തിരയുക (Search letter, word or slang)..."
              className="w-full pl-10 pr-10 py-2 sm:py-2.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 font-bold text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-600 bg-amber-200 rounded-full w-5 h-5 flex items-center justify-center hover:bg-amber-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* 3 Main Tabs: Letters, Words, Slang */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                sound.playPop();
                setActiveTab('letters');
              }}
              className={`py-2 px-2 rounded-2xl text-xs sm:text-sm font-black transition-all cartoon-btn flex items-center justify-center gap-1.5 ${
                activeTab === 'letters'
                  ? 'bg-amber-500 text-white shadow-md border-2 border-yellow-300 scale-102'
                  : 'bg-amber-100/70 hover:bg-amber-200/70 text-amber-900 border border-amber-300'
              }`}
            >
              <span className="text-base sm:text-lg">🔤</span>
              <span className="truncate">അക്ഷരമാല ({MALAYALAM_LETTERS.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setActiveTab('words');
              }}
              className={`py-2 px-2 rounded-2xl text-xs sm:text-sm font-black transition-all cartoon-btn flex items-center justify-center gap-1.5 ${
                activeTab === 'words'
                  ? 'bg-amber-500 text-white shadow-md border-2 border-yellow-300 scale-102'
                  : 'bg-amber-100/70 hover:bg-amber-200/70 text-amber-900 border border-amber-300'
              }`}
            >
              <span className="text-base sm:text-lg">📚</span>
              <span className="truncate">വാക്കുകൾ ({MALAYALAM_WORDS.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setActiveTab('phrases');
              }}
              className={`py-2 px-2 rounded-2xl text-xs sm:text-sm font-black transition-all cartoon-btn flex items-center justify-center gap-1.5 ${
                activeTab === 'phrases'
                  ? 'bg-amber-500 text-white shadow-md border-2 border-yellow-300 scale-102'
                  : 'bg-amber-100/70 hover:bg-amber-200/70 text-amber-900 border border-amber-300'
              }`}
            >
              <span className="text-base sm:text-lg">🔥</span>
              <span className="truncate">നാടൻ ശൈലികൾ ({MALAYALAM_PHRASES.length})</span>
            </button>
          </div>

          {/* Sub-Filters based on Active Tab */}
          {activeTab === 'letters' && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500 mr-1">വിഭാഗം:</span>
              {[
                { id: 'all', label: 'എല്ലാം' },
                { id: 'vowel', label: 'സ്വരങ്ങൾ (15)' },
                { id: 'consonant', label: 'വ്യഞ്ജനങ്ങൾ (36)' },
                { id: 'chillu', label: 'ചില്ലക്ഷരങ്ങൾ (6)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    sound.playPop();
                    setLetterFilter(f.id as LetterCategoryFilter);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cartoon-btn ${
                    letterFilter === f.id
                      ? 'bg-amber-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'words' && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500 mr-1">വിഭാഗം:</span>
              {[
                { id: 'all', label: 'എല്ലാം', emoji: '✨' },
                { id: 'food', label: 'ഭക്ഷണങ്ങൾ', emoji: '🍬' },
                { id: 'palace', label: 'കൊട്ടാരം', emoji: '👑' },
                { id: 'animals', label: 'മൃഗങ്ങൾ', emoji: '🐾' },
                { id: 'fitness', label: 'വ്യായാമം', emoji: '🏋️' },
                { id: 'numbers', label: 'സംഖ്യകൾ (1-10)', emoji: '🔢' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    sound.playPop();
                    setWordFilter(f.id as WordCategoryFilter);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cartoon-btn flex items-center gap-1 ${
                    wordFilter === f.id
                      ? 'bg-amber-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{f.emoji}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5">
          
          {/* TAB 1: MALAYALAM LETTERS (അക്ഷരമാല) */}
          {activeTab === 'letters' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
                  ഏതെങ്കിലും അക്ഷരത്തിൽ തൊട്ടാൽ ശരിയായ ഉച്ചാരണം കേൾക്കാം 🔊
                </span>
                <span className="text-xs font-black text-amber-800">
                  {filteredLetters.length} അക്ഷരങ്ങൾ
                </span>
              </div>

              {filteredLetters.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-lg font-bold">അക്ഷരങ്ങൾ ഒന്നും കണ്ടെത്തിയില്ല!</p>
                  <p className="text-xs">മറ്റൊരു വാക്ക് തിരഞ്ഞു നോക്കൂ.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
                  {filteredLetters.map((item) => {
                    const isPlaying = currentlyPlaying === item.letter;
                    return (
                      <button
                        key={item.letter}
                        onClick={() => handlePlayLetter(item)}
                        className={`p-3 rounded-2xl text-left border-2 transition-all cartoon-btn relative group overflow-hidden ${
                          isPlaying
                            ? 'bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-400 border-amber-600 shadow-lg scale-102 ring-4 ring-amber-300/60'
                            : 'bg-white hover:bg-amber-50 border-amber-300/80 shadow-xs'
                        }`}
                      >
                        {/* Audio Wave Indicator on Playing */}
                        {isPlaying && (
                          <span className="absolute top-2 right-2 text-xs animate-ping">
                            🔊
                          </span>
                        )}

                        <div className="flex items-center justify-between mb-1">
                          <span className="text-3xl font-black text-amber-950 font-cartoon">
                            {item.letter}
                          </span>
                          <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                            /{item.translit}/
                          </span>
                        </div>

                        <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between border-t border-amber-100 pt-1.5 mt-1">
                          <span className="text-amber-900 font-extrabold">{item.exampleWord}</span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                            {item.exampleMeaning}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-center gap-1 py-1 rounded-xl bg-amber-100 group-hover:bg-amber-500 group-hover:text-white text-amber-900 text-[11px] font-black transition-colors">
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>കേൾക്കാം</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MALAYALAM WORDS (വാക്കുകൾ) */}
          {activeTab === 'words' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
                  കേരളത്തിലെ പ്രധാന വിഭവങ്ങളും കൊട്ടാര പദങ്ങളും 🍲
                </span>
                <span className="text-xs font-black text-amber-800">
                  {filteredWords.length} വാക്കുകൾ
                </span>
              </div>

              {filteredWords.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-lg font-bold">വാക്കുകൾ ഒന്നും കണ്ടെത്തിയില്ല!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredWords.map((item) => {
                    const isPlaying = currentlyPlaying === item.word;
                    return (
                      <button
                        key={item.word}
                        onClick={() => handlePlayWord(item)}
                        className={`p-3.5 rounded-2xl text-left border-2 transition-all cartoon-btn flex flex-col justify-between ${
                          isPlaying
                            ? 'bg-gradient-to-br from-amber-400 via-yellow-200 to-orange-300 border-amber-600 shadow-lg scale-102 ring-4 ring-amber-300/50'
                            : 'bg-white hover:bg-amber-50/80 border-amber-300 shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{item.emoji}</span>
                            <div>
                              <div className="text-lg font-black text-amber-950 font-cartoon leading-tight">
                                {item.word}
                              </div>
                              <div className="text-xs font-bold text-amber-700">
                                {item.translit}
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-1.5 rounded-xl bg-amber-100 text-amber-900 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Volume2 className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="text-xs font-medium text-slate-600 bg-amber-50/70 p-2 rounded-xl border border-amber-200/60 leading-relaxed">
                          {item.meaning}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VIRAL KERALA PHRASES & SLANG (നാടൻ ശൈലികൾ) */}
          {activeTab === 'phrases' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
                  കേരളത്തിലെ സൂപ്പർ ഹിറ്റ് ട്രെൻഡിങ് ഡയലോഗുകൾ 🔥
                </span>
                <span className="text-xs font-black text-amber-800">
                  {filteredPhrases.length} ശൈലികൾ
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredPhrases.map((item) => {
                  const isPlaying = currentlyPlaying === item.phrase;
                  return (
                    <div
                      key={item.phrase}
                      className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                        isPlaying
                          ? 'bg-gradient-to-br from-amber-400 via-yellow-200 to-orange-300 border-amber-600 shadow-xl scale-101 ring-4 ring-amber-300/60'
                          : 'bg-white hover:bg-amber-50/90 border-amber-300 shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{item.emoji}</span>
                            <div>
                              <h3 className="text-base sm:text-lg font-black text-amber-950 font-cartoon leading-tight">
                                {item.phrase}
                              </h3>
                              <p className="text-xs font-bold text-amber-800 italic">
                                "{item.translit}"
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handlePlayPhrase(item)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-md cartoon-btn flex items-center gap-1 shrink-0"
                            title="ശബ്ദം കേൾക്കാം"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>കേൾക്കൂ</span>
                          </button>
                        </div>

                        <div className="bg-amber-50 rounded-2xl p-2.5 border border-amber-200 mt-2">
                          <p className="text-xs font-bold text-slate-800 mb-1">
                            💡 അർത്ഥം: <span className="font-normal text-slate-700">{item.meaning}</span>
                          </p>
                          <p className="text-[11px] font-bold text-amber-900/80">
                            🎭 സന്ദർഭം: <span className="font-normal text-slate-600">{item.context}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Advice */}
        <div className="bg-amber-100 border-t-2 border-amber-300 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-amber-950 font-bold gap-2">
          <div className="flex items-center gap-1.5">
            <span>💡</span>
            <span>ബ്രൗസറിലെ എല്ലാ സ്പീക്കറുകളിലും വ്യക്തമായി കേൾക്കാവുന്ന സൗണ്ട് സിന്തസൈസർ ഇതിൽ അടങ്ങിയിട്ടുണ്ട്!</span>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-4 py-1 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl shadow cartoon-btn"
          >
            മനസ്സിലായി 👍
          </button>
        </div>

      </div>
    </div>
  );
};
