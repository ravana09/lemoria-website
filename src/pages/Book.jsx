import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Img from '../components/Img.jsx';
import { SeatMap } from '../components/Blocks.jsx';
import { CABINS, DURATIONS, IMG, MAX_SEATS, PLANS, SITE, TEAM_SIZES, TIME_SLOTS, localDate, defaultBookingDate } from '../data.js';
import { submitBooking } from '../api.js';

const today = () => localDate();
const CLOSE_HOUR = 21;
const HOURS = [1, 2, 3, 4, 8];
const SEAT_TYPES = PLANS.filter((p) => p.name !== 'Virtual').map((p) => p.name);
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const sizeFor = (n) => (n === 1 ? TEAM_SIZES[0] : n <= 10 ? TEAM_SIZES[1] : n <= 30 ? TEAM_SIZES[2] : TEAM_SIZES[3]);

function Contact({ form, set, errors }) {
  const f = (id, label, props) => (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={form[id]} onChange={set(id)} aria-invalid={!!errors[id]} {...props} />
      {errors[id] && <span className="err">{errors[id]}</span>}
    </div>
  );
  return (
    <fieldset className="bk-step">
      <legend><span>3</span>Your details</legend>
      <div className="fields">
        {f('name', 'Full name', { type: 'text', autoComplete: 'name', placeholder: 'Your name' })}
        {f('company', 'Company (optional)', { type: 'text', autoComplete: 'organization', placeholder: 'Company name' })}
        {f('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@company.com' })}
        {f('phone', 'Phone', { type: 'tel', autoComplete: 'tel', placeholder: '+91' })}
      </div>
    </fieldset>
  );
}

export default function Book() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'conference' ? 'conference' : 'seats';
  const setTab = (t) => { params.set('tab', t); setParams(params, { replace: true }); };

  // seats
  const [seats, setSeats] = useState(clamp(Number(params.get('seats')) || 1, 1, MAX_SEATS));
  const [seatType, setSeatType] = useState(SEAT_TYPES.includes(params.get('plan')) ? params.get('plan') : SEAT_TYPES[0]);
  const [duration, setDuration] = useState('Month');
  // conference
  const [cabinId, setCabinId] = useState(CABINS.some((c) => c.id === params.get('cabin')) ? params.get('cabin') : CABINS[1].id);
  const [slot, setSlot] = useState('');
  const [hours, setHours] = useState(2);
  const [people, setPeople] = useState(4);
  // shared
  const [date, setDate] = useState(params.get('date') && params.get('date') >= today() ? params.get('date') : defaultBookingDate());
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', website: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [result, setResult] = useState(null);
  const [failMsg, setFailMsg] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const cabin = CABINS.find((c) => c.id === cabinId);
  const nowHour = new Date().getHours();
  const slotOk = (s) => {
    const h = Number(s.slice(0, 2));
    return h + hours <= CLOSE_HOUR && !(date === today() && h <= nowHour);
  };
  const endTime = slot ? `${String(Number(slot.slice(0, 2)) + hours).padStart(2, '0')}:00` : '';

  async function onSubmit(e) {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Please enter a valid email';
    if (form.phone.replace(/\D/g, '').length < 10) er.phone = 'Please enter a valid phone number';
    if (tab === 'conference' && (!slot || !slotOk(slot))) er.slot = 'Please choose an available start time';
    setErrors(er);
    if (Object.keys(er).length) return;
    setState('sending');
    const booking = tab === 'seats'
      ? { kind: 'seats', seats, seatType, duration, startDate: date, ...form }
      : { kind: 'conference', cabin: cabin.name, date, start: slot, end: endTime, hours, people, ...form };
    try { setResult(await submitBooking(booking)); setState('done'); } catch (err) { setFailMsg(err.message); setState('error'); }
  }

  if (state === 'done') {
    return (
      <section className="bk-done">
        <div className="container center">
          <div className="eyebrow">Request received</div>
          <h1 className="h2">Thank you, {form.name.split(' ')[0]}.</h1>
          <p className="lead">
            {tab === 'seats'
              ? `We have received your request for ${seats} ${seats === 1 ? 'seat' : 'seats'} from ${date}. `
              : `We have received your request for the ${cabin.name} on ${date}, ${slot}–${endTime}. `}
            A confirmation has been sent to {form.email}. Our team will confirm availability and pricing by phone or email within 2 business hours.
          </p>
          {result?.dryRun && <p className="note test-note">Test mode: the emails were printed in the server terminal, not sent. Add your SMTP settings to <code>.env</code> to send real emails.</p>}
          <div className="actions" style={{ justifyContent: 'center' }}><Link to="/" className="btn btn-primary">Back to home</Link></div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bk-hero">
        <div className="bg"><Img src={tab === 'seats' ? IMG.floor : IMG.conference} alt="" eager style={{ position: 'absolute', inset: 0 }} /></div>
        <div className="container">
          <div className="crumb">Reservations</div>
          <h1>{tab === 'seats' ? 'Reserve your seats' : 'Book a conference cabin'}</h1>
          <div className="seg big" role="tablist" aria-label="Booking type">
            <button type="button" role="tab" aria-selected={tab === 'seats'} onClick={() => setTab('seats')}>Seats by the chair</button>
            <button type="button" role="tab" aria-selected={tab === 'conference'} onClick={() => setTab('conference')}>Conference cabin</button>
          </div>
        </div>
      </section>

      <section className="section soft">
        <form className="container bk" onSubmit={onSubmit} noValidate>
          <div className="bk-main">
            {tab === 'seats' ? (
              <>
                <fieldset className="bk-step">
                  <legend><span>1</span>How many chairs?</legend>
                  <div className="sizes light-sizes">
                    {TEAM_SIZES.map((t) => (
                      <button key={t.id} type="button" aria-pressed={sizeFor(seats).id === t.id} onClick={() => setSeats(t.seats)}><b>{t.label}</b><span>{t.range}</span></button>
                    ))}
                  </div>
                  <div className="bk-seatrow">
                    <div className="stepper dark">
                      <button type="button" aria-label="Fewer seats" onClick={() => setSeats(clamp(seats - 1, 1, MAX_SEATS))}>−</button>
                      <output aria-live="polite">{seats}</output>
                      <button type="button" aria-label="More seats" onClick={() => setSeats(clamp(seats + 1, 1, MAX_SEATS))}>+</button>
                    </div>
                    <input type="range" min="1" max={MAX_SEATS} value={seats} onChange={(e) => setSeats(Number(e.target.value))} aria-label="Number of seats" />
                  </div>
                  <p className="hint">Need more than {MAX_SEATS}? <Link to="/contact?type=Enterprise">Talk to us about a full floor.</Link></p>
                  <div className="seat-frame light-frame"><SeatMap count={seats} /></div>
                </fieldset>
                <fieldset className="bk-step">
                  <legend><span>2</span>Seat type, duration & start date</legend>
                  <div className="opt-row">
                    {SEAT_TYPES.map((s) => <button key={s} type="button" className="opt" aria-pressed={seatType === s} onClick={() => setSeatType(s)}>{s}</button>)}
                  </div>
                  <div className="opt-row">
                    {DURATIONS.map((d) => <button key={d} type="button" className="opt" aria-pressed={duration === d} onClick={() => setDuration(d)}>{d}</button>)}
                  </div>
                  <div className="field" style={{ maxWidth: 260 }}>
                    <label htmlFor="date">Start date</label>
                    <input id="date" type="date" min={today()} value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                </fieldset>
              </>
            ) : (
              <>
                <fieldset className="bk-step">
                  <legend><span>1</span>Choose a cabin</legend>
                  <div className="cab-pick">
                    {CABINS.map((c) => (
                      <label key={c.id} className={cabinId === c.id ? 'sel' : ''}>
                        <input type="radio" name="cabin" value={c.id} checked={cabinId === c.id} onChange={() => { setCabinId(c.id); setPeople(Math.min(people, c.seats)); }} />
                        <Img src={c.image} alt="" />
                        <span className="cp-body"><b>{c.name}</b><small>Up to {c.seats} people</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="bk-step">
                  <legend><span>2</span>Date & time</legend>
                  <div className="fields">
                    <div className="field">
                      <label htmlFor="cdate">Date</label>
                      <input id="cdate" type="date" min={today()} value={date} onChange={(e) => { setDate(e.target.value); setSlot(''); }} />
                    </div>
                    <div className="field">
                      <label htmlFor="people">Attendees</label>
                      <input id="people" type="number" min="1" max={cabin.seats} value={people} onChange={(e) => setPeople(clamp(Number(e.target.value) || 1, 1, cabin.seats))} />
                    </div>
                  </div>
                  <div className="field-label">Duration</div>
                  <div className="opt-row">
                    {HOURS.map((h) => <button key={h} type="button" className="opt" aria-pressed={hours === h} onClick={() => { setHours(h); setSlot(''); }}>{h === 8 ? 'Full day (8h)' : `${h} hr${h > 1 ? 's' : ''}`}</button>)}
                  </div>
                  <div className="field-label">Start time</div>
                  <div className="slots">
                    {TIME_SLOTS.map((s) => (
                      <button key={s} type="button" disabled={!slotOk(s)} aria-pressed={slot === s} onClick={() => setSlot(s)}>{s}</button>
                    ))}
                  </div>
                  {!TIME_SLOTS.some(slotOk) && <p className="hint">No {hours === 8 ? 'full-day' : `${hours}-hour`} slots left on this date. Please choose another date or a shorter duration.</p>}
                  {errors.slot && <span className="err">{errors.slot}</span>}
                </fieldset>
              </>
            )}
            <Contact form={form} set={set} errors={errors} />
          </div>

          <aside className="bk-summary">
            <div className="eyebrow">Your reservation</div>
            {tab === 'seats' ? (
              <dl>
                <dt>Seats</dt><dd>{seats} · {sizeFor(seats).label}</dd>
                <dt>Seat type</dt><dd>{seatType}</dd>
                <dt>Duration</dt><dd>{duration}</dd>
                <dt>Starting</dt><dd>{date}</dd>
              </dl>
            ) : (
              <dl>
                <dt>Cabin</dt><dd>{cabin.name}</dd>
                <dt>Date</dt><dd>{date}</dd>
                <dt>Time</dt><dd>{slot ? `${slot} – ${endTime}` : 'Choose a start time'}</dd>
                <dt>Attendees</dt><dd>{people} of {cabin.seats}</dd>
              </dl>
            )}
            <p className="note">No payment now. Our concierge confirms availability and pricing within 2 business hours.</p>
            <button className="btn btn-primary block" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Request booking'}</button>
            <div className="hp" aria-hidden="true"><label htmlFor="bk-website">Website</label><input id="bk-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></div>
            {state === 'error' && <p className="err" role="alert" style={{ marginTop: 12 }}>{failMsg || 'Something went wrong.'} You can also call us on {SITE.phone}.</p>}
          </aside>
        </form>
      </section>
    </>
  );
}
