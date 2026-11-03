import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {brand} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useReveals} from '../hooks/useReveals';
import {go, href, media, mediaSize, samePage} from '../lib/nav';
import {onFrame, scrollToHash, startScroll} from '../lib/scroll';
import {Curtain} from './Curtain';
import {Footer} from './Footer';
import {Menu} from './Menu';

/**
 * Everything every page shares: the logo, the menu button and menu, the
 * "Book your date" box, the footer, the page curtain and the grain. Also
 * routes clicks on internal links: same-page hashes glide with Lenis, other
 * pages leave through the curtain.
 */
export function Layout({children, bookCta = true}: {children: ReactNode; bookCta?: boolean}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const logoLink = useRef<HTMLAnchorElement>(null);
  const main = useReveals<HTMLElement>();
  useEffect(() => startScroll(reduced), [reduced]);

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus({preventScroll: true});
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a');
      if (!a || a.target || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      if (samePage(url.pathname, location.pathname)) {
        setOpen(false);
        window.setTimeout(() => scrollToHash(url.hash || '#top'), open ? 450 : 0);
      } else {
        setOpen(false);
        go(url.href);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  // Arriving on a deep link like /venue/#tinroof.
  useEffect(() => {
    if (!location.hash) return;
    const t = window.setTimeout(() => scrollToHash(location.hash, true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Check what sits under the logo a few times a second (from the shared
  // rAF loop, no React state) and flip its tone to stay legible.
  useEffect(() => {
    let n = 0;
    return onFrame(() => {
      const a = logoLink.current;
      if (!a || n++ % 6) return;
      const r = a.getBoundingClientRect();
      const under = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2).find((e) => !a.contains(e));
      const tone = under?.closest('.on-paper') ? 'ink' : 'lime';
      if (a.dataset.tone !== tone) a.dataset.tone = tone;
    });
  }, []);

  const logo = mediaSize('logo');
  const onContact = samePage(location.pathname, href('/contact/'));

  return (
    <>
      <a
        href="#main"
        className="caps fixed top-3 left-3 z-[80] -translate-y-24 bg-lime px-4 py-3 text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      {/* The logo: lime over photos and dark sections, ink over paper and lime ones. */}
      <a
        ref={logoLink}
        href={href('/')}
        aria-label={`${brand.name} home`}
        data-tone="lime"
        className="group fixed top-3 left-4 z-[55] block transition-transform duration-500 ease-silk hover:scale-[1.03] md:top-5 md:left-10"
      >
        <img
          src={media('logo-lime.png')}
          width={logo.w}
          height={logo.h}
          alt=""
          className="h-14 w-auto drop-shadow-[0_2px_12px_rgb(0_0_0/0.6)] transition-opacity duration-300 group-data-[tone=ink]:opacity-0 md:h-20"
        />
        <img
          src={media('logo-ink.png')}
          width={logo.w}
          height={logo.h}
          alt=""
          className="absolute inset-0 h-14 w-auto opacity-0 transition-opacity duration-300 group-data-[tone=ink]:opacity-100 md:h-20"
        />
      </a>

      <button
        ref={menuButton}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-4 right-4 z-[55] flex min-h-12 items-center gap-4 px-6 py-3.5 backdrop-blur-md transition-colors duration-500 md:top-9 md:right-8 ${
          open ? 'bg-ink text-paper' : 'bg-ink/70 text-paper hover:bg-ink'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <main id="main" ref={main}>
        {children}
      </main>
      <Footer />

      {bookCta && !onContact && (
        <a
          href={href('/contact/')}
          className={`caps fixed right-4 bottom-4 z-[55] flex min-h-12 items-center px-7 py-4 shadow-[0_10px_40px_rgb(0_0_0/0.25)] transition-colors duration-500 md:right-8 md:bottom-7 ${
            open ? 'bg-ink text-paper' : 'bg-lime text-ink hover:bg-paper'
          }`}
        >
          Book your&nbsp;<em className="text-[14px] normal-case tracking-normal">date</em>
        </a>
      )}

      <Menu open={open} onClose={close} />
      <Curtain reduced={reduced} />
      <div className="grain" aria-hidden />
    </>
  );
}
