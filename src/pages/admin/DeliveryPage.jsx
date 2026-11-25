import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function AdminDelivery() {
  const { db, showToast, showConfirmModal } = useQuickBite();

  const [drivers, setDrivers] = useState(() => db.getDeliveryPartners());
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'TS 09 EQ 4022',
    status: 'active',
    rating: 4.9
  });

  const refreshDrivers = () => {
    setDrivers(db.getDeliveryPartners());
  };

  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      if (filter !== 'all' && d.status !== filter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = (d.name || '').toLowerCase().includes(q);
        const matchVeh = (d.vehicleNumber || '').toLowerCase().includes(q);
        if (!matchName && !matchVeh) return false;
      }
      return true;
    });
  }, [drivers, filter, searchTerm]);

  const activeCount = drivers.filter((d) => d.status === 'active').length;
  const offlineCount = drivers.filter((d) => d.status !== 'active').length;

  const handleOpenAdd = () => {
    setEditingDriver(null);
    setFormData({
      name: '',
      email: '',
      phone: '+91 ',
      vehicleType: 'Motorcycle',
      vehicleNumber: 'TS 09 EQ ',
      status: 'active',
      rating: 4.9
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d) => {
    setEditingDriver(d);
    setFormData({
      name: d.name,
      email: d.email || '',
      phone: d.phone || '',
      vehicleType: d.vehicleType || 'Motorcycle',
      vehicleNumber: d.vehicleNumber || '',
      status: d.status || 'active',
      rating: d.rating || 4.9
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Rider name is required', 'error');
      return;
    }

    if (editingDriver) {
      db.saveUser({
        ...editingDriver,
        ...formData
      });
      showToast(`Updated driver: ${formData.name}`, 'success');
    } else {
      db.saveUser({
        id: `usr-driver-${Date.now()}`,
        role: 'delivery',
        ...formData,
        joinedAt: new Date().toISOString()
      });
      showToast(`Onboarded new fleet partner: ${formData.name}`, 'success');
    }

    setIsModalOpen(false);
    refreshDrivers();
  };

  const handleToggleDuty = (d) => {
    const next = d.status === 'active' ? 'offline' : 'active';
    db.saveUser({ ...d, status: next });
    showToast(`Rider ${d.name} duty: ${next.toUpperCase()}`, 'info');
    refreshDrivers();
  };

  const handleDelete = async (d) => {
    const confirmed = await showConfirmModal({
      title: 'Remove Rider from Fleet?',
      message: `Are you sure you want to remove rider "${d.name}" from active fleet records?`,
      confirmText: 'Remove Rider',
      cancelText: 'Cancel',
      type: 'danger'
    });
    if (confirmed) {
      db.deleteUser(d.id);
      showToast(`Removed ${d.name}`, 'info');
      refreshDrivers();
    }
  };

  return (
    <AdminLayout title="Delivery Partner Fleet" subtitle="Manage on-duty field riders, vehicle verifications, and dispatch performance">
      {/* 3 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Active Fleet on Duty</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-success)' }}>{activeCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>GPS Broadcast Active</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Offline / Resting Riders</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>{offlineCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Off-duty standing</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Total Registered Riders</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)' }}>{drivers.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Verified fleet partners</div>
        </div>
      </div>

      {/* Control Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--color-surface)', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          {[
            { id: 'all', label: 'All Fleet' },
            { id: 'active', label: 'Online' },
            { id: 'offline', label: 'Offline' }
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
              placeholder="Search rider name, vehicle..."
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
            <i className="fa-solid fa-user-plus"></i> Onboard Rider
          </button>
        </div>
      </div>

      {/* Fleet Table */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        {filteredDrivers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-person-biking" style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}></i>
            <p>No delivery partners match this criteria.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '12px' }}>Rider Executive</th>
                  <th style={{ padding: '12px' }}>Contact Phone</th>
                  <th style={{ padding: '12px' }}>Vehicle</th>
                  <th style={{ padding: '12px' }}>Rating</th>
                  <th style={{ padding: '12px' }}>Duty Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((d) => (
                  <tr key={d.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          <i className="fa-solid fa-motorcycle"></i>
                        </div>
                        <div>
                          <div style={{ fontWeight: 800 }}>{d.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{d.email || `${d.id}@quickfleet.com`}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>{d.phone || '+91 98765 43210'}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600 }}>{d.vehicleNumber || 'TS 09 EQ 4022'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{d.vehicleType || 'Motorcycle'}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-warning)' }}>
                        ★ {d.rating || 4.9}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          background: d.status === 'active' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                          color: d.status === 'active' ? 'var(--color-success)' : 'var(--color-danger)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'capitalize'
                        }}
                      >
                        {d.status === 'active' ? '● Online' : '○ Offline'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleToggleDuty(d)}
                          title={d.status === 'active' ? 'Set Offline' : 'Set Online'}
                        >
                          <i className={d.status === 'active' ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off'} style={{ color: d.status === 'active' ? 'var(--color-success)' : 'var(--color-text-muted)', fontSize: '1.1rem' }}></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenEdit(d)}
                          title="Edit rider"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(d)}
                          title="Remove rider"
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
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '28px', maxWidth: '440px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {editingDriver ? 'Edit Fleet Rider' : 'Onboard New Delivery Executive'}
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
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Vehicle Type</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                    <option value="EV Bike">EV Bike</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Vehicle Number</label>
                  <input
                    type="text"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Duty Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                >
                  <option value="active">Online / On Duty</option>
                  <option value="offline">Offline / Resting</option>
                </select>
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
                  Save Rider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
