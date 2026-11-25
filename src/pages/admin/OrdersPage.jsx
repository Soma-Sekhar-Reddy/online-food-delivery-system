import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function AdminOrders() {
  const { db, orders, restaurants, showToast } = useQuickBite();

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Rider Assignment Modal
  const [assigningOrder, setAssigningOrder] = useState(null);
  const [selectedRiderId, setSelectedRiderId] = useState('');

  // View Details Modal
  const [viewingOrder, setViewingOrder] = useState(null);

  const deliveryPartners = useMemo(() => {
    return db.getDeliveryPartners();
  }, [db]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (filter !== 'all') {
        if (filter === 'active' && !['placed', 'preparing', 'ready', 'ready_for_pickup', 'out_for_delivery'].includes(o.status)) {
          return false;
        } else if (filter !== 'active' && o.status !== filter) {
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
  }, [orders, filter, searchTerm]);

  const getRestName = (restId) => {
    const r = restaurants.find((item) => item.id === restId);
    return r ? r.name : 'QuickBite Kitchen';
  };

  const getRiderName = (riderId) => {
    if (!riderId) return 'Unassigned';
    const rider = deliveryPartners.find((d) => d.id === riderId);
    return rider ? rider.name : 'Vikram Singh';
  };

  const handleStatusOverride = (orderId, newStatus) => {
    db.updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} status set to: ${newStatus.replace(/_/g, ' ')}`, 'success');
  };

  const handleOpenAssignRider = (order) => {
    setAssigningOrder(order);
    setSelectedRiderId(order.deliveryPartnerId || deliveryPartners[0]?.id || '');
  };

  const handleSaveRiderAssignment = (e) => {
    e.preventDefault();
    if (!assigningOrder || !selectedRiderId) return;
    db.assignDeliveryPartner(assigningOrder.id, selectedRiderId);
    showToast(`Assigned rider "${getRiderName(selectedRiderId)}" to Order #${assigningOrder.id}`, 'success');
    setAssigningOrder(null);
  };

  return (
    <AdminLayout title="Orders & Dispatch Center" subtitle="Real-time multi-restaurant dispatch pipeline, rider assignment, and order oversight">
      {/* Control Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--color-surface)', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${orders.length})` },
            { id: 'active', label: 'Active Pipeline' },
            { id: 'placed', label: 'Placed' },
            { id: 'preparing', label: 'Preparing' },
            { id: 'out_for_delivery', label: 'In Transit' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '8px 14px',
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

        <div className="c-search-box" style={{ width: '280px' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--color-primary)' }}></i>
          <input
            type="text"
            placeholder="Search Order ID, Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        {filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-box-open" style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}></i>
            <p>No orders found matching this filter.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '12px' }}>Order</th>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Restaurant</th>
                  <th style={{ padding: '12px' }}>Amount</th>
                  <th style={{ padding: '12px' }}>Status Override</th>
                  <th style={{ padding: '12px' }}>Assigned Rider</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 800 }}>#{o.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 700 }}>{o.customerName || 'Customer'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{o.customerPhone || 'N/A'}</div>
                    </td>

                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {getRestName(o.restaurantId)}
                    </td>

                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 800, color: 'var(--color-primary)' }}>
                        ₹{o.billSummary?.grandTotal || o.total || 0}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {o.paymentMethod || 'UPI'} • {o.paymentStatus || 'Paid'}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusOverride(o.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: 'var(--color-surface-card)',
                          color: 'var(--color-text-main)',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="placed">Placed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready_for_pickup">Ready for Pickup</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                        <i className="fa-solid fa-motorcycle" style={{ color: o.deliveryPartnerId ? 'var(--color-success)' : 'var(--color-text-muted)', marginRight: '6px' }}></i>
                        {getRiderName(o.deliveryPartnerId)}
                      </span>
                    </td>

                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenAssignRider(o)}
                          title="Assign or reassign delivery driver"
                        >
                          <i className="fa-solid fa-user-tag"></i> Rider
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => setViewingOrder(o)}
                          title="View order details"
                        >
                          <i className="fa-regular fa-eye"></i>
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

      {/* Assign Rider Modal */}
      {assigningOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '28px', maxWidth: '440px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Dispatch Delivery Rider</h3>
              <button
                type="button"
                onClick={() => setAssigningOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Select a delivery partner to dispatch Order <strong>#{assigningOrder.id}</strong>.
            </p>

            <form onSubmit={handleSaveRiderAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Choose Delivery Executive</label>
                <select
                  value={selectedRiderId}
                  onChange={(e) => setSelectedRiderId(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                >
                  {deliveryPartners.map((dp) => (
                    <option key={dp.id} value={dp.id}>
                      {dp.name} ({dp.status === 'active' ? 'Online' : 'Offline'} • {dp.vehicleNumber || 'Bike'})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setAssigningOrder(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {viewingOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '28px', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Order Details #{viewingOrder.id}</h3>
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
              <div><strong>Customer:</strong> {viewingOrder.customerName} ({viewingOrder.customerPhone || 'N/A'})</div>
              <div><strong>Restaurant:</strong> {getRestName(viewingOrder.restaurantId)}</div>
              <div><strong>Delivery Address:</strong> {viewingOrder.deliveryAddress || 'Hyderabad'}</div>
              {viewingOrder.instructions && <div><strong>Instructions:</strong> {viewingOrder.instructions}</div>}
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>Ordered Items:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              {(viewingOrder.items || []).map((it, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>{it.quantity} × {it.name}</span>
                  <strong>₹{it.price * it.quantity}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', marginBottom: '20px' }}>
              <span>Total Grand:</span>
              <span style={{ color: 'var(--color-primary)' }}>₹{viewingOrder.billSummary?.grandTotal || viewingOrder.total || 0}</span>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={() => setViewingOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
