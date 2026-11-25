import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function RestaurantLayout({ children, title, subtitle }) {
  const { theme, toggleTheme, logout, restaurants, activeManagedRestId, setActiveManagedRestId, orders, db } = useQuickBite();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeRest = restaurants.find((r) => r.id === activeManagedRestId) || restaurants[0] || {};
  const restOrders = orders.filter((o) => o.restaurantId === activeRest.id);
  const activeOrdersCount = restOrders.filter((o) => ['placed', 'accepted', 'preparing', 'ready_for_pickup'].includes(o.status)).length;
  const dishes = db.getDishesByRestaurant(activeRest.id);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleToggleOpen = () => {
    db.toggleRestaurantStatus(activeRest.id);
  };

  const navLinks = [
    { to: '/restaurant/dashboard', icon: 'fa-chart-pie', label: 'Overview' },
    { to: '/restaurant/orders', icon: 'fa-bell-concierge', label: 'Incoming Orders', badge: activeOrdersCount },
    { to: '/restaurant/menu', icon: 'fa-utensils', label: 'Menu Management', badge: dishes.length },
    { to: '/restaurant/analytics', icon: 'fa-chart-line', label: 'Sales & Analytics' }
  ];

  return (
    <div className="dash-layout">
      
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="dash-sidebar-overlay active"
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`dash-sidebar ${mobileOpen ? 'mobile-open' : ''}`} style={{ width: '270px' }}>
        <div className="sidebar-brand-box">
          <Link to="/restaurant/dashboard" className="brand-logo" style={{ fontSize: '1.35rem' }}>
            <div className="logo-icon-wrap" style={{ width: '36px', height: '36px', fontSize: '1rem' }}>
              <i className="fa-solid fa-burger"></i>
            </div>
            <div>Quick<span>Bite</span></div>
          </Link>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>PARTNER</span>
        </div>

        {/* Restaurant Profile Card */}
        <div className="sidebar-rest-card">
          <img
            src={activeRest.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=120&q=80'}
            alt={activeRest.name}
            className="sidebar-rest-thumb"
          />
          <div style={{ minWidth: 0 }}>
            <div className="sidebar-rest-name" style={{ fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {activeRest.name || 'Kitchen Partner'}
            </div>
            <div style={{ fontSize: '0.75rem', color: activeRest.status !== 'closed' ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 600 }}>
              <i className="fa-solid fa-circle" style={{ fontSize: '0.55rem' }}></i> {activeRest.status !== 'closed' ? 'Accepting Orders' : 'Kitchen Closed'}
            </div>
          </div>
        </div>

        {/* Navigation */}
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
                  <span className="sidebar-badge-count">{link.badge}</span>
                )}
              </Link>
            );
          })}

          <div style={{ borderTop: '1px solid var(--color-border-subtle)', margin: '12px 0' }}></div>

          {/* Switch Managed Restaurant Selector */}
          <div style={{ padding: '0 8px', marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Switch Kitchen Outlet:
            </label>
            <select
              value={activeManagedRestId}
              onChange={(e) => setActiveManagedRestId(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', background: 'var(--color-surface-card)', color: 'var(--color-text-main)' }}
            >
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <Link to={`/customer/menu?id=${activeRest.id}`} className="sidebar-nav-link" target="_blank">
            <i className="fa-solid fa-arrow-up-right-from-square"></i> View Public Menu
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="btn btn-secondary btn-sm" style={{ width: '100%', color: 'var(--color-danger)' }} onClick={handleSignOut}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="dash-main">
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
              <h1 className="topbar-title">{title || 'Kitchen Master Control'}</h1>
              {subtitle && <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{subtitle}</p>}
            </div>
          </div>

          <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className={`badge ${activeRest.status !== 'closed' ? 'badge-success' : 'badge-danger'}`}
              style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.8rem', border: 'none' }}
              onClick={handleToggleOpen}
              title="Click to toggle Kitchen Status"
            >
              <i className="fa-solid fa-power-off" style={{ marginRight: '6px' }}></i>
              {activeRest.status !== 'closed' ? 'Open & Receiving' : 'Kitchen Closed'}
            </button>

            <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
              <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
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
