import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles } from 'lucide-react';
import { PetId, PalacePet } from '../types';
import { sound } from '../utils/audio';
import { 
  ELEPHANT_QUOTES, 
  GOAT_QUOTES, 
  PARROT_QUOTES, 
  CAT_QUOTES, 
  VoiceQuote 
} from '../utils/quotes';

export const PALACE_PETS_LIST: PalacePet[] = [
  {
    id: 'elephant',
    name: 'അപ്പു ആനക്കുട്ടി',
    species: 'കൊമ്പൻ ആന',
    emoji: '🐘',
    title: 'കൊട്ടാരത്തിലെ കൊമ്പൻ',
    description: 'സ്വർണ്ണ നെറ്റിപ്പട്ടവും മണിമാലയും അണിഞ്ഞ വിരുതൻ ആനക്കുട്ടി!',
    catchphrase: 'മച്ചാൻ തീ ആണ്! ആന മസിൽ പവർ!'
  },
  {
    id: 'goat',
    name: 'ആട് ഭായ്',
    species: 'പാത്തുമ്മയുടെ ആട്',
    emoji: '🐐',
    title: 'റോഡ് ബ്ലോക്കർ',
    description: 'വാഴയിലയും പുല്ലും തിന്ന് രാജാവിനെ ഓടിക്കുന്ന വിരുതൻ ആട്!',
    catchphrase: 'മേ... മേ... മെല്ലെ അനങ്ങി പണി എടുക്ക്!'
  },
  {
    id: 'parrot',
    name: 'തത്തമ്മ സുന്ദരി',
    species: 'രാജകീയ തത്ത',
    emoji: '🦜',
    title: 'വായാടി തത്ത',
    description: 'ചുവന്ന ചുണ്ടും കറുത്ത മാലയുമുള്ള കൊട്ടാരത്തിലെ തത്തമ്മ!',
    catchphrase: 'പൊളി മച്ചാനെ! പവർ വരട്ടെ!'
  },
  {
    id: 'cat',
    name: 'മിന്നുമോൾ പൂച്ച',
    species: 'നാടൻ പൂച്ച',
    emoji: '🐱',
    title: 'പായസം കൊതിയൻ',
    description: 'സിംഹാസനത്തിൽ ചുരുണ്ടുകൂടി പാല് പായസം കുടിക്കുന്ന സുന്ദരി പൂച്ച!',
    catchphrase: 'മ്യാവൂ... മച്ചാൻ തീ ആണ്!'
  }
];

interface PalacePetsProps {
  activePetId: PetId;
  onSelectPet: (petId: PetId) => void;
  className?: string;
}

export const PalacePets: React.FC<PalacePetsProps> = ({
  activePetId,
  onSelectPet,
  className = ''
}) => {
  const [petQuote, setPetQuote] = useState<VoiceQuote>(ELEPHANT_QUOTES[0]);
  const [showSpeech, setShowSpeech] = useState<boolean>(false);
  const [petBounce, setPetBounce] = useState<boolean>(false);

  // Trigger sound and speech for selected pet
  const handleInteractWithPet = (petId: PetId) => {
    onSelectPet(petId);
    setPetBounce(true);
    setTimeout(() => setPetBounce(false), 450);

    let chosenQuote: VoiceQuote;
    if (petId === 'elephant') {
      sound.playElephantTrumpet();
      const qList = ELEPHANT_QUOTES;
      chosenQuote = qList[Math.floor(Math.random() * qList.length)];
      sound.speakMalayalam(chosenQuote.ml, chosenQuote.translit, 0.88, 0.9); // deeper elephant pitch
    } else if (petId === 'goat') {
      sound.playGoatBleat();
      const qList = GOAT_QUOTES;
      chosenQuote = qList[Math.floor(Math.random() * qList.length)];
      sound.speakMalayalam(chosenQuote.ml, chosenQuote.translit, 1.25, 0.96);
    } else if (petId === 'parrot') {
      sound.playParrotChirp();
      const qList = PARROT_QUOTES;
      chosenQuote = qList[Math.floor(Math.random() * qList.length)];
      sound.speakMalayalam(chosenQuote.ml, chosenQuote.translit, 1.55, 1.1); // squeaky parrot pitch
    } else {
      // cat
      sound.playCatMeow();
      const qList = CAT_QUOTES;
      chosenQuote = qList[Math.floor(Math.random() * qList.length)];
      sound.speakMalayalam(chosenQuote.ml, chosenQuote.translit, 1.35, 1.0);
    }

    setPetQuote(chosenQuote);
    setShowSpeech(true);
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Active Pet Speech Bubble */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            key={petQuote.ml}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-2 bg-white text-slate-900 px-3.5 py-2 rounded-2xl border-2 border-amber-400 shadow-xl text-center max-w-[260px]"
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-black uppercase text-amber-700">
                {activePetId === 'elephant' && '🐘 അപ്പു ആനക്കുട്ടി'}
                {activePetId === 'goat' && '🐐 ആട് ഭായ്'}
                {activePetId === 'parrot' && '🦜 തത്തമ്മ സുന്ദരി'}
                {activePetId === 'cat' && '🐱 മിന്നുമോൾ പൂച്ച'}
              </span>
              <button
                onClick={() => sound.speakMalayalam(petQuote.ml, petQuote.translit)}
                className="px-1.5 py-0.5 rounded bg-amber-500 hover:bg-amber-600 text-white text-[9px] font-bold flex items-center gap-0.5"
              >
                <Volume2 className="w-3 h-3" />
                <span>ശബ്ദം</span>
              </button>
            </div>
            <p className="text-xs font-black text-amber-950 leading-snug">
              {petQuote.ml}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Pet Display Stage */}
      <div 
        onClick={() => handleInteractWithPet(activePetId)}
        className="cursor-pointer flex flex-col items-center group"
        title="തമാശ കേൾക്കാൻ തൊടൂ!"
      >
        {/* ELEPHANT (അപ്പു ആനക്കുട്ടി) */}
        {activePetId === 'elephant' && (
          <motion.div
            animate={petBounce ? { scale: [1, 1.2, 1], y: [-10, 0] } : { y: [0, -3, 0] }}
            transition={{ repeat: petBounce ? 1 : Infinity, duration: petBounce ? 0.35 : 2 }}
            className="w-20 h-22 sm:w-24 sm:h-26 relative"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              {/* Elephant Body */}
              <ellipse cx="50" cy="62" rx="34" ry="28" fill="#64748B" stroke="#334155" strokeWidth="2" />
              {/* Ears */}
              <ellipse cx="22" cy="46" rx="14" ry="18" fill="#475569" stroke="#334155" strokeWidth="1.5" />
              <ellipse cx="22" cy="46" rx="8" ry="12" fill="#F472B6" opacity="0.4" />
              <ellipse cx="78" cy="46" rx="14" ry="18" fill="#475569" stroke="#334155" strokeWidth="1.5" />
              <ellipse cx="78" cy="46" rx="8" ry="12" fill="#F472B6" opacity="0.4" />
              {/* Head */}
              <circle cx="50" cy="45" r="24" fill="#64748B" stroke="#334155" strokeWidth="2" />
              {/* Golden Nettipattam (നെറ്റിപ്പട്ടം) on forehead */}
              <path d="M38 32 Q50 24 62 32 L58 48 Q50 56 42 48 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="50" cy="38" r="3" fill="#DC2626" />
              <circle cx="44" cy="42" r="1.5" fill="#FEF08A" />
              <circle cx="56" cy="42" r="1.5" fill="#FEF08A" />
              {/* Eyes */}
              <circle cx="39" cy="45" r="3.5" fill="#0F172A" />
              <circle cx="40" cy="44" r="1.2" fill="#FFFFFF" />
              <circle cx="61" cy="45" r="3.5" fill="#0F172A" />
              <circle cx="62" cy="44" r="1.2" fill="#FFFFFF" />
              {/* Rosy cheeks */}
              <circle cx="34" cy="52" r="4" fill="#F472B6" opacity="0.5" />
              <circle cx="66" cy="52" r="4" fill="#F472B6" opacity="0.5" />
              {/* Cute Elephant Tusks (കൊമ്പുകൾ) */}
              <path d="M42 58 Q34 62 32 54" stroke="#FFFDF5" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M58 58 Q66 62 68 54" stroke="#FFFDF5" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Waving Trunk (തുമ്പിക്കൈ) */}
              <motion.path
                animate={{ d: [
                  "M47 52 Q50 72 58 76 Q66 74 64 68",
                  "M47 52 Q50 70 42 76 Q34 74 36 68"
                ] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                stroke="#64748B"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
              />
              {/* Feet */}
              <rect x="30" y="82" width="10" height="12" rx="3" fill="#475569" />
              <rect x="60" y="82" width="10" height="12" rx="3" fill="#475569" />
              {/* Golden Jingle Bell on neck */}
              <circle cx="50" cy="74" r="4" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            </svg>
          </motion.div>
        )}

        {/* GOAT (ആട് ഭായ്) */}
        {activePetId === 'goat' && (
          <motion.div
            animate={petBounce ? { scale: [1, 1.2, 1], rotate: [-8, 8, 0] } : { y: [0, -3, 0] }}
            transition={{ repeat: petBounce ? 1 : Infinity, duration: petBounce ? 0.35 : 1.8 }}
            className="w-20 h-22 sm:w-24 sm:h-26 relative"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              {/* Horns */}
              <path d="M42 30 Q36 12 28 16" stroke="#78350F" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M58 30 Q64 12 72 16" stroke="#78350F" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Body */}
              <ellipse cx="50" cy="65" rx="26" ry="22" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
              {/* Head */}
              <ellipse cx="50" cy="42" rx="16" ry="18" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
              {/* Ears */}
              <ellipse cx="32" cy="42" rx="10" ry="5" fill="#E2E8F0" transform="rotate(-20 32 42)" />
              <ellipse cx="68" cy="42" rx="10" ry="5" fill="#E2E8F0" transform="rotate(20 68 42)" />
              {/* Eyes */}
              <ellipse cx="44" cy="40" rx="3" ry="4" fill="#0F172A" />
              <ellipse cx="56" cy="40" rx="3" ry="4" fill="#0F172A" />
              {/* Snout */}
              <ellipse cx="50" cy="52" rx="8" ry="6" fill="#FBCFE8" />
              {/* Goat Beard */}
              <path d="M48 57 L50 66 L52 57 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
              {/* Munching Grass Leaf in mouth */}
              <path d="M54 52 Q68 50 74 44" stroke="#22C55E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M64 48 Q70 42 78 44" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Bell Collar */}
              <path d="M40 58 Q50 64 60 58" stroke="#DC2626" strokeWidth="2.5" fill="none" />
              <circle cx="50" cy="62" r="3.5" fill="#F59E0B" />
              {/* Hooves */}
              <rect x="36" y="80" width="7" height="12" rx="2" fill="#475569" />
              <rect x="57" y="80" width="7" height="12" rx="2" fill="#475569" />
            </svg>
          </motion.div>
        )}

        {/* PARROT (തത്തമ്മ സുന്ദരി) */}
        {activePetId === 'parrot' && (
          <motion.div
            animate={petBounce ? { scale: [1, 1.2, 1], rotate: [-10, 10, 0] } : { y: [0, -4, 0] }}
            transition={{ repeat: petBounce ? 1 : Infinity, duration: petBounce ? 0.35 : 1.6 }}
            className="w-20 h-22 sm:w-24 sm:h-26 relative"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              {/* Wooden Perch */}
              <rect x="15" y="80" width="70" height="7" rx="3" fill="#78350F" />
              {/* Long Tail Feathers */}
              <path d="M48 70 Q46 95 44 98 Q50 94 52 70 Z" fill="#047857" />
              <path d="M52 70 Q54 96 58 98 Q56 92 54 70 Z" fill="#059669" />
              {/* Parrot Body */}
              <ellipse cx="50" cy="56" rx="16" ry="22" fill="#10B981" stroke="#047857" strokeWidth="2" />
              {/* Wing */}
              <path d="M42 50 C36 60, 40 72, 48 74 C44 68, 44 56, 42 50 Z" fill="#059669" />
              {/* Head */}
              <circle cx="50" cy="34" r="14" fill="#10B981" stroke="#047857" strokeWidth="2" />
              {/* Red Ring around neck */}
              <path d="M42 42 Q50 46 58 42" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Curved Red Beak */}
              <path d="M58 32 C68 34, 72 44, 62 46 C60 42, 58 36, 58 32 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
              {/* Eye */}
              <circle cx="52" cy="30" r="3.5" fill="#FFFFFF" stroke="#047857" strokeWidth="1" />
              <circle cx="53" cy="30" r="1.8" fill="#0F172A" />
              {/* Little Claws on perch */}
              <circle cx="46" cy="80" r="2.5" fill="#F59E0B" />
              <circle cx="54" cy="80" r="2.5" fill="#F59E0B" />
            </svg>
          </motion.div>
        )}

        {/* CAT (മിന്നുമോൾ പൂച്ച) */}
        {activePetId === 'cat' && (
          <motion.div
            animate={petBounce ? { scale: [1, 1.2, 1], y: [-8, 0] } : { y: [0, -3, 0] }}
            transition={{ repeat: petBounce ? 1 : Infinity, duration: petBounce ? 0.35 : 1.9 }}
            className="w-20 h-22 sm:w-24 sm:h-26 relative"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              {/* Curling Tail */}
              <path d="M28 75 C14 65, 14 45, 24 40" stroke="#D97706" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Cat Body */}
              <ellipse cx="50" cy="68" rx="24" ry="18" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
              <path d="M44 54 Q46 62 44 68" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
              <path d="M52 54 Q54 62 52 68" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
              {/* Head */}
              <circle cx="54" cy="42" r="16" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
              {/* Ears */}
              <path d="M42 32 L38 20 L48 26 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <path d="M43 30 L40 23 L46 27 Z" fill="#FBCFE8" />
              <path d="M60 26 L70 20 L66 32 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <path d="M62 27 L68 23 L65 30 Z" fill="#FBCFE8" />
              {/* Eyes */}
              <ellipse cx="48" cy="40" rx="2.8" ry="3.5" fill="#15803D" />
              <circle cx="48" cy="39" r="1" fill="#FFFFFF" />
              <ellipse cx="60" cy="40" rx="2.8" ry="3.5" fill="#15803D" />
              <circle cx="60" cy="39" r="1" fill="#FFFFFF" />
              {/* Pink Nose & Whiskers */}
              <polygon points="53,46 55,46 54,48" fill="#EC4899" />
              <line x1="42" y1="46" x2="32" y2="44" stroke="#78350F" strokeWidth="1" />
              <line x1="42" y1="48" x2="32" y2="50" stroke="#78350F" strokeWidth="1" />
              <line x1="66" y1="46" x2="76" y2="44" stroke="#78350F" strokeWidth="1" />
              <line x1="66" y1="48" x2="76" y2="50" stroke="#78350F" strokeWidth="1" />
              {/* Red Bell Collar */}
              <path d="M46 52 Q54 56 62 52" stroke="#DC2626" strokeWidth="2" fill="none" />
              <circle cx="54" cy="55" r="2.8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
              {/* Paws */}
              <ellipse cx="44" cy="82" rx="6" ry="4" fill="#FDE68A" />
              <ellipse cx="60" cy="82" rx="6" ry="4" fill="#FDE68A" />
            </svg>
          </motion.div>
        )}

        <span className="text-[11px] font-black text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300 mt-1 shadow-xs group-hover:scale-105 transition-transform">
          {activePetId === 'elephant' && '🐘 അപ്പു ആനക്കുട്ടി'}
          {activePetId === 'goat' && '🐐 ആട് ഭായ്'}
          {activePetId === 'parrot' && '🦜 തത്തമ്മ സുന്ദരി'}
          {activePetId === 'cat' && '🐱 മിന്നുമോൾ പൂച്ച'}
        </span>
      </div>

      {/* Pet Selector Buttons */}
      <div className="flex items-center gap-1.5 mt-2 bg-amber-50/90 p-1.5 rounded-2xl border border-amber-300 shadow-sm">
        {PALACE_PETS_LIST.map((pet) => {
          const isSelected = activePetId === pet.id;
          return (
            <button
              key={pet.id}
              onClick={() => handleInteractWithPet(pet.id)}
              className={`px-2 py-1 rounded-xl text-xs font-black transition-all cartoon-btn flex items-center gap-1 ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-md border border-yellow-300 scale-105'
                  : 'bg-white hover:bg-amber-100 text-amber-900 border border-amber-200'
              }`}
              title={pet.description}
            >
              <span>{pet.emoji}</span>
              <span className="hidden sm:inline text-[10px]">{pet.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
