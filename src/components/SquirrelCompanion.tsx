import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, Flame } from 'lucide-react';
import { sound } from '../utils/audio';
import { SQUIRREL_QUOTES, VoiceQuote } from '../utils/quotes';
import { SquirrelCostumeId } from '../types';

interface SquirrelCompanionProps {
  costumeId?: SquirrelCostumeId;
  onQuoteSpoken?: (quote: VoiceQuote) => void;
  showBubble?: boolean;
  className?: string;
}

export const SquirrelCompanion: React.FC<SquirrelCompanionProps> = ({
  costumeId = 'sq_default',
  onQuoteSpoken,
  showBubble = true,
  className = ''
}) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const [showSpeech, setShowSpeech] = useState<boolean>(true);
  const [isJumping, setIsJumping] = useState<boolean>(false);

  const activeQuote = SQUIRREL_QUOTES[currentQuoteIndex];

  const isKasavu = costumeId === 'sq_kasavu';
  const isNinja = costumeId === 'sq_ninja';
  const isCool = costumeId === 'sq_cool';
  const isGym = costumeId === 'sq_gym';
  const isTheyyam = costumeId === 'sq_theyyam';
  const isSuperhero = costumeId === 'sq_superhero';

  // Tap squirrel to speak next funny slang
  const handleTapSquirrel = () => {
    sound.playSquirrelSqueak();
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);

    const nextIndex = (currentQuoteIndex + 1) % SQUIRREL_QUOTES.length;
    setCurrentQuoteIndex(nextIndex);
    setShowSpeech(true);

    const q = SQUIRREL_QUOTES[nextIndex];
    // High-pitched cute squirrel voice
    sound.speakMalayalam(q.ml, q.translit, 1.42, 1.02);
    if (onQuoteSpoken) onQuoteSpoken(q);
  };

  // Specific viral slang shortcut
  const handleTriggerSpecificSlang = (ml: string, translit: string) => {
    sound.playSquirrelSqueak();
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);

    const found = SQUIRREL_QUOTES.find((q) => q.ml.includes(ml)) || {
      ml,
      translit,
      en: ml
    };
    const foundIdx = SQUIRREL_QUOTES.findIndex((q) => q.ml.includes(ml));
    if (foundIdx !== -1) setCurrentQuoteIndex(foundIdx);

    setShowSpeech(true);
    sound.speakMalayalam(found.ml, found.translit, 1.45, 1.04);
    if (onQuoteSpoken) onQuoteSpoken(found);
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Cartoon Speech Bubble with authentic Malayalam slang */}
      <AnimatePresence>
        {showSpeech && showBubble && (
          <motion.div
            key={activeQuote.ml}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-24 sm:-top-28 z-30 bg-amber-50 text-amber-950 px-3.5 py-2.5 rounded-2xl rounded-br-sm border-2 border-amber-400 shadow-xl max-w-[210px] sm:max-w-[240px] text-center"
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider flex items-center gap-1">
                <span>🐿️ ചിപ്പൻ അണ്ണാൻ</span>
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.speakMalayalam(activeQuote.ml, activeQuote.translit, 1.42, 1.02);
                }}
                className="px-1.5 py-0.5 rounded bg-amber-500 hover:bg-amber-600 text-white text-[9px] font-bold flex items-center gap-0.5 transition-colors"
                title="ശബ്ദം കേൾക്കൂ"
              >
                <Volume2 className="w-3 h-3" />
                <span>കേൾക്കൂ</span>
              </button>
            </div>

            <p className="text-xs sm:text-[13px] font-black text-amber-950 leading-tight">
              {activeQuote.ml}
            </p>

            {/* Bubble Tail pointing to squirrel */}
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-amber-400" />
            <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-0 h-0 border-x-5 border-x-transparent border-t-5 border-t-amber-50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Adorable Kerala Three-Striped Squirrel SVG */}
      <motion.div
        animate={
          isJumping
            ? { y: [-16, 0], scale: [1.15, 1], rotate: [-8, 8, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{ repeat: isJumping ? 1 : Infinity, duration: isJumping ? 0.35 : 1.8, ease: "easeInOut" }}
        onClick={handleTapSquirrel}
        className="w-16 h-20 sm:w-20 sm:h-24 relative cursor-pointer filter drop-shadow-md hover:scale-105 transition-transform"
        title="ചിപ്പൻ അണ്ണാൻ - തമാശ കേൾക്കാൻ തൊടൂ!"
      >
        <svg viewBox="0 0 100 120" className="w-full h-full">
          <defs>
            <linearGradient id="sqTailGrad" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="40%" stopColor="#B45309" />
              <stop offset="75%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id="sqBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>

          {/* Bushy Fluffy Tail with Striped Curves */}
          <motion.g
            animate={{ rotate: [-6, 6, -6], originX: "32px", originY: "90px" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            {/* Outer Tail */}
            <path
              d="M32 92 C10 85, 2 45, 14 25 C24 8, 38 12, 34 32 C30 52, 28 72, 34 90 Z"
              fill="url(#sqTailGrad)"
              stroke="#78350F"
              strokeWidth="1.5"
            />
            {/* Inner Fluff Highlight */}
            <path
              d="M26 84 C14 74, 10 48, 20 32 C26 22, 32 24, 28 40 C24 55, 22 72, 28 82 Z"
              fill="#FDE68A"
              opacity="0.8"
            />
            {/* Tail Fur Spikes */}
            <path d="M12 28 Q6 22 14 20" stroke="#78350F" strokeWidth="1.5" fill="none" />
            <path d="M18 16 Q24 8 28 14" stroke="#78350F" strokeWidth="1.5" fill="none" />
          </motion.g>

          {/* Superhero Cape or Ninja Trailing Headband Ribbons (behind body) */}
          {isSuperhero && (
            <motion.path
              d="M48 64 C20 70, 15 105, 30 115 C38 100, 42 80, 50 68 Z"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.5"
              animate={{ rotate: [-4, 6, -4], originX: "50px", originY: "66px" }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          )}

          {isNinja && (
            <motion.path
              d="M52 38 Q30 32 24 48 Q32 44 48 42 Z"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1"
              animate={{ rotate: [-6, 8, -6], originX: "50px", originY: "40px" }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            />
          )}

          {/* Squirrel Body */}
          <ellipse cx="56" cy="82" rx="20" ry="24" fill="url(#sqBodyGrad)" stroke="#78350F" strokeWidth="1.5" />

          {/* Kerala Three-Striped Palm Squirrel (മൂന്നു വരയുള്ള അണ്ണാൻ!) */}
          <path d="M48 64 Q50 82 48 98" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M53 62 Q56 82 54 100" stroke="#FEF3C7" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M58 64 Q62 82 60 98" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />

          {/* Creamy Belly */}
          <ellipse cx="64" cy="85" rx="11" ry="17" fill="#FEF3C7" opacity="0.9" />

          {/* Costume Torso Overlays */}
          {isKasavu && (
            /* Mini Royal Kasavu Neriyathu Sash */
            <g>
              <path d="M50 68 L74 95 L68 99 L46 72 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
              <line x1="50" y1="68" x2="74" y2="95" stroke="#D97706" strokeWidth="1.5" />
              <line x1="47" y1="71" x2="70" y2="97" stroke="#DC2626" strokeWidth="1" />
            </g>
          )}

          {isGym && (
            /* Gym Black Muscle Tank */
            <g>
              <path d="M48 70 C54 68, 68 68, 74 72 L72 96 C62 98, 52 98, 46 94 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
              <path d="M54 70 C58 78, 64 78, 68 70" stroke="#EF4444" strokeWidth="1" fill="none" />
            </g>
          )}

          {isCool && (
            /* Chunky Gold Chain Necklace */
            <path d="M54 66 Q64 76 74 68" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {isSuperhero && (
            /* Golden Lightning Bolt Crest on Chest */
            <polygon points="62,72 65,77 62,78 66,85 61,81 63,78 60,77" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
          )}

          {/* Squirrel Feet */}
          <ellipse cx="46" cy="106" rx="8" ry="4" fill="#78350F" />
          <ellipse cx="66" cy="106" rx="8" ry="4" fill="#78350F" />

          {/* Theyyam Bell Anklet (ചിലമ്പ്) */}
          {isTheyyam && (
            <g>
              <ellipse cx="66" cy="104" rx="7" ry="2" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
              <circle cx="63" cy="104" r="1.2" fill="#FEF08A" />
              <circle cx="66" cy="104" r="1.2" fill="#FEF08A" />
              <circle cx="69" cy="104" r="1.2" fill="#FEF08A" />
            </g>
          )}

          {/* Squirrel Head */}
          <ellipse cx="66" cy="46" rx="16" ry="15" fill="url(#sqBodyGrad)" stroke="#78350F" strokeWidth="1.5" />

          {/* Rosy Cheek */}
          <circle cx="74" cy="52" r="4.5" fill="#F472B6" opacity="0.6" />

          {/* Ears with inner pink */}
          <ellipse cx="56" cy="32" rx="5" ry="8" fill="#92400E" transform="rotate(-15 56 32)" />
          <ellipse cx="56" cy="32" rx="2.5" ry="5" fill="#FBCFE8" transform="rotate(-15 56 32)" />

          <ellipse cx="68" cy="31" rx="5" ry="8" fill="#92400E" transform="rotate(10 68 31)" />
          <ellipse cx="68" cy="31" rx="2.5" ry="5" fill="#FBCFE8" transform="rotate(10 68 31)" />

          {/* Head & Face Costume Items */}
          {isKasavu ? (
            /* Mini Kerala Royal Gold Crown */
            <g>
              <path d="M56 36 L60 22 L66 28 L72 20 L78 28 L84 22 L88 36 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="72" cy="21" r="2" fill="#DC2626" />
              <circle cx="60" cy="23" r="1.5" fill="#059669" />
              <circle cx="84" cy="23" r="1.5" fill="#059669" />
              <rect x="56" y="34" width="32" height="3" rx="1" fill="#D97706" />
              {/* Chandana Kuri Sandal paste mark */}
              <line x1="70" y1="40" x2="74" y2="40" stroke="#FEF3C7" strokeWidth="1.5" />
              <circle cx="72" cy="42" r="1" fill="#DC2626" />
            </g>
          ) : isNinja ? (
            /* Black Shinobi Mask and Red Ninja Headband */
            <g>
              {/* Headband */}
              <rect x="54" y="34" width="32" height="6" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
              <circle cx="70" cy="37" r="1.5" fill="#FEF08A" />
              {/* Face Mask covering mouth/snout */}
              <path d="M68 48 C78 46, 88 50, 84 56 C78 60, 68 58, 66 52 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
            </g>
          ) : isCool ? (
            /* Backwards Red Cap & Dark Sunglasses */
            <g>
              {/* Red Backwards Cap */}
              <path d="M52 34 C54 22, 76 22, 80 34 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
              <rect x="44" y="32" width="12" height="4" rx="2" fill="#991B1B" />
              {/* Dark Cool Sunglasses */}
              <rect x="65" y="41" width="16" height="9" rx="2" fill="#09090B" stroke="#F59E0B" strokeWidth="1" />
              <line x1="68" y1="43" x2="72" y2="47" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
            </g>
          ) : isGym ? (
            /* Red Athletic Sweatband */
            <g>
              <rect x="54" y="34" width="32" height="6" rx="2" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
              <line x1="55" y1="37" x2="85" y2="37" stroke="#FFFFFF" strokeWidth="1.2" />
            </g>
          ) : isTheyyam ? (
            /* Traditional Tall Theyyam Radiating Headdress */
            <g>
              {/* Fan feathers */}
              <path d="M54 34 Q70 6 86 34 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
              <path d="M58 32 Q70 12 82 32 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
              <circle cx="70" cy="18" r="3" fill="#DC2626" />
              {/* Theyyam Facial Red Masking */}
              <circle cx="76" cy="50" r="3" fill="#DC2626" opacity="0.6" />
              <path d="M72 40 L76 38 L72 36" stroke="#DC2626" strokeWidth="1.2" fill="none" />
            </g>
          ) : isSuperhero ? (
            /* Yellow Hero Domino Mask */
            <g>
              <ellipse cx="72" cy="44" rx="8" ry="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
              <circle cx="72" cy="44" r="3.5" fill="#18181B" />
              <circle cx="74" cy="42" r="1.5" fill="#FFFFFF" />
            </g>
          ) : (
            /* Default Mini Kasavu Headband */
            <g>
              <path d="M56 38 Q67 34 78 40" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              <circle cx="67" cy="36" r="2" fill="#DC2626" />
            </g>
          )}

          {/* Shiny Anime Eye (for non-cool / non-superhero which have their own glasses/mask) */}
          {!isCool && !isSuperhero && (
            <g>
              <circle cx="72" cy="44" r="5" fill="#18181B" />
              <circle cx="74" cy="42" r="2" fill="#FFFFFF" />
              <circle cx="71" cy="46" r="1" fill="#FFFFFF" />
            </g>
          )}

          {/* Cute Snout & Black Nose */}
          {!isNinja && (
            <g>
              <path d="M78 48 Q86 48 84 54 Q78 56 76 52 Z" fill="#FDE68A" />
              <circle cx="85" cy="50" r="2.2" fill="#18181B" />
              {/* Cute Whisker Lines */}
              <line x1="82" y1="52" x2="94" y2="49" stroke="#78350F" strokeWidth="0.8" />
              <line x1="82" y1="54" x2="94" y2="55" stroke="#78350F" strokeWidth="0.8" />
            </g>
          )}

          {/* Tiny Paws Holding Items (Dumbbell for Gym, Shuriken for Ninja, Laddu for Others) */}
          <g>
            {isGym ? (
              /* Mini Iron Barbell Dumbbell (🏋️) */
              <g>
                <rect x="68" y="72" width="16" height="3" rx="1" fill="#71717A" stroke="#3F3F46" strokeWidth="0.8" />
                <rect x="66" y="68" width="4" height="11" rx="1.5" fill="#27272A" stroke="#18181B" strokeWidth="1" />
                <rect x="82" y="68" width="4" height="11" rx="1.5" fill="#27272A" stroke="#18181B" strokeWidth="1" />
                {/* Paws grasping dumbbell */}
                <ellipse cx="69" cy="73" rx="4" ry="3" fill="#FDE68A" stroke="#92400E" strokeWidth="1" />
                <ellipse cx="79" cy="73" rx="4" ry="3" fill="#FDE68A" stroke="#92400E" strokeWidth="1" />
              </g>
            ) : isNinja ? (
              /* Ninja Shuriken Star Laddu (🥷) */
              <g>
                <polygon points="73,66 76,73 83,73 78,77 80,84 73,80 66,84 68,77 63,73 70,73" fill="#3F3F46" stroke="#18181B" strokeWidth="1" />
                <circle cx="73" cy="75" r="3" fill="#F59E0B" />
                {/* Paws grasping */}
                <ellipse cx="67" cy="74" rx="4" ry="3" fill="#FDE68A" stroke="#92400E" strokeWidth="1" />
                <ellipse cx="78" cy="74" rx="4" ry="3" fill="#FDE68A" stroke="#92400E" strokeWidth="1" />
              </g>
            ) : (
              /* The Sweet Royal Laddu */
              <g>
                <circle cx="72" cy="74" r="8" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="70" cy="72" r="1.5" fill="#FEF08A" />
                <circle cx="74" cy="75" r="1.2" fill="#FEF08A" />
                {/* Paws grasping the laddu */}
                <ellipse cx="66" cy="73" rx="4.5" ry="3.5" fill="#FDE68A" stroke="#92400E" strokeWidth="1" />
                <ellipse cx="77" cy="74" rx="4.5" ry="3.5" fill="#FDE68A" stroke="#92400E" strokeWidth="1" />
              </g>
            )}
          </g>
        </svg>
      </motion.div>

      {/* Quick Slang Action Pills requested by user */}
      <div className="flex flex-wrap items-center justify-center gap-1 mt-2 max-w-[240px]">
        <button
          onClick={() => handleTriggerSpecificSlang("പൊളി മച്ചാനെ", "Pwoli machanne")}
          className="px-2 py-0.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-[10px] rounded-lg shadow-sm cartoon-btn"
          title="പൊളി മച്ചാനെ!"
        >
          🔥 പൊളി മച്ചാനെ
        </button>

        <button
          onClick={() => handleTriggerSpecificSlang("മച്ചാൻ തീ ആണ്", "Machan thee aahn")}
          className="px-2 py-0.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-[10px] rounded-lg shadow-sm cartoon-btn"
          title="മച്ചാൻ തീ ആണ്!"
        >
          ⚡ മച്ചാൻ തീ ആണ്
        </button>

        <button
          onClick={() => handleTriggerSpecificSlang("തന്ത ഉണ്ടോ", "Thantha undo")}
          className="px-2 py-0.5 bg-red-500 hover:bg-red-600 text-white font-black text-[10px] rounded-lg shadow-sm cartoon-btn"
          title="തന്ത ഉണ്ടോ?!"
        >
          😂 തന്ത ഉണ്ടോ?!
        </button>

        <button
          onClick={() => handleTriggerSpecificSlang("മെല്ലെ അനങ്ങി പണി എടുക്ക്", "Mell anagi pani edukk")}
          className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] rounded-lg shadow-sm cartoon-btn"
          title="മെല്ലെ അനങ്ങി പണി എടുക്ക്!"
        >
          💪 പണി എടുക്ക്
        </button>
      </div>
    </div>
  );
};
