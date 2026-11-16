import { useEffect } from 'react';

// Page titles (~50–60 characters) and descriptions (~150–160 characters) for search results and link previews.
const ROUTES = {
  '/': ['Co-working Space in Coimbatore | Seats & Cabins | Lemoria', 'Premium co-working space in Nehru Nagar East, Coimbatore. Book 1 to 60 seats, private cabins, conference cabins by the hour, day passes and virtual offices.'],
  '/about': ['About Lemoria | Premium Co-working Space in Coimbatore', 'Discover the story behind Lemoria, a premium co-working space in Nehru Nagar East, Coimbatore, built for freelancers, startups and growing companies.'],
  '/workspace': ['Book Co-working Seats in Coimbatore | 1 to 60 Seats | Lemoria', 'Book a flexi seat, a dedicated desk or up to 60 team seats in Coimbatore. Daily, weekly and monthly plans with Wi-Fi, coffee and conference cabin hours.'],
  '/private-cabins': ['Private Office Cabins in Coimbatore for 2 to 12 | Lemoria', 'Furnished, lockable private cabins for teams of 2 to 12 in Nehru Nagar East, Coimbatore, with branding, dedicated AC and access to every amenity.'],
  '/conference-cabins': ['Conference & Meeting Rooms by the Hour in Coimbatore | Lemoria', 'Book a private conference cabin for 4, 10 or 20 people by the hour in Coimbatore. Display, video conferencing and refreshments included. No membership needed.'],
  '/book': ['Book Seats or a Conference Cabin Online | Lemoria Coimbatore', 'Reserve 1 to 60 co-working seats or a conference cabin at Lemoria, Coimbatore. Choose your date and time online and we confirm within 2 business hours.'],
  '/virtual-office': ['Virtual Office & Business Address in Coimbatore | Lemoria', 'Get a professional business address in Nehru Nagar East, Coimbatore with GST registration support, mail handling and conference cabin credits.'],
  '/day-pass': ['Co-working Day Pass in Coimbatore | Lemoria', 'Drop in for a day of focused work in Coimbatore. A seat on the shared floor with fast Wi-Fi, unlimited coffee and lounge access. No commitment.'],
  '/memberships': ['Co-working Membership Plans in Coimbatore | Lemoria', 'Compare Lemoria memberships: flexi seats, dedicated desks, team seats and virtual offices in Coimbatore. Flexible monthly plans with no long lease.'],
  '/amenities': ['60+ Co-working Amenities in Coimbatore | Lemoria', 'Wi-Fi with backup, conference cabins, parking, café, 24/7 access, CCTV, printing and more. See every amenity included at Lemoria, Coimbatore.'],
  '/gallery': ['Photo Gallery | Inside Lemoria Co-working, Coimbatore', 'Take a look inside Lemoria: the shared floor, private cabins, conference cabins, lounge and café in Nehru Nagar East, Coimbatore.'],
  '/contact': ['Contact Lemoria | Book a Tour of Our Coimbatore Co-working Space', 'Call, email or visit Lemoria at Rajagopal Street, Nehru Nagar East, Coimbatore 641014. Send an enquiry and we reply within one business day.'],
};
const NAMES = { '/about': 'About us', '/workspace': 'Seats by the Chair', '/private-cabins': 'Private Cabins', '/conference-cabins': 'Conference Cabins', '/book': 'Book now', '/virtual-office': 'Virtual Office', '/day-pass': 'Day Pass', '/memberships': 'Memberships', '/amenities': 'Amenities', '/gallery': 'Gallery', '/contact': 'Contact' };

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
  useEffect(() => setJsonLd('ld-faq', {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }), [faq]);
}

export function useSeo(pathname) {
  useEffect(() => {
    const [title, desc] = ROUTES[pathname] || ROUTES['/'];
    const url = window.location.origin + pathname;
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
    // Breadcrumbs for inner pages (Home > Page) help Google show the page path in results.
    if (NAMES[pathname]) {
      return setJsonLd('ld-breadcrumb', {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: NAMES[pathname], item: url },
        ],
      });
    }
    return undefined;
  }, [pathname]);
}
