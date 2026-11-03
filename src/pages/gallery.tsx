import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import {mount} from '../mount';
import {contact, gallery, galleryTags, type GalleryTag} from '../content';
import {Arrow, ButtonLink, Kicker} from '../components/Bits';
import {Hero} from '../components/Hero';
import {Img} from '../components/Img';
import {lockScroll} from '../lib/scroll';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

function Gallery() {
  const [tag, setTag] = useState<GalleryTag | 'All'>('All');
  const [open, setOpen] = useState(-1);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const photos = tag === 'All' ? gallery.photos : gallery.photos.filter(([, t]) => t === tag);
  const count = (t: GalleryTag) => gallery.photos.filter(([, x]) => x === t).length;

  const show = (i: number, from: HTMLButtonElement) => {
    opener.current = from;
    setOpen(i);
    dialog.current?.showModal();
    lockScroll(true);
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback((by: number) => setOpen((i) => (i + by + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const el = dialog.current!;
    const onClose = () => {
      setOpen(-1);
      lockScroll(false);
      opener.current?.focus({preventScroll: true});
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    el.addEventListener('close', onClose);
    el.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('close', onClose);
      el.removeEventListener('keydown', onKey);
    };
  }, [step]);

  const current = open >= 0 ? photos[open] : null;

  return (
    <>
      <Hero
        slides={gallery.hero.slides}
        lines={gallery.hero.lines}
        body={gallery.hero.body}
        kicker={<Kicker n="04">Gallery</Kicker>}
        alt="String lights between the trees above an evening party"
      />

      <section aria-labelledby="gallery-title" className="on-paper bg-paper text-ink">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-14 md:py-24">
          <h2 id="gallery-title" className="sr-only">
            Photos
          </h2>
          <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
            {(['All', ...galleryTags] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tag === t}
                onClick={() => setTag(t)}
                className={`caps min-h-11 border px-5 py-2.5 transition-colors duration-300 ${
                  tag === t ? 'border-ink bg-ink text-paper' : 'border-ink/25 text-ink hover:border-ink'
                }`}
              >
                {t} <span className="tabular-nums opacity-60">{t === 'All' ? gallery.photos.length : count(t)}</span>
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {photos.length} photos
          </p>

          <ul key={tag} className="mt-10 columns-2 gap-[6px] md:columns-3 xl:columns-4">
            {photos.map(([name, , alt], i) => (
              <li key={name} data-reveal style={d((i % 4) * 0.05)} className="mb-[6px] break-inside-avoid">
                <button type="button" onClick={(e) => show(i, e.currentTarget)} className="group block w-full overflow-hidden bg-stone" aria-label={`Open photo: ${alt}`}>
                  <Img
                    name={name}
                    alt=""
                    sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
                    className="h-auto w-full transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04]"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col items-start gap-5 border-t border-ink/15 pt-10 md:flex-row md:items-center md:justify-between">
            <p className="display text-[clamp(30px,3vw,48px)]">
              More on our <span className="it">socials.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={contact.facebook} lead="Follow on" word="Facebook" tone="ink" external />
              <ButtonLink href={contact.instagram} lead="Follow on" word="Instagram" tone="lime" external />
            </div>
          </div>
        </div>
      </section>

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-paper"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between px-4 py-4 md:px-8">
              <p className="caps tabular-nums text-paper/70" aria-live="polite">
                {open + 1} / {photos.length}
              </p>
              <button type="button" onClick={close} className="caps flex min-h-12 items-center gap-3 bg-paper px-5 text-ink hover:bg-lime" autoFocus>
                Close <span aria-hidden className="rotate-45 text-[18px]">+</span>
              </button>
            </div>
            <figure className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 md:px-24" onClick={(e) => e.target === e.currentTarget && close()}>
              <Img key={current[0]} name={current[0]} alt={current[2]} sizes="100vw" priority className="max-h-[78dvh] w-auto max-w-full object-contain" />
              <figcaption className="caps mt-4 text-center text-paper/75">{current[2]}</figcaption>
            </figure>
            <div className="flex justify-center gap-3 pb-6">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="flex size-12 items-center justify-center border border-paper/30 hover:border-lime hover:text-lime">
                <Arrow className="rotate-180" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className="flex size-12 items-center justify-center border border-paper/30 hover:border-lime hover:text-lime">
                <Arrow />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

mount(<Gallery />);
