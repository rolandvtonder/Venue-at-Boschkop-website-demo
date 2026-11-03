import type {CSSProperties} from 'react';
import {mount} from '../mount';
import {contact, spaces, venue} from '../content';
import {href} from '../lib/nav';
import {ButtonLink, Kicker, Lines} from '../components/Bits';
import {Hero} from '../components/Hero';
import {Img} from '../components/Img';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

function Venue() {
  return (
    <>
      <Hero
        slides={venue.hero.slides}
        lines={venue.hero.lines}
        body={venue.hero.body}
        kicker={<Kicker n="02">The venue</Kicker>}
        alt="Tables on the lawn among old trees at Venue at Boschkop"
      />

      {/* The three spaces, alternating sides */}
      <div className="on-paper bg-paper text-ink">
        {spaces.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="mx-auto max-w-[1680px] scroll-mt-6 px-5 py-20 md:px-14 md:py-28">
            <div className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div data-reveal className="relative">
                <Img name={s.image} alt={`The ${s.name.join(' ')}`} sizes="(max-width: 767px) 100vw, 50vw" className="aspect-[4/5] w-full object-cover" />
                <Img
                  name={s.extra}
                  alt=""
                  sizes="30vw"
                  className={`absolute -bottom-10 hidden aspect-square w-[42%] border-8 border-paper object-cover md:block ${i % 2 ? '-left-10' : '-right-10'}`}
                />
              </div>
              <div className={i % 2 ? 'md:pr-10' : 'md:pl-10'}>
                <Kicker n={`0${i + 1}`} className="text-moss" >
                  Space
                </Kicker>
                <h2 id={`${s.id}-title`} data-reveal className="display mt-5 text-[clamp(52px,6vw,112px)]">
                  <span className="block">{s.name[0]}</span>
                  <span className="it block">{s.name[1]}</span>
                </h2>
                <p data-reveal style={d(0.1)} className="prose-body mt-6 max-w-[520px] text-ink/85">
                  {s.body}
                </p>
                <ul data-reveal style={d(0.2)} className="mt-8 max-w-[520px] border-t border-ink/15">
                  {s.features.map((f) => (
                    <li key={f} className="prose-body flex gap-4 border-b border-ink/15 py-3 text-[16px]">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-moss" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div data-reveal style={d(0.3)} className="mt-8">
                  <ButtonLink href={href(`/contact/?space=${s.id}`)} lead="Enquire about" word={s.name.join(' ')} tone="ink" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* The grounds */}
      <section aria-labelledby="grounds-title" className="bg-ink text-paper">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <div data-reveal>
            <Kicker n="04" className="text-lime">
              Around the grounds
            </Kicker>
            <h2 id="grounds-title" className="display mt-4 text-[clamp(38px,4.4vw,76px)]">
              Room to <span className="it">roam.</span>
            </h2>
          </div>
          <ul className="mt-12 grid gap-x-[3px] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {venue.grounds.map((g, i) => (
              <li key={g.title} data-reveal style={d(i * 0.08)}>
                <div className="aspect-[3/4] overflow-hidden bg-olive">
                  <Img name={g.image} alt="" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="h-full w-full object-cover" />
                </div>
                <h3 className="display mt-5 text-[34px]">{g.title}</h3>
                <p className="prose-body mt-2 max-w-[340px] text-[16px] text-paper/80">{g.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Self-catering */}
      <section aria-labelledby="catering-title" className="on-paper relative overflow-hidden bg-lime text-ink">
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-5 py-24 md:grid-cols-[1.3fr_1fr] md:px-14 md:py-32">
          <div data-reveal>
            <Kicker className="">Self-catering</Kicker>
            <h2 id="catering-title" className="display mt-5 text-[clamp(46px,6vw,110px)]">
              <Lines lines={venue.catering.lines} />
            </h2>
          </div>
          <div data-reveal style={d(0.15)}>
            <p className="prose-body max-w-[460px] text-[19px]">{venue.catering.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={href('/packages/')} lead="See" word="packages" tone="ink" />
            </div>
          </div>
        </div>
      </section>

      {/* Find us */}
      <section aria-labelledby="find-title" className="on-paper bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-10 px-5 py-24 md:grid-cols-2 md:px-14 md:py-28">
          <div data-reveal>
            <Kicker n="05" className="text-moss">
              Find us
            </Kicker>
            <h2 id="find-title" className="display mt-5 text-[clamp(44px,5vw,92px)]">
              <span className="block">3 Boschkop Road,</span>
              <span className="it block">Zwavelpoort.</span>
            </h2>
          </div>
          <div data-reveal style={d(0.1)} className="flex flex-col justify-end gap-6">
            <p className="prose-body max-w-[460px] text-ink/85">
              In Pretoria east, a short drive from the city but a world away. Call or WhatsApp {contact.phone} to arrange a visit.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={contact.maps} lead="Get" word="directions" tone="ink" external />
              <ButtonLink href={href('/contact/')} lead="Check your" word="date" tone="lime" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

mount(<Venue />);
