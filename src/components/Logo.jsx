import { useId } from 'react';

// Lemoria triangle mark, drawn as SVG so it stays crisp at any size.
// By default it follows the active colour palette; pass `colors` = [light, mid, dark] to fix it.
export function Mark({ size = 36, colors }) {
  const id = useId().replace(/:/g, '');
  const [a, b, c] = colors || ['var(--gold-light)', 'var(--gold)', 'var(--gold-dark)'];
  return (
    <svg width={size} height={size} viewBox="0 0 100 92" aria-hidden="true" className="mark">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: a }} /><stop offset=".5" style={{ stopColor: b }} /><stop offset="1" style={{ stopColor: c }} />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#g${id})`} strokeWidth="4" strokeLinejoin="round">
        <path d="M50 5 L95 87 H5 Z" />
        <path d="M50 38 L73 80 H27 Z" />
        <path d="M38.5 59 H61.5 L50 80 Z" />
      </g>
    </svg>
  );
}

export default function Logo({ size = 36, stacked = false }) {
  return (
    <span className={`logo ${stacked ? 'stacked' : ''}`}>
      <Mark size={size} />
      <span className="logo-type"><b>LEMORIA</b><small>Beyond Numbers</small></span>
    </span>
  );
}
