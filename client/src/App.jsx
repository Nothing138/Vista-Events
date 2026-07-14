import { Routes, Route } from 'react-router-dom';
import PublicApp from './PublicApp';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminReviews from './admin/AdminReviews';
import AdminPackages from './admin/AdminPackages';
import AdminGallery from './admin/AdminGallery';

export default function App() {
  return (
    <Routes>
      {/* Admin section*/}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminReviews />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="packages" element={<AdminPackages />} />
        <Route path="gallery" element={<AdminGallery />} />
      </Route>

      {/* Public section*/}
      <Route path="/*" element={<PublicApp />} />
    </Routes>
  );
}