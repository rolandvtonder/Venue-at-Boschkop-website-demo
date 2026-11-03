import Lenis from 'lenis';

/**
 * One rAF loop for the whole page. Lenis advances first, then every
 * scroll-driven component reads its own rect and writes styles directly —
 * nothing here goes through React state, so scrolling never re-renders.
 */

type Tick = (time: number) => void;

const subscribers = new Set<Tick>();
let lenis: Lenis | null = null;

export function startScroll(reducedMotion: boolean): () => void {
  if (!reducedMotion) {
    lenis = new Lenis({lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9});
  }

  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    subscribers.forEach((fn) => fn(time));
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function onFrame(fn: Tick): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

/** Freezes the page behind a modal (the gallery lightbox). */
export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
}

/**
 * Smooth-scrolls to an in-page hash like `#tinroof`, or to the top for
 * `#top`. Focus follows, so keyboard and screen-reader users land there too.
 */
export function scrollToHash(hash: string, immediate = false) {
  const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, {duration: 1.4, immediate, offset: typeof target === 'number' ? 0 : -24});
  } else if (typeof target === 'number') {
    window.scrollTo({top: target});
  } else {
    target.scrollIntoView();
  }
  if (typeof target !== 'number') {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({preventScroll: true});
  }
  history.replaceState(null, '', hash === '#top' ? location.pathname + location.search : hash);
}
