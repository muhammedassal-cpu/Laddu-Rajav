import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowUp, ArrowRight, ArrowDown, Flame, Sparkles } from 'lucide-react';
import { KingAvatar, KingMood } from './KingAvatar';
import { sound } from '../utils/audio';
import { KING_QUOTES } from '../utils/quotes';

interface WorkoutGameProps {
  costumeId: string;
  onFinish: (result: { won: boolean; laddusEarned: number; coinsEarned: number; scoreEarned: number }) => void;
  onCancel: () => void;
}

type Direction = 'left' | 'up' | 'right' | 'down';

interface BeatNote {
  id: number;
  direction: Direction;
  poseName: string;
  emoji: string;
}

const ROUTINES: Array<{ dir: Direction; name: string; emoji: string; gagText: string }> = [
  { dir: 'up', name: 'സ്ക്വാറ്റ് (പൊങ്ങൂ)', emoji: '🏋️', gagText: "താഴേക്ക് പോകൂ! ഒളിമ്പിക്സ് വീര്യം വരട്ടെ!" },
  { dir: 'down', name: 'കയർ ചാട്ടം', emoji: '🪢', gagText: "കയർ ചെറുതായിപ്പോയി! മൂക്കിൽ തട്ടല്ലേ!" },
  { dir: 'left', name: 'മലപോലെ ബാലൻസ്', emoji: '🧘', gagText: "ഞാൻ ഉറച്ചുനിൽക്കും! ഞാൻ മലയാണ്! (അയ്യോ വീഴല്ലേ!)" },
  { dir: 'right', name: 'മസിൽ പെരുപ്പിക്കൽ', emoji: '🕺', gagText: "കണ്ടോ എന്റെ മസിൽ! മിർച്ചി നോക്കിപ്പഠിക്കടോ!" }
];

export const WorkoutGame: React.FC<WorkoutGameProps> = ({
  costumeId,
  onFinish,
  onCancel
}) => {
  const [currentPrompt, setCurrentPrompt] = useState<BeatNote | null>(null);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [laddusEarned, setLaddusEarned] = useState<number>(0);
  const [coinsEarned, setCoinsEarned] = useState<number>(0);
  const [roundsCompleted, setRoundsCompleted] = useState<number>(0);
  const totalRounds = 12;

  const [kingMood, setKingMood] = useState<KingMood>('idle');
  const [speech, setSpeech] = useState<string>("കോച്ച് മിർച്ചി, എന്റെ മസിൽ കണ്ടോ!");
  const [speechTranslit, setSpeechTranslit] = useState<string>("Coach Mirchi, ente muscle kando!");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Spawn next workout rhythm prompt
  const spawnNextPrompt = useCallback(() => {
    if (roundsCompleted >= totalRounds) {
      setIsGameOver(true);
      sound.playFanfare();
      return;
    }

    const choice = ROUTINES[Math.floor(Math.random() * ROUTINES.length)];
    const note: BeatNote = {
      id: Date.now(),
      direction: choice.dir,
      poseName: choice.name,
      emoji: choice.emoji
    };

    setCurrentPrompt(note);
    setSpeech(choice.gagText);

    // Timeout if player misses the beat
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Missed beat
      sound.playSlideWhistle();
      setCombo(0);
      setKingMood('wobble');
      setFeedback('ആടിപ്പോയി! 💫');
      setSpeech("നിലം കുലുങ്ങി! സത്യമായിട്ടും ഭൂമികുലുക്കം വന്നതാ!");
      setSpeechTranslit("Nilam kulungi! Sathyamaayittum bhoomikulukkam vannatha!");
      setRoundsCompleted((r) => r + 1);
      setTimeout(() => {
        setKingMood('idle');
        setFeedback(null);
        spawnNextPrompt();
      }, 700);
    }, 2200);
  }, [roundsCompleted]);

  useEffect(() => {
    spawnNextPrompt();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Handle player pressing an arrow key or on-screen button
  const handleInput = useCallback((dir: Direction) => {
    if (!currentPrompt || isGameOver) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    if (dir === currentPrompt.direction) {
      // SUCCESS!
      sound.playPop();
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore((s) => s + 100 + newCombo * 20);
      setCoinsEarned((c) => c + 3);

      if (newCombo % 3 === 0) {
        sound.playDing();
        setLaddusEarned((l) => l + 1);
      }

      if (newCombo >= 5) {
        sound.playMuscleFlex();
        setKingMood('hero_pose');
        setFeedback('അടിപൊളി കോംബോ! 🔥👑');
        setSpeech("ഞാൻ കേരളത്തിന്റെ സ്വന്തം മസിൽ രാജാവാണ് അളിയാ!");
        setSpeechTranslit("Njan Keralathinte swantham muscle raajavaanu aliya!");
        sound.speakMalayalam("ഞാൻ കേരളത്തിന്റെ സ്വന്തം മസിൽ രാജാവാണ് അളിയാ!", "Njan Keralathinte swantham muscle raajavaanu aliya!");
      } else {
        setKingMood('hero_pose');
        setFeedback('കട്ട പോസ്! ✨');
      }

      setRoundsCompleted((r) => r + 1);
      setTimeout(() => {
        setKingMood('idle');
        setFeedback(null);
        spawnNextPrompt();
      }, 600);
    } else {
      // MISTAKE!
      sound.playThud();
      sound.playAyyoVocal();
      setCombo(0);
      setKingMood('wobble');
      setFeedback('തെന്നിവീണു! 😂');
      setSpeech("അയ്യോ! ഇത് പുതിയ സ്റ്റൈൽ എക്സർസൈസ് ആണ് അളിയാ!");
      setSpeechTranslit("Ayyo! Ithu puthiya style exercise aanu aliya!");
      sound.speakMalayalam("അയ്യോ! ഇത് പുതിയ സ്റ്റൈൽ എക്സർസൈസ് ആണ് അളിയാ!", "Ayyo! Ithu puthiya style exercise aanu aliya!");
      setRoundsCompleted((r) => r + 1);
      setTimeout(() => {
        setKingMood('idle');
        setFeedback(null);
        spawnNextPrompt();
      }, 700);
    }
  }, [currentPrompt, combo, isGameOver, spawnNextPrompt]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      if (e.key === 'ArrowUp' || e.key === 'w') handleInput('up');
      if (e.key === 'ArrowDown' || e.key === 's') handleInput('down');
      if (e.key === 'ArrowLeft' || e.key === 'a') handleInput('left');
      if (e.key === 'ArrowRight' || e.key === 'd') handleInput('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, isGameOver]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none py-2">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between px-4 py-2 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow-sm mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-1.5">
            💪 തമാശ വ്യായാമം
          </span>
          {combo > 2 && (
            <div className="flex items-center gap-1 text-xs px-2.5 py-0.5 bg-orange-500 text-white font-extrabold rounded-full animate-bounce">
              <Flame className="w-3 h-3 fill-yellow-300 text-yellow-300" />
              <span>{combo}x പോസ്!</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
          <span className="text-amber-900">റൗണ്ട് {roundsCompleted} / {totalRounds}</span>
          <span className="text-amber-900">🍬 {laddusEarned}</span>
          <span className="text-yellow-800">🪙 {coinsEarned}</span>
          <span className="text-indigo-800">⭐ {score}</span>
        </div>
      </div>

      {/* Workout Stage Area */}
      <div className="w-full bg-gradient-to-b from-sky-200 via-amber-50 to-amber-200 border-4 border-amber-400 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center min-h-[340px]">
        {/* Mirror & Workout Banner */}
        <div className="text-center mb-2">
          <span className="text-xs font-bold text-amber-900 bg-white/70 px-3 py-1 rounded-full border border-amber-300 shadow-sm">
            🏆 കണ്ണാടി തമാശ: "ആരാ ഈ കണ്ണാടിയിൽ രണ്ടാമതൊരു എന്നെ വെച്ചത്?!"
          </span>
        </div>

        {/* The King Visual */}
        <div className="my-auto relative">
          <KingAvatar 
            mood={kingMood} 
            costumeId={costumeId} 
            size="lg" 
            showSpeech={!!speech} 
            speechText={speech} 
            speechMalayalam={speech}
            speechTranslit={speechTranslit}
          />

          {/* Feedback Float Bubble */}
          <AnimatePresence>
            {feedback && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -20, scale: 1.2 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 -right-16 bg-yellow-400 text-amber-950 font-black text-sm sm:text-base px-3 py-1 rounded-2xl shadow-xl border-2 border-yellow-600 rotate-12 pointer-events-none"
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Current Target Arrow Prompt Card */}
        {currentPrompt && !isGameOver && (
          <motion.div 
            key={currentPrompt.id}
            initial={{ scale: 0.5, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="mt-4 bg-white/90 border-3 border-amber-400 rounded-2xl px-6 py-2 shadow-lg flex items-center gap-3"
          >
            <span className="text-3xl">{currentPrompt.emoji}</span>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold uppercase">പോസ് ചെയ്യൂ</span>
              <span className="text-base font-black text-amber-950">{currentPrompt.poseName}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white flex items-center justify-center font-black shadow">
              {currentPrompt.direction === 'up' && <ArrowUp className="w-6 h-6 stroke-[3]" />}
              {currentPrompt.direction === 'down' && <ArrowDown className="w-6 h-6 stroke-[3]" />}
              {currentPrompt.direction === 'left' && <ArrowLeft className="w-6 h-6 stroke-[3]" />}
              {currentPrompt.direction === 'right' && <ArrowRight className="w-6 h-6 stroke-[3]" />}
            </div>
          </motion.div>
        )}

        {/* Game Over Modal */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/65 backdrop-blur-md z-30 flex items-center justify-center p-4 text-center"
            >
              <div className="bg-white border-4 border-amber-400 rounded-3xl p-6 max-w-sm shadow-2xl flex flex-col items-center">
                <span className="text-6xl mb-2">💪👑</span>
                <h2 className="text-2xl font-black text-amber-950 font-cartoon">
                  വ്യായാമം പൂർത്തിയായി! 💪👑
                </h2>
                <p className="text-sm font-semibold text-amber-800 mt-1 mb-4 italic">
                  {score > 600 ? '"ഗംഭീരം! രാജാവിന്റെ മസിൽ ഉരുക്കായി മാറി!"' : '"കുറച്ചു കുലുങ്ങി, എങ്കിലും നല്ല ഉഷാർ ശ്രമം!"'}
                </p>

                <div className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 flex justify-around mb-5 font-bold text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-500 uppercase font-bold">ലഡു</span>
                    <span className="text-amber-800 text-lg">+{laddusEarned + 4} 🍬</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-500 uppercase font-bold">നാണയങ്ങൾ</span>
                    <span className="text-yellow-700 text-lg">+{coinsEarned + 20} 🪙</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-500 uppercase font-bold">സ്കോർ</span>
                    <span className="text-indigo-700 text-lg">{score} ⭐</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onFinish({
                      won: true,
                      laddusEarned: laddusEarned + 4,
                      coinsEarned: coinsEarned + 20,
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
      </div>

      {/* 4 Large Arrow Buttons for Kids & Mobile */}
      <div className="w-full max-w-md mt-4 grid grid-cols-3 gap-2 items-center justify-items-center">
        <div />
        <button
          id="btn-workout-up"
          onClick={() => handleInput('up')}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center cartoon-btn border-b-4 border-emerald-700"
        >
          <ArrowUp className="w-8 h-8 stroke-[3]" />
          <span className="text-[10px] font-black uppercase">സ്ക്വാറ്റ് ⬆️</span>
        </button>
        <div />

        <button
          id="btn-workout-left"
          onClick={() => handleInput('left')}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center cartoon-btn border-b-4 border-sky-700"
        >
          <ArrowLeft className="w-8 h-8 stroke-[3]" />
          <span className="text-[10px] font-black uppercase">ബാലൻസ് ⬅️</span>
        </button>

        <button
          id="btn-workout-down"
          onClick={() => handleInput('down')}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center cartoon-btn border-b-4 border-amber-700"
        >
          <ArrowDown className="w-8 h-8 stroke-[3]" />
          <span className="text-[10px] font-black uppercase">ചാട്ടം ⬇️</span>
        </button>

        <button
          id="btn-workout-right"
          onClick={() => handleInput('right')}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center cartoon-btn border-b-4 border-purple-700"
        >
          <ArrowRight className="w-8 h-8 stroke-[3]" />
          <span className="text-[10px] font-black uppercase">മസിൽ ➡️</span>
        </button>
      </div>

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
