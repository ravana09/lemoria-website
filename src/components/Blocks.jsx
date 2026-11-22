import { Link } from 'react-router-dom';
import Img from './Img.jsx';
import Icon from './Icon.jsx';
import { FAQ, PLANS, TOUR_LINK } from '../data.js';

export function Head({ eyebrow, title, lead, center }) {
  return (
    <div className={`st ${center ? 'center' : ''}`}>
      <span className="kicker">{eyebrow}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

// `focus` picks which part of the photo stays in view when the wide banner crops it, e.g. "center 25%" keeps faces.
export function Banner({ image, alt, crumb, title, text, focus }) {
  return (
    <section className="banner" style={focus ? { '--banner-focus': focus } : undefined}>
      <Img src={image} alt={alt} eager className="banner-bg" />
      <div className="container"><div className="crumb"><Link to="/">Home</Link> / {crumb}</div><h1>{title}</h1>{text && <p>{text}</p>}</div>
    </section>
  );
}

// A figure such as "~50": the tilde is hard to read in the serif (it looks like "-50"), so it shows as a small "about".
export function Num({ n }) {
  return n.startsWith('~') ? <><span className="approx">about</span>{n.slice(1)}</> : n;
}

// Page banner with an illustration: words on the left, the illustration on the right, a soft cream wave behind.
// `art` is one of the components from Illustrations.jsx; `children` are the buttons.
export function ArtBanner({ crumb, title, text, art: Art, children }) {
  return (
    <section className="ib">
      <svg className="ib-wave" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120 C80 140 120 220 220 240 C300 256 360 250 400 300 L0 300 Z" /></svg>
      <div className="container ib-in">
        <div className="ib-copy">
          <div className="crumb crumb-dark"><Link to="/">Home</Link> / {crumb}</div>
          <h1>{title}</h1>
          <span className="ib-rule" />
          <p>{text}</p>
          {children && <div className="btns">{children}</div>}
        </div>
        <Art className="ib-art" />
      </div>
    </section>
  );
}

// A grid of chairs; the first `count` are highlighted.
export function SeatMap({ count, total = 60 }) {
  const shown = Math.max(total, count);
  return (
    <div className="seatmap" role="img" aria-label={`${count} of ${shown} seats selected`}>
      {Array.from({ length: shown }, (_, i) => <i key={i} className={i < count ? 'on' : ''} />)}
    </div>
  );
}

// Plan cards. Features are optional until Lemoria Luxe shares its final plans.
export function PlanGrid() {
  return (
    <div className="grid4">
      {PLANS.map((p) => {
        const to = p.name === 'Virtual' ? '/contact?type=Virtual office' : p.name === 'Private Office' ? '/contact?type=Private cabin' : `/book?tab=seats&plan=${encodeURIComponent(p.name)}`;
        return (
          <div className={`plan ${p.popular ? 'pop' : ''}`} key={p.name}>
            {p.popular && <span className="tag">Most popular</span>}
            <h3>{p.name}</h3><p className="plan-desc">{p.desc}</p>
            {p.features && <ul>{p.features.map((f) => <li key={f}><Icon name="check" size={16} />{f}</li>)}</ul>}
            <Link to={to} className={`btn ${p.popular ? 'btn-primary' : 'btn-outline'}`}>Ask for pricing</Link>
          </div>
        );
      })}
    </div>
  );
}

export function Faq({ items = FAQ }) {
  return <div className="faq">{items.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>;
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-in">
        <div><h2>Experience Lemoria Luxe in person</h2><p>Book a private tour of our premium coworking space on Avinashi Road.</p></div>
        <div className="btns"><Link to={TOUR_LINK} className="btn btn-primary">Book a tour</Link><Link to="/book" className="btn btn-outline">Book online</Link></div>
      </div>
    </section>
  );
}
