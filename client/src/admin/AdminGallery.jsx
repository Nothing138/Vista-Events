import { useEffect, useState } from 'react';
import { adminFetch } from './adminApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('loading');
  const [form, setForm] = useState({ title: '', eventType: '' });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const loadImages = async () => {
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
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
    loadImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return;
    setSaving(true);

    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('eventType', form.eventType);
    fd.append('image', imageFile);

    try {
      const data = await adminFetch('/api/admin/gallery', { method: 'POST', body: fd });
      if (data.success) {
        setForm({ title: '', eventType: '' });
        setImageFile(null);
        loadImages();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    setBusyId(id);
    try {
      const data = await adminFetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (data.success) {
        setImages((prev) => prev.filter((img) => img._id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Gallery</h1>

      <form
        onSubmit={handleUpload}
        className="p-6 mb-10 rounded-sm space-y-5"
        style={{ background: 'rgba(244,244,240,0.03)', border: '1px solid rgba(244,244,240,0.1)' }}
      >
        <h2 className="font-display text-xl mb-2">Upload Event Photo</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            className="field"
            placeholder="Photo title (e.g. The Marlowe Gala)"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="field"
            placeholder="Event type (e.g. Corporate Gala)"
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImageFile(e.target.files[0])}
          className="text-sm text-oyster/60"
        />

        <button type="submit" className="btn-liquid px-6 py-3 text-xs tracking-[0.2em] uppercase" disabled={saving}>
          <span>{saving ? 'Uploading...' : 'Upload Photo'}</span>
        </button>
      </form>

      {status === 'loading' && <p className="text-oyster/50">Loading…</p>}
      {status === 'error' && <p className="text-oyster/50">Could not load gallery.</p>}
      {status === 'ready' && images.length === 0 && <p className="text-oyster/50">No photos uploaded yet.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative group rounded-sm overflow-hidden aspect-square">
            <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)' }}
            >
              <p className="text-oyster text-sm font-display truncate mb-2">{img.title}</p>
              <button
                onClick={() => deleteImage(img._id)}
                disabled={busyId === img._id}
                className="px-3 py-1.5 text-xs tracking-[0.15em] uppercase rounded-sm w-fit"
                style={{ background: 'rgba(224,133,133,0.85)', color: '#2a0d0a' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}