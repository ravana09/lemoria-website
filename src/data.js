// ---- All site content lives here. Edit text, images and contact details in one place. ----
// Lines marked TODO contain details only Lemoria can confirm (phone, prices, exact facilities).

export const SITE = {
  name: 'Lemoria',
  tagline: 'Beyond Numbers',
  phone: '+91 98765 43210', // TODO: real phone number (also update server/mail.js)
  email: 'lemoriacoworks@gmail.com',
  address: 'No. 1 to 2, Rajagopal Street, Nehru Nagar East, Coimbatore South, Coimbatore, Tamil Nadu 641014',
  street: 'No. 1 to 2, Rajagopal Street, Nehru Nagar East, Coimbatore South',
  city: 'Coimbatore', region: 'Tamil Nadu', postcode: '641014',
  area: 'Nehru Nagar East, Coimbatore',
  hours: 'Mon – Sat, 8:00 AM – 9:00 PM · Members 24/7',
  mapQuery: 'No. 1, Rajagopal Street, Nehru Nagar East, Coimbatore, Tamil Nadu 641014',
};
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=16&output=embed`;
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;

// Photos: hand-picked Unsplash placeholders that match each space. Replace with real photos of Lemoria
// (put files in /public/images and use '/images/x.jpg') before launch.
const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
export const IMG = {
  floor: u('photo-1504384308090-c894fdcc538d'), // large co-working floor with rows of desks
  community: u('photo-1568992687947-868a62a9f521'), // members working at a shared table
  desk: u('photo-1497215842964-222b430dc094'), // single dedicated desk by a window
  teamDesks: u('photo-1556761175-b413da4baf72'), // a team working at desks side by side
  cabin: u('photo-1604328698692-f76ea9498e76'), // bright private office with a small team
  offices: u('photo-1497366754035-f200968a6e72'), // glass-walled private offices
  meeting: u('photo-1517502884422-41eaead166d4'), // small meeting room (huddle cabin)
  conference: u('photo-1431540015161-0bf868a2d407'), // boardroom
  bigRoom: u('photo-1462826303086-329426d1aef5'), // large conference / training room
  clientMeeting: u('photo-1600880292203-757bb62b4baf'), // two professionals meeting
  lounge: u('photo-1524758631624-e2822e304c36'), // lounge with soft seating
  buzz: u('photo-1527192491265-7e15c55b1ed2'), // lively shared floor with string lights
  cafe: u('photo-1600508774634-4e11d34730e2'), // café and dining area
  focus: u('photo-1564069114553-7215e1ff1890'), // members working by the window (day pass)
  team: u('photo-1522071820081-009f0129c71c'), // team collaborating on laptops
  collab: u('photo-1519389950473-47ba0277781c'), // laptops on a shared table, top view
};

// Main menu: 4 items. "Workspace" opens a dropdown.
export const NAV = [
  { to: '/', label: 'Home' },
  { label: 'Workspace', menu: true },
  { to: '/about', label: 'About us' },
  { to: '/amenities', label: 'Amenities' },
];
export const WORKSPACE_MENU = [
  { to: '/workspace', icon: 'chair', title: 'Seats by the Chair', text: 'Book 1 to 60 seats for any team size' },
  { to: '/conference-cabins', icon: 'present', title: 'Conference Cabins', text: 'Private cabins by the hour' },
  { to: '/private-cabins', icon: 'door', title: 'Private Cabins', text: 'Lockable offices for 2 to 12' },
  { to: '/day-pass', icon: 'calendar', title: 'Day Pass', text: 'Drop in for a day, no commitment' },
  { to: '/virtual-office', icon: 'mail', title: 'Virtual Office', text: 'Business address & mail handling' },
  { to: '/book', icon: 'arrow', title: 'Book Now', text: 'Reserve seats or a cabin online' },
];

// Steps shown on every workspace page ("How it works").
const STEPS_BOOK = [
  { title: 'Tell us what you need', text: 'Book online or send an enquiry with the number of seats, dates and any special requirements.' },
  { title: 'We confirm availability', text: 'Our team calls or emails you with availability and pricing, usually within 2 business hours.' },
  { title: 'Visit or move in', text: 'Take a tour if you like, then arrive on your start date. Your space, Wi-Fi and access will be ready.' },
];

// ---- Workspace pages (/workspace, /private-cabins, /conference-cabins, /virtual-office, /day-pass) ----
export const SPACES = {
  workspace: {
    path: '/workspace', title: 'Seats by the Chair', short: 'Seat', image: IMG.floor, alt: 'Co-working floor with rows of desks at Lemoria, Coimbatore',
    tagline: 'Book one chair or sixty. Pay only for the seats you use.',
    intro: 'Whether you are a solo founder or a 50-person enterprise team, reserve exactly the number of chairs you need, by the day, week or month. Every seat comes with fast Wi-Fi, refreshments and lounge access.',
    details: [
      'Traditional offices make you rent square feet. At Lemoria you rent chairs. A freelancer can book a single flexible seat for a day, a startup can keep five dedicated desks together, and an enterprise project team can block up to 60 seats on the same floor, all on one simple plan.',
      'Your headcount is never locked in. Add seats when you hire, release them when a project ends, and move from flexible to dedicated seats whenever you want the same desk every day. Billing stays transparent: one invoice for all your seats.',
    ],
    includes: ['High-speed Wi-Fi with backup line', 'Ergonomic chair and spacious desk', 'Unlimited tea and coffee', 'Printing and scanning credits', 'Conference cabin hours with monthly plans', 'Housekeeping, power backup and air conditioning'],
    ideal: ['Freelancers and consultants', 'Startups and small teams', 'Enterprise and project teams', 'Remote employees who need a professional base'],
    types: [
      { name: 'Flexi Seat', image: IMG.community, desc: 'Any open chair on the shared floor, any day. Ideal for freelancers and remote professionals who like variety.', chips: ['High-speed Wi-Fi', 'Tea & coffee', 'Printing credits'] },
      { name: 'Dedicated Seat', image: IMG.desk, desc: 'The same desk every day, with lockable storage and 24/7 access, so you can leave your setup ready.', chips: ['Lockable storage', '24/7 access', 'Ergonomic chair'] },
      { name: 'Team Seats', image: IMG.teamDesks, desc: 'A block of 5 to 60 seats kept together for your company, scaled up or down each month.', chips: ['Seats together', 'Flexible headcount', 'Single invoice'] },
    ],
    faq: [
      { q: 'How many seats can my company book?', a: 'Anything from 1 to 60 seats in a single booking. For larger teams or a full floor, contact us and we will plan it with you.' },
      { q: 'Can we keep our seats together?', a: 'Yes. Team Seats are reserved side by side on the same floor so your team can work together.' },
      { q: 'Can I switch from a flexi seat to a dedicated seat?', a: 'Yes, you can upgrade at any time, subject to availability.' },
    ],
    cta: { label: 'Book seats', to: '/book?tab=seats' },
  },
  'private-cabins': {
    path: '/private-cabins', title: 'Private Cabins', short: 'Cabin', image: IMG.offices, alt: 'Glass-walled private cabins for teams at Lemoria, Coimbatore',
    tagline: 'Your team’s own lockable office, ready to move in.',
    intro: 'Fully furnished cabins for teams of 2 to 12, with your own branding, dedicated air conditioning and complete privacy.',
    details: [
      'A private cabin gives your team a quiet, lockable office of its own, without the cost of fitting out a commercial space. Desks, chairs, storage and air conditioning are already in place, so you can move in and start working the same week.',
      'You still enjoy everything Lemoria offers: the lounge, the café, conference cabins for client meetings, reception for your visitors and a professional business address. As your team grows, move to a larger cabin without changing your address.',
    ],
    includes: ['Lockable door and private access', 'Furnished desks, chairs and storage', 'Dedicated air conditioning', 'Your company branding on the door', 'Conference cabin hours every month', 'Reception for your guests and deliveries'],
    ideal: ['Small teams of 2 to 12 people', 'Companies handling confidential work', 'Teams that take frequent calls', 'Branch offices of larger companies'],
    types: [
      { name: 'Small Team Cabin', image: IMG.cabin, desc: 'A quiet, bright cabin for 2 to 4 people, ideal for a founding team or a small branch office.', chips: ['Lockable door', 'Furniture included', 'Dedicated AC'] },
      { name: 'Growth Cabin', image: IMG.offices, desc: 'A spacious room for 5 to 8 people with storage, a whiteboard and room to grow.', chips: ['Whiteboard', 'Storage', 'Dedicated AC'] },
      { name: 'Executive Cabin', image: IMG.clientMeeting, desc: 'A larger cabin for up to 12 people with a meeting table and space to welcome clients.', chips: ['Meeting table', 'Branding wall', 'Lounge seating'] },
    ],
    faq: [
      { q: 'Is the cabin furnished?', a: 'Yes. Desks, chairs, storage and air conditioning are included, so you only need to bring your laptops.' },
      { q: 'Can we put our company name on the cabin?', a: 'Yes. Private cabins include branding on the door, and larger cabins have a branding wall.' },
      { q: 'What is the minimum term?', a: 'Private cabins are usually booked monthly. Talk to us about shorter or longer terms.' },
    ],
    cta: { label: 'Enquire about a cabin', to: '/contact?type=Private cabin' },
  },
  'conference-cabins': {
    path: '/conference-cabins', title: 'Conference Cabins', short: 'Cabin', image: IMG.conference, alt: 'Boardroom-style conference cabin at Lemoria, Coimbatore',
    tagline: 'Private, soundproofed cabins for the meetings that matter.',
    intro: 'Separate conference cabins you can book by the hour or for the full day. Members and non-members welcome. Display, video conferencing and refreshments included.',
    details: [
      'Our conference cabins are kept apart from the shared floor so your discussions stay private and free from distractions. Choose from a 4-seat huddle cabin for interviews and calls, a 10-seat executive boardroom for client presentations, or a 20-seat room for workshops and training sessions.',
      'Every cabin is ready when you arrive: the display is connected, the Wi-Fi works, and our team can arrange tea, coffee or catering for your guests. You do not need a membership to book, and you can reserve a single hour or the whole day.',
    ],
    includes: ['Large display or projector', 'Video conferencing setup', 'High-speed Wi-Fi', 'Whiteboard and stationery', 'Tea and coffee for attendees', 'Reception to welcome your guests'],
    ideal: ['Client meetings and presentations', 'Job interviews', 'Board and investor meetings', 'Workshops and team training'],
    types: [], // filled from CABINS below
    faq: [
      { q: 'Do I need to be a member to book a conference cabin?', a: 'No. Anyone can book a conference cabin by the hour or for a full day.' },
      { q: 'What is the shortest booking?', a: 'You can book a cabin for as little as one hour.' },
      { q: 'Can you arrange food for my meeting?', a: 'Tea and coffee are included. Catering can be arranged on request; let us know when you book.' },
    ],
    cta: { label: 'Book a conference cabin', to: '/book?tab=conference' },
  },
  'virtual-office': {
    path: '/virtual-office', title: 'Virtual Office', short: 'Virtual', image: IMG.clientMeeting, alt: 'Professionals meeting at Lemoria, Coimbatore',
    tagline: 'A prestigious business address without the overhead.',
    intro: 'Register your business at a professional address in Nehru Nagar East, Coimbatore, with GST registration support, mail handling and conference cabin credits.',
    details: [
      'A virtual office gives your business a credible Coimbatore address for your company registration, GST, website and letterhead, while your team works from anywhere. It is the simplest way to establish a local presence without renting a full office.',
      'We receive and safely hold your letters and courier, let you know when something arrives, and welcome your visitors. When you need to meet a client in person, use your conference cabin credits or book extra hours.',
    ],
    includes: ['Registered business address', 'Support for GST registration documents', 'Mail and courier handling', 'Notification when post arrives', 'Conference cabin credits', 'Option to upgrade to a seat or cabin'],
    ideal: ['New companies registering in Coimbatore', 'Businesses expanding to a new city', 'Consultants who work from home', 'Online businesses that need a local address'],
    types: [
      { name: 'Registered Address', image: IMG.offices, desc: 'Use our address for your company registration, GST, website and letterhead.', chips: ['GST support', 'Business address'] },
      { name: 'Mail & Reception', image: IMG.clientMeeting, desc: 'We receive and hold your mail and courier, and greet your visitors professionally.', chips: ['Mail handling', 'Reception'] },
    ],
    faq: [
      { q: 'Can I use the address for GST registration?', a: 'Yes. We provide the documents you need to register your business at our address. Ask our team for the current list.' }, // TODO: confirm documents provided
      { q: 'What happens to my mail?', a: 'We receive and safely hold your letters and courier and let you know when something arrives.' },
      { q: 'Can I meet clients at Lemoria?', a: 'Yes. Your plan includes conference cabin credits, and you can book more hours whenever you need them.' },
    ],
    cta: { label: 'Enquire about a virtual office', to: '/contact?type=Virtual office' },
  },
  'day-pass': {
    path: '/day-pass', title: 'Day Pass', short: 'Day pass', image: IMG.focus, alt: 'Members working by the window at Lemoria, Coimbatore',
    tagline: 'Drop in for a day of focused work.',
    intro: 'No commitment. Choose a day, bring your laptop, and we will have a chair, Wi-Fi and coffee ready.',
    details: [
      'A day pass is the easiest way to try Lemoria or to get away from distractions at home. Book the day you want, arrive with your laptop, and work from any open seat on the shared floor with fast Wi-Fi, unlimited coffee and a calm atmosphere.',
      'It is also a great option when you are visiting Coimbatore for work, or when your team wants a fresh place to plan together for a day. If you enjoy it, you can move to a monthly plan at any time.',
    ],
    includes: ['Any open seat on the shared floor', 'High-speed Wi-Fi', 'Unlimited tea and coffee', 'Lounge and café access', 'Printing on request', 'Option to add a conference cabin by the hour'],
    ideal: ['Remote workers who need a change from home', 'Visitors to Coimbatore', 'People trying co-working for the first time', 'Teams planning an offsite day'],
    types: [
      { name: 'Seat for the Day', image: IMG.focus, desc: 'A chair on the shared floor for the whole day, with unlimited coffee and lounge access.', chips: ['Wi-Fi', 'Unlimited coffee', 'Lounge access'] },
      { name: 'Team Day', image: IMG.collab, desc: 'Several seats together for a day, with the option to add a conference cabin for your planning session.', chips: ['Seats together', 'Add a cabin', 'Wi-Fi'] },
    ],
    faq: [
      { q: 'Do I need to book in advance?', a: 'Booking ahead guarantees your seat, especially on busy days, but walk-ins are welcome when seats are free.' },
      { q: 'What time can I arrive?', a: 'Day passes can be used during opening hours, Monday to Saturday, 8:00 AM to 9:00 PM.' },
      { q: 'Can I bring a colleague?', a: 'Yes. Book a seat for each person, or choose a Team Day to sit together.' },
    ],
    cta: { label: 'Book a day pass', to: '/book?tab=seats&plan=Flexi%20Seat' },
  },
};
Object.values(SPACES).forEach((s) => { s.steps = STEPS_BOOK; });

// Separate conference cabins, bookable by the hour.
export const CABINS = [
  { id: 'huddle', name: 'Huddle Cabin', seats: 4, image: IMG.meeting, desc: 'An intimate cabin for interviews, calls and quick team syncs.', chips: ['55" display', 'Whiteboard', 'Wi-Fi'] },
  { id: 'boardroom', name: 'Executive Boardroom', seats: 10, image: IMG.conference, desc: 'A boardroom table, comfortable chairs and video conferencing for client presentations.', chips: ['Video conferencing', '75" display', 'Coffee service'] },
  { id: 'summit', name: 'Grand Conference Cabin', seats: 20, image: IMG.bigRoom, desc: 'Our largest room for workshops, trainings and town halls.', chips: ['Projector', 'Sound system', 'Catering on request'] },
];
SPACES['conference-cabins'].types = CABINS.map((c) => ({ name: c.name, image: c.image, desc: `${c.desc} Seats up to ${c.seats} people.`, chips: c.chips }));

// Company-size presets for seat booking.
export const TEAM_SIZES = [
  { id: 'solo', label: 'Solo', range: '1 seat', seats: 1 },
  { id: 'small', label: 'Small team', range: '2 – 10 seats', seats: 6 },
  { id: 'growing', label: 'Growing company', range: '11 – 30 seats', seats: 20 },
  { id: 'enterprise', label: 'Enterprise', range: '31 – 60+ seats', seats: 40 },
];
export const MAX_SEATS = 60;
export const DURATIONS = ['Day', 'Week', 'Month', '3 Months+'];
export const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

// ---- Memberships page ----
export const PLANS = [
  { name: 'Flexi Seat', desc: 'One chair, any day you need it. Perfect for freelancers and remote professionals.', features: ['Any open seat on the shared floor', 'High-speed Wi-Fi', 'Unlimited tea & coffee', 'Lounge and café access', '2 conference cabin hours a month'] },
  { name: 'Dedicated Seat', desc: 'The same desk every day, set up exactly how you like it.', popular: true, features: ['Your own desk and chair', '24/7 access', 'Lockable storage', '5 conference cabin hours a month', 'Printing credits'] },
  { name: 'Team Seats', desc: '5 to 60 seats kept together for growing companies.', features: ['Seats reserved side by side', 'Scale up or down monthly', '20 conference cabin hours a month', 'Company branding', 'Single monthly invoice'] },
  { name: 'Virtual', desc: 'A professional business address without the desk.', features: ['Registered business address', 'Mail and courier handling', 'GST registration support', '1 conference cabin hour a month'] },
]; // TODO: confirm the cabin hours included in each plan
export const MEMBERSHIP_INFO = {
  intro: 'Every Lemoria membership includes high-speed Wi-Fi, refreshments, housekeeping and access to our lounge and café. Choose the plan that fits how you work today, and change it as your needs change.',
  pricing: 'Rates depend on the number of seats and the length of your plan, so we share them on enquiry. Tell us what you need and we will send a clear quote, usually the same day.',
  faq: [
    { q: 'Is there a long-term contract?', a: 'No. Plans are flexible and usually monthly. Longer plans can be arranged if you prefer.' },
    { q: 'Can I change my plan later?', a: 'Yes. You can upgrade, downgrade or add seats as your team changes.' },
    { q: 'How do I pay?', a: 'You receive one monthly invoice for all your seats and services.' }, // TODO: confirm payment terms
  ],
};

// ---- Home page wording ----
export const HERO = {
  kicker: 'Premium co-working space in Coimbatore',
  title: 'Your trusted partner for premium flexible workspaces.',
  text: 'Book a single chair or seat your whole company, and meet clients in our private conference cabins, in the heart of Nehru Nagar East, Coimbatore. Every space is fully furnished and ready to use, with flexible daily, weekly and monthly plans.',
  note: 'No long-term lease · Wi-Fi & refreshments included · Tours Monday to Saturday',
};

// Home: short "About Lemoria" introduction (shown right after the hero).
export const HOME_ABOUT = {
  title: 'A co-working space in Coimbatore built around the way you work',
  paras: [
    'Lemoria is a premium co-working space in Nehru Nagar East, Coimbatore, created for freelancers, startups and established companies who want a professional place to work without the cost and commitment of a traditional office.',
    'Instead of renting square feet, you book exactly what you need: one chair for a day, a group of seats for your team, a lockable private cabin, or a conference cabin for an important meeting. Everything is furnished, connected and looked after, so you can simply arrive and get to work.',
  ],
  points: [
    { icon: 'chair', title: '1 to 60 seats', text: 'Book by the chair for any team size.' },
    { icon: 'present', title: '3 conference cabins', text: 'For 4, 10 and 20 people, by the hour.' },
    { icon: 'calendar', title: 'Flexible plans', text: 'Daily, weekly and monthly options.' },
    { icon: 'pin', title: 'Nehru Nagar East', text: 'An easy-to-reach Coimbatore address.' },
  ],
};

export const OFFERS_INTRO = 'Whether you need one chair for a day or a private office for your whole team, Lemoria gives you premium, ready-to-use workspace without the cost and commitment of a traditional lease. Every option includes high-speed Wi-Fi, housekeeping, refreshments and access to our lounge.';
export const OFFERS = [
  { to: '/workspace', icon: 'chair', image: IMG.community, title: 'Seats by the Chair', text: 'Reserve exactly the number of seats you need, from a single chair for a freelancer to 60 seats for a growing company. Pick any open seat or keep the same desk every day, and change your headcount month to month.', best: 'Freelancers, startups and enterprise teams' },
  { to: '/conference-cabins', icon: 'present', image: IMG.conference, title: 'Conference Cabins', text: 'Separate, soundproofed cabins away from the shared floor for client meetings, interviews, presentations and board reviews. Book by the hour or for the full day, even if you are not a member.', best: 'Client meetings, interviews and trainings' },
  { to: '/private-cabins', icon: 'door', image: IMG.cabin, title: 'Private Cabins', text: 'A lockable, fully furnished office for your team of 2 to 12, with your own branding, dedicated air conditioning and complete privacy, plus access to every shared amenity.', best: 'Small teams that need privacy' },
];

export const WHY_INTRO = 'Lemoria is designed for people who care about where they work. We combine the comfort of a premium business lounge with the flexibility of co-working, so you can scale up, scale down or simply drop in, without long contracts.';
export const WHY_NOTE = 'Transparent billing, a friendly community team and a professional address your clients will remember.';
export const WHY = [
  { icon: 'users', title: 'Built for every team size', text: 'Book exactly the seats you need, from one to sixty. Add or release seats month to month as your team grows, without moving office or signing a new lease.' },
  { icon: 'present', title: 'Private conference cabins', text: 'Meeting cabins kept separate from the shared floor so your conversations stay private. Members and guests can book them by the hour, with display and video conferencing ready.' },
  { icon: 'calendar', title: 'Flexibility on your terms', text: 'Choose daily, weekly or monthly plans. Start with a day pass, move to a dedicated seat, and upgrade to a private cabin whenever you are ready.' },
  { icon: 'leaf', title: 'Designed for comfort', text: 'Ergonomic chairs, natural light, quiet zones and a calm lounge make long days feel easy, while our housekeeping team keeps every space spotless.' },
];

export const EXPERIENCE_INTRO = 'From the moment you walk in, every detail is designed to help you focus, collaborate and feel at ease. Explore the spaces our members use every day.';
export const EXPERIENCE = [
  { title: 'Conference Cabin', image: IMG.conference, text: 'Present to clients in a private, soundproofed room with a large display, video conferencing and comfortable seating for up to 20 people.' },
  { title: 'Private Office', image: IMG.cabin, text: 'Your own lockable office with company branding, dedicated storage and air conditioning, ready to move in.' },
  { title: 'Cabins', image: IMG.meeting, text: 'Quiet huddle cabins and phone booths for focused calls, interviews and quick team syncs.' },
  { title: 'Lounge', image: IMG.lounge, text: 'A relaxed space to unwind, meet other members and recharge between meetings.' },
  { title: 'Cafeteria', image: IMG.cafe, text: 'Freshly brewed coffee, tea and snacks all day, plus a pantry for your own lunch.' },
];

export const AMENITIES_INTRO = 'Every Lemoria plan comes with the facilities, services and technology your business needs from day one, so you never have to think about Wi-Fi, printing, housekeeping or security.';
export const AMENITIES_NOTE = 'Ask our team for the full list included in your plan.';

export const CONTACT_INTRO = 'Connect with us to explore the perfect workspace solution for you. Tell us how many seats you need, when you would like to start, or which conference cabin you want to book, and our team will get back to you within one business day.';

// Amenities: 16 per tab, 64 in total (icon names are in components/Icon.jsx).
// TODO: remove any amenity Lemoria does not actually offer.
export const AMENITIES = [
  { group: 'Facilities', desc: 'Everyday comforts that make the workplace feel easy, from parking and refreshments to places to relax.', items: [
    ['Car parking', 'car'], ['Bike parking', 'bike'], ['Valet parking', 'car'], ['Tea & coffee', 'coffee'],
    ['Cafeteria', 'coffee'], ['Pantry', 'coffee'], ['Purified drinking water', 'water'], ['Lounge area', 'leaf'],
    ['Outdoor terrace', 'leaf'], ['Recreation zone', 'game'], ['Indoor games', 'game'], ['Reading corner', 'book'],
    ['Nap room', 'heart'], ['Washrooms & showers', 'water'], ['Lockable storage', 'lock'], ['Daily housekeeping', 'check'],
  ] },
  { group: 'Professional', desc: 'Services that help you look professional and keep your business running smoothly.', items: [
    ['Conference cabins', 'present'], ['Training room', 'present'], ['Event hall', 'calendar'], ['Podcast studio', 'mic'],
    ['Phone booths', 'phone'], ['Business lounge', 'users'], ['Reception desk', 'users'], ['Guest management', 'users'],
    ['Registered address', 'pin'], ['GST registration support', 'shield'], ['Mail handling', 'mail'], ['Courier service', 'mail'],
    ['Printing & scanning', 'printer'], ['Meeting room credits', 'calendar'], ['Networking events', 'users'], ['Community manager', 'heart'],
  ] },
  { group: 'Technology', desc: 'Fast, reliable technology so your work never stops.', items: [
    ['High-speed Wi-Fi', 'wifi'], ['Backup internet line', 'wifi'], ['Video conferencing', 'video'], ['Smart displays', 'present'],
    ['Projectors', 'present'], ['Wireless screen sharing', 'video'], ['Sound system', 'mic'], ['Power backup', 'bolt'],
    ['Charging points', 'bolt'], ['Secure LAN', 'shield'], ['Door access control', 'lock'], ['Smart lockers', 'lock'],
    ['Online booking', 'calendar'], ['Visitor app', 'phone'], ['Plug-and-play desks', 'chair'], ['24/7 IT support', 'clock'],
  ] },
  { group: 'Health & Safety', desc: 'A safe, clean and comfortable environment for everyone, every day.', items: [
    ['24/7 air conditioning', 'snow'], ['Air purifiers', 'snow'], ['Natural light', 'leaf'], ['Indoor plants', 'leaf'],
    ['Ergonomic chairs', 'chair'], ['24/7 access', 'clock'], ['Biometric entry', 'lock'], ['CCTV security', 'shield'],
    ['Security guards', 'shield'], ['Fire safety', 'shield'], ['Emergency exits', 'arrow'], ['First aid', 'heart'],
    ['Wheelchair accessible', 'check'], ['Women-friendly facilities', 'heart'], ['Sanitised daily', 'check'], ['Pest control', 'check'],
  ] },
];

// Home page FAQ (also published to Google as FAQ structured data).
export const FAQ = [
  { q: 'Where is Lemoria located?', a: `Lemoria is at ${SITE.address}.` },
  { q: 'Can I book just one chair?', a: 'Yes. You can book a single seat for a day, a week or a month, or reserve up to 60 seats together for your company.' },
  { q: 'Can non-members book a conference cabin?', a: 'Yes. Conference cabins are separate from the shared floor and anyone can book them by the hour or for a full day.' },
  { q: 'Can my company change the number of seats later?', a: 'Yes. Team Seats plans can be scaled up or down each month without a new contract.' },
  { q: 'What is included with every seat?', a: 'High-speed Wi-Fi, an ergonomic chair, unlimited tea and coffee, housekeeping, power backup and access to the lounge and café.' },
  { q: 'Can I take a tour before booking?', a: 'Absolutely. Send us an enquiry or call us and we will arrange a time that suits you, Monday to Saturday.' },
  { q: 'How do cancellations work?', a: 'Conference cabin bookings can be cancelled free of charge up to 24 hours before the start time.' }, // TODO: confirm policy
];

// ---- About page ----
export const ABOUT = {
  story: [
    'Lemoria was created with a simple idea: great work needs a great place, and that place should fit your business, not the other way round. Too many professionals in Coimbatore were choosing between noisy cafés, isolated home offices and expensive long leases.',
    'So we built a premium co-working space where you pay only for what you use. Book a single chair or seat your entire company. Hold your client meetings in a private conference cabin. Grow from one desk to a private office without ever changing your address.',
    'Our name reflects our promise, Beyond Numbers. A workspace is more than square feet and seat counts. It is the comfort of your chair, the quiet of a focused afternoon, the confidence of welcoming a client, and the people you meet along the way.',
  ],
  mission: 'To give every professional and company in Coimbatore a beautiful, flexible and fully supported place to work, so they can focus on what they do best.',
  vision: 'To be the most trusted workspace partner for growing businesses in the region, known for comfort, flexibility and genuine care.',
  numbers: [
    { n: '1 – 60', l: 'Seats per booking' },
    { n: '3', l: 'Conference cabins' },
    { n: '60+', l: 'Amenities' },
    { n: '6 days', l: 'Open every week' },
  ],
};

// ---- Gallery page ----
export const GALLERY = [
  { src: IMG.floor, alt: 'Shared co-working floor with rows of desks', cat: 'Workspace' },
  { src: IMG.lounge, alt: 'Lounge with soft seating', cat: 'Lounge' },
  { src: IMG.meeting, alt: 'Huddle cabin for small meetings', cat: 'Cabins' },
  { src: IMG.cabin, alt: 'Bright private office for a small team', cat: 'Cabins' },
  { src: IMG.cafe, alt: 'Café and dining area', cat: 'Café' },
  { src: IMG.conference, alt: 'Executive boardroom', cat: 'Cabins' },
  { src: IMG.desk, alt: 'Dedicated desk by the window', cat: 'Workspace' },
  { src: IMG.bigRoom, alt: 'Grand conference cabin for workshops', cat: 'Cabins' },
  { src: IMG.community, alt: 'Members working at a shared table', cat: 'Community' },
  { src: IMG.offices, alt: 'Glass-walled private cabins', cat: 'Cabins' },
  { src: IMG.focus, alt: 'Working by the window', cat: 'Workspace' },
  { src: IMG.buzz, alt: 'Lively shared floor with string lights', cat: 'Community' },
];

// Local (not UTC) date as YYYY-MM-DD. After 7 PM, bookings default to tomorrow.
export const localDate = (offsetDays = 0) => {
  const d = new Date(); d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
export const defaultBookingDate = () => localDate(new Date().getHours() >= 19 ? 1 : 0);
