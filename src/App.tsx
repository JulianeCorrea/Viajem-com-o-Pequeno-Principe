import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { spaceAudio } from './audio/SpaceAudioEngine';
import { BirdTransitionOverlay } from './components/BirdTransitionOverlay';
import { LandingScreen } from './components/LandingScreen';
import { PlanetIllustration } from './components/PlanetIllustrations';
import { PlanetInteraction } from './components/PlanetInteraction';
import { PlanetNavFooter, SpaceProgressBar } from './components/SpaceProgressBar';
import { StarrySkyCanvas } from './components/StarrySkyCanvas';
import { PLANETS } from './data/planets';
import { INITIAL_VISUAL_STATE, PlanetVisualState } from './types/voyage';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visitedIndices, setVisitedIndices] = useState<number[]>([0]);
  const [visualState, setVisualState] = useState<PlanetVisualState>(INITIAL_VISUAL_STATE);
  const [transitionDir, setTransitionDir] = useState<'forward' | 'backward' | null>(null);
  const [audioPreferred, setAudioPreferred] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const transitionTimerRef = useRef<number | null>(null);
  const currentPlanet = PLANETS[currentIndex];

  const handleToggleAudio = useCallback(async () => {
    const next = !audioEnabled;
    const active = await spaceAudio.setEnabled(next);
    setAudioEnabled(active);
    setAudioPreferred(active);
  }, [audioEnabled]);

  const triggerTravel = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= PLANETS.length || targetIndex === currentIndex) {
        return;
      }

      const dir: 'forward' | 'backward' = targetIndex > currentIndex ? 'forward' : 'backward';
      setTransitionDir(dir);

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      setCurrentIndex(targetIndex);
      setVisitedIndices((prev) =>
        prev.includes(targetIndex) ? prev : [...prev, targetIndex]
      );

      spaceAudio.setPlanet(PLANETS[targetIndex].id);
      spaceAudio.playEffect('birds');

      transitionTimerRef.current = window.setTimeout(() => {
        setTransitionDir(null);
      }, 720);
    },
    [currentIndex]
  );

  const handleStartVoyage = useCallback(async (withSound: boolean) => {
    setTransitionDir('forward');
    setHasStarted(true);
    setCurrentIndex(0);
    setVisitedIndices([0]);
    spaceAudio.setPlanet(PLANETS[0].id);

    if (withSound) {
      const active = await spaceAudio.setEnabled(true);
      setAudioEnabled(active);
      if (active) {
        spaceAudio.playEffect('birds');
      }
    }

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      setTransitionDir(null);
    }, 720);
  }, []);

  const handleReturnHome = useCallback(async () => {
    setHasStarted(false);
    if (audioEnabled) {
      await spaceAudio.setEnabled(false);
      setAudioEnabled(false);
    }
  }, [audioEnabled]);

  const handleRestartVoyage = useCallback(() => {
    setVisualState(INITIAL_VISUAL_STATE);
    triggerTravel(0);
  }, [triggerTravel]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
      void spaceAudio.setEnabled(false);
    };
  }, []);

  // Keyboard navigation between planets
  useEffect(() => {
    if (!hasStarted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentIndex < PLANETS.length - 1) {
        triggerTravel(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        triggerTravel(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasStarted, currentIndex, triggerTravel]);

  const prevPlanet = currentIndex > 0 ? PLANETS[currentIndex - 1].code : null;
  const nextPlanet = currentIndex < PLANETS.length - 1 ? PLANETS[currentIndex + 1].code : null;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden watercolor-paper-grain text-[#F4EFE6]">
      {/* Deep animated starry watercolor sky */}
      <StarrySkyCanvas
        warpDirection={transitionDir}
        accentColor={currentPlanet.accentHex}
      />

      {/* Migratory birds flying across space on planet change */}
      <BirdTransitionOverlay direction={transitionDir} />

      {!hasStarted ? (
        <LandingScreen
          onStart={handleStartVoyage}
          audioPreferred={audioPreferred}
          onToggleAudioPreference={() => setAudioPreferred((p) => !p)}
        />
      ) : (
        <div className="relative z-10 flex min-h-screen flex-col">
          <SpaceProgressBar
            planets={PLANETS}
            currentIndex={currentIndex}
            visitedIndices={visitedIndices}
            audioEnabled={audioEnabled}
            onToggleAudio={handleToggleAudio}
            onSelectPlanet={triggerTravel}
            onReturnHome={handleReturnHome}
          />

          {/* Main Planet Stage */}
          <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 sm:px-8 py-8 lg:py-10">
            <AnimatePresence mode="wait">
              <motion.section
                key={currentPlanet.id}
                aria-label={currentPlanet.name}
                initial={{
                  opacity: 0,
                  x: transitionDir === 'backward' ? -36 : 36,
                  scale: 0.97,
                }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: transitionDir === 'backward' ? 36 : -36,
                  scale: 0.97,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                {/* Left / Center Visual Stage: Stylized Watercolor Planet */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center">
                  <div className="w-full animate-float-slow">
                    <PlanetIllustration planetId={currentPlanet.id} state={visualState} />
                  </div>
                </div>

                {/* Right Editorial Content & Thematic Interaction */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                  {/* Unboxed quiet metadata line */}
                  <div className="space-y-2">
                    <p className="text-xs tracking-widest uppercase text-[#C9B37E]">
                      {currentPlanet.orderLabel}
                      <span className="mx-2 text-[#E8C468]/45" aria-hidden="true">
                        ·
                      </span>
                      Habitante: {currentPlanet.inhabitant}
                    </p>

                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[#FAF5EA] leading-[1.15] [text-wrap:balance]">
                      {currentPlanet.name}
                    </h1>

                    <p className="flex items-center gap-1.5 text-xs text-[#9AA6C8]">
                      <Volume2 className="h-3.5 w-3.5 text-[#E8C468]/70 shrink-0" aria-hidden="true" />
                      <span>
                        Ambiente sonoro: {currentPlanet.ambientLabel}
                        {!audioEnabled && ' (silenciado)'}
                      </span>
                    </p>
                  </div>

                  {/* Literary quote framed with clean horizontal hairline rules */}
                  <blockquote className="border-y border-[#E8C468]/18 py-4">
                    <p className="font-serif text-lg sm:text-xl italic leading-relaxed text-[#F5DC93]">
                      {currentPlanet.quote}
                    </p>
                  </blockquote>

                  {/* Philosophical reflection */}
                  <div className="space-y-2.5 max-w-prose">
                    <p className="text-[15px] sm:text-base leading-relaxed text-[#D8DFEE]">
                      {currentPlanet.philosophy}
                    </p>
                    <p className="text-sm leading-relaxed text-[#9AA7C7]">
                      {currentPlanet.detailNote}
                    </p>
                  </div>

                  {/* Interactive Activity Box (single elevation level) */}
                  <div className="rounded-xl border border-[#E8C468]/20 bg-[#0B122B]/72 p-5 sm:p-6 backdrop-blur-sm">
                    <PlanetInteraction
                      planetId={currentPlanet.id}
                      state={visualState}
                      onUpdateState={setVisualState}
                      onRestartVoyage={handleRestartVoyage}
                    />
                  </div>
                </div>
              </motion.section>
            </AnimatePresence>
          </main>

          <PlanetNavFooter
            currentIndex={currentIndex}
            totalPlanets={PLANETS.length}
            prevName={prevPlanet}
            nextName={nextPlanet}
            onPrev={() => triggerTravel(currentIndex - 1)}
            onNext={() => triggerTravel(currentIndex + 1)}
          />
        </div>
      )}
    </div>
  );
}
