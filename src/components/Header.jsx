import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV, SITE, WORKSPACE_MENU } from '../data.js';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';

function WorkspaceMenu({ onPick }) {
  return (
    <div className="dd" role="menu">
      {WORKSPACE_MENU.map((m) => (
        <Link key={m.to} to={m.to} className="dd-item" role="menuitem" onClick={onPick}>
          <span className="dd-ic"><Icon name={m.icon} size={20} /></span>
          <span><b>{m.title}</b><small>{m.text}</small></span>
        </Link>
      ))}
    </div>
  );
}

// Menu links; the header puts the first two items left of the logo and the rest on the right.
function Nav({ items }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const off = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', off);
    return () => document.removeEventListener('click', off);
  }, []);
  const wsActive = WORKSPACE_MENU.some((m) => m.to === pathname);
  return (
    <nav className="nav" aria-label="Main">
      {items.map((n) => n.menu ? (
        <div className={`nav-dd ${open ? 'open' : ''}`} key="ws" ref={ref}>
          <button type="button" className={wsActive ? 'active' : ''} aria-expanded={open} onClick={() => setOpen(!open)}>
            {n.label} <Icon name="down" size={16} />
          </button>
          <WorkspaceMenu onPick={() => setOpen(false)} />
        </div>
      ) : (
        <NavLink key={n.to} to={n.to} end className={({ isActive }) => (isActive ? 'active' : '')}>{n.label}</NavLink>
      ))}
    </nav>
  );
}

function MobileMenu({ open }) {
  if (!open) return null;
  const links = NAV.filter((n) => !n.menu);
  return (
    <div className="mnav">
      <Link to={links[0].to}>{links[0].label}</Link>
      <div className="mnav-group">
        <span>Workspace</span>
        {WORKSPACE_MENU.map((m) => <Link key={m.to} to={m.to}><Icon name={m.icon} size={18} />{m.title}</Link>)}
      </div>
      {links.slice(1).map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
      <Link to="/contact" className="btn btn-primary">Get in touch</Link>
    </div>
  );
}

// Header: Home + About on the left, logo centred, Amenities + Workspaces + FAQ + "Get in touch" on the right.
export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`hd hd3 ${open ? 'is-open' : ''}`}>
      <div className="hd-bar">
        <div className="container hd-in">
          <Nav items={NAV.slice(0, 3)} />
          <Link to="/" aria-label={`${SITE.name} home`} className="hd-logo"><Logo size={38} /></Link>
          <div className="hd-right">
            <Nav items={NAV.slice(3)} />
            <Link to="/contact" className="btn btn-primary btn-sm">Get in touch</Link>
            <button className="burger" type="button" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><span /><span /><span /></button>
          </div>
        </div>
        <MobileMenu open={open} />
      </div>
    </header>
  );
}
