import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, Trophy, Flame, Sparkles } from 'lucide-react';
import { DailyTrialStatus, GameMode } from '../types';
import { CoachMirchi } from './CoachMirchi';
import { sound } from '../utils/audio';

interface DailyTrialsModalProps {
  status: DailyTrialStatus;
  onLaunchTrial: (mode: GameMode) => void;
  onClaimBonus: () => void;
  onClose: () => void;
}

export const DailyTrialsModal: React.FC<DailyTrialsModalProps> = ({
  status,
  onLaunchTrial,
  onClaimBonus,
  onClose
}) => {
  const allCompleted = status.trial1_running && status.trial2_kuriAdi && status.trial3_workout;

  const trials = [
    {
      id: 'trial1',
      title: 'പരീക്ഷണം 1: രാജാവിന്റെ ഓട്ടം 🏃',
      desc: 'രുചിയുള്ള ലഡു ശേഖരിക്കൂ, കള്ളത്തേങ്ങയെ വെട്ടിക്കൂ!',
      reward: '+3 ലഡു 🍬',
      mode: 'running' as GameMode,
      completed: status.trial1_running
    },
    {
      id: 'trial2',
      title: 'പരീക്ഷണം 2: കുറി അടി 🎯',
      desc: 'പലഹാരങ്ങളിൽ ഉന്നം വെയ്ക്കൂ, കല്ല് കടിക്കല്ലേ!',
      reward: '+4 ലഡു 🍬',
      mode: 'kuri_adi' as GameMode,
      completed: status.trial2_kuriAdi
    },
    {
      id: 'trial3',
      title: 'പരീക്ഷണം 3: തമാശ വ്യായാമം 💪',
      desc: 'മുണ്ട് അഴിയാതെ കട്ടയ്ക്ക് നിന്ന് മസിൽ പെരുപ്പിക്കൂ!',
      reward: '+5 ലഡു 🍬',
      mode: 'workout' as GameMode,
      completed: status.trial3_workout
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 select-none">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white border-4 border-amber-400 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 fill-white" />
            <div>
              <h2 className="text-xl font-black font-cartoon leading-none">
                ദിവസേനയുള്ള 3 പരീക്ഷണങ്ങൾ
              </h2>
              <span className="text-xs text-rose-100 font-bold">
                മൂന്നും ജയിച്ചാൽ കോച്ച് മിർച്ചി ഞെട്ടും! 🏆
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

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-3">
          {/* Coach Mirchi commentary widget */}
          <div className="bg-amber-50 p-3 rounded-2xl border-2 border-amber-200 flex items-center gap-3">
            <CoachMirchi 
              quote={
                allCompleted
                  ? "ഹാവൂ! ഞാൻ ഇരിക്കട്ടെ... നീ മൂന്നും ജയിച്ചോ?! എന്റെ വിസിൽ ഞാൻ തന്നെ തിന്നേണ്ടി വരുമല്ലോ!"
                  : "ഇന്ന് നീ മൂന്നും ജയിച്ചാൽ ഞാൻ എന്റെ വിസിൽ തിന്നും നോക്കിക്കോ!"
              }
              mood={allCompleted ? 'shocked' : 'roasting'}
            />
          </div>

          {/* Trials List */}
          <div className="space-y-2.5">
            {trials.map((t) => (
              <div 
                key={t.id}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  t.completed ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-amber-200'
                }`}
              >
                <div>
                  <div className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{t.title}</span>
                    {t.completed && <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{t.desc}</div>
                  <div className="text-xs font-bold text-amber-700 mt-0.5">{t.reward}</div>
                </div>

                <div>
                  {t.completed ? (
                    <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-xl">
                      വിജയിച്ചു ✔
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        sound.playPop();
                        onLaunchTrial(t.mode);
                        onClose();
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black rounded-xl shadow cartoon-btn"
                    >
                      കളിക്കാം ▶
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* All Three Bonus Section */}
          <div className={`p-4 rounded-2xl border-2 text-center transition-all ${
            allCompleted 
              ? 'bg-gradient-to-br from-amber-100 to-yellow-200 border-amber-400' 
              : 'bg-slate-50 border-slate-200 opacity-80'
          }`}>
            <div className="flex items-center justify-center gap-1 text-sm font-black text-amber-950">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>കോച്ച് മിർച്ചിയുടെ സ്പെഷ്യൽ ബോണസ് 🔥</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 mb-3 font-medium">
              മൂന്ന് പരീക്ഷണങ്ങളും ജയിച്ചാൽ കോച്ച് മിർച്ചി വിസിൽ മറക്കും! <strong>+5 ബോണസ് ലഡു 🍬</strong>!
            </p>

            {allCompleted ? (
              status.bonusClaimed ? (
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full inline-block">
                  ബോണസ് വാങ്ങി! 🎉
                </span>
              ) : (
                <button
                  onClick={onClaimBonus}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm rounded-xl shadow-lg cartoon-btn animate-bounce"
                >
                  +5 ബോണസ് ലഡു വാങ്ങൂ! 🍬
                </button>
              )
            ) : (
              <span className="text-xs text-slate-400 font-bold">
                തുറക്കാൻ ഇനിയും {3 - [status.trial1_running, status.trial2_kuriAdi, status.trial3_workout].filter(Boolean).length} പരീക്ഷണം പൂർത്തിയാക്കൂ
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
