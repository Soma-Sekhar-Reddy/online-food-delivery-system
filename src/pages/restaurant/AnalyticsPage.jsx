import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';
import RestaurantLayout from '../../components/layout/RestaurantLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function RestaurantAnalytics() {
  const { orders, restaurants, activeManagedRestId, db } = useQuickBite();

  const activeRest = restaurants.find((r) => r.id === activeManagedRestId) || restaurants[0] || {};
  const restOrders = useMemo(() => {
    return orders.filter((o) => o.restaurantId === activeRest.id);
  }, [orders, activeRest]);

  const dishes = useMemo(() => {
    return db.getDishesByRestaurant(activeRest.id);
  }, [activeRest, db]);

  const grossSales = useMemo(() => {
    return restOrders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.billSummary?.grandTotal || o.total || 0), 0);
  }, [restOrders]);

  const commission = Math.round(grossSales * 0.15);
  const netEarnings = grossSales - commission;
  const avgOrderValue = restOrders.length > 0 ? Math.round(grossSales / restOrders.length) : 0;

  // Chart Canvas Refs
  const salesChartRef = useRef(null);
  const categoryChartRef = useRef(null);

  useEffect(() => {
    let salesChartInstance = null;
    let catChartInstance = null;

    if (salesChartRef.current) {
      salesChartInstance = new Chart(salesChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Daily Revenue (₹)',
              data: [
                Math.round(grossSales * 0.1),
                Math.round(grossSales * 0.12),
                Math.round(grossSales * 0.14),
                Math.round(grossSales * 0.11),
                Math.round(grossSales * 0.18),
                Math.round(grossSales * 0.22),
                Math.round(grossSales * 0.13)
              ],
              backgroundColor: '#FF6B35',
              borderRadius: 6
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

    if (categoryChartRef.current) {
      catChartInstance = new Chart(categoryChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Biryani', 'Starters', 'Main Course', 'Desserts & Drinks'],
          datasets: [
            {
              data: [45, 25, 20, 10],
              backgroundColor: ['#FF6B35', '#2EC4B6', '#3B82F6', '#F59E0B']
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
      if (salesChartInstance) salesChartInstance.destroy();
      if (catChartInstance) catChartInstance.destroy();
    };
  }, [grossSales]);

  return (
    <RestaurantLayout title="Sales & Performance Analytics" subtitle={`Financial performance and order analytics for ${activeRest.name}`}>
      {/* 4 Financial KPI Cards */}
      <div className="metrics-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Gross Revenue</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹{grossSales}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>From {restOrders.length} orders</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Platform Commission (15%)</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-danger)' }}>-₹{commission}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Tech & Fleet Support</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Net Take-Home Payout</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-success)' }}>₹{netEarnings}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>Ready for Bank Settlement</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Avg. Basket Value (AOV)</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#3b82f6' }}>₹{avgOrderValue}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Per completed order</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>Weekly Sales Breakdown</h3>
          <div style={{ position: 'relative', height: '260px' }}>
            <canvas ref={salesChartRef}></canvas>
          </div>
        </div>

        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>Category Share</h3>
          <div style={{ position: 'relative', height: '260px' }}>
            <canvas ref={categoryChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Top Dishes Table */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px' }}>Catalog Dishes Performance</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '12px' }}>Dish Name</th>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Price</th>
                <th style={{ padding: '12px' }}>Diet</th>
                <th style={{ padding: '12px' }}>Stock Status</th>
              </tr>
            </thead>
            <tbody>
              {dishes.slice(0, 6).map((d) => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{d.name}</td>
                  <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{d.category}</td>
                  <td style={{ padding: '12px', fontWeight: 800 }}>₹{d.price}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`badge-diet ${d.isVeg ? 'veg' : 'non-veg'}`}></span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ color: d.isAvailable !== false ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 700 }}>
                      {d.isAvailable !== false ? '● In Stock' : '○ Sold Out'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RestaurantLayout>
  );
}
