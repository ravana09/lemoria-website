import Icon from '../components/Icon.jsx';
import { AmenityGrid, Banner, CtaBand, Head } from '../components/Blocks.jsx';
import { AMENITIES_INTRO, AMENITIES_NOTE, IMG } from '../data.js';

export default function Amenities() {
  return (
    <>
      <Banner image={IMG.cafe} alt="Café at Lemoria co-working space, Coimbatore" crumb="Amenities" title="60+ amenities, already included" text="Facilities, professional services, technology and safety, all ready from your first day." />
      <section className="section soft">
        <div className="container">
          <Head center eyebrow="Included" title="Amenities at Lemoria, Coimbatore" lead={AMENITIES_INTRO} />
          <AmenityGrid />
          <p className="am-note"><Icon name="check" size={16} />{AMENITIES_NOTE}</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
