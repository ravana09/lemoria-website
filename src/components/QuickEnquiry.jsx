import { useState } from 'react';
import { submitEnquiry } from '../api.js';
import Icon from './Icon.jsx';

const NEEDS = ['Book a tour', 'Seats by the chair', 'Private cabin', 'Conference cabin', 'Day pass', 'Virtual office'];

// Short enquiry form for the hero. Sends through the same email flow as the contact form
// (Lemoria Luxe gets the enquiry, the visitor gets a confirmation).
export default function QuickEnquiry() {
  const [f, setF] = useState({ name: '', phone: '', email: '', type: NEEDS[0], website: '' });
  const [err, setErr] = useState('');
  const [state, setState] = useState('idle');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr('Please enter your name');
    if (f.phone.replace(/\D/g, '').length < 10) return setErr('Please enter a valid phone number');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Please enter a valid email');
    setErr(''); setState('sending');
    try { await submitEnquiry({ ...f, message: 'Quick enquiry from the home page' }); setState('done'); } catch (x) { setErr(x.message); setState('idle'); }
  }

  if (state === 'done') {
    return (
      <div className="qe qe-done" role="status">
        <span className="icbox"><Icon name="check" size={26} /></span>
        <h3>Thank you, {f.name.split(' ')[0]}!</h3>
        <p>We’ll call you shortly. A confirmation is on its way to {f.email}.</p>
      </div>
    );
  }
  return (
    <form className="qe" onSubmit={onSubmit} noValidate>
      <h3>Reserve your space</h3>
      <p className="qe-sub">We’ll call you back.</p>
      <label className="qe-f"><span>Name</span><input value={f.name} onChange={set('name')} autoComplete="name" placeholder="Your name" /></label>
      <label className="qe-f"><span>Phone</span><input value={f.phone} onChange={set('phone')} type="tel" autoComplete="tel" placeholder="+91" /></label>
      <label className="qe-f"><span>Email</span><input value={f.email} onChange={set('email')} type="email" autoComplete="email" placeholder="you@company.com" /></label>
      <label className="qe-f"><span>I’m looking for</span><select value={f.type} onChange={set('type')}>{NEEDS.map((n) => <option key={n}>{n}</option>)}</select></label>
      <div className="hp" aria-hidden="true"><input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></div>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn btn-primary block" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Request a call back'}</button>
    </form>
  );
}
