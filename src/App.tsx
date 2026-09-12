/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Volume2 } from 'lucide-react';

import { 
  GameMode, 
  GameState, 
  GameLevel, 
  Costume, 
  DailyChallenge,
  BackgroundThemeId,
  GraphicsMode,
  PetId,
  SquirrelCostumeId,
  PalaceStyleId,
  CustomizableItem
} from './types';
import { 
  FITNESS_STAGES, 
  INITIAL_LEVELS, 
  INITIAL_COSTUMES, 
  INITIAL_DAILY_CHALLENGES 
} from './data/gameData';
import { 
  KING_DRESS_ITEMS,
  SQUIRREL_ITEMS,
  PALACE_ITEMS,
  BACKGROUND_ITEMS
} from './data/customizationData';
import { sound } from './utils/audio';
import { 
  KING_QUOTES, 
  COACH_MIRCHI_QUOTES, 
  SQUIRREL_QUOTES,
  ELEPHANT_QUOTES,
  GOAT_QUOTES,
  PARROT_QUOTES,
  CAT_QUOTES,
  VoiceQuote 
} from './utils/quotes';

import { TopBar } from './components/TopBar';
import { BottomNavBar } from './components/BottomNavBar';
import { KingAvatar, KingMood } from './components/KingAvatar';
import { CoachMirchi } from './components/CoachMirchi';
import { SquirrelCompanion } from './components/SquirrelCompanion';
import { PALACE_PETS_LIST } from './components/PalacePets';
import { PalaceBackground } from './components/PalaceBackground';
import { RunningGame } from './components/RunningGame';
import { KuriAdiGame } from './components/KuriAdiGame';
import { WorkoutGame } from './components/WorkoutGame';
import { LadduFactory } from './components/LadduFactory';
import { ChampionshipGame } from './components/ChampionshipGame';
import { RoyalCustomizationModal } from './components/RoyalCustomizationModal';
import { WardrobeModal } from './components/WardrobeModal';
import { DailyTrialsModal } from './components/DailyTrialsModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { CutsceneModal } from './components/CutsceneModal';
import { MalayalamDictionaryModal } from './components/MalayalamDictionaryModal';
import { DailyGoalsModal } from './components/DailyGoalsModal';
import { PetsModal } from './components/PetsModal';
import { AudioSettingsModal } from './components/AudioSettingsModal';

const STORAGE_KEY = 'the_big_belly_king_save_v1';

export default function App() {
  // Saved Game State
  const [laddus, setLaddus] = useState<number>(17);
  const [coins, setCoins] = useState<number>(350);
  const [score, setScore] = useState<number>(1240);
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [activeCostumeId, setActiveCostumeId] = useState<string>('kerala_mallu');
  const [unlockedCostumes, setUnlockedCostumes] = useState<string[]>(['kerala_mallu', 'default']);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [musicVolume, setMusicVolume] = useState<number>(0.6);
  const [voiceVolume, setVoiceVolume] = useState<number>(1.0);
  const [sfxVolume, setSfxVolume] = useState<number>(0.8);
  const [showAudioSettings, setShowAudioSettings] = useState<boolean>(false);
  const [ladduPowerActive, setLadduPowerActive] = useState<boolean>(false);

  // Background Theme, Graphics Mode, and Palace Pets Customization
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundThemeId>('palace');
  const [unlockedBackgrounds, setUnlockedBackgrounds] = useState<BackgroundThemeId[]>(['palace', 'backwaters']);
  const [graphicsMode, setGraphicsMode] = useState<GraphicsMode>('hd');
  const [activePetId, setActivePetId] = useState<PetId>('elephant');

  // Squirrel & Palace Customization
  const [activeSquirrelCostumeId, setActiveSquirrelCostumeId] = useState<SquirrelCostumeId>('sq_default');
  const [unlockedSquirrelCostumes, setUnlockedSquirrelCostumes] = useState<string[]>(['sq_default']);
  const [activePalaceStyleId, setActivePalaceStyleId] = useState<PalaceStyleId>('palace_travancore');
  const [unlockedPalaceStyles, setUnlockedPalaceStyles] = useState<string[]>(['palace_travancore']);

  // Daily Trials
  const [dailyTrials, setDailyTrials] = useState({
    trial1_running: false,
    trial2_kuriAdi: false,
    trial3_workout: false,
    bonusClaimed: false
  });

  // Daily Challenge
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>(INITIAL_DAILY_CHALLENGES);
  const [levels, setLevels] = useState<GameLevel[]>(INITIAL_LEVELS);
  const [costumes, setCostumes] = useState<Costume[]>(INITIAL_COSTUMES);

  // Active View / Mini-Game
  const [activeMode, setActiveMode] = useState<GameMode>('home');

  // Modals
  const [showWardrobe, setShowWardrobe] = useState<boolean>(false);
  const [showTrials, setShowTrials] = useState<boolean>(false);
  const [showLevels, setShowLevels] = useState<boolean>(false);
  const [showCutscene, setShowCutscene] = useState<boolean>(false);
  const [showDictionary, setShowDictionary] = useState<boolean>(false);
  const [showGoals, setShowGoals] = useState<boolean>(false);
  const [showPets, setShowPets] = useState<boolean>(false);

  // Courtyard Interactive Characters Dialogue
  const [kingCourtyardQuote, setKingCourtyardQuote] = useState<VoiceQuote>(
    KING_QUOTES.idle[0]
  );
  const [kingMood, setKingMood] = useState<KingMood>('idle');
  const [coachQuote, setCoachQuote] = useState<VoiceQuote>(
    COACH_MIRCHI_QUOTES.greetings[0]
  );

  // Active Dialogue for Bottom Non-Blocking Dialog Strip
  const [activeSpeaker, setActiveSpeaker] = useState<'king' | 'mirchi' | 'squirrel' | 'pet'>('king');
  const [activeDialogue, setActiveDialogue] = useState<VoiceQuote>(KING_QUOTES.idle[0]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (typeof data.laddus === 'number') setLaddus(data.laddus);
        if (typeof data.coins === 'number') setCoins(data.coins);
        if (typeof data.score === 'number') setScore(data.score);
        if (typeof data.currentLevelId === 'number') setCurrentLevelId(data.currentLevelId);
        if (data.activeCostumeId) {
          setActiveCostumeId(data.activeCostumeId);
        } else {
          setActiveCostumeId('kerala_mallu');
        }
        if (Array.isArray(data.unlockedCostumes)) {
          const list = data.unlockedCostumes.includes('kerala_mallu')
            ? data.unlockedCostumes
            : ['kerala_mallu', ...data.unlockedCostumes];
          setUnlockedCostumes(list);
        }
        if (typeof data.soundEnabled === 'boolean') {
          setSoundEnabled(data.soundEnabled);
          sound.setEnabled(data.soundEnabled);
        }
        if (typeof data.voiceEnabled === 'boolean') {
          setVoiceEnabled(data.voiceEnabled);
          sound.setVoiceEnabled(data.voiceEnabled);
        }
        if (typeof data.musicEnabled === 'boolean') {
          setMusicEnabled(data.musicEnabled);
          sound.setMusicEnabled(data.musicEnabled);
        }
        if (typeof data.musicVolume === 'number') {
          setMusicVolume(data.musicVolume);
          sound.setMusicVolume(data.musicVolume);
        }
        if (typeof data.voiceVolume === 'number') {
          setVoiceVolume(data.voiceVolume);
          sound.setVoiceVolume(data.voiceVolume);
        }
        if (typeof data.sfxVolume === 'number') {
          setSfxVolume(data.sfxVolume);
          sound.setSfxVolume(data.sfxVolume);
        }
        if (data.dailyTrials) setDailyTrials(data.dailyTrials);
        if (data.backgroundTheme) setBackgroundTheme(data.backgroundTheme);
        if (Array.isArray(data.unlockedBackgrounds)) setUnlockedBackgrounds(data.unlockedBackgrounds);
        if (data.graphicsMode) setGraphicsMode(data.graphicsMode);
        if (data.activePetId) setActivePetId(data.activePetId);
        if (data.activeSquirrelCostumeId) setActiveSquirrelCostumeId(data.activeSquirrelCostumeId);
        if (Array.isArray(data.unlockedSquirrelCostumes)) setUnlockedSquirrelCostumes(data.unlockedSquirrelCostumes);
        if (data.activePalaceStyleId) setActivePalaceStyleId(data.activePalaceStyleId);
        if (Array.isArray(data.unlockedPalaceStyles)) setUnlockedPalaceStyles(data.unlockedPalaceStyles);
      } else {
        // First session: show story trailer cutscene!
        setShowCutscene(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        laddus,
        coins,
        score,
        currentLevelId,
        activeCostumeId,
        unlockedCostumes,
        soundEnabled,
        voiceEnabled,
        musicEnabled,
        musicVolume,
        voiceVolume,
        sfxVolume,
        dailyTrials,
        backgroundTheme,
        unlockedBackgrounds,
        graphicsMode,
        activePetId,
        activeSquirrelCostumeId,
        unlockedSquirrelCostumes,
        activePalaceStyleId,
        unlockedPalaceStyles
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // ignore
    }
  }, [laddus, coins, score, currentLevelId, activeCostumeId, unlockedCostumes, soundEnabled, voiceEnabled, musicEnabled, musicVolume, voiceVolume, sfxVolume, dailyTrials, backgroundTheme, unlockedBackgrounds, graphicsMode, activePetId, activeSquirrelCostumeId, unlockedSquirrelCostumes, activePalaceStyleId, unlockedPalaceStyles]);

  // Sync unlocked costumes with list
  useEffect(() => {
    setCostumes((prev) =>
      prev.map((c) => ({
        ...c,
        unlocked: unlockedCostumes.includes(c.id)
      }))
    );
  }, [unlockedCostumes]);

  // Current Level details
  const currentLevel = useMemo(() => {
    return levels.find((l) => l.id === currentLevelId) || levels[0];
  }, [levels, currentLevelId]);

  // Current Fitness Stage based on currentLevelId
  const currentFitnessStage = useMemo(() => {
    if (currentLevelId >= 10) return FITNESS_STAGES[4];
    if (currentLevelId >= 7) return FITNESS_STAGES[3];
    if (currentLevelId >= 5) return FITNESS_STAGES[2];
    if (currentLevelId >= 3) return FITNESS_STAGES[1];
    return FITNESS_STAGES[0];
  }, [currentLevelId]);

  // Storage Limit based on level
  const storageLimit = currentLevel.storageCap || 25;

  // Active Companion Pet Object
  const activePetObj = useMemo(() => {
    return PALACE_PETS_LIST.find((p) => p.id === activePetId) || PALACE_PETS_LIST[0];
  }, [activePetId]);

  // Toggle Sound
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
    if (next) sound.playDing();
  };

  // Toggle Voice
  const handleToggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    sound.setVoiceEnabled(next);
    if (next) sound.playDing();
  };

  const handleToggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    sound.setMusicEnabled(next);
  };

  const handleChangeMusicVolume = (vol: number) => {
    setMusicVolume(vol);
    sound.setMusicVolume(vol);
  };

  const handleChangeVoiceVolume = (vol: number) => {
    setVoiceVolume(vol);
    sound.setVoiceVolume(vol);
  };

  const handleChangeSfxVolume = (vol: number) => {
    setSfxVolume(vol);
    sound.setSfxVolume(vol);
  };

  // Tap King Avatar
  const handleTapKing = () => {
    sound.playPop();
    sound.playMuscleFlex();
    const quotes = KING_QUOTES.idle;
    const randomQ = quotes[Math.floor(Math.random() * quotes.length)];
    setKingCourtyardQuote(randomQ);
    setActiveSpeaker('king');
    setActiveDialogue(randomQ);

    const moods: KingMood[] = ['hero_pose', 'eating', 'wobble', 'idle'];
    const chosenMood = moods[Math.floor(Math.random() * moods.length)];
    setKingMood(chosenMood);
    setTimeout(() => setKingMood('idle'), 1800);

    sound.speakKing(randomQ.ml, randomQ.translit);

    if (Math.random() < 0.4) {
      const coachQuotes = COACH_MIRCHI_QUOTES.lossRoast;
      setCoachQuote(coachQuotes[Math.floor(Math.random() * coachQuotes.length)]);
    }
  };

  // Tap Coach Mirchi
  const handleTapCoach = () => {
    sound.playPop();
    const quotes = COACH_MIRCHI_QUOTES.greetings;
    const randomQ = quotes[Math.floor(Math.random() * quotes.length)];
    setCoachQuote(randomQ);
    setActiveSpeaker('mirchi');
    setActiveDialogue(randomQ);
    sound.speakCoachMirchi(randomQ.ml, randomQ.translit);
  };

  // Tap Squirrel
  const handleTapSquirrel = (q: VoiceQuote) => {
    setActiveSpeaker('squirrel');
    setActiveDialogue(q);
    sound.speakSquirrel(q.ml, q.translit);
  };

  // Tap Pet
  const handleTapPet = (petId: PetId) => {
    let quote: VoiceQuote = { ml: 'മച്ചാൻ തീ ആണ്! ആന മസിൽ പവർ!', translit: 'Machan thee aahn! Aana muscle power!', en: 'Lit bro!' };
    if (petId === 'elephant') {
      quote = ELEPHANT_QUOTES[Math.floor(Math.random() * ELEPHANT_QUOTES.length)];
    } else if (petId === 'goat') {
      quote = GOAT_QUOTES[Math.floor(Math.random() * GOAT_QUOTES.length)];
    } else if (petId === 'parrot') {
      quote = PARROT_QUOTES[Math.floor(Math.random() * PARROT_QUOTES.length)];
    } else if (petId === 'cat') {
      quote = CAT_QUOTES[Math.floor(Math.random() * CAT_QUOTES.length)];
    }
    setActiveSpeaker('pet');
    setActiveDialogue(quote);
    sound.speakPetVoice(petId, quote.ml, quote.translit);
  };

  // Viral Malayalam Slang Quick Trigger
  const handleTriggerSlang = (ml: string, translit: string) => {
    sound.playSquirrelSqueak();
    const q: VoiceQuote = { ml, translit, en: ml };
    setActiveSpeaker('squirrel');
    setActiveDialogue(q);
    sound.speakSquirrel(ml, translit);
  };

  // Replay Active Voice
  const handleReplayActiveAudio = () => {
    if (activeSpeaker === 'king') {
      sound.speakKing(activeDialogue.ml, activeDialogue.translit);
    } else if (activeSpeaker === 'mirchi') {
      sound.speakCoachMirchi(activeDialogue.ml, activeDialogue.translit);
    } else if (activeSpeaker === 'squirrel') {
      sound.speakSquirrel(activeDialogue.ml, activeDialogue.translit);
    } else {
      sound.speakPetVoice(activePetId, activeDialogue.ml, activeDialogue.translit);
    }
  };

  // Launch Current Level's Game
  const handlePlayCurrentLevel = () => {
    sound.playPop();
    if (currentLevel.id === 10) {
      setActiveMode('championship');
    } else {
      setActiveMode(currentLevel.primaryGame);
    }
  };

  // Check Level Progression upon earning Laddus
  const checkLevelProgress = useCallback((newLaddus: number) => {
    if (newLaddus >= currentLevel.ladduTarget && currentLevelId < 10) {
      sound.playFanfare();
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      const nextId = currentLevelId + 1;
      setCurrentLevelId(nextId);
      setLevels((prev) =>
        prev.map((l) => {
          if (l.id === currentLevelId) return { ...l, completed: true };
          if (l.id === nextId) return { ...l, unlocked: true };
          return l;
        })
      );

      const levelUpQuote: VoiceQuote = {
        ml: `ലെവൽ ${nextId} തുറന്നു അളിയാ! രാജാവിന്റെ സ്റ്റാമിന ഇരട്ടിയായി!`,
        translit: `Level ${nextId} thurannu aliya! Rajavinte stamina irattiyayi!`,
        en: `Level ${nextId} UNLOCKED! My royal stamina is expanding!`
      };
      setKingCourtyardQuote(levelUpQuote);
      setActiveSpeaker('king');
      setActiveDialogue(levelUpQuote);
      sound.speakKing(levelUpQuote.ml, levelUpQuote.translit);
      setCoachQuote(COACH_MIRCHI_QUOTES.winRemark[Math.floor(Math.random() * COACH_MIRCHI_QUOTES.winRemark.length)]);
    }
  }, [currentLevel, currentLevelId]);

  // Finish Running Game handler
  const handleFinishRunning = (result: { won: boolean; laddusEarned: number; coinsEarned: number; scoreEarned: number }) => {
    setActiveMode('home');
    const newLaddus = Math.min(storageLimit, laddus + result.laddusEarned);
    setLaddus(newLaddus);
    setCoins((c) => c + result.coinsEarned);
    setScore((s) => s + result.scoreEarned);

    if (result.won) {
      setDailyTrials((d) => ({ ...d, trial1_running: true }));
      setDailyChallenges((prev) =>
        prev.map((ch) =>
          ch.id === 'c2'
            ? { ...ch, progress: Math.min(ch.target, ch.progress + 1) }
            : ch
        )
      );
      checkLevelProgress(newLaddus);
    }

    setLadduPowerActive(false);
  };

  // Finish Kuri Adi handler
  const handleFinishKuriAdi = (result: { won: boolean; laddusEarned: number; coinsEarned: number; scoreEarned: number }) => {
    setActiveMode('home');
    const newLaddus = Math.min(storageLimit, laddus + result.laddusEarned);
    setLaddus(newLaddus);
    setCoins((c) => c + result.coinsEarned);
    setScore((s) => s + result.scoreEarned);

    if (result.won) {
      setDailyTrials((d) => ({ ...d, trial2_kuriAdi: true }));
      setDailyChallenges((prev) =>
        prev.map((ch) =>
          ch.id === 'c3'
            ? { ...ch, progress: Math.min(ch.target, ch.progress + result.laddusEarned) }
            : ch
        )
      );
      checkLevelProgress(newLaddus);
    }
  };

  // Finish Workout handler
  const handleFinishWorkout = (result: { won: boolean; laddusEarned: number; coinsEarned: number; scoreEarned: number }) => {
    setActiveMode('home');
    const newLaddus = Math.min(storageLimit, laddus + result.laddusEarned);
    setLaddus(newLaddus);
    setCoins((c) => c + result.coinsEarned);
    setScore((s) => s + result.scoreEarned);

    if (result.won) {
      setDailyTrials((d) => ({ ...d, trial3_workout: true }));
      checkLevelProgress(newLaddus);
    }
  };

  // Finish Laddu Factory handler
  const handleFinishFactory = (result: { laddusMade: number; coinsEarned: number; grantedBuff: boolean }) => {
    setActiveMode('home');
    const newLaddus = Math.min(storageLimit, laddus + result.laddusMade);
    setLaddus(newLaddus);
    setCoins((c) => c + result.coinsEarned);
    if (result.grantedBuff) {
      setLadduPowerActive(true);
      const buffQuote: VoiceQuote = {
        ml: "ലഡു പവർ ഓൺ! ഇനി തടസ്സങ്ങൾ എന്റെ നെഞ്ചിൽ തട്ടി തെറിക്കും!",
        translit: "Laddu power on! Ini thadassangal ente nenjil thatti therikkum!",
        en: "LADDU POWER ACTIVE! Obstacles will bounce right off my royal chest!"
      };
      setKingCourtyardQuote(buffQuote);
      setActiveSpeaker('king');
      setActiveDialogue(buffQuote);
      sound.speakKing(buffQuote.ml, buffQuote.translit);
    }

    setDailyChallenges((prev) =>
      prev.map((ch) =>
        ch.id === 'c1'
          ? { ...ch, progress: Math.min(ch.target, ch.progress + result.laddusMade) }
          : ch
      )
    );
    checkLevelProgress(newLaddus);
  };

  // Championship Finale Victory
  const handleChampionshipVictory = () => {
    setActiveMode('home');
    if (!unlockedCostumes.includes('fit_king')) {
      setUnlockedCostumes((prev) => [...prev, 'fit_king']);
    }
    setActiveCostumeId('fit_king');
    setCoins((c) => c + 200);
    setLaddus(storageLimit);
    const champQuote: VoiceQuote = {
      ml: "ഇതാ കേരളത്തിന്റെ ഫിറ്റ് രാജാവ്! കസവ് മുണ്ടും മസിലും വേറെ ലെവൽ!",
      translit: "Itha Keralathinte fit raajavu! Kasavu mundum muscle-um vere level!",
      en: "BEHOLD: THE LEGENDARY FIT KING! The cape stays on!"
    };
    setKingCourtyardQuote(champQuote);
    setActiveSpeaker('king');
    setActiveDialogue(champQuote);
    sound.speakKing(champQuote.ml, champQuote.translit);
    setCoachQuote(COACH_MIRCHI_QUOTES.winRemark[0]);
  };

  // Claim Daily Trials All 3 Bonus
  const handleClaimTrialsBonus = () => {
    sound.playFanfare();
    confetti({
      particleCount: 100,
      spread: 70
    });
    setLaddus((l) => Math.min(storageLimit, l + 5));
    setDailyTrials((d) => ({ ...d, bonusClaimed: true }));
    setCoachQuote(COACH_MIRCHI_QUOTES.allTrialsWon[1]);
  };

  // Claim Daily Challenge Reward
  const handleClaimChallenge = (challenge: DailyChallenge) => {
    sound.playDing();
    confetti({ particleCount: 60 });
    setLaddus((l) => Math.min(storageLimit, l + challenge.rewardLaddus));
    setCoins((c) => c + challenge.rewardCoins);
    setDailyChallenges((prev) =>
      prev.map((ch) => (ch.id === challenge.id ? { ...ch, completed: true } : ch))
    );
  };

  // Buy Costume / Customization Handlers
  const handleBuyKingCostume = (costume: CustomizableItem | Costume) => {
    if (coins >= costume.price && !unlockedCostumes.includes(costume.id)) {
      setCoins((c) => c - costume.price);
      setUnlockedCostumes((prev) => [...prev, costume.id]);
      setActiveCostumeId(costume.id);
      confetti({ particleCount: 50 });
    }
  };

  const handleBuySquirrelCostume = (item: CustomizableItem) => {
    if (coins >= item.price && !unlockedSquirrelCostumes.includes(item.id)) {
      setCoins((c) => c - item.price);
      setUnlockedSquirrelCostumes((prev) => [...prev, item.id]);
      setActiveSquirrelCostumeId(item.id as SquirrelCostumeId);
      confetti({ particleCount: 50 });
    }
  };

  const handleBuyPalaceStyle = (item: CustomizableItem) => {
    if (coins >= item.price && !unlockedPalaceStyles.includes(item.id)) {
      setCoins((c) => c - item.price);
      setUnlockedPalaceStyles((prev) => [...prev, item.id]);
      setActivePalaceStyleId(item.id as PalaceStyleId);
      confetti({ particleCount: 50 });
    }
  };

  const handleBuyBackground = (item: CustomizableItem) => {
    if (coins >= item.price && !unlockedBackgrounds.includes(item.id as BackgroundThemeId)) {
      setCoins((c) => c - item.price);
      setUnlockedBackgrounds((prev) => [...prev, item.id as BackgroundThemeId]);
      setBackgroundTheme(item.id as BackgroundThemeId);
      confetti({ particleCount: 50 });
    }
  };

  // Sync shop items with unlock state
  const kingItemsWithStatus = useMemo(() => {
    return KING_DRESS_ITEMS.map((item) => ({
      ...item,
      unlocked: unlockedCostumes.includes(item.id)
    }));
  }, [unlockedCostumes]);

  const squirrelItemsWithStatus = useMemo(() => {
    return SQUIRREL_ITEMS.map((item) => ({
      ...item,
      unlocked: unlockedSquirrelCostumes.includes(item.id)
    }));
  }, [unlockedSquirrelCostumes]);

  const palaceItemsWithStatus = useMemo(() => {
    return PALACE_ITEMS.map((item) => ({
      ...item,
      unlocked: unlockedPalaceStyles.includes(item.id)
    }));
  }, [unlockedPalaceStyles]);

  const backgroundItemsWithStatus = useMemo(() => {
    return BACKGROUND_ITEMS.map((item) => ({
      ...item,
      unlocked: unlockedBackgrounds.includes(item.id as BackgroundThemeId)
    }));
  }, [unlockedBackgrounds]);

  return (
    <div className="h-screen max-h-screen h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-100 font-sans select-none text-slate-800">
      {/* 1. FIXED TOP HEADER BAR */}
      <TopBar 
        laddus={laddus}
        storageLimit={storageLimit}
        coins={coins}
        score={score}
        currentLevel={currentLevelId}
        stage={currentFitnessStage}
        soundEnabled={soundEnabled}
        voiceEnabled={voiceEnabled}
        activeMode={activeMode}
        backgroundTheme={backgroundTheme}
        unlockedBackgrounds={unlockedBackgrounds}
        graphicsMode={graphicsMode}
        onChangeBackgroundTheme={(theme) => setBackgroundTheme(theme)}
        onToggleGraphicsMode={() => setGraphicsMode(graphicsMode === 'hd' ? 'pixel' : 'hd')}
        onToggleSound={handleToggleSound}
        onToggleVoice={handleToggleVoice}
        onGoHome={() => setActiveMode('home')}
        onOpenLevels={() => setShowLevels(true)}
        onOpenTrials={() => setShowTrials(true)}
        onOpenDictionary={() => setShowDictionary(true)}
        onOpenGoals={() => setShowGoals(true)}
        onOpenPets={() => setShowPets(true)}
        onOpenWardrobe={() => setShowWardrobe(true)}
        onOpenAudioSettings={() => setShowAudioSettings(true)}
      />

      {/* 2. CENTERED STAGE VIEWPORT (Strict 55-60vh or Full mini-game container) */}
      <main className="flex-1 min-h-0 w-full max-w-5xl mx-auto px-2 sm:px-4 py-1 flex flex-col justify-center items-center overflow-hidden">
        {/* GAME MODE 1: RUNNING KING */}
        {activeMode === 'running' && (
          <RunningGame 
            costumeId={activeCostumeId}
            ladduPowerActive={ladduPowerActive}
            onFinish={handleFinishRunning}
            onCancel={() => setActiveMode('home')}
          />
        )}

        {/* GAME MODE 2: KURI ADI (SLINGSHOT) */}
        {activeMode === 'kuri_adi' && (
          <KuriAdiGame 
            costumeId={activeCostumeId}
            onFinish={handleFinishKuriAdi}
            onCancel={() => setActiveMode('home')}
          />
        )}

        {/* GAME MODE 3: WORKOUT */}
        {activeMode === 'workout' && (
          <WorkoutGame 
            costumeId={activeCostumeId}
            onFinish={handleFinishWorkout}
            onCancel={() => setActiveMode('home')}
          />
        )}

        {/* GAME MODE 4: LADDU FACTORY */}
        {activeMode === 'laddu_factory' && (
          <LadduFactory 
            costumeId={activeCostumeId}
            currentLaddus={laddus}
            storageLimit={storageLimit}
            onFinish={handleFinishFactory}
            onCancel={() => setActiveMode('home')}
          />
        )}

        {/* GAME MODE 5: CHAMPIONSHIP */}
        {activeMode === 'championship' && (
          <ChampionshipGame 
            costumeId={activeCostumeId}
            onVictory={handleChampionshipVictory}
            onCancel={() => setActiveMode('home')}
          />
        )}

        {/* MAIN VIEW: THE ROYAL COURTYARD STAGE */}
        {activeMode === 'home' && (
          <div className="w-full h-full max-h-[58vh] sm:max-h-[60vh] flex flex-col justify-between items-center relative">
            <PalaceBackground
              themeId={backgroundTheme}
              palaceStyle={activePalaceStyleId}
              className="w-full h-full flex flex-col justify-between p-2 relative overflow-hidden"
            >
              {/* Stage Top HUD Strip */}
              <div className="flex items-center justify-between z-10 px-2.5 py-1 bg-black/40 backdrop-blur-xs rounded-xl border border-white/20 text-white text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">🏆</span>
                  <span className="font-extrabold truncate text-[11px] sm:text-xs">
                    ലെവൽ {currentLevel.id}: {currentLevel.title}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-yellow-300 font-extrabold">
                    ({laddus}/{currentLevel.ladduTarget} 🍬)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {ladduPowerActive && (
                    <span className="bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse flex items-center gap-1">
                      ⚡ പവർ ഓൺ!
                    </span>
                  )}
                  <button
                    onClick={() => {
                      sound.playPop();
                      setShowWardrobe(true);
                    }}
                    className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500/80 to-orange-500/80 hover:from-amber-600 hover:to-orange-600 rounded-lg text-[11px] font-black transition-colors cursor-pointer border border-amber-300/40 text-white"
                    title="രാജകീയ അലങ്കാര ബസാർ (വസ്ത്രങ്ങൾ, കൊട്ടാരം, അണ്ണാൻ, പശ്ചാത്തലം)"
                  >
                    <span>🎨</span>
                    <span className="hidden sm:inline">അലങ്കാരം</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playPop();
                      setShowPets(true);
                    }}
                    className="flex items-center gap-1 px-2 py-0.5 bg-white/25 hover:bg-white/35 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                    title="വളർത്തുമൃഗങ്ങൾ മാറ്റൂ"
                  >
                    <span>{activePetObj.emoji}</span>
                    <span className="hidden sm:inline">{activePetObj.name}</span>
                  </button>
                </div>
              </div>

              {/* Characters Standing on Stage (Coach Mirchi, King, Chippan Squirrel, Pet) */}
              <div className="flex-1 flex items-end justify-center gap-2 sm:gap-6 z-10 pb-1">
                {/* Coach Mirchi */}
                <div 
                  onClick={handleTapCoach}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  title="കോച്ച് മിർച്ചി - തമാശ കേൾക്കാൻ തൊടൂ!"
                >
                  <CoachMirchi 
                    quote={coachQuote}
                    showBubble={false}
                  />
                </div>

                {/* King Avatar */}
                <div 
                  onClick={handleTapKing}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  title="രാജാവ് - മസിൽ പവർ കാണാൻ തൊടൂ!"
                >
                  <KingAvatar 
                    size="md"
                    mood={kingMood}
                    costumeId={activeCostumeId}
                    graphicsMode={graphicsMode}
                    showSpeech={false}
                  />
                </div>

                {/* Chippan Squirrel */}
                <div 
                  onClick={() => handleTapSquirrel(SQUIRREL_QUOTES[Math.floor(Math.random() * SQUIRREL_QUOTES.length)])}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  title="ചിപ്പൻ അണ്ണാൻ - സ്ലാങ്ങ് കേൾക്കാൻ തൊടൂ!"
                >
                  <SquirrelCompanion 
                    costumeId={activeSquirrelCostumeId}
                    showBubble={false}
                    onQuoteSpoken={handleTapSquirrel}
                  />
                </div>

                {/* Companion Pet Mini Avatar */}
                <div
                  onClick={() => handleTapPet(activePetId)}
                  className="hidden sm:flex flex-col items-center cursor-pointer hover:scale-110 transition-transform bg-white/20 backdrop-blur-xs p-1.5 rounded-2xl border border-white/30 shadow-md"
                  title={`${activePetObj.name} - ശബ്ദം കേൾക്കാൻ തൊടൂ!`}
                >
                  <span className="text-2xl sm:text-3xl filter drop-shadow">{activePetObj.emoji}</span>
                  <span className="text-[9px] font-black text-white bg-black/50 px-1.5 py-0.5 rounded-full mt-0.5">
                    {activePetObj.name.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Compact Floating Non-Blocking Bottom Dialog Strip */}
              <div className="z-20 w-full bg-slate-900/80 backdrop-blur-md rounded-2xl border border-amber-400/50 p-2 sm:p-2.5 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 shadow-2xl">
                {/* Left: Speaker & Dialogue */}
                <div className="flex items-center gap-2 w-full sm:w-auto flex-1 min-w-0">
                  <span className="shrink-0 px-2 py-0.5 rounded-lg bg-amber-500 text-amber-950 font-black text-[10px] sm:text-xs">
                    {activeSpeaker === 'king' && '👑 രാജാവ്'}
                    {activeSpeaker === 'mirchi' && '🌶️ മിർച്ചി'}
                    {activeSpeaker === 'squirrel' && '🐿️ ചിപ്പൻ'}
                    {activeSpeaker === 'pet' && `🐾 ${activePetObj.name.split(' ')[0]}`}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-black text-amber-200 truncate leading-snug">
                      "{activeDialogue.ml}"
                    </p>
                    {activeDialogue.translit && (
                      <p className="text-[10px] text-slate-300 truncate italic leading-none">
                        {activeDialogue.translit}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleReplayActiveAudio}
                    className="shrink-0 p-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-lg text-xs font-black flex items-center gap-1 shadow-xs transition-colors"
                    title="ശബ്ദം വീണ്ടും കേൾക്കൂ"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden md:inline text-[10px]">കേൾക്കൂ</span>
                  </button>
                </div>

                {/* Right: Quick Viral Malayalam Slang Buttons */}
                <div className="flex items-center gap-1 shrink-0 overflow-x-auto max-w-full">
                  <button
                    onClick={() => handleTriggerSlang('പൊളി മച്ചാനെ!', 'Pwoli machanne!')}
                    className="px-2 py-1 bg-white/15 hover:bg-amber-500 hover:text-amber-950 text-amber-200 text-[10px] font-black rounded-lg border border-amber-300/30 transition-all cartoon-btn shrink-0"
                    title="പൊളി മച്ചാനെ!"
                  >
                    🔥 പൊളി!
                  </button>
                  <button
                    onClick={() => handleTriggerSlang('മച്ചാൻ തീ ആണ്!', 'Machan thee aahn!')}
                    className="px-2 py-1 bg-white/15 hover:bg-amber-500 hover:text-amber-950 text-amber-200 text-[10px] font-black rounded-lg border border-amber-300/30 transition-all cartoon-btn shrink-0"
                    title="മച്ചാൻ തീ ആണ്!"
                  >
                    ⚡ തീ!
                  </button>
                  <button
                    onClick={() => handleTriggerSlang('തന്ത ഉണ്ടോ സഖാവേ!', 'Thantha undo sakhaave!')}
                    className="px-2 py-1 bg-white/15 hover:bg-amber-500 hover:text-amber-950 text-amber-200 text-[10px] font-black rounded-lg border border-amber-300/30 transition-all cartoon-btn shrink-0"
                    title="തന്ത ഉണ്ടോ സഖാവേ!"
                  >
                    😂 തന്ത ഉണ്ടോ?
                  </button>
                  <button
                    onClick={() => handleTriggerSlang('മെല്ലെ അനങ്ങി പണി എടുക്ക്!', 'Melle anagi pani edukk!')}
                    className="px-2 py-1 bg-white/15 hover:bg-amber-500 hover:text-amber-950 text-amber-200 text-[10px] font-black rounded-lg border border-amber-300/30 transition-all cartoon-btn shrink-0"
                    title="മെല്ലെ അനങ്ങി പണി എടുക്ക്!"
                  >
                    💪 പണി എടുക്ക്!
                  </button>
                </div>
              </div>
            </PalaceBackground>
          </div>
        )}
      </main>

      {/* 3. FIXED BOTTOM NAVIGATION BAR */}
      {activeMode === 'home' && (
        <BottomNavBar 
          onPlay={handlePlayCurrentLevel}
          onKuriAdi={() => { sound.playPop(); setActiveMode('kuri_adi'); }}
          onWorkout={() => { sound.playPop(); setActiveMode('workout'); }}
          onLadduFactory={() => { sound.playPop(); setActiveMode('laddu_factory'); }}
          onDictionary={() => { sound.playPop(); setShowDictionary(true); }}
          onOpenCostumes={() => { sound.playPop(); setShowWardrobe(true); }}
          onOpenPets={() => { sound.playPop(); setShowPets(true); }}
          onOpenGoals={() => { sound.playPop(); setShowGoals(true); }}
          onOpenCutscene={() => { sound.playPop(); setShowCutscene(true); }}
          onOpenAudioSettings={() => { sound.playPop(); setShowAudioSettings(true); }}
        />
      )}

      {/* 4. MODALS FOR EXTENDED CONTENT */}
      {/* 1. Daily Goals & Rewards Modal */}
      <DailyGoalsModal 
        isOpen={showGoals}
        onClose={() => setShowGoals(false)}
        challenges={dailyChallenges}
        onClaimReward={(chId) => {
          const ch = dailyChallenges.find(c => c.id === chId);
          if (ch) handleClaimChallenge(ch);
        }}
      />

      {/* 2. Palace Pets Companion Modal */}
      <PetsModal 
        isOpen={showPets}
        onClose={() => setShowPets(false)}
        activePetId={activePetId}
        onSelectPet={(petId) => {
          setActivePetId(petId);
          handleTapPet(petId);
        }}
      />

      {/* 3. Royal Customization Bazaar Modal (King, Squirrel, Palace, Background) */}
      {showWardrobe && (
        <RoyalCustomizationModal 
          coins={coins}
          kingCostumes={kingItemsWithStatus}
          activeCostumeId={activeCostumeId}
          onSelectKingCostume={(id) => setActiveCostumeId(id)}
          onBuyKingCostume={handleBuyKingCostume}

          squirrelCostumes={squirrelItemsWithStatus}
          activeSquirrelCostumeId={activeSquirrelCostumeId}
          onSelectSquirrelCostume={(id) => setActiveSquirrelCostumeId(id)}
          onBuySquirrelCostume={handleBuySquirrelCostume}

          palaceStyles={palaceItemsWithStatus}
          activePalaceStyleId={activePalaceStyleId}
          onSelectPalaceStyle={(id) => setActivePalaceStyleId(id)}
          onBuyPalaceStyle={handleBuyPalaceStyle}

          backgroundItems={backgroundItemsWithStatus}
          activeBackgroundId={backgroundTheme}
          onSelectBackground={(id) => setBackgroundTheme(id)}
          onBuyBackground={handleBuyBackground}

          onClose={() => setShowWardrobe(false)}
        />
      )}

      {/* 4. Daily Trials Modal */}
      {showTrials && (
        <DailyTrialsModal 
          status={dailyTrials}
          onLaunchTrial={(mode) => setActiveMode(mode)}
          onClaimBonus={handleClaimTrialsBonus}
          onClose={() => setShowTrials(false)}
        />
      )}

      {/* 5. 10 Levels Campaign Modal */}
      {showLevels && (
        <LevelSelectModal 
          levels={levels}
          currentLevelId={currentLevelId}
          currentLaddus={laddus}
          onSelectLevel={(lvl) => {
            setCurrentLevelId(lvl.id);
            setActiveMode(lvl.primaryGame);
          }}
          onClose={() => setShowLevels(false)}
        />
      )}

      {/* 6. Story Trailer Cutscene Modal */}
      {showCutscene && (
        <CutsceneModal 
          onClose={() => setShowCutscene(false)}
        />
      )}

      {/* 7. Malayalam Voice Dictionary & Aksharamala Modal */}
      <MalayalamDictionaryModal 
        isOpen={showDictionary}
        onClose={() => setShowDictionary(false)}
      />

      {/* 8. Advanced Audio Settings & Voice Studio Modal */}
      {showAudioSettings && (
        <AudioSettingsModal 
          soundEnabled={soundEnabled}
          voiceEnabled={voiceEnabled}
          musicEnabled={musicEnabled}
          musicVolume={musicVolume}
          voiceVolume={voiceVolume}
          sfxVolume={sfxVolume}
          onToggleSound={handleToggleSound}
          onToggleVoice={handleToggleVoice}
          onToggleMusic={handleToggleMusic}
          onChangeMusicVolume={handleChangeMusicVolume}
          onChangeVoiceVolume={handleChangeVoiceVolume}
          onChangeSfxVolume={handleChangeSfxVolume}
          onClose={() => setShowAudioSettings(false)}
        />
      )}
    </div>
  );
}
