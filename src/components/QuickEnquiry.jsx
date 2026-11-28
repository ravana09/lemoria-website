import { useState } from 'react';
import { submitEnquiry } from '../api.js';
import Icon from './Icon.jsx';
import NiceSelect from './NiceSelect.jsx';

// What the visitor is looking for. The label is also what Lemoria sees in the email.
const NEEDS = [
  { label: 'Book a tour', icon: 'calendar', note: 'Visit and see the space' },
  { label: 'Hot desk', icon: 'chair', note: 'Any open seat, daily or monthly' },
  { label: 'Private office', icon: 'door', note: 'For teams of about 4 to 8' },
  { label: 'Conference room', icon: 'present', note: 'Seats about 10, by the hour' },
  { label: 'Day pass', icon: 'sun', note: 'One full day, 8 AM to 9 PM' },
  { label: 'Virtual office', icon: 'mail', note: 'Business address and mail' },
];

// Short enquiry form for the hero. Sends through the same email flow as the contact form
// (Lemoria Luxe gets the enquiry, the visitor gets a confirmation).
export default function QuickEnquiry() {
  const [f, setF] = useState({ name: '', phone: '', email: '', type: NEEDS[0].label, website: '' });
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
      <NiceSelect id="qe-need" label="I’m looking for" options={NEEDS} value={f.type} onChange={(type) => setF((x) => ({ ...x, type }))} />
      <div className="hp" aria-hidden="true"><input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></div>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn btn-primary block" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Request a call back'}</button>
    </form>
  );
}
