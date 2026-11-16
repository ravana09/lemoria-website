import { Link } from 'react-router-dom';
import Img from './Img.jsx';
import Icon from './Icon.jsx';
import { AMENITIES, FAQ, PLANS } from '../data.js';

export function Head({ eyebrow, title, lead, center }) {
  return (
    <div className={`st ${center ? 'center' : ''}`}>
      <span className="kicker">{eyebrow}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

export function Banner({ image, alt, crumb, title, text }) {
  return (
    <section className="banner">
      <Img src={image} alt={alt} eager className="banner-bg" />
      <div className="container"><div className="crumb"><Link to="/">Home</Link> / {crumb}</div><h1>{title}</h1>{text && <p>{text}</p>}</div>
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

export function AmenityGrid() {
  return (
    <div className="grid4">
      {AMENITIES.map((g) => (
        <div key={g.group} className="am2-col card-plain"><h3>{g.group}</h3><p className="am-desc">{g.desc}</p><ul>{g.items.map((it) => <li key={it[0]}><Icon name={it[1]} size={18} />{it[0]}</li>)}</ul></div>
      ))}
    </div>
  );
}

export function PlanGrid() {
  return (
    <div className="grid4">
      {PLANS.map((p) => (
        <div className={`plan ${p.popular ? 'pop' : ''}`} key={p.name}>
          {p.popular && <span className="tag">Most popular</span>}
          <h3>{p.name}</h3><p className="plan-desc">{p.desc}</p>
          <ul>{p.features.map((f) => <li key={f}><Icon name="check" size={16} />{f}</li>)}</ul>
          <Link to={p.name === 'Virtual' ? '/contact?type=Virtual office' : `/book?tab=seats&plan=${encodeURIComponent(p.name)}`} className={`btn ${p.popular ? 'btn-primary' : 'btn-outline'}`}>
            {p.name === 'Virtual' ? 'Enquire' : 'Book seats'}
          </Link>
        </div>
      ))}
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
        <div><h2>Ready to find your space?</h2><p>Book seats for your team or reserve a conference cabin today.</p></div>
        <div className="btns"><Link to="/book" className="btn btn-primary">Book now</Link><Link to="/contact" className="btn btn-outline">Get in touch</Link></div>
      </div>
    </section>
  );
}
