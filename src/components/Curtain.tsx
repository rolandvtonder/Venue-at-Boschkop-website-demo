import {useEffect, useState, type CSSProperties} from 'react';
import {media, mediaSize, setLeaveHandler} from '../lib/nav';

type Phase = 'cover' | 'gone' | 'ready';

const SLABS = ['bg-lime', 'bg-olive', 'bg-ink'] as const;
const LEAVE_MS = 950;

/**
 * Page transitions: three slabs (lime, olive, ink) wipe in from the right
 * before the browser leaves, and the next page opens by wiping them on out
 * to the left — one continuous right-to-left move across the two pages.
 * The ink slab carries the logo.
 */
export function Curtain({reduced}: {reduced: boolean}) {
  const [phase, setPhase] = useState<Phase>(reduced ? 'gone' : 'cover');

  useEffect(() => {
    if (reduced) {
      setPhase('gone');
      setLeaveHandler(null);
      return;
    }
    // Let the covered first frame paint, then reveal.
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setPhase('gone'));
    });

    setLeaveHandler((url) => {
      setPhase('ready');
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('cover')));
      window.setTimeout(() => location.assign(url), LEAVE_MS);
    });

    // Coming back through the browser's back/forward cache: open again.
    const onShow = (e: PageTransitionEvent) => e.persisted && setPhase('gone');
    window.addEventListener('pageshow', onShow);
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      setLeaveHandler(null);
      window.removeEventListener('pageshow', onShow);
    };
  }, [reduced]);

  const x = phase === 'cover' ? '0%' : phase === 'gone' ? '-104%' : '104%';
  // Covering: lime first, ink last (on top). Revealing: ink leaves first.
  const style = (k: number): CSSProperties => ({
    transform: `translate3d(${x}, 0, 0)`,
    transition: phase === 'ready' || reduced ? 'none' : `transform 700ms var(--ease-wipe) ${(phase === 'cover' ? k : 2 - k) * 0.08}s`,
  });
  const logo = mediaSize('logo');

  return (
    <div aria-hidden className={`fixed inset-0 z-[70] overflow-hidden ${phase === 'gone' ? 'pointer-events-none' : ''}`}>
      {SLABS.map((bg, k) => (
        <div key={bg} className={`absolute inset-0 ${bg} will-change-transform`} style={style(k)}>
          {k === 2 && (
            <img
              src={media('logo-lime.png')}
              width={logo.w}
              height={logo.h}
              alt=""
              className="absolute top-1/2 left-1/2 w-[min(56vw,300px)] -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
      ))}
    </div>
  );
}
