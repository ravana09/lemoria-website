import { useEffect } from 'react';
import { SITE } from './data.js';

// Page titles (~50–60 characters) and descriptions (~150–160 characters) for Google and link previews.
// Used at runtime (useSeo) and at build time (scripts/prerender.mjs), so both always match.
export const ROUTES = {
  '/': ['Premium Coworking Space in Coimbatore | Lemoria Luxe', 'Lemoria Luxe is a luxury coworking space with managed offices on Gandhipuram, Coimbatore. Elegant desks, private offices and a boardroom-style meeting room.'],
  '/workspace': ['Hot Desks & Dedicated Seats in Coimbatore | Lemoria Luxe', 'Book an elegant hot desk, dedicated seat or private focus cabin at Lemoria Luxe premium coworking, Gandhipuram, Coimbatore. Daily, weekly and monthly plans.'],
  '/private-cabins': ['Managed Private Offices in Coimbatore | Lemoria Luxe', 'Fully managed, beautifully furnished private offices for teams of about 4 to 8 on Gandhipuram, Coimbatore. Move-in ready, with conference room access.'],
  '/conference-cabins': ['Conference Room on Hourly Rent in Coimbatore | Lemoria Luxe', 'Book a boardroom-style conference room for about 10 by the hour on Gandhipuram, Coimbatore. Phone booths and informal meeting areas too. No membership needed.'],
  '/day-pass': ['Coworking Day Pass in Coimbatore | Lemoria Luxe', 'Work from Lemoria Luxe coworking space in Coimbatore for a day. A seat in the open workspace with high-speed Wi-Fi and the pantry. No commitment.'],
  '/virtual-office': ['Virtual Office in Coimbatore | Lemoria Luxe', 'Get a prestigious business address on Gandhipuram, Coimbatore with GST registration support, mail handling and conference room access.'],
  '/amenities': ['Coworking Amenities in Coimbatore | Lemoria Luxe', 'Private offices, focus cabins, phone booths, a conference room, outdoor work area, pantry, lockers and high-speed Wi-Fi at Lemoria Luxe, Coimbatore.'],
  '/faq': ['Coworking Space in Coimbatore: FAQ | Lemoria Luxe', 'Answers to common questions about Lemoria Luxe coworking space in Coimbatore: location, seats, private offices, conference room, hours and pricing.'],
  '/about': ['About Lemoria Luxe | Coworking Space in Coimbatore', 'Lemoria Luxe is a premium coworking space and managed office on Gandhipuram, Coimbatore, created for founders, professionals and growing companies.'],
  '/contact': ['Contact & Book a Tour | Lemoria Luxe Coworking, Coimbatore', 'Visit Lemoria Luxe at SR Enclave, R. Chinnaswamy Naidu Street, New Siddhapudur, Coimbatore 641044. Call +91 73580 07200 or book a private tour.'],
  '/book': ['Book a Seat or Meeting Room Online | Lemoria Luxe', 'Reserve coworking seats or the conference room at Lemoria Luxe, Coimbatore. Choose your date online and we confirm within 2 business hours.'],
  '/plans': ['Coworking Plans in Coimbatore | Lemoria Luxe', 'Flexible coworking plans at Lemoria Luxe, Coimbatore: flexi seats, dedicated seats, private offices and virtual offices.'],
  '/memberships': ['Coworking Plans in Coimbatore | Lemoria Luxe', 'Flexible coworking plans at Lemoria Luxe, Coimbatore: flexi seats, dedicated seats, private offices and virtual offices.'],
  '/gallery': ['Photos of Lemoria Luxe Coworking Space, Coimbatore', 'Take a look inside Lemoria Luxe premium coworking space on Gandhipuram, Coimbatore: the workspace, private offices and conference room.'],
};
export const NAMES = { '/workspace': 'Hot Desks & Dedicated Seats', '/private-cabins': 'Private Offices', '/conference-cabins': 'Conference Room', '/day-pass': 'Day Pass', '/virtual-office': 'Virtual Office', '/amenities': 'Amenities', '/faq': 'FAQ', '/about': 'About', '/contact': 'Contact', '/book': 'Book online', '/plans': 'Plans', '/memberships': 'Plans', '/gallery': 'Gallery' };

export const canonical = (pathname) => `${SITE.url}${pathname === '/' ? '/' : pathname}`;

export function breadcrumbLd(pathname) {
  if (!NAMES[pathname]) return null;
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: NAMES[pathname], item: canonical(pathname) },
    ],
  };
}

export const faqLd = (faq) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', value);
}

// Adds (or replaces) a JSON-LD structured-data block in <head>. Returns a cleanup function.
export function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = id; document.head.appendChild(el); }
  el.textContent = JSON.stringify(data);
  return () => el.remove();
}

// For pages with their own questions: publishes them as FAQPage structured data.
export function useFaqJsonLd(faq) {
  useEffect(() => setJsonLd('ld-faq', faqLd(faq)), [faq]);
}

export function useSeo(pathname) {
  useEffect(() => {
    const [title, desc] = ROUTES[pathname] || ROUTES['/'];
    const url = canonical(pathname);
    document.title = title;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = url;
    const crumbs = breadcrumbLd(pathname);
    return crumbs ? setJsonLd('ld-breadcrumb', crumbs) : undefined;
  }, [pathname]);
}
