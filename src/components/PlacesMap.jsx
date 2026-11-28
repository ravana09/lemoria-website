import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { embedFor } from '../data.js';

// One Google Map per space, stacked on top of each other. Choosing another space "flies" the camera there:
// the current map pulls back and slides away while the next one glides in from the side where that space
// really is (east, north-west …), then a gold ring pulses on the pin and its name appears above it.
// All the maps start loading as soon as the page opens, so switching between spaces is instant. Until Google's
// map has arrived, a "Loading map…" panel shows instead of a blank grey box.
export default function PlacesMap({ places, active, className = '' }) {
  const [loaded, setLoaded] = useState(0); // how many of the maps have been given their address
  const [leaving, setLeaving] = useState(null);
  const [dir, setDir] = useState({ x: 0, y: 0 });
  const [moves, setMoves] = useState(0); // counts journeys, so the animation restarts every time
  const prev = useRef(active);

  // Start every map as soon as the page opens (Google's map takes a few seconds to arrive, so it should be
  // well on its way by the time the visitor scrolls down). Set on mount so the "ready" signal is never missed.
  const [ready, setReady] = useState({});
  useEffect(() => { setLoaded(places.length); }, [places.length]);
  // If Google never reports back (blocked, offline), stop showing "Loading map…" after a while.
  const [gaveUp, setGaveUp] = useState(false);
  useEffect(() => { const t = window.setTimeout(() => setGaveUp(true), 12000); return () => window.clearTimeout(t); }, []);

  // A different space was chosen: work out which way to travel, and make sure that map is loading.
  useEffect(() => {
    const from = places[prev.current]; const to = places[active];
    if (prev.current === active || !from || !to) return undefined;
    const dx = to.geo.lng - from.geo.lng; const dy = from.geo.lat - to.geo.lat; // screen y grows downwards
    const len = Math.hypot(dx, dy) || 1;
    setDir({ x: Math.round((dx / len) * 45), y: Math.round((dy / len) * 45) });
    setLeaving(prev.current);
    setMoves((m) => m + 1);
    setLoaded((n) => Math.max(n, active + 1));
    prev.current = active;
    const t = window.setTimeout(() => setLeaving(null), 1200);
    return () => window.clearTimeout(t);
  }, [active, places]);

  // The name label sits above the pin, which Google always draws in the middle of the map. When the visitor
  // drags or zooms the map themselves (the map takes the focus), the label hides so it never points at the
  // wrong spot; it comes back when they choose a space.
  const box = useRef(null);
  const [touched, setTouched] = useState(false);
  useEffect(() => { setTouched(false); }, [active]);
  useEffect(() => {
    const onBlur = () => { window.setTimeout(() => { if (box.current && box.current.contains(document.activeElement)) setTouched(true); }, 0); };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, []);

  const showWait = !ready[places[active]?.id] && !gaveUp;
  return (
    <div ref={box} className={`pm ${className}`} style={{ '--dx': dir.x, '--dy': dir.y }}>
      {/* shown over the map until Google's map for this space has arrived */}
      <div className={`pm-wait ${showWait ? '' : 'is-done'}`} aria-hidden="true">
        <span className="pm-wait-pin"><Icon name="pin" size={26} /></span>
        <span className="pm-wait-txt">Loading map…</span>
      </div>
      {places.map((p, i) => (
        <iframe
          key={p.id} // stable: a new key would reload the map; the animation restarts on its own when the class changes
          className={`pm-frame ${i === active ? 'is-active' : ''} ${i === leaving ? 'is-leaving' : ''} ${moves === 0 ? 'is-still' : ''}`}
          title={`Map to ${p.name}, ${p.area}, Coimbatore`}
          src={i < loaded ? embedFor(p.geo) : undefined}
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setReady((r) => (r[p.id] ? r : { ...r, [p.id]: true }))}
          tabIndex={i === active ? 0 : -1}
          aria-hidden={i === active ? undefined : 'true'}
        />
      ))}
      <span key={`ring-${moves}`} className="pm-ring" aria-hidden="true" />
      <span key={`name-${active}`} className={`pm-name ${touched || showWait ? 'is-hidden' : ''}`} aria-hidden="true">{places[active]?.name}</span>
    </div>
  );
}
