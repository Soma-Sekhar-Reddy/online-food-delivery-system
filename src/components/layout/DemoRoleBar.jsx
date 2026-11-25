import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function DemoRoleBar() {
  const { currentUser, switchRole, signupStatus, resetSignupWindow, expireSignupWindow, setForcedLogout, db, showToast, openFacultyModal } = useQuickBite();
  const navigate = useNavigate();
  const location = useLocation();

  // Load minimized preference from temporary session storage if available
  const [isMinimized, setIsMinimized] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem('quickbite_demo_bar_minimized') === 'true';
      }
    } catch {
      return false;
    }
    return false;
  });

  const toggleMinimize = () => {
    setIsMinimized((prev) => {
      const next = !prev;
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('quickbite_demo_bar_minimized', String(next));
        }
      } catch (e) {
        // Ignore
      }
      return next;
    });
  };

  const roles = [
    { id: 'customer', label: 'Foodie Customer', shortLabel: 'Customer', icon: 'fa-utensils', color: '#FF5A26' },
    { id: 'restaurant', label: 'Restaurant Kitchen', shortLabel: 'Restaurant', icon: 'fa-shop', color: '#10B981' },
    { id: 'delivery', label: 'Fleet Rider', shortLabel: 'Rider', icon: 'fa-motorcycle', color: '#0284C7' },
    { id: 'admin', label: 'Admin Console', shortLabel: 'Admin', icon: 'fa-shield-halved', color: '#8B5CF6' }
  ];

  const handleRoleSelect = (roleId) => {
    switchRole(roleId);
    if (roleId === 'customer') {
      navigate('/customer/restaurants');
    } else if (roleId === 'restaurant') {
      navigate('/restaurant/dashboard');
    } else if (roleId === 'delivery') {
      navigate('/delivery/dashboard');
    } else if (roleId === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  const activeRole = currentUser?.role || 'customer';
  const currentRoleObj = roles.find((r) => r.id === activeRole) || roles[0];

  // Minimized Floating Pill Mode (clean, non-intrusive, floating in bottom corner)
  if (isMinimized) {
    return (
      <aside
        aria-label="Demo role selector"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#0F172A',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '6px 12px 6px 10px',
          borderRadius: '9999px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
          color: '#E2E8F0',
          fontSize: '0.785rem',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: currentRoleObj.color,
          boxShadow: `0 0 8px ${currentRoleObj.color}`
        }}></span>

        <span style={{ fontWeight: 600, color: '#94A3B8', fontSize: '0.725rem' }}>
          Role:
        </span>

        <span style={{ fontWeight: 700, color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <i className={`fa-solid ${currentRoleObj.icon}`} style={{ color: currentRoleObj.color }}></i>
          {currentRoleObj.shortLabel}
        </span>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('quickbite:start-simulation'))}
          title="Start 4-Step End-to-End Simulation Mode"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '3px 9px',
            fontSize: '0.675rem',
            fontWeight: 800,
            cursor: 'pointer',
            marginLeft: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)'
          }}
        >
          <i className="fa-solid fa-graduation-cap"></i> 4-Step Simulation
        </button>

        <button
          type="button"
          onClick={toggleMinimize}
          title="Expand Role Switcher Bar"
          aria-label="Expand Role Switcher"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '3px 8px',
            fontSize: '0.675rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginLeft: '2px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <i className="fa-solid fa-arrows-up-down"></i> Switch
        </button>
      </aside>
    );
  }

  // Expanded Top Bar Mode
  return (
    <aside
      aria-label="Demo role selector"
      className="demo-bar"
      style={{
        background: 'linear-gradient(90deg, #090D16 0%, #0F172A 50%, #090D16 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '7px 0',
        fontSize: '0.815rem',
        color: '#E2E8F0',
        position: 'relative',
        zIndex: 110,
        transition: 'all 0.2s ease'
      }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* Left: Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: currentRoleObj.color,
            color: '#FFFFFF',
            fontSize: '0.675rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <i className="fa-solid fa-bolt"></i> Role Preview
          </span>
          <span style={{ color: 'rgba(241, 245, 249, 0.75)', fontSize: '0.785rem' }}>
            Switch persona to test interconnected food delivery workflows:
          </span>
        </div>

        {/* Center/Right: Role Switcher Buttons & Minimize */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {roles.map((role) => {
            const isActive = activeRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleSelect(role.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? `1.5px solid ${role.color}` : '1px solid rgba(255, 255, 255, 0.12)',
                  background: isActive ? `${role.color}25` : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  boxShadow: isActive ? `0 2px 10px ${role.color}40` : 'none',
                  transition: 'all 0.18s ease'
                }}
              >
                <i className={`fa-solid ${role.icon}`} style={{ color: role.color }}></i> {role.label}
              </button>
            );
          })}


          {/* 1-Hour Signup Window & Forced-Logout Simulator Tools */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginLeft: '6px', paddingLeft: '8px', borderLeft: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '3px 8px',
                borderRadius: '6px',
                background: signupStatus?.isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: signupStatus?.isActive ? '#34D399' : '#F87171',
                border: signupStatus?.isActive ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title={signupStatus?.isActive ? `1-Hour Signup Period active: ${signupStatus.remainingMinutes} min left` : '1-Hour Signup Period expired'}
            >
              <i className="fa-solid fa-clock"></i>
              {signupStatus?.isActive ? `1h Window: ${signupStatus.remainingMinutes}m` : '1h Expired'}
            </span>

            {db.isForcedLogout() && (
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#FBBF24',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  fontWeight: 700
                }}
                title="User forcedly logged out (leave it rule active)"
              >
                Forced Logout
              </span>
            )}

            <button
              type="button"
              onClick={() => {
                resetSignupWindow(60);
                showToast('Reset 1-Hour Signup Window (60m remaining)!', 'success', 2000);
              }}
              title="Reset 1-Hour Window to 60 minutes"
              style={{
                fontSize: '0.7rem',
                padding: '3px 7px',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#CBD5E1',
                cursor: 'pointer'
              }}
            >
              Reset 1h
            </button>

            <button
              type="button"
              onClick={() => {
                expireSignupWindow();
                showToast('Simulated 1-Hour Window Expired!', 'info', 2000);
              }}
              title="Simulate 1-Hour Window expired (>1h elapsed)"
              style={{
                fontSize: '0.7rem',
                padding: '3px 7px',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#CBD5E1',
                cursor: 'pointer'
              }}
            >
              Simulate Expired
            </button>
          </div>

          {/* Minimize Button */}
          <button
            type="button"
            onClick={toggleMinimize}
            title="Minimize to floating pill"
            aria-label="Minimize bar"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 9px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#94A3B8',
              marginLeft: '4px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <i className="fa-solid fa-chevron-up"></i> Minimize
          </button>
        </div>
      </div>
    </aside>
  );
}
