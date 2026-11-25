import React, { useMemo, useState } from 'react';
import DeliveryLayout from '../../components/layout/DeliveryLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function DeliveriesPage() {
  const { orders, restaurants, currentUser, showToast } = useQuickBite();
  const [filter, setFilter] = useState('all');

  const completedTrips = useMemo(() => {
    return orders.filter(
      (o) => o.status === 'delivered' && (o.deliveryPartnerId === currentUser?.id || !o.deliveryPartnerId)
    );
  }, [orders, currentUser]);

  const totalEarnings = completedTrips.length * 65 + 120;

  const handleRequestPayout = () => {
    showToast('Withdrawal request of ₹14,250 submitted! Crediting to your HDFC Bank account.', 'success', 3500);
  };

  const getRest = (restId) => {
    return restaurants.find((r) => r.id === restId) || {};
  };

  return (
    <DeliveryLayout title="Deliveries & Earnings Ledger" subtitle="Detailed breakdown of your completed delivery runs and wallet payouts">
      {/* Wallet Summary Card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Withdrawable Wallet Balance</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-success)', marginTop: '4px' }}>₹14,250</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                <i className="fa-solid fa-building-columns"></i> Primary Account: HDFC Bank •••• 4402
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRequestPayout}
              style={{ fontWeight: 800, padding: '12px 20px' }}
            >
              <i className="fa-solid fa-money-bill-transfer"></i> Request Instant Payout
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Lifetime Completed</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{completedTrips.length + 42} Trips</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Customer Tips</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>+₹1,840</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Avg. Delivery Speed</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>24 Mins</div>
            </div>
          </div>
        </div>

        {/* Incentive Tier Card */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(245,158,11,0.1)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fa-solid fa-medal"></i>
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Gold Tier Fleet Partner</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Peak hour +₹20 extra bonus unlocked</p>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
            Complete 3 more delivery trips today to achieve the weekend booster bonus (+₹350 cash credit).
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: 'var(--color-warning)' }}></div>
          </div>
        </div>
      </div>

      {/* Trips Table Card */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '18px' }}>Completed Delivery Trips</h3>

        {completedTrips.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-route" style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}></i>
            <p>No completed trips logged today yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '12px' }}>Order ID</th>
                  <th style={{ padding: '12px' }}>Restaurant</th>
                  <th style={{ padding: '12px' }}>Delivery Address</th>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Payout</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedTrips.map((t) => {
                  const r = getRest(t.restaurantId);
                  return (
                    <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>#{t.id}</td>
                      <td style={{ padding: '12px' }}>{r.name || 'QuickBite Partner'}</td>
                      <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{t.deliveryAddress || 'Hyderabad'}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{t.customerName || 'Customer'}</td>
                      <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-success)' }}>+₹65.00</td>
                      <td style={{ padding: '12px' }}>
                        <span className="badge badge-success" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--color-success)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                          Delivered
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DeliveryLayout>
  );
}
