import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { isAdminLoggedIn, logoutAdmin } from './adminApi';
import logoSmall from '../assets/vista-events-logo-small.jpg';

const navItems = [
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/packages', label: 'Packages' },
  { to: '/admin/gallery', label: 'Gallery' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  if (!isAdminLoggedIn()) return null;

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-vantage)', cursor: 'auto' }}>
      {/* Sidebar */}
      <aside
        className="w-60 shrink-0 hidden md:flex flex-col p-6"
        style={{ borderRight: '1px solid rgba(244,244,240,0.1)' }}
      >
        <div className="flex items-center gap-3 mb-10">
          <img src={logoSmall} alt="Vista Events" className="h-9 w-auto rounded-sm" />
          <span className="font-display text-sm tracking-widest">ADMIN</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-3 text-sm tracking-wide rounded-sm transition-colors duration-300 ${
                  isActive ? 'text-champagne' : 'text-oyster/60 hover:text-oyster'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'rgba(227,200,116,0.08)' : 'transparent',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="btn-outline px-4 py-3 text-xs tracking-[0.2em] uppercase"
        >
          Log Out
        </button>
      </aside>

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{ background: 'var(--color-vantage)', borderBottom: '1px solid rgba(244,244,240,0.1)' }}
      >
        <div className="flex items-center gap-2">
          <img src={logoSmall} alt="Vista Events" className="h-8 w-auto rounded-sm" />
          <span className="font-display text-sm tracking-widest">ADMIN</span>
        </div>
        <button onClick={handleLogout} className="text-xs tracking-[0.2em] uppercase text-champagne">
          Log Out
        </button>
      </div>

      {/* Mobile bottom nav */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around py-3"
        style={{ background: 'var(--color-vantage)', borderTop: '1px solid rgba(244,244,240,0.1)' }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `text-xs tracking-wide ${isActive ? 'text-champagne' : 'text-oyster/60'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 pb-24 md:pb-10 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}