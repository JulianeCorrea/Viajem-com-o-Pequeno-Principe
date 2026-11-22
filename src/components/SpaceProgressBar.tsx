import { ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { PlanetData } from '../data/planets';

interface SpaceProgressBarProps {
  planets: PlanetData[];
  currentIndex: number;
  visitedIndices: number[];
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onSelectPlanet: (index: number) => void;
  onReturnHome: () => void;
}

export function SpaceProgressBar({
  planets,
  currentIndex,
  visitedIndices,
  audioEnabled,
  onToggleAudio,
  onSelectPlanet,
  onReturnHome,
}: SpaceProgressBarProps) {
  return (
    <header className="relative z-20 w-full border-b border-[#E8C468]/12 bg-[#060A17]/65 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 sm:px-8 py-3.5">
        {/* Zone 1: Single-line brand mark (returns to home cover) */}
        <button
          type="button"
          onClick={onReturnHome}
          title="Voltar ao início da jornada"
          className="font-serif text-base sm:text-lg font-medium tracking-tight text-[#F4EFE6] hover:text-[#F5DC93] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93]"
        >
          O Pequeno Príncipe
        </button>

        {/* Zone 2: Minimalist constellation line of 8 celestial bodies */}
        <nav
          aria-label="Mapa dos 8 astros"
          className="flex flex-1 items-center justify-center max-w-xl"
        >
          <ol className="flex w-full items-center justify-between relative">
            {/* Continuous hairline orbital track behind nodes */}
            <div
              aria-hidden="true"
              className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-px bg-[#E8C468]/20"
            />

            {planets.map((planet, idx) => {
              const isCurrent = idx === currentIndex;
              const isVisited = visitedIndices.includes(idx);

              return (
                <li key={planet.id} className="relative z-10 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => onSelectPlanet(idx)}
                    aria-label={`${planet.name} (${planet.orderLabel})`}
                    aria-current={isCurrent ? 'step' : undefined}
                    title={`${planet.name} · ${planet.inhabitant}`}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isCurrent
                          ? 'h-3.5 w-3.5 bg-[#F5DC93] shadow-[0_0_12px_rgba(245,220,147,0.85)] ring-4 ring-[#E8C468]/20'
                          : isVisited
                            ? 'h-2.5 w-2.5 bg-[#E8C468]/75 group-hover:scale-125 group-hover:bg-[#F5DC93]'
                            : 'h-2 w-2 bg-[#4B587C] group-hover:scale-125 group-hover:bg-[#9BA8CC]'
                      }`}
                    />
                  </button>
                  <span
                    className={`hidden md:block text-[10px] tracking-wide whitespace-nowrap transition-colors ${
                      isCurrent ? 'text-[#F5DC93] font-medium' : 'text-[#8C98B8]'
                    }`}
                  >
                    {planet.code}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Zone 3: Single audio control */}
        <button
          type="button"
          onClick={onToggleAudio}
          aria-pressed={audioEnabled}
          aria-label={audioEnabled ? 'Silenciar trilha e sons ambiente' : 'Ativar trilha e sons ambiente'}
          className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] ${
            audioEnabled
              ? 'border-[#E8C468]/45 bg-[#E8C468]/15 text-[#F5DC93] hover:bg-[#E8C468]/25'
              : 'border-[#E8C468]/20 bg-[#0D142B]/70 text-[#B8C0D6] hover:border-[#E8C468]/45 hover:text-[#F4EFE6]'
          }`}
        >
          {audioEnabled ? (
            <Volume2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <VolumeX className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{audioEnabled ? 'Som ligado' : 'Sem som'}</span>
        </button>
      </div>
    </header>
  );
}

interface PlanetNavFooterProps {
  currentIndex: number;
  totalPlanets: number;
  prevName: string | null;
  nextName: string | null;
  onPrev: () => void;
  onNext: () => void;
}

export function PlanetNavFooter({
  currentIndex,
  totalPlanets,
  prevName,
  nextName,
  onPrev,
  onNext,
}: PlanetNavFooterProps) {
  return (
    <footer className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-8 py-5 border-t border-[#E8C468]/12">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#E8C468]/25 bg-[#0D142B]/70 px-4 py-2 text-sm text-[#EDE7DA] transition-all duration-200 hover:border-[#E8C468]/60 hover:bg-[#152044] disabled:opacity-35 disabled:pointer-events-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] whitespace-nowrap"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Planeta Anterior</span>
          {prevName && (
            <span className="hidden sm:inline text-xs text-[#9AA6C8]">· {prevName}</span>
          )}
        </button>

        <span className="text-xs text-[#9AA6C8] tabular-nums whitespace-nowrap">
          {currentIndex + 1} / {totalPlanets}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={currentIndex === totalPlanets - 1}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#E8C468] px-4 py-2 text-sm font-medium text-[#0B1022] transition-all duration-200 hover:bg-[#F3D583] disabled:opacity-35 disabled:pointer-events-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] whitespace-nowrap"
        >
          <span>Próximo Planeta</span>
          {nextName && (
            <span className="hidden sm:inline text-xs text-[#3A2E14]">· {nextName}</span>
          )}
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
