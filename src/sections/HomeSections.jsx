// Home page sections (the designs chosen from the preview round).
import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import Icon from '../components/Icon.jsx';
import Sec from '../components/Sec.jsx';
import { BgVideo, LoopVideo } from '../components/Video.jsx';
import QuickEnquiry from '../components/QuickEnquiry.jsx';
import MapFrame from '../components/MapFrame.jsx';
import { AMENITIES, HOME, MAP_LINK, SITE, SPACES, TOUR_LINK, VIDEOS, WA_LINK } from '../data.js';

const CARDS = ['workspace', 'private-cabins', 'conference-cabins', 'day-pass', 'virtual-office'].map((id) => SPACES[id]);
const pad = (i) => String(i + 1).padStart(2, '0');

function Title({ kicker, title, text, center, light }) {
  return (
    <div className={`st ${center ? 'center' : ''} ${light ? 'st-light' : ''}`}>
      {kicker && <span className={`kicker ${light ? 'light' : ''}`}>{kicker}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

// Hero: film behind, words left, quote form right. On phones the film fills the screen behind the words
// and the form follows underneath (see .hv in home.css).
export function Hero() {
  const h = HOME.hero;
  return (
    <section className="hv" id="sec-hero">
      <div className="hv-media">
        <BgVideo src={VIDEOS.hero.src} poster={VIDEOS.hero.poster} />
        <div className="hv-shade" />
      </div>
      <div className="container hv-in">
        <div className="hv-copy">
          <span className="kicker light">{h.kicker}</span>
          <h1>{h.title} <span className="hv-accent">{h.accent}</span></h1>
          <p>{h.text}</p>
          <ul className="hv-points">{h.points.map((pt) => <li key={pt}><Icon name="check" size={18} />{pt}</li>)}</ul>
          <div className="btns">
            <Link to={TOUR_LINK} className="btn btn-primary">Book a tour</Link>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-white"><Icon name="whatsapp" size={18} /> WhatsApp us</a>
          </div>
        </div>
        <QuickEnquiry />
      </div>
    </section>
  );
}

// Workspaces: a mosaic, one feature space and four smaller (a swipeable row on phones).
export function Spaces() {
  const s = HOME.sections.spaces;
  return (
    <Sec id="spaces">
      <div className="container">
        <Title kicker={s.kicker} title={s.title} text={s.text} />
        <div className="sp4">
          {CARDS.map((c) => (
            <Link to={c.path} key={c.path} className="sp4-card">
              <Img src={c.image} alt={c.alt} sizes="(max-width: 700px) 85vw, 600px" />
              <div className="sp4-body"><h3>{c.title}</h3><p>{c.card}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// Who it's for: dark band.
export function Personas() {
  const s = HOME.sections.personas;
  return (
    <Sec id="why" className="pr3">
      <div className="container">
        <Title center light kicker={s.kicker} title={s.title} />
        <div className="pr3-grid">
          {HOME.personas.map((p) => (
            <Link to={p.to} className="pr3-item" key={p.title}>
              <span className="icbox"><Icon name={p.icon} size={22} /></span>
              <div><h3>{p.title}</h3><p>{p.text}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// Video tour: film in a fine gold frame, words on the right.
const TOUR_TITLE = 'Inside Lemoria Luxe premium coworking space, Avinashi Road, Coimbatore';
const TOUR_FACTS = ['Reception & lounge', 'Private offices', 'Conference room', 'Focus cabins'];

export function Tour() {
  const t = HOME.tour;
  return (
    <Sec id="tour">
      <div className="container tour4">
        <div className="tour4-frame"><LoopVideo src={VIDEOS.tour.src} poster={VIDEOS.tour.poster} title={TOUR_TITLE} /></div>
        <div className="tour4-copy">
          <Title kicker="A closer look" title={t.title} text={t.text} />
          <ul className="tour4-facts">{TOUR_FACTS.map((f) => <li key={f}><Icon name="check" size={16} />{f}</li>)}</ul>
          <div className="btns">
            <Link to={TOUR_LINK} className="btn btn-primary">Book a tour</Link>
            <Link to="/gallery" className="btn btn-outline">View gallery</Link>
          </div>
        </div>
      </div>
    </Sec>
  );
}

// Amenities: a large count beside the full list.
export function Amenities() {
  const s = HOME.sections.amenities;
  return (
    <Sec id="amenities">
      <div className="container am4">
        <div className="am4-head">
          <span className="kicker">{s.kicker}</span>
          <b className="am4-count">{AMENITIES.length}</b>
          <p>thoughtful details, all included in your membership.</p>
          <Link to="/amenities" className="more">See them all <Icon name="arrow" size={16} /></Link>
        </div>
        <ul className="am4-list">{AMENITIES.map(([name, icon]) => <li key={name}><Icon name={icon} size={20} />{name}</li>)}</ul>
      </div>
    </Sec>
  );
}

// Steps: dark band, large numerals.
export function Steps() {
  const s = HOME.sections.steps;
  return (
    <Sec id="steps" className="stp4">
      <div className="container">
        <Title center light kicker={s.kicker} title={s.title} />
        <ol className="stp4-list">{HOME.steps.map((st, i) => <li key={st.title}><span>{pad(i)}</span><div><h3>{st.title}</h3><p>{st.text}</p></div></li>)}</ol>
        <div className="center"><Link to={TOUR_LINK} className="btn btn-primary">Book your tour</Link></div>
      </div>
    </Sec>
  );
}

// Location: full-width map with the details on a card over it.
export function Location() {
  const s = HOME.sections.location;
  return (
    <section className="loc2" id="sec-location">
      <MapFrame className="loc2-map" />
      <div className="container loc2-wrap">
        <div className="loc2-card">
          <Title kicker={s.kicker} title={s.title} />
          <ul className="info-list">
            <li><span className="icbox"><Icon name="pin" size={22} /></span><div><small>Address</small><span>{SITE.address}</span></div></li>
            <li><span className="icbox"><Icon name="clock" size={22} /></span><div><small>Open</small><span>{SITE.hours}</span></div></li>
          </ul>
          <a className="btn btn-primary" href={MAP_LINK} target="_blank" rel="noreferrer"><Icon name="pin" size={18} /> Get directions</a>
        </div>
      </div>
    </section>
  );
}
