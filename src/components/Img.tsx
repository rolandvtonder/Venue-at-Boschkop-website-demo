import type {CSSProperties} from 'react';
import {media, mediaSize, type MediaName} from '../lib/nav';

/**
 * A processed photo from public/media with both sizes in srcset and its
 * intrinsic size set, so the browser reserves space and nothing jumps.
 */
export function Img({
  name,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  style,
}: {
  name: MediaName;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  const {w, h} = mediaSize(name);
  return (
    <img
      src={media(`${name}-1600.webp`)}
      srcSet={`${media(`${name}-800.webp`)} ${Math.min(800, w)}w, ${media(`${name}-1600.webp`)} ${Math.min(1600, w)}w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
