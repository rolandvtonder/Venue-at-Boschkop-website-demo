import type {CSSProperties} from 'react';
import {mount} from '../mount';
import {home} from '../content';
import {href} from '../lib/nav';
import {Arrow, ButtonLink, Kicker, Lines} from '../components/Bits';
import {Hero} from '../components/Hero';
import {Img} from '../components/Img';
import {Promo} from '../components/Promo';
import {Spaces} from '../components/Spaces';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

function Home() {
  return (
    <>
      <Hero
        size="full"
        slides={home.hero.slides}
        lines={home.hero.lines}
        body={home.hero.body}
        alt="Guests at long tables on the lawn under string lights at Venue at Boschkop"
      />

      <section aria-labelledby="intro-title" className="on-paper bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-14 px-5 py-24 md:grid-cols-[1.2fr_1fr] md:px-14 md:py-36">
          <div data-reveal>
            <Kicker className="text-moss">Welcome to Boschkop</Kicker>
            <h2 id="intro-title" className="display mt-6 text-[clamp(46px,6vw,110px)]">
              <Lines lines={home.intro.lines} />
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-10">
            <p data-reveal style={d(0.1)} className="prose-body max-w-[520px] text-[19px] text-ink/85">
              {home.intro.body}
            </p>
            <dl data-reveal style={d(0.2)} className="grid grid-cols-3 gap-4 border-t border-ink/15 pt-6">
              {home.intro.facts.map(([n, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="display block text-[clamp(30px,3vw,48px)] text-moss">{n}</span>
                    <span className="caps mt-1 block text-muted">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div data-reveal style={d(0.3)}>
              <ButtonLink href={href('/venue/')} lead="Explore the" word="venue" tone="ink" />
            </div>
          </div>
        </div>
      </section>

      <Spaces />

      <section aria-labelledby="farm-title" className="bg-ink text-paper">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div data-reveal>
              <Kicker n="02" className="text-lime">
                On the farm
              </Kicker>
              <h2 id="farm-title" className="display mt-4 text-[clamp(38px,4.4vw,76px)]">
                Something for <span className="it">everyone.</span>
              </h2>
            </div>
            <a data-reveal href={href('/events/')} className="caps inline-flex items-center gap-3 text-paper/80 hover:text-lime">
              All events &amp; extras <Arrow />
            </a>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-[3px] md:grid-cols-3">
            {home.activities.map((a, i) => (
              <li key={a.label} data-reveal style={d((i % 3) * 0.08)} className="group relative aspect-[4/5] overflow-hidden bg-olive md:aspect-[4/3]">
                <Img
                  name={a.image}
                  alt=""
                  sizes="(max-width: 767px) 50vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(12_14_9/0.75),transparent_55%)]" />
                <p className="display absolute bottom-4 left-4 text-[clamp(24px,2.4vw,40px)] md:bottom-6 md:left-6">{a.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Promo />

      <section aria-labelledby="explore-title" className="on-paper bg-paper text-ink">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <Kicker n="03" className="text-moss">
            Plan your day
          </Kicker>
          <h2 id="explore-title" className="sr-only">
            Explore the site
          </h2>
          <ul className="mt-8 border-t border-ink/15">
            {home.explore.map((e, i) => (
              <li key={e.href} data-reveal style={d(i * 0.06)} className="border-b border-ink/15">
                <a href={href(e.href)} className="group flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 md:py-8">
                  <span className="display text-[clamp(44px,6vw,104px)] transition-[font-style,color] duration-300 group-hover:text-moss group-hover:italic">
                    {e.label}
                  </span>
                  <span className="caps flex items-center gap-4 text-muted">
                    {e.note}
                    <Arrow className="transition-transform duration-300 ease-silk group-hover:translate-x-2" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

mount(<Home />);
