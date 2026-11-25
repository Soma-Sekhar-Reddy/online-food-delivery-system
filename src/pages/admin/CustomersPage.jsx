import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function AdminCustomers() {
  const { db, showToast, showConfirmModal } = useQuickBite();

  const [customers, setCustomers] = useState(() => db.getCustomers());
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active'
  });

  const refreshCustomers = () => {
    setCustomers(db.getCustomers());
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (filter !== 'all' && c.status !== filter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = (c.name || '').toLowerCase().includes(q);
        const matchEmail = (c.email || '').toLowerCase().includes(q);
        const matchPhone = (c.phone || '').toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone) return false;
      }
      return true;
    });
  }, [customers, filter, searchTerm]);

  const activeCount = customers.filter((c) => c.status === 'active').length;
  const blockedCount = customers.filter((c) => c.status === 'blocked').length;

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '+91 ',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCustomer(c);
    setFormData({
      name: c.name || '',
      email: c.email || '',
      phone: c.phone || '',
      status: c.status || 'active'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Please provide a name and email', 'error');
      return;
    }

    if (editingCustomer) {
      db.saveUser({
        ...editingCustomer,
        ...formData
      });
      showToast(`Updated customer: ${formData.name}`, 'success');
    } else {
      db.saveUser({
        id: `usr-cust-${Date.now()}`,
        role: 'customer',
        ...formData,
        joinedAt: new Date().toISOString()
      });
      showToast(`Created new customer account: ${formData.name}`, 'success');
    }

    setIsModalOpen(false);
    refreshCustomers();
  };

  const handleToggleBlock = (c) => {
    const next = c.status === 'blocked' ? 'active' : 'blocked';
    db.saveUser({ ...c, status: next });
    showToast(`Customer ${c.name} is now ${next.toUpperCase()}`, next === 'blocked' ? 'warning' : 'success');
    refreshCustomers();
  };

  const handleDelete = async (c) => {
    const confirmed = await showConfirmModal({
      title: 'Delete Customer Account?',
      message: `Are you sure you want to permanently delete customer account for "${c.name}"? This action cannot be undone.`,
      confirmText: 'Delete Customer',
      cancelText: 'Cancel',
      type: 'danger'
    });
    if (confirmed) {
      db.deleteUser(c.id);
      showToast(`Deleted ${c.name}`, 'info');
      refreshCustomers();
    }
  };

  return (
    <AdminLayout title="Customer Directory" subtitle="Manage registered food consumers, account security, and ordering standing">
      {/* 3 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Total Registered Users</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)' }}>{customers.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Food consumers</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Active Accounts</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-success)' }}>{activeCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>In Good Standing</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Blocked / Suspended</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-danger)' }}>{blockedCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '4px' }}>Security restriction</div>
        </div>
      </div>

      {/* Control Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--color-surface)', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          {['all', 'active', 'blocked'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: filter === tab ? 'var(--color-primary)' : 'transparent',
                color: filter === tab ? '#fff' : 'var(--color-text-main)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="c-search-box" style={{ width: '260px' }}>
            <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--color-primary)' }}></i>
            <input
              type="text"
              placeholder="Search customer name, email..."
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
            <i className="fa-solid fa-user-plus"></i> Add Customer
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        {filteredCustomers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-users-slash" style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}></i>
            <p>No customers match the active filters.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Contact Phone</th>
                  <th style={{ padding: '12px' }}>Account Status</th>
                  <th style={{ padding: '12px' }}>Registered</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary-light, rgba(255,107,53,0.1))', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          {(c.name || 'U').charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{c.name}</div>
                          <div style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)' }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>{c.phone || '+91 98765 43210'}</td>
                    <td style={{ padding: '12px' }}>
                      <span
                        className={`badge ${c.status === 'blocked' ? 'badge-danger' : 'badge-success'}`}
                        style={{
                          background: c.status === 'blocked' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                          color: c.status === 'blocked' ? 'var(--color-danger)' : 'var(--color-success)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'capitalize'
                        }}
                      >
                        {c.status || 'Active'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                      {c.joinedAt ? new Date(c.joinedAt).toLocaleDateString() : 'Nov 2026'}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleToggleBlock(c)}
                          title={c.status === 'blocked' ? 'Unblock user' : 'Block user'}
                        >
                          <i className={c.status === 'blocked' ? 'fa-solid fa-lock-open' : 'fa-solid fa-ban'} style={{ color: c.status === 'blocked' ? 'var(--color-success)' : 'var(--color-warning)' }}></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenEdit(c)}
                          title="Edit details"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(c)}
                          title="Delete customer"
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
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
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
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
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
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
