import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';
import CitySelectorModal from '../common/CitySelectorModal.jsx';

export default function Navbar() {
  const { currentUser, theme, toggleTheme, cartSummary, setIsCartOpen, logout, openFacultyModal, deliveryCity, setDeliveryCity, deliveryCities = [] } = useQuickBite();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userMenuRef = useRef(null);
  const portalsRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (portalsRef.current && !portalsRef.current.contains(event.target)) {
        setPortalsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="container nav-container">
        
        {/* Left: Brand Logo & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link to="/" className="brand-logo" aria-label="QuickBite Home">
            <div className="logo-icon-wrap">
              <i className="fa-solid fa-burger"></i>
            </div>
            <div className="brand-text">Quick<span>Bite</span></div>
          </Link>

          {/* Location Selector Pill */}
          <div
            className="location-picker"
            title="Click to select your delivery city & locality"
            onClick={() => setIsCityModalOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-primary)' }}></i>
            <div>
              <span className="loc-tag">Delivering to </span>
              <span className="loc-text" style={{ color: 'var(--color-text-main)', fontWeight: 800, fontSize: '0.85rem' }}>
                {deliveryCity?.name || 'Hyderabad'}
              </span>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-primary)', fontWeight: 600, lineHeight: 1.1 }}>
                {deliveryCity?.defaultArea?.split(',')[0] || 'Banjara Hills'}
              </div>
            </div>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--color-text-subtle)' }}></i>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="nav-links-desktop">
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: '0.92rem',
              color: isActive('/') ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'color var(--transition-fast)'
            }}
          >
            Home
          </Link>
          <Link
            to="/customer/restaurants"
            style={{
              fontWeight: 600,
              fontSize: '0.92rem',
              color: isActive('/customer/restaurants') ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'color var(--transition-fast)'
            }}
          >
            Restaurants
          </Link>
          <Link
            to="/customer/orders"
            style={{
              fontWeight: 600,
              fontSize: '0.92rem',
              color: isActive('/customer/orders') ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'color var(--transition-fast)'
            }}
          >
            My Orders
          </Link>

          {/* Portals Dropdown */}
          <div ref={portalsRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setPortalsOpen(!portalsOpen)}
              style={{
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.92rem',
                color: 'var(--color-text-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Portals <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--color-text-subtle)', transform: portalsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}></i>
            </button>

            {portalsOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 14px)',
                right: 0,
                width: '230px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '8px',
                zIndex: 150
              }}>
                <Link
                  to="/restaurant/dashboard"
                  onClick={() => setPortalsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-border-subtle)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <i className="fa-solid fa-shop" style={{ color: 'var(--color-primary)', width: '16px' }}></i>
                  <div>
                    <div>Restaurant Kitchen</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>Incoming orders & dishes</div>
                  </div>
                </Link>

                <Link
                  to="/delivery/dashboard"
                  onClick={() => setPortalsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-border-subtle)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <i className="fa-solid fa-motorcycle" style={{ color: 'var(--color-success)', width: '16px' }}></i>
                  <div>
                    <div>Delivery Rider HUD</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>GPS trips & earnings</div>
                  </div>
                </Link>

                <div style={{ borderTop: '1px solid var(--color-border)', margin: '6px 0' }}></div>

                <Link
                  to="/admin/dashboard"
                  onClick={() => setPortalsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-border-subtle)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <i className="fa-solid fa-shield-halved" style={{ color: '#3B82F6', width: '16px' }}></i>
                  <div>
                    <div>Admin Super Console</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>Approvals & analytics</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Actions, Theme Toggle, Cart, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Theme Toggle Button */}
          <button
            className="btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-surface-card)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-text-main)'
            }}
          >
            <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            className="btn-icon cart-btn"
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-surface-card)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setIsCartOpen(true)}
            title="Open Cart"
            aria-label="View Shopping Cart"
          >
            <i className="fa-solid fa-bag-shopping" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}></i>
            {cartSummary.itemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--color-primary)',
                color: '#FFF',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(255, 90, 38, 0.4)'
              }}>
                {cartSummary.itemCount}
              </span>
            )}
          </button>

          {/* User Profile Menu */}
          {currentUser ? (
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px 4px 5px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface-card)',
                  cursor: 'pointer'
                }}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                  alt={currentUser.name}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '110px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {(currentUser.name || 'User').split(' ')[0]}
                </span>
                <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--color-text-subtle)' }}></i>
              </button>

              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  right: 0,
                  width: '230px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px 0',
                  zIndex: 200
                }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{currentUser.email}</div>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '6px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)'
                    }}>
                      {currentUser.role}
                    </span>
                  </div>

                  <Link to="/customer/profile" onClick={() => setUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                    <i className="fa-solid fa-user-gear" style={{ width: '16px', color: 'var(--color-primary)' }}></i> Profile & Addresses
                  </Link>

                  <Link to="/customer/orders" onClick={() => setUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                    <i className="fa-solid fa-receipt" style={{ width: '16px', color: 'var(--color-primary)' }}></i> Orders & Reorder
                  </Link>

                  <div style={{ borderTop: '1px solid var(--color-border)', margin: '4px 0' }}></div>

                  <button
                    onClick={handleSignOut}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      color: 'var(--color-danger)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket" style={{ width: '16px' }}></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm" style={{ padding: '8px 18px', fontWeight: 700, borderRadius: 'var(--radius-full)' }}>
              Sign In
            </Link>
          )}

        </div>

      </div>

      {/* Delivery City & Locality Selector Modal */}
      <CitySelectorModal isOpen={isCityModalOpen} onClose={() => setIsCityModalOpen(false)} />
    </header>
  );
}
