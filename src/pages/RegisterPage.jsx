import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../context/QuickBiteContext.jsx';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const { db, setCurrentUser, signupStatus, currentUser } = useQuickBite();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = db.register({ name, email, phone, password, role });
    if (newUser) {
      setCurrentUser(newUser);
      if (role === 'customer') navigate('/customer/restaurants');
      else if (role === 'restaurant') navigate('/restaurant/dashboard');
      else if (role === 'delivery') navigate('/delivery/dashboard');
      else navigate('/');
    }
  };

  const roleOptions = [
    {
      id: 'customer',
      label: 'Foodie',
      sub: 'Order food & track deliveries',
      icon: 'fa-solid fa-utensils',
      color: 'var(--color-primary, #FF5A26)',
      portalInfo: 'Browse 200+ restaurants, save favorites, and track live deliveries.'
    },
    {
      id: 'restaurant',
      label: 'Restaurant Partner',
      sub: 'Manage kitchen & menu',
      icon: 'fa-solid fa-store',
      color: '#10B981',
      portalInfo: 'Instant access to Kitchen Portal, live orders pipeline, and dish management.'
    },
    {
      id: 'delivery',
      label: 'Fleet Rider',
      sub: 'Deliver orders & earn',
      icon: 'fa-solid fa-motorcycle',
      color: '#0284C7',
      portalInfo: 'Access Rider HUD, active delivery route assignments, and trip earnings.'
    }
  ];

  const activeOption = roleOptions.find((r) => r.id === role) || roleOptions[0];

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--color-bg)' }}>
      <div style={{ width: '100%', maxWidth: '520px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg, 16px)', padding: '36px 32px', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Link to="/" className="brand-logo" style={{ display: 'inline-flex', marginBottom: '14px' }}>
            <div className="logo-icon-wrap" style={{ width: '40px', height: '40px', fontSize: '1.15rem' }}>
              <i className="fa-solid fa-burger"></i>
            </div>
            <div className="brand-text" style={{ fontSize: '1.55rem' }}>Quick<span>Bite</span></div>
          </Link>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '4px 0' }}>Join QuickBite</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Create your account to get started in seconds</p>
        </div>

        {/* 1-Hour Signup Window Alert Banner */}
        {signupStatus?.isActive && !currentUser && (
          <div style={{
            marginBottom: '20px',
            padding: '12px 14px',
            borderRadius: 'var(--radius-md, 10px)',
            background: 'rgba(255, 90, 38, 0.08)',
            border: '1px solid rgba(255, 90, 38, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--color-primary)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              flexShrink: 0
            }}>
              <i className="fa-solid fa-clock"></i>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '2px' }}>
                1-Hour Signup Window Active ({signupStatus.remainingMinutes}m left)
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.35 }}>
                Create your account now to unlock restaurants, order tracking, and live menus.
              </div>
            </div>
          </div>
        )}

        {/* Visual Role Selection Cards */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
            I want to join as:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {roleOptions.map((opt) => {
              const isSelected = role === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRole(opt.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 8px',
                    borderRadius: 'var(--radius-md, 12px)',
                    border: isSelected ? `2px solid ${opt.color}` : '1px solid var(--color-border)',
                    background: isSelected ? 'var(--color-surface-card)' : 'transparent',
                    boxShadow: isSelected ? `0 4px 14px ${opt.color}25` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  {isSelected && (
                    <span style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: opt.color,
                      color: '#FFF',
                      fontSize: '0.55rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className="fa-solid fa-check"></i>
                    </span>
                  )}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isSelected ? `${opt.color}18` : 'var(--color-bg)',
                    color: isSelected ? opt.color : 'var(--color-text-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    marginBottom: '6px',
                    transition: 'all 0.2s ease'
                  }}>
                    <i className={opt.icon}></i>
                  </div>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: isSelected ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                    lineHeight: 1.2
                  }}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Role contextual notification banner */}
          <div style={{
            marginTop: '10px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm, 8px)',
            background: 'var(--color-bg)',
            borderLeft: `3px solid ${activeOption.color}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.775rem',
            color: 'var(--color-text-muted)'
          }}>
            <i className="fa-solid fa-circle-info" style={{ color: activeOption.color }}></i>
            <span>{activeOption.portalInfo}</span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              {role === 'restaurant' ? 'Owner / Contact Name *' : 'Full Name *'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'restaurant' ? 'e.g. Vikram Verma (The Biryani House)' : role === 'delivery' ? 'e.g. Rahul Sharma (Rider)' : 'e.g. Rohan Sharma'}
              required
              style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'restaurant' ? 'kitchen@yourrestaurant.com' : role === 'delivery' ? 'rider@fleet.com' : 'rohan@example.com'}
              required
              style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              required
              style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.9rem' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '0.975rem',
              fontWeight: 700,
              background: activeOption.color === '#10B981' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : activeOption.color === '#0284C7' ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : 'var(--color-primary-gradient)',
              borderColor: 'transparent'
            }}
          >
            Create {activeOption.label} Account <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '22px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign In</Link>
        </div>

      </div>
    </div>
  );
}
