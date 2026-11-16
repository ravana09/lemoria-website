import Img from '../components/Img.jsx';
import Icon from '../components/Icon.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Sec from '../components/Sec.jsx';
import { CONTACT_INTRO, IMG, MAP_LINK, SITE } from '../data.js';

/* ================= CONTACT US — full-width photo, details + form card ================= */
const INFO = [
  { icon: 'phone', label: 'Call us', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
  { icon: 'mail', label: 'Email us', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: 'pin', label: 'Visit us', value: SITE.address, href: MAP_LINK, external: true },
  { icon: 'clock', label: 'Opening hours', value: SITE.hours },
];

export function Contact() {
  return (
    <Sec id="contact" className="ct8">
      <Img src={IMG.lounge} alt="" className="ct8-bg" />
      <div className="container ct8-in">
        <div className="ct8-copy">
          <span className="kicker light">Contact us</span>
          <h2>Visit Lemoria, or let us call you.</h2>
          <p>{CONTACT_INTRO}</p>
          <ul className="info-list light">
            {INFO.map((x) => (
              <li key={x.label}>
                <span className="icbox"><Icon name={x.icon} size={22} /></span>
                <div><small>{x.label}</small>{x.href ? <a href={x.href} {...(x.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{x.value}</a> : <span>{x.value}</span>}</div>
              </li>
            ))}
          </ul>
          <a className="btn btn-white" href={MAP_LINK} target="_blank" rel="noreferrer"><Icon name="pin" size={18} /> Get directions</a>
        </div>
        <ContactForm className="card" title="Send us a message" />
      </div>
    </Sec>
  );
}
