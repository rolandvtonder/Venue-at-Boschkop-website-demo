import type {CSSProperties} from 'react';
import {promo} from '../content';
import {href} from '../lib/nav';
import {ButtonLink} from './Bits';

/** The early-booking offer band. Disappears by itself once the offer ends. */
export function Promo() {
  if (new Date() > new Date(`${promo.until}T23:59:59+02:00`)) return null;
  return (
    <section aria-label="Special offer" className="on-paper bg-lime text-ink">
      <div className="mx-auto grid max-w-[1680px] gap-8 px-5 py-16 md:grid-cols-[1fr_auto] md:items-end md:px-14 md:py-20">
        <div data-reveal>
          <p className="caps">Early-booking offer</p>
          <h2 className="display mt-4 text-[clamp(44px,6vw,108px)]">
            <span className="block">{promo.title[0]}</span>
            <span className="it block text-[0.62em]">{promo.title[1]}</span>
          </h2>
          <p className="prose-body mt-6 max-w-[460px]">{promo.body}</p>
        </div>
        <div data-reveal style={{'--d': '0.15s'} as CSSProperties}>
          <ButtonLink href={href('/contact/')} lead="Book your" word="2027 date" tone="ink" />
        </div>
      </div>
    </section>
  );
}
