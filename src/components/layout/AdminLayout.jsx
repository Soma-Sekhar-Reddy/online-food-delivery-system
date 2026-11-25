import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function AdminLayout({ children, title, subtitle }) {
  const { theme, toggleTheme, logout, db, showConfirmModal } = useQuickBite();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const stats = db.getAdminStats();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const resetDatabase = async () => {
    const confirmed = await showConfirmModal({
      title: 'Reset Demo Database?',
      message: 'Reset QuickBite temporary session database to original fresh demo state?\nThis will restore all customers, restaurants, delivery fleet, and orders.',
      confirmText: 'Reset Database',
      cancelText: 'Keep Current Data',
      type: 'warning'
    });
    if (confirmed) {
      db.clear();
      db.showToast("Database successfully re-seeded with demo records!", "success");
      setTimeout(() => window.location.reload(), 700);
    }
  };

  const navLinks = [
    { to: '/admin/dashboard', icon: 'fa-chart-pie', label: 'Platform Overview' },
    { to: '/admin/customers', icon: 'fa-users', label: 'Customers', badge: stats.totalCustomers },
    { to: '/admin/restaurants', icon: 'fa-store', label: 'Restaurants', badge: stats.totalRestaurants },
    { to: '/admin/orders', icon: 'fa-receipt', label: 'Orders & Dispatch', badge: stats.totalOrders },
    { to: '/admin/delivery', icon: 'fa-motorcycle', label: 'Delivery Fleet', badge: stats.totalDrivers },
    { to: '/admin/analytics', icon: 'fa-chart-line', label: 'Analytics & Charts' }
  ];

  return (
    <div className="dash-layout">
      
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="dash-sidebar-overlay active"
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
        ></div>
      )}

      {/* Admin Sidebar */}
      <aside className={`dash-sidebar ${mobileOpen ? 'mobile-open' : ''}`} style={{ width: '280px' }}>
        <div className="sidebar-brand-box">
          <Link to="/admin/dashboard" className="brand-logo" style={{ fontSize: '1.35rem' }}>
            <div className="logo-icon-wrap" style={{ width: '36px', height: '36px', fontSize: '1rem', background: 'linear-gradient(135deg, #17202A 0%, #2C3E50 100%)' }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>Quick<span>Admin</span></div>
          </Link>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem', background: 'var(--color-navy)', color: '#FFFFFF' }}>SUPER ADMIN</span>
        </div>

        {/* Profile Card */}
        <div className="sidebar-rest-card">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Admin Anita" className="sidebar-rest-thumb" />
          <div style={{ minWidth: 0 }}>
            <div className="sidebar-rest-name">Anita Desai</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>
              <i className="fa-solid fa-circle" style={{ fontSize: '0.55rem' }}></i> System Controller
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav-list">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <i className={`fa-solid ${link.icon}`}></i> {link.label}
                {link.badge !== undefined && (
                  <span className="admin-badge-count">{link.badge}</span>
                )}
              </Link>
            );
          })}

          <div style={{ borderTop: '1px solid var(--color-border-subtle)', margin: '12px 0' }}></div>

          <div style={{ padding: '0 16px', fontSize: '0.725rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Jump To Portals:
          </div>
          <Link to="/customer/restaurants" className="sidebar-nav-link">
            <i className="fa-solid fa-utensils"></i> Customer Food Portal
          </Link>
          <Link to="/restaurant/dashboard" className="sidebar-nav-link">
            <i className="fa-solid fa-shop"></i> Restaurant Kitchen Hub
          </Link>
          <Link to="/delivery/dashboard" className="sidebar-nav-link">
            <i className="fa-solid fa-route"></i> Delivery Rider Fleet
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="btn btn-secondary btn-sm" style={{ width: '100%', color: 'var(--color-danger)' }} onClick={handleSignOut}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dash-main">
        
        {/* Topbar */}
        <header className="dash-topbar">
          <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              className="admin-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div>
              <h1 className="topbar-title">{title || 'Platform Super Console'}</h1>
              {subtitle && (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="topbar-right admin-topbar-actions">
            <span className="badge badge-success" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              <i className="fa-solid fa-clock-rotate-left"></i> Temporary Session Active
            </span>

            <button className="btn-icon" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
              <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
            </button>

            <button className="btn btn-secondary btn-sm" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }} onClick={resetDatabase}>
              <i className="fa-solid fa-rotate"></i> Reset DB
            </button>
          </div>
        </header>

        <div className="dash-body">
          {children}
        </div>

      </main>
    </div>
  );
}
