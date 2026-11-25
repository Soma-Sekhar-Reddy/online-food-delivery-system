import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';
import AdminLayout from '../../components/layout/AdminLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function AdminAnalytics() {
  const { db, orders, restaurants } = useQuickBite();

  const stats = useMemo(() => {
    return db.getAdminStats();
  }, [db, orders, restaurants]);

  const platformCut = Math.round(stats.totalRevenue * 0.15);
  const restaurantPayout = stats.totalRevenue - platformCut;
  const riderPayout = stats.deliveredOrders * 65;

  // Chart Canvas Refs
  const gmvChartRef = useRef(null);
  const statusChartRef = useRef(null);
  const topRestChartRef = useRef(null);
  const peakHoursChartRef = useRef(null);
  const paymentChartRef = useRef(null);
  const cuisineChartRef = useRef(null);

  useEffect(() => {
    const instances = [];

    // Chart 1: Revenue Trajectory
    if (gmvChartRef.current) {
      instances.push(
        new Chart(gmvChartRef.current, {
          type: 'line',
          data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [
              {
                label: 'Gross GMV (₹)',
                data: [1200, 2400, 1800, 3900, 5200, 6800, stats.totalRevenue || 7500],
                borderColor: '#FF6B35',
                backgroundColor: 'rgba(255, 107, 53, 0.15)',
                fill: true,
                tension: 0.35,
                borderWidth: 3
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
          }
        })
      );
    }

    // Chart 2: Order Status
    if (statusChartRef.current) {
      const del = orders.filter((o) => o.status === 'delivered').length;
      const act = orders.filter((o) => ['placed', 'preparing', 'ready', 'ready_for_pickup', 'out_for_delivery'].includes(o.status)).length;
      const can = orders.filter((o) => o.status === 'cancelled').length;

      instances.push(
        new Chart(statusChartRef.current, {
          type: 'doughnut',
          data: {
            labels: ['Delivered', 'In Progress', 'Cancelled'],
            datasets: [
              {
                data: [del || 1, act || 1, can || 0],
                backgroundColor: ['#10B981', '#3B82F6', '#EF4444']
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
          }
        })
      );
    }

    // Chart 3: Top Restaurants
    if (topRestChartRef.current) {
      const topNames = restaurants.slice(0, 5).map((r) => r.name);
      instances.push(
        new Chart(topRestChartRef.current, {
          type: 'bar',
          data: {
            labels: topNames.length > 0 ? topNames : ['Bawarchi', 'Paradise', 'Pista House'],
            datasets: [
              {
                label: 'Order Volume',
                data: [42, 38, 29, 21, 17],
                backgroundColor: '#2EC4B6',
                borderRadius: 4
              }
            ]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        })
      );
    }

    // Chart 4: Peak Hours
    if (peakHoursChartRef.current) {
      instances.push(
        new Chart(peakHoursChartRef.current, {
          type: 'line',
          data: {
            labels: ['11 AM', '1 PM', '3 PM', '6 PM', '8 PM', '10 PM', '12 AM'],
            datasets: [
              {
                label: 'Live Orders Count',
                data: [12, 58, 22, 35, 84, 62, 19],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                borderWidth: 2.5
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        })
      );
    }

    // Chart 5: Payment Methods
    if (paymentChartRef.current) {
      instances.push(
        new Chart(paymentChartRef.current, {
          type: 'pie',
          data: {
            labels: ['UPI (GPay/PhonePe)', 'Cards (Debit/Credit)', 'Cash on Delivery'],
            datasets: [
              {
                data: [65, 25, 10],
                backgroundColor: ['#10B981', '#3B82F6', '#F59E0B']
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
          }
        })
      );
    }

    // Chart 6: Cuisine Popularity
    if (cuisineChartRef.current) {
      instances.push(
        new Chart(cuisineChartRef.current, {
          type: 'bar',
          data: {
            labels: ['Biryani', 'Burgers', 'North Indian', 'Pizza', 'Desserts', 'South Indian'],
            datasets: [
              {
                label: 'Share %',
                data: [38, 22, 18, 12, 6, 4],
                backgroundColor: ['#FF6B35', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899'],
                borderRadius: 4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        })
      );
    }

    return () => {
      instances.forEach((inst) => inst.destroy());
    };
  }, [stats, orders, restaurants]);

  return (
    <AdminLayout title="Enterprise Intelligence & Charts" subtitle="Deep data analytics, hourly volume patterns, and financial platform ledger">
      {/* 4 Financial Commission Cards */}
      <div className="metrics-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Total Platform GMV</h4>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹{stats.totalRevenue}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Across all dining partners</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Platform Commission (15%)</h4>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-success)' }}>+₹{platformCut}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>QuickBite Net Revenue</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Restaurant Payouts (85%)</h4>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#3b82f6' }}>₹{restaurantPayout}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Payable to kitchen partners</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Fleet Delivery Earnings</h4>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-warning)' }}>₹{riderPayout}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Disbursed to rider partners</div>
        </div>
      </div>

      {/* 6 Charts Grid (3 rows x 2 columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        
        {/* Chart 1: Revenue */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>1. Platform GMV Trajectory</h3>
          <div style={{ position: 'relative', height: '250px' }}>
            <canvas ref={gmvChartRef}></canvas>
          </div>
        </div>

        {/* Chart 2: Order Status */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>2. Order Status Breakdown</h3>
          <div style={{ position: 'relative', height: '250px' }}>
            <canvas ref={statusChartRef}></canvas>
          </div>
        </div>

        {/* Chart 3: Top Kitchens */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>3. Top Volume Kitchens</h3>
          <div style={{ position: 'relative', height: '250px' }}>
            <canvas ref={topRestChartRef}></canvas>
          </div>
        </div>

        {/* Chart 4: Peak Hours */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>4. Peak Hourly Ordering Rush</h3>
          <div style={{ position: 'relative', height: '250px' }}>
            <canvas ref={peakHoursChartRef}></canvas>
          </div>
        </div>

        {/* Chart 5: Payment Gateway */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>5. Payment Method Split</h3>
          <div style={{ position: 'relative', height: '250px' }}>
            <canvas ref={paymentChartRef}></canvas>
          </div>
        </div>

        {/* Chart 6: Cuisine Popularity */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>6. Cuisine Popularity Share</h3>
          <div style={{ position: 'relative', height: '250px' }}>
            <canvas ref={cuisineChartRef}></canvas>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
