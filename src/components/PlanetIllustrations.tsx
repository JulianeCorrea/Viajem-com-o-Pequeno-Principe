import { motion } from 'motion/react';
import { PlanetVisualState } from '../types/voyage';

interface PlanetIllustrationProps {
  planetId: string;
  state: PlanetVisualState;
}

export function PlanetIllustration({ planetId, state }: PlanetIllustrationProps) {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[420px] aspect-square mx-auto select-none">
      {/* Subtle watercolor aura behind each planet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 rounded-full opacity-55 blur-3xl transition-colors duration-700"
        style={{
          background:
            planetId === '329' && state.lamplighter.isDay
              ? 'radial-gradient(circle, rgba(242, 184, 99, 0.34) 0%, rgba(28, 42, 92, 0.08) 70%, transparent 100%)'
              : planetId === 'b612'
                ? 'radial-gradient(circle, rgba(229, 122, 119, 0.22) 0%, rgba(46, 62, 120, 0.12) 65%, transparent 100%)'
                : planetId === 'terra'
                  ? 'radial-gradient(circle, rgba(232, 196, 104, 0.25) 0%, rgba(44, 78, 122, 0.14) 68%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(130, 152, 224, 0.22) 0%, rgba(22, 34, 78, 0.12) 68%, transparent 100%)',
        }}
      />

      <svg
        viewBox="0 0 400 400"
        className="relative z-10 w-full h-full drop-shadow-[0_18px_40px_rgba(3,6,18,0.65)]"
        role="img"
        aria-label={`Ilustração em aquarela de ${planetId}`}
      >
        <defs>
          {/* Watercolor soft edge filter */}
          <filter id="watercolor-soft" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="glow-gold" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shared gradients */}
          <radialGradient id="b612-surface" cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#9C846E" />
            <stop offset="55%" stopColor="#6E5A4F" />
            <stop offset="100%" stopColor="#3B3035" />
          </radialGradient>

          <radialGradient id="king-surface" cx="36%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#9C4D58" />
            <stop offset="55%" stopColor="#692E3E" />
            <stop offset="100%" stopColor="#311728" />
          </radialGradient>

          <radialGradient id="vain-surface" cx="35%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#856FA6" />
            <stop offset="58%" stopColor="#524373" />
            <stop offset="100%" stopColor="#262040" />
          </radialGradient>

          <radialGradient id="drunkard-surface" cx="35%" cy="35%" r="72%">
            <stop offset="0%" stopColor="#5C7199" />
            <stop offset="60%" stopColor="#39496B" />
            <stop offset="100%" stopColor="#1D273E" />
          </radialGradient>

          <radialGradient id="businessman-surface" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#7C7761" />
            <stop offset="60%" stopColor="#4C4B42" />
            <stop offset="100%" stopColor="#23252A" />
          </radialGradient>

          <radialGradient id="lamp-surface-night" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#4E5B85" />
            <stop offset="60%" stopColor="#2C3659" />
            <stop offset="100%" stopColor="#161C33" />
          </radialGradient>

          <radialGradient id="lamp-surface-day" cx="38%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#E9B872" />
            <stop offset="55%" stopColor="#9E7356" />
            <stop offset="100%" stopColor="#4F3D4B" />
          </radialGradient>

          <radialGradient id="geographer-surface" cx="38%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#7A9E94" />
            <stop offset="58%" stopColor="#476B69" />
            <stop offset="100%" stopColor="#22383D" />
          </radialGradient>

          <radialGradient id="earth-surface" cx="38%" cy="28%" r="75%">
            <stop offset="0%" stopColor="#DFB467" />
            <stop offset="48%" stopColor="#9B7E4E" />
            <stop offset="82%" stopColor="#405B78" />
            <stop offset="100%" stopColor="#1F2E4A" />
          </radialGradient>

          <linearGradient id="glass-cloche" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6F4FF" stopOpacity="0.48" />
            <stop offset="45%" stopColor="#B8DCFF" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#E8C468" stopOpacity="0.24" />
          </linearGradient>

          <linearGradient id="prince-scarf" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5DC93" />
            <stop offset="100%" stopColor="#E2A83E" />
          </linearGradient>
        </defs>

        {/* Orbital faint hairline ring */}
        <circle
          cx="200"
          cy="210"
          r="156"
          fill="none"
          stroke="rgba(232, 196, 104, 0.14)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />

        {planetId === 'b612' && <B612Art state={state.b612} />}
        {planetId === '325' && <KingArt state={state.king} />}
        {planetId === '326' && <VainManArt state={state.vain} />}
        {planetId === '327' && <DrunkardArt state={state.drunkard} />}
        {planetId === '328' && <BusinessmanArt state={state.businessman} />}
        {planetId === '329' && <LamplighterArt state={state.lamplighter} />}
        {planetId === '330' && <GeographerArt state={state.geographer} />}
        {planetId === 'terra' && <EarthArt state={state.earth} />}
      </svg>
    </div>
  );
}

/* 1. ASTEROIDE B-612 */
function B612Art({ state }: { state: PlanetVisualState['b612'] }) {
  const roseScale = Math.min(1.22, 1 + state.waterCount * 0.05);

  return (
    <g>
      {/* Asteroid body */}
      <circle cx="200" cy="245" r="102" fill="url(#b612-surface)" filter="url(#watercolor-soft)" />
      {/* Watercolor craters & ground shading */}
      <ellipse cx="155" cy="272" rx="22" ry="11" fill="#4A3C38" opacity="0.5" />
      <ellipse cx="242" cy="288" rx="18" ry="9" fill="#4A3C38" opacity="0.45" />
      <path
        d="M110 218 Q165 186 200 185 Q245 186 292 222"
        fill="none"
        stroke="#B59B82"
        strokeWidth="3"
        opacity="0.35"
      />

      {/* Three tiny volcanoes on the left */}
      <g transform="translate(115, 168)">
        <path d="M0 32 L11 8 L22 32 Z" fill="#5D4742" />
        <path d="M18 35 L28 14 L38 35 Z" fill="#4F3D39" />
        <path d="M35 30 L45 18 L54 30 Z" fill="#6D554E" />
        {/* Gentle smoke wisps from active volcano */}
        <motion.path
          d="M11 6 Q7 -4 14 -12 Q18 -18 12 -25"
          fill="none"
          stroke="#DCE6FF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
          animate={{ y: [0, -4, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>

      {/* Tiny baobab sprout on the right edge */}
      <g transform="translate(268, 184)">
        <path d="M8 28 Q9 16 12 8" stroke="#5A7A58" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="6" cy="10" rx="6" ry="3.5" fill="#6F9469" transform="rotate(-20 6 10)" />
        <ellipse cx="17" cy="9" rx="6" ry="3.5" fill="#6F9469" transform="rotate(20 17 9)" />
      </g>

      {/* The Little Prince standing gently beside his Rose */}
      <g transform="translate(168, 128)">
        {/* Flowing golden scarf */}
        <motion.path
          d="M12 22 Q-6 20 -18 28 Q-10 34 6 28"
          fill="url(#prince-scarf)"
          animate={{ d: ['M12 22 Q-6 20 -18 28 Q-10 34 6 28', 'M12 22 Q-8 17 -21 23 Q-10 31 6 28', 'M12 22 Q-6 20 -18 28 Q-10 34 6 28'] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Green tunic coat */}
        <path d="M7 22 L21 22 L25 52 L3 52 Z" fill="#46735B" />
        {/* Legs */}
        <line x1="10" y1="52" x2="10" y2="62" stroke="#365745" strokeWidth="3" strokeLinecap="round" />
        <line x1="18" y1="52" x2="18" y2="62" stroke="#365745" strokeWidth="3" strokeLinecap="round" />
        {/* Head & golden hair */}
        <circle cx="14" cy="13" r="8" fill="#F5D7B8" />
        <path d="M6 12 Q8 2 16 3 Q23 4 22 12 Q18 8 14 9 Q10 8 6 12 Z" fill="#F2C864" />
      </g>

      {/* The Rose on the right crest */}
      <g transform="translate(226, 148)">
        <motion.g
          animate={{ scale: roseScale }}
          transition={{ type: 'spring', stiffness: 160, damping: 16 }}
          style={{ transformOrigin: '14px 44px' }}
        >
          {/* Stem & thorns */}
          <path d="M14 44 Q13 30 14 16" stroke="#5F8D64" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <ellipse cx="9" cy="30" rx="5.5" ry="2.8" fill="#6DA172" transform="rotate(-28 9 30)" />
          <ellipse cx="19" cy="25" rx="5.5" ry="2.8" fill="#6DA172" transform="rotate(28 19 25)" />
          {/* Crimson watercolor petals */}
          <circle cx="14" cy="13" r="11" fill="#E57A77" opacity="0.28" filter="url(#glow-gold)" />
          <path d="M6 14 C6 5, 22 5, 22 14 C22 20, 6 20, 6 14 Z" fill="#D9575B" />
          <path d="M9 12 C10 6, 19 7, 19 13 C17 17, 10 17, 9 12 Z" fill="#F08A88" />
          <path d="M12 11 C13 9, 16 9, 16 12 C15 14, 12 14, 12 11 Z" fill="#B83B44" />
        </motion.g>

        {/* Water droplets animation when watered */}
        {state.lastAction === 'water' && (
          <motion.g
            key={state.waterCount}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: [0, 1, 0], y: [-16, 4, 16] }}
            transition={{ duration: 1.2 }}
          >
            <circle cx="6" cy="4" r="2.2" fill="#9BD6FF" />
            <circle cx="22" cy="1" r="2" fill="#9BD6FF" />
            <circle cx="14" cy="-6" r="2.5" fill="#C4E8FF" />
          </motion.g>
        )}

        {/* Glass cloche (Redoma de vidro) */}
        {state.hasDome && (
          <motion.g
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <path
              d="M-3 44 L-3 18 C-3 1, 31 1, 31 18 L31 44 Z"
              fill="url(#glass-cloche)"
              stroke="#D8EEFF"
              strokeWidth="1.4"
              strokeOpacity="0.7"
            />
            <circle cx="14" cy="4" r="2.5" fill="#E8F4FF" opacity="0.75" />
            <path d="M3 16 C4 9, 8 7, 10 7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" fill="none" />
          </motion.g>
        )}
      </g>
    </g>
  );
}

/* 2. ASTEROIDE 325 — O REI */
function KingArt({ state }: { state: PlanetVisualState['king'] }) {
  const starsLit = state.orderIndex >= 0;

  return (
    <g>
      {/* Royal decreed stars reacting above */}
      {[
        { cx: 92, cy: 86, r: 2.5 },
        { cx: 145, cy: 62, r: 3 },
        { cx: 262, cy: 66, r: 3.2 },
        { cx: 308, cy: 96, r: 2.4 },
      ].map((star, idx) => (
        <motion.g
          key={idx}
          animate={
            starsLit
              ? { scale: [1, 1.45, 1], opacity: [0.65, 1, 0.75] }
              : { scale: 1, opacity: 0.45 }
          }
          transition={{ duration: 2.4, delay: idx * 0.25, repeat: Infinity }}
          style={{ transformOrigin: `${star.cx}px ${star.cy}px` }}
        >
          <circle cx={star.cx} cy={star.cy} r={star.r} fill="#F5DC93" filter={starsLit ? 'url(#glow-gold)' : undefined} />
        </motion.g>
      ))}

      {/* Asteroid draped in royal ermine mantle */}
      <circle cx="200" cy="245" r="100" fill="url(#king-surface)" filter="url(#watercolor-soft)" />
      {/* Crimson & ermine cape spreading over the asteroid */}
      <path
        d="M112 200 Q155 170 200 172 Q255 174 294 218 Q265 262 200 268 Q135 262 112 200 Z"
        fill="#A42C3D"
        opacity="0.88"
      />
      <path
        d="M114 202 Q160 250 200 256 Q252 250 290 218"
        fill="none"
        stroke="#F2EAE0"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Ermine spots */}
      {[
        [145, 224],
        [176, 238],
        [218, 240],
        [255, 226],
        [194, 218],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#2A1721" opacity="0.7" />
      ))}

      {/* Simple Throne & King */}
      <g transform="translate(174, 114)">
        {/* Throne back */}
        <rect x="10" y="14" width="32" height="50" rx="5" fill="#7D5829" stroke="#E8C468" strokeWidth="1.5" />
        {/* King body */}
        <path d="M14 34 L38 34 L43 66 L9 66 Z" fill="#B53245" />
        {/* Beard & face */}
        <circle cx="26" cy="24" r="9" fill="#F2D2B6" />
        <path d="M18 26 Q26 42 34 26 Z" fill="#EAE4DC" />
        {/* Crown */}
        <path d="M17 16 L19 7 L26 12 L33 7 L35 16 Z" fill="#E8C468" />
        {/* Scepter arm raising on decree */}
        <motion.g
          key={state.decreePulse}
          initial={{ rotate: 0 }}
          animate={{ rotate: state.decreePulse > 0 ? [-18, 4, 0] : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '38px 42px' }}
        >
          <line x1="38" y1="42" x2="56" y2="20" stroke="#E8C468" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="57" cy="18" r="4" fill="#F5DC93" />
        </motion.g>
      </g>
    </g>
  );
}

/* 3. ASTEROIDE 326 — O VAIDOSO */
function VainManArt({ state }: { state: PlanetVisualState['vain'] }) {
  return (
    <g>
      <circle cx="200" cy="246" r="98" fill="url(#vain-surface)" filter="url(#watercolor-soft)" />
      {/* Pedestal */}
      <rect x="176" y="168" width="48" height="14" rx="3" fill="#6F5B96" stroke="#C59CE0" strokeWidth="1" opacity="0.8" />

      {/* Vain Man */}
      <g transform="translate(178, 108)">
        <path d="M12 26 L32 26 L36 62 L8 62 Z" fill="#3B2E5C" />
        <circle cx="22" cy="17" r="8.5" fill="#F5D7BE" />
        {/* Raised hand greeting */}
        <path d="M31 32 Q46 20 42 8" stroke="#3B2E5C" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Oversized flamboyant hat tipping repeatedly with applause */}
        <motion.g
          key={state.clapCount}
          initial={{ y: 0, rotate: 0 }}
          animate={
            state.clapCount > 0
              ? { y: [0, -24, -4, 0], rotate: [0, 22, -6, 0] }
              : { y: 0, rotate: 0 }
          }
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '22px 10px' }}
        >
          <ellipse cx="22" cy="10" rx="22" ry="4.5" fill="#23193B" stroke="#E8C468" strokeWidth="1.2" />
          <path d="M12 10 L15 -14 L29 -14 L32 10 Z" fill="#2C204A" />
          <path d="M29 -10 Q42 -18 46 -8" stroke="#E57A77" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </motion.g>
      </g>

      {/* Golden applause ripples */}
      {state.clapCount > 0 && (
        <motion.circle
          key={`ripple-${state.clapCount}`}
          cx="200"
          cy="145"
          r="48"
          fill="none"
          stroke="#F5DC93"
          strokeWidth="1.5"
          initial={{ scale: 0.7, opacity: 0.85 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          style={{ transformOrigin: '200px 145px' }}
        />
      )}
    </g>
  );
}

/* 4. ASTEROIDE 327 — O BÊBADO */
function DrunkardArt({ state }: { state: PlanetVisualState['drunkard'] }) {
  return (
    <g>
      {/* Circular logical loop halo around asteroid */}
      <circle
        cx="200"
        cy="210"
        r="134"
        fill="none"
        stroke="rgba(115, 149, 201, 0.25)"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      {/* Active step marker rotating around the loop */}
      <motion.circle
        cx="200"
        cy="76"
        r="5.5"
        fill="#E8C468"
        filter="url(#glow-gold)"
        animate={{ rotate: state.loopStep * 120 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '200px 210px' }}
      />

      <circle cx="200" cy="246" r="96" fill="url(#drunkard-surface)" filter="url(#watercolor-soft)" />

      {/* Small wooden table & bottles */}
      <g transform="translate(158, 128)">
        {/* Table */}
        <line x1="36" y1="24" x2="68" y2="24" stroke="#857463" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="52" y1="24" x2="52" y2="48" stroke="#6E5F51" strokeWidth="3" />
        {/* Bottles on table and ground */}
        <rect x="42" y="10" width="6" height="14" rx="1.5" fill="#5D9E8A" opacity="0.85" />
        <rect x="53" y="13" width="5" height="11" rx="1.5" fill="#82B8A6" opacity="0.7" />
        <rect x="74" y="34" width="5" height="12" rx="1.5" fill="#5D9E8A" opacity="0.65" transform="rotate(75 74 34)" />

        {/* Slumped drinker */}
        <path d="M12 46 Q14 22 28 22 L34 46 Z" fill="#32415E" />
        <circle cx="24" cy="17" r="7.5" fill="#E3C4A8" />
        <path d="M26 22 Q32 25 36 22" stroke="#E3C4A8" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}

/* 5. ASTEROIDE 328 — O HOMEM DE NEGÓCIOS */
function BusinessmanArt({ state }: { state: PlanetVisualState['businessman'] }) {
  return (
    <g>
      <circle cx="200" cy="248" r="96" fill="url(#businessman-surface)" filter="url(#watercolor-soft)" />

      {/* Orbiting stars he tries to count */}
      {[
        { cx: 108, cy: 112, delay: 0 },
        { cx: 158, cy: 84, delay: 0.4 },
        { cx: 248, cy: 86, delay: 0.8 },
        { cx: 294, cy: 120, delay: 1.2 },
      ].map((s, idx) => (
        <motion.path
          key={idx}
          d={`M${s.cx} ${s.cy - 7} L${s.cx + 2} ${s.cy - 2} L${s.cx + 7} ${s.cy} L${s.cx + 2} ${s.cy + 2} L${s.cx} ${s.cy + 7} L${s.cx - 2} ${s.cy + 2} L${s.cx - 7} ${s.cy} L${s.cx - 2} ${s.cy - 2} Z`}
          fill="#F5DC93"
          animate={
            state.isInterrupted
              ? { scale: 1.15, opacity: 0.9 }
              : { scale: [0.85, 1.25, 0.85], opacity: [0.45, 1, 0.45] }
          }
          transition={{ duration: 1.4, delay: s.delay, repeat: Infinity }}
          style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
        />
      ))}

      {/* Desk, ledger & Businessman */}
      <g transform="translate(154, 122)">
        {/* Businessman in suit */}
        <path d="M18 22 L42 22 L45 48 L15 48 Z" fill="#2B303D" />
        <circle cx="30" cy="14" r="8" fill="#EBD0B5" />
        {/* Desk */}
        <rect x="6" y="42" width="76" height="10" rx="2" fill="#6E5741" />
        <rect x="14" y="52" width="60" height="16" fill="#4E3D2E" />
        {/* Ledger paper sheet */}
        <rect x="44" y="32" width="24" height="12" rx="1" fill="#F4EFE6" transform="rotate(-6 44 32)" />
        {/* Pencil moving */}
        <motion.line
          x1="34"
          y1="30"
          x2="52"
          y2="37"
          stroke="#E8C468"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={state.isInterrupted ? { y: -4 } : { y: [0, 2, 0] }}
          transition={{ duration: 0.35, repeat: state.isInterrupted ? 0 : Infinity }}
        />
      </g>
    </g>
  );
}

/* 6. ASTEROIDE 329 — O ACENDEDOR DE LAMPIÕES */
function LamplighterArt({ state }: { state: PlanetVisualState['lamplighter'] }) {
  const isLit = !state.isDay;

  return (
    <g>
      {/* Dynamic mini sky halo behind planet */}
      <motion.circle
        cx="200"
        cy="210"
        r="138"
        animate={{
          fill: state.isDay ? 'rgba(242, 184, 99, 0.14)' : 'rgba(18, 28, 66, 0.25)',
        }}
        transition={{ duration: 0.7 }}
      />

      {/* Sun / Moon orbiting indicator */}
      <motion.g
        animate={{ rotate: state.isDay ? 0 : 180 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '200px 236px' }}
      >
        <circle cx="200" cy="96" r="12" fill="#F5B95B" filter="url(#glow-gold)" opacity={state.isDay ? 0.95 : 0.25} />
        <circle cx="200" cy="376" r="9" fill="#DCE8FF" opacity={!state.isDay ? 0.85 : 0.2} />
      </motion.g>

      {/* Very tiny asteroid */}
      <circle
        cx="200"
        cy="256"
        r="74"
        fill={state.isDay ? 'url(#lamp-surface-day)' : 'url(#lamp-surface-night)'}
        filter="url(#watercolor-soft)"
      />

      {/* Streetlamp */}
      <g transform="translate(182, 114)">
        <line x1="28" y1="74" x2="28" y2="12" stroke="#2D334A" strokeWidth="4" strokeLinecap="round" />
        <path d="M22 12 L34 12 L31 2 L25 2 Z" fill="#1E2336" stroke="#E8C468" strokeWidth="1" />
        {/* Warm lamp glow at night */}
        <motion.circle
          cx="28"
          cy="8"
          r={isLit ? 26 : 0}
          fill="#F5C76B"
          animate={{ opacity: isLit ? [0.32, 0.48, 0.32] : 0 }}
          transition={{ duration: 2.5, repeat: Infinity }}
          filter="url(#glow-gold)"
        />
        {isLit && <circle cx="28" cy="8" r="5" fill="#FFF3C4" />}

        {/* Lamplighter figure beside the post */}
        <path d="M4 42 L18 42 L20 74 L2 74 Z" fill="#4E6185" />
        <circle cx="11" cy="35" r="7" fill="#EACBB0" />
        <path d="M4 32 L18 32 L16 27 L6 27 Z" fill="#2A354F" />
      </g>
    </g>
  );
}

/* 7. ASTEROIDE 330 — O GEÓGRAFO */
function GeographerArt({ state }: { state: PlanetVisualState['geographer'] }) {
  const hasEntries = state.loggedIds.length > 0;

  return (
    <g>
      <circle cx="200" cy="248" r="100" fill="url(#geographer-surface)" filter="url(#watercolor-soft)" />

      {/* Giant open ledger / atlas */}
      <g transform="translate(132, 140)">
        {/* Left page */}
        <path
          d="M8 24 Q36 16 66 24 L66 64 Q36 56 8 64 Z"
          fill="#F4EBD7"
          stroke="#C2AF8E"
          strokeWidth="1.5"
        />
        {/* Right page */}
        <path
          d="M66 24 Q96 16 124 24 L124 64 Q96 56 66 64 Z"
          fill="#EDE0C4"
          stroke="#C2AF8E"
          strokeWidth="1.5"
        />
        {/* Ink lines representing recorded discoveries */}
        <line x1="18" y1="34" x2="54" y2="32" stroke="#7A6548" strokeWidth="1.6" opacity="0.65" />
        <line x1="18" y1="42" x2="52" y2="40" stroke="#7A6548" strokeWidth="1.6" opacity="0.65" />
        {hasEntries && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1="76" y1="33" x2="112" y2="31" stroke="#365957" strokeWidth="1.8" />
            <line x1="76" y1="41" x2="108" y2="39" stroke="#365957" strokeWidth="1.8" />
            {state.loggedIds.length > 1 && (
              <line x1="76" y1="49" x2="110" y2="47" stroke="#365957" strokeWidth="1.8" />
            )}
          </motion.g>
        )}
      </g>

      {/* Old Geographer with magnifying glass & quill */}
      <g transform="translate(180, 102)">
        <path d="M10 24 L32 24 L36 56 L6 56 Z" fill="#2E4A4B" />
        <circle cx="21" cy="15" r="8.5" fill="#EBD0B5" />
        <path d="M13 18 Q21 32 29 18 Z" fill="#EAE4DC" />
        {/* Glasses */}
        <circle cx="17" cy="14" r="3" fill="none" stroke="#E8C468" strokeWidth="1.1" />
        <circle cx="24" cy="14" r="3" fill="none" stroke="#E8C468" strokeWidth="1.1" />
        {/* Feather quill */}
        <path d="M36 44 L50 22" stroke="#F4EFE6" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* 8. PLANETA TERRA — DESTINO FINAL */
function EarthArt({ state }: { state: PlanetVisualState['earth'] }) {
  // Fox moves closer at each taming step (0 -> 3)
  const foxOffsets = [96, 62, 34, 10];
  const foxX = foxOffsets[Math.min(3, state.tamingStep)];
  const isTamed = state.tamingStep >= 3;

  return (
    <g>
      {/* Golden secret halo when Fox is tamed */}
      {isTamed && (
        <motion.circle
          cx="200"
          cy="185"
          r="110"
          fill="none"
          stroke="#F5DC93"
          strokeWidth="1.5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.45 }}
          transition={{ duration: 1.2 }}
          style={{ transformOrigin: '200px 185px' }}
        />
      )}

      {/* Larger Earth horizon with desert & golden wheat fields */}
      <circle cx="200" cy="252" r="112" fill="url(#earth-surface)" filter="url(#watercolor-soft)" />

      {/* Golden wheat stalks swaying softly */}
      <g transform="translate(132, 134)" opacity="0.85">
        {[0, 12, 24, 36, 48, 60, 72, 84, 96, 108].map((x, idx) => (
          <motion.path
            key={idx}
            d={`M${x} 30 Q${x + 2} 16 ${x + 4} 5`}
            stroke="#E8C468"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3.4, delay: idx * 0.15, repeat: Infinity }}
            style={{ transformOrigin: `${x}px 30px` }}
          />
        ))}
      </g>

      {/* Distant Aviator biplane silhouette on the left dune */}
      <g transform="translate(106, 174)" opacity="0.65">
        <line x1="0" y1="8" x2="24" y2="8" stroke="#303952" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="4" y1="2" x2="20" y2="2" stroke="#303952" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="2" x2="12" y2="12" stroke="#303952" strokeWidth="1.5" />
      </g>

      {/* Little Prince seated quietly */}
      <g transform="translate(154, 114)">
        <path d="M12 22 Q-4 20 -12 26 Q-5 31 8 27" fill="url(#prince-scarf)" />
        <path d="M7 22 L21 22 L23 48 L5 48 Z" fill="#46735B" />
        <circle cx="14" cy="13" r="8" fill="#F5D7B8" />
        <path d="M6 12 Q8 2 16 3 Q23 4 22 12 Q18 8 14 9 Q10 8 6 12 Z" fill="#F2C864" />
      </g>

      {/* The Fox stepping closer smoothly */}
      <motion.g
        animate={{ x: 174 + foxX, y: 136 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Fluffy tail */}
        <path d="M22 22 Q36 12 34 26 Q30 30 20 26 Z" fill="#E37B42" />
        <path d="M31 18 Q36 14 34 23 Z" fill="#FAF0E4" />
        {/* Fox body */}
        <ellipse cx="14" cy="23" rx="10" ry="7" fill="#D96B34" />
        {/* Head & ears */}
        <circle cx="6" cy="15" r="6.5" fill="#E37B42" />
        <path d="M2 10 L4 3 L8 10 Z" fill="#D96B34" />
        <path d="M7 10 L10 3 L12 10 Z" fill="#D96B34" />
        {/* Golden heart glow between Prince & Fox once tamed */}
        {isTamed && (
          <motion.circle
            cx="-14"
            cy="2"
            r="4"
            fill="#F5DC93"
            filter="url(#glow-gold)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.35, 1], opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.g>

      {/* Subtle golden serpent silhouette curving lower right */}
      <path
        d="M254 216 Q266 206 274 216 Q282 224 292 214"
        fill="none"
        stroke="#E8C468"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  );
}
