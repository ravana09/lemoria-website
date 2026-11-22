import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { ArtBanner, CtaBand, Head } from '../components/Blocks.jsx';
import { LoungeArt } from '../components/Illustrations.jsx';
import { AMENITIES, WA_LINK } from '../data.js';

// The 16 amenities from the floor plan, in three groups.
const byName = Object.fromEntries(AMENITIES);
const GROUPS = [
  { title: 'Spaces',
    items: ['Reception', 'Open workspace', '6 private offices', 'Conference room', '4 focus cabins', '2 phone booths', 'Informal meeting areas', 'Outdoor work area'] },
  { title: 'Comfort',
    items: ['Pantry', 'Vending machine', 'Lockers', 'Washrooms'] },
  { title: 'Building & tech',
    items: ['Lift', 'Whiteboards', 'Server room', 'High-speed Wi-Fi','Bike Parking'] },
].map((g) => ({ ...g, items: g.items.filter((n) => byName[n]).map((n) => [n, byName[n]]) }));

const TITLE = 'Premium amenities at Lemoria Luxe, Coimbatore';

// Three groups side by side, open lists with fine lines.
function List() {
  return (
    <section className="section" id="sec-list">
      <div className="container">
        <Head center eyebrow="Included" title={TITLE} />
        <div className="aml2">
          {GROUPS.map((g) => (
            <div key={g.title} className="aml2-col">
              <h3>{g.title}<span>{g.items.length}</span></h3>
              <ul>{g.items.map(([n, i]) => <li key={n}><Icon name={i} size={20} />{n}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Amenities() {
  return (
    <>
      <ArtBanner crumb="Amenities" title="Amenities" art={LoungeArt}
        text="Every detail, thoughtfully taken care of. Private offices, focus cabins, a conference room and a calm lounge, all in one premium space.">
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-primary"><Icon name="whatsapp" size={18} /> WhatsApp us</a>
      </ArtBanner>
      <List />
      <CtaBand />
    </>
  );
}
