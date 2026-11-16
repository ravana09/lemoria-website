import Img from '../components/Img.jsx';
import Icon from '../components/Icon.jsx';
import { Banner, CtaBand, Head } from '../components/Blocks.jsx';
import { ABOUT, IMG, MAP_EMBED, MAP_LINK, SITE, WHY } from '../data.js';

export default function About() {
  return (
    <>
      <Banner image={IMG.lounge} alt="Lounge at Lemoria co-working space, Coimbatore" crumb="About us" title="A workplace that feels like a community" text="Flexible workspace, private conference cabins and a supportive community, under one roof in Nehru Nagar East, Coimbatore." />

      {/* Story */}
      <section className="section">
        <div className="container split">
          <Img src={IMG.team} alt="Members collaborating at Lemoria, Coimbatore" sizes="(max-width: 860px) 100vw, 580px" />
          <div>
            <Head eyebrow="Our story" title="Built for people who build things" />
            {ABOUT.story.map((p) => <p className="sp-p" key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="ab-nums">
        <div className="container">
          {ABOUT.numbers.map((x) => <div key={x.l}><b>{x.n}</b><span>{x.l}</span></div>)}
        </div>
      </section>

      {/* Mission & vision */}
      <section className="section">
        <div className="container ab-mv">
          <div><span className="icbox"><Icon name="arrowUR" size={24} /></span><h3>Our mission</h3><p>{ABOUT.mission}</p></div>
          <div><span className="icbox"><Icon name="star" size={24} /></span><h3>Our vision</h3><p>{ABOUT.vision}</p></div>
        </div>
      </section>

      {/* Values */}
      <section className="section soft">
        <div className="container">
          <Head center eyebrow="Why Lemoria" title="What sets us apart" lead="Four promises we keep to every member, from a one-day visitor to a sixty-seat company." />
          <div className="grid4">{WHY.map((w) => <div className="why3-card" key={w.title}><span className="icbox"><Icon name={w.icon} size={26} /></span><h3>{w.title}</h3><p>{w.text}</p></div>)}</div>
        </div>
      </section>

      {/* Location */}
      <section className="section">
        <div className="container ab-loc">
          <div>
            <Head eyebrow="Find us" title="In the heart of Nehru Nagar East" lead="Lemoria is easy to reach from across Coimbatore, with parking for cars and bikes. Drop by for a tour any day from Monday to Saturday." />
            <ul className="info-list">
              <li><span className="icbox"><Icon name="pin" size={22} /></span><div><small>Address</small><span>{SITE.address}</span></div></li>
              <li><span className="icbox"><Icon name="clock" size={22} /></span><div><small>Opening hours</small><span>{SITE.hours}</span></div></li>
              <li><span className="icbox"><Icon name="mail" size={22} /></span><div><small>Email</small><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div></li>
            </ul>
            <a className="btn btn-outline" href={MAP_LINK} target="_blank" rel="noreferrer"><Icon name="pin" size={18} /> Get directions</a>
          </div>
          <iframe className="map ab-map" title={`Map to ${SITE.name}, ${SITE.area}`} loading="lazy" src={MAP_EMBED} referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
