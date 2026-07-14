const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function adminFetch(path, options = {}) {
  const token = localStorage.getItem('vista_admin_token');

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem('vista_admin_token');
    window.location.href = '/admin/login';
    throw new Error('Session expired');
  }

  return res.json();
}

export function isAdminLoggedIn() {
  return !!localStorage.getItem('vista_admin_token');
}

export function saveAdminToken(token) {
  localStorage.setItem('vista_admin_token', token);
}

export function logoutAdmin() {
  localStorage.removeItem('vista_admin_token');
}