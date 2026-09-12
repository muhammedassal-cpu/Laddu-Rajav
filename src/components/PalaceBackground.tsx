import React from 'react';
import { motion } from 'motion/react';
import { BackgroundThemeId, PalaceStyleId } from '../types';

interface PalaceBackgroundProps {
  theme?: BackgroundThemeId;
  themeId?: BackgroundThemeId;
  palaceStyle?: PalaceStyleId;
  children?: React.ReactNode;
  className?: string;
}

export const PalaceBackground: React.FC<PalaceBackgroundProps> = ({
  theme,
  themeId,
  palaceStyle = 'palace_travancore',
  children,
  className = ''
}) => {
  const activeTheme = themeId || theme || 'palace';

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden border-4 shadow-2xl transition-all duration-500 ${className}`}>
      {/* 1. PALACE STYLES (തിരുവിതാംകൂർ രാജകൊട്ടാരം വിവിധ ശൈലികൾ) */}
      {activeTheme === 'palace' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* A. PALACE STYLE: TRAVANCORE TEAK (പരമ്പരാഗത തേക്ക് കൊട്ടാരം) */}
          {palaceStyle === 'palace_travancore' && (
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950">
              {/* Terracotta Tiled Roof & Carved Gables */}
              <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-amber-800 to-amber-900 border-b-4 border-yellow-600/80 shadow-lg flex items-center justify-between px-4 sm:px-6">
                <div className="text-yellow-400 font-bold text-xs tracking-wider flex items-center gap-2">
                  <span className="text-xl">🛕</span>
                  <span className="font-cartoon text-amber-200 uppercase text-[11px] sm:text-xs">തിരുവിതാംകൂർ തേക്ക് കൊട്ടാരം</span>
                </div>
                <div className="flex gap-2 sm:gap-4 text-sm sm:text-base">
                  <span className="text-yellow-400 drop-shadow">✨</span>
                  <span className="text-yellow-300 drop-shadow">👑</span>
                  <span className="text-yellow-400 drop-shadow">✨</span>
                </div>
              </div>

              {/* Carved Teak Wooden Pillars */}
              <div className="absolute inset-y-0 left-2 w-7 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 border-r-2 border-yellow-600/60 shadow-xl opacity-90 hidden sm:block">
                <div className="absolute top-18 inset-x-0 h-2.5 bg-yellow-500 border-y border-yellow-700" />
                <div className="absolute top-36 inset-x-0 h-2.5 bg-yellow-500 border-y border-yellow-700" />
                <div className="absolute bottom-16 inset-x-0 h-2.5 bg-yellow-500 border-y border-yellow-700" />
              </div>
              <div className="absolute inset-y-0 right-2 w-7 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 border-l-2 border-yellow-600/60 shadow-xl opacity-90 hidden sm:block">
                <div className="absolute top-18 inset-x-0 h-2.5 bg-yellow-500 border-y border-yellow-700" />
                <div className="absolute top-36 inset-x-0 h-2.5 bg-yellow-500 border-y border-yellow-700" />
                <div className="absolute bottom-16 inset-x-0 h-2.5 bg-yellow-500 border-y border-yellow-700" />
              </div>

              {/* Traditional Nilavilakku Brass Lamps */}
              <div className="absolute top-16 left-12 opacity-85 hidden sm:flex flex-col items-center">
                <motion.div animate={{ opacity: [0.75, 1, 0.8], scale: [0.95, 1.05, 0.95] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-3.5 h-4 rounded-full bg-gradient-to-t from-yellow-500 via-orange-400 to-amber-200 blur-[2px] mb-[-3px]" />
                <div className="w-7 h-16 relative">
                  <svg viewBox="0 0 40 100" className="w-full h-full">
                    <ellipse cx="20" cy="18" rx="14" ry="4" fill="#EAB308" stroke="#854D0E" strokeWidth="1" />
                    <rect x="18" y="18" width="4" height="60" fill="#CA8A04" />
                    <ellipse cx="20" cy="80" rx="18" ry="6" fill="#EAB308" stroke="#854D0E" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-16 right-12 opacity-85 hidden sm:flex flex-col items-center">
                <motion.div animate={{ opacity: [0.8, 1, 0.75], scale: [1, 1.08, 0.96] }} transition={{ repeat: Infinity, duration: 1.4 }} className="w-3.5 h-4 rounded-full bg-gradient-to-t from-yellow-500 via-orange-400 to-amber-200 blur-[2px] mb-[-3px]" />
                <div className="w-7 h-16 relative">
                  <svg viewBox="0 0 40 100" className="w-full h-full">
                    <ellipse cx="20" cy="18" rx="14" ry="4" fill="#EAB308" stroke="#854D0E" strokeWidth="1" />
                    <rect x="18" y="18" width="4" height="60" fill="#CA8A04" />
                    <ellipse cx="20" cy="80" rx="18" ry="6" fill="#EAB308" stroke="#854D0E" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Royal Red Carpet with Pookkalam */}
              <div className="absolute bottom-0 inset-x-8 sm:inset-x-24 h-24 bg-gradient-to-t from-red-800 via-red-900 to-red-950 border-x-4 border-yellow-400/90 shadow-2xl opacity-90 rounded-t-2xl flex items-center justify-center">
                <div className="w-20 h-10 rounded-full border border-yellow-300/50 flex items-center justify-center opacity-70">
                  <span className="text-lg">🌸🌼🌺</span>
                </div>
              </div>
            </div>
          )}

          {/* B. PALACE STYLE: ROYAL 24K GOLD (സ്വർണ്ണ ദർബാർ ഹാൾ) */}
          {palaceStyle === 'palace_gold' && (
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-950 via-amber-900 to-yellow-950">
              {/* Golden Roof Arch with Diamonds */}
              <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 border-b-4 border-yellow-300 shadow-xl flex items-center justify-between px-4 sm:px-6">
                <div className="text-amber-950 font-black text-xs tracking-wider flex items-center gap-2">
                  <span className="text-xl">✨🏛️</span>
                  <span className="font-cartoon uppercase text-[11px] sm:text-xs text-amber-950">സ്വർണ്ണ ദർബാർ ഹാൾ</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>💎</motion.span>
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>👑</motion.span>
                  <motion.span animate={{ rotate: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>💎</motion.span>
                </div>
              </div>

              {/* Shimmering Solid Gold Pillars with Ruby Inlay */}
              <div className="absolute inset-y-0 left-2 w-8 bg-gradient-to-r from-yellow-600 via-yellow-300 to-amber-500 border-r-2 border-yellow-200 shadow-2xl opacity-95 hidden sm:block">
                <div className="absolute top-16 inset-x-1 h-3 bg-red-600 rounded-sm border border-yellow-200" />
                <div className="absolute top-36 inset-x-1 h-3 bg-emerald-600 rounded-sm border border-yellow-200" />
                <div className="absolute bottom-16 inset-x-1 h-3 bg-red-600 rounded-sm border border-yellow-200" />
              </div>
              <div className="absolute inset-y-0 right-2 w-8 bg-gradient-to-r from-yellow-600 via-yellow-300 to-amber-500 border-l-2 border-yellow-200 shadow-2xl opacity-95 hidden sm:block">
                <div className="absolute top-16 inset-x-1 h-3 bg-red-600 rounded-sm border border-yellow-200" />
                <div className="absolute top-36 inset-x-1 h-3 bg-emerald-600 rounded-sm border border-yellow-200" />
                <div className="absolute bottom-16 inset-x-1 h-3 bg-red-600 rounded-sm border border-yellow-200" />
              </div>

              {/* Royal Purple Velvet Carpet with Golden Coins */}
              <div className="absolute bottom-0 inset-x-8 sm:inset-x-24 h-24 bg-gradient-to-t from-purple-950 via-indigo-900 to-purple-900 border-x-4 border-yellow-300 shadow-2xl rounded-t-2xl flex items-center justify-center">
                <div className="flex gap-2 text-xl opacity-80">
                  <span>🪙</span>
                  <span>✨</span>
                  <span>🪙</span>
                </div>
              </div>

              {/* Golden Light Beam */}
              <div className="absolute top-0 inset-x-1/4 h-full bg-gradient-to-b from-yellow-300/20 via-amber-200/10 to-transparent pointer-events-none" />
            </div>
          )}

          {/* C. PALACE STYLE: MONSOON VERANDAH (മഴ നനഞ്ഞ പൂമുഖം) */}
          {palaceStyle === 'palace_monsoon' && (
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900">
              {/* Rain Clouds & Verandah Eaves */}
              <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-slate-800 to-slate-900 border-b-4 border-teal-500/70 shadow-lg flex items-center justify-between px-4 sm:px-6">
                <div className="text-teal-300 font-bold text-xs tracking-wider flex items-center gap-2">
                  <span className="text-xl">🌧️🪷</span>
                  <span className="font-cartoon uppercase text-[11px] sm:text-xs">മഴ നനഞ്ഞ പൂമുഖം</span>
                </div>
                <div className="flex gap-2 text-sm text-teal-200">
                  <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>💧</motion.span>
                  <span>🌧️</span>
                  <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }}>💧</motion.span>
                </div>
              </div>

              {/* Falling Rain Streaks Animation */}
              <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-12 bg-teal-200/60 rounded-full"
                    style={{ left: `${(i * 8.5) + 3}%` }}
                    animate={{ y: [-20, 320], opacity: [0, 0.8, 0] }}
                    transition={{ repeat: Infinity, duration: 0.9 + (i % 3) * 0.2, delay: (i % 4) * 0.2, ease: "linear" }}
                  />
                ))}
              </div>

              {/* Grey Carved Granite Pillars */}
              <div className="absolute inset-y-0 left-2 w-7 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 border-r border-teal-400/40 hidden sm:block" />
              <div className="absolute inset-y-0 right-2 w-7 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 border-l border-teal-400/40 hidden sm:block" />

              {/* Wet Courtyard Floor with Brass Uruli & Lotus Flowers */}
              <div className="absolute bottom-0 inset-x-8 sm:inset-x-24 h-24 bg-gradient-to-t from-slate-950 via-slate-900 to-teal-950 border-x-2 border-teal-400/40 rounded-t-2xl flex items-center justify-center">
                {/* Traditional Uruli (ഉരുളി) with Floating Lotuses */}
                <div className="w-28 h-10 rounded-full bg-amber-600/70 border-2 border-amber-400/90 flex items-center justify-center gap-1.5 shadow-lg">
                  <span className="text-base">🪷</span>
                  <span className="text-xs">💧</span>
                  <span className="text-base">🪷</span>
                </div>
              </div>
            </div>
          )}

          {/* D. PALACE STYLE: POORAM FESTIVAL PALACE (പൂര ഉത്സവാഘോഷ കൊട്ടാരം) */}
          {palaceStyle === 'palace_pooram' && (
            <div className="absolute inset-0 bg-gradient-to-b from-red-950 via-amber-900 to-purple-950">
              {/* Marigold Garland Arch & Nettipattam */}
              <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-r from-red-800 via-amber-600 to-red-800 border-b-4 border-yellow-400 shadow-xl flex items-center justify-between px-4 sm:px-6">
                <div className="text-yellow-300 font-black text-xs tracking-wider flex items-center gap-2">
                  <span className="text-xl">🥁🐘</span>
                  <span className="font-cartoon uppercase text-[11px] sm:text-xs">പൂര ഉത്സവാഘോഷ കൊട്ടാരം</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span>🎊</span>
                  <span>🎪</span>
                  <span>🚩</span>
                </div>
              </div>

              {/* Golden Elephant Nettipattam Motifs on Left & Right */}
              <div className="absolute top-16 left-3 hidden sm:flex flex-col items-center">
                <span className="text-2xl filter drop-shadow">🐘</span>
                <span className="text-[10px] font-black text-yellow-300 bg-red-950 px-1 rounded border border-yellow-400">നെറ്റിപ്പട്ടം</span>
              </div>
              <div className="absolute top-16 right-3 hidden sm:flex flex-col items-center">
                <span className="text-2xl filter drop-shadow">🥁</span>
                <span className="text-[10px] font-black text-yellow-300 bg-red-950 px-1 rounded border border-yellow-400">മേളം</span>
              </div>

              {/* Deepasthambham Multi-tier Lamp Glow */}
              <div className="absolute bottom-0 inset-x-8 sm:inset-x-24 h-24 bg-gradient-to-t from-amber-950 via-orange-950 to-red-950 border-x-4 border-yellow-400 rounded-t-2xl flex items-center justify-center">
                <div className="flex items-center gap-3 text-lg">
                  <span className="animate-pulse">🪔</span>
                  <span className="text-yellow-300 font-extrabold text-xs">ഇലഞ്ഞിത്തറ ദീപം</span>
                  <span className="animate-pulse">🪔</span>
                </div>
              </div>
            </div>
          )}

          {/* E. PALACE STYLE: CYBER NEON PALACE (സൈബർ നിയോൺ കൊട്ടാരം) */}
          {palaceStyle === 'palace_cyber' && (
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
              {/* Neon Cyan & Magenta Gable */}
              <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-r from-cyan-900 via-fuchsia-950 to-cyan-900 border-b-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center justify-between px-4 sm:px-6">
                <div className="text-cyan-300 font-black text-xs tracking-wider flex items-center gap-2">
                  <span className="text-xl animate-pulse">⚡👾</span>
                  <span className="font-cartoon uppercase text-[11px] sm:text-xs text-cyan-300">സൈബർ നിയോൺ കൊട്ടാരം</span>
                </div>
                <div className="flex gap-2 text-sm text-fuchsia-400">
                  <span className="animate-bounce">⚡</span>
                  <span className="text-cyan-400">🔮</span>
                  <span className="animate-bounce">⚡</span>
                </div>
              </div>

              {/* Glowing Neon Cyber Pillars */}
              <div className="absolute inset-y-0 left-2 w-7 bg-gradient-to-r from-cyan-950 via-cyan-800 to-indigo-950 border-r-2 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] hidden sm:block" />
              <div className="absolute inset-y-0 right-2 w-7 bg-gradient-to-r from-fuchsia-950 via-fuchsia-800 to-indigo-950 border-l-2 border-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.8)] hidden sm:block" />

              {/* Synthwave Digital Floor Grid */}
              <div className="absolute bottom-0 inset-x-8 sm:inset-x-24 h-24 bg-gradient-to-t from-fuchsia-950 to-transparent border-x-2 border-cyan-400/80 rounded-t-2xl flex items-center justify-center">
                <div className="text-center text-[10px] font-black tracking-widest text-cyan-300 uppercase">
                  CYBER RAJA PROTOCOL 2099 // ⚡
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. ALLEPPEY BACKWATERS (ആലപ്പുഴ കായലോരം) */}
      {activeTheme === 'backwaters' && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-emerald-200 to-teal-700 pointer-events-none">
          <div className="absolute top-2 inset-x-6 flex justify-between opacity-80 text-xl">
            <span className="animate-pulse">☀️</span>
            <span className="text-white/80">☁️</span>
            <span className="text-white/80">☁️</span>
          </div>

          <div className="absolute top-0 left-0 text-4xl sm:text-6xl opacity-90 filter drop-shadow">
            🌴🌴
          </div>
          <div className="absolute top-0 right-0 text-4xl sm:text-6xl opacity-90 filter drop-shadow">
            🌴🌴
          </div>

          <motion.div 
            animate={{ y: [0, -4, 0], x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-16 right-8 opacity-80 text-3xl sm:text-4xl filter drop-shadow-md"
          >
            ⛵
          </motion.div>

          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-teal-800 via-teal-700/80 to-transparent flex flex-col justify-end pb-2">
            <div className="text-center text-xs font-black text-teal-100/70 uppercase tracking-wider">
              ആലപ്പുഴ കായലോരം 🌊 കെട്ടുവള്ളങ്ങൾ
            </div>
          </div>
        </div>
      )}

      {/* 3. THRISSUR POORAM (തൃശ്ശൂർ പൂരപ്പറമ്പ്) */}
      {activeTheme === 'pooram' && (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-900 to-amber-950 pointer-events-none">
          <div className="absolute top-2 inset-x-4 flex justify-between text-xl opacity-90">
            <span>🚩</span>
            <span>🎊</span>
            <span>🎪</span>
            <span>🎊</span>
            <span>🚩</span>
          </div>

          <div className="absolute top-12 inset-x-6 flex justify-around text-2xl opacity-85">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              ⛱️
            </motion.span>
            <motion.span animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
              ✨
            </motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}>
              ⛱️
            </motion.span>
          </div>

          <div className="absolute bottom-2 inset-x-0 text-center text-xs font-black text-yellow-300/80 uppercase tracking-widest">
            തൃശ്ശൂർ പൂരപ്പറമ്പ് 🥁 ഇലഞ്ഞിത്തറ മേളം!
          </div>
        </div>
      )}

      {/* 4. MUNNAR TEA HILLS (മൂന്നാർ മലനിരകൾ) */}
      {activeTheme === 'munnar' && (
        <div className="absolute inset-0 bg-gradient-to-b from-teal-100 via-emerald-100 to-green-800 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-sky-200 to-teal-50" />
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], x: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute top-10 inset-x-0 h-20 bg-white/40 blur-xl"
          />
          <div className="absolute top-6 left-6 text-3xl opacity-80">⛰️</div>
          <div className="absolute top-8 right-8 text-3xl opacity-80">🍃</div>
          <div className="absolute bottom-2 inset-x-0 text-center text-xs font-black text-emerald-100 uppercase tracking-widest">
            മൂന്നാർ മലനിരകൾ ☕ തണുത്ത കാറ്റ്!
          </div>
        </div>
      )}

      {/* 5. WAYANAD RAINFOREST (വയനാടൻ കാട്) */}
      {activeTheme === 'wayanad' && (
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-green-900 to-emerald-950 pointer-events-none">
          <div className="absolute top-0 inset-x-0 flex justify-between text-4xl opacity-80 px-4">
            <span>🌿</span>
            <span>🎋</span>
            <span>🦜</span>
            <span>🎋</span>
            <span>🌿</span>
          </div>
          <div className="absolute top-16 left-10 text-2xl opacity-75">💦</div>
          <div className="absolute bottom-2 inset-x-0 text-center text-xs font-black text-emerald-300/80 uppercase tracking-widest">
            വയനാടൻ കാടും വെള്ളച്ചാട്ടവും 🎋
          </div>
        </div>
      )}

      {/* 6. VARKALA BEACH (വർക്കല ബീച്ച്) */}
      {activeTheme === 'varkala' && (
        <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-rose-300 to-cyan-800 pointer-events-none">
          {/* Sunset Horizon Sun */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div 
              animate={{ scale: [1, 1.08, 1] }} 
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-16 h-16 rounded-full bg-gradient-to-t from-yellow-300 to-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]"
            />
          </div>

          {/* Red Cliff Edges Silhouettes */}
          <div className="absolute top-8 left-0 text-4xl opacity-75">🧗</div>
          <div className="absolute top-12 right-4 text-4xl opacity-85">🌴</div>

          {/* Crashing Ocean Waves at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cyan-900 via-teal-800 to-transparent flex flex-col justify-end pb-2">
            <motion.div 
              animate={{ y: [0, -3, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-center text-white/80 text-sm"
            >
              🌊 🌊 🌊
            </motion.div>
            <div className="text-center text-xs font-black text-orange-200 uppercase tracking-widest mt-1">
              വർക്കല ക്ലിഫ് ബീച്ച് 🏖️ സന്ധ്യാ സൂര്യൻ!
            </div>
          </div>
        </div>
      )}

      {/* Actual Forefront Content (King, Pets, Coach, Interactive Elements) */}
      <div className="relative z-10 p-2 sm:p-4 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
