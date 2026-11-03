import {brand, contact, nav, socials} from '../content';
import {href, media, mediaSize} from '../lib/nav';

export function Footer() {
  const logo = mediaSize('logo');
  return (
    <footer className="relative border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 pt-20 pb-28 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-14 md:pb-20">
        <div>
          <a href={href('/')} aria-label={`${brand.name} home`} className="inline-block">
            <img src={media('logo-lime.png')} width={logo.w} height={logo.h} alt="" loading="lazy" className="w-[min(70vw,300px)]" />
          </a>
          <p className="caps mt-6 text-paper/70">{brand.tagline}</p>
        </div>

        <div>
          <h2 className="caps text-lime">Visit</h2>
          <address className="prose-body mt-3 not-italic text-paper/85">
            {contact.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a href={contact.maps} target="_blank" rel="noopener" className="caps mt-3 inline-block text-paper underline decoration-paper/30 underline-offset-4 hover:text-lime">
            Get directions
          </a>
        </div>

        <div>
          <h2 className="caps text-lime">Talk to us</h2>
          <ul className="prose-body mt-3 space-y-1 text-paper/85">
            <li>
              <a href={`tel:${contact.tel}`} className="hover:text-lime">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.whatsapp} target="_blank" rel="noopener" className="hover:text-lime">
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="break-all hover:text-lime">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="caps text-lime">Explore</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={href(n.href)} className="prose-body text-paper/85 hover:text-lime">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {socials.slice(0, 2).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="caps text-paper/85 hover:text-lime">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="caps border-t border-paper/10 px-5 py-6 text-paper/60 md:px-14">
        © {new Date().getFullYear()} {brand.name} · Zwavelpoort, Pretoria
      </p>
    </footer>
  );
}
