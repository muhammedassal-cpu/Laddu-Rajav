import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, Flame } from 'lucide-react';
import { KingAvatar } from './KingAvatar';
import { sound } from '../utils/audio';

interface ChampionshipGameProps {
  costumeId: string;
  onVictory: () => void;
  onCancel: () => void;
}

export const ChampionshipGame: React.FC<ChampionshipGameProps> = ({
  costumeId,
  onVictory,
  onCancel
}) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [taps, setTaps] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const phaseDetails = {
    1: { title: "ഘട്ടം 1: അതിവേഗ സ്പ്രിന്റ് 🏃", desc: "തേങ്ങയെയും പൂവൻകോഴിയെയും പിന്നിലാക്കി കുതിക്കൂ!", target: 8, emoji: "🏃💨" },
    2: { title: "ഘട്ടം 2: പൊൻ കുറി അടി 🎯", desc: "കൃത്യമായ ലക്ഷ്യത്തിലേക്ക് രാജകീയമായി എറിയൂ!", target: 6, emoji: "🎯⚡" },
    3: { title: "ഘട്ടം 3: സുവർണ്ണ ലഡു ഉരുട്ടൽ 🍬", desc: "വിജയത്തിന്റെ തങ്ക ലഡു ഉരുട്ടി എടുക്കൂ!", target: 6, emoji: "🥣✨" },
    4: { title: "ഘട്ടം 4: ചാമ്പ്യൻ മസിൽ പോസ് 💪", desc: "അതിശക്തമായ മസിൽ പെരുക്കി കാണിക്കൂ!", target: 8, emoji: "💪🔥" },
    5: { title: "ഘട്ടം 5: രാജാവിന്റെ മഹാ പരിവർത്തനം 👑", desc: "അവസാന ഘട്ടം! ഫിറ്റ് രാജാവായി മാറുവാൻ വേഗത്തിൽ തൊടൂ!", target: 12, emoji: "👑✨" }
  };

  const current = phaseDetails[phase];

  const handleTap = () => {
    sound.playPop();
    const next = taps + 1;
    setTaps(next);

    if (next >= current.target) {
      sound.playDing();
      setTaps(0);
      if (phase < 5) {
        setPhase((p) => (p + 1) as 1 | 2 | 3 | 4 | 5);
        if (phase === 3) sound.playMuscleFlex();
      } else {
        // Championship Won!
        setCompleted(true);
        sound.playFanfare();
        sound.playMuscleFlex();
        sound.speakMalayalam("ഞാൻ കേരളത്തിന്റെ സ്വന്തം ഫിറ്റ് രാജാവാണ് അളിയാ!", "Njan Keralathinte swantham fit raajavaanu aliya!");
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none py-2 text-center">
      <div className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 p-3 rounded-2xl text-white font-extrabold shadow-md mb-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm sm:text-base">
          <Trophy className="w-5 h-5 fill-white" />
          ഫിറ്റ് രാജാവ് ഫൈനൽ ചാമ്പ്യൻഷിപ്പ് 👑🔥
        </span>
        <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">
          ഘട്ടം {phase} / 5
        </span>
      </div>

      {!completed ? (
        <div className="w-full bg-white border-4 border-amber-400 rounded-3xl p-6 shadow-xl flex flex-col items-center">
          <span className="text-5xl mb-2">{current.emoji}</span>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-cartoon">
            {current.title}
          </h2>
          <p className="text-xs sm:text-sm text-amber-800 mt-1 mb-5 max-w-md font-medium">
            {current.desc}
          </p>

          <KingAvatar 
            mood={phase === 5 ? 'hero_pose' : phase === 4 ? 'hero_pose' : 'running'} 
            costumeId={costumeId} 
            size="lg" 
          />

          {/* Progress bar */}
          <div className="w-full max-w-sm mt-4 mb-3">
            <div className="flex justify-between text-xs font-bold text-amber-900 mb-1">
              <span>ഊർജ്ജ നില</span>
              <span>{taps} / {current.target}</span>
            </div>
            <div className="h-4 bg-amber-100 rounded-full border border-amber-300 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-150"
                style={{ width: `${(taps / current.target) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleTap}
            className="w-full max-w-sm py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl cartoon-btn border-b-4 border-orange-800 active:scale-95"
          >
            വേഗത്തിൽ തൊടൂ! പവർ കയറട്ടെ! ⚡
          </button>
        </div>
      ) : (
        /* Grand Victory Screen */
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full bg-gradient-to-b from-yellow-50 via-amber-100 to-yellow-200 border-4 border-yellow-500 rounded-3xl p-6 shadow-2xl flex flex-col items-center"
        >
          <span className="text-6xl mb-2 animate-bounce">👑🏆✨</span>
          <h2 className="text-3xl font-black text-amber-950 font-cartoon">
            ഫിറ്റ് രാജാവ് പിറവിയെടുത്തു! 👑🏆
          </h2>
          <p className="text-sm font-bold text-amber-800 mt-1 max-w-md italic">
            "കോച്ച് മിർച്ചി ആനന്ദക്കണ്ണീരിലാണ്! രാജാവിന്റെ മേനി ഉരുക്കുപോലെയായി! പത്തു പടവുകളും താണ്ടി രാജാവ് ഫിറ്റായി!"
          </p>

          <div className="my-4">
            <KingAvatar 
              mood="victory" 
              costumeId="fit_king" 
              size="xl" 
              showSpeech={true}
              speechText="ഞാൻ കേരളത്തിന്റെ സ്വന്തം ഫിറ്റ് രാജാവാണ് അളിയാ!"
              speechMalayalam="ഞാൻ കേരളത്തിന്റെ സ്വന്തം ഫിറ്റ് രാജാവാണ് അളിയാ!"
              speechTranslit="Njan Keralathinte swantham fit raajavaanu aliya!"
            />
          </div>

          <div className="w-full max-w-md bg-white/90 border-2 border-amber-300 rounded-2xl p-4 my-2 text-left text-xs sm:text-sm font-bold text-amber-950">
            <div className="text-center font-black text-amber-600 mb-2 uppercase tracking-wide">
              🎉 ലഭിച്ച സമ്മാനങ്ങൾ:
            </div>
            <ul className="space-y-1.5">
              <li>✨ <strong>ഫിറ്റ് കിംഗ് സുവർണ്ണ വേഷം</strong> (സ്വർണ്ണ കിരീടവും തിളങ്ങുന്ന കസവ് വസ്ത്രവും!)</li>
              <li>🏆 <strong>രാജകീയ ചാമ്പ്യൻഷിപ്പ് ട്രോഫി</strong> കൊട്ടാരത്തിൽ സ്ഥാപിച്ചു</li>
              <li>🍬 <strong>തങ്ക ലഡു പദവി</strong> സ്വന്തമാക്കി!</li>
              <li>🪙 <strong>+200 രാജ നാണയങ്ങൾ</strong> സമ്മാനം!</li>
            </ul>
          </div>

          <button
            onClick={onVictory}
            className="mt-4 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-base rounded-2xl shadow-xl cartoon-btn"
          >
            വിജയ കൊട്ടാരത്തിലേക്ക് ➔
          </button>
        </motion.div>
      )}

      <div className="mt-4">
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
