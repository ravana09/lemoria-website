import { useState } from 'react';
import Img from '../components/Img.jsx';
import Icon from '../components/Icon.jsx';
import Sec from '../components/Sec.jsx';
import { AMENITIES, AMENITIES_INTRO, AMENITIES_NOTE, EXPERIENCE, EXPERIENCE_INTRO } from '../data.js';
import { Title } from './Top.jsx';

/* ================= THE LEMORIA EXPERIENCE — panels that widen ================= */
export function Experience() {
  const [i, setI] = useState(0);
  return (
    <Sec id="experience">
      <div className="container">
        <Title center eyebrow="Experience" title="The Lemoria Experience" text={EXPERIENCE_INTRO} />
        <div className="exp4">
          {EXPERIENCE.map((e, k) => (
            <button key={e.title} type="button" className={`exp4-panel ${i === k ? 'on' : ''}`} onClick={() => setI(k)} onMouseEnter={() => setI(k)} aria-pressed={i === k}>
              <Img src={e.image} alt={e.title} sizes="(max-width: 760px) 100vw, 720px" />
              <span className="exp4-cap"><b>{e.title}</b><small>{e.text}</small></span>
            </button>
          ))}
        </div>
      </div>
    </Sec>
  );
}

/* ================= AMENITIES — tabs + icon grid ================= */
export function Amenities() {
  const [tab, setTab] = useState(0);
  const g = AMENITIES[tab];
  return (
    <Sec id="amenities">
      <div className="container">
        <Title center eyebrow="Amenities" title="60+ Amenities for Workspaces that Work for You" text={AMENITIES_INTRO} />
        <div className="tabs" role="tablist">
          {AMENITIES.map((x, k) => <button key={x.group} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{x.group}</button>)}
        </div>
        <p className="am-desc center">{g.desc}</p>
        <ul className="am-grid" key={tab}>
          {g.items.map((it) => <li key={it[0]}><span className="icbox sm"><Icon name={it[1]} size={20} /></span>{it[0]}</li>)}
        </ul>
        <p className="am-note"><Icon name="check" size={16} />{AMENITIES_NOTE}</p>
      </div>
    </Sec>
  );
}
