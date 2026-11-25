import React, { useMemo } from 'react';
import DeliveryLayout from '../../components/layout/DeliveryLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function DeliveryDashboard() {
  const { orders, restaurants, currentUser, db, showToast } = useQuickBite();

  // Find active delivery assigned or currently out for delivery
  const activeDelivery = useMemo(() => {
    return orders.find(
      (o) =>
        o.deliveryPartnerId === currentUser?.id ||
        (o.status === 'out_for_delivery' && (!o.deliveryPartnerId || o.deliveryPartnerId === currentUser?.id))
    );
  }, [orders, currentUser]);

  // Available orders for pickup
  const availableOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        ['ready_for_pickup', 'ready', 'preparing'].includes(o.status) &&
        !o.deliveryPartnerId &&
        o.status !== 'cancelled'
    );
  }, [orders]);

  const completedTrips = useMemo(() => {
    return orders.filter(
      (o) => o.status === 'delivered' && (o.deliveryPartnerId === currentUser?.id || !o.deliveryPartnerId)
    );
  }, [orders, currentUser]);

  const todayEarnings = completedTrips.length * 65 + 120; // ₹65 per delivery + tips

  const getRest = (restId) => {
    return restaurants.find((r) => r.id === restId) || {};
  };

  const handleAcceptDelivery = (orderId) => {
    db.assignDeliveryPartner(orderId, currentUser?.id || 'usr-rider-1');
    db.updateOrderStatus(orderId, 'out_for_delivery');
    showToast(`Accepted Delivery #${orderId}! Navigate to restaurant for pickup.`, 'success', 3500);
  };

  const handleMarkDelivered = (orderId) => {
    db.updateOrderStatus(orderId, 'delivered');
    showToast(`Order #${orderId} delivered! +₹65 credited to your wallet.`, 'success', 3500);
  };

  return (
    <DeliveryLayout title="Rider Control Hub" subtitle="Active delivery dispatch and real-time route execution">
      {/* Duty Banner */}
      <div style={{ padding: '14px 20px', borderRadius: 'var(--radius-md)', background: 'var(--color-success-bg, rgba(16,185,129,0.1))', border: '1px solid var(--color-success)', color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-motorcycle" style={{ fontSize: '1.2rem' }}></i>
          <span>GPS Active & Visible. Receiving real-time delivery requests in your zone.</span>
        </div>
        <span className="badge badge-success" style={{ background: 'var(--color-success)', color: '#fff', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
          Duty: ONLINE
        </span>
      </div>

      {/* 4 Metrics Cards */}
      <div className="metrics-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Today's Earnings</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-success)' }}>₹{todayEarnings}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>
            <i className="fa-solid fa-arrow-trend-up"></i> Includes ₹120 tips
          </div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Completed Trips</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>{completedTrips.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-success)' }}></i> 100% on-time
          </div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Wallet Balance</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#3b82f6' }}>₹14,250</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Instant bank transfer ready</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Rider Service Rating</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-warning)' }}>★ 4.9</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Top Fleet Tier</div>
        </div>
      </div>

      {/* Active Ongoing Delivery Card (Hero Card) */}
      {activeDelivery && (
        <div style={{ background: 'var(--color-surface)', border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '28px', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: 'var(--color-primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>
                Active Trip in Progress
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Order #{activeDelivery.id}</h3>
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-success)' }}>
              Payout: +₹65
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--color-surface-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                <i className="fa-solid fa-store"></i> Pickup Location
              </div>
              <div style={{ fontWeight: 800, fontSize: '1rem', marginTop: '4px' }}>{getRest(activeDelivery.restaurantId).name || 'Partner Outlet'}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{getRest(activeDelivery.restaurantId).location || 'Banjara Hills, Hyderabad'}</div>
            </div>

            <div style={{ background: 'var(--color-surface-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 700, textTransform: 'uppercase' }}>
                <i className="fa-solid fa-house"></i> Customer Delivery Address
              </div>
              <div style={{ fontWeight: 800, fontSize: '1rem', marginTop: '4px' }}>{activeDelivery.customerName || 'Customer'}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{activeDelivery.deliveryAddress || 'Rd No 12, Hyderabad'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Items: </strong>
              {(activeDelivery.items || []).map((i) => `${i.quantity}x ${i.name}`).join(', ')}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {activeDelivery.status !== 'delivered' && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleMarkDelivered(activeDelivery.id)}
                  style={{ fontWeight: 800, padding: '10px 22px' }}
                >
                  <i className="fa-solid fa-circle-check"></i> Complete & Mark Delivered
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Available Requests Pool */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Available Delivery Pool</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>Nearby orders ready for rider pickup and delivery</p>
          </div>
          <span className="badge badge-primary" style={{ background: 'var(--color-primary-light, rgba(255,107,53,0.1))', color: 'var(--color-primary)', fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
            {availableOrders.length} Requests Open
          </span>
        </div>

        {availableOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-radar" style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.6 }}></i>
            <h4>All nearby orders are currently dispatched</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>New order requests will ping here the moment restaurants mark food ready.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
            {availableOrders.map((o) => {
              const r = getRest(o.restaurantId);
              return (
                <div
                  key={o.id}
                  style={{
                    background: 'var(--color-surface-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Order #{o.id}</span>
                      <span style={{ fontWeight: 800, color: 'var(--color-success)', fontSize: '0.95rem' }}>+₹65 Fee</span>
                    </div>

                    <div style={{ fontSize: '0.85rem', marginBottom: '6px' }}>
                      <i className="fa-solid fa-store" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i>
                      <strong>{r.name || 'Restaurant'}</strong>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                      <i className="fa-solid fa-location-dot" style={{ marginRight: '6px' }}></i>
                      {o.deliveryAddress || 'Jubilee Hills, Hyderabad'}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '8px' }}>
                      {(o.items || []).length} items • ₹{o.billSummary?.grandTotal || o.total || 0}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAcceptDelivery(o.id)}
                    style={{ width: '100%', marginTop: '14px', fontWeight: 700 }}
                  >
                    <i className="fa-solid fa-plus"></i> Accept Delivery
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DeliveryLayout>
  );
}
