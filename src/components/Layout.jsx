import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SITE } from '../data.js';
import { useSeo } from '../seo.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Icon from './Icon.jsx';

// Elements that fade up into view as you scroll (the hero has its own entrance animation).
const REVEAL = [
  '.sec:not([id="sec-hero"]) .st', '.row-head .more', '.grid3 > *', '.grid4 > *', '.g3 > *', '.feat', '.why-note', '.why2-media',
  '.exp4-panel', '.tabs', '.am-desc', '.am-note', '.info-list li', '.cform', '.ct8-copy .btn',
  '.ft-grid > *', '.split > *', '.cta-in > *', '.bk-step', '.bk-summary',
  '.ha-p', '.ha-points li', '.sp-p', '.sp-incl', '.sp-ideal li', '.steps li', '.ab-nums div', '.ab-mv > div', '.mb-price', '.plan',
].join(',');

function useReveal(deps) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = [...document.querySelectorAll(REVEAL)].filter((el) => !el.closest('#sec-hero') && !el.classList.contains('rv'));
    els.forEach((el) => {
      const i = [...el.parentElement.children].indexOf(el);
      el.style.setProperty('--rv-d', `${(i % 6) * 80}ms`);
      el.classList.add('rv');
    });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    document.querySelectorAll('.rv:not(.rv-in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

export default function Layout() {
  const { pathname } = useLocation();
  useSeo(pathname);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useReveal([pathname]);

  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <a className="call-fab" href={`tel:${SITE.phone.replace(/\s/g, '')}`} aria-label="Call us"><Icon name="phone" size={22} /></a>
    </>
  );
}
