import { useState } from 'react';

const WIDTHS = [480, 800, 1200, 1600, 2000];

// For Unsplash photos, offer several widths so phones download small files and large screens stay sharp.
// Local photos (e.g. /images/x.jpg) are used as-is.
function srcSetFor(src) {
  if (!/images\.unsplash\.com/.test(src)) return undefined;
  return WIDTHS.map((w) => `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(', ');
}

// Image inside a sized frame (the frame's CSS sets the shape, the photo fills it without stretching),
// with a neutral fallback so a broken link never leaves an empty gap.
// `sizes` tells the browser how wide the image is shown, e.g. "(max-width: 760px) 100vw, 33vw".
export default function Img({ src, alt, className = '', eager = false, sizes = '100vw', ...rest }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`ph ${className}`} {...rest}>
      {!failed && (
        <img
          src={src}
          srcSet={srcSetFor(src)}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
