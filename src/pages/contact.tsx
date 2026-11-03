import {useRef, useState, type FormEvent, type ReactNode} from 'react';
import {mount} from '../mount';
import {contact, contactPage, spaces} from '../content';
import {Arrow, Kicker} from '../components/Bits';
import {Hero} from '../components/Hero';

type Fields = {name: string; phone: string; email: string; event: string; date: string; guests: string; message: string};
type Errors = Partial<Record<keyof Fields, string>>;

const LABELS: Record<keyof Fields, string> = {
  name: 'Your name',
  phone: 'Phone number',
  email: 'Email',
  event: 'What are you celebrating?',
  date: 'Preferred date',
  guests: 'Number of guests',
  message: 'Anything else?',
};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please tell us your name.';
  if (f.phone.replace(/\D/g, '').length < 9) e.phone = 'Please enter a phone number we can reach you on, e.g. 082 123 4567.';
  if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'That email address looks incomplete. Check it, or leave it blank.';
  if (!f.event) e.event = 'Please choose the kind of event.';
  if (f.guests && !(Number(f.guests) > 0)) e.guests = 'Please enter the number of guests as a number, e.g. 40.';
  return e;
}

/** Turns the form into a message for WhatsApp or email; no server needed. */
function compose(f: Fields) {
  const type = contactPage.eventTypes.find(([v]) => v === f.event)?.[1] ?? f.event;
  const when = f.date ? new Date(`${f.date}T12:00`).toLocaleDateString('en-ZA', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}) : 'Not sure yet';
  const details = [
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    `Event: ${type}`,
    `Date: ${when}`,
    f.guests && `Guests: ${f.guests}`,
  ].filter(Boolean);
  return ['Hi Venue at Boschkop! I would like to enquire about a booking.', details.join('\n'), f.message].filter(Boolean).join('\n\n');
}

function initial(): Fields {
  const q = new URLSearchParams(location.search);
  const event = q.get('event') ?? '';
  const space = spaces.find((s) => s.id === q.get('space'));
  return {
    name: '',
    phone: '',
    email: '',
    event: contactPage.eventTypes.some(([v]) => v === event) ? event : '',
    date: '',
    guests: '',
    message: space ? `I'm interested in ${space.name[0] === 'The' ? '' : 'the '}${space.name.join(' ')}.` : '',
  };
}

function Contact() {
  const [f, setF] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState<'' | 'whatsapp' | 'email'>('');
  const summary = useRef<HTMLDivElement>(null);
  const [showSummary, setShowSummary] = useState(false);

  const set = (k: keyof Fields) => (e: {target: {value: string}}) => {
    const next = {...f, [k]: e.target.value};
    setF(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({...t, [k]: true}));
    setErrors(validate(f));
  };

  const submit = (via: 'whatsapp' | 'email') => (e?: FormEvent) => {
    e?.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    setTouched({name: true, phone: true, email: true, event: true, guests: true});
    if (Object.keys(errs).length) {
      setShowSummary(true);
      window.setTimeout(() => summary.current?.focus(), 0);
      return;
    }
    setShowSummary(false);
    const text = compose(f);
    if (via === 'whatsapp') {
      window.open(`${contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } else {
      location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Booking enquiry from the website')}&body=${encodeURIComponent(text)}`;
    }
    setSent(via);
  };

  const err = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Hero
        slides={contactPage.hero.slides}
        lines={contactPage.hero.lines}
        body={contactPage.hero.body}
        kicker={<Kicker n="06">Contact &amp; booking</Kicker>}
        alt="Fairy lights reflected in the garden pond at dusk"
      />

      <section aria-labelledby="enquiry-title" className="on-paper bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-16 px-5 py-20 md:grid-cols-[1fr_1.35fr] md:px-14 md:py-28">
          {/* Details */}
          <div className="space-y-10">
            <div data-reveal>
              <Kicker className="text-moss">Talk to us</Kicker>
              <a href={`tel:${contact.tel}`} className="display mt-4 block text-[clamp(44px,4.6vw,80px)] hover:text-moss">
                {contact.phone}
              </a>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={contact.whatsapp} target="_blank" rel="noopener" className="caps inline-flex min-h-12 items-center gap-3 bg-ink px-6 text-paper hover:bg-olive">
                  WhatsApp us <Arrow />
                </a>
                <a href={`tel:${contact.tel}`} className="caps inline-flex min-h-12 items-center gap-3 border border-ink/30 px-6 hover:border-ink">
                  Call
                </a>
              </div>
            </div>
            <dl data-reveal className="grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2">
              <div>
                <dt className="caps text-muted">Email</dt>
                <dd className="prose-body mt-1">
                  <a href={`mailto:${contact.email}`} className="break-all underline decoration-ink/30 underline-offset-4 hover:text-moss">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="caps text-muted">Address</dt>
                <dd className="prose-body mt-1">
                  {contact.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="caps text-muted">Evening functions</dt>
                <dd className="prose-body mt-1">Friday &amp; Saturday</dd>
              </div>
              <div>
                <dt className="caps text-muted">Follow</dt>
                <dd className="prose-body mt-1 flex gap-4">
                  <a href={contact.instagram} target="_blank" rel="noopener" className="underline decoration-ink/30 underline-offset-4 hover:text-moss">
                    Instagram
                  </a>
                  <a href={contact.facebook} target="_blank" rel="noopener" className="underline decoration-ink/30 underline-offset-4 hover:text-moss">
                    Facebook
                  </a>
                </dd>
              </div>
            </dl>
            <div data-reveal className="relative aspect-[4/3] overflow-hidden bg-stone">
              <iframe
                title="Map showing Venue at Boschkop, 3 Boschkop Road, Zwavelpoort"
                src={contact.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.6] contrast-[1.05]"
              />
            </div>
            <a href={contact.maps} target="_blank" rel="noopener" className="caps inline-flex items-center gap-3 hover:text-moss">
              Open in Google Maps <Arrow />
            </a>
          </div>

          {/* Enquiry form */}
          <div className="md:pl-6">
            <h2 id="enquiry-title" data-reveal className="display text-[clamp(42px,4.4vw,76px)]">
              Check your <span className="it">date.</span>
            </h2>
            <p data-reveal className="prose-body mt-4 max-w-[540px] text-ink/85">
              Fill this in and send it to us on WhatsApp or by email. It opens your own app with the message ready, so nothing is stored on this website.
            </p>

            {showSummary && Object.keys(errors).length > 0 && (
              <div ref={summary} tabIndex={-1} role="alert" className="mt-8 border-l-4 border-[#a3321f] bg-[#a3321f]/8 p-5">
                <p className="caps text-[#8a2a1a]">Please check {Object.keys(errors).length === 1 ? 'this field' : 'these fields'}</p>
                <ul className="prose-body mt-2 space-y-1 text-[16px]">
                  {(Object.keys(errors) as (keyof Fields)[]).map((k) => (
                    <li key={k}>
                      <a href={`#f-${k}`} onClick={(e) => (e.preventDefault(), document.getElementById(`f-${k}`)?.focus())} className="underline underline-offset-4">
                        {LABELS[k]}: {errors[k]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form noValidate onSubmit={submit('whatsapp')} className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <Field id="name" label={LABELS.name} required error={err('name')}>
                <input id="f-name" name="name" autoComplete="name" value={f.name} onChange={set('name')} onBlur={blur('name')} {...aria('name', err('name'))} className={input} />
              </Field>
              <Field id="phone" label={LABELS.phone} required error={err('phone')}>
                <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} onBlur={blur('phone')} {...aria('phone', err('phone'))} className={input} />
              </Field>
              <Field id="email" label={LABELS.email} hint="Optional" error={err('email')}>
                <input id="f-email" name="email" type="email" autoComplete="email" value={f.email} onChange={set('email')} onBlur={blur('email')} {...aria('email', err('email'))} className={input} />
              </Field>
              <Field id="event" label={LABELS.event} required error={err('event')}>
                <select id="f-event" name="event" value={f.event} onChange={set('event')} onBlur={blur('event')} {...aria('event', err('event'))} className={`${input} appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8'><path d='M1 1l5 5 5-5' fill='none' stroke='%230c0e09' stroke-width='1.5'/></svg>")] bg-[position:right_4px_center] bg-no-repeat pr-8`}>
                  <option value="">Choose one…</option>
                  {contactPage.eventTypes.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="date" label={LABELS.date} hint="Optional" error={err('date')}>
                <input id="f-date" name="date" type="date" min={today} value={f.date} onChange={set('date')} {...aria('date')} className={input} />
              </Field>
              <Field id="guests" label={LABELS.guests} hint="Optional, roughly" error={err('guests')}>
                <input id="f-guests" name="guests" type="number" inputMode="numeric" min={1} value={f.guests} onChange={set('guests')} onBlur={blur('guests')} {...aria('guests', err('guests'))} className={input} />
              </Field>
              <div className="sm:col-span-2">
                <Field id="message" label={LABELS.message} hint="Optional: extras like pony rides, times, questions">
                  <textarea id="f-message" name="message" rows={4} value={f.message} onChange={set('message')} {...aria('message')} className={`${input} resize-y`} />
                </Field>
              </div>

              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button type="submit" className="caps inline-flex min-h-13 items-center gap-3 bg-ink px-7 py-4 text-paper transition-colors hover:bg-olive">
                  Send on <em className="text-[14px] normal-case tracking-normal">WhatsApp</em> <Arrow />
                </button>
                <button type="button" onClick={() => submit('email')()} className="caps inline-flex min-h-13 items-center gap-3 border border-ink/30 px-7 py-4 transition-colors hover:border-ink">
                  Send by <em className="text-[14px] normal-case tracking-normal">email</em>
                </button>
              </div>
              <p className="caps text-muted sm:col-span-2">* Required</p>

              <p role="status" className="sm:col-span-2">
                {sent && (
                  <span className="prose-body block border-l-4 border-moss bg-lime/25 p-5">
                    {sent === 'whatsapp'
                      ? 'WhatsApp has opened in a new tab with your message ready. Tap send there and we will get back to you.'
                      : 'Your email app has opened with your message ready. Press send there and we will get back to you.'}{' '}
                    Nothing opened? Call or WhatsApp us on {contact.phone}.
                  </span>
                )}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

const input =
  'prose-body mt-2 block min-h-12 w-full rounded-none border-0 border-b border-ink/35 bg-transparent px-0 py-2 text-ink placeholder:text-muted focus:border-ink focus:outline-none focus-visible:outline-none focus:shadow-[0_2px_0_0_var(--color-moss)] aria-[invalid=true]:border-[#a3321f]';

const aria = (k: keyof Fields, error?: string) => ({
  'aria-invalid': error ? true : undefined,
  'aria-describedby': `f-${k}-hint${error ? ` f-${k}-error` : ''}`,
});

function Field({id, label, required, hint, error, children}: {id: string; label: string; required?: boolean; hint?: string; error?: string; children: ReactNode}) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="caps block text-ink">
        {label}
        {required && (
          <span aria-hidden className="text-moss">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      <p id={`f-${id}-hint`} className="caps mt-1.5 text-muted">
        {hint ?? (required ? 'Required' : '')}
      </p>
      {error && (
        <p id={`f-${id}-error`} className="prose-body mt-1 text-[15px] text-[#8a2a1a]">
          {error}
        </p>
      )}
    </div>
  );
}

mount(<Contact />);
