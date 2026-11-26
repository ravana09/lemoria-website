import { Banner, CtaBand, Head, PlanGrid } from '../components/Blocks.jsx';
import { IMG } from '../data.js';

// TODO: update PLANS in data.js with Lemoria Luxe's real plans and prices.
export default function Memberships() {
  return (
    <>
      <Banner image={IMG.community} alt="Members working at Lemoria Luxe, Coimbatore" crumb="Plans" title="Plans" text="Flexible plans with ." />
      <section className="section soft">
        <div className="container">
          <Head center eyebrow="Plans" title="Pick the plan that suits you" lead="Prices depend on your workspace and plan length. Ask us and we’ll reply the same day." />
          <PlanGrid />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
