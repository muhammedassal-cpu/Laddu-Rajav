import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Sparkles, Check, Heart } from 'lucide-react';
import { PetId, PalacePet } from '../types';
import { PALACE_PETS_LIST } from './PalacePets';
import { sound } from '../utils/audio';
import { ELEPHANT_QUOTES, GOAT_QUOTES, PARROT_QUOTES, CAT_QUOTES } from '../utils/quotes';

interface PetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePetId: PetId;
  onSelectPet: (petId: PetId) => void;
}

export const PetsModal: React.FC<PetsModalProps> = ({
  isOpen,
  onClose,
  activePetId,
  onSelectPet
}) => {
  const [previewQuote, setPreviewQuote] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePetSound = (pet: PalacePet) => {
    let quote = pet.catchphrase;
    if (pet.id === 'elephant') {
      quote = ELEPHANT_QUOTES[Math.floor(Math.random() * ELEPHANT_QUOTES.length)].ml;
    } else if (pet.id === 'goat') {
      quote = GOAT_QUOTES[Math.floor(Math.random() * GOAT_QUOTES.length)].ml;
    } else if (pet.id === 'parrot') {
      quote = PARROT_QUOTES[Math.floor(Math.random() * PARROT_QUOTES.length)].ml;
    } else if (pet.id === 'cat') {
      quote = CAT_QUOTES[Math.floor(Math.random() * CAT_QUOTES.length)].ml;
    }
    setPreviewQuote(`"${quote}"`);
    sound.speakPetVoice(pet.id, quote);
  };

  return (
    <AnimatePresence>
      <div 
        id="pets-modal-overlay"
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
          className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-400 rounded-3xl shadow-2xl p-4 sm:p-6 max-h-[88vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-600 flex items-center justify-center text-white shadow-md">
                <span className="text-xl">🐾</span>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-amber-950 font-cartoon flex items-center gap-1.5 leading-tight">
                  <span>കൊട്ടാരത്തിലെ വളർത്തുമൃഗങ്ങൾ</span>
                </h2>
                <p className="text-[11px] text-amber-800 font-bold">
                  കൂട്ടുകാരനെ തിരഞ്ഞെടുക്കൂ — കളികളിൽ അവർ സഹായിക്കും!
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

          {/* Speech Bubble / Quote preview if recently tapped */}
          {previewQuote && (
            <div className="my-2 p-2 bg-amber-200/80 border-2 border-amber-300 rounded-2xl text-center text-xs font-black text-amber-950 shadow-xs animate-bounce">
              <span>{previewQuote}</span>
            </div>
          )}

          {/* Pets Grid */}
          <div className="flex-1 overflow-y-auto my-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pr-1">
            {PALACE_PETS_LIST.map((pet) => {
              const isSelected = activePetId === pet.id;
              return (
                <div
                  key={pet.id}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-400'
                      : 'bg-white/90 border-amber-200 hover:bg-amber-50/80'
                  }`}
                  onClick={() => {
                    sound.playPop();
                    onSelectPet(pet.id);
                    handlePetSound(pet);
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
                      <span>{pet.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-xs sm:text-sm text-amber-950 truncate">
                          {pet.name}
                        </h4>
                        {isSelected && (
                          <span className="text-[10px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> ഒപ്പം ഉണ്ട്
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-extrabold text-amber-700 block">
                        {pet.title}
                      </span>
                      <p className="text-[10px] text-slate-600 mt-1 line-clamp-2 leading-tight">
                        {pet.description}
                      </p>
                    </div>
                  </div>

                  {/* Pet Voice / Catchphrase Bar */}
                  <div className="mt-2 pt-2 border-t border-amber-100 flex items-center justify-between">
                    <span className="text-[10px] text-amber-900 font-bold truncate max-w-[170px] italic">
                      {pet.catchphrase}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePetSound(pet);
                      }}
                      className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-black flex items-center gap-1 shadow-xs"
                      title="ശബ്ദം കേൾക്കൂ"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>കേൾക്കൂ</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t-2 border-amber-200 flex items-center justify-between text-xs text-amber-900 font-bold">
            <span className="flex items-center gap-1 text-[11px]">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>തിരഞ്ഞെടുത്ത കൂട്ടുകാരൻ കൊട്ടാരത്തിൽ ഒപ്പം നിൽക്കും!</span>
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
