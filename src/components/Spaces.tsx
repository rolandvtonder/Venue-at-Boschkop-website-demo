import {useEffect, useRef, useState} from 'react';
import {spaces} from '../content';
import {href} from '../lib/nav';
import {Arrow, Kicker} from './Bits';
import {Img} from './Img';

/**
 * The three spaces: tall panels slide in from the right one after another
 * when the section comes into view (the reference's fleet), each with its
 * own photo, name and two facts. Each links to its part of the venue page.
 */
export function Spaces() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      {threshold: 0.2},
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="spaces" aria-labelledby="spaces-title" className="relative bg-ink">
      <div className="mx-auto flex max-w-[1680px] items-end justify-between gap-6 px-5 pt-24 pb-8 md:px-14">
        <div>
          <Kicker n="01" className="text-lime">
            Our spaces
          </Kicker>
          <h2 id="spaces-title" className="display mt-4 text-[clamp(38px,4.4vw,76px)] text-paper">
            Pick your <span className="it">corner.</span>
          </h2>
        </div>
        <a href={href('/venue/')} className="caps hidden items-center gap-3 text-paper/80 hover:text-lime md:inline-flex">
          The venue <Arrow />
        </a>
      </div>

      <div className="grid h-svh min-h-[620px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {spaces.map((s, i) => (
          <article
            key={s.id}
            className={`group relative overflow-hidden bg-olive transition-transform duration-[1100ms] ease-wipe max-md:h-[80svh] motion-reduce:translate-x-0 motion-reduce:transition-none ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`}}
          >
            <Img
              name={s.image}
              alt=""
              sizes="(max-width: 767px) 100vw, 34vw"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(12_14_9/0.7),transparent_42%,transparent_60%,rgb(12_14_9/0.7))]" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-24 md:p-9 md:pt-28">
              <div>
                <p className="caps text-lime">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(40px,3.6vw,64px)] text-paper">
                  <span className="block">{s.name[0]}</span>
                  <span className="it block">{s.name[1]}</span>
                </h3>
                <dl className={`mt-6 space-y-3 transition-opacity delay-[1400ms] duration-700 motion-reduce:delay-0 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                  {s.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-paper/65">{k}</dt>
                      <dd className="caps text-[14px] text-paper">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <a
                href={href(`/venue/#${s.id}`)}
                className="caps inline-flex min-h-11 items-center gap-3 self-start text-paper after:absolute after:inset-0 hover:text-lime"
              >
                Explore {s.name.join(' ')} <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
