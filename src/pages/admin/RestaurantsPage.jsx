import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function AdminRestaurants() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';

  const { db, showToast, showConfirmModal } = useQuickBite();

  const [restaurants, setRestaurants] = useState(() => db.getRestaurants());
  const [filter, setFilter] = useState(initialFilter);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRest, setEditingRest] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cuisines: 'North Indian, Mughlai, Biryani',
    location: 'Banjara Hills, Hyderabad',
    phone: '+91 98765 43210',
    priceForTwo: '450',
    deliveryTime: '30 mins',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    commissionRate: 15,
    isPureVeg: false,
    status: 'active'
  });

  const refreshRestaurants = () => {
    setRestaurants(db.getRestaurants());
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      if (filter !== 'all' && r.status !== filter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = (r.name || '').toLowerCase().includes(q);
        const matchLoc = (r.location || '').toLowerCase().includes(q);
        const matchCuis = (r.cuisines || []).some((c) => c.toLowerCase().includes(q));
        if (!matchName && !matchLoc && !matchCuis) return false;
      }
      return true;
    });
  }, [restaurants, filter, searchTerm]);

  const pendingCount = restaurants.filter((r) => r.status === 'pending').length;
  const activeCount = restaurants.filter((r) => r.status === 'active').length;

  const handleOpenAdd = () => {
    setEditingRest(null);
    setFormData({
      name: '',
      cuisines: 'North Indian, Biryani',
      location: 'HITEC City, Hyderabad',
      phone: '+91 ',
      priceForTwo: '400',
      deliveryTime: '30 mins',
      rating: '4.5',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      commissionRate: 15,
      isPureVeg: false,
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (r) => {
    setEditingRest(r);
    setFormData({
      name: r.name,
      cuisines: (r.cuisines || []).join(', '),
      location: r.location || '',
      phone: r.phone || '',
      priceForTwo: String(r.priceForTwo || 400),
      deliveryTime: r.deliveryTime || '30 mins',
      rating: String(r.rating || 4.5),
      image: r.image || '',
      commissionRate: r.commissionRate || 15,
      isPureVeg: Boolean(r.isPureVeg),
      status: r.status || 'active'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Restaurant name is required', 'error');
      return;
    }

    const payload = {
      ...formData,
      cuisines: formData.cuisines.split(',').map((c) => c.trim()).filter(Boolean),
      priceForTwo: Number(formData.priceForTwo),
      rating: Number(formData.rating),
      commissionRate: Number(formData.commissionRate)
    };

    if (editingRest) {
      db.updateRestaurant(editingRest.id, payload);
      showToast(`Updated restaurant: ${formData.name}`, 'success');
    } else {
      db.addRestaurant(payload);
      showToast(`Added new restaurant: ${formData.name}`, 'success');
    }

    setIsModalOpen(false);
    refreshRestaurants();
  };

  const handleApprove = (r) => {
    db.approveRestaurant(r.id);
    showToast(`Approved partner kitchen: ${r.name}`, 'success');
    refreshRestaurants();
  };

  const handleToggleStatus = (r) => {
    const next = r.status === 'active' ? 'suspended' : 'active';
    db.updateRestaurant(r.id, { status: next });
    showToast(`Restaurant ${r.name} status: ${next.toUpperCase()}`, 'info');
    refreshRestaurants();
  };

  const handleDelete = async (r) => {
    const confirmed = await showConfirmModal({
      title: 'Deregister Restaurant?',
      message: `Are you sure you want to permanently delete "${r.name}" from the QuickBite platform?`,
      confirmText: 'Delete Restaurant',
      cancelText: 'Cancel',
      type: 'danger'
    });
    if (confirmed) {
      db.deleteRestaurant(r.id);
      showToast(`Deleted ${r.name}`, 'info');
      refreshRestaurants();
    }
  };

  return (
    <AdminLayout title="Restaurant Outlets & Onboarding" subtitle="Review incoming restaurant applications and manage active dining partner operations">
      {/* 3 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Active Partners</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-success)' }}>{activeCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>Accepting online orders</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Pending Onboarding Reviews</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>{pendingCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#f59e0b', marginTop: '4px' }}>Awaiting verification</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Total Registered Outlets</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)' }}>{restaurants.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Across Hyderabad & Mumbai</div>
        </div>
      </div>

      {/* Control Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--color-surface)', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          {[
            { id: 'all', label: 'All Outlets' },
            { id: 'active', label: 'Active' },
            { id: 'pending', label: `Pending (${pendingCount})` },
            { id: 'suspended', label: 'Suspended' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: filter === tab.id ? 'var(--color-primary)' : 'transparent',
                color: filter === tab.id ? '#fff' : 'var(--color-text-main)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="c-search-box" style={{ width: '260px' }}>
            <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--color-primary)' }}></i>
            <input
              type="text"
              placeholder="Search outlet, cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenAdd}
            style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            <i className="fa-solid fa-plus"></i> Onboard Restaurant
          </button>
        </div>
      </div>

      {/* Restaurants Table */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        {filteredRestaurants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-store-slash" style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}></i>
            <p>No restaurants found matching this criteria.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '12px' }}>Restaurant</th>
                  <th style={{ padding: '12px' }}>Cuisines & Zone</th>
                  <th style={{ padding: '12px' }}>Rating</th>
                  <th style={{ padding: '12px' }}>Cost for 2</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRestaurants.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={r.image}
                          alt={r.name}
                          style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=120&q=80';
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{r.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{r.phone || '+91 98765 43210'}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600 }}>{(r.cuisines || []).join(', ')}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{r.location || 'Hyderabad'}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-warning)' }}>
                        ★ {r.rating || 4.5}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>₹{r.priceForTwo || 400}</td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          background: r.status === 'active' ? 'rgba(16,185,129,0.1)' : r.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                          color: r.status === 'active' ? 'var(--color-success)' : r.status === 'pending' ? 'var(--color-warning)' : 'var(--color-danger)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'capitalize'
                        }}
                      >
                        {r.status || 'Active'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        {r.status === 'pending' && (
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleApprove(r)}
                            title="Approve onboarding application"
                            style={{ background: 'var(--color-success)', borderColor: 'var(--color-success)' }}
                          >
                            <i className="fa-solid fa-stamp"></i> Approve
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleToggleStatus(r)}
                          title={r.status === 'active' ? 'Suspend outlet' : 'Activate outlet'}
                        >
                          <i className={r.status === 'active' ? 'fa-solid fa-pause' : 'fa-solid fa-play'} style={{ color: r.status === 'active' ? 'var(--color-warning)' : 'var(--color-success)' }}></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenEdit(r)}
                          title="Edit restaurant"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(r)}
                          title="Delete restaurant"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '28px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {editingRest ? 'Edit Restaurant Partner' : 'Onboard New Dining Partner'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Restaurant Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Cuisines (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.cuisines}
                  onChange={(e) => setFormData({ ...formData, cuisines: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Location / Area</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Phone Contact</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Price for Two (₹)</label>
                  <input
                    type="number"
                    value={formData.priceForTwo}
                    onChange={(e) => setFormData({ ...formData, priceForTwo: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Commission Rate (%)</label>
                  <input
                    type="number"
                    value={formData.commissionRate}
                    onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={formData.isPureVeg}
                    onChange={(e) => setFormData({ ...formData, isPureVeg: e.target.checked })}
                  />
                  <span>Pure Veg Kitchen</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Save Restaurant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
