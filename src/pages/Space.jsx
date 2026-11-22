import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import Icon from '../components/Icon.jsx';
import { CtaBand, Head, Num } from '../components/Blocks.jsx';
import { SPACES, TOUR_LINK, WA_LINK } from '../data.js';

const Crumb = ({ title, dark }) => <div className={`crumb ${dark ? 'crumb-dark' : ''}`}><Link to="/">Home</Link> / {title}</div>;
const Facts = ({ s }) => (
  <ul className="spx-facts">{s.facts.map(([n, l]) => <li key={l}><b><Num n={n} /></b><span>{l}</span></li>)}</ul>
);
const Ctas = ({ s }) => (
  <div className="btns">
    <Link to={s.cta.to} className="btn btn-primary">{s.cta.label}</Link>
    <Link to={TOUR_LINK} className="btn btn-outline">Book a tour</Link>
  </div>
);

/* Top banner: centred on cream, quick facts, then a row of photos (the space and its options) */
function Top({ s }) {
  const photos = [s.image, ...s.types.map((t) => t.image)].filter((x, i, a) => a.indexOf(x) === i).slice(0, 3);
  return (
    <section className="spt4" id="sec-top">
      <div className="container">
        <Crumb title={s.title} dark /><h1>{s.title}</h1><p>{s.tagline}</p>
        <Facts s={s} />
        <div className={`spt4-row n${photos.length}`}>{photos.map((src, i) => <Img key={src} src={src} alt={i ? '' : s.alt} eager={i === 0} sizes="(max-width: 700px) 100vw, 400px" />)}</div>
      </div>
    </section>
  );
}

/* Overview: words beside a "what's included" card */
function Overview({ s }) {
  return (
    <section className="section" id="sec-over">
      <div className="container sp-over">
        <div>
          <Head eyebrow="Overview" title={`${s.title} in Coimbatore`} lead={s.intro} />
          <Ctas s={s} />
        </div>
        <aside className="sp-incl">
          <h3>What’s included</h3>
          <ul>{s.includes.map((x) => <li key={x}><Icon name="check" size={18} />{x}</li>)}</ul>
        </aside>
      </div>
    </section>
  );
}

/* Options: cards */
function Options({ s }) {
  return (
    <section className="section soft" id="sec-opts">
      <div className="container">
        <Head center eyebrow="Options" title={`Choose your ${s.short.toLowerCase()}`} />
        <div className="opt-grid">
          {s.types.map((t) => (
            <article className="card" key={t.name}>
              <Img src={t.image} alt={`${t.name} at Lemoria Luxe coworking, Coimbatore`} sizes="(max-width: 700px) 100vw, 400px" />
              <div className="body"><h3>{t.name}</h3><p>{t.desc}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Other workspaces (all designs) ---------------- */
function OtherSpaces({ id }) {
  const others = Object.entries(SPACES).filter(([k]) => k !== id);
  return (
    <section className="section spx-more">
      <div className="container">
        <div className="spx-head">
          <Head eyebrow="Explore" title="Other workspaces" />
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="more">Not sure which suits you? Ask us <Icon name="arrow" size={16} /></a>
        </div>
        <div className="spx-row">
          {others.map(([k, o]) => (
            <Link to={o.path} key={k} className="spx-card">
              <Img src={o.image} alt={o.alt} sizes="(max-width: 700px) 70vw, 300px" />
              <h3>{o.title}</h3><p>{o.card}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Template for every workspace page.
export default function Space({ id }) {
  const s = SPACES[id];
  return (
    <>
      <Top s={s} />
      <Overview s={s} />
      <Options s={s} />
      <OtherSpaces id={id} />
      <CtaBand />
    </>
  );
}
