import { motion } from 'motion/react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface LandingScreenProps {
  onStart: (withSound: boolean) => void;
  audioPreferred: boolean;
  onToggleAudioPreference: () => void;
}

export function LandingScreen({
  onStart,
  audioPreferred,
  onToggleAudioPreference,
}: LandingScreenProps) {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        {/* Watercolor emblem: tiny B-612 asteroid with migratory birds */}
        <div className="mb-8 animate-float-slow">
          <svg
            width="210"
            height="170"
            viewBox="0 0 210 170"
            fill="none"
            role="img"
            aria-label="Asteroide B-612 e pássaros migratórios sob céu estrelado"
          >
            <defs>
              <radialGradient id="landing-planet" cx="38%" cy="34%" r="68%">
                <stop offset="0%" stopColor="#A68B73" />
                <stop offset="58%" stopColor="#6E5A4F" />
                <stop offset="100%" stopColor="#352B31" />
              </radialGradient>
              <filter id="landing-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Orbital dashed arc */}
            <path
              d="M22 108 Q105 18 188 108"
              stroke="rgba(232, 196, 104, 0.25)"
              strokeWidth="1"
              strokeDasharray="3 5"
              fill="none"
            />

            {/* Migratory birds flying upwards */}
            <path
              d="M44 58 Q53 50 61 56 Q69 49 77 53"
              stroke="#F5DC93"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M128 38 Q136 31 143 36 Q151 30 158 34"
              stroke="#F5DC93"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M84 28 Q90 22 96 26 Q102 21 108 24"
              stroke="#FFF4D1"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />

            {/* Tiny planet B-612 */}
            <circle cx="105" cy="118" r="38" fill="url(#landing-planet)" />
            {/* Tiny volcano */}
            <path d="M77 95 L83 82 L89 95 Z" fill="#594540" />
            {/* Little Rose */}
            <line x1="122" y1="88" x2="122" y2="73" stroke="#6DA172" strokeWidth="2" />
            <circle cx="122" cy="70" r="5" fill="#E57A77" filter="url(#landing-glow)" />
            {/* Little Prince silhouette */}
            <path d="M101 66 Q90 65 84 70 Q90 74 99 70" fill="#F5DC93" />
            <path d="M98 66 L108 66 L110 84 L96 84 Z" fill="#46735B" />
            <circle cx="103" cy="60" r="5.5" fill="#F5D7B8" />
            <path d="M98 59 Q100 52 106 53 Q109 55 108 59 Z" fill="#F2C864" />
          </svg>
        </div>

        <p className="text-xs tracking-[0.2em] uppercase text-[#C9B37E] mb-3">
          Inspirado na obra de Antoine de Saint-Exupéry
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#FAF5EA] leading-[1.12] [text-wrap:balance]">
          Viagem Pelos Asteroides
        </h1>

        <div className="my-6 h-px w-24 bg-gradient-to-r from-transparent via-[#E8C468]/50 to-transparent" />

        <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#CED4E6]">
          Aproveite a revoada dos pássaros migratórios para partir do pequeno Asteroide B-612.
          Visite sete mundos solitários — um de cada vez — até alcançar a Terra e descobrir o que
          só se vê bem com o coração.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => onStart(audioPreferred)}
            className="inline-flex min-h-[48px] items-center gap-3 rounded-lg bg-[#E8C468] px-7 py-3.5 text-base font-medium text-[#0B1022] shadow-[0_10px_30px_rgba(232,196,104,0.22)] transition-all duration-200 hover:bg-[#F5DC93] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93] cursor-pointer whitespace-nowrap"
          >
            <span>Iniciar Viagem</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onToggleAudioPreference}
            className="inline-flex min-h-[40px] items-center gap-2 text-xs text-[#A5B1D1] hover:text-[#F5DC93] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5DC93]"
          >
            {audioPreferred ? (
              <Volume2 className="h-3.5 w-3.5 text-[#E8C468]" aria-hidden="true" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>
              {audioPreferred
                ? 'Trilha sonora e sons ambiente ativados'
                : 'Iniciar sem som (você poderá ativar depois)'}
            </span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}
