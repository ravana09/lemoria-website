import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Space from './pages/Space.jsx';
import Memberships from './pages/Memberships.jsx';
import Amenities from './pages/Amenities.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Book from './pages/Book.jsx';
import FaqPage from './pages/Faq.jsx';
import { SPACES } from './data.js';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        {Object.entries(SPACES).map(([id, s]) => <Route key={id} path={s.path.slice(1)} element={<Space id={id} />} />)}
        <Route path="meeting-rooms" element={<Space id="conference-cabins" />} />
        <Route path="book" element={<Book />} />
        <Route path="memberships" element={<Memberships />} />
        <Route path="plans" element={<Memberships />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="amenities" element={<Amenities />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
