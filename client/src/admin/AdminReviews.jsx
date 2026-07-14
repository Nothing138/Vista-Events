import { useEffect, useState } from 'react';
import { adminFetch } from './adminApi';

const TABS = ['all', 'pending', 'approved', 'rejected'];

const statusColor = {
  pending: '#e3c874',
  approved: '#7fbf7f',
  rejected: '#e08585',
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('loading'); 
  const [tab, setTab] = useState('pending');
  const [busyId, setBusyId] = useState(null);

  const loadReviews = async () => {
    setStatus('loading');
    try {
      const data = await adminFetch('/api/admin/reviews');
      if (data.success) {
        setReviews(data.reviews);
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
    loadReviews();
  }, []);

  const updateStatus = async (id, newStatus) => {
    setBusyId(id);
    try {
      const data = await adminFetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      if (data.success) {
        setReviews((prev) => prev.map((r) => (r._id === id ? data.review : r)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    setBusyId(id);
    try {
      const data = await adminFetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  const filtered = tab === 'all' ? reviews : reviews.filter((r) => r.status === tab);
  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Reviews</h1>
      <p className="text-oyster/50 text-sm mb-8">
        {pendingCount > 0 ? `${pendingCount} review${pendingCount > 1 ? 's' : ''} awaiting approval` : 'All caught up'}
      </p>

      <div className="flex gap-2 mb-8 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 text-xs tracking-[0.15em] uppercase rounded-sm transition-colors duration-300"
            style={{
              background: tab === t ? 'rgba(227,200,116,0.12)' : 'transparent',
              border: `1px solid ${tab === t ? 'var(--color-champagne)' : 'rgba(244,244,240,0.15)'}`,
              color: tab === t ? 'var(--color-champagne)' : 'rgba(244,244,240,0.6)',
            }}
          >
            {t} {t !== 'all' && `(${reviews.filter((r) => r.status === t).length})`}
          </button>
        ))}
      </div>

      {status === 'loading' && <p className="text-oyster/50">Loading…</p>}
      {status === 'error' && <p className="text-oyster/50">Could not load reviews.</p>}
      {status === 'ready' && filtered.length === 0 && (
        <p className="text-oyster/50">No {tab !== 'all' ? tab : ''} reviews.</p>
      )}

      <div className="space-y-4">
        {filtered.map((r) => (
          <div
            key={r._id}
            className="p-5 rounded-sm"
            style={{ background: 'rgba(244,244,240,0.03)', border: '1px solid rgba(244,244,240,0.1)' }}
          >
            <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-display text-lg">{r.name}</p>
                  <span className="text-champagne text-sm">{'★'.repeat(r.rating || 0)}</span>
                </div>
                {r.eventType && <p className="coord-label">{r.eventType}</p>}
              </div>
              <span
                className="text-xs tracking-[0.15em] uppercase px-2 py-1 rounded-sm shrink-0"
                style={{ color: statusColor[r.status], border: `1px solid ${statusColor[r.status]}44` }}
              >
                {r.status}
              </span>
            </div>

            <p className="text-oyster/70 text-sm leading-relaxed mb-4">{r.message}</p>

            <div className="flex gap-3 flex-wrap">
              {r.status !== 'approved' && (
                <button
                  onClick={() => updateStatus(r._id, 'approved')}
                  disabled={busyId === r._id}
                  className="px-4 py-2 text-xs tracking-[0.15em] uppercase rounded-sm"
                  style={{ background: 'rgba(127,191,127,0.12)', border: '1px solid rgba(127,191,127,0.4)', color: '#7fbf7f' }}
                >
                  Approve
                </button>
              )}
              {r.status !== 'rejected' && (
                <button
                  onClick={() => updateStatus(r._id, 'rejected')}
                  disabled={busyId === r._id}
                  className="px-4 py-2 text-xs tracking-[0.15em] uppercase rounded-sm"
                  style={{ background: 'rgba(224,133,133,0.12)', border: '1px solid rgba(224,133,133,0.4)', color: '#e08585' }}
                >
                  Reject
                </button>
              )}
              <button
                onClick={() => deleteReview(r._id)}
                disabled={busyId === r._id}
                className="btn-outline px-4 py-2 text-xs tracking-[0.15em] uppercase"
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