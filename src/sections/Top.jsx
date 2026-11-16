import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import Icon from '../components/Icon.jsx';
import Sec from '../components/Sec.jsx';
import { HERO, IMG, OFFERS, OFFERS_INTRO, WHY, WHY_INTRO, WHY_NOTE } from '../data.js';

export function Title({ eyebrow, title, text, center, children }) {
  return (
    <div className={`st ${center ? 'center' : ''}`}>
      {eyebrow && <span className="kicker">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {children}
    </div>
  );
}

/* ================= HERO — text + photo collage ================= */
export function Hero() {
  return (
    <Sec id="hero" className="hero7">
      <div className="container hero7-in">
        <div>
          <span className="kicker">{HERO.kicker}</span>
          <h1>{HERO.title}</h1>
          <p>{HERO.text}</p>
          <div className="btns">
            <Link to="/book" className="btn btn-primary">Book a seat</Link>
            <Link to="/contact" className="btn btn-outline">Get in touch</Link>
          </div>
          <p className="hero-note">{HERO.note}</p>
          <div className="hero7-stats">
            <div><b>1 – 60</b><span>Seats per booking</span></div>
            <div><b>3</b><span>Conference cabins</span></div>
            <div><b>24/7</b><span>Access</span></div>
          </div>
        </div>
        <div className="hero7-collage">
          <Img src={IMG.conference} alt="Conference cabin" eager className="c1" sizes="(max-width: 900px) 55vw, 340px" />
          <Img src={IMG.cabin} alt="Private cabin" eager className="c2" sizes="(max-width: 900px) 45vw, 280px" />
          <Img src={IMG.cafe} alt="Café" eager className="c3" sizes="(max-width: 900px) 45vw, 280px" />
          <div className="hero7-badge"><Icon name="star" size={18} fill="currentColor" /><span><b>Open 6 days a week</b><small>Mon – Sat, 8 AM – 9 PM</small></span></div>
        </div>
      </div>
    </Sec>
  );
}

/* ================= WHAT LEMORIA OFFERS — photo cards ================= */
export function Offers() {
  return (
    <Sec id="offers">
      <div className="container">
        <div className="row-head">
          <Title eyebrow="Our spaces" title="What Lemoria Offers You" text={OFFERS_INTRO} />
          <Link to="/workspace" className="more">All spaces <Icon name="arrow" size={18} /></Link>
        </div>
        <div className="grid3">
          {OFFERS.map((o) => (
            <Link to={o.to} key={o.to} className="off4-card">
              <Img src={o.image} alt={o.title} sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 400px" />
              <div className="off4-body">
                <span className="icbox sm"><Icon name={o.icon} size={20} /></span>
                <h3>{o.title}</h3>
                <small className="off4-best">{o.best}</small>
                <p>{o.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Sec>
  );
}

/* ================= WHY CHOOSE LEMORIA — feature list + photo ================= */
export function Why() {
  return (
    <Sec id="why">
      <div className="container why2-in">
        <div>
          <Title eyebrow="Why us" title="Why choose Lemoria?" text={WHY_INTRO} />
          <div className="why2-list">
            {WHY.map((w) => (
              <div className="feat" key={w.title}><span className="icbox"><Icon name={w.icon} size={24} /></span><div><h3>{w.title}</h3><p>{w.text}</p></div></div>
            ))}
          </div>
          <p className="why-note"><Icon name="check" size={18} />{WHY_NOTE}</p>
        </div>
        <div className="why2-media"><Img src={IMG.team} alt="Team working at Lemoria" sizes="(max-width: 960px) 100vw, 560px" /><div className="why2-badge"><b>500+</b><span>Happy members</span></div></div>
      </div>
    </Sec>
  );
}
