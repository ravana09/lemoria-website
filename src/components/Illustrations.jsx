// Original flat illustrations for the page banners, drawn in the Lemoria palette (gold, cream, ink).
// Decorative, so they are hidden from screen readers.

const C = { cream: '#F4EAD5', creamDeep: '#E9CB86', gold: '#B5873A', goldDark: '#8E6420', brown: '#75561C', ink: '#1A1814', slate: '#3C4A4E', paper: '#FFFFFF' };
const SKIN = ['#E6C2A0', '#C99872', '#B07C58', '#DDB08A'];

// Shared soft background: a large cream shape, a gold one, small accents and leaves at the bottom.
function Backdrop() {
  return (
    <>
      <path d="M150 120 C210 30 360 10 470 40 C590 72 650 170 630 290 C612 400 640 470 560 520 L120 520 C60 470 40 380 70 300 C96 232 100 190 150 120 Z" fill={C.cream} />
      <path d="M420 70 C500 60 580 110 590 190 C600 260 540 300 480 280 C420 262 360 210 370 150 C376 110 390 76 420 70 Z" fill={C.creamDeep} opacity=".45" />
      <circle cx="560" cy="96" r="10" fill="none" stroke={C.gold} strokeWidth="2" />
      <circle cx="120" cy="210" r="6" fill={C.gold} opacity=".6" />
      <path d="M96 150 h40 M116 130 v40" stroke={C.gold} strokeWidth="2" opacity=".5" />
    </>
  );
}
function Leaves() {
  return (
    <>
      <path d="M120 520 C90 430 120 360 190 330 C180 400 170 460 150 520 Z" fill={C.brown} opacity=".55" />
      <path d="M150 520 C150 450 190 400 250 390 C230 440 205 490 185 520 Z" fill={C.gold} opacity=".6" />
      <path d="M560 520 C600 450 600 380 560 330 C540 400 535 460 540 520 Z" fill={C.brown} opacity=".5" />
      <path d="M590 520 C640 470 650 410 630 360 C600 410 585 470 580 520 Z" fill={C.gold} opacity=".55" />
      <path d="M190 330 C165 400 152 460 150 520 M560 330 C552 400 548 460 545 520" stroke="#5E4416" strokeWidth="2" fill="none" opacity=".4" />
    </>
  );
}
const Svg = ({ className, children }) => (
  <svg className={className} viewBox="0 0 640 520" role="img" aria-hidden="true" focusable="false">{children}</svg>
);

// One person, head and shoulders, drawn around (0, 0) = bottom centre.
function Person({ x, y, s = 1, skin, hair, top, inner, long = false, lapels = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {long && <path d="M-36 -146 C-44 -200 44 -200 36 -146 L44 -92 L22 -98 L24 -146 Z M-36 -146 L-44 -92 L-22 -98 L-24 -146 Z" fill={hair} />}
      <path d="M-98 0 C-98 -58 -74 -88 -32 -96 L32 -96 C74 -88 98 -58 98 0 Z" fill={top} />
      <path d="M-30 -96 L0 -38 L30 -96 Z" fill={inner} />
      {lapels && <path d="M-32 -96 L-8 -40 L-20 -36 L-44 -88 Z M32 -96 L8 -40 L20 -36 L44 -88 Z" fill="rgba(0,0,0,.18)" />}
      <rect x="-14" y="-118" width="28" height="30" rx="8" fill={skin} />
      <path d="M-14 -100 Q0 -92 14 -100 L14 -96 Q0 -88 -14 -96 Z" fill="rgba(0,0,0,.12)" />
      <ellipse cx="0" cy="-146" rx="30" ry="36" fill={skin} />
      {long
        ? <path d="M-31 -146 C-34 -186 34 -188 31 -146 C24 -168 -4 -176 -31 -146 Z" fill={hair} />
        : <path d="M-31 -148 C-36 -190 36 -192 31 -148 C27 -168 8 -174 -6 -170 C-18 -167 -27 -160 -31 -148 Z" fill={hair} />}
    </g>
  );
}

/* About: four professionals together */
export function TeamArt({ className = '' }) {
  return (
    <Svg className={className}>
      <Backdrop /><Leaves />
      <Person x={300} y={400} s={1.05} skin={SKIN[1]} hair="#2A2420" top="#D9B36A" inner={C.ink} />
      <Person x={500} y={410} s={1.05} skin={SKIN[3]} hair="#4A3426" top={C.slate} inner={C.creamDeep} />
      <Person x={240} y={520} s={1.3} skin={SKIN[0]} hair="#1E1A17" top={C.goldDark} inner={C.cream} long />
      <Person x={430} y={520} s={1.38} skin={SKIN[2]} hair={C.ink} top={C.ink} inner={C.cream} lapels />
    </Svg>
  );
}

/* Amenities: a lounge corner, sofa, floor lamp, side table with coffee and a laptop, Wi-Fi and a plant */
export function LoungeArt({ className = '' }) {
  return (
    <Svg className={className}>
      <Backdrop />
      {/* framed picture on the wall */}
      <rect x="250" y="120" width="140" height="96" rx="4" fill={C.paper} stroke={C.gold} strokeWidth="3" />
      <path d="M262 200 L300 158 L326 182 L346 164 L378 200 Z" fill={C.creamDeep} />
      <circle cx="356" cy="142" r="9" fill={C.gold} opacity=".7" />
      {/* Wi-Fi */}
      <g transform="translate(520 170)" fill="none" stroke={C.goldDark} strokeWidth="6" strokeLinecap="round">
        <path d="M-34 -10 a48 48 0 0 1 68 0" /><path d="M-20 4 a28 28 0 0 1 40 0" /><circle cx="0" cy="18" r="3" fill={C.goldDark} />
      </g>
      {/* floor lamp */}
      <path d="M150 470 L150 250 Q150 210 190 200" stroke={C.ink} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M170 178 L236 178 L218 222 L188 222 Z" fill={C.gold} />
      <ellipse cx="203" cy="232" rx="40" ry="10" fill={C.creamDeep} opacity=".7" />
      <rect x="126" y="466" width="48" height="10" rx="5" fill={C.ink} />
      {/* sofa */}
      <rect x="220" y="300" width="300" height="110" rx="26" fill={C.slate} />
      <rect x="240" y="320" width="124" height="64" rx="16" fill="#4D5D62" />
      <rect x="376" y="320" width="124" height="64" rx="16" fill="#4D5D62" />
      <rect x="196" y="352" width="348" height="84" rx="26" fill="#465559" />
      <rect x="196" y="338" width="52" height="112" rx="24" fill={C.slate} />
      <rect x="492" y="338" width="52" height="112" rx="24" fill={C.slate} />
      <rect x="226" y="372" width="288" height="34" rx="14" fill="#56676C" />
      <rect x="212" y="446" width="12" height="40" rx="4" fill={C.ink} /><rect x="516" y="446" width="12" height="40" rx="4" fill={C.ink} />
      {/* cushions */}
      <path d="M262 328 q32 -14 62 4 q-4 34 -10 44 q-28 -10 -56 -6 q2 -24 4 -42 Z" fill={C.gold} />
      <path d="M420 330 q30 -10 56 6 q-2 30 -8 40 q-26 -8 -52 -6 q2 -22 4 -40 Z" fill={C.cream} />
      {/* side table with coffee and laptop */}
      <rect x="410" y="456" width="150" height="12" rx="6" fill={C.goldDark} />
      <rect x="426" y="468" width="10" height="52" fill={C.ink} /><rect x="534" y="468" width="10" height="52" fill={C.ink} />
      <path d="M440 456 L470 420 L528 420 L510 456 Z" fill={C.ink} />
      <path d="M476 426 L522 426 L508 450 L464 450 Z" fill={C.creamDeep} opacity=".5" />
      <rect x="532" y="430" width="22" height="26" rx="4" fill={C.paper} stroke={C.ink} strokeWidth="3" />
      <path d="M554 436 q12 2 0 12" stroke={C.ink} strokeWidth="3" fill="none" />
      <path d="M538 422 q4 -8 0 -14 M546 422 q4 -8 0 -14" stroke={C.gold} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* plant */}
      <path d="M600 520 L606 460 L574 460 L580 520 Z" fill={C.goldDark} />
      <path d="M590 462 C560 420 562 380 590 350 C600 390 598 430 590 462 Z" fill={C.brown} opacity=".75" />
      <path d="M590 462 C620 430 640 400 632 362 C606 384 594 420 590 462 Z" fill={C.gold} opacity=".7" />
      <path d="M590 462 C570 440 548 432 530 436 C548 452 568 460 590 462 Z" fill={C.brown} opacity=".6" />
    </Svg>
  );
}

/* FAQ: a person at a laptop, with a question bubble and an answer bubble */
export function QuestionsArt({ className = '' }) {
  return (
    <Svg className={className}>
      <Backdrop /><Leaves />
      {/* question bubble */}
      <g transform="translate(180 120)">
        <rect x="0" y="0" width="150" height="104" rx="22" fill={C.paper} stroke={C.gold} strokeWidth="3" />
        <path d="M40 104 L34 136 L68 104 Z" fill={C.paper} stroke={C.gold} strokeWidth="3" strokeLinejoin="round" />
        <path d="M41 103 L67 103" stroke={C.paper} strokeWidth="5" />
        <text x="75" y="76" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="72" fontWeight="600" fill={C.goldDark}>?</text>
      </g>
      {/* answer bubble */}
      <g transform="translate(410 70)">
        <rect x="0" y="0" width="170" height="112" rx="22" fill={C.ink} />
        <path d="M118 112 L132 146 L96 112 Z" fill={C.ink} />
        <rect x="24" y="28" width="96" height="10" rx="5" fill={C.creamDeep} />
        <rect x="24" y="50" width="122" height="10" rx="5" fill="#6B655C" />
        <rect x="24" y="72" width="80" height="10" rx="5" fill="#6B655C" />
        <circle cx="140" cy="33" r="14" fill={C.gold} />
        <path d="M133 33 l5 5 l9 -10" stroke={C.paper} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* person at a desk */}
      <Person x={360} y={470} s={1.3} skin={SKIN[1]} hair="#2A2420" top={C.goldDark} inner={C.cream} long />
      <rect x="170" y="440" width="380" height="16" rx="8" fill={C.ink} />
      <rect x="196" y="456" width="12" height="64" fill={C.ink} /><rect x="512" y="456" width="12" height="64" fill={C.ink} />
      <path d="M286 440 L306 372 L432 372 L414 440 Z" fill={C.slate} />
      <circle cx="368" cy="404" r="10" fill={C.creamDeep} opacity=".8" />
      <rect x="456" y="414" width="24" height="26" rx="4" fill={C.paper} stroke={C.ink} strokeWidth="3" />
      <path d="M480 420 q12 2 0 12" stroke={C.ink} strokeWidth="3" fill="none" />
    </Svg>
  );
}


/* Book online: a calendar with the chosen day marked in gold, a desk chair and a confirmation tick */
export function BookingArt({ className = '' }) {
  const days = Array.from({ length: 28 }, (_, i) => i);
  return (
    <Svg className={className}>
      <Backdrop /><Leaves />
      {/* calendar */}
      <g transform="translate(150 96)">
        <rect x="0" y="0" width="300" height="270" rx="16" fill={C.paper} stroke={C.ink} strokeWidth="3" />
        <path d="M0 16 a16 16 0 0 1 16 -16 h268 a16 16 0 0 1 16 16 v42 h-300 Z" fill={C.ink} />
        <rect x="58" y="-14" width="12" height="34" rx="6" fill={C.gold} /><rect x="230" y="-14" width="12" height="34" rx="6" fill={C.gold} />
        <rect x="96" y="22" width="108" height="12" rx="6" fill={C.creamDeep} />
        {days.map((i) => {
          const x = 22 + (i % 7) * 38; const y = 80 + Math.floor(i / 7) * 44;
          const picked = i === 17;
          return picked
            ? <g key={i}><circle cx={x + 14} cy={y + 14} r="19" fill={C.gold} /><path d={`M${x + 6} ${y + 14} l6 6 l11 -12`} stroke={C.paper} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
            : <rect key={i} x={x + 4} y={y + 6} width="20" height="16" rx="4" fill={i % 7 > 4 ? '#EFE7D6' : C.cream} />;
        })}
      </g>
      {/* desk chair */}
      <g transform="translate(470 250)">
        <rect x="-44" y="-96" width="88" height="104" rx="22" fill={C.goldDark} />
        <rect x="-56" y="10" width="112" height="30" rx="14" fill={C.ink} />
        <rect x="-64" y="-20" width="14" height="44" rx="7" fill={C.ink} /><rect x="50" y="-20" width="14" height="44" rx="7" fill={C.ink} />
        <rect x="-5" y="40" width="10" height="70" fill={C.ink} />
        <path d="M-60 122 L0 108 L60 122" stroke={C.ink} strokeWidth="8" fill="none" strokeLinecap="round" />
        <circle cx="-60" cy="128" r="8" fill={C.ink} /><circle cx="60" cy="128" r="8" fill={C.ink} /><circle cx="0" cy="124" r="8" fill={C.ink} />
      </g>
      {/* confirmation chip */}
      <g transform="translate(370 400)">
        <rect x="0" y="0" width="180" height="56" rx="28" fill={C.ink} />
        <circle cx="30" cy="28" r="16" fill={C.gold} />
        <path d="M22 28 l6 6 l10 -11" stroke={C.paper} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="58" y="20" width="90" height="8" rx="4" fill={C.creamDeep} /><rect x="58" y="34" width="60" height="6" rx="3" fill="#6B655C" />
      </g>
    </Svg>
  );
}
