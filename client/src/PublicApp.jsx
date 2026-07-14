import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Footer from './components/Footer';
import useSmoothScroll from './hooks/useSmoothScroll';

import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import PackagesPage from './pages/PackagesPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';

export default function PublicApp() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll(loaded);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <GrainOverlay />
      <CustomCursor />

      <Header />

      <Routes>
        <Route path="/" element={<Home ready={loaded} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </>
  );
}