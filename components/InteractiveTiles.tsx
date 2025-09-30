import React, { useEffect, useMemo, useRef, useState } from 'react';

type Tile = {
  id: number;
  rx: number; // random offset x
  ry: number; // random offset y
};

/**
 * InteractiveTiles
 * A responsive grid of cubes that gently assemble as you scroll down,
 * and disassemble when you scroll up. No images required.
 */
const InteractiveTiles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1

  // Generate a stable set of tiles
  const tiles: Tile[] = useMemo(() => {
    const count = 24; // responsive visual density; tuned for aesthetics
    return new Array(count).fill(0).map((_, i) => ({
      id: i,
      rx: (Math.random() - 0.5) * 240, // random scatter px
      ry: (Math.random() - 0.5) * 160,
    }));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const update = () => {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight || 1;
          // progress based on how far the section is revealed
          let raw = Math.min(1, Math.max(0, 1 - rect.top / (vh * 0.9)));
          // smoothstep easing for a more natural timing
          const eased = raw * raw * (3 - 2 * raw);
          setProgress((p) => p + (eased - p) * 0.2);
          raf = requestAnimationFrame(update);
        };
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      },
      { threshold: [0, 1] }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // Minimal, optimized inline SVG icons
  const IconReact = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 text-cyan-300">
      <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="12" cy="12" rx="9" ry="4.5"/>
        <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(120 12 12)"/>
      </g>
    </svg>
  );
  const IconTS = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="16" rx="3" className="fill-blue-600"/>
      <text x="12" y="16" textAnchor="middle" className="fill-white" fontFamily="Inter,system-ui" fontSize="9" fontWeight="700">TS</text>
    </svg>
  );
  const IconNode = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 text-green-500">
      <path d="M12 2 20 7v10l-8 5-8-5V7z" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 9v6l6-3V6z" fill="currentColor" opacity="0.2"/>
    </svg>
  );
  const IconNext = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 text-gray-200">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 16l8-8" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
  const IconTailwind = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 text-cyan-400">
      <path d="M4 12c2-4 4-6 8-6 4 0 6 2 8 6-2 4-4 6-8 6-4 0-6-2-8-6zm8-3c-2 0-3 1-4 3 1 2 2 3 4 3 2 0 3-1 4-3-1-2-2-3-4-3z" fill="currentColor"/>
    </svg>
  );
  const IconPostgres = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 text-sky-400">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 13c2 2 6 2 8 0M9 10c1-1 5-1 6 0" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    </svg>
  );
  const IconDocker = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 text-sky-500">
      <rect x="8" y="8" width="3" height="3" rx="0.5" fill="currentColor"/>
      <rect x="12" y="8" width="3" height="3" rx="0.5" fill="currentColor"/>
      <rect x="8" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
      <rect x="12" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
      <path d="M4 15h16c0 2-2 4-6 4H9c-3 0-5-2-5-4z" fill="currentColor" opacity="0.2"/>
    </svg>
  );
  const ICONS = [IconReact, IconTS, IconNode, IconNext, IconTailwind, IconPostgres, IconDocker];

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="mx-auto max-w-5xl px-2 sm:px-4">
        <div
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 py-8 sm:py-10"
          aria-label="Decorative assembling tiles"
        >
          {tiles.map((t, idx) => {
            // each tile lerps from random scatter to identity based on progress
            const tx = (1 - progress) * t.rx;
            const ty = (1 - progress) * t.ry;
            const r = (1 - progress) * (idx % 2 ? 8 : -8);
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={t.id}
                className="aspect-square rounded-2xl ring-1 ring-gray-800/40 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.5)] bg-[#0b0f16] relative overflow-hidden flex items-center justify-center"
                style={{ transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${r}deg)`, transition: 'transform 120ms linear' }}
                aria-hidden="true"
              >
                <div className="scale-110 opacity-90">
                  <Icon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTiles;


