import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import Icon from '../components/Icon.jsx';
import { ArtBanner, CtaBand, Head, Num } from '../components/Blocks.jsx';
import { TeamArt } from '../components/Illustrations.jsx';
import MapFrame from '../components/MapFrame.jsx';
import { ABOUT, HOME, IMG, MAP_LINK, SITE } from '../data.js';

const FACTS = HOME.stats.slice(0, 3);
const MV = [
  { label: 'Our mission', text: ABOUT.mission, icon: 'arrowUR' },
  { label: 'Our vision', text: ABOUT.vision, icon: 'star' },
];

export default function About() {
  return (
    <>
      {/* Illustrated banner */}
      <ArtBanner crumb="About" title="About Lemoria Luxe" art={TeamArt}
        text="Premium coworking and managed offices on Avinashi Road, Coimbatore. A calm, beautifully finished place for founders, professionals and growing teams.">
        <Link to="/contact" className="btn btn-primary">Get in touch</Link>
      </ArtBanner>

      {/* Our story: heading on the left; words and key figures on the right */}
      <section className="section" id="sec-story">
        <div className="container abs4-in">
          <Head eyebrow="Our story" title="A workplace worthy of your ambition" />
          <div>
            {ABOUT.story.map((p) => <p className="sp-p" key={p.slice(0, 24)}>{p}</p>)}
            <ul className="abs4-facts">{FACTS.map((f) => <li key={f.l}><b><Num n={f.n} /></b><span>{f.l}</span></li>)}</ul>
          </div>
        </div>
      </section>

      {/* Mission & vision: office photo behind two cards */}
      <section className="abm4" id="sec-mv">
        <Img src={IMG.offices} alt="" sizes="100vw" className="abm4-bg" />
        <div className="abm4-shade" />
        <div className="container abm4-in">
          {MV.map((m) => <div className="abm4-card" key={m.label}><span className="icbox"><Icon name={m.icon} size={22} /></span><h3>{m.label}</h3><p>{m.text}</p></div>)}
        </div>
      </section>

      {/* Find us: details beside the map */}
      <section className="section" id="sec-find">
        <div className="container ab-loc">
          <div>
            <Head eyebrow="Find us" title="On Avinashi Road, Coimbatore" />
            <ul className="info-list">
              <li><span className="icbox"><Icon name="pin" size={22} /></span><div><small>Address</small><span>{SITE.address}</span></div></li>
              <li><span className="icbox"><Icon name="clock" size={22} /></span><div><small>Open</small><span>{SITE.hours}</span></div></li>
            </ul>
            <a className="btn btn-outline" href={MAP_LINK} target="_blank" rel="noreferrer"><Icon name="pin" size={18} /> Get directions</a>
          </div>
          <MapFrame className="ab-map" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
