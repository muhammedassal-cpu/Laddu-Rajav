import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Sparkles, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

export type KingMood = 
  | 'idle' 
  | 'running' 
  | 'jumping' 
  | 'sliding' 
  | 'shocked' 
  | 'spicy' 
  | 'rock_bite' 
  | 'wobble' 
  | 'hero_pose' 
  | 'eating' 
  | 'victory';

interface KingAvatarProps {
  mood?: KingMood;
  costumeId?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeech?: boolean;
  speechText?: string;
  speechMalayalam?: string;
  speechTranslit?: string;
  graphicsMode?: 'hd' | 'pixel';
  onClick?: () => void;
  className?: string;
}

export const KingAvatar: React.FC<KingAvatarProps> = ({
  mood = 'idle',
  costumeId = 'kerala_mallu',
  size = 'md',
  showSpeech = false,
  speechText = '',
  speechMalayalam = '',
  speechTranslit = '',
  graphicsMode = 'hd',
  onClick,
  className = ''
}) => {
  const [isFlexing, setIsFlexing] = useState<boolean>(false);

  const sizeDims = {
    sm: 'w-28 h-34',
    md: 'w-42 h-52',
    lg: 'w-56 h-68',
    xl: 'w-72 h-88'
  }[size];

  // Costume accessories
  const isKerala = costumeId === 'kerala_mallu' || costumeId === 'default';
  const isChef = costumeId === 'chef';
  const isSports = costumeId === 'sports';
  const isDance = costumeId === 'dance';
  const isSuperhero = costumeId === 'superhero';
  const isCoconut = costumeId === 'coconut';
  const isFestival = costumeId === 'festival';
  const isFitKing = costumeId === 'fit_king';
  const isPolice = costumeId === 'police';
  const isKathakali = costumeId === 'kathakali';

  // Trigger muscle flex
  const handleMuscleFlex = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlexing(true);
    sound.playMuscleFlex();
    if (speechMalayalam || speechText) {
      sound.speakMalayalam(speechMalayalam || speechText, speechTranslit);
    } else {
      sound.speakMalayalam("മസിൽ പവർ മച്ചാനെ! എന്നെ തോൽപ്പിക്കാൻ ആർക്കും പറ്റില്ല!", "Muscle power machane! Enne tholppikkan aarkkum pattilla!");
    }
    setTimeout(() => setIsFlexing(false), 1400);
  };

  const handleSpeakSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToSpeak = speechMalayalam || speechText;
    sound.speakMalayalam(textToSpeak, speechTranslit || speechText);
  };

  // Animation variants depending on mood
  const getBodyMotion = () => {
    if (isFlexing) {
      return {
        scale: [1, 1.15, 1.1],
        y: [-2, -6, -4],
        transition: { duration: 0.35, repeat: 3, repeatType: "reverse" as const }
      };
    }

    switch (mood) {
      case 'running':
        return {
          y: [0, -8, 0],
          rotate: [-3, 3, -3],
          transition: { repeat: Infinity, duration: 0.35, ease: "easeInOut" }
        };
      case 'jumping':
        return {
          y: -25,
          scale: [1, 1.1, 1],
          transition: { duration: 0.4 }
        };
      case 'sliding':
        return {
          y: 15,
          scaleY: 0.7,
          scaleX: 1.25,
          transition: { duration: 0.3 }
        };
      case 'wobble':
        return {
          rotate: [-14, 14, -14, 14, 0],
          x: [-6, 6, -6, 6, 0],
          transition: { repeat: Infinity, duration: 0.6 }
        };
      case 'hero_pose':
        return {
          scale: [1, 1.16, 1.1],
          y: [-2, -7, -4],
          transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" as const }
        };
      case 'spicy':
        return {
          y: [-4, 4, -4],
          x: [-3, 3, -3],
          transition: { repeat: Infinity, duration: 0.15 }
        };
      case 'rock_bite':
        return {
          rotate: [0, -8, 8, -5, 0],
          transition: { duration: 0.4 }
        };
      case 'victory':
        return {
          y: [0, -14, 0],
          scale: [1, 1.1, 1],
          transition: { repeat: Infinity, duration: 0.6 }
        };
      case 'idle':
      default:
        return {
          y: [0, -4, 0],
          transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
        };
    }
  };

  const displayText = speechMalayalam || speechText;
  const subText = speechMalayalam ? (speechTranslit || speechText) : speechTranslit;

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-end select-none ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Comedic Speech Bubble with Pure Malayalam & Voice Speak Button */}
      {showSpeech && displayText && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-20 sm:-top-24 z-40 max-w-[280px] sm:max-w-[320px] bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border-3 border-amber-400 text-center"
        >
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider flex items-center gap-1">
              <span>👑 രാജാവ്</span>
            </span>
            <button
              onClick={handleSpeakSpeech}
              title="സംസാരിക്കൂ"
              className="px-2 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors flex items-center gap-1 text-[10px] font-bold shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>സംസാരിക്കൂ</span>
            </button>
          </div>

          <div className="text-xs sm:text-sm font-black text-amber-950 font-sans leading-snug">
            {displayText}
          </div>

          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-amber-400" />
          <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-0 h-0 border-x-7 border-x-transparent border-t-7 border-t-white" />
        </motion.div>
      )}

      {/* Spicy Steam Ears gag */}
      {mood === 'spicy' && (
        <div className="absolute -top-4 z-20 flex justify-between w-28 pointer-events-none">
          <motion.span 
            animate={{ y: [-5, -22], opacity: [1, 0], scale: [0.8, 1.8] }} 
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="text-2xl"
          >
            💨
          </motion.span>
          <motion.span 
            animate={{ y: [-5, -22], opacity: [1, 0], scale: [0.8, 1.8] }} 
            transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }}
            className="text-2xl"
          >
            💨
          </motion.span>
        </div>
      )}

      {/* Rock bite stars gag */}
      {mood === 'rock_bite' && (
        <div className="absolute top-6 z-20 pointer-events-none text-xl flex gap-1">
          <motion.span animate={{ rotate: 360, scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.4 }}>💥</motion.span>
          <motion.span animate={{ scale: [1, 1.3, 0.8] }} transition={{ repeat: Infinity, duration: 0.3 }}>⭐</motion.span>
        </div>
      )}

      {/* Flexing Muscle Sparkle Badge */}
      {(isFlexing || mood === 'hero_pose') && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.25, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="absolute -top-3 z-30 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5"
        >
          <Flame className="w-3.5 h-3.5 fill-yellow-200 text-yellow-200" />
          <span>മസിൽ പവർ!</span>
        </motion.div>
      )}

      {/* Fit King Golden Glow Aura */}
      {isFitKing && (
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-amber-300/40 via-yellow-200/50 to-orange-400/40 blur-xl pointer-events-none"
        />
      )}

      {/* The King SVG Cartoon Character */}
      <motion.div 
        animate={getBodyMotion()}
        className={`${sizeDims} relative flex items-center justify-center ${
          graphicsMode === 'pixel'
            ? '[image-rendering:pixelated] [filter:contrast(1.2)_saturate(1.25)]'
            : ''
        }`}
      >
        {/* Pixel Art 8-Bit Retro Grid Overlay when in Pixel Mode */}
        {graphicsMode === 'pixel' && (
          <div 
            className="absolute inset-0 pointer-events-none z-20 opacity-35 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.4)_4px),repeating-linear-gradient(90deg,transparent,transparent_3px,rgba(0,0,0,0.4)_4px)] mix-blend-overlay rounded-xl"
          />
        )}

        <svg 
          viewBox="0 0 170 195" 
          className={`w-full h-full drop-shadow-xl ${
            graphicsMode === 'pixel' ? 'shape-rendering-crispEdges' : ''
          }`}
        >
          <defs>
            {/* Retro Pixel Filter for Arcade mode */}
            <filter id="retroPixelate" x="0%" y="0%" width="100%" height="100%">
              <feFlood x="4" y="4" height="2" width="2" />
              <feComposite width="10" height="10" />
              <feTile result="a" />
              <feComposite in="SourceGraphic" in2="a" operator="in" />
              <feMorphology operator="dilate" radius="0.8" />
            </filter>

            {/* HD Specular Lighting for Ultra HD Graphics Mode */}
            <filter id="hdGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="keralaMunduGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="70%" stopColor="#FBF7EE" />
              <stop offset="100%" stopColor="#F5EFE0" />
            </linearGradient>

            <linearGradient id="keralaKasavuGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isFitKing ? "#F59E0B" : isSuperhero ? "#2563EB" : isSports ? "#06B6D4" : isDance ? "#9333EA" : isKerala ? "#059669" : "#EA580C"} />
              <stop offset="100%" stopColor={isFitKing ? "#D97706" : isSuperhero ? "#1D4ED8" : isSports ? "#0891B2" : isDance ? "#7E22CE" : isKerala ? "#047857" : "#C2410C"} />
            </linearGradient>

            <linearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isFitKing ? "#FCD34D" : isSuperhero ? "#EF4444" : isSports ? "#FDE047" : isDance ? "#EC4899" : isKerala ? "#FFFDF5" : "#FDE68A"} />
              <stop offset="100%" stopColor={isFitKing ? "#F59E0B" : isSuperhero ? "#DC2626" : isSports ? "#EAB308" : isDance ? "#DB2777" : isKerala ? "#FBF3DC" : "#F59E0B"} />
            </linearGradient>

            <radialGradient id="skinGrad" cx="45%" cy="38%" r="62%">
              <stop offset="0%" stopColor={mood === 'spicy' ? "#F87171" : "#FEE6C6"} />
              <stop offset="85%" stopColor={mood === 'spicy' ? "#DC2626" : "#F6BD80"} />
              <stop offset="100%" stopColor={mood === 'spicy' ? "#B91C1C" : "#E29A52"} />
            </radialGradient>

            <linearGradient id="muscleShadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E29A52" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C07730" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Animated Royal Cape or Kasavu Melmundu (detaches or waves) */}
          <motion.path
            d={isFitKing ? "M45 75 C15 100, 10 150, 20 178 C45 170, 50 120, 55 85 Z" : "M40 78 C12 105, 8 155, 26 180 C48 168, 52 118, 58 88 Z"}
            fill={isKerala ? "#DC2626" : isSuperhero ? "#DC2626" : "#B91C1C"}
            animate={
              mood === 'running' 
                ? { d: [
                    "M40 78 C8 95, 2 135, 12 165 C35 155, 48 118, 58 88 Z", 
                    "M40 78 C2 115, 0 155, 18 182 C40 165, 50 118, 58 88 Z"
                  ] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 0.3 }}
          />

          {/* Big Lovable Royal Belly & Robe / Traditional Kasavu Mundu */}
          <ellipse cx="85" cy="126" rx="46" ry="42" fill="url(#robeGrad)" />
          
          {/* Inner Belly Sash / Kasavu Fabric Panel */}
          <ellipse cx="85" cy="130" rx="36" ry="33" fill="url(#bellyGrad)" />

          {/* SCULPTED CHEST PECS (Funny Muscular definition on top of belly!) */}
          <g>
            {/* Left Pec */}
            <path d="M62 98 Q72 108 84 105 Q83 95 68 94 Z" fill="url(#skinGrad)" stroke="#D97706" strokeWidth="1.2" opacity="0.9" />
            {/* Right Pec */}
            <path d="M108 98 Q98 108 86 105 Q87 95 102 94 Z" fill="url(#skinGrad)" stroke="#D97706" strokeWidth="1.2" opacity="0.9" />
            {/* Center Pec Division Cleavage */}
            <line x1="85" y1="94" x2="85" y2="108" stroke="#C07730" strokeWidth="2" strokeLinecap="round" />
            
            {/* Comic 6-Pack Muscle Shading on belly */}
            <path d="M74 116 Q85 120 96 116" stroke="#D97706" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
            <path d="M76 130 Q85 134 94 130" stroke="#D97706" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
            <path d="M78 144 Q85 147 92 144" stroke="#D97706" strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round" />
          </g>

          {/* Kerala Melmundu (മേൽമുണ്ട്) Diagonal Royal Sash with Gold Border */}
          {isKerala && (
            <g>
              <path d="M58 84 L114 148 L104 156 L50 92 Z" fill="#DC2626" opacity="0.88" />
              {/* Gold border on Melmundu */}
              <path d="M60 84 L116 148" stroke="url(#keralaKasavuGold)" strokeWidth="3.5" />
              <path d="M52 92 L106 156" stroke="url(#keralaKasavuGold)" strokeWidth="2.5" />
            </g>
          )}

          {/* Golden Royal Belt / Kasavu Zari Border Band */}
          <rect x="52" y="152" width="66" height="13" rx="4" fill="url(#keralaKasavuGold)" stroke="#B45309" strokeWidth="1.5" />
          {/* Belt Red Center Gem */}
          <rect x="76" y="150" width="18" height="17" rx="4" fill="#DC2626" stroke="#FEF08A" strokeWidth="2" />
          <circle cx="85" cy="158" r="3" fill="#FEF08A" />

          {/* Traditional Kerala Kasavu Border at the bottom of the Mundu */}
          <rect x="56" y="166" width="58" height="6" fill="#F59E0B" />
          <line x1="56" y1="168" x2="114" y2="168" stroke="#DC2626" strokeWidth="1" />

          {/* Feet / Royal Kerala Slippers (മെതിയടി / Pompous Shoes) */}
          <motion.g animate={mood === 'running' ? { y: [0, -6, 0] } : {}} transition={{ repeat: Infinity, duration: 0.35 }}>
            <ellipse cx="66" cy="178" rx="14" ry="7" fill="#78350F" />
            <circle cx="68" cy="176" r="2.5" fill="#F59E0B" />
          </motion.g>
          <motion.g animate={mood === 'running' ? { y: [-6, 0, -6] } : {}} transition={{ repeat: Infinity, duration: 0.35 }}>
            <ellipse cx="104" cy="178" rx="14" ry="7" fill="#78350F" />
            <circle cx="102" cy="176" r="2.5" fill="#F59E0B" />
          </motion.g>

          {/* PROMINENT BULGING CARTOON MUSCLES & ARMS (ദ്വിശിരസ്സ് / BICEPS) */}
          {isFlexing || mood === 'hero_pose' ? (
            /* DOUBLE BICEP FLEX POSE (മസിൽ പെരുപ്പിക്കുന്ന കിംഗ്!) */
            <g>
              {/* LEFT ARM - BULGING BICEP */}
              {/* Shoulder Deltoid */}
              <ellipse cx="44" cy="98" rx="13" ry="12" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
              {/* Bulging Bicep Peak */}
              <path d="M46 92 C32 80, 22 68, 36 54 C48 64, 52 78, 48 92 Z" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2.2" />
              {/* Muscle Peak Highlight */}
              <ellipse cx="32" cy="70" rx="9" ry="11" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
              {/* Forearm & Fist */}
              <path d="M33 60 C38 46, 52 46, 54 58 C46 64, 38 68, 33 60 Z" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
              <circle cx="50" cy="54" r="7" fill="url(#skinGrad)" stroke="#78350F" strokeWidth="1.8" />
              {/* Bicep Muscle Cut Lines */}
              <path d="M28 72 Q36 74 42 68" stroke="#92400E" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              {/* Golden Armlet (തോൾവള / Tholvala) */}
              <rect x="36" y="80" width="13" height="7" rx="2" fill="url(#keralaKasavuGold)" stroke="#B45309" strokeWidth="1" transform="rotate(-25 42 83)" />

              {/* RIGHT ARM - BULGING BICEP */}
              {/* Shoulder Deltoid */}
              <ellipse cx="126" cy="98" rx="13" ry="12" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
              {/* Bulging Bicep Peak */}
              <path d="M124 92 C138 80, 148 68, 134 54 C122 64, 118 78, 122 92 Z" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2.2" />
              {/* Muscle Peak Highlight */}
              <ellipse cx="138" cy="70" rx="9" ry="11" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
              {/* Forearm & Fist */}
              <path d="M137 60 C132 46, 118 46, 116 58 C124 64, 132 68, 137 60 Z" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
              <circle cx="120" cy="54" r="7" fill="url(#skinGrad)" stroke="#78350F" strokeWidth="1.8" />
              {/* Bicep Muscle Cut Lines */}
              <path d="M142 72 Q134 74 128 68" stroke="#92400E" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              {/* Golden Armlet (തോൾവള / Tholvala) */}
              <rect x="121" y="80" width="13" height="7" rx="2" fill="url(#keralaKasavuGold)" stroke="#B45309" strokeWidth="1" transform="rotate(25 127 83)" />

              {/* Action Flex Sparkles */}
              <text x="18" y="52" fontSize="16">💪</text>
              <text x="142" y="52" fontSize="16">💪</text>
            </g>
          ) : mood === 'eating' ? (
            /* Eating Laddu with one hand, other hand strong */
            <g>
              {/* Left muscular resting arm */}
              <path d="M40 102 C26 112, 28 132, 44 140 C50 128, 48 112, 40 102 Z" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
              {/* Right arm feeding delicious Laddu */}
              <circle cx="112" cy="86" r="9" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="110" cy="84" r="1.5" fill="#FEF08A" />
              <path d="M124 116 Q128 92 112 86" stroke="url(#skinGrad)" strokeWidth="12" strokeLinecap="round" fill="none" />
              {/* Golden Armlet */}
              <rect x="36" y="112" width="12" height="6" rx="2" fill="url(#keralaKasavuGold)" stroke="#B45309" strokeWidth="1" />
            </g>
          ) : (
            /* MUSCULAR ARMS WITH VISIBLE BICEP CURVES AND GOLDEN ARMLETS */
            <g>
              {/* Left Arm: Deltoid + Defined Bicep + Golden Armlet */}
              <motion.g
                animate={mood === 'running' ? { rotate: [-15, 20, -15], originX: "48px", originY: "96px" } : {}}
                transition={{ repeat: Infinity, duration: 0.35 }}
              >
                {/* Shoulder Deltoid */}
                <ellipse cx="46" cy="102" rx="11" ry="10" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="1.8" />
                {/* Bulging Bicep outline */}
                <path d="M46 102 C30 114, 28 130, 42 142 C48 134, 52 120, 46 102 Z" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
                {/* Bicep Muscle Curve Line */}
                <path d="M33 118 Q40 122 45 116" stroke="#92400E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                {/* Left Fist */}
                <circle cx="42" cy="142" r="7.5" fill="url(#skinGrad)" stroke="#78350F" strokeWidth="1.8" />
                {/* Golden Armlet (തോൾവള) */}
                <rect x="34" y="110" width="12" height="6" rx="2" fill="url(#keralaKasavuGold)" stroke="#B45309" strokeWidth="1" />
              </motion.g>

              {/* Right Arm: Deltoid + Defined Bicep + Golden Armlet */}
              <motion.g
                animate={mood === 'running' ? { rotate: [20, -15, 20], originX: "122px", originY: "96px" } : {}}
                transition={{ repeat: Infinity, duration: 0.35 }}
              >
                {/* Shoulder Deltoid */}
                <ellipse cx="124" cy="102" rx="11" ry="10" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="1.8" />
                {/* Bulging Bicep outline */}
                <path d="M124 102 C140 114, 142 130, 128 142 C122 134, 118 120, 124 102 Z" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
                {/* Bicep Muscle Curve Line */}
                <path d="M137 118 Q130 122 125 116" stroke="#92400E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                {/* Right Fist */}
                <circle cx="128" cy="142" r="7.5" fill="url(#skinGrad)" stroke="#78350F" strokeWidth="1.8" />
                {/* Golden Armlet (തോൾവള) */}
                <rect x="124" y="110" width="12" height="6" rx="2" fill="url(#keralaKasavuGold)" stroke="#B45309" strokeWidth="1" />
              </motion.g>
            </g>
          )}

          {/* Golden Necklace (സ്വർണ്ണ മാല / കാശുമാല) resting on chest */}
          <path d="M66 96 Q85 114 104 96" stroke="url(#keralaKasavuGold)" strokeWidth="3.5" fill="none" />
          <circle cx="85" cy="106" r="5" fill="#DC2626" stroke="#FEF08A" strokeWidth="1.5" />

          {/* Friendly Expressive Mallu Cartoon Head - Prominently Visible & Lovable */}
          <circle cx="85" cy="62" r="37" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="2" />
          {/* Gentle Highlight on Forehead */}
          <ellipse cx="85" cy="46" rx="20" ry="10" fill="#FFFDF0" opacity="0.45" />

          {/* Ears with Traditional Gold Kadukkan (കടുക്കൻ) Earrings! */}
          <ellipse cx="48" cy="64" rx="7" ry="9" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="46" cy="71" r="3.8" fill="url(#keralaKasavuGold)" stroke="#92400E" strokeWidth="1.2" />
          <circle cx="46" cy="71" r="1.6" fill="#DC2626" />

          <ellipse cx="122" cy="64" rx="7" ry="9" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="124" cy="71" r="3.8" fill="url(#keralaKasavuGold)" stroke="#92400E" strokeWidth="1.2" />
          <circle cx="124" cy="71" r="1.6" fill="#DC2626" />

          {/* Traditional Kerala Chandana Kuri (ചന്ദനക്കുറി) & Red Kumkum Pottu on Clear Forehead */}
          <g>
            <path d="M75 40 Q85 38 95 40" stroke="#FEF3C7" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M74 43.5 Q85 41.5 96 43.5" stroke="#FEF3C7" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M75 47 Q85 45 95 47" stroke="#FEF3C7" strokeWidth="2.8" strokeLinecap="round" />
            {/* Bright Red Vermillion Sindoor / Kumkum Dot */}
            <circle cx="85" cy="43.5" r="3.4" fill="#DC2626" stroke="#FEF08A" strokeWidth="0.8" />
          </g>

          {/* Big Expressive, Friendly Cartoon Eyes */}
          {mood === 'shocked' || mood === 'rock_bite' ? (
            <g>
              <circle cx="73" cy="58" r="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
              <circle cx="97" cy="58" r="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
              <circle cx="73" cy="58" r="4.2" fill="#1E293B" />
              <circle cx="97" cy="58" r="4.2" fill="#1E293B" />
              <circle cx="75" cy="56" r="1.5" fill="#FFFFFF" />
              <circle cx="99" cy="56" r="1.5" fill="#FFFFFF" />
            </g>
          ) : mood === 'spicy' ? (
            <g>
              <path d="M65 59 Q73 51 81 59" stroke="#991B1B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M89 59 Q97 51 105 59" stroke="#991B1B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {/* White Sclera with subtle border */}
              <ellipse cx="74" cy="58" rx="8.5" ry="9" fill="#FFFFFF" stroke="#78350F" strokeWidth="1.2" />
              <ellipse cx="96" cy="58" rx="8.5" ry="9" fill="#FFFFFF" stroke="#78350F" strokeWidth="1.2" />
              {/* Warm Brown / Black Cartoon Iris & Pupil */}
              <circle cx="75" cy="58" r="5.5" fill="#451A03" />
              <circle cx="75" cy="58" r="3.8" fill="#09090B" />
              <circle cx="95" cy="58" r="5.5" fill="#451A03" />
              <circle cx="95" cy="58" r="3.8" fill="#09090B" />
              {/* Joyful Double Reflection Sparkles */}
              <circle cx="77" cy="56" r="2.2" fill="#FFFFFF" />
              <circle cx="73" cy="60" r="1.1" fill="#FFFFFF" />
              <circle cx="97" cy="56" r="2.2" fill="#FFFFFF" />
              <circle cx="93" cy="60" r="1.1" fill="#FFFFFF" />
            </g>
          )}

          {/* Cute Button Nose */}
          <path d="M82 65 Q85 68 88 65" stroke="#9A3412" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="85" cy="66" r="2.8" fill="#FDBA74" opacity="0.5" />

          {/* Rosy Cheeks */}
          <circle cx="63" cy="69" r="6" fill={mood === 'spicy' ? "#EF4444" : "#F472B6"} opacity="0.65" />
          <circle cx="107" cy="69" r="6" fill={mood === 'spicy' ? "#EF4444" : "#F472B6"} opacity="0.65" />

          {/* MAGNIFICENT KERALA CURLED-UP MUSTACHE (കട്ട മീശ / KATTA MEESHA) */}
          <motion.g animate={mood === 'wobble' ? { rotate: [-6, 6, -6], originX: "85px", originY: "75px" } : isFlexing ? { scale: [1, 1.12, 1], originX: "85px", originY: "75px" } : {}} transition={{ repeat: Infinity, duration: 0.3 }}>
            <path 
              d="M56 75 C63 85, 75 88, 85 78 C95 88, 107 85, 114 75 C121 66, 110 65, 102 73 C94 78, 85 75, 76 75 C68 74, 61 66, 56 75 Z" 
              fill="#180B03" 
              stroke="#09090B"
              strokeWidth="1.8"
            />
            {/* Gloss highlight on the mustache curls */}
            <path d="M59 74 Q67 80 74 77" stroke="#52525B" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M111 74 Q103 80 96 77" stroke="#52525B" strokeWidth="1" fill="none" opacity="0.5" />
          </motion.g>

          {/* Lovable Smiling Mouth */}
          {mood === 'shocked' || mood === 'rock_bite' ? (
            <ellipse cx="85" cy="85" rx="8" ry="10" fill="#7F1D1D" stroke="#450A0A" strokeWidth="1.5" />
          ) : mood === 'eating' ? (
            <path d="M78 80 Q85 93 92 80 Z" fill="#991B1B" />
          ) : (
            <g>
              {/* Happy Open Smile with Pearly White Teeth and Pink Tongue */}
              <path d="M76 80 Q85 94 94 80 Z" fill="#881337" stroke="#78350F" strokeWidth="1.5" />
              {/* White teeth strip */}
              <path d="M78 80 Q85 86 92 80 Z" fill="#FFFFFF" />
              {/* Rosy tongue */}
              <ellipse cx="85" cy="88" rx="4.5" ry="3.5" fill="#F472B6" />
            </g>
          )}

          {/* Proud Friendly Eyebrows */}
          <path d="M66 50 Q75 44 83 51" stroke="#180B03" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M87 51 Q95 44 104 50" stroke="#180B03" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Traditional Kerala Royal Crown / Thalappavu with Peacock Feather (മയിൽപ്പീലി) */}
          {isCoconut ? (
            <g>
              <path d="M54 36 Q85 10 116 36 Q85 32 54 36 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" />
              <circle cx="75" cy="26" r="2.5" fill="#451A03" />
              <circle cx="95" cy="26" r="2.5" fill="#451A03" />
              <circle cx="85" cy="18" r="2.5" fill="#451A03" />
            </g>
          ) : isChef ? (
            <g>
              <path d="M58 34 C54 12, 64 4, 76 10 C84 2, 96 4, 98 12 C108 10, 116 20, 110 34 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
              <rect x="58" y="30" width="54" height="8" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            </g>
          ) : isSports ? (
            <rect x="54" y="34" width="62" height="9" rx="3" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
          ) : isDance ? (
            <g>
              <rect x="66" y="44" width="17" height="13" rx="3" fill="#1E1B4B" stroke="#A855F7" strokeWidth="2" />
              <rect x="87" y="44" width="17" height="13" rx="3" fill="#1E1B4B" stroke="#A855F7" strokeWidth="2" />
              <line x1="83" y1="50" x2="87" y2="50" stroke="#A855F7" strokeWidth="2" />
            </g>
          ) : isPolice ? (
            /* Police Khaki Cap with Badge & Aviator Shades */
            <g>
              {/* Khaki Cap */}
              <path d="M52 34 C54 18, 76 14, 85 14 C94 14, 116 18, 118 34 Z" fill="#854D0E" stroke="#583101" strokeWidth="2" />
              {/* Black Visor */}
              <path d="M50 34 Q85 40 120 34 Q85 30 50 34 Z" fill="#09090B" stroke="#27272A" strokeWidth="1.5" />
              {/* Police Gold Badge */}
              <polygon points="85,18 89,25 81,25" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
              <circle cx="85" cy="23" r="1.5" fill="#DC2626" />
              {/* Aviator Shades */}
              <rect x="63" y="52" width="20" height="15" rx="3" fill="#09090B" stroke="#D97706" strokeWidth="1.5" opacity="0.9" />
              <rect x="87" y="52" width="20" height="15" rx="3" fill="#09090B" stroke="#D97706" strokeWidth="1.5" opacity="0.9" />
              <line x1="83" y1="56" x2="87" y2="56" stroke="#D97706" strokeWidth="2" />
              <line x1="66" y1="55" x2="72" y2="61" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
              <line x1="90" y1="55" x2="96" y2="61" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
            </g>
          ) : isKathakali ? (
            /* Grand Kathakali Kirita Headdress */
            <g>
              {/* Giant Outer Kirita Disc Halo */}
              <circle cx="85" cy="18" r="28" fill="#15803D" stroke="#CA8A04" strokeWidth="3" />
              <circle cx="85" cy="18" r="22" fill="#DC2626" stroke="#FEF08A" strokeWidth="2" />
              <circle cx="85" cy="18" r="15" fill="#EAB308" />
              {/* Central Conical Crown */}
              <path d="M72 32 L85 0 L98 32 Z" fill="#EAB308" stroke="#78350F" strokeWidth="2" />
              <circle cx="85" cy="1" r="3.5" fill="#DC2626" />
              {/* Chutti facial white border */}
              <path d="M55 70 Q85 102 115 70" stroke="#FFFFFF" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            /* Traditional Kerala Royal Crown (സ്വർണ്ണ കിരീടം) with Peacock Feather (മയിൽപ്പീലി) */
            <g>
              {/* Peacock Feather (മയിൽപ്പീലി) gracefully tucked into crown */}
              <g transform="translate(100, 2) rotate(16)">
                <path d="M0 30 Q12 15 8 0 Q-4 15 0 30 Z" fill="#059669" stroke="#047857" strokeWidth="1.2" />
                <ellipse cx="4" cy="9" rx="5" ry="7" fill="#0284C7" />
                <circle cx="4" cy="9" r="3" fill="#1E3A8A" />
                <circle cx="4" cy="8" r="1.5" fill="#FDE047" />
              </g>

              {/* Kerala Royal Gold Crown (സ്വർണ്ണ കിരീടം) sitting gracefully above forehead */}
              <path d="M56 34 L62 14 L74 24 L85 8 L96 24 L108 14 L114 34 Z" fill="url(#keralaKasavuGold)" stroke="#B45309" strokeWidth="2" />
              {/* Crown Center Gem Ruby */}
              <circle cx="85" cy="8" r="4.2" fill="#DC2626" stroke="#FEF08A" strokeWidth="1" />
              <circle cx="62" cy="14" r="3.2" fill="#059669" />
              <circle cx="108" cy="14" r="3.2" fill="#059669" />
              {/* Crown Base Gold Arch with inlaid Rubies and Emeralds */}
              <rect x="56" y="30" width="58" height="6.5" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
              <circle cx="68" cy="33.2" r="1.6" fill="#DC2626" />
              <circle cx="85" cy="33.2" r="2.2" fill="#059669" stroke="#FEF08A" strokeWidth="0.8" />
              <circle cx="102" cy="33.2" r="1.6" fill="#DC2626" />
            </g>
          )}
        </svg>
      </motion.div>

      {/* Interactive Muscle Flex Quick Action Button */}
      <button
        onClick={handleMuscleFlex}
        title="മസിൽ കാണിക്കൂ!"
        className="mt-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-black text-[11px] rounded-full shadow-md border border-amber-300 transition-transform active:scale-95 flex items-center gap-1 z-10 cartoon-btn"
      >
        <span>💪 മസിൽ കാണിക്കൂ!</span>
      </button>
    </div>
  );
};
