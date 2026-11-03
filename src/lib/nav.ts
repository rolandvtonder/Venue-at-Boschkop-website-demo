import sizes from '../media.json';

/** A site path, prefixed with Vite's base so the site can live in a sub-folder. */
export const href = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const media = (file: string) => href(`media/${file}`);

export type MediaName = keyof typeof sizes;
export const mediaSize = (name: MediaName) => sizes[name];

/**
 * Page-to-page navigation. The curtain registers itself here so a click can
 * wipe the slabs in before the browser leaves; without it (or with reduced
 * motion) this is a plain navigation.
 */
let leave: ((url: string) => void) | null = null;

export function setLeaveHandler(fn: ((url: string) => void) | null) {
  leave = fn;
}

export function go(url: string) {
  if (leave) leave(url);
  else location.assign(url);
}

/** Normalises `/venue` and `/venue/index.html` to `/venue/` for comparisons. */
export const samePage = (a: string, b: string) => {
  const norm = (p: string) => p.replace(/index\.html$/, '').replace(/\/?$/, '/');
  return norm(a) === norm(b);
};
