export type GameMode = 
  | 'home' 
  | 'running' 
  | 'kuri_adi' 
  | 'workout' 
  | 'laddu_factory' 
  | 'championship';

export type FitnessStageId = 1 | 2 | 3 | 4 | 5;

export type PetId = 'squirrel' | 'elephant' | 'goat' | 'parrot' | 'cat';

export interface PalacePet {
  id: PetId;
  name: string;
  species: string;
  emoji: string;
  title: string;
  description: string;
  catchphrase: string;
}

export type BackgroundThemeId = 'palace' | 'backwaters' | 'pooram' | 'munnar' | 'wayanad' | 'varkala';

export type CostumeCategory = 'king' | 'squirrel' | 'palace' | 'background';

export type SquirrelCostumeId = 
  | 'sq_default' 
  | 'sq_kasavu' 
  | 'sq_ninja' 
  | 'sq_cool' 
  | 'sq_gym' 
  | 'sq_theyyam' 
  | 'sq_superhero';

export type PalaceStyleId = 
  | 'palace_travancore' 
  | 'palace_gold' 
  | 'palace_monsoon' 
  | 'palace_pooram' 
  | 'palace_cyber';

export interface CustomizableItem {
  id: string;
  category: CostumeCategory;
  name: string;
  emoji: string;
  description: string;
  price: number;
  unlocked: boolean;
  specialGag?: string;
  accentColor?: string;
}

export interface BackgroundTheme {
  id: BackgroundThemeId;
  name: string;
  emoji: string;
  description: string;
  gradient: string;
  cardBorder: string;
}

export type GraphicsMode = 'hd' | 'pixel';

export interface FitnessStage {
  id: FitnessStageId;
  name: string;
  emoji: string;
  vibe: string;
  tagline: string;
  minLevel: number;
}

export interface Costume {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  unlocked: boolean;
  specialGag?: string;
}

export interface GameLevel {
  id: number;
  title: string;
  subtitle: string;
  ladduTarget: number;
  storageCap: number;
  unlocked: boolean;
  completed: boolean;
  introGag: string;
  completionGag: string;
  primaryGame: GameMode;
}

export interface DailyTrialStatus {
  trial1_running: boolean;
  trial2_kuriAdi: boolean;
  trial3_workout: boolean;
  bonusClaimed: boolean;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  completed: boolean;
  rewardLaddus: number;
  rewardCoins: number;
}

export interface GameState {
  laddus: number;
  storageLimit: number;
  coins: number;
  score: number;
  currentLevel: number;
  fitnessStage: FitnessStageId;
  activeCostume: string;
  unlockedCostumes: string[];
  ladduPowerActive: boolean; // buff from factory
  dailyTrials: DailyTrialStatus;
  combo: number;
  soundEnabled: boolean;
  highestCombo: number;
}
