import React, { useState, useMemo } from 'react';
import RestaurantLayout from '../../components/layout/RestaurantLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function RestaurantOrders() {
  const { orders, restaurants, activeManagedRestId, db, showToast, showConfirmModal } = useQuickBite();

  const [filterTab, setFilterTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const activeRest = restaurants.find((r) => r.id === activeManagedRestId) || restaurants[0] || {};

  const restOrders = useMemo(() => {
    return orders.filter((o) => o.restaurantId === activeRest.id);
  }, [orders, activeRest]);

  const filteredOrders = useMemo(() => {
    return restOrders.filter((o) => {
      if (filterTab !== 'all') {
        if (filterTab === 'active' && !['placed', 'accepted', 'preparing', 'ready', 'ready_for_pickup'].includes(o.status)) {
          return false;
        } else if (filterTab !== 'active' && o.status !== filterTab) {
          return false;
        }
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchId = (o.id || '').toLowerCase().includes(q);
        const matchCust = (o.customerName || '').toLowerCase().includes(q);
        if (!matchId && !matchCust) return false;
      }
      return true;
    });
  }, [restOrders, filterTab, searchTerm]);

  const handleUpdateStatus = (orderId, newStatus) => {
    db.updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} marked as ${newStatus.replace(/_/g, ' ')}`, 'success');
  };

  return (
    <RestaurantLayout title="Live Kitchen Pipeline" subtitle="Manage incoming food preparation and dispatch orders">
      {/* Top Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--color-surface)', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'active', label: 'Active Pipeline' },
            { id: 'placed', label: 'New Placed' },
            { id: 'preparing', label: 'Preparing' },
            { id: 'ready_for_pickup', label: 'Ready for Pickup' },
            { id: 'delivered', label: 'Delivered' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTab(tab.id)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: filterTab === tab.id ? 'var(--color-primary)' : 'transparent',
                color: filterTab === tab.id ? '#fff' : 'var(--color-text-main)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="c-search-box" style={{ width: '280px' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--color-primary)' }}></i>
          <input
            type="text"
            placeholder="Search Order ID or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '60px 20px', textAlign: 'center' }}>
          <i className="fa-solid fa-clipboard-list" style={{ fontSize: '3rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}></i>
          <h3>No orders found</h3>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>There are no orders matching your current criteria.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {filteredOrders.map((o) => (
            <div
              key={o.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Order #{o.id}</h3>
                    <span className={`badge-status ${o.status}`} style={{ textTransform: 'capitalize' }}>
                      {o.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Customer: <strong>{o.customerName || 'Customer'}</strong> • Contact: {o.customerPhone || 'N/A'} • {new Date(o.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    ₹{o.billSummary?.grandTotal || o.total || 0}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {o.paymentMethod || 'UPI'} • {o.paymentStatus || 'Paid'}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>Ordered Items:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {(o.items || []).map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--color-surface-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '8px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{it.name}</span>
                      <strong style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>× {it.quantity}</strong>
                    </div>
                  ))}
                </div>
                {o.instructions && (
                  <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--color-warning)', fontWeight: 600 }}>
                    <i className="fa-regular fa-note-sticky"></i> Cooking Instructions: {o.instructions}
                  </div>
                )}
                {o.deliveryAddress && (
                  <div style={{ marginTop: '6px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i>
                    Deliver to: {o.deliveryAddress}
                  </div>
                )}
              </div>

              {/* Pipeline Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                {o.status === 'placed' && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleUpdateStatus(o.id, 'preparing')}
                  >
                    <i className="fa-solid fa-check"></i> Accept & Start Preparing
                  </button>
                )}

                {o.status === 'preparing' && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ background: 'var(--color-success)', color: '#fff', border: 'none' }}
                    onClick={() => handleUpdateStatus(o.id, 'ready_for_pickup')}
                  >
                    <i className="fa-solid fa-box-check"></i> Mark Ready for Pickup
                  </button>
                )}

                {o.status === 'ready_for_pickup' && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleUpdateStatus(o.id, 'out_for_delivery')}
                  >
                    <i className="fa-solid fa-motorcycle"></i> Handed over to Rider
                  </button>
                )}

                {o.status === 'out_for_delivery' && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleUpdateStatus(o.id, 'delivered')}
                  >
                    <i className="fa-solid fa-check-double"></i> Mark Delivered
                  </button>
                )}

                {['placed', 'preparing'].includes(o.status) && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={async () => {
                      const confirmed = await showConfirmModal({
                        title: 'Reject / Cancel Order?',
                        message: `Are you sure you want to cancel / reject Order #${o.id}?`,
                        confirmText: 'Yes, Cancel Order',
                        cancelText: 'Keep Order',
                        type: 'danger'
                      });
                      if (confirmed) {
                        handleUpdateStatus(o.id, 'cancelled');
                      }
                    }}
                  >
                    <i className="fa-solid fa-ban"></i> Reject / Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </RestaurantLayout>
  );
}
