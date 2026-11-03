import type {CSSProperties} from 'react';
import {mount} from '../mount';
import {packages} from '../content';
import {href} from '../lib/nav';
import {ButtonLink, Kicker} from '../components/Bits';
import {Hero} from '../components/Hero';
import {Img} from '../components/Img';
import {Promo} from '../components/Promo';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

function Packages() {
  return (
    <>
      <Hero
        slides={packages.hero.slides}
        lines={packages.hero.lines}
        body={packages.hero.body}
        kicker={<Kicker n="05">Packages</Kicker>}
        alt="Long tables with white chairs set out on the lawn"
      />

      <Promo />

      <section aria-labelledby="packages-title" className="on-paper bg-paper text-ink">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <div data-reveal>
            <Kicker n="01" className="text-moss">
              Venue hire
            </Kicker>
            <h2 id="packages-title" className="display mt-4 text-[clamp(38px,4.4vw,76px)]">
              Choose your <span className="it">occasion.</span>
            </h2>
          </div>

          <ul className="mt-12 grid gap-[3px] md:grid-cols-3">
            {packages.list.map((p, i) => (
              <li key={p.id} data-reveal style={d(i * 0.1)} className="flex flex-col bg-stone/45">
                <div className="aspect-[16/10] overflow-hidden">
                  <Img name={p.image} alt="" sizes="(max-width: 767px) 100vw, 33vw" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <p className="caps text-muted">{p.bestFor}</p>
                  <h3 className="display mt-2 text-[clamp(38px,3.2vw,56px)]">{p.name}</h3>
                  <p className="mt-4 border-y border-ink/15 py-4">
                    <span className="caps block text-muted">Price</span>
                    <span className="display block text-[30px] text-moss">{p.price ?? 'On request'}</span>
                  </p>
                  <h4 className="caps mt-6 text-muted">Includes</h4>
                  <ul className="mt-2 flex-1 space-y-2">
                    {p.includes.map((x) => (
                      <li key={x} className="prose-body flex gap-3 text-[16px]">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-moss" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ButtonLink href={href(`/contact/?event=${p.id}`)} lead="Request a" word="quote" tone="ink" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="extras-title" className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:grid-cols-[1fr_1.3fr] md:px-14 md:py-32">
          <div data-reveal>
            <Kicker n="02" className="text-lime">
              Add-ons
            </Kicker>
            <h2 id="extras-title" className="display mt-4 text-[clamp(38px,4.4vw,76px)]">
              Make it <span className="it">extra.</span>
            </h2>
            <p className="prose-body mt-6 max-w-[420px] text-paper/80">
              Add rides, inflatables and decor to any booking. Inflatables can also be hired for parties at home in Pretoria east.
            </p>
          </div>
          <dl data-reveal style={d(0.1)} className="border-t border-paper/15">
            {packages.extras.map(([name, price]) => (
              <div key={name} className="flex items-baseline justify-between gap-6 border-b border-paper/15 py-5">
                <dt className="display text-[clamp(26px,2.4vw,38px)]">{name}</dt>
                <dd className="caps text-paper/70">{price ?? 'On request'}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="on-paper bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:grid-cols-[1fr_1.3fr] md:px-14 md:py-32">
          <div data-reveal>
            <Kicker n="03" className="text-moss">
              Good to know
            </Kicker>
            <h2 id="faq-title" className="display mt-4 text-[clamp(38px,4.4vw,76px)]">
              Questions <span className="it">&amp; answers.</span>
            </h2>
          </div>
          <div data-reveal style={d(0.1)} className="border-t border-ink/15">
            {packages.faq.map(([q, a]) => (
              <details key={q} className="group border-b border-ink/15">
                <summary className="flex min-h-14 items-center justify-between gap-6 py-5">
                  <span className="display text-[clamp(24px,2.2vw,34px)]">{q}</span>
                  <span aria-hidden className="text-[26px] leading-none text-moss transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="prose-body max-w-[620px] pb-6 text-ink/85">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

mount(<Packages />);
