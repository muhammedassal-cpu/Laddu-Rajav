import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { KingAvatar, KingMood } from './KingAvatar';
import { sound } from '../utils/audio';
import { KING_QUOTES } from '../utils/quotes';

interface LadduFactoryProps {
  costumeId: string;
  currentLaddus: number;
  storageLimit: number;
  onFinish: (result: { laddusMade: number; coinsEarned: number; grantedBuff: boolean }) => void;
  onCancel: () => void;
}

type FactoryStep = 'catch' | 'mix' | 'roll' | 'pack' | 'finished';

interface FallingIngredient {
  id: number;
  name: string;
  emoji: string;
  isGood: boolean;
  x: number; // 10% to 90%
  y: number; // 0 to 100
  caught: boolean;
}

const GOOD_INGREDIENTS = [
  { name: 'തേങ്ങ', emoji: '🥥' },
  { name: 'അണ്ടിപ്പരിപ്പ്', emoji: '🥜' },
  { name: 'തേൻ', emoji: '🍯' },
  { name: 'മാവ്', emoji: '🌾' },
  { name: 'പഞ്ചസാര', emoji: '🍬' }
];

const TRASH_INGREDIENTS = [
  { name: 'പഴയ സോക്സ്', emoji: '🧦', quote: "ലഡുവിൽ സോക്സോ?! അയ്യേ!" },
  { name: 'പഴയ ചെരിപ്പ്', emoji: '👟', quote: "അളിയാ ഇതെന്താ ചെരിപ്പോ?! കഷ്ടം!" },
  { name: 'മീൻ മുള്ള്', emoji: '🐟', quote: "മധുരത്തിൽ മീൻ മുള്ളോ?! ചതിച്ചു!" }
];

export const LadduFactory: React.FC<LadduFactoryProps> = ({
  costumeId,
  currentLaddus,
  storageLimit,
  onFinish,
  onCancel
}) => {
  const [step, setStep] = useState<FactoryStep>('catch');
  const [bowlX, setBowlX] = useState<number>(50); // percentage 10% - 90%
  const [fallingItems, setFallingItems] = useState<FallingIngredient[]>([]);
  const [caughtIngredients, setCaughtIngredients] = useState<string[]>([]);
  const [hasTrash, setHasTrash] = useState<boolean>(false);

  // Steps interactive states
  const [mixCount, setMixCount] = useState<number>(0);
  const [rollCount, setRollCount] = useState<number>(0);

  const [kingMood, setKingMood] = useState<KingMood>('idle');
  const [speech, setSpeech] = useState<string>("നല്ല സാധനങ്ങൾ പിടിക്കൂ അളിയാ! സോക്ക് വേണ്ടേ വേണ്ട!");
  const [speechTranslit, setSpeechTranslit] = useState<string>("Nalla saadhanam pidikkoo aliya! Sock venda venda!");

  const nextId = useRef<number>(1);
  const isStorageFull = currentLaddus >= storageLimit;

  // Step 1: Catch Ingredients Loop
  useEffect(() => {
    if (step !== 'catch' || isStorageFull) return;

    const spawnInterval = setInterval(() => {
      const isGood = Math.random() < 0.7;
      const itemDef = isGood 
        ? GOOD_INGREDIENTS[Math.floor(Math.random() * GOOD_INGREDIENTS.length)]
        : TRASH_INGREDIENTS[Math.floor(Math.random() * TRASH_INGREDIENTS.length)];

      const newItem: FallingIngredient = {
        id: nextId.current++,
        name: itemDef.name,
        emoji: itemDef.emoji,
        isGood,
        x: Math.floor(Math.random() * 70) + 15,
        y: 0,
        caught: false
      };

      setFallingItems((prev) => [...prev, newItem]);
    }, 900);

    const fallInterval = setInterval(() => {
      setFallingItems((prev) => {
        const nextItems: FallingIngredient[] = [];
        prev.forEach((item) => {
          const nextY = item.y + 4;

          // Check collision with Royal Bowl (around y: 80-92, and bowlX +/- 14)
          if (!item.caught && nextY >= 76 && nextY <= 88) {
            const distance = Math.abs(item.x - bowlX);
            if (distance < 16) {
              // Caught in bowl!
              if (item.isGood) {
                sound.playPop();
                setCaughtIngredients((c) => [...c, item.name]);
                setSpeech(`നല്ല ${item.name}! സൂപ്പർ ടേസ്റ്റ്!`);
                setSpeechTranslit(`Nalla ${item.name}! Super taste!`);
                setKingMood('eating');
                setTimeout(() => setKingMood('idle'), 600);
              } else {
                sound.playSlideWhistle();
                sound.playAyyoVocal();
                setHasTrash(true);
                sound.playThud();
                setSpeech("അയ്യോ! ലഡുവിൽ പഴയ സോക്കോ?! ഇതെന്ത് അക്രമം!");
                setSpeechTranslit("Ayyo! Ladduvil pazhaya socko?! Ithenthu akramam!");
                sound.speakMalayalam("അയ്യോ! ലഡുവിൽ പഴയ സോക്കോ?!", "Ayyo! Ladduvil pazhaya socko?!");
                setKingMood('shocked');
                setTimeout(() => setKingMood('idle'), 1200);
              }
              return; // remove caught item
            }
          }

          if (nextY < 100) {
            nextItems.push({ ...item, y: nextY });
          }
        });
        return nextItems;
      });
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(fallInterval);
    };
  }, [step, bowlX, isStorageFull]);

  // Check if we have enough ingredients to proceed to MIX
  useEffect(() => {
    if (step === 'catch' && caughtIngredients.length >= 5) {
      sound.playDing();
      setStep('mix');
      setSpeech("എല്ലാ സാധനങ്ങളും കിട്ടി! ഇനി മാവ് നന്നായി ഇളക്കൂ!");
      setSpeechTranslit("Ella saadhangalum kitti! Ini maav nannaayi ilakkoo!");
    }
  }, [step, caughtIngredients]);

  // Handle Stirring
  const handleStir = () => {
    sound.playPop();
    const next = mixCount + 1;
    setMixCount(next);
    if (next >= 6) {
      sound.playDing();
      setStep('roll');
      setSpeech("മാവ് കുഴഞ്ഞു പാകമായി! ഇനി പൊൻ ഉരുളകളാക്കി ഉരുട്ടൂ!");
      setSpeechTranslit("Maav kuzhanju paakamaayi! Ini pon urulakalaakki uruttoo!");
    }
  };

  // Handle Rolling
  const handleRoll = () => {
    sound.playPop();
    const next = rollCount + 1;
    setRollCount(next);
    if (next >= 6) {
      sound.playFanfare();
      setStep('pack');
      setSpeech("സൂപ്പർ ലഡു! ഞാൻ അടുക്കളയിലെ രാജാവ് തന്നെ!");
      setSpeechTranslit("Super laddu! Njan adukkalayile raajavu thanne!");
    }
  };

  // Move bowl with mouse / touch or buttons
  const handleMoveBowl = (e: React.MouseEvent<HTMLDivElement>) => {
    if (step !== 'catch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const pct = Math.max(15, Math.min(85, (clientX / rect.width) * 100));
    setBowlX(pct);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (step !== 'catch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const pct = Math.max(15, Math.min(85, (touchX / rect.width) * 100));
    setBowlX(pct);
  };

  const isPerfect = !hasTrash && caughtIngredients.length >= 5;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none py-2">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between px-4 py-2 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow-sm mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-1.5">
            🍬 രാജകീയ ലഡു അടുക്കള
          </span>
          <span className="text-xs px-2.5 py-0.5 bg-amber-300 text-amber-900 rounded-full font-bold">
            {step === 'catch' ? 'പിടുത്തം' : step === 'mix' ? 'ഇളക്കൽ' : step === 'roll' ? 'ഉരുട്ടൽ' : 'പൊതിയൽ'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
          <span className="text-amber-900">
            സംഭരണം: {currentLaddus} / {storageLimit} 🍬
          </span>
        </div>
      </div>

      {/* Storage limit warning if reached */}
      {isStorageFull && (
        <div className="w-full bg-red-100 border-2 border-red-400 text-red-900 px-4 py-2.5 rounded-2xl mb-3 flex items-center gap-2 text-xs sm:text-sm font-bold shadow-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>
            കൊട്ടാരത്തിലെ ലഡു സംഭരണി നിറഞ്ഞു! കൂടുതൽ ലഡു ഉണ്ടാക്കാൻ ലെവൽ കൂട്ടുകയോ ലഡു ഉപയോഗിക്കുകയോ ചെയ്യുക.
          </span>
        </div>
      )}

      {/* Kitchen Stage Canvas Area */}
      <div 
        onMouseMove={handleMoveBowl}
        onTouchMove={handleTouchMove}
        className="w-full h-80 sm:h-96 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 border-4 border-amber-400 rounded-3xl p-4 shadow-xl relative overflow-hidden flex flex-col items-center cursor-crosshair"
      >
        {/* Top Instructions Banner */}
        <div className="w-full flex justify-between items-center px-2 z-20">
          <div className="bg-white/80 backdrop-blur-sm border border-amber-300 px-3 py-1 rounded-xl text-xs font-bold text-amber-900 shadow-sm flex items-center gap-2">
            <span>ഘട്ടങ്ങൾ:</span>
            <div className="flex gap-1">
              {['5 ചേരുവകൾ പിടിക്കൂ', 'മാവ് ഇളക്കൂ', 'ഉരുള ഉരുട്ടൂ', 'പൊതിയൂ'].map((st, i) => (
                <span 
                  key={st} 
                  className={`px-2 py-0.5 rounded-lg text-[10px] ${
                    i === (step === 'catch' ? 0 : step === 'mix' ? 1 : step === 'roll' ? 2 : 3)
                      ? 'bg-amber-500 text-white font-black'
                      : 'bg-amber-200/60 text-amber-900'
                  }`}
                >
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STEP 1: CATCH INGREDIENTS */}
        {step === 'catch' && (
          <>
            {/* Falling ingredients */}
            {fallingItems.map((item) => (
              <div
                key={item.id}
                className="absolute text-3xl sm:text-4xl filter drop-shadow-md select-none pointer-events-none transition-transform"
                style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                {item.emoji}
              </div>
            ))}

            {/* The Royal Mixing Bowl at bottom */}
            <div 
              className="absolute bottom-4 flex flex-col items-center z-20 transition-all duration-75 pointer-events-none"
              style={{ left: `${bowlX}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-24 sm:w-32 h-14 sm:h-16 bg-gradient-to-b from-amber-400 via-amber-500 to-orange-600 rounded-b-full border-4 border-amber-600 shadow-2xl flex items-center justify-center relative">
                <span className="text-xl">🥣</span>
                {hasTrash && (
                  <span className="absolute -top-3 right-0 text-xl animate-bounce">🧦</span>
                )}
              </div>
              <span className="text-[10px] font-black text-amber-950 mt-1 bg-white/80 px-2 py-0.5 rounded-full border border-amber-300">
                രാജകീയ പാത്രം ({caughtIngredients.length}/5)
              </span>
            </div>
          </>
        )}

        {/* STEP 2: MIX THE BATTER */}
        {step === 'mix' && (
          <div className="my-auto flex flex-col items-center z-20">
            <motion.div 
              animate={{ rotate: mixCount * 60 }}
              className="w-36 h-36 rounded-full bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-600 border-4 border-amber-700 shadow-2xl flex items-center justify-center cursor-pointer active:scale-95"
              onClick={handleStir}
            >
              <span className="text-5xl">🥄</span>
            </motion.div>
            <p className="mt-4 font-black text-amber-950 text-sm">
              തൊട്ട് മാവ് നന്നായി ഇളക്കൂ! ({mixCount}/6)
            </p>
          </div>
        )}

        {/* STEP 3: ROLL INTO SHINY LADDU */}
        {step === 'roll' && (
          <div className="my-auto flex flex-col items-center z-20">
            <motion.div 
              animate={{ scale: [1, 1.15, 1], rotate: rollCount * 90 }}
              className="w-32 h-32 rounded-full bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 border-4 border-amber-600 shadow-2xl flex items-center justify-center cursor-pointer active:scale-95"
              onClick={handleRoll}
            >
              <span className="text-5xl">✨🍬</span>
            </motion.div>
            <p className="mt-4 font-black text-amber-950 text-sm">
              തൊട്ട് ഉരുളയാക്കി ഉരുട്ടൂ! ({rollCount}/6)
            </p>
          </div>
        )}

        {/* STEP 4: PACK & CELEBRATE */}
        {step === 'pack' && (
          <div className="my-auto flex flex-col items-center z-20 text-center max-w-sm bg-white/90 p-5 rounded-3xl border-3 border-amber-400 shadow-xl">
            <span className="text-6xl mb-2 animate-bounce">🍬👑</span>
            <h3 className="text-xl font-black text-amber-950 font-cartoon">
              {isPerfect ? 'പൊൻ ലഡു തയ്യാർ! 🍬👑' : 'ലഡു റെഡി! 🍬'}
            </h3>
            <p className="text-xs text-amber-800 my-2">
              {isPerfect 
                ? 'നല്ല നെയ്യും തേനും ചേർത്ത ഉഗ്രൻ ലഡു! അടുത്ത ഓട്ടത്തിൽ സൂപ്പർ സ്പീഡും കവചവും തരും!'
                : 'അല്പം വളഞ്ഞുപോയെങ്കിലും നല്ല രുചിയുള്ള കൊട്ടാര ലഡു!'}
            </p>

            <button
              onClick={() => onFinish({
                laddusMade: isPerfect ? 4 : 2,
                coinsEarned: isPerfect ? 25 : 10,
                grantedBuff: isPerfect
              })}
              className="mt-3 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold rounded-xl shadow-md cartoon-btn text-xs sm:text-sm"
            >
              ലഡു വാങ്ങൂ (+{isPerfect ? 4 : 2} 🍬)
            </button>
          </div>
        )}

        {/* King Avatar at Bottom Left */}
        <div className="absolute left-4 bottom-2 z-10 hidden sm:block pointer-events-none">
          <KingAvatar 
            mood={kingMood} 
            costumeId={costumeId} 
            size="sm" 
            showSpeech={!!speech} 
            speechText={speech} 
            speechMalayalam={speech}
            speechTranslit={speechTranslit}
          />
        </div>
      </div>

      {/* Step 1 Mobile Touch Controls: Move Left / Move Right Buttons */}
      {step === 'catch' && (
        <div className="w-full max-w-sm mt-3 flex gap-3">
          <button
            onClick={() => setBowlX((x) => Math.max(15, x - 18))}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow cartoon-btn text-sm"
          >
            ◀ ഇടത്തോട്ട്
          </button>
          <button
            onClick={() => setBowlX((x) => Math.min(85, x + 18))}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow cartoon-btn text-sm"
          >
            വലത്തോട്ട് ▶
          </button>
        </div>
      )}

      <div className="mt-3 text-center">
        <button
          onClick={onCancel}
          className="text-xs text-slate-600 hover:text-slate-900 font-bold underline"
        >
          പുറത്തേക്ക്
        </button>
      </div>
    </div>
  );
};
