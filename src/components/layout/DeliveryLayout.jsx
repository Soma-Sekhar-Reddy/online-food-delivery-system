import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function DeliveryLayout({ children, title, subtitle }) {
  const { theme, toggleTheme, logout, currentUser, setCurrentUser, db } = useQuickBite();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const drivers = db.getDeliveryPartners();
  const activeDriver = drivers.find((d) => d.id === currentUser?.id) || drivers[0] || {};

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleToggleDuty = () => {
    const nextStatus = activeDriver.status === 'offline' ? 'active' : 'offline';
    activeDriver.status = nextStatus;
    db.saveUser(activeDriver);
    setCurrentUser({ ...activeDriver });
    db.showToast(`Duty status set to ${nextStatus.toUpperCase()}`, 'info');
  };

  const handleSwitchDriver = (driverId) => {
    const target = drivers.find((d) => d.id === driverId);
    if (target) {
      db.setCurrentUser(target);
      setCurrentUser(target);
      db.showToast(`Switched active rider to ${target.name}`, 'success');
    }
  };

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
          <Link to="/delivery/dashboard" className="brand-logo" style={{ fontSize: '1.35rem' }}>
            <div className="logo-icon-wrap" style={{ width: '36px', height: '36px', fontSize: '1rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
              <i className="fa-solid fa-motorcycle"></i>
            </div>
            <div>Quick<span>Fleet</span></div>
          </Link>
          <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>RIDER</span>
        </div>

        {/* Driver Profile Box */}
        <div className="sidebar-rest-card">
          <img
            src={activeDriver.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
            alt={activeDriver.name}
            className="sidebar-rest-thumb"
            style={{ borderRadius: '50%' }}
          />
          <div style={{ minWidth: 0 }}>
            <div className="sidebar-rest-name" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
              {activeDriver.name || 'Fleet Rider'}
            </div>
            <div style={{ fontSize: '0.75rem', color: activeDriver.status === 'offline' ? 'var(--color-danger)' : 'var(--color-success)', fontWeight: 600 }}>
              <i className="fa-solid fa-circle" style={{ fontSize: '0.55rem' }}></i> {activeDriver.status === 'offline' ? 'Off Duty' : 'On Duty (Active)'}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav-list">
          <Link to="/delivery/dashboard" className={`sidebar-nav-link ${location.pathname === '/delivery/dashboard' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-route"></i> Live Delivery Run
          </Link>
          <Link to="/delivery/deliveries" className={`sidebar-nav-link ${location.pathname === '/delivery/deliveries' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-list-check"></i> Trips & Payouts Log
          </Link>

          <div style={{ borderTop: '1px solid var(--color-border-subtle)', margin: '12px 0' }}></div>

          {/* Switch Active Driver */}
          <div style={{ padding: '0 8px', marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Switch Fleet Rider:
            </label>
            <select
              value={activeDriver.id}
              onChange={(e) => handleSwitchDriver(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', background: 'var(--color-surface-card)', color: 'var(--color-text-main)' }}
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.vehicle})</option>
              ))}
            </select>
          </div>

          <Link to="/customer/restaurants" className="sidebar-nav-link">
            <i className="fa-solid fa-utensils"></i> Open Food Portal
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
            <button className="admin-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Navigation">
              <i className="fa-solid fa-bars"></i>
            </button>
            <div>
              <h1 className="topbar-title">{title || 'Delivery Rider Command'}</h1>
              {subtitle && <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{subtitle}</p>}
            </div>
          </div>

          <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className={`badge ${activeDriver.status !== 'offline' ? 'badge-success' : 'badge-danger'}`}
              style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.8rem', border: 'none' }}
              onClick={handleToggleDuty}
              title="Click to toggle Duty"
            >
              <i className="fa-solid fa-power-off" style={{ marginRight: '6px' }}></i>
              {activeDriver.status !== 'offline' ? 'On Duty' : 'Go Online'}
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
