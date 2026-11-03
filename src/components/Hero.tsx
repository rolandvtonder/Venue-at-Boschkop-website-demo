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

  // One timer per photo. With reduced motion the first photo simply stays.
  useEffect(() => {
    if (!many || reduced) return;
    const t = window.setTimeout(() => setPair({cur: (cur + 1) % slides.length, prev: cur}), INTERVAL);
    return () => window.clearTimeout(t);
  }, [many, reduced, cur, slides.length]);

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

    </section>
  );
}
