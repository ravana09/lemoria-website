// Original line-art scene shown above the footer: Lemoria's spaces drawn in ink with brass accents.
// Purely decorative, so it is hidden from screen readers.
const S = { fill: '#fff', stroke: 'var(--ink)', strokeWidth: 2.5, strokeLinejoin: 'round', strokeLinecap: 'round' };
const L = { fill: 'none', stroke: 'var(--ink)', strokeWidth: 2.5, strokeLinejoin: 'round', strokeLinecap: 'round' };
const G = { fill: 'var(--gold)' };
const INK = { fill: 'var(--ink)' };

// A simple seated or standing person: head, hair, shoulders. (x, y) = centre of the head.
function Person({ x, y, flip = false, hair = 'short' }) {
  const d = flip ? -1 : 1;
  return (
    <g>
      <path {...S} d={`M${x - 15} ${y + 52} V${y + 30} q0 -13 15 -13 q15 0 15 13 V${y + 52}`} />
      <circle {...S} cx={x} cy={y} r="13" />
      {hair === 'short' && <path {...INK} d={`M${x - 13} ${y - 1} a13 13 0 0 1 26 0 q-6 -5 -13 -4 q-8 1 -13 4z`} />}
      {hair === 'bun' && <><path {...INK} d={`M${x - 13} ${y} a13 13 0 0 1 26 0 q-13 -7 -26 0z`} /><circle {...INK} cx={x + 3 * d} cy={y - 16} r="6" /></>}
      {hair === 'long' && <path {...INK} d={`M${x - 14} ${y + 12} q-3 -26 14 -26 q17 0 14 26 q-4 -16 -14 -18 q-10 2 -14 18z`} />}
    </g>
  );
}

export default function FooterArt() {
  return (
    <svg className="ft-art-svg" viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      {/* ---------- brass accents (drawn first, behind the line work) ---------- */}
      <circle {...G} className="fa-sun" cx="205" cy="125" r="92" />
      <path {...G} d="M560 112 L660 28 L760 112 Z" />
      <circle {...G} cx="1300" cy="128" r="72" />
      <path {...G} d="M842 300 L872 272 H962 L932 300 Z" />

      {/* ---------- left building ---------- */}
      <path {...S} d="M150 62 L178 82 V300 H150 Z" />
      <rect {...S} x="22" y="62" width="128" height="238" />
      <rect {...S} x="40" y="86" width="38" height="48" /><rect {...S} x="94" y="86" width="38" height="48" />
      <rect {...S} x="40" y="156" width="38" height="48" /><rect {...S} x="94" y="156" width="38" height="48" />
      <rect {...S} x="66" y="244" width="40" height="56" />

      {/* ---------- room 1: hot desk ---------- */}
      <path {...S} d="M196 300 V146 L238 124 H500 V300" />
      <path {...L} d="M238 124 V300" />
      <rect {...S} x="382" y="150" width="92" height="62" /><path {...L} d="M428 150 V212 M382 181 H474" />
      {/* floor lamp */}
      <path {...L} d="M478 300 V214" /><path {...S} d="M462 214 H494 L486 194 H470 Z" />
      {/* plant */}
      <path {...L} d="M222 278 q-14 -26 -6 -46 M222 278 q2 -30 16 -40 M222 278 q-24 -12 -30 -26" />
      <path {...S} d="M210 300 L214 278 H232 L236 300 Z" />
      {/* person working at the desk (behind the laptop) */}
      <Person x={335} y={176} hair="bun" />
      <path {...L} d="M252 246 H440 M266 246 V300 M426 246 V300" />
      <path {...S} d="M304 246 L311 212 H359 L366 246 Z" />
      <path {...G} d="M335 222 L343 236 H327 Z" />
      <rect {...S} x="396" y="228" width="14" height="18" rx="2" /><path {...L} d="M410 233 q7 0 7 6 q0 5 -7 5" />
      <path className="fa-steam" {...L} strokeWidth="2" d="M400 220 q-4 -6 0 -12 M406 220 q-4 -6 0 -12" />

      {/* ---------- room 2: conference cabin ---------- */}
      <path {...S} d="M540 300 V112 H780 V300" />
      <path {...L} d="M660 112 V146" /><path {...S} d="M644 162 L660 146 L676 162 Z" />
      <circle className="fa-glow" {...G} cx="660" cy="170" r="5" />
      <rect {...S} x="604" y="182" width="112" height="44" />
      <polyline points="614,216 638,202 658,210 682,192 704,198" fill="none" stroke="var(--gold)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* chairs + two people meeting */}
      <path {...S} d="M560 300 V236 q0 -8 8 -8 H574 V300" />
      <path {...S} d="M760 300 V236 q0 -8 -8 -8 H746 V300" />
      <Person x={596} y={214} hair="short" />
      <Person x={724} y={214} flip hair="long" />
      <path {...L} strokeWidth="3.5" d="M572 268 H748" /><path {...L} d="M592 268 V300 M728 268 V300" />
      <path {...S} d="M640 268 L645 252 H675 L680 268 Z" />
      <rect {...G} x="702" y="256" width="12" height="12" rx="2" />

      {/* ---------- room 3: lounge ---------- */}
      <path {...S} d="M820 300 V146 L950 82 L1080 146 V300" />
      <circle {...S} cx="884" cy="166" r="18" /><path {...L} d="M884 156 V166 L892 171" />
      <rect {...S} x="984" y="146" width="62" height="44" /><path {...L} d="M990 184 L1006 166 L1016 176 L1028 160 L1040 184" />
      {/* two members chatting on the sofa */}
      <Person x={905} y={222} hair="short" />
      <Person x={975} y={220} flip hair="long" />
      <path {...S} d="M852 300 V268 q0 -12 12 -12 H1016 q12 0 12 12 V300" />
      <path {...L} d="M864 276 H1016" />
      <path {...S} d="M842 300 V262 q0 -8 10 -8 V300 M1038 300 V262 q0 -8 -10 -8 V300" />
      <rect {...G} x="944" y="236" width="12" height="14" rx="2" />
      <path className="fa-steam" {...L} strokeWidth="2" d="M948 230 q-4 -6 0 -12" />
      {/* tall plant */}
      <path {...L} d="M1056 270 q-12 -34 2 -64 M1056 270 q10 -30 -2 -56 M1056 270 q16 -20 14 -44" />
      <path {...S} d="M1044 300 L1048 270 H1066 L1070 300 Z" />

      {/* ---------- room 4: café ---------- */}
      <path {...S} d="M1100 300 V138 H1388 V300" />
      <rect {...S} x="1124" y="156" width="88" height="56" /><path {...L} d="M1136 172 H1198 M1136 186 H1188 M1136 200 H1178" />
      <path {...L} d="M1336 138 V162" /><path {...S} d="M1324 176 L1336 162 L1348 176 Z" />
      <Person x={1272} y={196} hair="bun" flip />
      <rect {...S} x="1128" y="244" width="232" height="56" />
      <path {...L} d="M1128 258 H1360" />
      <rect {...S} x="1146" y="210" width="40" height="34" /><path {...L} d="M1156 244 V232 H1176 V244" />
      <rect {...G} x="1206" y="230" width="12" height="14" rx="2" />
      <rect {...G} x="1326" y="230" width="12" height="14" rx="2" />

      {/* ---------- right building with the Lemoria triangle on top ---------- */}
      <rect {...S} x="1414" y="74" width="150" height="226" />
      <path {...S} d="M1564 74 L1588 92 V300 H1564 Z" />
      <path fill="none" stroke="var(--gold)" strokeWidth="4" strokeLinejoin="round" d="M1489 18 L1514 62 H1464 Z M1489 36 L1501 56 H1477 Z" />
      <rect {...S} x="1432" y="96" width="34" height="42" /><rect {...S} x="1480" y="96" width="34" height="42" /><rect {...S} x="1528" y="96" width="24" height="42" />
      <rect {...S} x="1432" y="160" width="34" height="42" /><rect {...S} x="1480" y="160" width="34" height="42" /><rect {...S} x="1528" y="160" width="24" height="42" />
      <rect {...S} x="1470" y="240" width="40" height="60" />

      {/* ground line */}
      <path {...L} strokeWidth="3" d="M0 299 H1600" />
    </svg>
  );
}
