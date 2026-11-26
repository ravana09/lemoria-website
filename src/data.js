// ---- All site content lives here. Edit text, images and contact details in one place. ----
// Lines marked TODO need details only Lemoria Luxe can confirm (phone, plans, final amenities list).

export const SITE = {
  name: 'Lemoria Luxe',
  tagline: 'Beyond Numbers',
  url: 'https://lemoria-website.pradeep09sathish.workers.dev', // TODO: change to the custom domain when it is connected
  phone: '+91 73580 07200', // also update server/templates.js
  whatsapp: '917358007200', // country code + number, digits only
  email: 'info@lemoria.space',
  address: 'Door No. 3A & 3B, Second Floor, 234, SR Enclave, R. Chinnaswamy Naidu Street, New Siddhapudur, Coimbatore, Tamil Nadu 641044',
  area: 'Gandhipuram, Coimbatore',
  hours: 'Mon – Sat, 8:00 AM – 9:00 PM',
  // Exact Google Maps location ("Lemoria Central")
  geo: { lat: 11.0212345, lng: 76.9724079 },
  mapsPlace: 'https://www.google.com/maps/place/Lemoria+Central/@11.0212345,76.9724079,17z/data=!4m6!3m5!1s0x3ba859701442ad43:0xc40989711ae5cb2f!8m2!3d11.0212345!4d76.9724079!16s%2Fg%2F11_0glvd_s',
};
export const MAP_EMBED = `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=17&output=embed`;
export const MAP_LINK = SITE.mapsPlace;

// Videos (stock clips from Mixkit for now). Replace the files in /public/videos with real Lemoria Luxe footage.
export const VIDEOS = {
  hero: { src: '/videos/coworking-hero.mp4', poster: '/videos/coworking-hero.jpg' },
  tour: { src: '/videos/meeting-room.mp4', poster: '/videos/meeting-room.jpg' },
};

// Photos: Unsplash placeholders that match each space. Replace with real photos of Lemoria Luxe before launch.
const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
export const IMG = {
  floor: u('photo-1504384308090-c894fdcc538d'),
  community: u('photo-1568992687947-868a62a9f521'),
  desk: u('photo-1497215842964-222b430dc094'),
  cabin: u('photo-1604328698692-f76ea9498e76'),
  offices: u('photo-1497366754035-f200968a6e72'),
  meeting: u('photo-1517502884422-41eaead166d4'),
  conference: u('photo-1431540015161-0bf868a2d407'),
  bigRoom: u('photo-1462826303086-329426d1aef5'),
  clientMeeting: u('photo-1600880292203-757bb62b4baf'),
  lounge: u('photo-1524758631624-e2822e304c36'),
  cafe: u('photo-1600508774634-4e11d34730e2'),
  focus: u('photo-1564069114553-7215e1ff1890'),
  collab: u('photo-1519389950473-47ba0277781c'),
};

// Main menu (original navbar): first two items left of the logo, the rest on the right with "Get in touch".
// "Workspace" opens a dropdown.
export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/amenities', label: 'Amenities' },
  { label: 'Workspaces', menu: true },
  { to: '/faq', label: 'FAQ' },
];
export const TOUR_LINK = '/contact?type=Book a tour';
// WhatsApp chat with a friendly pre-filled message.
export const WA_LINK = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi Lemoria Luxe, I would like to know more about your coworking space.')}`;
// Opens a new Gmail message to Lemoria Luxe (in the Gmail app on phones that have it).
export const GMAIL_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}&su=${encodeURIComponent('Enquiry about Lemoria Luxe')}`;
export const WORKSPACE_MENU = [
  { to: '/workspace', icon: 'chair', title: 'Hot Desks & Dedicated Seats', text: 'Elegant desks & focus cabins' },
  { to: '/private-cabins', icon: 'door', title: 'Private Offices', text: 'Managed offices for teams of 4 to 8' },
  { to: '/conference-cabins', icon: 'present', title: 'Conference Room', text: 'Seats about 10, book by the hour' },
  { to: '/day-pass', icon: 'calendar', title: 'Day Pass', text: 'Work for a day, no commitment' },
  { to: '/virtual-office', icon: 'mail', title: 'Virtual Office', text: 'Business address & mail handling' },
  { to: '/book', icon: 'arrow', title: 'Book online', text: 'Reserve seats or a meeting room' },
];

// ---- Workspace pages: short and to the point ----
export const SPACES = {
  workspace: {
    path: '/workspace', title: 'Hot Desks & Dedicated Seats', short: 'Seats', image: IMG.floor,
    alt: 'Coworking desks at Lemoria Luxe, Coimbatore', card: 'Elegant hot desks, dedicated seats and quiet focus cabins.',
    tagline: 'A premium seat in a beautifully designed workspace.',
    intro: 'Hot desks and dedicated seats in a bright, elegant workspace on Gandhipuram, with private focus cabins and phone booths when you need quiet.',
    includes: ['High-speed Wi-Fi', 'Lockers', 'Pantry', 'Phone booths', 'Informal meeting areas', 'Outdoor work area'],
    types: [
      { name: 'Hot Desk', image: IMG.community, desc: 'Any open seat in the workspace.' },
      { name: 'Dedicated Seat', image: IMG.desk, desc: 'Your own desk, every day.' },
      { name: 'Focus Cabin', image: IMG.focus, desc: 'A quiet single-person cabin. 4 available.' },
    ],
    facts: [['~50', 'Seats'], ['4', 'Focus cabins'], ['8 AM – 9 PM', 'Mon – Sat']],
    cta: { label: 'Book seats', to: '/book?tab=seats' },
  },
  'private-cabins': {
    path: '/private-cabins', title: 'Private Offices', short: 'Offices', image: IMG.offices,
    alt: 'Private offices at Lemoria Luxe, Coimbatore', card: 'Fully managed private offices for teams of about 4 to 8.',
    tagline: 'A fully managed private office for your team, ready to move in.',
    intro: 'Six beautifully furnished, fully managed private offices for teams of about 4 to 8. We take care of everything, so your team can focus on the work.',
    includes: ['Private, furnished office', 'Whiteboard', 'High-speed Wi-Fi', 'Conference room access', 'Reception for guests', 'Pantry & lockers'],
    types: [
      { name: 'Team Office', image: IMG.cabin, desc: 'For about 4 people.' },
      { name: 'Large Team Office', image: IMG.offices, desc: 'For about 6 to 8 people.' },
    ],
    facts: [['6', 'Private offices'], ['4 – 8', 'People per office'], ['Fully', 'Managed']],
    cta: { label: 'Enquire about an office', to: '/contact?type=Private cabin' },
  },
  'conference-cabins': {
    path: '/conference-cabins', title: 'Conference Room', short: 'Meeting spaces', image: IMG.conference,
    alt: 'Conference room at Lemoria Luxe, Coimbatore', card: 'A boardroom-style room for about 10, by the hour.',
    tagline: 'A boardroom-style conference room for about 10. Book by the hour.',
    intro: 'Impress clients in a polished, private conference room on Gandhipuram, with informal meeting areas and phone booths close by. No membership needed.',
    includes: ['Seats about 10', 'High-speed Wi-Fi', 'Pantry nearby', 'Reception for guests', 'Phone booths for calls', 'Informal meeting areas'], // TODO: add display / video conferencing if provided
    types: [], // filled from CABINS below
    facts: [['~10', 'Seats'], ['Hourly', 'Booking'], ['No', 'Membership needed']],
    cta: { label: 'Book the conference room', to: '/book?tab=conference' },
  },
  'day-pass': {
    path: '/day-pass', title: 'Day Pass', short: 'Day pass', image: IMG.focus,
    alt: 'Working by the window at Lemoria Luxe, Coimbatore', card: 'A day of premium workspace. No commitment.',
    tagline: 'Experience premium coworking for a day.',
    intro: 'Enjoy a day in our elegant workspace with fast Wi-Fi and the pantry. The easiest way to experience Lemoria Luxe.',
    includes: ['Any open seat', 'High-speed Wi-Fi', 'Pantry', 'Phone booths', 'Outdoor work area', 'Add the conference room'],
    types: [
      { name: 'Seat for the Day', image: IMG.focus, desc: 'One seat, 8 AM to 9 PM.' },
      { name: 'Team Day', image: IMG.collab, desc: 'A few seats together for a day.' },
    ],
    facts: [['8 AM – 9 PM', 'One full day'], ['Any', 'Open seat'], ['No', 'Commitment']],
    cta: { label: 'Book a day pass', to: '/book?tab=seats' },
  },
  'virtual-office': {
    path: '/virtual-office', title: 'Virtual Office', short: 'Virtual office', image: IMG.clientMeeting,
    alt: 'Professional meeting at Lemoria Luxe, Coimbatore', card: 'A prestigious Gandhipuram business address.',
    tagline: 'A prestigious business address on Gandhipuram, Coimbatore.',
    intro: 'Give your business a premium Coimbatore address, with mail handling and the conference room whenever you need to meet in person.',
    includes: ['Registered business address', 'GST registration support', 'Mail & courier handling', 'Conference room access'], // TODO: confirm GST documents provided
    types: [
      { name: 'Business Address', image: IMG.offices, desc: 'For registration, GST and letterhead.' },
      { name: 'Mail Handling', image: IMG.clientMeeting, desc: 'We receive and hold your post.' },
    ],
    facts: [['Avinashi', 'Road address'], ['Mail', 'Handling'], ['Meet', 'In person']],
    cta: { label: 'Enquire about a virtual office', to: '/contact?type=Virtual office' },
  },
};

// Meeting spaces. Only the conference room is bookable online (seat counts are approximate).
export const CABINS = [
  { id: 'conference', name: 'Conference Room', seats: 10, image: IMG.conference, desc: 'For client meetings and team discussions.' },
];
SPACES['conference-cabins'].types = [
  { name: 'Conference Room', image: IMG.conference, desc: 'Seats about 10. Book by the hour.' },
  { name: 'Informal Meeting Areas', image: IMG.lounge, desc: 'Relaxed seating for quick chats.' },
  { name: 'Phone Booths', image: IMG.meeting, desc: '2 private booths for calls.' },
];

// Booking page options (open workspace; private offices are enquired separately).
export const TEAM_SIZES = [
  { id: 'solo', label: 'Solo', range: '1 seat', seats: 1 },
  { id: 'small', label: 'Small team', range: '2 – 5 seats', seats: 3 },
  { id: 'team', label: 'Team', range: '6 – 10 seats', seats: 8 },
  { id: 'larger', label: 'Larger team', range: '10+ seats', seats: 12 },
];
export const MAX_SEATS = 15; // approximate open-workspace capacity; larger teams are pointed to private offices
export const DURATIONS = ['Day', 'Week', 'Month', '3 Months+'];
export const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

// Plans page. TODO: replace with Lemoria Luxe's real plans (names, prices, inclusions) when shared.
export const PLANS = [
  { name: 'Flexi Seat', desc: 'Any open seat, any day.' },
  { name: 'Dedicated Seat', desc: 'Your own desk, every day.', popular: true },
  { name: 'Private Office', desc: 'A private office for about 4 to 8.' },
  { name: 'Virtual', desc: 'A business address, no desk.' },
];

// ---- Home page ----
export const HOME = {
  hero: {
    kicker: 'Coimbatore · Gandhipuram · Now open',
    title: 'Luxury workspaces & private offices',
    accent: 'in the heart of Coimbatore.',
    text: 'Designer desks, private offices and a boardroom for ambitious teams. .',
    points: ['Elegant interiors', 'Flexible terms', 'Ready to move in'],
  },
  sections: {
    spaces: { kicker: 'Workspaces', title: 'Workspaces, beautifully considered', text: 'From a single desk to your own private office.' },
    personas: { kicker: 'Who it’s for', title: 'Built for the way you work' },
    steps: { kicker: 'Getting started', title: 'Three steps to your new workspace' },
    amenities: { kicker: 'Amenities', title: 'Every detail, thoughtfully taken care of' },
    location: { kicker: 'Lemoria Central', title: 'A prestigious address on Gandhipuram' },
  },
  // Approximate figures — keep them approximate.
  stats: [
    { n: '~50', l: 'Seats', icon: 'chair' },
    { n: '6', l: 'Private offices', icon: 'door' },
    { n: '4', l: 'Focus cabins', icon: 'lock' },
    { n: '8 AM – 9 PM', l: 'Mon – Sat', icon: 'clock' },
  ],
  // "Built for the way you work" — who Lemoria Luxe is for. Each card links to the best-fit workspace.
  personas: [
    { icon: 'chair', title: 'Freelancers & consultants', text: 'A calm, professional desk away from home distractions.', to: '/workspace' },
    { icon: 'users', title: 'Startups & small teams', text: 'A private office your team can grow into, without a lease.', to: '/private-cabins' },
    { icon: 'shield', title: 'CAs, lawyers & agencies', text: 'Confidential offices and a polished room to meet clients.', to: '/private-cabins' },
    { icon: 'wifi', title: 'Remote & hybrid teams', text: 'Book seats only on the days your team comes in.', to: '/day-pass' },
    { icon: 'pin', title: 'Teams visiting Coimbatore', text: 'A ready base for project weeks and client visits.', to: '/day-pass' },
    { icon: 'mail', title: 'New businesses', text: 'A prestigious address for GST and company registration.', to: '/virtual-office' },
  ],
  steps: [
    { title: 'Book a tour', text: 'Visit any day, Monday to Saturday. We’ll show you around.' },
    { title: 'Choose your space', text: 'Pick a desk, cabin or private office. Get your quote the same day.' },
    { title: 'Move in', text: 'Your space is set up and ready. Just bring your laptop.' },
  ],
  tour: {
    title: 'Step inside Lemoria Luxe',
    text: 'Warm light, quiet corners and beautifully finished spaces, made for your best work.',
  },
};

// ---- Amenities: only what the Lemoria Luxe layout has (counts are approximate) ----
export const AMENITIES = [
  ['Reception', 'users'], ['Open workspace', 'chair'], ['6 private offices', 'door'], ['Conference room', 'present'],
  ['4 focus cabins', 'lock'], ['2 phone booths', 'phone'], ['Informal meeting areas', 'sofa'], ['Outdoor work area', 'sun'],
  ['Pantry', 'coffee'], ['Vending machine', 'water'], ['Lockers', 'lock'], ['Lift', 'lift'],
  ['Washrooms', 'check'], ['Whiteboards', 'board'], ['Server room', 'shield'], ['High-speed Wi-Fi', 'wifi'],
];

// ---- FAQ page (also published to Google as FAQ structured data) ----
export const FAQ = [
  { q: 'Where is Lemoria Luxe located?', a: `Lemoria Luxe is a premium coworking space off Gandhipuram, at ${SITE.address}.` },
  { q: 'What workspaces does Lemoria Luxe offer?', a: 'Hot desks, dedicated seats, focus cabins, private offices, a conference room, day passes and virtual offices.' },
  { q: 'How many seats does Lemoria Luxe have?', a: 'About 50 seats across the open workspace, 6 private offices, 4 focus cabins and an outdoor work area.' },
  { q: 'Can I book just one seat?', a: 'Yes. Book a single seat for a day, a week or a month.' },
  { q: 'Can I book the conference room without a membership?', a: 'Yes. The conference room seats about 10 and can be booked by the hour by anyone.' },
  { q: 'How much does a coworking space in Coimbatore cost at Lemoria Luxe?', a: 'It depends on the workspace and the length of your plan. Send us an enquiry and we will share the price the same day.' },
  { q: 'What are your opening hours?', a: `${SITE.hours}.` },
  { q: 'Can I visit before booking?', a: 'Yes. Book a tour and we will show you around at a time that suits you.' },
  { q: 'Can I use Lemoria Luxe as my business address?', a: 'Yes. Our virtual office gives you a registered business address in Coimbatore with mail handling.' },
];

// ---- About page ----
export const ABOUT = {
  story: [
    'Lemoria Luxe is a premium coworking space and managed office on Gandhipuram, Coimbatore, created for founders, professionals and growing companies who expect more from where they work.',
    'Every detail is considered, from refined interiors to quiet focus cabins and a boardroom-style conference room. Arrive, settle in, and do your best work.',
  ],
  mission: 'To give Coimbatore’s professionals a beautiful, effortless place to work.',
  vision: 'To be Coimbatore’s most trusted premium workspace.',
};

// ---- Gallery ----
export const GALLERY = [
  { src: IMG.floor, alt: 'Shared coworking floor', cat: 'Workspace' },
  { src: IMG.lounge, alt: 'Lounge', cat: 'Lounge' },
  { src: IMG.cabin, alt: 'Private office', cat: 'Offices' },
  { src: IMG.cafe, alt: 'Pantry', cat: 'Pantry' },
  { src: IMG.conference, alt: 'Conference room', cat: 'Meeting' },
  { src: IMG.desk, alt: 'Dedicated desk', cat: 'Workspace' },
  { src: IMG.offices, alt: 'Private offices', cat: 'Offices' },
  { src: IMG.community, alt: 'Members at a shared table', cat: 'Workspace' },
];

// Local (not UTC) date as YYYY-MM-DD. After 7 PM, bookings default to tomorrow.
export const localDate = (offsetDays = 0) => {
  const d = new Date(); d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
export const defaultBookingDate = () => localDate(new Date().getHours() >= 19 ? 1 : 0);
