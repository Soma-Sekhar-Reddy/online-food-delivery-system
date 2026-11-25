import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import RestaurantLayout from '../../components/layout/RestaurantLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function RestaurantDashboard() {
  const { orders, restaurants, activeManagedRestId, db, showToast } = useQuickBite();

  const activeRest = restaurants.find((r) => r.id === activeManagedRestId) || restaurants[0] || {};
  const restOrders = useMemo(() => {
    return orders.filter((o) => o.restaurantId === activeRest.id);
  }, [orders, activeRest]);

  const activeOrders = useMemo(() => {
    return restOrders.filter((o) => ['placed', 'accepted', 'preparing', 'ready', 'ready_for_pickup'].includes(o.status));
  }, [restOrders]);

  const deliveredOrders = useMemo(() => {
    return restOrders.filter((o) => o.status === 'delivered');
  }, [restOrders]);

  const totalRevenue = useMemo(() => {
    return restOrders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.billSummary?.grandTotal || o.total || 0), 0);
  }, [restOrders]);

  const handleUpdateStatus = (orderId, newStatus) => {
    db.updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} moved to: ${newStatus.replace(/_/g, ' ')}`, 'success');
  };

  return (
    <RestaurantLayout title="Kitchen Operations" subtitle="Live stream of incoming orders and today's kitchen throughput">
      {/* Status banner */}
      <div style={{ padding: '14px 20px', borderRadius: 'var(--radius-md)', background: 'var(--color-success-bg, rgba(16,185,129,0.1))', border: '1px solid var(--color-success)', color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-circle-check" style={{ fontSize: '1.2rem' }}></i>
          <span>Kitchen is active for <strong>{activeRest.name}</strong>. Live orders are syncing in real time.</span>
        </div>
        <span className="badge badge-success" style={{ background: 'var(--color-success)', color: '#fff', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
          Online & Accepting
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="metrics-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
        <div className="metric-card" style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Today's Revenue</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹{totalRevenue}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>
              <i className="fa-solid fa-arrow-trend-up"></i> Live calculated
            </div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-light, rgba(255,107,53,0.1))', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
            <i className="fa-solid fa-wallet"></i>
          </div>
        </div>

        <div className="metric-card" style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Active Orders</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#3b82f6' }}>{activeOrders.length}</div>
            <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '4px', fontWeight: 600 }}>
              <i className="fa-solid fa-fire-burner"></i> Cooking & Packaging
            </div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
            <i className="fa-solid fa-bell-concierge"></i>
          </div>
        </div>

        <div className="metric-card" style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Completed Orders</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-success)' }}>{deliveredOrders.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>
              <i className="fa-solid fa-circle-check"></i> Delivered successfully
            </div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
        </div>

        <div className="metric-card" style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Customer Rating</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-warning)' }}>
              ★ {activeRest.rating || 4.5}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Based on genuine reviews
            </div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245,158,11,0.1)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
      </div>

      {/* Incoming Orders Live Stream */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Incoming Orders Queue</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>Real-time updates as hungry customers place orders</p>
          </div>
          <Link to="/restaurant/orders" className="btn btn-secondary btn-sm">
            View Kitchen Pipeline <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        {activeOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-bell-slash" style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}></i>
            <h4>No active orders in the kitchen queue</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>New customer orders placed for {activeRest.name} will appear right here instantly.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeOrders.map((o) => (
              <div
                key={o.id}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  background: 'var(--color-surface-card)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>Order #{o.id}</span>
                    <span className={`badge-status ${o.status}`} style={{ textTransform: 'capitalize' }}>
                      {o.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Customer: <strong>{o.customerName || 'Customer'}</strong> • {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '0.875rem' }}>
                    {(o.items || []).map((it, i) => (
                      <span key={i} style={{ marginRight: '10px', background: 'var(--color-surface)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--color-border)', fontWeight: 600 }}>
                        {it.quantity} × {it.name}
                      </span>
                    ))}
                  </div>
                  {o.instructions && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-warning)', marginTop: '6px' }}>
                      <i className="fa-regular fa-note-sticky"></i> Note: {o.instructions}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right', marginRight: '8px' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      ₹{o.billSummary?.grandTotal || o.total || 0}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{o.paymentMethod || 'UPI'}</div>
                  </div>

                  {o.status === 'placed' && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleUpdateStatus(o.id, 'preparing')}
                    >
                      <i className="fa-solid fa-check"></i> Accept & Prepare
                    </button>
                  )}

                  {o.status === 'preparing' && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ background: 'var(--color-success)', color: '#fff', border: 'none' }}
                      onClick={() => handleUpdateStatus(o.id, 'ready_for_pickup')}
                    >
                      <i className="fa-solid fa-box-check"></i> Ready for Pickup
                    </button>
                  )}

                  {o.status === 'ready_for_pickup' && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleUpdateStatus(o.id, 'out_for_delivery')}
                    >
                      <i className="fa-solid fa-motorcycle"></i> Handover to Rider
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RestaurantLayout>
  );
}
