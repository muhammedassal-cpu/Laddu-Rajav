import React from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';
import { VoiceQuote } from '../utils/quotes';

interface CoachMirchiProps {
  quote: string | VoiceQuote;
  mood?: 'idle' | 'shocked' | 'roasting' | 'excited';
  showBubble?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CoachMirchi: React.FC<CoachMirchiProps> = ({
  quote,
  mood = 'idle',
  showBubble = true,
  onClick,
  className = ''
}) => {
  const isVoiceQuote = typeof quote !== 'string';
  const mlText = isVoiceQuote ? quote.ml : quote;
  const translitText = isVoiceQuote ? quote.translit : '';
  const enText = isVoiceQuote ? quote.en : '';

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.speakMalayalam(mlText, translitText || mlText);
  };

  return (
    <div 
      className={`relative inline-flex items-end gap-3 select-none ${className}`}
      onClick={onClick}
    >
      {/* Cartoon Speech Bubble */}
      {showBubble && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          key={mlText}
          className="bg-amber-100 text-amber-950 px-3.5 py-2.5 rounded-2xl rounded-bl-sm border-2 border-amber-300 shadow-md max-w-xs text-xs sm:text-sm font-semibold relative"
        >
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <div className="flex items-center gap-1.5 text-[11px] text-red-600 font-black uppercase tracking-wider">
              <span>🌶️ കോച്ച് മിർച്ചി</span>
            </div>
            <button
              onClick={handleSpeak}
              title="സംസാരിക്കൂ"
              className="p-1 rounded-md bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors flex items-center gap-1 text-[10px] font-bold"
            >
              <Volume2 className="w-3 h-3 text-red-600" />
              <span>സംസാരിക്കൂ</span>
            </button>
          </div>

          <p className="leading-snug font-bold text-amber-950 text-xs sm:text-sm">
            {mlText}
          </p>
        </motion.div>
      )}

      {/* Coach Mirchi Animated Mongoose SVG */}
      <motion.div 
        animate={
          mood === 'shocked' 
            ? { y: [-15, 0], scale: [1.2, 1], rotate: [-10, 10, 0] }
            : mood === 'roasting'
            ? { rotate: [-4, 4, -4], y: [0, -3, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{ repeat: Infinity, duration: mood === 'roasting' ? 0.4 : 1.6 }}
        className="w-16 h-20 sm:w-20 sm:h-24 relative flex-shrink-0 cursor-pointer"
        title="Coach Mirchi - Royal Nutritionist & Roaster"
      >
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm">
          {/* Fluffy Tail */}
          <path d="M22 90 C5 75, 5 45, 18 35 C24 30, 28 45, 26 70 Z" fill="#92400E" />
          <path d="M20 85 C8 72, 8 48, 19 40 Z" fill="#B45309" />

          {/* Mongoose Body */}
          <ellipse cx="50" cy="85" rx="22" ry="24" fill="#B45309" />
          <ellipse cx="50" cy="87" rx="14" ry="18" fill="#FDE68A" />

          {/* Trainer Whistle around neck */}
          <ellipse cx="50" cy="74" rx="16" ry="6" fill="none" stroke="#DC2626" strokeWidth="2" />
          <rect x="47" y="76" width="6" height="8" rx="2" fill="#9CA3AF" />

          {/* Head */}
          <ellipse cx="56" cy="50" rx="18" ry="16" fill="#B45309" />
          <path d="M68 52 L82 54 L70 60 Z" fill="#D97706" />

          {/* Cute Little Snout */}
          <circle cx="81" cy="54" r="3" fill="#18181B" />

          {/* Eyes */}
          <circle cx="62" cy="46" r="4.5" fill="#FFFFFF" />
          <circle cx="63" cy="46" r="2.8" fill="#18181B" />
          <circle cx="64" cy="44.5" r="1" fill="#FFFFFF" />

          {/* Ears */}
          <ellipse cx="44" cy="40" rx="5" ry="7" fill="#92400E" />
          <ellipse cx="44" cy="41" rx="3" ry="5" fill="#FDE68A" />

          {/* Signature Red Chili Bandana */}
          <path d="M46 44 Q58 38 70 45 L68 49 Q58 42 46 48 Z" fill="#DC2626" />
          {/* Bandana tie knot */}
          <circle cx="44" cy="47" r="3" fill="#B91C1C" />
          <path d="M42 48 L36 54 L39 46 Z" fill="#DC2626" />

          {/* Tiny Trainer Arms / Holding mini clipboard */}
          <ellipse cx="46" cy="78" rx="5" ry="8" fill="#92400E" />
          <rect x="52" y="72" width="16" height="20" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <line x1="56" y1="77" x2="64" y2="77" stroke="#854D0E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="56" y1="82" x2="63" y2="82" stroke="#854D0E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="56" y1="87" x2="61" y2="87" stroke="#854D0E" strokeWidth="1.5" strokeLinecap="round" />

          {/* Feet */}
          <ellipse cx="42" cy="108" rx="8" ry="4" fill="#78350F" />
          <ellipse cx="58" cy="108" rx="8" ry="4" fill="#78350F" />
        </svg>
      </motion.div>
    </div>
  );
};
