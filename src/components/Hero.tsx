import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from 'react';
import type {Line} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import type {MediaName} from '../lib/nav';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Lines} from './Bits';
import {Img} from './Img';

const INTERVAL = 6500;
// Where each slide's slow zoom heads, so consecutive photos drift differently.
const ORIGINS = [
  ['30%', '40%'],
  ['70%', '55%'],
  ['50%', '30%'],
  ['35%', '65%'],
  ['65%', '35%'],
];

/**
 * Photo slideshow behind a big mixed upright/italic headline. Photos
 * cross-fade with a slow zoom; as you scroll on, the whole stage blurs, dims
 * and sinks back as the page transition (written per frame, no React state).
 *
 * `full` is the home page (full screen, headline top-left); `page` is the
 * shorter hero on the inner pages, headline at the bottom.
 */
export function Hero({
  slides,
  lines,
  body,
  kicker,
  size = 'page',
  alt,
  children,
}: {
  slides: MediaName[];
  lines: Line[];
  body: string;
  kicker?: ReactNode;
  size?: 'full' | 'page';
  alt: string;
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const many = slides.length > 1;
  const [{cur, prev}, setPair] = useState({cur: 0, prev: -1});
  const [paused, setPaused] = useState(reduced);

  useEffect(() => setPaused(reduced), [reduced]);

  // One timer per photo, restarted on every change, so a photo picked from
  // the controls gets its full time on screen.
  useEffect(() => {
    if (!many || paused) return;
    const t = window.setTimeout(() => setPair({cur: (cur + 1) % slides.length, prev: cur}), INTERVAL);
    return () => window.clearTimeout(t);
  }, [many, paused, cur, slides.length]);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        if (!el || !stage.current) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0) return;
        const p = clamp(-r.top / r.height);
        stage.current.style.transform = `translate3d(0, ${(p * r.height * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        stage.current.style.filter = p > 0.01 ? `blur(${(p * 16).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  const full = size === 'full';

  return (
    <section
      ref={root}
      id="top"
      className={`relative overflow-hidden bg-ink ${full ? 'h-svh min-h-[640px]' : 'h-[82svh] min-h-[560px]'}`}
      aria-roledescription={many ? 'carousel' : undefined}
      aria-label={many ? 'Photos of the venue' : undefined}
    >
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {slides.map((name, i) => {
          const state = i === cur ? 'active' : i === prev ? 'leaving' : 'idle';
          const [ox, oy] = ORIGINS[i % ORIGINS.length];
          return (
            <div
              key={name}
              data-state={state}
              className={`absolute inset-0 ${
                state === 'active' ? 'z-[2] opacity-100 transition-opacity duration-[1600ms] ease-in-out' : state === 'leaving' ? 'z-[1] opacity-100' : 'z-0 opacity-0'
              }`}
              aria-hidden={i !== cur}
            >
              <Img
                name={name}
                alt={i === 0 ? alt : ''}
                priority={i === 0}
                className="kb h-full w-full object-cover"
                style={{'--ox': ox, '--oy': oy} as CSSProperties}
              />
            </div>
          );
        })}
        <div
          className={`absolute inset-0 z-[3] ${
            full
              ? 'bg-[linear-gradient(90deg,rgb(12_14_9/0.7),rgb(12_14_9/0.15)_60%,transparent),linear-gradient(0deg,rgb(12_14_9/0.55),transparent_35%)]'
              : 'bg-[linear-gradient(0deg,rgb(12_14_9/0.85),rgb(12_14_9/0.2)_55%,rgb(12_14_9/0.35))]'
          }`}
        />

        <div
          className={`absolute inset-0 z-[4] mx-auto flex max-w-[1680px] flex-col px-5 md:px-14 ${
            full ? 'pt-[clamp(120px,17vh,180px)]' : 'justify-end pb-[clamp(56px,9vh,104px)]'
          }`}
        >
          {kicker && <div className="mb-6 text-lime">{kicker}</div>}
          <h1
            className={`display text-paper drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)] ${
              full ? 'text-[clamp(50px,7.6vw,138px)]' : 'text-[clamp(48px,6.6vw,120px)]'
            }`}
          >
            <Lines lines={lines} indentFirst={full} />
          </h1>
          <p className={`prose-body mt-8 max-w-[420px] text-paper/90 ${full ? 'md:ml-[clamp(0px,17vw,300px)]' : ''}`}>{body}</p>
          {children}
        </div>
      </div>

      {/* Slideshow controls: play/pause, one segment per photo (the current one
          fills over the interval; click any to jump), and the photo count. */}
      {many && (
        <div className="absolute bottom-4 left-4 z-[5] flex min-h-12 items-center gap-1 bg-ink/55 pr-4 backdrop-blur-md md:bottom-7 md:left-14 md:gap-3 md:pr-5">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            className="flex size-12 shrink-0 items-center justify-center text-paper transition-colors hover:bg-lime hover:text-ink"
          >
            {paused ? (
              <svg aria-hidden viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            ) : (
              <svg aria-hidden viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            )}
          </button>

          <ol className="hidden items-center sm:flex" aria-label="Choose a photo">
            {slides.map((name, i) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => setPair(({cur}) => (i === cur ? {cur, prev: -1} : {cur: i, prev: cur}))}
                  aria-label={`Show photo ${i + 1} of ${slides.length}`}
                  aria-current={i === cur ? 'true' : undefined}
                  className="group flex h-12 w-9 items-center px-1"
                >
                  <span className="relative block h-[2px] w-full overflow-hidden bg-paper/30 transition-colors group-hover:bg-paper/60">
                    {i === cur && (
                      <span
                        key={`${cur}-${paused}`}
                        className={`absolute inset-0 origin-left bg-lime ${paused ? '' : 'animate-[fill_var(--slide)_linear_forwards]'}`}
                        style={{'--slide': `${INTERVAL}ms`} as CSSProperties}
                      />
                    )}
                    {i < cur && <span className="absolute inset-0 bg-paper/70" />}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <p className="caps flex items-baseline gap-1.5 text-paper" aria-live={paused ? 'polite' : 'off'} aria-atomic>
            <span className="sr-only">Photo </span>
            <span className="display text-[20px] tabular-nums tracking-normal text-lime">{String(cur + 1).padStart(2, '0')}</span>
            <span aria-hidden className="text-paper/50">/</span>
            <span className="sr-only"> of </span>
            <span className="tabular-nums text-paper/70">{String(slides.length).padStart(2, '0')}</span>
          </p>
        </div>
      )}
    </section>
  );
}
