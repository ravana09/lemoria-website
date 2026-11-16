import { useSearchParams } from 'react-router-dom';
import { Banner } from '../components/Blocks.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Icon from '../components/Icon.jsx';
import { IMG, MAP_EMBED, SITE } from '../data.js';

export default function Contact() {
  const [params] = useSearchParams();
  return (
    <>
      <Banner image={IMG.clientMeeting} alt="Meeting a client at Lemoria, Coimbatore" crumb="Contact" title="Need answers? We’ve got you covered." text="Connect with us to explore the perfect workspace solution for you." />
      <section className="section">
        <div className="container ct1-in">
          <div>
            <ul className="info-list">
              <li><span className="icbox"><Icon name="phone" size={22} /></span><div><small>Call us</small><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></div></li>
              <li><span className="icbox"><Icon name="mail" size={22} /></span><div><small>Email us</small><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div></li>
              <li><span className="icbox"><Icon name="pin" size={22} /></span><div><small>Visit us</small><span>{SITE.address}</span></div></li>
              <li><span className="icbox"><Icon name="clock" size={22} /></span><div><small>Opening hours</small><span>{SITE.hours}</span></div></li>
            </ul>
            <iframe className="map" title="Map of Lemoria" loading="lazy" src={MAP_EMBED} />
          </div>
          <ContactForm className="card" preset={params.get('type') || ''} title="Send us an enquiry" />
        </div>
      </section>
    </>
  );
}
