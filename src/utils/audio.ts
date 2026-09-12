// Web Audio API synthesized sound effects & Speech Synthesis for cartoon comedy arcade
class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private voiceEnabled: boolean = true;
  private musicEnabled: boolean = true;

  // Independent Volume Channels (0.0 to 1.0)
  private musicVolume: number = 0.6;
  private voiceVolume: number = 1.0;
  private sfxVolume: number = 0.8;

  private isSpeakingNow: boolean = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  // Looping background music variables
  private isMusicPlayingNow: boolean = false;
  private musicTimeoutId: any = null;
  private musicMasterGain: GainNode | null = null;
  private sfxMasterGain: GainNode | null = null;

  constructor() {
    // Initialized on first user gesture to comply with browser autoplay policies
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (this.sfxMasterGain && this.ctx) {
      this.sfxMasterGain.gain.setValueAtTime(
        enabled ? this.sfxVolume : 0,
        this.ctx.currentTime
      );
    }
    if (!enabled && this.isMusicPlayingNow) {
      this.stopMusic();
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    if (!enabled && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  public isVoiceEnabled(): boolean {
    return this.voiceEnabled;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingNow;
  }

  // Volume Controls
  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (this.sfxMasterGain && this.ctx) {
      this.sfxMasterGain.gain.setValueAtTime(
        this.soundEnabled ? this.sfxVolume : 0,
        this.ctx.currentTime
      );
    }
  }

  public getVoiceVolume(): number {
    return this.voiceVolume;
  }

  public setVoiceVolume(vol: number) {
    this.voiceVolume = Math.max(0, Math.min(1, vol));
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.musicMasterGain && this.ctx) {
      this.musicMasterGain.gain.setValueAtTime(
        this.musicEnabled && this.soundEnabled ? this.musicVolume * 0.15 : 0,
        this.ctx.currentTime
      );
    }
  }

  public isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (this.musicMasterGain && this.ctx) {
      this.musicMasterGain.gain.setValueAtTime(
        enabled && this.soundEnabled ? this.musicVolume * 0.15 : 0,
        this.ctx.currentTime
      );
    }
    if (enabled && !this.isMusicPlayingNow && this.soundEnabled) {
      this.startMusic();
    } else if (!enabled && this.isMusicPlayingNow) {
      this.stopMusic();
    }
  }

  public isMusicPlaying(): boolean {
    return this.isMusicPlayingNow;
  }

  public getSfxGainMultiplier(): number {
    return this.soundEnabled ? this.sfxVolume : 0;
  }

  // Background Music Synthesizer (Kerala Mohanam Pentatonic Melody)
  public startMusic() {
    if (!this.soundEnabled || !this.musicEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.isMusicPlayingNow) return;

    this.isMusicPlayingNow = true;

    if (!this.musicMasterGain) {
      this.musicMasterGain = this.ctx.createGain();
      this.musicMasterGain.connect(this.ctx.destination);
    }
    this.musicMasterGain.gain.setValueAtTime(
      this.musicVolume * 0.15,
      this.ctx.currentTime
    );

    // Upbeat Kerala Cartoon Pentatonic Loop (C4, D4, E4, G4, A4, C5)
    const melody = [
      { freq: 261.63, dur: 0.28 },
      { freq: 293.66, dur: 0.28 },
      { freq: 329.63, dur: 0.38 },
      { freq: 392.00, dur: 0.28 },
      { freq: 440.00, dur: 0.38 },
      { freq: 523.25, dur: 0.48 },
      { freq: 440.00, dur: 0.28 },
      { freq: 392.00, dur: 0.28 },
      { freq: 329.63, dur: 0.48 },
      { freq: 293.66, dur: 0.28 },
      { freq: 261.63, dur: 0.58 },
      { freq: 0, dur: 0.20 },
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isMusicPlayingNow || !this.ctx || !this.musicMasterGain) return;
      const note = melody[noteIdx];
      noteIdx = (noteIdx + 1) % melody.length;

      if (note.freq > 0) {
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.freq, now);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.25, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + note.dur);

          osc.connect(gain);
          gain.connect(this.musicMasterGain);

          osc.start(now);
          osc.stop(now + note.dur + 0.04);

          // Soft Chenda pulse on beats
          if (noteIdx % 3 === 0) {
            const drum = this.ctx.createOscillator();
            const drumGain = this.ctx.createGain();
            drum.type = 'sine';
            drum.frequency.setValueAtTime(110, now);
            drum.frequency.exponentialRampToValueAtTime(45, now + 0.08);

            drumGain.gain.setValueAtTime(0.18, now);
            drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

            drum.connect(drumGain);
            drumGain.connect(this.musicMasterGain);

            drum.start(now);
            drum.stop(now + 0.1);
          }
        } catch {
          // ignore AudioContext restriction
        }
      }

      this.musicTimeoutId = setTimeout(playNext, (note.dur + 0.05) * 1000);
    };

    playNext();
  }

  public stopMusic() {
    this.isMusicPlayingNow = false;
    if (this.musicTimeoutId) {
      clearTimeout(this.musicTimeoutId);
      this.musicTimeoutId = null;
    }
    if (this.musicMasterGain && this.ctx) {
      this.musicMasterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && !this.sfxMasterGain) {
      this.sfxMasterGain = this.ctx.createGain();
      this.sfxMasterGain.gain.setValueAtTime(
        this.soundEnabled ? this.sfxVolume : 0,
        this.ctx.currentTime
      );
      this.sfxMasterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private getAudioDestination(): AudioNode {
    this.initContext();
    return this.sfxMasterGain || (this.ctx?.destination as AudioNode);
  }

  /**
   * Speaks authentic Malayalam text using Web Speech Synthesis API
   * Prioritizes pure 'ml-IN' (Malayalam) voice; uses authentic phonetic Manglish on Indian voice fallback.
   */
  public speakMalayalam(text: string, translit?: string, pitch: number = 1.05, rate: number = 0.94) {
    if (!this.soundEnabled || !this.voiceEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop current speech
      window.speechSynthesis.resume(); // Prevent stuck pauses

      const voices = this.cachedVoices.length > 0
        ? this.cachedVoices
        : window.speechSynthesis.getVoices();

      // Look for pure Malayalam voice (ml-IN, Malayalam)
      const mlVoice = voices.find(v =>
        v.lang.toLowerCase().startsWith('ml') ||
        v.name.toLowerCase().includes('malayalam')
      );

      // Fallback: Indian English or Hindi voices that pronounce Indian phonetics accurately
      const indianVoice = voices.find(v =>
        v.lang === 'en-IN' ||
        v.lang === 'hi-IN' ||
        v.lang.includes('IN') ||
        v.name.toLowerCase().includes('india')
      );

      const defaultVoice = voices.find(v => v.default) || voices[0];
      const utterance = new SpeechSynthesisUtterance();

      if (mlVoice) {
        // Pure native Malayalam voice found
        utterance.voice = mlVoice;
        utterance.lang = mlVoice.lang || 'ml-IN';
        utterance.text = text;
        utterance.pitch = pitch;
        utterance.rate = rate;
      } else if (indianVoice) {
        // Indian voice fallback: speak Manglish transliteration with natural Kerala pacing
        utterance.voice = indianVoice;
        utterance.lang = indianVoice.lang;
        utterance.text = translit || text;
        utterance.pitch = pitch;
        utterance.rate = rate;
      } else {
        if (defaultVoice) utterance.voice = defaultVoice;
        utterance.text = translit || text;
        utterance.pitch = pitch;
        utterance.rate = rate;
      }

      utterance.volume = Math.max(0, Math.min(1, this.voiceVolume * (this.voiceEnabled ? 1.0 : 0.0)));

      this.isSpeakingNow = true;
      utterance.onend = () => {
        this.isSpeakingNow = false;
      };
      utterance.onerror = () => {
        this.isSpeakingNow = false;
      };

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 20);
    } catch {
      this.isSpeakingNow = false;
    }
  }

  /**
   * Stops any currently active speech synthesis
   */
  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeakingNow = false;
    }
  }

  /**
   * Custom Voice Synthesis Tester:
   * Pronounces any custom user-typed text with chosen character vocal tone or custom pitch/speed
   */
  public testSpeak(
    text: string,
    character: 'king' | 'mirchi' | 'squirrel' | 'elephant' | 'custom' = 'custom',
    customPitch: number = 1.0,
    customRate: number = 1.0
  ) {
    if (!text || !text.trim()) return;
    this.initContext();

    switch (character) {
      case 'king':
        this.speakKing(text);
        break;
      case 'mirchi':
        this.speakCoachMirchi(text);
        break;
      case 'squirrel':
        this.speakSquirrel(text);
        break;
      case 'elephant':
        this.speakPetVoice('elephant', text);
        break;
      case 'custom':
      default:
        this.speakMalayalam(text, undefined, customPitch, customRate);
        break;
    }
  }

  /**
   * Character 1: The Big Belly King (മഹാബലി ശൈലിയിലുള്ള ആനന്ദ രാജാവ്)
   * Deep, hearty, jovial, regal bass voice (pitch: 0.85, rate: 0.88)
   */
  public speakKing(text: string, translit?: string) {
    if (!this.soundEnabled || !this.voiceEnabled) return;
    this.playKingRegalHum();
    setTimeout(() => {
      this.speakMalayalam(text, translit, 0.85, 0.88);
    }, 120);
  }

  /**
   * Character 2: Coach Mirchi (എരിവുള്ള നാടൻ കീരി കോച്ച്)
   * Sharp, energetic, fast-talking, spicy coaching voice (pitch: 1.25, rate: 1.08)
   */
  public speakCoachMirchi(text: string, translit?: string) {
    if (!this.soundEnabled || !this.voiceEnabled) return;
    this.playWhistleChirp();
    setTimeout(() => {
      this.speakMalayalam(text, translit, 1.25, 1.08);
    }, 100);
  }

  /**
   * Character 3: Chippan Squirrel (ചുണക്കുട്ടി ചിപ്പൻ അണ്ണാൻ)
   * High-pitch, squeaky, joyful, cute sidekick voice (pitch: 1.48, rate: 1.15)
   */
  public speakSquirrel(text: string, translit?: string) {
    if (!this.soundEnabled || !this.voiceEnabled) return;
    this.playSquirrelSqueak();
    setTimeout(() => {
      this.speakMalayalam(text, translit, 1.48, 1.15);
    }, 150);
  }

  /**
   * Character 4: Palace Pets (കൊട്ടാരത്തിലെ വളർത്തുമൃഗങ്ങൾ)
   * Plays realistic animal acoustic sounds and then cheerful pet quote
   */
  public speakPetVoice(petId: string, text?: string, translit?: string) {
    if (!this.soundEnabled) return;
    if (petId === 'elephant') {
      this.playElephantTrumpet();
    } else if (petId === 'goat') {
      this.playGoatBleat();
    } else if (petId === 'parrot') {
      this.playParrotChirp();
    } else if (petId === 'cat') {
      this.playCatMeow();
    } else if (petId === 'rooster') {
      this.playRoosterCrow();
    }
    if (text && this.voiceEnabled) {
      setTimeout(() => {
        this.speakMalayalam(text, translit, 1.15, 0.98);
      }, 350);
    }
  }

  // Regal King throat hum / royal bell tone
  public playKingRegalHum() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.getAudioDestination());
    osc.start(now);
    osc.stop(now + 0.23);
  }

  // Coach Mirchi spicy coach whistle
  public playWhistleChirp() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.linearRampToValueAtTime(2200, now + 0.05);
    osc.frequency.linearRampToValueAtTime(1800, now + 0.1);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(gain);
    gain.connect(this.getAudioDestination());
    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Country Rooster Crow (പൂവൻകോഴി കൂവൽ)
  public playRoosterCrow() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.linearRampToValueAtTime(750, now + 0.1);
    osc.frequency.linearRampToValueAtTime(600, now + 0.2);
    osc.frequency.linearRampToValueAtTime(800, now + 0.35);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.42);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(3.0, now);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.getAudioDestination());
    osc.start(now);
    osc.stop(now + 0.45);
  }

  /**
   * Real acoustic phonetic vocal tract synthesis for Malayalam vowels and consonants
   * Simulates F1 (pharyngeal aperture) and F2 (tongue body position) formant frequencies
   */
  public playMalayalamPhonemeFormants(f1: number = 750, f2: number = 1250, durationSec: number = 0.35, f0Base: number = 145) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Glottal source oscillator (vocal folds vibration)
      const glottis = this.ctx.createOscillator();
      glottis.type = 'sawtooth';
      glottis.frequency.setValueAtTime(f0Base, now);
      glottis.frequency.exponentialRampToValueAtTime(f0Base * 0.9, now + durationSec);

      // Formant 1 filter (F1)
      const filter1 = this.ctx.createBiquadFilter();
      filter1.type = 'bandpass';
      filter1.frequency.setValueAtTime(f1, now);
      filter1.Q.setValueAtTime(5.5, now);

      // Formant 2 filter (F2)
      const filter2 = this.ctx.createBiquadFilter();
      filter2.type = 'bandpass';
      filter2.frequency.setValueAtTime(f2, now);
      filter2.Q.setValueAtTime(7.0, now);

      // Master vocal envelope
      const gain1 = this.ctx.createGain();
      const gain2 = this.ctx.createGain();
      const masterGain = this.ctx.createGain();

      gain1.gain.setValueAtTime(0.5, now);
      gain2.gain.setValueAtTime(0.35, now);

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
      masterGain.gain.exponentialRampToValueAtTime(0.2, now + durationSec * 0.7);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      glottis.connect(filter1);
      glottis.connect(filter2);
      filter1.connect(gain1);
      filter2.connect(gain2);
      gain1.connect(masterGain);
      gain2.connect(masterGain);
      masterGain.connect(this.getAudioDestination());

      glottis.start(now);
      glottis.stop(now + durationSec);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  /**
   * Pronounces an individual Malayalam Letter with both phonetic resonance and speech synthesis
   */
  public speakMalayalamLetter(letter: string, translit: string, formants?: [number, number]) {
    if (!this.soundEnabled || !this.voiceEnabled) return;

    // 1. Play natural acoustic formant resonance
    if (formants) {
      this.playMalayalamPhonemeFormants(formants[0], formants[1], 0.32, 160);
    } else {
      this.playMalayalamPhonemeFormants(650, 1400, 0.28, 150);
    }

    // 2. Speak the letter cleanly
    // For single letters, pronunciation needs slower cadence and exact phonetic spelling
    this.speakMalayalam(letter, translit, 1.0, 0.82);
  }

  /**
   * Pronounces a Malayalam Word or Phrase with clear accent
   */
  public speakMalayalamWord(word: string, translit: string) {
    this.playPop();
    this.speakMalayalam(word, translit, 1.02, 0.90);
  }

  // Synthesized vocal "AYYOO!" sound effect (Mallu King scream)
  public playAyyoVocal() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Dual vocal formant oscillators for cartoon "AYY-OO!"
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    // Frequency shift from "Ayy" (~480Hz) sliding down to "Oo" (~220Hz)
    osc1.frequency.setValueAtTime(440, now);
    osc1.frequency.exponentialRampToValueAtTime(720, now + 0.12);
    osc1.frequency.exponentialRampToValueAtTime(220, now + 0.45);

    osc2.frequency.setValueAtTime(550, now);
    osc2.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(280, now + 0.45);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gain.gain.setValueAtTime(0.28, now + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.48);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.4);
    filter.Q.setValueAtTime(3.5, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.getAudioDestination());

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  }

  // Cartoon Muscle Flex "PUMP / HMPH!" sound
  public playMuscleFlex() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.35);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.getAudioDestination());

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Cartoon POP (for laddu collected)
  public playPop() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

    osc.connect(gain);
    gain.connect(this.getAudioDestination());

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // DING (for bonus or perfect target)
  public playDing() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1046.5, now); // High C
    osc.frequency.setValueAtTime(1318.5, now + 0.08); // E

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.getAudioDestination());

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Boingy Footstep / Jump
  public playBoing() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

    osc.connect(gain);
    gain.connect(this.getAudioDestination());

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Comedic slide-whistle / failure sound (falling pitch)
  public playSlideWhistle() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.4);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.45);

    osc.connect(gain);
    gain.connect(this.getAudioDestination());

    osc.start(now);
    osc.stop(now + 0.5);
  }

  // Steam puff / spicy reaction
  public playSteam() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    // White noise buffer for cartoon steam hiss
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.getAudioDestination());

    noise.start(now);
    noise.stop(now + 0.3);
  }

  // Rock bite crunch / Thud
  public playThud() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'square';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

    osc.connect(gain);
    gain.connect(this.getAudioDestination());

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Level Complete / Victory Fanfare
  public playFanfare() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [392, 523.25, 659.25, 783.99, 1046.5]; // G4, C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.08;
      const duration = idx === notes.length - 1 ? 0.4 : 0.09;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      osc.connect(gain);
      gain.connect(this.getAudioDestination());

      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);
    });
  }

  public playVictoryFanfare() {
    this.playFanfare();
  }

  // Combo x10 King Mode dramatic chord
  public playKingMode() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const freqs = [261.63, 329.63, 392.00, 523.25]; // C major
    const now = this.ctx.currentTime;

    freqs.forEach((f) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

      osc.connect(gain);
      gain.connect(this.getAudioDestination());

      osc.start(now);
      osc.stop(now + 0.75);
    });
  }

  // Cute Squirrel Squeak / Chatter (അണ്ണാൻ ചിപ്പൻ ശബ്ദം)
  public playSquirrelSqueak() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.07, 0.14].forEach((delay, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + delay;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1600 + i * 200, t);
      osc.frequency.exponentialRampToValueAtTime(2400 + i * 150, t + 0.05);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);

      osc.connect(gain);
      gain.connect(this.getAudioDestination());

      osc.start(t);
      osc.stop(t + 0.065);
    });
  }

  // Baby Elephant Trumpet (ആനക്കുട്ടി ചിന്നംവിളി)
  public playElephantTrumpet() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(220, now);
    osc1.frequency.exponentialRampToValueAtTime(540, now + 0.15);
    osc1.frequency.exponentialRampToValueAtTime(680, now + 0.35);

    osc2.frequency.setValueAtTime(225, now);
    osc2.frequency.exponentialRampToValueAtTime(545, now + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(685, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.getAudioDestination());

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.46);
    osc2.stop(now + 0.46);
  }

  // Goat Bleat (ആട് ഭായ് മേ... ശബ്ദം)
  public playGoatBleat() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    // Vibrato effect for hilarious goat bleat
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(360, now + 0.08);
    osc.frequency.linearRampToValueAtTime(310, now + 0.16);
    osc.frequency.linearRampToValueAtTime(350, now + 0.24);
    osc.frequency.linearRampToValueAtTime(290, now + 0.36);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, now);
    filter.Q.setValueAtTime(2.5, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.getAudioDestination());

    osc.start(now);
    osc.stop(now + 0.42);
  }

  // Royal Parakeet Chirp (തത്തമ്മ കൊഞ്ചൽ)
  public playParrotChirp() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.exponentialRampToValueAtTime(3100, now + 0.07);
    osc.frequency.exponentialRampToValueAtTime(1900, now + 0.16);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.getAudioDestination());

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Royal Cat Meow (പൂച്ച മ്യാവൂ)
  public playCatMeow() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.35);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);

    osc.connect(gain);
    gain.connect(this.getAudioDestination());

    osc.start(now);
    osc.stop(now + 0.4);
  }
}

export const sound = new SoundEngine();
