import type {CSSProperties} from 'react';
import {mount} from '../mount';
import {events} from '../content';
import {href} from '../lib/nav';
import {ButtonLink, Kicker} from '../components/Bits';
import {Hero} from '../components/Hero';
import {Img} from '../components/Img';
import {Promo} from '../components/Promo';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

function Events() {
  return (
    <>
      <Hero
        slides={events.hero.slides}
        lines={events.hero.lines}
        body={events.hero.body}
        kicker={<Kicker n="03">Events</Kicker>}
        alt="An evening celebration under string lights at Venue at Boschkop"
      />

      {/* Jump links to each kind of event */}
      <nav aria-label="Event types" className="on-paper border-b border-ink/10 bg-paper text-ink max-md:hidden">
        <ul className="mx-auto flex max-w-[1680px] flex-wrap gap-x-8 gap-y-2 px-14 py-5">
          {events.types.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="caps whitespace-nowrap text-ink/70 hover:text-moss">
                0{i + 1} {t.kicker}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="on-paper bg-paper text-ink">
        {events.types.map((t, i) => (
          <section key={t.id} id={t.id} aria-labelledby={`${t.id}-title`} className="mx-auto max-w-[1680px] scroll-mt-16 px-5 py-20 md:px-14 md:py-28">
            <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
              <div className="md:sticky md:top-28 md:self-start">
                <Kicker n={`0${i + 1}`} className="text-moss">
                  {t.kicker}
                </Kicker>
                <h2 id={`${t.id}-title`} data-reveal className="display mt-5 text-[clamp(46px,5.4vw,100px)]">
                  <span className="block">{t.title[0]}</span>
                  <span className="it block">{t.title[1]}</span>
                </h2>
                <p data-reveal style={d(0.1)} className="prose-body mt-6 max-w-[500px] text-ink/85">
                  {t.body}
                </p>
                <h3 className="caps mt-10 text-muted">On offer</h3>
                <ul data-reveal style={d(0.2)} className="mt-3 max-w-[500px] border-t border-ink/15">
                  {t.offer.map((o) => (
                    <li key={o} className="prose-body flex gap-4 border-b border-ink/15 py-3 text-[16px]">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-moss" />
                      {o}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href={href(`/contact/?event=${t.cta}`)} lead="Enquire" word="now" tone="ink" />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-[3px] self-start">
                <div data-reveal className="col-span-5 aspect-[4/3] overflow-hidden bg-stone md:col-span-5">
                  <Img name={t.images[0]} alt="" sizes="(max-width: 767px) 100vw, 55vw" className="h-full w-full object-cover" />
                </div>
                <div data-reveal style={d(0.12)} className={`col-span-3 aspect-[4/5] overflow-hidden bg-stone ${i % 2 ? 'col-start-3' : ''}`}>
                  <Img name={t.images[1]} alt="" sizes="(max-width: 767px) 60vw, 33vw" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* The animals */}
      <section aria-labelledby="animals-title" className="bg-ink text-paper">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <div data-reveal>
            <Kicker n="05" className="text-lime">
              Meet the residents
            </Kicker>
            <h2 id="animals-title" className="display mt-4 text-[clamp(38px,4.4vw,76px)]">
              {events.animals.title[0]} <span className="it">{events.animals.title[1]}</span>
            </h2>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-[3px] md:grid-cols-5">
            {events.animals.list.map((a, i) => (
              <li key={a.label} data-reveal style={d(i * 0.07)} className={`relative aspect-[3/4] overflow-hidden bg-olive ${i === 4 ? 'max-md:col-span-2 max-md:aspect-[16/10]' : ''}`}>
                <Img name={a.image} alt={a.label} sizes="(max-width: 767px) 50vw, 20vw" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(12_14_9/0.7),transparent_50%)]" />
                <p className="display absolute bottom-4 left-4 text-[30px]" aria-hidden>
                  {a.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Promo />
    </>
  );
}

mount(<Events />);
