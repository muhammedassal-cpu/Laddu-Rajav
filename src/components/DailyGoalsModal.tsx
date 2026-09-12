import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, CheckCircle2, Gift, Sparkles, Star, Award } from 'lucide-react';
import { DailyChallenge } from '../types';
import { sound } from '../utils/audio';

interface DailyGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenges: DailyChallenge[];
  onClaimReward: (challengeId: string) => void;
}

export const DailyGoalsModal: React.FC<DailyGoalsModalProps> = ({
  isOpen,
  onClose,
  challenges,
  onClaimReward
}) => {
  if (!isOpen) return null;

  const completedCount = challenges.filter(c => c.completed).length;

  return (
    <AnimatePresence>
      <div 
        id="daily-goals-modal-overlay"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-400 rounded-3xl shadow-2xl p-4 sm:p-6 max-h-[88vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md">
                <Gift className="w-5 h-5 text-yellow-200" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-amber-950 font-cartoon flex items-center gap-1.5 leading-tight">
                  <span>ദിവസേനയുള്ള ലക്ഷ്യങ്ങൾ</span>
                  <span className="text-sm">🎯</span>
                </h2>
                <p className="text-[11px] text-amber-800 font-bold">
                  ലക്ഷ്യങ്ങൾ പൂർത്തിയാക്കി ലഡുവും നാണയങ്ങളും നേടൂ! ({completedCount}/{challenges.length})
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="p-1.5 rounded-full bg-amber-200/80 hover:bg-amber-300 text-amber-950 transition-colors cartoon-btn"
              title="അടയ്ക്കുക"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Goals List */}
          <div className="flex-1 overflow-y-auto my-3 space-y-2.5 pr-1">
            {challenges.map((ch) => {
              const isTargetReached = ch.progress >= ch.target;
              return (
                <div
                  key={ch.id}
                  className={`p-3 sm:p-3.5 rounded-2xl border-2 transition-all flex flex-col gap-2 ${
                    ch.completed
                      ? 'bg-emerald-50/90 border-emerald-300 shadow-xs'
                      : isTargetReached
                      ? 'bg-amber-100/90 border-amber-400 shadow-sm animate-pulse'
                      : 'bg-white/90 border-amber-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-black text-xs sm:text-sm text-amber-950 flex items-center gap-1.5">
                        <span>{ch.title}</span>
                        {ch.completed && (
                          <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-md font-extrabold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> ലഭിച്ചു
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug font-medium">
                        {ch.description}
                      </p>
                    </div>

                    {/* Reward Badge */}
                    <div className="shrink-0 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-xl border border-amber-200 text-xs font-black text-amber-900">
                      <span>🍬 +{ch.rewardLaddus}</span>
                      <span>🪙 +{ch.rewardCoins}</span>
                    </div>
                  </div>

                  {/* Progress Bar & Claim Button */}
                  <div className="flex items-center gap-2 pt-1 border-t border-amber-100">
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] font-bold text-amber-900 mb-0.5">
                        <span>പുരോഗതി:</span>
                        <span>{Math.min(ch.progress, ch.target)} / {ch.target}</span>
                      </div>
                      <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden border border-amber-300">
                        <div
                          className={`h-full transition-all duration-300 ${
                            ch.completed
                              ? 'bg-emerald-500'
                              : 'bg-gradient-to-r from-amber-500 to-orange-500'
                          }`}
                          style={{
                            width: `${Math.min(100, (ch.progress / ch.target) * 100)}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Claim Action */}
                    {!ch.completed && (
                      <button
                        disabled={!isTargetReached}
                        onClick={() => {
                          sound.playVictoryFanfare();
                          sound.speakKing('വിജയം! സമ്മാനം ലഭിച്ചു!', 'Vijayam! Sammanam labhichu!');
                          onClaimReward(ch.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cartoon-btn flex items-center gap-1 shrink-0 ${
                          isTargetReached
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>സമ്മാനം എടുക്കൂ</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="pt-2 border-t-2 border-amber-200 flex items-center justify-between text-xs text-amber-900 font-bold">
            <span className="flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ദിവസവും പുതിയ ലക്ഷ്യങ്ങൾ വരും!</span>
            </span>
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl text-xs shadow cartoon-btn"
            >
              ശരി 👍
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
