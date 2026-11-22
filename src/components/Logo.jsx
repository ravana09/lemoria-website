import { useId } from 'react';

// Official Lemoria logo, rebuilt as code so it stays sharp at any size:
//   symbol  = outer triangle + inner triangle against the right edge, a cross bar and a small inverted triangle
//   name    = "LEMORIA" in Cormorant Garamond, "BEYOND NUMBERS" in Montserrat Light, spread to the same width
//   colours = the logo's gradient, warm orange-gold (left) to pale yellow-gold (right)
//
// tone="original" uses the exact logo colours (for dark backgrounds, e.g. the footer).
// tone="deep" uses a deeper version of the same gradient so it stays readable on white (e.g. the header).
export const LOGO_GRADIENTS = {
  original: ['#F09F2C', '#F7C553', '#FCEC8E'],
  deep: ['#B8720F', '#C9931F', '#D8B048'],
};

export function Mark({ size = 36, tone = 'original', colors }) {
  const id = useId().replace(/:/g, '');
  const [a, b, c] = colors || LOGO_GRADIENTS[tone] || LOGO_GRADIENTS.original;
  return (
    <svg width={size * (400 / 340)} height={size} viewBox="0 0 400 340" aria-hidden="true" className="mark">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={a} /><stop offset=".55" stopColor={b} /><stop offset="1" stopColor={c} />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#g${id})`} strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="16" d="M197 12 L389 326 H9 Z" />
        <path strokeWidth="7" d="M93 326 L243 105 L302 213 H170 M170 213 L240 326 L302 213" />
      </g>
    </svg>
  );
}

const TAGLINE = 'BEYOND NUMBERS';

export default function Logo({ size = 36, tone = 'deep' }) {
  const [a, b, c] = LOGO_GRADIENTS[tone] || LOGO_GRADIENTS.deep;
  const gradient = { backgroundImage: `linear-gradient(90deg, ${a}, ${b} 55%, ${c})` };
  return (
    <span className={`logo logo-${tone}`} style={{ '--lh': `${size}px` }}>
      <Mark size={size} tone={tone} />
      <span className="logo-type">
        <b style={gradient}>LEMORIA</b>
        <small style={gradient} aria-label="Beyond Numbers">
          {[...TAGLINE].map((ch, i) => <i key={i} aria-hidden="true">{ch === ' ' ? '' : ch}</i>)}
        </small>
      </span>
    </span>
  );
}
