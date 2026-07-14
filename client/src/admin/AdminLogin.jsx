import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoSmall from '../assets/vista-events-logo-small.jpg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle'); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`${API_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('vista_admin_token', data.token);
        navigate('/admin/reviews');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--color-vantage)', cursor: 'auto' }}>
      <div
        className="w-full max-w-sm p-8 blueprint-corners"
        style={{ background: 'rgba(244,244,240,0.03)', border: '1px solid rgba(244,244,240,0.1)' }}
      >
        <div className="bc-tl" /><div className="bc-br" />

        <div className="flex flex-col items-center mb-8">
          <img src={logoSmall} alt="Vista Events" className="h-14 w-auto rounded-sm mb-4" />
          <h1 className="font-display text-2xl">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="field"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="field"
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="btn-liquid w-full px-8 py-3.5 text-xs tracking-[0.2em] uppercase"
            disabled={status === 'loading'}
          >
            <span>{status === 'loading' ? 'Signing in...' : 'Sign In'}</span>
          </button>

          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">Invalid email or password.</p>
          )}
        </form>
      </div>
    </div>
  );
}