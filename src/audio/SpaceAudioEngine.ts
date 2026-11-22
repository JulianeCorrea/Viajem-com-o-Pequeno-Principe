// Procedural Web Audio API soundscape & soundtrack engine for O Pequeno Príncipe

type SoundEffectType =
  | 'birds'
  | 'water'
  | 'glass'
  | 'decree'
  | 'applause'
  | 'tick'
  | 'lamp'
  | 'quill'
  | 'fox_step'
  | 'fox_tamed';

// Musical scales (Hz) for gentle ambient felt-piano / music-box soundtrack
const SCALES: Record<string, number[]> = {
  // Warm dreamy F Lydian (B-612, Earth)
  warm: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33],
  // Regal fifths (King)
  regal: [220.0, 293.66, 329.63, 440.0, 493.88, 659.25],
  // Bright shimmering (Vain, Lamplighter)
  bright: [293.66, 349.23, 440.0, 523.25, 659.25, 698.46],
  // Melancholic minor (Drunkard, Businessman)
  melancholic: [220.0, 261.63, 311.13, 329.63, 392.0, 440.0],
  // Contemplative study (Geographer)
  study: [246.94, 293.66, 369.99, 440.0, 493.88, 587.33],
};

class SpaceAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  private isEnabled = false;
  private currentPlanetId = 'b612';
  private lamplighterIsDay = false;
  private businessmanInterrupted = false;

  private musicTimer: number | null = null;
  private ambientPulseTimer: number | null = null;
  private activeAmbientNodes: AudioNode[] = [];
  private noteStep = 0;

  private ensureContext() {
    if (this.ctx) return;

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    this.masterGain = master;

    // Gentle spatial echo bus for soundtrack notes
    const delay = ctx.createDelay(1.0);
    delay.delayTime.value = 0.42;
    const delayFeedback = ctx.createGain();
    delayFeedback.gain.value = 0.34;
    const delayFilter = ctx.createBiquadFilter();
    delayFilter.type = 'lowpass';
    delayFilter.frequency.value = 1400;

    delay.connect(delayFilter);
    delayFilter.connect(delayFeedback);
    delayFeedback.connect(delay);
    delayFilter.connect(master);
    this.delayNode = delay;

    const musicGain = ctx.createGain();
    musicGain.gain.value = 0.55;
    musicGain.connect(master);
    musicGain.connect(delay);
    this.musicGain = musicGain;

    const ambientGain = ctx.createGain();
    ambientGain.gain.value = 0.6;
    ambientGain.connect(master);
    this.ambientGain = ambientGain;

    // Pre-generate 3s pink-ish noise buffer for organic wind, waves, paper, and rustle
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
      b6 = white * 0.115926;
    }
    this.noiseBuffer = buffer;
  }

  public async setEnabled(enabled: boolean): Promise<boolean> {
    if (enabled) {
      this.ensureContext();
      if (!this.ctx || !this.masterGain) return false;
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      this.isEnabled = true;
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.75, now, 0.35);

      this.startSoundtrackLoop();
      this.rebuildPlanetAmbience(this.currentPlanetId);
      return true;
    } else {
      this.isEnabled = false;
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(0, now, 0.22);
      }
      this.stopLoops();
      this.clearAmbientNodes();
      return false;
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public setPlanet(planetId: string) {
    if (this.currentPlanetId === planetId) return;
    this.currentPlanetId = planetId;
    if (this.isEnabled) {
      this.rebuildPlanetAmbience(planetId);
    }
  }

  public updatePlanetContext(opts: { lamplighterIsDay?: boolean; businessmanInterrupted?: boolean }) {
    if (typeof opts.lamplighterIsDay === 'boolean') {
      this.lamplighterIsDay = opts.lamplighterIsDay;
    }
    if (typeof opts.businessmanInterrupted === 'boolean') {
      this.businessmanInterrupted = opts.businessmanInterrupted;
    }
  }

  private stopLoops() {
    if (this.musicTimer !== null) {
      window.clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.ambientPulseTimer !== null) {
      window.clearInterval(this.ambientPulseTimer);
      this.ambientPulseTimer = null;
    }
  }

  private clearAmbientNodes() {
    const nodes = this.activeAmbientNodes;
    this.activeAmbientNodes = [];
    for (const node of nodes) {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // Ignore already-stopped nodes
      }
    }
  }

  private startSoundtrackLoop() {
    if (this.musicTimer !== null) return;

    // Gentle arpeggio every ~1.25s
    const playNextNote = () => {
      if (!this.isEnabled || !this.ctx || !this.musicGain) return;

      const scaleKey =
        this.currentPlanetId === '325'
          ? 'regal'
          : this.currentPlanetId === '327' || this.currentPlanetId === '328'
            ? 'melancholic'
            : this.currentPlanetId === '330'
              ? 'study'
              : this.currentPlanetId === '326' || this.currentPlanetId === '329'
                ? 'bright'
                : 'warm';

      const scale = SCALES[scaleKey];
      const pattern = [0, 2, 4, 3, 1, 4, 5, 2];
      const idx = pattern[this.noteStep % pattern.length] % scale.length;
      const freq = scale[idx];
      this.noteStep += 1;

      // Occasional soft bass pad root on every 4th beat
      if (this.noteStep % 4 === 1) {
        this.playWarmPad(scale[0] * 0.5, 4.6);
      }

      // Soft felt-piano / music-box note
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const overtone = this.ctx.createOscillator();
      const noteEnv = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, now);

      const overtoneGain = this.ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.012, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

      noteEnv.gain.setValueAtTime(0.0001, now);
      noteEnv.gain.linearRampToValueAtTime(0.055, now + 0.05);
      noteEnv.gain.exponentialRampToValueAtTime(0.0001, now + 2.7);

      osc.connect(noteEnv);
      overtone.connect(overtoneGain);
      overtoneGain.connect(noteEnv);
      noteEnv.connect(this.musicGain);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 2.8);
      overtone.stop(now + 2.8);
    };

    playNextNote();
    this.musicTimer = window.setInterval(playNextNote, 1300);
  }

  private playWarmPad(freq: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(340, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private createLoopingNoise(
    filterType: BiquadFilterType,
    freq: number,
    q: number,
    gainLevel: number,
    lfoRate?: number,
    lfoDepth?: number
  ) {
    if (!this.ctx || !this.ambientGain || !this.noiseBuffer) return;

    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = freq;
    filter.Q.value = q;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.0001;
    gain.gain.setTargetAtTime(gainLevel, this.ctx.currentTime, 0.5);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambientGain);
    src.start();

    this.activeAmbientNodes.push(src, filter, gain);

    if (lfoRate && lfoDepth) {
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = lfoRate;
      lfoGain.gain.value = lfoDepth;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      this.activeAmbientNodes.push(lfo, lfoGain);
    }
  }

  private rebuildPlanetAmbience(planetId: string) {
    if (!this.ctx || !this.ambientGain) return;

    if (this.ambientPulseTimer !== null) {
      window.clearInterval(this.ambientPulseTimer);
      this.ambientPulseTimer = null;
    }
    this.clearAmbientNodes();

    // Every planet gets a curated spatial texture + rhythmic or environmental signature
    switch (planetId) {
      case 'b612': {
        // Gentle space breeze + soft morning petals shimmer
        this.createLoopingNoise('bandpass', 360, 1.4, 0.18, 0.14, 150);
        this.createLoopingNoise('lowpass', 190, 0.8, 0.14);
        break;
      }

      case '325': {
        // Majestic royal cosmic wind + resonant throne room drone
        this.createLoopingNoise('lowpass', 240, 1.2, 0.18, 0.09, 70);
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 110; // Deep royal A2
        g.gain.value = 0.0001;
        g.gain.setTargetAtTime(0.032, this.ctx.currentTime, 0.8);
        osc.connect(g);
        g.connect(this.ambientGain);
        osc.start();
        this.activeAmbientNodes.push(osc, g);
        break;
      }

      case '326': {
        // Airy spotlight shimmer + high cosmic whisper
        this.createLoopingNoise('bandpass', 920, 2.2, 0.09, 0.22, 240);
        this.createLoopingNoise('lowpass', 260, 0.7, 0.12);
        break;
      }

      case '327': {
        // Muffled nocturnal wind + melancholic slow water/glass droplets
        this.createLoopingNoise('lowpass', 210, 1.0, 0.22, 0.11, 55);
        this.ambientPulseTimer = window.setInterval(() => {
          if (!this.isEnabled || !this.ctx || !this.ambientGain) return;
          if (Math.random() < 0.7) {
            this.playSoftDrop(480 + Math.random() * 240);
          }
        }, 1900);
        break;
      }

      case '328': {
        // Mechanical clock tick-tock + hurried counting atmosphere
        this.createLoopingNoise('bandpass', 640, 1.8, 0.07);
        let isTick = true;
        this.ambientPulseTimer = window.setInterval(() => {
          if (!this.isEnabled || this.businessmanInterrupted) return;
          this.playClockTick(isTick);
          isTick = !isTick;
        }, 540);
        break;
      }

      case '329': {
        // 1-minute rotation clock tick + gas lamp night hum / morning breeze
        this.createLoopingNoise('bandpass', 500, 1.6, 0.14, 0.28, 180);
        let isTick = true;
        this.ambientPulseTimer = window.setInterval(() => {
          if (!this.isEnabled) return;
          this.playClockTick(isTick, this.lamplighterIsDay ? 0.035 : 0.05);
          isTick = !isTick;
        }, 1000);
        break;
      }

      case '330': {
        // Quiet study wind + occasional gentle paper / quill rustle
        this.createLoopingNoise('lowpass', 280, 0.9, 0.15, 0.08, 60);
        this.ambientPulseTimer = window.setInterval(() => {
          if (!this.isEnabled) return;
          if (Math.random() < 0.6) {
            this.playPaperRustle();
          }
        }, 3200);
        break;
      }

      case 'terra': {
        // Ocean waves washing rhythmically + warm wind in golden wheat fields
        this.createLoopingNoise('lowpass', 420, 0.9, 0.34, 0.13, 280);
        this.createLoopingNoise('bandpass', 1100, 1.1, 0.07, 0.18, 320);
        break;
      }

      default: {
        this.createLoopingNoise('lowpass', 250, 1.0, 0.15);
      }
    }
  }

  private playClockTick(high: boolean, volume = 0.055) {
    if (!this.ctx || !this.ambientGain || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;

    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(high ? 2300 : 1650, now);
    filter.Q.setValueAtTime(5.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambientGain);
    src.start(now);
    src.stop(now + 0.06);
  }

  private playSoftDrop(freq: number) {
    if (!this.ctx || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.45, now + 0.09);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.032, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  private playPaperRustle() {
    if (!this.ctx || !this.ambientGain || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1600, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambientGain);
    src.start(now);
    src.stop(now + 0.4);
  }

  public playEffect(effect: SoundEffectType) {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    switch (effect) {
      case 'birds': {
        // Gentle sweeping cosmic wind whoosh for migratory flight
        if (!this.noiseBuffer) return;
        const src = this.ctx.createBufferSource();
        src.buffer = this.noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(280, now);
        filter.frequency.exponentialRampToValueAtTime(980, now + 0.32);
        filter.frequency.exponentialRampToValueAtTime(320, now + 0.72);
        filter.Q.value = 1.6;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        src.start(now);
        src.stop(now + 0.8);
        break;
      }

      case 'water': {
        // Three delicate water droplets
        [0, 0.09, 0.2].forEach((offset, i) => {
          window.setTimeout(() => this.playSoftDrop(620 + i * 160), offset * 1000);
        });
        break;
      }

      case 'glass': {
        // Pure glass cloche chime
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.5, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
        osc.connect(gain);
        gain.connect(this.masterGain);
        if (this.delayNode) gain.connect(this.delayNode);
        osc.start(now);
        osc.stop(now + 0.9);
        break;
      }

      case 'decree': {
        // Regal fifth chord chime
        [329.63, 493.88].forEach((freq) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.045, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 1.15);
        });
        break;
      }

      case 'applause': {
        // Soft burst of filtered applause noise
        if (!this.noiseBuffer) return;
        for (let i = 0; i < 4; i++) {
          const t = now + i * 0.075;
          const src = this.ctx.createBufferSource();
          src.buffer = this.noiseBuffer;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1100 + i * 180, t);
          filter.Q.value = 1.4;
          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.07, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
          src.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);
          src.start(t);
          src.stop(t + 0.18);
        }
        break;
      }

      case 'lamp': {
        // Warm soft ignition chime
        this.playSoftDrop(523.25);
        break;
      }

      case 'quill': {
        this.playPaperRustle();
        break;
      }

      case 'fox_step': {
        // Soft warm note stepping upward
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        osc.connect(gain);
        gain.connect(this.masterGain);
        if (this.delayNode) gain.connect(this.delayNode);
        osc.start(now);
        osc.stop(now + 0.85);
        break;
      }

      case 'fox_tamed': {
        // Golden major-7th resolution chord
        [261.63, 329.63, 392.0, 493.88].forEach((freq, idx) => {
          if (!this.ctx || !this.masterGain) return;
          const t = now + idx * 0.09;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.linearRampToValueAtTime(0.045, t + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
          osc.connect(gain);
          gain.connect(this.masterGain);
          if (this.delayNode) gain.connect(this.delayNode);
          osc.start(t);
          osc.stop(t + 2.5);
        });
        break;
      }

      default:
        break;
    }
  }
}

export const spaceAudio = new SpaceAudioEngine();
