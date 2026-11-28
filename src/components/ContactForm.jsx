import { useState } from 'react';
import { submitEnquiry } from '../api.js';
import { SITE } from '../data.js';
import NiceSelect from './NiceSelect.jsx';

// The workspace types in the dropdown. The label is what Lemoria sees in the email. "was" lists older names
// that links may still use (e.g. /contact?type=Private cabin), so those links still pick the right option.
export const WORKSPACE_TYPES = [
  { label: 'Hot desk', icon: 'chair', note: 'One seat, daily or monthly', was: ['Seats by the chair'] },
  { label: 'Team seats', icon: 'users', note: 'Several seats for your team', was: ['Team seats (company)'] },
  { label: 'Conference room', icon: 'present', note: 'Seats about 10, by the hour', was: ['Conference cabin'] },
  { label: 'Private office', icon: 'door', note: 'For teams of about 4 to 8', was: ['Private cabin'] },
  { label: 'Day pass', icon: 'sun', note: 'One full day, 8 AM to 9 PM' },
  { label: 'Virtual office', icon: 'mail', note: 'Business address and mail' },
  { label: 'Book a tour', icon: 'calendar', note: 'Visit and see the space' },
  { label: 'General question', icon: 'book', note: 'Anything else', was: ['General enquiry'] },
  { label: 'Not sure yet', icon: 'star', note: 'We will help you choose' },
];
const typeFor = (preset) => (WORKSPACE_TYPES.find((t) => t.label === preset || (t.was || []).includes(preset)) || WORKSPACE_TYPES[0]).label;

// Sends the enquiry to the server, which emails Lemoria Luxe and sends the visitor a confirmation email.
export default function ContactForm({ preset = '', title, className = '' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: typeFor(preset), message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [result, setResult] = useState(null);
  const [failMsg, setFailMsg] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Please enter a valid email';
    if (form.phone.replace(/\D/g, '').length < 10) er.phone = 'Please enter a valid phone number';
    setErrors(er);
    if (Object.keys(er).length) return;
    setState('sending');
    try { setResult(await submitEnquiry(form)); setState('done'); } catch (err) { setFailMsg(err.message); setState('error'); }
  }

  const f = (id, label, props) => (
    <div className="field">
      <label htmlFor={`cf-${id}`}>{label}</label>
      <input id={`cf-${id}`} value={form[id]} onChange={set(id)} aria-invalid={!!errors[id]} {...props} />
      {errors[id] && <span className="err">{errors[id]}</span>}
    </div>
  );

  if (state === 'done') {
    return (
      <div className={`cform ${className}`}>
        <p className="ok" role="status">
          Thank you, {form.name.split(' ')[0]}! We have received your enquiry and sent a confirmation to <b>{form.email}</b>. Our team will get back to you within one business day.
        </p>
        {result?.dryRun && <p className="note test-note">Test mode: the emails were printed in the server terminal, not sent. Add your SMTP settings to <code>.env</code> to send real emails.</p>}
      </div>
    );
  }
  return (
    <form className={`cform ${className}`} onSubmit={onSubmit} noValidate>
      {title && <h3>{title}</h3>}
      <div className="fields">
        {f('name', 'Full name', { type: 'text', autoComplete: 'name', placeholder: 'Enter your name' })}
        {f('email', 'Email address', { type: 'email', autoComplete: 'email', placeholder: 'Enter your email' })}
        {f('phone', 'Phone number', { type: 'tel', autoComplete: 'tel', placeholder: '+91' })}
        <div className="field">
          <NiceSelect id="cf-type" label="Workspace type" options={WORKSPACE_TYPES} value={form.type} onChange={(type) => setForm((x) => ({ ...x, type }))} />
        </div>
        <div className="field full"><label htmlFor="cf-msg">Message</label><textarea id="cf-msg" rows="3" value={form.message} onChange={set('message')} placeholder="How many seats do you need, and from when?" /></div>
        {/* honeypot: hidden from people, bots fill it in and are ignored */}
        <div className="hp" aria-hidden="true"><label htmlFor="cf-website">Website</label><input id="cf-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></div>
      </div>
      <p className="note">By submitting, you agree to our Terms and Privacy Policy. We reply within one business day.</p>
      <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Submit'}</button>
      {state === 'error' && <p className="err" role="alert">{failMsg || 'Something went wrong.'} You can also call us on {SITE.phone}.</p>}
    </form>
  );
}
