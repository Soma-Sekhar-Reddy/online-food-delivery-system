import React, { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import AdminLayout from '../../components/layout/AdminLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function AdminDashboard() {
  const { db, orders, restaurants, showToast } = useQuickBite();

  const stats = useMemo(() => {
    return db.getAdminStats();
  }, [db, orders, restaurants]);

  const pendingRestaurants = useMemo(() => {
    return restaurants.filter((r) => r.status === 'pending');
  }, [restaurants]);

  const recentOrders = useMemo(() => {
    return [...orders].reverse().slice(0, 8);
  }, [orders]);

  const transactions = useMemo(() => {
    return db.getTransactions().slice(0, 6);
  }, [db, orders]);

  // Chart Canvas Refs
  const ordersChartRef = useRef(null);
  const statusChartRef = useRef(null);

  useEffect(() => {
    let ordersChart = null;
    let statusChart = null;

    if (ordersChartRef.current) {
      ordersChart = new Chart(ordersChartRef.current, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Platform Revenue (₹)',
              data: [
                Math.round(stats.totalRevenue * 0.12),
                Math.round(stats.totalRevenue * 0.15),
                Math.round(stats.totalRevenue * 0.1),
                Math.round(stats.totalRevenue * 0.18),
                Math.round(stats.totalRevenue * 0.22),
                Math.round(stats.totalRevenue * 0.25),
                Math.round(stats.totalRevenue * 0.16)
              ],
              borderColor: '#FF6B35',
              backgroundColor: 'rgba(255, 107, 53, 0.12)',
              fill: true,
              tension: 0.35,
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }

    if (statusChartRef.current) {
      const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
      const activeCount = orders.filter((o) => ['placed', 'preparing', 'ready', 'ready_for_pickup', 'out_for_delivery'].includes(o.status)).length;
      const cancelledCount = orders.filter((o) => o.status === 'cancelled').length;

      statusChart = new Chart(statusChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Delivered', 'In Transit / Kitchen', 'Cancelled'],
          datasets: [
            {
              data: [deliveredCount || 1, activeCount || 1, cancelledCount || 0],
              backgroundColor: ['#10B981', '#3B82F6', '#EF4444'],
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }

    return () => {
      if (ordersChart) ordersChart.destroy();
      if (statusChart) statusChart.destroy();
    };
  }, [stats, orders]);

  const handleApproveRest = (restId, name) => {
    db.approveRestaurant(restId);
    showToast(`Approved restaurant: ${name}`, 'success');
  };

  const getRestName = (restId) => {
    const r = restaurants.find((item) => item.id === restId);
    return r ? r.name : 'QuickBite Kitchen';
  };

  return (
    <AdminLayout title="Platform Master Overview" subtitle="Real-time multi-tenant monitoring across customers, dining outlets, riders, and financial transactions">
      {/* 5 Core Platform Metrics */}
      <div className="admin-metrics-5">
        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <h4>Total Revenue (GMV)</h4>
            <div className="admin-kpi-val">₹{stats.totalRevenue}</div>
            <div className="admin-kpi-sub up">
              <i className="fa-solid fa-wallet"></i> Platform 15%: <strong>₹{stats.platformCut}</strong>
            </div>
          </div>
          <div className="admin-kpi-icon icon-orange">
            <i className="fa-solid fa-indian-rupee-sign"></i>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <h4>Total Orders</h4>
            <div className="admin-kpi-val">{stats.totalOrders}</div>
            <div className="admin-kpi-sub up">
              <i className="fa-solid fa-box-check"></i> <span>{stats.deliveredOrders} Delivered</span>
            </div>
          </div>
          <div className="admin-kpi-icon icon-green">
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <h4>Total Customers</h4>
            <div className="admin-kpi-val">{stats.totalCustomers}</div>
            <div className="admin-kpi-sub up">
              <i className="fa-solid fa-user-check"></i> <span>{stats.activeCustomers} Active</span>
            </div>
          </div>
          <div className="admin-kpi-icon icon-blue">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <h4>Total Restaurants</h4>
            <div className="admin-kpi-val">{stats.totalRestaurants}</div>
            <div className="admin-kpi-sub">
              <i className="fa-solid fa-clock"></i> <span>{stats.pendingRestaurants} Pending</span>
            </div>
          </div>
          <div className="admin-kpi-icon icon-purple">
            <i className="fa-solid fa-store"></i>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <h4>Delivery Partners</h4>
            <div className="admin-kpi-val">{stats.totalDrivers}</div>
            <div className="admin-kpi-sub up">
              <i className="fa-solid fa-motorcycle"></i> <span>{stats.activeDrivers} On Duty</span>
            </div>
          </div>
          <div className="admin-kpi-icon icon-amber">
            <i className="fa-solid fa-person-biking"></i>
          </div>
        </div>
      </div>

      {/* Pending Approvals Alert Banner */}
      {pendingRestaurants.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', border: '1.5px solid #F59E0B', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#F59E0B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fa-solid fa-bell"></i>
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#92400E' }}>
                {pendingRestaurants.length} Restaurant Applications Pending Review
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#B45309', marginTop: '2px' }}>
                Kitchen partners have submitted their onboarding verification request.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/admin/restaurants?filter=pending" className="btn btn-primary btn-sm" style={{ background: '#D97706', borderColor: '#D97706' }}>
              <i className="fa-solid fa-stamp"></i> Review Pending Outlets
            </Link>
          </div>
        </div>
      )}

      {/* 2 Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Platform GMV Trajectory</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>7-day revenue performance</span>
          </div>
          <div style={{ position: 'relative', height: '260px' }}>
            <canvas ref={ordersChartRef}></canvas>
          </div>
        </div>

        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Order Fulfillment</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Active vs Delivered</span>
          </div>
          <div style={{ position: 'relative', height: '260px' }}>
            <canvas ref={statusChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Live Orders Stream & Transaction Monitoring Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px' }}>
        {/* Live Orders Stream */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Live Order Stream</h3>
            <Link to="/admin/orders" className="btn btn-secondary btn-sm" style={{ fontSize: '0.8rem' }}>
              View All Orders ({orders.length}) <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '10px' }}>Order ID</th>
                  <th style={{ padding: '10px' }}>Customer</th>
                  <th style={{ padding: '10px' }}>Restaurant</th>
                  <th style={{ padding: '10px' }}>Amount</th>
                  <th style={{ padding: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px', fontWeight: 700 }}>#{o.id}</td>
                    <td style={{ padding: '10px' }}>{o.customerName || 'Customer'}</td>
                    <td style={{ padding: '10px', color: 'var(--color-text-muted)' }}>{getRestName(o.restaurantId)}</td>
                    <td style={{ padding: '10px', fontWeight: 800 }}>₹{o.billSummary?.grandTotal || o.total || 0}</td>
                    <td style={{ padding: '10px' }}>
                      <span className={`badge-status ${o.status}`} style={{ textTransform: 'capitalize', fontSize: '0.75rem', padding: '3px 8px' }}>
                        {o.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transactions Monitoring */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Recent Transactions</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 700 }}>
              <i className="fa-solid fa-circle-check"></i> Escrow Secure
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {transactions.map((tx) => (
              <div
                key={tx.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-surface-card)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{tx.id}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Order #{tx.orderId} • {tx.method}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-success)' }}>+₹{tx.amount}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{tx.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
