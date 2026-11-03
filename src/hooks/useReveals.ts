import {useEffect, useRef} from 'react';

/**
 * Watches every `[data-reveal]` element inside the returned ref's element and
 * adds `.is-in` the first time each one is seen.
 *
 * A MutationObserver picks up elements that mount later (a gallery filter,
 * hot reload), so nothing is ever left stuck in its hidden state.
 */
export function useReveals<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      {rootMargin: '0px 0px -8% 0px'},
    );

    const watch = () =>
      root.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    watch();

    const mo = new MutationObserver(watch);
    mo.observe(root, {childList: true, subtree: true});

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return ref;
}
