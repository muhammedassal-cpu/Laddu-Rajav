import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Volume1, 
  Music, 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  MessageSquare,
  ChevronRight,
  Check
} from 'lucide-react';
import { sound } from '../utils/audio';

interface AudioSettingsModalProps {
  soundEnabled: boolean;
  voiceEnabled: boolean;
  musicEnabled: boolean;
  musicVolume: number;
  voiceVolume: number;
  sfxVolume: number;
  onToggleSound: () => void;
  onToggleVoice: () => void;
  onToggleMusic: () => void;
  onChangeMusicVolume: (vol: number) => void;
  onChangeVoiceVolume: (vol: number) => void;
  onChangeSfxVolume: (vol: number) => void;
  onClose: () => void;
}

type CharacterVoiceOption = 'king' | 'mirchi' | 'squirrel' | 'elephant' | 'custom';

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  soundEnabled,
  voiceEnabled,
  musicEnabled,
  musicVolume,
  voiceVolume,
  sfxVolume,
  onToggleSound,
  onToggleVoice,
  onToggleMusic,
  onChangeMusicVolume,
  onChangeVoiceVolume,
  onChangeSfxVolume,
  onClose
}) => {
  // TTS Testing state
  const [typedText, setTypedText] = useState<string>('നമസ്കാരം രാജാവേ! അടിപൊളി കളിയാണിത്!');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterVoiceOption>('king');
  const [customPitch, setCustomPitch] = useState<number>(1.0);
  const [customRate, setCustomRate] = useState<number>(0.95);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMusicTesting, setIsMusicTesting] = useState<boolean>(sound.isMusicPlaying());

  // Check speech state periodically for animated feedback
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpeaking(sound.isSpeaking());
      setIsMusicTesting(sound.isMusicPlaying());
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const samplePhrases = [
    { label: '👑 രാജാവ്', text: 'അടിപൊളി! എനിക്ക് ഇനി കൂടുതൽ ലഡു വേണം!' },
    { label: '🌶️ മിർച്ചി', text: 'സ്പീഡിൽ ഓടൂ രാജാവേ! വയറ് കുറയ്ക്കണ്ടേ?' },
    { label: '🐿️ ചിപ്പൻ', text: 'അണ്ണാൻ ചിപ്പൻ റെഡിയാണ്! വാ നമുക്ക് കളിക്കാം!' },
    { label: '🍬 ലഡു', text: 'മധുരമുള്ള നെയ്യ് ലഡു തിന്നൂ, കരുത്ത് നേടൂ!' },
    { label: '🌴 കേരളം', text: 'സുഖമാണോ മക്കളേ? രാജാവിന്റെ കൊട്ടാരത്തിലേക്ക് സ്വാഗതം!' },
  ];

  const handleSpeakTypedText = () => {
    if (!typedText.trim()) return;
    sound.playPop();
    setIsSpeaking(true);
    sound.testSpeak(typedText, selectedCharacter, customPitch, customRate);
  };

  const handleStopSpeech = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
  };

  const handleToggleMusicTest = () => {
    sound.playPop();
    if (sound.isMusicPlaying()) {
      sound.stopMusic();
      setIsMusicTesting(false);
    } else {
      sound.startMusic();
      setIsMusicTesting(true);
    }
  };

  const handleResetDefaults = () => {
    sound.playPop();
    onChangeMusicVolume(0.6);
    onChangeVoiceVolume(1.0);
    onChangeSfxVolume(0.8);
    setCustomPitch(1.0);
    setCustomRate(0.95);
  };

  return (
    <div 
      id="audio-settings-modal-backdrop"
      className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-3 select-none"
    >
      <motion.div 
        id="audio-settings-modal-card"
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 15 }}
        className="bg-white border-4 border-amber-400 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-3 sm:p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shadow-inner border border-white/30">
              <Sliders className="w-5 h-5 text-yellow-200" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg flex items-center gap-1.5 drop-shadow-xs">
                <span>ഓഡിയോ ക്രമീകരണം</span>
                <span className="text-xs bg-yellow-300 text-amber-950 font-black px-2 py-0.5 rounded-full">
                  Audio Studio
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-amber-100 font-medium">
                സംഗീതം, ശബ്ദങ്ങൾ, കഥാപാത്ര സംഭാഷണങ്ങൾ ക്രമീകരിക്കൂ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="audio-reset-defaults-btn"
              onClick={handleResetDefaults}
              className="px-2.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-[11px] font-bold text-white flex items-center gap-1 transition-colors border border-white/30"
              title="ഡിഫോൾട്ട് വോളിയം റീസെറ്റ് ചെയ്യുക"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">റീസെറ്റ്</span>
            </button>
            <button 
              id="audio-modal-close-btn"
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="p-1.5 hover:bg-white/25 rounded-full transition-colors cursor-pointer text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 space-y-4 sm:space-y-5 bg-gradient-to-b from-amber-50/50 to-orange-50/30">
          
          {/* SECTION 1: INDEPENDENT VOLUME CONTROLS */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-amber-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-amber-100 pb-2">
              <h3 className="font-extrabold text-xs sm:text-sm text-amber-950 flex items-center gap-1.5">
                <span className="text-amber-500">🎚️</span>
                <span>സ്വതന്ത്ര വോളിയം മിക്സർ (Volume Channels)</span>
              </h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">
                ഓരോന്നിന്റെയും ശബ്ദം ഇഷ്ടാനുസരണം മാറ്റൂ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Channel 1: Background Music */}
              <div className={`p-3 rounded-xl border-2 transition-all ${musicEnabled ? 'bg-amber-50/80 border-amber-300' : 'bg-slate-50 border-slate-200 opacity-80'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs">
                      <Music className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[12px] text-amber-950 leading-tight">സംഗീതം</h4>
                      <span className="text-[10px] text-slate-500 font-medium">BGM Music</span>
                    </div>
                  </div>

                  <button
                    id="audio-music-toggle-btn"
                    onClick={() => {
                      sound.playPop();
                      onToggleMusic();
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black border transition-colors ${
                      musicEnabled 
                        ? 'bg-emerald-500 text-white border-emerald-600' 
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {musicEnabled ? 'ഓൺ' : 'ഓഫ്'}
                  </button>
                </div>

                {/* Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-amber-900">
                    <span>വോളിയം</span>
                    <span>{Math.round(musicVolume * 100)}%</span>
                  </div>
                  <input
                    id="audio-music-volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={musicVolume}
                    disabled={!musicEnabled}
                    onChange={(e) => onChangeMusicVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600 disabled:opacity-40"
                  />
                </div>

                {/* Quick Music Sample Button */}
                <button
                  id="audio-music-test-btn"
                  onClick={handleToggleMusicTest}
                  disabled={!musicEnabled || !soundEnabled}
                  className={`mt-2.5 w-full py-1 px-2 rounded-lg text-[10px] font-black flex items-center justify-center gap-1 transition-all ${
                    isMusicTesting
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-amber-200 hover:bg-amber-300 text-amber-900 disabled:opacity-50'
                  }`}
                >
                  {isMusicTesting ? (
                    <>
                      <Square className="w-3 h-3 fill-current" />
                      <span>സംഗീതം നിർത്തൂ</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>പ്ലേ ചെയ്തു കേൾക്കൂ</span>
                    </>
                  )}
                </button>
              </div>

              {/* Channel 2: Character Voices */}
              <div className={`p-3 rounded-xl border-2 transition-all ${voiceEnabled ? 'bg-orange-50/80 border-orange-300' : 'bg-slate-50 border-slate-200 opacity-80'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs">
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[12px] text-amber-950 leading-tight">സംഭാഷണം</h4>
                      <span className="text-[10px] text-slate-500 font-medium">Voices (TTS)</span>
                    </div>
                  </div>

                  <button
                    id="audio-voice-toggle-btn"
                    onClick={() => {
                      sound.playPop();
                      onToggleVoice();
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black border transition-colors ${
                      voiceEnabled 
                        ? 'bg-emerald-500 text-white border-emerald-600' 
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {voiceEnabled ? 'ഓൺ' : 'ഓഫ്'}
                  </button>
                </div>

                {/* Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-orange-950">
                    <span>വോളിയം</span>
                    <span>{Math.round(voiceVolume * 100)}%</span>
                  </div>
                  <input
                    id="audio-voice-volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={voiceVolume}
                    disabled={!voiceEnabled}
                    onChange={(e) => onChangeVoiceVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600 disabled:opacity-40"
                  />
                </div>

                {/* Quick Voice Sample Button */}
                <button
                  id="audio-voice-test-btn"
                  onClick={() => {
                    sound.playPop();
                    sound.speakKing('അടിപൊളി ശബ്ദം! ഇതാണ് രാജാവിന്റെ ഗാംഭീര്യം!');
                  }}
                  disabled={!voiceEnabled || !soundEnabled}
                  className="mt-2.5 w-full py-1 px-2 rounded-lg text-[10px] font-black bg-orange-200 hover:bg-orange-300 text-orange-950 disabled:opacity-50 flex items-center justify-center gap-1 transition-colors"
                >
                  <Volume1 className="w-3 h-3" />
                  <span>ടെസ്റ്റ് സാമ്പിൾ 🔊</span>
                </button>
              </div>

              {/* Channel 3: Sound Effects (SFX) */}
              <div className={`p-3 rounded-xl border-2 transition-all ${soundEnabled ? 'bg-yellow-50/80 border-yellow-300' : 'bg-slate-50 border-slate-200 opacity-80'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-yellow-500 text-amber-950 flex items-center justify-center text-xs font-black">
                      <Volume2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[12px] text-amber-950 leading-tight">ശബ്ദങ്ങൾ</h4>
                      <span className="text-[10px] text-slate-500 font-medium">Game SFX</span>
                    </div>
                  </div>

                  <button
                    id="audio-sfx-toggle-btn"
                    onClick={() => {
                      onToggleSound();
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black border transition-colors ${
                      soundEnabled 
                        ? 'bg-emerald-500 text-white border-emerald-600' 
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {soundEnabled ? 'ഓൺ' : 'ഓഫ്'}
                  </button>
                </div>

                {/* Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-yellow-950">
                    <span>വോളിയം</span>
                    <span>{Math.round(sfxVolume * 100)}%</span>
                  </div>
                  <input
                    id="audio-sfx-volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={sfxVolume}
                    disabled={!soundEnabled}
                    onChange={(e) => onChangeSfxVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-600 disabled:opacity-40"
                  />
                </div>

                {/* Quick SFX Chips */}
                <div className="mt-2.5 flex items-center justify-between gap-1">
                  <button
                    onClick={() => sound.playPop()}
                    disabled={!soundEnabled}
                    className="flex-1 py-1 bg-yellow-200/90 hover:bg-yellow-300 rounded text-[9px] font-extrabold text-amber-950 transition-colors disabled:opacity-50"
                    title="ലഡു പോപ്പ് ശബ്ദം"
                  >
                    🍬 Pop
                  </button>
                  <button
                    onClick={() => sound.playDing()}
                    disabled={!soundEnabled}
                    className="flex-1 py-1 bg-yellow-200/90 hover:bg-yellow-300 rounded text-[9px] font-extrabold text-amber-950 transition-colors disabled:opacity-50"
                    title="ഡിംഗ് ശബ്ദം"
                  >
                    🔔 Ding
                  </button>
                  <button
                    onClick={() => sound.playAyyoVocal()}
                    disabled={!soundEnabled}
                    className="flex-1 py-1 bg-yellow-200/90 hover:bg-yellow-300 rounded text-[9px] font-extrabold text-amber-950 transition-colors disabled:opacity-50"
                    title="അയ്യോ ശബ്ദം"
                  >
                    💥 അയ്യോ
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: INTERACTIVE TTS PRONUNCIATION & VOICE TESTING WINDOW */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-orange-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-orange-100 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">🎙️</span>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                    ശബ്ദ പരീക്ഷണ ശാല (Type & Listen Voice Studio)
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium">
                    ഇഷ്ടമുള്ള വാക്കുകളോ വാക്യങ്ങളോ ടൈപ്പ് ചെയ്തു ശബ്ദം കേൾക്കൂ!
                  </p>
                </div>
              </div>

              {/* Animated Voice Indicator */}
              {isSpeaking && (
                <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  സംസാരിക്കുന്നു...
                </span>
              )}
            </div>

            {/* Character Archetype Picker */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                <span>കഥാപാത്ര ശബ്ദം തിരഞ്ഞെടുക്കൂ (Choose Speaker):</span>
                <span className="text-[10px] text-amber-600 font-extrabold">
                  {selectedCharacter === 'king' && '👑 രാജാവ് (Royal Bass)'}
                  {selectedCharacter === 'mirchi' && '🌶️ കോച്ച് മിർച്ചി (Spicy Fast)'}
                  {selectedCharacter === 'squirrel' && '🐿️ ചിപ്പൻ അണ്ണാൻ (Cute Squeak)'}
                  {selectedCharacter === 'elephant' && '🐘 ഗജവീരൻ (Royal Pet)'}
                  {selectedCharacter === 'custom' && '⚙️ കസ്റ്റം പിച്ച്/വേഗത'}
                </span>
              </label>

              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: 'king', label: 'രാജാവ്', icon: '👑' },
                  { id: 'mirchi', label: 'മിർച്ചി', icon: '🌶️' },
                  { id: 'squirrel', label: 'ചിപ്പൻ', icon: '🐿️' },
                  { id: 'elephant', label: 'ആന', icon: '🐘' },
                  { id: 'custom', label: 'കസ്റ്റം', icon: '🎙️' },
                ].map((char) => {
                  const isSelected = selectedCharacter === char.id;
                  return (
                    <button
                      key={char.id}
                      id={`audio-char-select-${char.id}`}
                      onClick={() => {
                        sound.playPop();
                        setSelectedCharacter(char.id as CharacterVoiceOption);
                      }}
                      className={`p-1.5 sm:p-2 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-center gap-0.5 ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 shadow-2xs text-amber-950 scale-102'
                          : 'bg-slate-50 hover:bg-amber-50/50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="text-base sm:text-lg">{char.icon}</span>
                      <span className="text-[10px] sm:text-[11px] font-black truncate w-full">
                        {char.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Text Input Window */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="tts-input-textarea"
                  className="text-[11px] font-bold text-slate-700 flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3 text-orange-500" />
                  <span>വാക്കുകൾ ടൈപ്പ് ചെയ്യുക (Type text in Malayalam or Manglish):</span>
                </label>
                {typedText && (
                  <button
                    onClick={() => setTypedText('')}
                    className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    മായ്ക്കുക (Clear)
                  </button>
                )}
              </div>

              <div className="relative">
                <textarea
                  id="tts-input-textarea"
                  rows={2}
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  placeholder="ഉദാഹരണത്തിന്: അടിപൊളി രാജാവേ! ലഡു തരുമോ? (Or type: Adipoli Rajave)"
                  className="w-full p-2.5 sm:p-3 text-xs sm:text-sm font-medium border-2 border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl outline-none resize-none bg-orange-50/20 text-slate-800 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Quick Preset Sample Chips */}
              <div className="flex flex-wrap items-center gap-1 pt-1">
                <span className="text-[10px] font-bold text-slate-500">ഉദാഹരണങ്ങൾ:</span>
                {samplePhrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playPop();
                      setTypedText(phrase.text);
                    }}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-orange-100/70 hover:bg-orange-200 text-orange-900 border border-orange-200 transition-colors cursor-pointer"
                  >
                    {phrase.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Pitch & Rate sliders (Visible especially when 'custom' selected or fine-tuning) */}
            {selectedCharacter === 'custom' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2.5 bg-amber-50/70 rounded-xl border border-amber-200"
              >
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-amber-950">
                    <span>ശബ്ദ സ്ഥായി (Pitch)</span>
                    <span>{customPitch.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.8"
                    step="0.05"
                    value={customPitch}
                    onChange={(e) => setCustomPitch(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-[8px] text-slate-500">
                    <span>ഗാംഭീര്യം (Low)</span>
                    <span>സാധാരണ</span>
                    <span>കൂർത്ത ശബ്ദം (High)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-amber-950">
                    <span>വേഗത (Speed / Rate)</span>
                    <span>{customRate.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={customRate}
                    onChange={(e) => setCustomRate(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-[8px] text-slate-500">
                    <span>പതുക്കെ (Slow)</span>
                    <span>സാധാരണ</span>
                    <span>വേഗത്തിൽ (Fast)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons: Speak & Stop */}
            <div className="flex items-center gap-2 pt-1">
              <button
                id="audio-tts-speak-btn"
                onClick={handleSpeakTypedText}
                disabled={!typedText.trim() || !voiceEnabled || !soundEnabled}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer border border-amber-300 active:scale-98"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 ശബ്ദം കേൾക്കൂ (Speak Now)</span>
              </button>

              {isSpeaking && (
                <button
                  id="audio-tts-stop-btn"
                  onClick={handleStopSpeech}
                  className="py-2.5 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-rose-400 active:scale-98"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>നിർത്തൂ</span>
                </button>
              )}
            </div>

            {(!voiceEnabled || !soundEnabled) && (
              <p className="text-[10px] font-bold text-rose-500 text-center bg-rose-50 p-1.5 rounded-lg border border-rose-200">
                ⚠️ ശബ്ദം കേൾക്കാൻ മുകളിലെ &quot;സംഭാഷണം&quot; (Voice) ഓൺ ചെയ്യുക.
              </p>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-white border-t border-amber-200 flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-500">
            ക്രമീകരണങ്ങൾ തത്സമയം സേവ് ആകുന്നു ✨
          </div>

          <button
            id="audio-settings-done-btn"
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1 border border-amber-300"
          >
            <Check className="w-3.5 h-3.5" />
            <span>ശരി (Done)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
