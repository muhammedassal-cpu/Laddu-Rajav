import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, Lock, Sparkles } from 'lucide-react';
import { Costume } from '../types';
import { KingAvatar } from './KingAvatar';
import { sound } from '../utils/audio';

interface WardrobeModalProps {
  costumes: Costume[];
  activeCostumeId: string;
  coins: number;
  onSelectCostume: (costumeId: string) => void;
  onBuyCostume: (costume: Costume) => void;
  onClose: () => void;
}

export const WardrobeModal: React.FC<WardrobeModalProps> = ({
  costumes,
  activeCostumeId,
  coins,
  onSelectCostume,
  onBuyCostume,
  onClose
}) => {
  const [previewId, setPreviewId] = useState<string>(activeCostumeId);
  const selectedCostume = costumes.find((c) => c.id === previewId) || costumes[0];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 select-none">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white border-4 border-amber-400 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👕</span>
            <div>
              <h2 className="text-xl font-black font-cartoon leading-none">
                രാജകീയ വസ്ത്രശാല
              </h2>
              <span className="text-xs text-amber-100 font-bold">
                നാണയങ്ങൾ: {coins} 🪙
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Left Preview Section */}
          <div className="md:col-span-2 bg-amber-50 rounded-2xl border-2 border-amber-200 p-4 flex flex-col items-center justify-center text-center">
            <div className="h-44 flex items-center justify-center">
              <KingAvatar 
                mood="idle" 
                costumeId={selectedCostume.id} 
                size="lg" 
              />
            </div>
            <h3 className="font-black text-amber-950 text-base mt-2 flex items-center gap-1">
              <span>{selectedCostume.emoji}</span>
              <span>{selectedCostume.name}</span>
            </h3>
            <p className="text-xs text-amber-800 mt-1 leading-snug">
              {selectedCostume.description}
            </p>
            {selectedCostume.specialGag && (
              <div className="mt-2 text-[11px] font-extrabold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg border border-orange-200">
                ✨ പ്രത്യേകത: {selectedCostume.specialGag}
              </div>
            )}

            {/* Equip / Buy Button */}
            <div className="mt-4 w-full">
              {selectedCostume.unlocked ? (
                <button
                  onClick={() => {
                    sound.playPop();
                    onSelectCostume(selectedCostume.id);
                  }}
                  disabled={activeCostumeId === selectedCostume.id}
                  className={`w-full py-2.5 rounded-xl font-black text-xs sm:text-sm cartoon-btn ${
                    activeCostumeId === selectedCostume.id
                      ? 'bg-slate-200 text-slate-500 cursor-default'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md'
                  }`}
                >
                  {activeCostumeId === selectedCostume.id ? 'ധരിച്ചിരിക്കുന്നു ✔' : 'ഈ വസ്ത്രം ധരിക്കൂ'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (coins >= selectedCostume.price) {
                      sound.playDing();
                      onBuyCostume(selectedCostume);
                    } else {
                      sound.playSlideWhistle();
                    }
                  }}
                  disabled={coins < selectedCostume.price}
                  className={`w-full py-2.5 rounded-xl font-black text-xs sm:text-sm cartoon-btn ${
                    coins >= selectedCostume.price
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  വാങ്ങൂ ({selectedCostume.price} 🪙)
                </button>
              )}
            </div>
          </div>

          {/* Right Costume List */}
          <div className="md:col-span-3 grid grid-cols-2 gap-2.5 content-start">
            {costumes.map((c) => {
              const isSelected = previewId === c.id;
              const isEquipped = activeCostumeId === c.id;

              return (
                <div
                  key={c.id}
                  onClick={() => {
                    sound.playPop();
                    setPreviewId(c.id);
                  }}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 shadow-md scale-102'
                      : 'bg-white border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{c.emoji}</span>
                    {isEquipped ? (
                      <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                        ധരിച്ചത്
                      </span>
                    ) : !c.unlocked ? (
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5">
                        <Lock className="w-3 h-3" /> {c.price} 🪙
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">
                        ഉണ്ട്
                      </span>
                    )}
                  </div>
                  <div className="font-extrabold text-xs text-amber-950 leading-tight">
                    {c.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
