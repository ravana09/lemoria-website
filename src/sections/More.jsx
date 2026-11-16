import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Sec from '../components/Sec.jsx';
import { Faq } from '../components/Blocks.jsx';
import { FAQ, HOME_ABOUT } from '../data.js';
import { useFaqJsonLd } from '../seo.js';
import { Title } from './Top.jsx';

/* ================= ABOUT LEMORIA — short introduction after the hero ================= */
export function HomeAbout() {
  return (
    <Sec id="about">
      <div className="container ha-in">
        <div>
          <Title eyebrow="About Lemoria" title={HOME_ABOUT.title} />
          {HOME_ABOUT.paras.map((p) => <p className="ha-p" key={p.slice(0, 20)}>{p}</p>)}
          <Link to="/about" className="more">Our story <Icon name="arrow" size={18} /></Link>
        </div>
        <ul className="ha-points">
          {HOME_ABOUT.points.map((pt) => (
            <li key={pt.title}><span className="icbox"><Icon name={pt.icon} size={24} /></span><b>{pt.title}</b><span>{pt.text}</span></li>
          ))}
        </ul>
      </div>
    </Sec>
  );
}

/* ================= FAQ — common questions (also published as FAQ structured data) ================= */
export function HomeFaq() {
  useFaqJsonLd(FAQ);
  return (
    <Sec id="faq">
      <div className="container hf-in">
        <div className="hf-side">
          <Title eyebrow="FAQ" title="Questions, answered" text="Everything you need to know before booking a seat or a cabin at Lemoria. Can't find your answer? Our team is happy to help." />
          <Link to="/contact" className="btn btn-primary">Ask us a question</Link>
        </div>
        <Faq items={FAQ} />
      </div>
    </Sec>
  );
}
