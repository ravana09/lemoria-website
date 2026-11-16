import { Hero, Offers, Why } from '../sections/Top.jsx';
import { Amenities, Experience } from '../sections/Media.jsx';
import { HomeAbout, HomeFaq } from '../sections/More.jsx';
import { Contact } from '../sections/Social.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <Offers />
      <Why />
      <Experience />
      <Amenities />
      <HomeFaq />
      <Contact />
    </>
  );
}
