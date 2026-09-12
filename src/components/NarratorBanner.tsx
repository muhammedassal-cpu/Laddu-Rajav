import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Megaphone } from 'lucide-react';

interface NarratorBannerProps {
  quote: string;
  className?: string;
}

export const NarratorBanner: React.FC<NarratorBannerProps> = ({ quote, className = '' }) => {
  if (!quote) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      key={quote}
      className={`bg-gradient-to-r from-purple-700 via-indigo-700 to-amber-600 text-amber-100 px-4 py-2 rounded-xl shadow-md flex items-center gap-2.5 text-xs sm:text-sm border border-amber-300/40 select-none ${className}`}
    >
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-purple-900 flex-shrink-0 shadow-inner">
        <Megaphone className="w-4 h-4" />
      </div>
      <div className="flex-1 italic font-medium tracking-wide">
        <span className="text-amber-300 font-extrabold not-italic uppercase text-[11px] mr-1.5 tracking-wider">
          📢 കഥാകാരൻ:
        </span>
        "{quote}"
      </div>
      <Sparkles className="w-4 h-4 text-amber-300 animate-spin flex-shrink-0 opacity-75" />
    </motion.div>
  );
};
