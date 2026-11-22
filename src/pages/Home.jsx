import { useEffect, useRef, useState } from 'react';
import { CtaBand } from '../components/Blocks.jsx';
import { StatArt } from '../components/Illustrations.jsx';
import { Amenities, Hero, Location, Personas, Spaces, Steps, Tour } from '../sections/HomeSections.jsx';
import { HOME } from '../data.js';

// Counts a number like "~50" up from 0 when it scrolls into view. Non-numeric values (e.g. hours) stay as they are.
function CountUp({ value }) {
  const m = /^(~?)(\d+)$/.exec(value);
  const ref = useRef(null);
  const [n, setN] = useState(m ? Number(m[2]) : null);
  useEffect(() => {
    if (!m || !ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const target = Number(m[2]);
    setN(0);
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1400);
        setN(Math.round(target * (1 - (1 - k) ** 3)));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  return <b ref={ref}>{m ? `${m[1]}${n}` : value}</b>;
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Stats (approximate figures): a white card overlapping the hero */}
      <section className="stats" id="sec-stats" aria-label="Lemoria Luxe at a glance">
        <div className="container stats-in">
          {HOME.stats.map((s) => (
            <div key={s.l}>
              <StatArt name={s.icon} className="st-art" />
              <CountUp value={s.n} />
              <span className="st-l">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      <Spaces />
      <Amenities />
      <Personas />
      <Tour />
      <Steps />
      <Location />
      <CtaBand />
    </>
  );
}
