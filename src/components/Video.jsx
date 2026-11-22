import { useEffect, useRef } from 'react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Silent, looping background video (hero). Shows the poster image if the visitor prefers reduced motion.
export function BgVideo({ src, poster, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reducedMotion()) { v.pause(); return; }
    v.play().catch(() => { /* autoplay blocked: the poster stays visible */ });
  }, []);
  return (
    <video ref={ref} className={`bg-video ${className}`} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />
  );
}

// Muted video that plays on a loop while it is on screen. It only starts downloading when scrolled into view,
// and pauses when scrolled away, so it never slows the page down.
export function LoopVideo({ src, poster, title }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || reducedMotion() || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.src) v.src = src;
        v.play().catch(() => { /* autoplay blocked: poster stays */ });
      } else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return (
    <div className="play-video">
      <video ref={ref} poster={poster} muted loop playsInline preload="none" title={title} aria-label={title} />
    </div>
  );
}
