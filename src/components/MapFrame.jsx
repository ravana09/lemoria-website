import { useEffect, useState } from 'react';
import { MAP_EMBED, SITE } from '../data.js';

// Google Map (About and Contact pages). It starts loading as soon as the page opens, so it is ready by the time
// the visitor scrolls to it. The address is set after the page appears, so the first screen is never held up.
export default function MapFrame({ className = '' }) {
  const [src, setSrc] = useState(null);
  useEffect(() => { setSrc(MAP_EMBED); }, []);
  return (
    <iframe
      className={`map ${className}`}
      title={`Map to ${SITE.name}, ${SITE.area}`}
      src={src || undefined}
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
