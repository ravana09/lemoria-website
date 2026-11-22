import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { ArtBanner, CtaBand, Faq, Head } from '../components/Blocks.jsx';
import { QuestionsArt } from '../components/Illustrations.jsx';
import { FAQ, GMAIL_LINK, SITE, WA_LINK } from '../data.js';
import { useFaqJsonLd } from '../seo.js';

const TEL = `tel:${SITE.phone.replace(/\s/g, '')}`;
// A help card: WhatsApp, call, email.
const HelpCard = () => (
  <div className="fq-help">
    <h3>Still unsure?</h3>
    <p>Talk to us on WhatsApp, call or email. We’re happy to help.</p>
    <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-primary block"><Icon name="whatsapp" size={18} /> WhatsApp us</a>
    <a href={TEL} className="fq-help-line"><Icon name="phone" size={18} /> {SITE.phone}</a>
    <a href={GMAIL_LINK} target="_blank" rel="noreferrer" className="fq-help-line"><Icon name="mail" size={18} /> {SITE.email}</a>
  </div>
);

// Heading and help card on the left, the questions on the right (help card goes below the questions on phones).
function Questions() {
  return (
    <section className="section" id="sec-qa">
      <div className="container fq2">
        <div className="fq2-side">
          <Head eyebrow="Questions" title="Good to know before you visit" />
          <HelpCard />
        </div>
        <Faq items={FAQ} />
      </div>
    </section>
  );
}

export default function FaqPage() {
  useFaqJsonLd(FAQ);
  return (
    <>
      <ArtBanner crumb="FAQ" title="Frequently asked questions" art={QuestionsArt}
        text="Everything you need to know about our premium coworking space in Coimbatore. Can’t find an answer? We’re a message away.">
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-primary">Ask on WhatsApp</a>
        <Link to="/contact" className="btn btn-outline">Contact us</Link>
      </ArtBanner>
      <Questions />
      <CtaBand />
    </>
  );
}
