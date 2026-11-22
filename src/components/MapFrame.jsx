import { useEffect, useState } from 'react';
import { MAP_EMBED, SITE } from '../data.js';

// Google Map that starts loading as soon as the page itself has finished loading (in the background),
// so it is ready by the time the visitor scrolls to it, without slowing the first screen.
export default function MapFrame({ className = '' }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let idle;
    const start = () => {
      const go = () => setSrc(MAP_EMBED);
      idle = 'requestIdleCallback' in window ? window.requestIdleCallback(go, { timeout: 1500 }) : window.setTimeout(go, 300);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle); else window.clearTimeout(idle);
    };
  }, []);
  return (
    <iframe
      className={`map ${className}`}
      title={`Map to ${SITE.name}, ${SITE.area}`}
      src={src || undefined}
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
