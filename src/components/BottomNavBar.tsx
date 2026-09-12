import React from 'react';
import { 
  Play, 
  Target, 
  Dumbbell, 
  BookOpen, 
  Shirt, 
  Trophy, 
  Gift, 
  Film,
  Sliders
} from 'lucide-react';
import { sound } from '../utils/audio';

interface BottomNavBarProps {
  onPlay: () => void;
  onKuriAdi: () => void;
  onWorkout: () => void;
  onLadduFactory: () => void;
  onDictionary: () => void;
  onOpenCostumes: () => void;
  onOpenPets: () => void;
  onOpenGoals: () => void;
  onOpenCutscene: () => void;
  onOpenAudioSettings?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  onPlay,
  onKuriAdi,
  onWorkout,
  onLadduFactory,
  onDictionary,
  onOpenCostumes,
  onOpenPets,
  onOpenGoals,
  onOpenCutscene,
  onOpenAudioSettings
}) => {
  return (
    <nav className="w-full h-15 sm:h-16 bg-white/95 backdrop-blur-md border-t-2 border-amber-400 shadow-xl px-2 sm:px-4 flex items-center justify-between shrink-0 z-30 select-none">
      {/* 5 Primary Action Buttons */}
      <div className="flex-1 max-w-2xl mx-auto grid grid-cols-5 gap-1 sm:gap-2">
        {/* 1. PLAY (കളിക്കാം) */}
        <button
          id="btn-nav-play"
          onClick={() => {
            sound.playVictoryFanfare();
            onPlay();
          }}
          className="py-1.5 sm:py-2 px-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white rounded-xl sm:rounded-2xl font-black shadow-md cartoon-btn border-b-2 border-emerald-800 flex flex-col items-center justify-center gap-0.5 transition-all group"
          title="ഓട്ടക്കളി കളിക്കാം (Run Adventure)"
        >
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white group-hover:scale-110 transition-transform" />
          <span className="text-[10px] sm:text-xs tracking-tight truncate leading-none">
            🏃 കളിക്കാം
          </span>
        </button>

        {/* 2. TARGET / SLINGSHOT (കുറിയടി) */}
        <button
          id="btn-nav-kuriadi"
          onClick={() => {
            sound.playPop();
            onKuriAdi();
          }}
          className="py-1.5 sm:py-2 px-1 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 active:scale-95 text-white rounded-xl sm:rounded-2xl font-black shadow-md cartoon-btn border-b-2 border-red-800 flex flex-col items-center justify-center gap-0.5 transition-all group"
          title="കുറിയടി ഗോലി കളി (Slingshot)"
        >
          <Target className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] sm:text-xs tracking-tight truncate leading-none">
            🎯 കുറിയടി
          </span>
        </button>

        {/* 3. WORKOUT (വ്യായാമം) */}
        <button
          id="btn-nav-workout"
          onClick={() => {
            sound.playPop();
            onWorkout();
          }}
          className="py-1.5 sm:py-2 px-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-95 text-white rounded-xl sm:rounded-2xl font-black shadow-md cartoon-btn border-b-2 border-sky-800 flex flex-col items-center justify-center gap-0.5 transition-all group"
          title="രാജാവിന്റെ വ്യായാമം (Workout)"
        >
          <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] sm:text-xs tracking-tight truncate leading-none">
            💪 വ്യായാമം
          </span>
        </button>

        {/* 4. LADDU FACTORY (ലഡു ഫാക്ടറി) */}
        <button
          id="btn-nav-factory"
          onClick={() => {
            sound.playPop();
            onLadduFactory();
          }}
          className="py-1.5 sm:py-2 px-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white rounded-xl sm:rounded-2xl font-black shadow-md cartoon-btn border-b-2 border-amber-800 flex flex-col items-center justify-center gap-0.5 transition-all group"
          title="ലഡു ഉണ്ടാക്കൂ (Laddu Factory)"
        >
          <span className="text-sm sm:text-base group-hover:scale-110 transition-transform">🍬</span>
          <span className="text-[10px] sm:text-xs tracking-tight truncate leading-none">
            ലഡു ഫാക്ടറി
          </span>
        </button>

        {/* 5. MALAYALAM VOICE DICTIONARY (ശബ്ദ നിഘണ്ടു) */}
        <button
          id="btn-nav-dictionary"
          onClick={() => {
            sound.playPop();
            onDictionary();
          }}
          className="py-1.5 sm:py-2 px-1 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 active:scale-95 text-white rounded-xl sm:rounded-2xl font-black shadow-md cartoon-btn border-b-2 border-purple-900 flex flex-col items-center justify-center gap-0.5 transition-all group relative overflow-hidden"
          title="മലയാള ശബ്ദ നിഘണ്ടുവും അക്ഷരമാലയും"
        >
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] sm:text-xs tracking-tight truncate leading-none text-yellow-100">
            📖 നിഘണ്ടു
          </span>
        </button>
      </div>

      {/* Auxiliary quick modal launcher buttons (Costumes, Pets, Goals, Story) on right */}
      <div className="hidden md:flex items-center gap-1.5 shrink-0 pl-2 border-l border-amber-200">
        <button
          onClick={() => {
            sound.playPop();
            onOpenCostumes();
          }}
          className="p-1.5 rounded-xl bg-gradient-to-r from-purple-100 to-amber-100 hover:from-purple-200 hover:to-amber-200 text-purple-950 border border-purple-300 cartoon-btn flex items-center gap-1 text-[11px] font-black shadow-xs"
          title="രാജകീയ അലങ്കാര ബസാർ (വസ്ത്രങ്ങൾ, കൊട്ടാരം, അണ്ണാൻ, പശ്ചാത്തലം)"
        >
          <span>🎨</span>
          <span>അലങ്കാരം</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onOpenPets();
          }}
          className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 cartoon-btn flex items-center gap-1 text-[11px] font-bold"
          title="കൊട്ടാരത്തിലെ വളർത്തുമൃഗങ്ങൾ"
        >
          <span>🐾</span>
          <span>മൃഗങ്ങൾ</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onOpenGoals();
          }}
          className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 cartoon-btn flex items-center gap-1 text-[11px] font-bold"
          title="ദിവസേനയുള്ള ലക്ഷ്യങ്ങൾ"
        >
          <Gift className="w-3.5 h-3.5 text-rose-600" />
          <span>ലക്ഷ്യങ്ങൾ</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onOpenCutscene();
          }}
          className="p-1.5 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-950 border border-yellow-200 cartoon-btn flex items-center gap-1 text-[11px] font-bold"
          title="കഥ കാണൂ"
        >
          <Film className="w-3.5 h-3.5 text-yellow-600" />
          <span>കഥ 🎬</span>
        </button>

        {onOpenAudioSettings && (
          <button
            id="bottombar-audio-settings-btn"
            onClick={() => {
              sound.playPop();
              onOpenAudioSettings();
            }}
            className="p-1.5 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-950 border border-amber-300 cartoon-btn flex items-center gap-1 text-[11px] font-bold"
            title="ഓഡിയോ ക്രമീകരണം"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-700" />
            <span>ഓഡിയോ</span>
          </button>
        )}
      </div>
    </nav>
  );
};
