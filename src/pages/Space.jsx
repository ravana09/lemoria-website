import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import Icon from '../components/Icon.jsx';
import { Banner, CtaBand, Faq, Head } from '../components/Blocks.jsx';
import { CABINS, SPACES } from '../data.js';
import { useFaqJsonLd } from '../seo.js';

function actionFor(id, i, name) {
  if (id === 'conference-cabins') return { to: `/book?tab=conference&cabin=${CABINS[i].id}`, label: 'Book this cabin' };
  if (id === 'workspace' || id === 'day-pass') return { to: '/book?tab=seats', label: 'Book seats' };
  return { to: `/contact?type=${encodeURIComponent(name)}`, label: 'Enquire' };
}

// Template for every workspace page: overview, options, who it's for, how it works, FAQ.
export default function Space({ id }) {
  const s = SPACES[id];
  useFaqJsonLd(s.faq);
  return (
    <>
      <Banner image={s.image} alt={s.alt} crumb={s.title} title={s.title} text={s.tagline} />

      {/* Overview + what's included */}
      <section className="section">
        <div className="container sp-over">
          <div>
            <Head eyebrow="Overview" title={`${s.title} at Lemoria, Coimbatore`} lead={s.intro} />
            {s.details.map((p) => <p className="sp-p" key={p.slice(0, 24)}>{p}</p>)}
            <div className="btns"><Link to={s.cta.to} className="btn btn-primary">{s.cta.label}</Link><Link to="/contact?type=Book a tour" className="btn btn-outline">Book a tour</Link></div>
          </div>
          <aside className="sp-incl">
            <h3>What’s included</h3>
            <ul>{s.includes.map((x) => <li key={x}><Icon name="check" size={18} />{x}</li>)}</ul>
          </aside>
        </div>
      </section>

      {/* Options */}
      <section className="section soft">
        <div className="container">
          <Head center eyebrow="Options" title={`Choose your ${s.short.toLowerCase()} option`} lead="Every option includes Wi-Fi, refreshments, housekeeping and access to the lounge and café." />
          <div className="grid g3">
            {s.types.map((t, i) => {
              const a = actionFor(id, i, t.name);
              return (
                <article className="card" key={t.name}>
                  <Img src={t.image} alt={`${t.name} at Lemoria co-working, Coimbatore`} sizes="(max-width: 700px) 100vw, 400px" />
                  <div className="body">
                    <h3>{t.name}</h3><p>{t.desc}</p>
                    <div className="chips">{t.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
                    <Link className="more" to={a.to}>{a.label} <Icon name="arrow" size={16} /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who it's for + how it works */}
      <section className="section">
        <div className="container sp-two">
          <div>
            <Head eyebrow="Ideal for" title="Who it’s for" />
            <ul className="sp-ideal">{s.ideal.map((x) => <li key={x}><span className="icbox sm"><Icon name="users" size={18} /></span>{x}</li>)}</ul>
          </div>
          <div>
            <Head eyebrow="How it works" title="Book in three simple steps" />
            <ol className="steps">{s.steps.map((st, i) => <li key={st.title}><span className="step-n">{i + 1}</span><div><b>{st.title}</b><p>{st.text}</p></div></li>)}</ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section soft">
        <div className="container sp-faq">
          <Head center eyebrow="FAQ" title={`${s.title}: common questions`} />
          <Faq items={s.faq} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
