import { AnimatePresence, motion } from 'motion/react';

interface BirdTransitionOverlayProps {
  direction: 'forward' | 'backward' | null;
}

const BIRDS = [
  { id: 1, yOffset: -52, scale: 1.05, delay: 0 },
  { id: 2, yOffset: -18, scale: 0.88, delay: 0.05 },
  { id: 3, yOffset: 16, scale: 1.12, delay: 0.08 },
  { id: 4, yOffset: -36, scale: 0.72, delay: 0.12 },
  { id: 5, yOffset: 48, scale: 0.82, delay: 0.15 },
  { id: 6, yOffset: 2, scale: 0.68, delay: 0.19 },
];

export function BirdTransitionOverlay({ direction }: BirdTransitionOverlayProps) {
  const isForward = direction !== 'backward';

  return (
    <AnimatePresence>
      {direction && (
        <motion.div
          key={direction}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
        >
          {/* Soft golden wind ribbon */}
          <motion.div
            initial={{ x: isForward ? '-60vw' : '60vw', opacity: 0 }}
            animate={{ x: isForward ? '60vw' : '-60vw', opacity: [0, 0.35, 0] }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="absolute h-48 w-[70vw] rounded-full bg-gradient-to-r from-transparent via-[#E8C468]/15 to-transparent blur-2xl"
          />

          {/* Flock of migratory birds */}
          <div className="relative h-44 w-full">
            {BIRDS.map((bird) => (
              <motion.div
                key={bird.id}
                initial={{
                  x: isForward ? '-15vw' : '115vw',
                  y: `calc(50% + ${bird.yOffset}px)`,
                  opacity: 0,
                  scale: bird.scale,
                }}
                animate={{
                  x: isForward ? '115vw' : '-15vw',
                  y: `calc(50% + ${bird.yOffset - 24}px)`,
                  opacity: [0, 0.95, 0.95, 0],
                  scale: bird.scale,
                }}
                transition={{
                  duration: 0.74,
                  delay: bird.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute top-0 left-0"
              >
                <svg
                  width="54"
                  height="32"
                  viewBox="0 0 54 32"
                  fill="none"
                  style={{ transform: isForward ? 'scaleX(1)' : 'scaleX(-1)' }}
                >
                  {/* Delicate watercolor bird silhouette */}
                  <path
                    d="M3 19C12 15 20 11 27 16C34 9 43 7 51 11C42 13 35 16 29 22C23 18 13 20 3 19Z"
                    fill="#F5DC93"
                    fillOpacity="0.88"
                  />
                  <path
                    d="M17 15C21 9 27 4 35 3C30 8 27 12 26 16"
                    stroke="#FFF4D1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
