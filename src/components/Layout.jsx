import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE, TOUR_LINK, WA_LINK } from '../data.js';
import { useSeo } from '../seo.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Icon from './Icon.jsx';

// Elements that slide up into view, one after another, as you scroll (the hero has its own entrance).
const REVEAL = [
  // section headings: label, heading and text rise one by one
  '.st > *', '.banner .container > *', '.row-head .more',
  // cards and lists: each item follows the previous one
  '.ws-card', '.why-item', '.pr-card', '.st3 li', '.am-mini li', '.am-full li', '.opt-grid > *', '.grid4 > *', '.g3 > *', '.stats-in > div',
  '.info-list li', '.sp-incl', '.sp-p', '.ab-mv > div', '.plan', '.faq details', '.faq-more',
  '.tour-in .btns', '.tour4-facts li', '.tour4-copy > .btns', '.loc-in .btn', '.ab-loc .btn', '.split > div', '.cform', '.cta-in > *', '.ft-grid > *',
  '.bk-step', '.bk-summary', '.tabs', '.exp4-panel',
  // home sections
  '.pr3-item', '.am4-list li', '.stp4-list li', '.loc2-card',
].join(',');
// Media that fades and settles into place instead of sliding.
// (Maps are left out: they show straight away.)
const MEDIA = ['.play-video', '.split > .ph', '.masonry .gal-fig'].join(',');

function useReveal(deps) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const media = new Set(document.querySelectorAll(MEDIA));
    const els = [...document.querySelectorAll(`${REVEAL},${MEDIA}`)].filter((el) => !el.closest('#sec-hero') && !el.classList.contains('rv'));
    // Stagger by position among the animated siblings, so items in a row arrive one by one.
    const order = new Map();
    els.forEach((el) => {
      const n = order.get(el.parentElement) || 0;
      order.set(el.parentElement, n + 1);
      el.style.setProperty('--rv-d', `${Math.min(n, 8) * 110}ms`);
      el.classList.add('rv');
      if (media.has(el)) el.classList.add('rv-media');
    });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
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
      {/* key: each page fades in when you navigate */}
      <main key={pathname} className="page"><Outlet /></main>
      <Footer />
      {/* Desktop: floating WhatsApp + call buttons */}
      <div className="fabs">
        <a className="fab fab-wa" href={WA_LINK} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><Icon name="whatsapp" size={24} /></a>
        <a className="fab" href={`tel:${SITE.phone.replace(/\s/g, '')}`} aria-label="Call us"><Icon name="phone" size={22} /></a>
      </div>
      {/* Phones: app-style bottom navigation, with "Book" raised in the centre */}
      <nav className="mbar" aria-label="Quick actions">
        <NavLink to="/" end><Icon name="home" size={22} /><span>Home</span></NavLink>
        <NavLink to="/workspace"><Icon name="chair" size={22} /><span>Spaces</span></NavLink>
        <Link to={TOUR_LINK} className="mbar-cta" aria-label="Book a tour"><span className="mbar-fab"><Icon name="calendar" size={24} /></span><span>Book</span></Link>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="mbar-wa"><Icon name="whatsapp" size={22} /><span>WhatsApp</span></a>
        <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}><Icon name="phone" size={21} /><span>Call</span></a>
      </nav>
    </>
  );
}
