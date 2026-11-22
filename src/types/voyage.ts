export interface PlanetVisualState {
  b612: {
    waterCount: number;
    hasDome: boolean;
    lastAction: 'water' | 'dome_on' | 'dome_off' | null;
  };
  king: {
    orderIndex: number;
    decreePulse: number;
  };
  vain: {
    clapCount: number;
  };
  drunkard: {
    loopStep: number;
  };
  businessman: {
    starCount: number;
    isInterrupted: boolean;
    interruptionIndex: number;
  };
  lamplighter: {
    isDay: boolean;
    autoSpin: boolean;
    cycleCount: number;
  };
  geographer: {
    loggedIds: string[];
    lastFeedbackId: string | null;
  };
  earth: {
    tamingStep: number;
  };
}

export const INITIAL_VISUAL_STATE: PlanetVisualState = {
  b612: {
    waterCount: 0,
    hasDome: false,
    lastAction: null,
  },
  king: {
    orderIndex: -1,
    decreePulse: 0,
  },
  vain: {
    clapCount: 0,
  },
  drunkard: {
    loopStep: 0,
  },
  businessman: {
    starCount: 501622731,
    isInterrupted: false,
    interruptionIndex: -1,
  },
  lamplighter: {
    isDay: false,
    autoSpin: false,
    cycleCount: 0,
  },
  geographer: {
    loggedIds: [],
    lastFeedbackId: null,
  },
  earth: {
    tamingStep: 0,
  },
};
