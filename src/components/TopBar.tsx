import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Home, 
  BookOpen, 
  Palette, 
  Sparkles, 
  Gift, 
  Shirt, 
  Trophy,
  Sliders
} from 'lucide-react';
import { GameMode, FitnessStage, BackgroundThemeId, GraphicsMode } from '../types';
import { sound } from '../utils/audio';

export const BACKGROUND_THEMES: { id: BackgroundThemeId; name: string; emoji: string }[] = [
  { id: 'palace', name: 'കൊട്ടാരം', emoji: '🛕' },
  { id: 'backwaters', name: 'കായൽ', emoji: '⛵' },
  { id: 'pooram', name: 'പൂരം', emoji: '🥁' },
  { id: 'munnar', name: 'മൂന്നാർ', emoji: '☕' },
  { id: 'wayanad', name: 'വയനാട്', emoji: '🎋' },
  { id: 'varkala', name: 'വർക്കല', emoji: '🏖️' }
];

interface TopBarProps {
  laddus: number;
  storageLimit: number;
  coins: number;
  score: number;
  currentLevel: number;
  stage: FitnessStage;
  soundEnabled: boolean;
  voiceEnabled?: boolean;
  activeMode: GameMode;
  backgroundTheme: BackgroundThemeId;
  unlockedBackgrounds?: BackgroundThemeId[];
  graphicsMode: GraphicsMode;
  onChangeBackgroundTheme: (theme: BackgroundThemeId) => void;
  onToggleGraphicsMode: () => void;
  onToggleSound: () => void;
  onToggleVoice?: () => void;
  onGoHome: () => void;
  onOpenLevels: () => void;
  onOpenTrials?: () => void;
  onOpenDictionary?: () => void;
  onOpenGoals?: () => void;
  onOpenPets?: () => void;
  onOpenWardrobe?: () => void;
  onOpenAudioSettings?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  laddus,
  storageLimit,
  coins,
  score,
  currentLevel,
  stage,
  soundEnabled,
  voiceEnabled = true,
  activeMode,
  backgroundTheme,
  graphicsMode,
  onChangeBackgroundTheme,
  onToggleGraphicsMode,
  onToggleSound,
  onToggleVoice,
  onGoHome,
  onOpenLevels,
  onOpenTrials,
  onOpenDictionary,
  onOpenGoals,
  onOpenPets,
  onOpenWardrobe,
  onOpenAudioSettings,
  unlockedBackgrounds = ['palace']
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const isFull = laddus >= storageLimit;
  const currentBg = BACKGROUND_THEMES.find(b => b.id === backgroundTheme) || BACKGROUND_THEMES[0];

  return (
    <header className="w-full h-13 sm:h-14 bg-amber-50/95 backdrop-blur-md border-b-2 border-amber-300 shadow-xs px-2 sm:px-4 flex items-center justify-between shrink-0 z-40 select-none">
      {/* Left: Home / Level / Stage */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {activeMode !== 'home' && (
          <button
            id="topbar-home-btn"
            onClick={onGoHome}
            className="p-1 sm:px-2.5 sm:py-1 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black rounded-xl shadow-xs border border-amber-300 cartoon-btn flex items-center gap-1 text-xs"
            title="കൊട്ടാരത്തിലേക്ക് മടങ്ങുക"
          >
            <Home className="w-3.5 h-3.5 text-amber-950" />
            <span className="hidden sm:inline">കൊട്ടാരം</span>
          </button>
        )}

        {/* Level badge (click opens Level Select) */}
        <button
          onClick={onOpenLevels}
          id="topbar-level-badge"
          className="flex items-center gap-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black px-2 sm:px-2.5 py-1 rounded-xl shadow-xs border border-yellow-200 cartoon-btn text-xs"
          title="ലെവലുകൾ മാറ്റുക"
        >
          <span className="font-extrabold">👑 Lvl {currentLevel}</span>
        </button>

        {/* Fitness Stage Tag */}
        <div 
          className="hidden md:flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-950 border border-amber-300 rounded-lg text-[11px] font-black"
          title={stage.vibe}
        >
          <span>{stage.emoji}</span>
          <span>{stage.name}</span>
        </div>
      </div>

      {/* Center: Laddus, Coins, Score */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-black">
        {/* Laddu Storage Counter */}
        <div 
          className={`flex items-center gap-1 px-2 py-0.5 rounded-xl border transition-all shadow-2xs ${
            isFull ? 'bg-red-100 border-red-500 text-red-700 animate-pulse' : 'bg-white border-amber-300 text-amber-950'
          }`}
          title={`ലഡു ശേഖരം: ${laddus} / ${storageLimit}`}
        >
          <span className="text-sm sm:text-base">🍬</span>
          <span className="font-extrabold text-[11px] sm:text-xs">
            {laddus}<span className="text-[10px] text-slate-400 font-normal">/{storageLimit}</span>
          </span>
        </div>

        {/* King Coins */}
        <div 
          className="flex items-center gap-1 px-2 py-0.5 bg-white border border-yellow-400 rounded-xl text-yellow-950 shadow-2xs"
          title="രാജ നാണയങ്ങൾ"
        >
          <span className="text-sm sm:text-base">🪙</span>
          <span className="font-extrabold text-[11px] sm:text-xs">{coins}</span>
        </div>

        {/* Score (visible on sm+) */}
        <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-white border border-indigo-300 rounded-xl text-indigo-950 shadow-2xs">
          <span className="text-xs">⭐</span>
          <span className="font-bold text-[11px] text-indigo-900">{score}</span>
        </div>
      </div>

      {/* Right: Theme Toggles, Audio Settings & Quick Modals */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* 1. Background Theme Selector Dropdown */}
        <div className="relative">
          <button
            id="topbar-theme-btn"
            onClick={() => {
              sound.playPop();
              setShowThemeMenu(!showThemeMenu);
            }}
            className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-amber-100 text-amber-950 rounded-xl border border-amber-300 text-[11px] font-bold shadow-2xs cartoon-btn"
            title="പശ്ചാത്തലം മാറ്റുക"
          >
            <span>{currentBg.emoji}</span>
            <span className="hidden lg:inline">{currentBg.name}</span>
          </button>

          {/* Theme Dropdown Popover */}
          {showThemeMenu && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-2xl border-2 border-amber-300 shadow-xl p-1 z-50 flex flex-col gap-0.5">
              {BACKGROUND_THEMES.map((theme) => {
                const isUnlocked = unlockedBackgrounds.includes(theme.id);
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      if (isUnlocked) {
                        sound.playPop();
                        onChangeBackgroundTheme(theme.id);
                        setShowThemeMenu(false);
                      } else {
                        sound.playSlideWhistle();
                        setShowThemeMenu(false);
                        if (onOpenWardrobe) onOpenWardrobe();
                      }
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all text-left ${
                      backgroundTheme === theme.id
                        ? 'bg-amber-500 text-white shadow-xs'
                        : isUnlocked
                          ? 'hover:bg-amber-50 text-amber-950'
                          : 'opacity-70 hover:bg-amber-50 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{theme.emoji}</span>
                      <span>{theme.name}</span>
                    </div>
                    {!isUnlocked && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded">🔒 ബസാർ</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Customization Bazaar Launcher Button */}
        {onOpenWardrobe && (
          <button
            id="topbar-wardrobe-btn"
            onClick={() => {
              sound.playPop();
              onOpenWardrobe();
            }}
            className="p-1 sm:px-2 sm:py-1 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white border border-amber-300 shadow-2xs cartoon-btn flex items-center gap-1 text-[10px] sm:text-[11px] font-black"
            title="രാജകീയ അലങ്കാര ബസാർ (വസ്ത്രങ്ങൾ, കൊട്ടാരം, പശ്ചാത്തലം)"
          >
            <span>🎨</span>
            <span className="hidden sm:inline">അലങ്കാരം</span>
          </button>
        )}

        {/* 2. Graphics Mode Switcher (✨ HD / 👾 Pixel) */}
        <button
          id="topbar-graphics-btn"
          onClick={() => {
            sound.playPop();
            onToggleGraphicsMode();
          }}
          className={`px-2 py-1 rounded-xl text-[10px] sm:text-[11px] font-black border transition-all cartoon-btn flex items-center gap-1 ${
            graphicsMode === 'hd'
              ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 border-amber-300'
              : 'bg-indigo-600 text-white border-indigo-700'
          }`}
          title={graphicsMode === 'hd' ? '8-ബിറ്റ് പിക്സൽ മോഡിലേക്ക് മാറ്റൂ' : 'അൾട്രാ HD മോഡിലേക്ക് മാറ്റൂ'}
        >
          <span>{graphicsMode === 'hd' ? '✨ HD' : '👾 8-Bit'}</span>
        </button>

        {/* 3. Audio: Malayalam Voice Toggle */}
        {onToggleVoice && (
          <button
            id="topbar-voice-btn"
            onClick={onToggleVoice}
            className={`p-1.5 rounded-xl border transition-all cartoon-btn ${
              voiceEnabled 
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-2xs' 
                : 'bg-slate-100 text-slate-400 border-slate-300'
            }`}
            title={voiceEnabled ? 'മലയാള ശബ്ദം ഓഫ് ചെയ്യുക' : 'മലയാള ശബ്ദം ഓൺ ചെയ്യുക'}
          >
            {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* 4. Audio: SFX Sound Toggle */}
        <button
          id="topbar-sound-btn"
          onClick={onToggleSound}
          className={`p-1.5 rounded-xl border transition-all cartoon-btn ${
            soundEnabled 
              ? 'bg-amber-200 text-amber-950 border-amber-400 shadow-2xs' 
              : 'bg-slate-100 text-slate-400 border-slate-300'
          }`}
          title={soundEnabled ? 'ശബ്ദം ഓഫ് ചെയ്യുക' : 'ശബ്ദം ഓൺ ചെയ്യുക'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* 4.5 Advanced Audio Settings Launcher */}
        {onOpenAudioSettings && (
          <button
            id="topbar-audio-settings-btn"
            onClick={() => {
              sound.playPop();
              onOpenAudioSettings();
            }}
            className="p-1.5 rounded-xl bg-gradient-to-r from-amber-400/90 to-orange-400/90 hover:from-amber-500 hover:to-orange-500 text-amber-950 border border-amber-400/80 shadow-2xs cartoon-btn flex items-center justify-center"
            title="ഓഡിയോ ക്രമീകരണം (Advanced Audio Settings & Voice Studio)"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        )}

        {/* 5. Quick Daily Goals Modal Trigger */}
        {onOpenGoals && (
          <button
            id="topbar-goals-btn"
            onClick={onOpenGoals}
            className="p-1.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-950 hover:from-yellow-500 hover:to-amber-600 border border-amber-300 shadow-2xs cartoon-btn"
            title="ദിവസേനയുള്ള ലക്ഷ്യങ്ങളും സമ്മാനങ്ങളും"
          >
            <Gift className="w-3.5 h-3.5" />
          </button>
        )}

        {/* 6. Quick Palace Pets Modal Trigger */}
        {onOpenPets && (
          <button
            id="topbar-pets-btn"
            onClick={onOpenPets}
            className="p-1.5 rounded-xl bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 shadow-2xs cartoon-btn"
            title="കൊട്ടാരത്തിലെ വളർത്തുമൃഗങ്ങൾ"
          >
            <span className="text-xs">🐾</span>
          </button>
        )}
      </div>
    </header>
  );
};
