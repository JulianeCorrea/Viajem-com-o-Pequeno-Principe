import { useEffect } from 'react';
import {
  BookOpen,
  Crown,
  Droplets,
  Feather,
  HandHeart,
  LampDesk,
  Pause,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  SunMoon,
  Wine,
} from 'lucide-react';
import {
  B612_ROSE_PHRASES,
  BUSINESSMAN_INTERRUPTIONS,
  DRUNKARD_LOOP,
  FOX_TAMING_STEPS,
  GEOGRAPHER_OBSERVATIONS,
  KING_ORDERS,
  VAIN_MAN_RESPONSES,
} from '../data/planets';
import { spaceAudio } from '../audio/SpaceAudioEngine';
import { PlanetVisualState } from '../types/voyage';

interface PlanetInteractionProps {
  planetId: string;
  state: PlanetVisualState;
  onUpdateState: (updater: (prev: PlanetVisualState) => PlanetVisualState) => void;
  onRestartVoyage?: () => void;
}

export function PlanetInteraction({
  planetId,
  state,
  onUpdateState,
  onRestartVoyage,
}: PlanetInteractionProps) {
  // Sync live planet context (pause clock tick on 328, day/night state on 329)
  useEffect(() => {
    spaceAudio.updatePlanetContext({
      businessmanInterrupted: state.businessman.isInterrupted,
      lamplighterIsDay: state.lamplighter.isDay,
    });
  }, [state.businessman.isInterrupted, state.lamplighter.isDay]);

  // Asteroid 328: rapid star counter unless temporarily interrupted
  useEffect(() => {
    if (planetId !== '328') return;
    if (state.businessman.isInterrupted) {
      const resumeTimer = window.setTimeout(() => {
        onUpdateState((prev) => ({
          ...prev,
          businessman: {
            ...prev.businessman,
            isInterrupted: false,
          },
        }));
      }, 3400);
      return () => window.clearTimeout(resumeTimer);
    }

    const tick = window.setInterval(() => {
      onUpdateState((prev) => ({
        ...prev,
        businessman: {
          ...prev.businessman,
          starCount: prev.businessman.starCount + Math.floor(Math.random() * 19) + 7,
        },
      }));
    }, 90);

    return () => window.clearInterval(tick);
  }, [planetId, state.businessman.isInterrupted, onUpdateState]);

  // Asteroid 329: optional rapid 1-minute rotation simulation
  useEffect(() => {
    if (planetId !== '329' || !state.lamplighter.autoSpin) return;
    const interval = window.setInterval(() => {
      onUpdateState((prev) => ({
        ...prev,
        lamplighter: {
          ...prev.lamplighter,
          isDay: !prev.lamplighter.isDay,
          cycleCount: prev.lamplighter.cycleCount + 1,
        },
      }));
    }, 2400);
    return () => window.clearInterval(interval);
  }, [planetId, state.lamplighter.autoSpin, onUpdateState]);

  /* 1. B-612 */
  if (planetId === 'b612') {
    const { waterCount, hasDome, lastAction } = state.b612;
    const phrases = lastAction ? B612_ROSE_PHRASES[lastAction] : null;
    const activePhrase = phrases ? phrases[waterCount % phrases.length] : null;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              spaceAudio.playEffect('water');
              onUpdateState((prev) => ({
                ...prev,
                b612: {
                  ...prev.b612,
                  waterCount: prev.b612.waterCount + 1,
                  lastAction: 'water',
                },
              }));
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#E8C468] px-5 py-2.5 text-sm font-medium text-[#0B1022] transition-all duration-200 hover:bg-[#F3D583] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
          >
            <Droplets className="h-4 w-4" aria-hidden="true" />
            Regar a Rosa
          </button>

          <button
            type="button"
            onClick={() => {
              spaceAudio.playEffect('glass');
              onUpdateState((prev) => {
                const nextDome = !prev.b612.hasDome;
                return {
                  ...prev,
                  b612: {
                    ...prev.b612,
                    hasDome: nextDome,
                    lastAction: nextDome ? 'dome_on' : 'dome_off',
                  },
                };
              });
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#E8C468]/35 bg-[#121B3A]/70 px-5 py-2.5 text-sm font-medium text-[#F4EFE6] transition-all duration-200 hover:border-[#E8C468]/70 hover:bg-[#19254D]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
          >
            <ShieldCheck className="h-4 w-4 text-[#E8C468]" aria-hidden="true" />
            {hasDome ? 'Retirar a redoma de vidro' : 'Colocar a redoma de vidro'}
          </button>
        </div>

        <div className="min-h-[68px] border-t border-[#E8C468]/15 pt-3.5">
          {activePhrase ? (
            <p className="font-serif text-base italic leading-relaxed text-[#F7DF9C]">
              {activePhrase}
            </p>
          ) : (
            <p className="text-sm text-[#B8C0D6]">
              Cuide da rosa com água fresca ou proteja-a das correntes de ar noturnas.
            </p>
          )}
        </div>
      </div>
    );
  }

  /* 2. Asteroide 325 — O Rei */
  if (planetId === '325') {
    const idx = state.king.orderIndex;
    const currentOrder = idx >= 0 ? KING_ORDERS[idx % KING_ORDERS.length] : null;

    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => {
            spaceAudio.playEffect('decree');
            onUpdateState((prev) => ({
              ...prev,
              king: {
                orderIndex: (prev.king.orderIndex + 1) % KING_ORDERS.length,
                decreePulse: prev.king.decreePulse + 1,
              },
            }));
          }}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#E8C468] px-5 py-2.5 text-sm font-medium text-[#0B1022] transition-all duration-200 hover:bg-[#F3D583] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
        >
          <Crown className="h-4 w-4" aria-hidden="true" />
          Pedir uma ordem
        </button>

        <div className="min-h-[76px] border-t border-[#E8C468]/15 pt-3.5">
          {currentOrder ? (
            <div className="space-y-1.5">
              <p className="font-serif text-base italic leading-relaxed text-[#F7DF9C]">
                {currentOrder.decree}
              </p>
              <p className="text-xs text-[#B8C0D6]">{currentOrder.effect}</p>
            </div>
          ) : (
            <p className="text-sm text-[#B8C0D6]">
              Sua Majestade aguarda um pedido de audiência para exercer sua autoridade absoluta.
            </p>
          )}
        </div>
      </div>
    );
  }

  /* 3. Asteroide 326 — O Homem Vaidoso */
  if (planetId === '326') {
    const claps = state.vain.clapCount;
    const response =
      claps > 0
        ? VAIN_MAN_RESPONSES[Math.min(claps - 1, VAIN_MAN_RESPONSES.length - 1)]
        : null;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              spaceAudio.playEffect('applause');
              onUpdateState((prev) => ({
                ...prev,
                vain: {
                  clapCount: prev.vain.clapCount + 1,
                },
              }));
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#E8C468] px-5 py-2.5 text-sm font-medium text-[#0B1022] transition-all duration-200 hover:bg-[#F3D583] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Aplaudir
          </button>

          {claps > 0 && (
            <span className="text-xs text-[#C7CEE3] tabular-nums">
              {claps} {claps === 1 ? 'aplauso recebido' : 'aplausos recebidos'}
            </span>
          )}
        </div>

        <div className="min-h-[68px] border-t border-[#E8C468]/15 pt-3.5">
          {response ? (
            <p className="font-serif text-base italic leading-relaxed text-[#F7DF9C]">
              {response}
            </p>
          ) : (
            <p className="text-sm text-[#B8C0D6]">
              Bata palmas para observar como o chapéu se ergue a cada novo elogio.
            </p>
          )}
        </div>
      </div>
    );
  }

  /* 4. Asteroide 327 — O Bêbado */
  if (planetId === '327') {
    const step = state.drunkard.loopStep;
    const currentTurn = DRUNKARD_LOOP[step % DRUNKARD_LOOP.length];

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() =>
              onUpdateState((prev) => ({
                ...prev,
                drunkard: {
                  loopStep: (prev.drunkard.loopStep + 1) % DRUNKARD_LOOP.length,
                },
              }))
            }
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#E8C468] px-5 py-2.5 text-sm font-medium text-[#0B1022] transition-all duration-200 hover:bg-[#F3D583] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
          >
            <Wine className="h-4 w-4" aria-hidden="true" />
            {currentTurn.question}
          </button>

          <span className="text-xs text-[#9AA6C8] tabular-nums">
            Ciclo {(step % 3) + 1} de 3
          </span>
        </div>

        <div className="min-h-[76px] border-t border-[#E8C468]/15 pt-3.5 space-y-1.5">
          <p className="font-serif text-base italic leading-relaxed text-[#F7DF9C]">
            {currentTurn.answer}
          </p>
          <p className="text-xs text-[#B8C0D6]">
            Próxima pergunta inevitável: {currentTurn.nextPrompt}
          </p>
        </div>
      </div>
    );
  }

  /* 5. Asteroide 328 — O Homem de Negócios */
  if (planetId === '328') {
    const { starCount, isInterrupted, interruptionIndex } = state.businessman;
    const formattedCount = starCount.toLocaleString('pt-BR');
    const message =
      interruptionIndex >= 0
        ? BUSINESSMAN_INTERRUPTIONS[interruptionIndex % BUSINESSMAN_INTERRUPTIONS.length]
        : null;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-[#E8C468]/20 bg-[#0D142C]/65 px-4 py-3 rounded-lg">
          <div>
            <p className="text-xs text-[#9AA6C8]">Estrelas somadas no papel</p>
            <p className="font-serif text-2xl font-medium tracking-tight text-[#F7DF9C] tabular-nums">
              {formattedCount}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onUpdateState((prev) => ({
                ...prev,
                businessman: {
                  ...prev.businessman,
                  isInterrupted: true,
                  interruptionIndex: prev.businessman.interruptionIndex + 1,
                },
              }))
            }
            disabled={isInterrupted}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#E8C468] px-5 py-2.5 text-sm font-medium text-[#0B1022] transition-all duration-200 hover:bg-[#F3D583] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
          >
            <Pause className="h-4 w-4" aria-hidden="true" />
            {isInterrupted ? 'Contagem pausada...' : 'Interromper contagem'}
          </button>
        </div>

        <div className="min-h-[68px] border-t border-[#E8C468]/15 pt-3.5">
          {message ? (
            <p className="font-serif text-base italic leading-relaxed text-[#F7DF9C]">
              {message}
            </p>
          ) : (
            <p className="text-sm text-[#B8C0D6]">
              Tente interromper a soma apressada para perguntar o que ele faz com tantas estrelas.
            </p>
          )}
        </div>
      </div>
    );
  }

  /* 6. Asteroide 329 — O Acendedor de Lampiões */
  if (planetId === '329') {
    const { isDay, autoSpin, cycleCount } = state.lamplighter;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              spaceAudio.playEffect('lamp');
              onUpdateState((prev) => ({
                ...prev,
                lamplighter: {
                  ...prev.lamplighter,
                  isDay: !prev.lamplighter.isDay,
                  cycleCount: prev.lamplighter.cycleCount + 1,
                },
              }));
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#E8C468] px-5 py-2.5 text-sm font-medium text-[#0B1022] transition-all duration-200 hover:bg-[#F3D583] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
          >
            <SunMoon className="h-4 w-4" aria-hidden="true" />
            {isDay ? 'Anoitecer · Acender lampião' : 'Amanhecer · Apagar lampião'}
          </button>

          <button
            type="button"
            onClick={() =>
              onUpdateState((prev) => ({
                ...prev,
                lamplighter: {
                  ...prev.lamplighter,
                  autoSpin: !prev.lamplighter.autoSpin,
                },
              }))
            }
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap ${
              autoSpin
                ? 'border-[#E8C468] bg-[#E8C468]/15 text-[#F7DF9C]'
                : 'border-[#E8C468]/30 bg-[#121B3A]/70 text-[#E6E2D8] hover:border-[#E8C468]/65'
            }`}
          >
            <LampDesk className="h-4 w-4" aria-hidden="true" />
            {autoSpin ? 'Pausar rotação rápida' : 'Girar dia e noite'}
          </button>
        </div>

        <div className="min-h-[72px] border-t border-[#E8C468]/15 pt-3.5 space-y-1">
          <p className="font-serif text-base italic leading-relaxed text-[#F7DF9C]">
            {isDay
              ? '“Bom dia! Apaguei o lampião conforme a ordem... mas logo já será noite outra vez.”'
              : '“Boa noite! Acendi o lampião — uma pequena estrela a mais brilhando no escuro.”'}
          </p>
          <p className="text-xs text-[#9AA6C8] tabular-nums">
            Estado atual: {isDay ? 'Dia (lampião apagado)' : 'Noite (lampião aceso)'} · {cycleCount}{' '}
            {cycleCount === 1 ? 'virada de turno' : 'viradas de turno'}
          </p>
        </div>
      </div>
    );
  }

  /* 7. Asteroide 330 — O Geógrafo */
  if (planetId === '330') {
    const { loggedIds, lastFeedbackId } = state.geographer;
    const lastObs = GEOGRAPHER_OBSERVATIONS.find((o) => o.id === lastFeedbackId) || null;
    const loggedEntries = GEOGRAPHER_OBSERVATIONS.filter((o) => loggedIds.includes(o.id));

    return (
      <div className="space-y-4">
        <p className="text-xs text-[#B8C0D6]">
          Relate ao Geógrafo o que você observou nos planetas anteriores:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {GEOGRAPHER_OBSERVATIONS.map((obs) => {
            const isRecorded = loggedIds.includes(obs.id);
            return (
              <button
                key={obs.id}
                type="button"
                onClick={() => {
                  if (!obs.isEphemeral) {
                    spaceAudio.playEffect('quill');
                  }
                  onUpdateState((prev) => {
                    const alreadyLogged = prev.geographer.loggedIds.includes(obs.id);
                    const nextLogged =
                      !obs.isEphemeral && !alreadyLogged
                        ? [...prev.geographer.loggedIds, obs.id]
                        : prev.geographer.loggedIds;
                    return {
                      ...prev,
                      geographer: {
                        loggedIds: nextLogged,
                        lastFeedbackId: obs.id,
                      },
                    };
                  });
                }}
                className={`flex min-h-[44px] items-center justify-between gap-2 rounded-lg border px-4 py-2.5 text-left text-xs sm:text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer ${
                  isRecorded
                    ? 'border-[#7AB8A8]/60 bg-[#7AB8A8]/15 text-[#E5F4EF]'
                    : lastFeedbackId === obs.id && obs.isEphemeral
                      ? 'border-[#E57A77]/60 bg-[#E57A77]/12 text-[#FAD4D2]'
                      : 'border-[#E8C468]/25 bg-[#111936]/70 text-[#ECE6DA] hover:border-[#E8C468]/60'
                }`}
              >
                <span className="truncate">{obs.label}</span>
                <BookOpen className="h-3.5 w-3.5 shrink-0 opacity-75" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="min-h-[82px] border-t border-[#E8C468]/15 pt-3.5 space-y-2">
          {lastObs ? (
            <p
              className={`font-serif text-base italic leading-relaxed ${
                lastObs.isEphemeral ? 'text-[#F5B0AD]' : 'text-[#F7DF9C]'
              }`}
            >
              {lastObs.geographerReply}
            </p>
          ) : (
            <p className="text-sm text-[#B8C0D6]">
              Escolha um relato acima para ver o que o Geógrafo aceita escrever em seu grande livro.
            </p>
          )}

          {loggedEntries.length > 0 && (
            <div className="pt-1 text-xs text-[#9EC7BC]">
              Anotado à tinta no Atlas: {loggedEntries.map((e) => e.ledgerEntry).join(' · ')}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* 8. Planeta Terra — A Raposa */
  const step = Math.min(3, state.earth.tamingStep);
  const currentStep = FOX_TAMING_STEPS[step];
  const isTamed = step >= 3;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {!isTamed ? (
          <button
            type="button"
            onClick={() => {
              const nextStep = Math.min(3, state.earth.tamingStep + 1);
              spaceAudio.playEffect(nextStep >= 3 ? 'fox_tamed' : 'fox_step');
              onUpdateState((prev) => ({
                ...prev,
                earth: {
                  tamingStep: Math.min(3, prev.earth.tamingStep + 1),
                },
              }));
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#E8C468] px-5 py-2.5 text-sm font-medium text-[#0B1022] transition-all duration-200 hover:bg-[#F3D583] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
          >
            <HandHeart className="h-4 w-4" aria-hidden="true" />
            {currentStep.actionLabel}
          </button>
        ) : (
          <button
            type="button"
            onClick={onRestartVoyage}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#E8C468]/45 bg-[#E8C468]/15 px-5 py-2.5 text-sm font-medium text-[#F7DF9C] transition-all duration-200 hover:bg-[#E8C468]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Recomeçar a Viagem
          </button>
        )}

        <span className="text-xs text-[#C7CEE3] tabular-nums">
          Passo {step} de 3 · Cativar a Raposa
        </span>
      </div>

      <div
        className={`min-h-[88px] border-t pt-3.5 space-y-1.5 transition-colors duration-500 ${
          isTamed ? 'border-[#E8C468]/50' : 'border-[#E8C468]/15'
        }`}
      >
        <p className="font-serif text-base sm:text-lg italic leading-relaxed text-[#F7DF9C]">
          {currentStep.foxText}
        </p>
        <p className="text-xs text-[#B8C0D6] flex items-center gap-1.5">
          <Feather className="h-3.5 w-3.5 text-[#E8C468]/80 shrink-0" aria-hidden="true" />
          <span>{currentStep.hint}</span>
        </p>
      </div>
    </div>
  );
}
