import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Banner, CtaBand, Faq, Head, PlanGrid } from '../components/Blocks.jsx';
import { IMG, MEMBERSHIP_INFO } from '../data.js';
import { useFaqJsonLd } from '../seo.js';

export default function Memberships() {
  useFaqJsonLd(MEMBERSHIP_INFO.faq);
  return (
    <>
      <Banner image={IMG.community} alt="Members working together at Lemoria, Coimbatore" crumb="Memberships" title="Memberships that fit how you work" text="Flexible plans for freelancers, startups and growing companies. No long lease, no hidden costs." />
      <section className="section soft">
        <div className="container">
          <Head center eyebrow="Plans" title="Pick the plan that suits you" lead={MEMBERSHIP_INFO.intro} />
          <PlanGrid />
          <div className="mb-price">
            <span className="icbox"><Icon name="mail" size={24} /></span>
            <div><b>How pricing works</b><p>{MEMBERSHIP_INFO.pricing}</p></div>
            <Link to="/contact?type=Not sure yet" className="btn btn-primary">Get a quote</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container sp-faq">
          <Head center eyebrow="FAQ" title="Membership questions" />
          <Faq items={MEMBERSHIP_INFO.faq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
