// Home page sections (the designs chosen from the preview round).
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import Icon from '../components/Icon.jsx';
import Sec from '../components/Sec.jsx';
import { BgVideo, LoopVideo } from '../components/Video.jsx';
import QuickEnquiry from '../components/QuickEnquiry.jsx';
import PlacesMap from '../components/PlacesMap.jsx';
import { AMENITIES, HOME, LOCATIONS, SPACES, VIDEOS, directionsFor, waFor } from '../data.js';

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
// Opens a space on the map: scrolls down to the map section and selects that space there.
export function showPlace(i) {
  window.dispatchEvent(new CustomEvent('lemoria:place', { detail: i }));
  const map = document.getElementById('sec-location');
  if (map) window.scrollTo({ top: map.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' });
}
// Hero: film behind, words left, quote form right. Under the words, a large "02" tells visitors there are two
// Lemoria spaces; each area name opens that space on the map. On phones the film fills the screen behind the
// words and the form follows underneath (see .hv in home.css).
export function Hero() {
  const h = HOME.hero;
  const n = LOCATIONS.length;
  return (
    <section className="hv" id="sec-hero">
      <div className="hv-media">
        <BgVideo src={VIDEOS.hero.src} poster={VIDEOS.hero.poster} />
        <div className="hv-shade" />
      </div>
      <div className="container hv-in">
        <div className="hv-copy">
          <span className="kicker light">{`Coimbatore · ${n} ${n === 1 ? 'space' : 'spaces'} · Now open`}</span>
          <h1>{h.title} <span className="hv-accent">{h.accent}</span></h1>
          <p>{h.text}</p>
          <div className="hvs-count">
            <b>{String(n).padStart(2, '0')}</b>
            <div>
              <span>Lemoria spaces in Coimbatore</span>
              <p>{LOCATIONS.map((p, i) => <button key={p.id} type="button" onClick={() => showPlace(i)}>{p.area}</button>)}</p>
            </div>
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
const TOUR_TITLE = 'Inside Lemoria Luxe premium coworking space, Gandhipuram, Coimbatore';
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
      </div>
    </Sec>
  );
}

// Location: one map per Lemoria space. The space names sit as chips in the centre of the map, the chosen space's
// details on a card on the left; choosing a space moves the map there (components/PlacesMap.jsx).
const STATUS = { open: 'Now open', full: 'Seats full', soon: 'Opening soon' };
const Status = ({ s }) => <span className={`pl-status is-${s}`}><i aria-hidden="true" />{STATUS[s]}</span>;

function PlaceButtons({ place }) {
  const ask = place.status === 'full'
    ? { label: 'Ask about availability', text: `Hi Lemoria, are any seats available at ${place.name}?` }
    : place.status === 'soon' ? { label: 'Get notified', text: `Hi Lemoria, please let me know when ${place.name} opens.` } : null;
  return (
    <div className="btns lc-btns">
      <a className="btn btn-primary" href={directionsFor(place)} target="_blank" rel="noreferrer"><Icon name="pin" size={18} /> Get directions</a>
      {ask && <a className="btn btn-outline" href={waFor(ask.text)} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> {ask.label}</a>}
    </div>
  );
}

export function Location() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const onPlace = (e) => setActive(Number(e.detail) || 0);
    window.addEventListener('lemoria:place', onPlace);
    return () => window.removeEventListener('lemoria:place', onPlace);
  }, []);
  const p = LOCATIONS[active];
  // On phones, bring the map back into view when a space is chosen, so the move can be seen.
  const choose = (i) => {
    setActive(i);
    if (window.innerWidth > 900) return;
    const map = document.querySelector('#sec-location .pm');
    const top = map && map.getBoundingClientRect().top;
    if (map && (top < 60 || top > window.innerHeight * 0.5)) window.scrollTo({ top: top + window.scrollY - 76, behavior: 'smooth' });
  };
  return (
    <section className="loc2 lc" id="sec-location">
      <PlacesMap places={LOCATIONS} active={active} className="loc2-map" />
      <div className="container loc2-wrap">
        <div className="lc7">
          {LOCATIONS.length > 1 && (
            <div className="lc-chips" role="group" aria-label="Lemoria spaces">
              {LOCATIONS.map((x, i) => <button key={x.id} type="button" aria-pressed={i === active} onClick={() => choose(i)}>{x.name}</button>)}
            </div>
          )}
          <div className="loc2-card">
            <div key={p.id} className="lc-swap">
              <span className="kicker">{p.area}</span>
              <h2 className="lc-name">{p.name}</h2>
              <p className="lc-meta"><Status s={p.status} /></p>
              <ul className="info-list">
                <li><span className="icbox"><Icon name="pin" size={22} /></span><div><small>Address</small><span>{p.address}</span></div></li>
                {p.hours && <li><span className="icbox"><Icon name="clock" size={22} /></span><div><small>Open</small><span>{p.hours}</span></div></li>}
              </ul>
              <PlaceButtons place={p} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
