// Simple line icons (24×24, stroke = currentColor).
const P = {
  chair: <><path d="M7 3h10v8H7z" /><path d="M5 11h14v4H5z" /><path d="M7 15v6M17 15v6" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 4.5a3 3 0 0 1 0 6M18 14.3c1.8.7 3 2.6 3 5.7" /></>,
  door: <><path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" /><path d="M2 21h20M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-5h4v5" /></>,
  present: <><path d="M3 4h18v11H3z" /><path d="M12 15v5M8 20h8M7 11l3-3 3 2 4-4" /></>,
  calendar: <><path d="M3 5h18v16H3z" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  coffee: <><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" /><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3" /></>,
  wifi: <><path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><path d="M12 19.5h.01" /></>,
  car: <><path d="M5 16h14v-4l-2-5H7l-2 5z" /><path d="M5 12h14M7 16v2.5M17 16v2.5" /><path d="M8 14h.01M16 14h.01" /></>,
  bike: <><circle cx="6" cy="16" r="3.5" /><circle cx="18" cy="16" r="3.5" /><path d="M6 16l4-8h5l3 8M10 8l2 8h-6" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  snow: <><path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10" /><path d="M9 4l3 2 3-2M9 20l3-2 3 2" /></>,
  printer: <><path d="M6 9V3h12v6" /><path d="M6 18H4v-8h16v8h-2" /><path d="M6 14h12v7H6z" /></>,
  video: <><path d="M3 6h12v12H3z" /><path d="M15 10l6-3v10l-6-3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  mail: <><path d="M3 5h18v14H3z" /><path d="M3 6l9 7 9-7" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  lock: <><path d="M5 11h14v10H5z" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  pin: <><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUR: <path d="M7 17L17 7M8 7h9v9" />,
  check: <path d="M5 12l4 4 10-10" />,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  leaf: <><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19l7-7" /></>,
  game: <><path d="M2 9h20v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" /><path d="M6 13h4M8 11v4M15 12h.01M18 14h.01" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  water: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2z" /><path d="M4 20a2 2 0 0 0 2 1h13v-3" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" /></>,
  down: <path d="M6 9l6 6 6-6" />,
  left: <path d="M15 6l-6 6 6 6" />,
  right: <path d="M9 6l6 6-6 6" />,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  quote: <path d="M9 7H5v6h4v4H5M19 7h-4v6h4v4h-4" />,
  insta: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  linkedin: <><path d="M4 9h4v11H4zM6 4.5v.01" /><path d="M11 20v-11h4v2a4 4 0 0 1 6 3v6h-4v-5a2 2 0 0 0-4 0v5" /></>,
  facebook: <path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
};

export default function Icon({ name, size = 24, className = '', fill = 'none' }) {
  return (
    <svg className={`ic ${className}`} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name] || P.check}
    </svg>
  );
}
