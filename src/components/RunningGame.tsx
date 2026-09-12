import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowDown, Sparkles, Shield, Flame, RotateCcw } from 'lucide-react';
import { KingAvatar, KingMood } from './KingAvatar';
import { NarratorBanner } from './NarratorBanner';
import { sound } from '../utils/audio';
import { KING_QUOTES, NARRATOR_QUOTES, COACH_MIRCHI_QUOTES } from '../utils/quotes';

interface RunningGameProps {
  costumeId: string;
  ladduPowerActive: boolean;
  onFinish: (result: { won: boolean; laddusEarned: number; coinsEarned: number; scoreEarned: number }) => void;
  onCancel: () => void;
}

interface Obstacle {
  id: number;
  type: 'banana' | 'coconut' | 'goat' | 'chicken' | 'scooter' | 'veg_cart';
  x: number; // percentage from right
  requires: 'jump' | 'slide';
  emoji: string;
  name: string;
}

interface Collectible {
  id: number;
  type: 'laddu' | 'golden_laddu' | 'coin' | 'energy';
  x: number;
  y: 'ground' | 'air';
  emoji: string;
  points: number;
}

export const RunningGame: React.FC<RunningGameProps> = ({
  costumeId,
  ladduPowerActive,
  onFinish,
  onCancel
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [kingState, setKingState] = useState<'running' | 'jumping' | 'sliding' | 'hit'>('running');
  const [speech, setSpeech] = useState<string>("ഓടടോ രാജാവേ! പവർ വരട്ടെ!");
  const [speechTranslit, setSpeechTranslit] = useState<string>("Odado Rajave! Power varatte!");
  const [narratorQuote, setNarratorQuote] = useState<string>("കേരളത്തിന്റെ സ്വന്തം ബിഗ് ബെല്ലി രാജാവ് ഫീൽഡിൽ ഇറങ്ങിയിരിക്കുന്നു!");
  const [distance, setDistance] = useState<number>(0);
  const targetDistance = 1000;

  const [laddusCollected, setLaddusCollected] = useState<number>(0);
  const [coinsCollected, setCoinsCollected] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [hasShield, setHasShield] = useState<boolean>(ladduPowerActive);

  // Biryani Ambush random event
  const [showBiryaniAmbush, setShowBiryaniAmbush] = useState<boolean>(false);
  const biryaniTriggered = useRef<boolean>(false);

  // Entities
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const nextId = useRef<number>(1);
  const lastSpawnDist = useRef<number>(0);

  // Action handlers: Jump
  const handleJump = useCallback(() => {
    if (kingState !== 'running') return;
    setKingState('jumping');
    sound.playBoing();
    setTimeout(() => {
      setKingState((prev) => (prev === 'jumping' ? 'running' : prev));
    }, 600);
  }, [kingState]);

  // Action handlers: Slide
  const handleSlide = useCallback(() => {
    if (kingState !== 'running') return;
    setKingState('sliding');
    sound.playBoing();
    setTimeout(() => {
      setKingState((prev) => (prev === 'sliding' ? 'running' : prev));
    }, 600);
  }, [kingState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || isGameOver || showBiryaniAmbush) return;
      if (e.code === 'ArrowUp' || e.code === 'Space' || e.code === 'KeyW') {
        e.preventDefault();
        handleJump();
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        handleSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGameOver, showBiryaniAmbush, handleJump, handleSlide]);

  // Game loop tick
  useEffect(() => {
    if (!isPlaying || isGameOver || showBiryaniAmbush) return;

    const interval = setInterval(() => {
      setDistance((d) => {
        const nextDist = d + 8;

        // Check for Biryani Ambush event around distance 450
        if (!biryaniTriggered.current && nextDist >= 420 && nextDist <= 550) {
          biryaniTriggered.current = true;
          setShowBiryaniAmbush(true);
          sound.playDing();
          return nextDist;
        }

        // Check Victory condition
        if (nextDist >= targetDistance) {
          setIsGameOver(true);
          setWon(true);
          sound.playFanfare();
          return targetDistance;
        }

        return nextDist;
      });

      // Update positions of obstacles & collectibles
      setObstacles((prev) =>
        prev
          .map((ob) => ({ ...ob, x: ob.x - 3.2 }))
          .filter((ob) => ob.x > -15)
      );

      setCollectibles((prev) =>
        prev
          .map((col) => ({ ...col, x: col.x - 3.2 }))
          .filter((col) => col.x > -15)
      );
    }, 40);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver, showBiryaniAmbush]);

  // Entity Spawner
  useEffect(() => {
    if (!isPlaying || isGameOver || showBiryaniAmbush) return;
    if (distance - lastSpawnDist.current < 160) return;
    lastSpawnDist.current = distance;

    const rand = Math.random();

    // Spawn obstacle
    if (rand < 0.65) {
      const types: Array<{ type: Obstacle['type']; requires: 'jump' | 'slide'; emoji: string; name: string }> = [
        { type: 'banana', requires: 'jump', emoji: '🍌', name: 'Slippery Banana Peel' },
        { type: 'coconut', requires: 'jump', emoji: '🥥', name: 'Rogue Nemesis Coconut' },
        { type: 'goat', requires: 'jump', emoji: '🐐', name: 'Bhaiya the Goat' },
        { type: 'chicken', requires: 'jump', emoji: '🐔', name: 'Speedy Desi Chicken' },
        { type: 'scooter', requires: 'slide', emoji: '🛵', name: "Cousin's Waving Scooter" },
        { type: 'veg_cart', requires: 'jump', emoji: '🧺', name: 'Vegetable Cart' }
      ];
      const choice = types[Math.floor(Math.random() * types.length)];
      setObstacles((prev) => [
        ...prev,
        {
          id: nextId.current++,
          type: choice.type,
          x: 105,
          requires: choice.requires,
          emoji: choice.emoji,
          name: choice.name
        }
      ]);
    } else {
      // Spawn collectible
      const isGolden = Math.random() < 0.15;
      setCollectibles((prev) => [
        ...prev,
        {
          id: nextId.current++,
          type: isGolden ? 'golden_laddu' : 'laddu',
          x: 105,
          y: Math.random() < 0.4 ? 'air' : 'ground',
          emoji: isGolden ? '✨🍬' : '🍬',
          points: isGolden ? 300 : 100
        }
      ]);
    }

    // Random Narrator commentary occasionally
    if (Math.random() < 0.2) {
      const q = NARRATOR_QUOTES[Math.floor(Math.random() * NARRATOR_QUOTES.length)];
      setNarratorQuote(q);
    }
  }, [distance, isPlaying, isGameOver, showBiryaniAmbush]);

  // Collision Detection
  useEffect(() => {
    if (!isPlaying || isGameOver || showBiryaniAmbush) return;

    // Check collision with obstacles
    // King is positioned around x: 18% to 28%
    const kingLeft = 16;
    const kingRight = 30;

    obstacles.forEach((ob) => {
      if (ob.x >= kingLeft && ob.x <= kingRight) {
        // Did King avoid it correctly?
        const avoided =
          (ob.requires === 'jump' && kingState === 'jumping') ||
          (ob.requires === 'slide' && kingState === 'sliding');

        if (!avoided) {
          if (hasShield) {
            // Shield absorbs hit comically!
            setHasShield(false);
            sound.playDing();
            setSpeech("കസവ് ഷീൽഡ് എന്റെ മൂക്കിനെ രക്ഷിച്ചു!");
            setSpeechTranslit("Kasavu shield saved my royal nose!");
            // Remove obstacle
            setObstacles((prev) => prev.filter((o) => o.id !== ob.id));
          } else {
            // Take hit
            sound.playSlideWhistle();
            sound.playAyyoVocal(); // Iconic Kerala vocal scream!
            setKingState('hit');
            setCombo(0);
            const quoteObj = KING_QUOTES.hitObstacle[Math.floor(Math.random() * KING_QUOTES.hitObstacle.length)];
            setSpeech(quoteObj.ml);
            setSpeechTranslit(quoteObj.translit);
            sound.speakMalayalam(quoteObj.ml, quoteObj.translit);

            setLives((l) => {
              const next = l - 1;
              if (next <= 0) {
                setIsGameOver(true);
                setWon(false);
              }
              return next;
            });

            // Remove obstacle so no double hit
            setObstacles((prev) => prev.filter((o) => o.id !== ob.id));

            setTimeout(() => {
              setKingState('running');
            }, 600);
          }
        } else {
          // Successfully dodged!
          setScore((s) => s + 50);
          setCombo((c) => {
            const next = c + 1;
            if (next === 3 || next === 5 || next === 10) {
              sound.playDing();
            }
            return next;
          });
        }
      }
    });

    // Check collision with collectibles
    collectibles.forEach((col) => {
      if (col.x >= kingLeft && col.x <= kingRight) {
        const canCatch =
          col.y === 'air' ? kingState === 'jumping' : kingState !== 'jumping';

        if (canCatch) {
          sound.playPop();
          setScore((s) => s + col.points);
          if (col.type === 'golden_laddu') {
            sound.playDing();
            setLaddusCollected((l) => l + 2);
            setCoinsCollected((c) => c + 15);
            setSpeech("തങ്കക്കട്ടി ലഡു കിട്ടി അളിയാ!");
            setSpeechTranslit("Thangakkatti laddu kitti aliya!");
            sound.speakMalayalam("തങ്കക്കട്ടി ലഡു കിട്ടി അളിയാ!", "Thangakkatti laddu kitti aliya!");
          } else {
            setLaddusCollected((l) => l + 1);
            setCoinsCollected((c) => c + 5);
          }
          setCollectibles((prev) => prev.filter((c) => c.id !== col.id));
        }
      }
    });
  }, [obstacles, collectibles, kingState, hasShield, isPlaying, isGameOver, showBiryaniAmbush]);

  // Biryani Ambush handlers
  const handleBiryaniChoice = (choice: 'eat' | 'run') => {
    setShowBiryaniAmbush(false);
    if (choice === 'eat') {
      sound.playDing();
      setHasShield(true);
      setSpeech("അടിപൊളി! ആ ബിരിയാണിയിൽ 24 കൂട്ടം മസാല ഉണ്ടായിരുന്നു!");
      setSpeechTranslit("Adipoli! Aa biriyaniyil 24 koottam masala undaayirunnu!");
      setScore((s) => s + 200);
      setCoinsCollected((c) => c + 20);
    } else {
      setSpeech("മനക്കരുത്ത് പരീക്ഷ ജയിച്ചു! (വയറു കരഞ്ഞെങ്കിലും)");
      setSpeechTranslit("Manakkaruthu pareeksha jayichu! (Vayaru karanjengilum)");
      setScore((s) => s + 100);
    }
  };

  const getKingMood = (): KingMood => {
    if (isGameOver && won) return 'victory';
    if (isGameOver && !won) return 'shocked';
    if (kingState === 'jumping') return 'jumping';
    if (kingState === 'sliding') return 'sliding';
    if (kingState === 'hit') return 'shocked';
    return 'running';
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none py-2">
      {/* Top Game Header */}
      <div className="w-full flex items-center justify-between px-4 py-2 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow-sm mb-3">
        <div className="flex items-center gap-3">
          <div className="text-sm sm:text-base font-extrabold text-amber-950 flex items-center gap-1.5">
            <span>🏃 രാജാവിന്റെ ഓട്ടം</span>
            {hasShield && (
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-emerald-500 text-white rounded-full font-bold animate-pulse">
                <Shield className="w-3 h-3" /> ഷീൽഡ് റെഡി
              </span>
            )}
          </div>
          {combo > 2 && (
            <div className="flex items-center gap-1 text-xs px-2.5 py-0.5 bg-orange-500 text-white font-extrabold rounded-full animate-bounce">
              <Flame className="w-3 h-3 fill-yellow-300 text-yellow-300" />
              <span>{combo}x കോംബോ!</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm font-bold">
          {/* Hearts / Lives */}
          <div className="flex items-center gap-1" title={`${lives} Royal energy lives`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`text-base sm:text-lg transition-transform ${i < lives ? 'scale-100' : 'opacity-30 grayscale'}`}>
                ❤️
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 text-amber-900">
            <span>🍬 {laddusCollected}</span>
          </div>

          <div className="flex items-center gap-1 text-yellow-800">
            <span>🪙 {coinsCollected}</span>
          </div>
        </div>
      </div>

      {/* Dramatic Bollywood Narrator Banner */}
      <NarratorBanner quote={narratorQuote} className="w-full mb-3" />

      {/* Main Arcade Stage Container */}
      <div className="w-full h-72 sm:h-80 relative overflow-hidden rounded-3xl border-4 border-amber-400 bg-gradient-to-b from-sky-300 via-amber-100 to-amber-200 shadow-2xl">
        {/* Parallax Background Street Scenery */}
        <div 
          className="absolute inset-x-0 bottom-0 h-28 bg-repeat-x opacity-35 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #D97706 2px, transparent 2px)`,
            backgroundSize: '30px 30px'
          }}
        />

        {/* Distance Goal Indicator */}
        <div className="absolute top-3 left-4 right-4 z-20">
          <div className="flex justify-between text-[11px] font-bold text-amber-900 mb-1">
            <span>🏰 കൊട്ടാര മുറ്റം</span>
            <span>🏁 ലഡു പന്തൽ</span>
          </div>
          <div className="w-full h-3 bg-white/70 rounded-full border border-amber-300 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-100"
              style={{ width: `${Math.min(100, (distance / targetDistance) * 100)}%` }}
            />
          </div>
        </div>

        {/* The King Character Runner */}
        <div className="absolute left-[18%] bottom-10 z-20">
          <KingAvatar 
            mood={getKingMood()} 
            costumeId={costumeId} 
            size="md" 
            showSpeech={!!speech} 
            speechText={speech}
            speechMalayalam={speech}
            speechTranslit={speechTranslit}
          />
        </div>

        {/* Obstacles Rendering */}
        {obstacles.map((ob) => (
          <div
            key={ob.id}
            className="absolute bottom-10 flex flex-col items-center z-10 select-none transition-transform"
            style={{ left: `${ob.x}%` }}
          >
            <span className="text-3xl sm:text-4xl filter drop-shadow-md">
              {ob.emoji}
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-white/80 border border-slate-300 shadow text-slate-700 whitespace-nowrap">
              {ob.requires === 'jump' ? '⬆️ ചാടൂ!' : '⬇️ കുനിയൂ!'}
            </span>
          </div>
        ))}

        {/* Collectibles Rendering */}
        {collectibles.map((col) => (
          <div
            key={col.id}
            className="absolute flex flex-col items-center z-10 select-none transition-transform"
            style={{
              left: `${col.x}%`,
              bottom: col.y === 'air' ? '8.5rem' : '3rem'
            }}
          >
            <span className="text-3xl filter drop-shadow-md animate-bounce-gentle">
              {col.emoji}
            </span>
          </div>
        ))}

        {/* Ground track with cartoon paving */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600 border-t-4 border-amber-800 flex items-center justify-around px-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-10 h-1 bg-amber-400/40 rounded-full" />
          ))}
        </div>

        {/* Biryani Ambush Modal Overlay */}
        <AnimatePresence>
          {showBiryaniAmbush && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4 text-center"
            >
              <div className="bg-amber-50 border-4 border-amber-400 rounded-3xl p-5 max-w-sm shadow-2xl">
                <span className="text-5xl mb-2 block animate-bounce">🍛</span>
                <h3 className="text-lg font-black text-amber-950 uppercase tracking-wide">
                  തലശ്ശേരി ബിരിയാണി! 🍛
                </h3>
                <p className="text-xs text-amber-800 my-2 font-medium">
                  ഓട്ടത്തിനിടയിൽ ചൂടുള്ള ദം ബിരിയാണി കണ്ടു! രാജാവിന്റെ കണ്ണ് തള്ളി!
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleBiryaniChoice('eat')}
                    className="flex-1 py-2.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl shadow-md cartoon-btn text-xs"
                  >
                    🍴 ഒരെണ്ണം കഴിക്കാം! (ഷീൽഡ് + നാണയങ്ങൾ)
                  </button>
                  <button
                    onClick={() => handleBiryaniChoice('run')}
                    className="flex-1 py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl shadow-md cartoon-btn text-xs"
                  >
                    🏃 ഓട്ടം തുടരൂ!
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Over / Win Overlay */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/65 backdrop-blur-md z-30 flex flex-col items-center justify-center p-4 text-center"
            >
              <div className="bg-white border-4 border-amber-400 rounded-3xl p-6 max-w-md shadow-2xl flex flex-col items-center">
                <span className="text-6xl mb-2">
                  {won ? '👑🎉' : '🍌😂'}
                </span>
                <h2 className="text-2xl font-black text-amber-950 font-cartoon">
                  {won ? 'വിജയം! രാജാവ് ലക്ഷ്യത്തിലെത്തി! 👑🎉' : 'അയ്യോ! തട്ടി വീണു! 😂🍌'}
                </h2>
                {(() => {
                  const endQuote = won
                    ? KING_QUOTES.win[Math.floor(Math.random() * KING_QUOTES.win.length)]
                    : KING_QUOTES.fail[Math.floor(Math.random() * KING_QUOTES.fail.length)];
                  return (
                    <div className="my-2">
                      <p className="text-sm font-black text-amber-950">
                        "{endQuote.ml}"
                      </p>
                      <p className="text-xs font-semibold text-amber-800/80 italic mt-0.5">
                        "{endQuote.translit}"
                      </p>
                    </div>
                  );
                })()}

                {/* Rewards box */}
                <div className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 flex justify-around mb-5 font-bold text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-500 font-bold uppercase">ലഡു</span>
                    <span className="text-amber-800 text-lg">+{laddusCollected} 🍬</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-500 font-bold uppercase">നാണയങ്ങൾ</span>
                    <span className="text-yellow-700 text-lg">+{coinsCollected} 🪙</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-500 font-bold uppercase">സ്കോർ</span>
                    <span className="text-indigo-700 text-lg">{score} ⭐</span>
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() =>
                      onFinish({
                        won,
                        laddusEarned: laddusCollected,
                        coinsEarned: coinsCollected,
                        scoreEarned: score
                      })
                    }
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-lg cartoon-btn text-sm"
                  >
                    മുന്നോട്ട് ➔
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Big Touch Controls for Kids / Mobile & Key Hints */}
      <div className="w-full mt-4 flex items-center justify-between gap-3 max-w-lg">
        <button
          id="btn-running-jump"
          onClick={handleJump}
          disabled={!isPlaying || isGameOver || showBiryaniAmbush}
          className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-2xl font-black text-lg shadow-lg flex flex-col items-center justify-center cartoon-btn border-b-4 border-emerald-700 disabled:opacity-50"
        >
          <ArrowUp className="w-6 h-6 stroke-[3]" />
          <span className="leading-tight text-sm uppercase">ചാടൂ! ⬆️</span>
        </button>

        <button
          id="btn-running-slide"
          onClick={handleSlide}
          disabled={!isPlaying || isGameOver || showBiryaniAmbush}
          className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white rounded-2xl font-black text-lg shadow-lg flex flex-col items-center justify-center cartoon-btn border-b-4 border-amber-700 disabled:opacity-50"
        >
          <ArrowDown className="w-6 h-6 stroke-[3]" />
          <span className="leading-tight text-sm uppercase">കുനിയൂ! ⬇️</span>
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between w-full max-w-lg px-2">
        <span className="text-xs text-slate-500 font-medium">
          💡 വാഴപ്പഴവും ആടും കണ്ടാൽ ചാടുക; വഴിയിലെ തടസ്സങ്ങൾ ഒഴിഞ്ഞുമാറുക!
        </span>
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
