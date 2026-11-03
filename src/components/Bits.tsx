import type {ReactNode} from 'react';
import type {Line} from '../content';

/** Headline lines from content.ts; lines marked `i` are set in italic. */
export function Lines({lines, indentFirst = false}: {lines: Line[]; indentFirst?: boolean}) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''} ${indentFirst && i === 0 ? 'pl-[1.2em]' : ''}`}>
          {l.t}
        </span>
      ))}
    </>
  );
}

/** Small numbered label above a section heading. */
export function Kicker({n, children, className = ''}: {n?: string; children: ReactNode; className?: string}) {
  return (
    <p className={`caps flex items-center gap-3 ${className}`}>
      {n && <span className="tabular-nums">{n}</span>}
      {n && <span aria-hidden className="h-px w-8 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  );
}

export function Arrow({className = ''}: {className?: string}) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/** The two-tone button used across the site: caps with one italic word. */
export function ButtonLink({
  href,
  lead,
  word,
  tone = 'lime',
  className = '',
  external = false,
}: {
  href: string;
  lead: string;
  word: string;
  tone?: 'lime' | 'ink' | 'paper';
  className?: string;
  external?: boolean;
}) {
  const tones = {
    lime: 'bg-lime text-ink hover:bg-paper',
    ink: 'bg-ink text-paper hover:bg-olive',
    paper: 'bg-paper text-ink hover:bg-lime',
  };
  return (
    <a
      href={href}
      {...(external ? {target: '_blank', rel: 'noopener'} : {})}
      className={`caps group inline-flex min-h-12 items-center gap-3 px-7 py-3.5 transition-colors duration-300 ${tones[tone]} ${className}`}
    >
      <span>
        {lead} <em className="text-[14px] normal-case tracking-normal">{word}</em>
      </span>
      <Arrow className="transition-transform duration-300 ease-silk group-hover:translate-x-1" />
    </a>
  );
}
