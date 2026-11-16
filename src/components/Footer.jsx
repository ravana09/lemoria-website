import { Link } from 'react-router-dom';
import { SITE, WORKSPACE_MENU } from '../data.js';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';
import FooterArt from './FooterArt.jsx';

const tel = `tel:${SITE.phone.replace(/\s/g, '')}`;
const year = new Date().getFullYear();

// Line-art illustration on white, then the dark footer: brand + 4 link columns, copyright and social links.
export default function Footer() {
  return (
    <>
      <div className="ft-art"><FooterArt /></div>
      <footer className="ft ft2">
        <div className="container">
          <div className="ft-grid">
            <div className="ft-brand">
              <Logo size={40} />
              <p>Lemoria is a premium co-working space in Nehru Nagar East, Coimbatore. Book a single chair, seats for your whole company, a private cabin or a conference cabin by the hour, all with fast Wi-Fi, refreshments and a professional address.</p>
              <p className="ft-hours"><Icon name="clock" size={16} />{SITE.hours}</p>
            </div>
            <div><h4>Company</h4><Link to="/about">About us</Link><Link to="/amenities">Amenities</Link><Link to="/gallery">Gallery</Link><Link to="/memberships">Memberships</Link></div>
            <div><h4>Workspace</h4>{WORKSPACE_MENU.slice(0, 5).map((m) => <Link key={m.to} to={m.to}>{m.title}</Link>)}</div>
            <div><h4>Support</h4><Link to="/contact">Contact</Link><Link to="/book">Book now</Link><a href="#">Privacy policy</a><a href="#">Terms</a></div>
            <div className="f-contact">
              <h4>Contact</h4>
              <a href={tel}><Icon name="phone" size={16} />{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}><Icon name="mail" size={16} />{SITE.email}</a>
              <p><Icon name="pin" size={16} />{SITE.address}</p>
            </div>
          </div>
          <div className="f-bottom">
            <span>Copyright © {year} {SITE.name}. All rights reserved.</span>
            <div className="social">
              {/* TODO: add the real social media links */}
              <a href="#" aria-label="Instagram"><Icon name="insta" size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
              <a href="#" aria-label="Facebook"><Icon name="facebook" size={18} /></a>
            </div>
        </div>
      </div>
    </footer>
    </>
  );
}
