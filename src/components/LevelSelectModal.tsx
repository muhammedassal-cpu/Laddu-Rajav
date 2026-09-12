import React from 'react';
import { motion } from 'motion/react';
import { X, Lock, CheckCircle2, ChevronRight, Crown, Sparkles } from 'lucide-react';
import { GameLevel, GameMode } from '../types';
import { sound } from '../utils/audio';

interface LevelSelectModalProps {
  levels: GameLevel[];
  currentLevelId: number;
  currentLaddus: number;
  onSelectLevel: (level: GameLevel) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  levels,
  currentLevelId,
  currentLaddus,
  onSelectLevel,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 select-none">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white border-4 border-amber-400 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 fill-amber-200 text-amber-200" />
            <div>
              <h2 className="text-xl font-black font-cartoon leading-none">
                രാജകീയ ദൗത്യങ്ങൾ (10 ലെവലുകൾ)
              </h2>
              <span className="text-xs text-amber-100 font-bold">
                മടിയൻ രാജാവിൽ നിന്ന് ഇതിഹാസ ഫിറ്റ് കിംഗിലേക്ക്! 👑
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-black/20 hover:bg-black/30 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5">
          {levels.map((lvl) => {
            const isCurrent = currentLevelId === lvl.id;
            const canPlay = lvl.unlocked;

            return (
              <div
                key={lvl.id}
                onClick={() => {
                  if (canPlay) {
                    sound.playPop();
                    onSelectLevel(lvl);
                    onClose();
                  } else {
                    sound.playSlideWhistle();
                  }
                }}
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-400'
                    : canPlay
                    ? 'bg-white border-amber-200 hover:bg-amber-50'
                    : 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                    lvl.completed
                      ? 'bg-emerald-500 text-white'
                      : canPlay
                      ? 'bg-amber-400 text-amber-950'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {lvl.completed ? <CheckCircle2 className="w-5 h-5" /> : lvl.id === 10 ? '👑' : lvl.id}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sm text-amber-950">
                        ലെവൽ {lvl.id}: {lvl.title}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-black bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-md">
                          ഇപ്പോൾ
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {lvl.subtitle}
                    </div>
                    <div className="text-[11px] text-amber-800 italic mt-0.5">
                      "{lvl.introGag}"
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-lg">
                    ലക്ഷ്യം: {lvl.ladduTarget} 🍬
                  </span>
                  {!canPlay ? (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> പൂട്ടിയിരിക്കുന്നു
                    </span>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-amber-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
