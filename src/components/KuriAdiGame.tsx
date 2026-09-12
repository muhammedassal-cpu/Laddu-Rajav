import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Timer, Flame, AlertCircle } from 'lucide-react';
import { KingAvatar, KingMood } from './KingAvatar';
import { sound } from '../utils/audio';
import { KING_QUOTES } from '../utils/quotes';

interface KuriAdiGameProps {
  costumeId: string;
  onFinish: (result: { won: boolean; laddusEarned: number; coinsEarned: number; scoreEarned: number }) => void;
  onCancel: () => void;
}

type TargetType = 
  | 'laddu' 
  | 'energy' 
  | 'bonus' 
  | 'poop' 
  | 'spicy' 
  | 'laugh' 
  | 'rock_laddu';

interface PopTarget {
  id: number;
  slotIndex: number;
  type: TargetType;
  emoji: string;
  label: string;
  lifetimeMs: number;
}

export const KuriAdiGame: React.FC<KuriAdiGameProps> = ({
  costumeId,
  onFinish,
  onCancel
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [laddusCollected, setLaddusCollected] = useState<number>(0);
  const [coinsCollected, setCoinsCollected] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [kingMood, setKingMood] = useState<KingMood>('idle');
  const [speech, setSpeech] = useState<string>("ലഡുവിൽ നോക്കി എറിയൂ മച്ചാനെ!");
  const [speechTranslit, setSpeechTranslit] = useState<string>("Ladduvil nokki eriyoo machane!");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // 9 Carnival Slots (3x3 grid)
  const [activeTargets, setActiveTargets] = useState<(PopTarget | null)[]>(Array(9).fill(null));
  const nextTargetId = useRef<number>(1);

  // Sound & speech resets
  const triggerMood = useCallback((mood: KingMood, text: string, durationMs: number = 1000, translit?: string, speakVoice?: boolean) => {
    setKingMood(mood);
    setSpeech(text);
    if (translit) setSpeechTranslit(translit);
    if (speakVoice) sound.speakMalayalam(text, translit || text);
    setTimeout(() => {
      setKingMood('idle');
    }, durationMs);
  }, []);

  // Spawn targets periodically
  useEffect(() => {
    if (timeLeft <= 0 || isGameOver) return;

    const interval = setInterval(() => {
      // Find empty slots
      const emptySlots: number[] = [];
      activeTargets.forEach((t, i) => {
        if (!t) emptySlots.push(i);
      });

      if (emptySlots.length > 0) {
        const chosenSlot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
        const rand = Math.random();

        let type: TargetType = 'laddu';
        let emoji = '🍬';
        let label = '+1 Laddu';

        if (rand < 0.35) {
          type = 'laddu';
          emoji = '🍬';
          label = '+1 Laddu';
        } else if (rand < 0.50) {
          type = 'energy';
          emoji = '⚡';
          label = '+Time';
        } else if (rand < 0.62) {
          type = 'bonus';
          emoji = '⭐';
          label = 'ബോണസ്!';
        } else if (rand < 0.72) {
          // Fake-out rock painted like laddu!
          type = 'rock_laddu';
          emoji = '🍬'; // disguised visually as laddu!
          label = 'ലഡുവോ?';
        } else if (rand < 0.82) {
          type = 'spicy';
          emoji = '🌶️';
          label = 'എരിവ്!';
        } else if (rand < 0.92) {
          type = 'poop';
          emoji = '💩';
          label = 'അയ്യേ!';
        } else {
          type = 'laugh';
          emoji = '😂';
          label = 'ഹാഹാ!';
        }

        const newTarget: PopTarget = {
          id: nextTargetId.current++,
          slotIndex: chosenSlot,
          type,
          emoji,
          label,
          lifetimeMs: 1400
        };

        setActiveTargets((prev) => {
          const next = [...prev];
          next[chosenSlot] = newTarget;
          return next;
        });

        // Auto disappear after lifetime
        setTimeout(() => {
          setActiveTargets((prev) => {
            const next = [...prev];
            if (next[chosenSlot]?.id === newTarget.id) {
              next[chosenSlot] = null;
            }
            return next;
          });
        }, newTarget.lifetimeMs);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [activeTargets, timeLeft, isGameOver]);

  // Countdown timer
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsGameOver(true);
          sound.playFanfare();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver]);

  // Click / Tap Target handler
  const handleHitTarget = (slotIndex: number) => {
    const target = activeTargets[slotIndex];
    if (!target) return;

    // Clear slot
    setActiveTargets((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });

    switch (target.type) {
      case 'laddu':
        sound.playPop();
        setScore((s) => s + 100);
        setLaddusCollected((l) => l + 1);
        setCoinsCollected((c) => c + 4);
        setCombo((c) => c + 1);
        triggerMood('eating', "സ്വാദിഷ്ടം! രാജാവിന് ഇനിയും വേണം!", 1000, "Swadishtam! Rajavinu iniyum venam!");
        break;

      case 'energy':
        sound.playDing();
        setScore((s) => s + 150);
        setTimeLeft((t) => t + 3);
        setCombo((c) => c + 1);
        triggerMood('hero_pose', "പവർ കൂടി! സമയം നീട്ടി കിട്ടി!", 1000, "Power koodi! Samayam neetti kitti!");
        break;

      case 'bonus':
        sound.playDing();
        setScore((s) => s + 300);
        setCoinsCollected((c) => c + 15);
        setCombo((c) => c + 1);
        triggerMood('hero_pose', "നക്ഷത്ര ബോണസ്! അടിപൊളി!", 1000, "Nakshathra bonus! Adipoli!");
        break;

      case 'rock_laddu':
        // The hilarious rock bite fake-out!
        sound.playThud();
        sound.playAyyoVocal();
        setCombo(0);
        setScore((s) => Math.max(0, s - 50));
        const rockQuote = KING_QUOTES.rockBite[Math.floor(Math.random() * KING_QUOTES.rockBite.length)];
        triggerMood('rock_bite', rockQuote.ml, 1600, rockQuote.translit, true);
        break;

      case 'spicy':
        // Steam out ears gag!
        sound.playSteam();
        setCombo(0);
        setScore((s) => Math.max(0, s - 80));
        const spiceQuote = KING_QUOTES.spicy[Math.floor(Math.random() * KING_QUOTES.spicy.length)];
        triggerMood('spicy', spiceQuote.ml, 1800, spiceQuote.translit, true);
        break;

      case 'poop':
        sound.playSlideWhistle();
        sound.playAyyoVocal();
        setCombo(0);
        setScore((s) => Math.max(0, s - 100));
        triggerMood('shocked', "അയ്യേ! ഇതെന്തൊരു വൃത്തികേടാ!", 1200, "Ayye! Ithenthoru vrithikeda!", true);
        break;

      case 'laugh':
        sound.playPop();
        setScore((s) => Math.max(0, s - 20));
        triggerMood('idle', "ആ ടാർഗെറ്റ് എന്നെ നോക്കി കളിയാക്കുന്നോ?!", 1000, "Aa target enne nokki kaliyaakkunno?!", false);
        break;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none py-2">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between px-4 py-2 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow-sm mb-3">
        <div className="flex items-center gap-3">
          <div className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-1.5">
            <span>🎯 കുറി അടി</span>
          </div>
          {combo > 2 && (
            <div className="flex items-center gap-1 text-xs px-2.5 py-0.5 bg-orange-500 text-white font-extrabold rounded-full animate-bounce">
              <Flame className="w-3 h-3 fill-yellow-300 text-yellow-300" />
              <span>{combo}x കോംബോ!</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-1 px-2 py-0.5 bg-white rounded-lg border border-amber-300 text-amber-900">
            <Timer className="w-4 h-4 text-amber-600" />
            <span>{timeLeft}സെ</span>
          </div>
          <span className="text-amber-900">🍬 {laddusCollected}</span>
          <span className="text-yellow-800">🪙 {coinsCollected}</span>
          <span className="text-indigo-800">⭐ {score}</span>
        </div>
      </div>

      {/* Arena with King Watching on the side & 3x3 Target Board */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Left King Avatar Watcher */}
        <div className="flex flex-col items-center justify-center p-3 bg-white/70 rounded-3xl border-2 border-amber-300 shadow-sm md:col-span-1">
          <KingAvatar 
            mood={kingMood} 
            costumeId={costumeId} 
            size="md" 
            showSpeech={!!speech} 
            speechText={speech} 
            speechMalayalam={speech}
            speechTranslit={speechTranslit}
          />
          <div className="mt-2 text-center text-xs font-bold text-amber-900">
            {kingMood === 'spicy' ? '🔥 ചെവിയിൽ പുക!' : kingMood === 'rock_bite' ? '💥 പല്ല് പോയി! കല്ല്!' : '🎯 ഉന്നം നോക്കുന്ന രാജാവ്'}
          </div>
        </div>

        {/* Right 3x3 Carnival Pop-Up Board */}
        <div className="md:col-span-3 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 p-4 sm:p-6 rounded-3xl border-4 border-amber-500 shadow-xl">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 aspect-square max-w-sm sm:max-w-md mx-auto">
            {activeTargets.map((target, idx) => (
              <div
                key={idx}
                onClick={() => handleHitTarget(idx)}
                className="relative bg-amber-950/80 rounded-2xl border-2 border-amber-600 flex items-center justify-center cursor-pointer overflow-hidden shadow-inner active:scale-95 transition-transform"
              >
                {/* Hole backdrop */}
                <div className="absolute inset-x-2 bottom-1 h-3 bg-black/40 rounded-full" />

                <AnimatePresence>
                  {target && (
                    <motion.div
                      key={target.id}
                      initial={{ y: 50, scale: 0.3 }}
                      animate={{ y: 0, scale: 1 }}
                      exit={{ y: 50, scale: 0.3 }}
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                      className="flex flex-col items-center justify-center z-10"
                    >
                      <span className="text-4xl sm:text-5xl filter drop-shadow-md select-none">
                        {target.emoji}
                      </span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full mt-1 ${
                        target.type === 'spicy' ? 'bg-red-500 text-white' :
                        target.type === 'poop' ? 'bg-amber-900 text-white' :
                        target.type === 'rock_laddu' ? 'bg-amber-300 text-amber-950' :
                        'bg-yellow-400 text-amber-950'
                      }`}>
                        {target.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Legend Guide for Kids */}
      <div className="w-full mt-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex flex-wrap items-center justify-around gap-2 text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1">🍬 ലഡു (+1)</div>
        <div className="flex items-center gap-1">⚡ ഊർജ്ജം (+സമയം)</div>
        <div className="flex items-center gap-1">⭐ നക്ഷത്രം (+ബോണസ്)</div>
        <div className="flex items-center gap-1 text-red-600">🌶️ എരിവ് (പുക വരും!)</div>
        <div className="flex items-center gap-1 text-amber-800">🪨 കള്ളക്കല്ല് (പല്ല് പോകും!)</div>
      </div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-md z-50 flex items-center justify-center p-4 text-center"
          >
            <div className="bg-white border-4 border-amber-400 rounded-3xl p-6 max-w-sm shadow-2xl flex flex-col items-center">
              <span className="text-6xl mb-2">🎯🏆</span>
              <h2 className="text-2xl font-black text-amber-950 font-cartoon">
                കുറി അടി ഫലം 🎯
              </h2>
              <p className="text-sm font-semibold text-amber-800 mt-1 mb-4 italic">
                {laddusCollected >= 4 ? '"അടിപൊളി ഉന്നം! രാജാവിന് പൂർണ്ണ തൃപ്തി!"' : '"അടുത്ത തവണ കല്ല് കണ്ട് എറിയണേ!"'}
              </p>

              <div className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 flex justify-around mb-5 font-bold text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-500 uppercase font-bold">ലഡു</span>
                  <span className="text-amber-800 text-lg">+{laddusCollected} 🍬</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-500 uppercase font-bold">നാണയങ്ങൾ</span>
                  <span className="text-yellow-700 text-lg">+{coinsCollected} 🪙</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-500 uppercase font-bold">സ്കോർ</span>
                  <span className="text-indigo-700 text-lg">{score} ⭐</span>
                </div>
              </div>

              <button
                onClick={() =>
                  onFinish({
                    won: laddusCollected >= 3,
                    laddusEarned: laddusCollected,
                    coinsEarned: coinsCollected,
                    scoreEarned: score
                  })
                }
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-lg cartoon-btn text-sm"
              >
                സമ്മാനം വാങ്ങൂ ➔
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
