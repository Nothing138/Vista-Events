import { useEffect, useState } from 'react';
import { adminFetch } from './adminApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const emptyForm = { name: '', price: '', description: '', inclusions: '', featured: false };

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [status, setStatus] = useState('loading');
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null); 
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const loadPackages = async () => {
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/api/packages`);
      const data = await res.json();
      if (data.success) {
        setPackages(data.packages);
        setStatus('ready');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
  };

  const startEdit = (pkg) => {
    setEditingId(pkg._id);
    setForm({
      name: pkg.name || '',
      price: pkg.price || '',
      description: pkg.description || '',
      inclusions: (pkg.inclusions || []).join(', '),
      featured: !!pkg.featured,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('price', form.price);
    fd.append('description', form.description);
    fd.append(
      'inclusions',
      JSON.stringify(form.inclusions.split(',').map((s) => s.trim()).filter(Boolean))
    );
    fd.append('featured', form.featured);
    if (imageFile) fd.append('image', imageFile);

    try {
      const path = editingId ? `/api/admin/packages/${editingId}` : '/api/admin/packages';
      const method = editingId ? 'PUT' : 'POST';
      const data = await adminFetch(path, { method, body: fd });

      if (data.success) {
        resetForm();
        loadPackages();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deletePackage = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    setBusyId(id);
    try {
      const data = await adminFetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
      if (data.success) {
        setPackages((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Packages</h1>

      {/* Create / Edit form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 mb-10 rounded-sm space-y-5"
        style={{ background: 'rgba(244,244,240,0.03)', border: '1px solid rgba(244,244,240,0.1)' }}
      >
        <h2 className="font-display text-xl mb-2">
          {editingId ? 'Edit Package' : 'Add New Package'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            className="field"
            placeholder="Package name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="field"
            placeholder="Price (e.g. Starting at $8,500)"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <textarea
          className="field resize-none"
          rows="2"
          placeholder="Short description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="field"
          placeholder="Inclusions, comma separated (e.g. Venue styling, Coordination, Florals)"
          value={form.inclusions}
          onChange={(e) => setForm({ ...form, inclusions: e.target.value })}
        />

        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label className="flex items-center gap-2 text-sm text-oyster/70">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured / Most Requested
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="text-sm text-oyster/60"
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-liquid px-6 py-3 text-xs tracking-[0.2em] uppercase" disabled={saving}>
            <span>{saving ? 'Saving...' : editingId ? 'Update Package' : 'Create Package'}</span>
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="btn-outline px-6 py-3 text-xs tracking-[0.2em] uppercase">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      {status === 'loading' && <p className="text-oyster/50">Loading…</p>}
      {status === 'error' && <p className="text-oyster/50">Could not load packages.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="rounded-sm overflow-hidden flex flex-col"
            style={{ background: 'rgba(244,244,240,0.03)', border: '1px solid rgba(244,244,240,0.1)' }}
          >
            {pkg.image && (
              <div className="aspect-[4/3]">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              {pkg.featured && <span className="fig-label mb-1">Featured</span>}
              <p className="font-display text-lg mb-1">{pkg.name}</p>
              <p className="text-champagne text-sm mb-4">{pkg.price}</p>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => startEdit(pkg)}
                  className="btn-outline flex-1 px-3 py-2 text-xs tracking-[0.15em] uppercase"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePackage(pkg._id)}
                  disabled={busyId === pkg._id}
                  className="px-3 py-2 text-xs tracking-[0.15em] uppercase rounded-sm"
                  style={{ background: 'rgba(224,133,133,0.12)', border: '1px solid rgba(224,133,133,0.4)', color: '#e08585' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}