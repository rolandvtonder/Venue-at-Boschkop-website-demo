import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {contact, nav, socials} from '../content';
import {href, samePage} from '../lib/nav';

/**
 * The menu: three slabs wipe in from the right one after another (ink, lime,
 * paper); the paper one stays and holds the items. Hovering an item ripples
 * it like heat haze over the lawn — an SVG turbulence + displacement filter
 * whose strength and phase are animated per frame.
 */
export function Menu({open, onClose}: {open: boolean; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);
  const here = typeof location === 'undefined' ? '/' : location.pathname;

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 9).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    // Move focus into the menu once the paper slab has arrived.
    const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 450);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: ink → lime → paper, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} inert={!open}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/40 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-ink')} style={delay(0)} />
      <div className={slab('bg-lime')} style={delay(1)} />
      <nav
        id="site-menu"
        className={slab('on-paper flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-28 pb-8 text-ink md:px-12')}
        style={delay(2)}
        aria-label="Main menu"
      >
        <ul onMouseLeave={() => setHover(-1)}>
          {nav.map((item, i) => {
            const current = samePage(here, href(item.href));
            return (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'} as CSSProperties}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={href(item.href)}
                  aria-current={current ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(-1)}
                  onClick={onClose}
                  className={`display relative inline-flex items-center gap-3 py-1 text-[clamp(34px,3.4vw,52px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  }`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {current && <span aria-hidden className="size-2.5 rounded-full bg-moss" />}
                  <span className={current ? 'it' : ''}>{item.label}</span>
                  <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-muted">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>
        <div className={`mt-10 space-y-5 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <p className="caps text-muted">Call or WhatsApp</p>
            <a href={`tel:${contact.tel}`} className="display text-[26px] hover:text-moss">
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="caps text-muted">Follow</p>
            <div className="mt-1 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" className="caps text-ink hover:text-moss">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
