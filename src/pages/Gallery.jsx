import { useState } from 'react';
import Img from '../components/Img.jsx';
import { Banner, CtaBand, Head } from '../components/Blocks.jsx';
import { GALLERY, IMG } from '../data.js';

const CATS = ['All', ...new Set(GALLERY.map((g) => g.cat))];

export default function Gallery() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === cat);
  return (
    <>
      <Banner image={IMG.bigRoom} alt="Grand conference cabin at Lemoria, Coimbatore" crumb="Gallery" title="Take a look inside" text="The shared floor, private cabins, conference cabins, lounge and café at Lemoria, Nehru Nagar East." />
      <section className="section">
        <div className="container">
          <Head center eyebrow="Gallery" title="Spaces designed for focus and comfort" lead="Browse by space to see where our members work, meet and recharge." />
          <div className="tabs" role="tablist" aria-label="Filter photos">
            {CATS.map((c) => <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <div className="masonry" key={cat}>
            {list.map((g) => (
              <figure className="gal-fig" key={g.src}>
                <Img src={g.src} alt={`${g.alt} at Lemoria, Coimbatore`} sizes="(max-width: 700px) 100vw, 400px" />
                <figcaption><span>{g.cat}</span>{g.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
