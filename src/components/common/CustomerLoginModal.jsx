import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function CustomerLoginModal() {
  const { isCustomerLoginModalOpen, setIsCustomerLoginModalOpen, loginRedirectUrl, switchRole, showToast } = useQuickBite();
  const navigate = useNavigate();

  if (!isCustomerLoginModalOpen) return null;

  const handleQuickDemoLogin = () => {
    switchRole('customer');
    setIsCustomerLoginModalOpen(false);
    showToast('Signed in as Rahul Sharma (Customer)! Proceeding with your order...', 'success', 2500);
    const target = loginRedirectUrl || '/customer/checkout';
    setTimeout(() => {
      navigate(target);
    }, 300);
  };

  const handleGoToLogin = () => {
    setIsCustomerLoginModalOpen(false);
    const redirect = encodeURIComponent(loginRedirectUrl || '/customer/checkout');
    navigate(`/login?redirect=${redirect}`);
  };

  const handleGoToRegister = () => {
    setIsCustomerLoginModalOpen(false);
    navigate('/register');
  };

  return (
    <div
      className="custom-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 10001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={() => setIsCustomerLoginModalOpen(false)}
    >
      <div
        className="custom-modal-card"
        style={{
          background: 'var(--color-surface, #FFFFFF)',
          color: 'var(--color-text-main, #0F172A)',
          border: '1px solid var(--color-border, #E2E8F0)',
          borderRadius: 'var(--radius-xl, 24px)',
          boxShadow: 'var(--shadow-xl, 0 24px 48px -12px rgba(0,0,0,0.3))',
          width: '100%',
          maxWidth: '480px',
          overflow: 'hidden',
          padding: '32px 28px',
          textAlign: 'center',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Badge */}
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'var(--color-primary-light, rgba(255, 90, 38, 0.12))',
            color: 'var(--color-primary, #FF5A26)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.85rem',
            margin: '0 auto 18px',
            boxShadow: '0 8px 24px rgba(255, 90, 38, 0.2)'
          }}
        >
          <i className="fa-solid fa-user-lock"></i>
        </div>

        {/* Title & Description */}
        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            marginBottom: '10px',
            color: 'var(--color-text-main, #0F172A)',
            letterSpacing: '-0.3px'
          }}
        >
          Customer Sign-In Required
        </h3>

        <p
          style={{
            fontSize: '0.925rem',
            color: 'var(--color-text-muted, #64748B)',
            lineHeight: 1.55,
            marginBottom: '26px'
          }}
        >
          You must be signed in as a customer to order food, track your live delivery rider, and save delivery addresses.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Quick Demo Customer Login Option */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleQuickDemoLogin}
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: 'var(--radius-full, 9999px)',
              fontWeight: 800,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-primary)'
            }}
          >
            <i className="fa-solid fa-bolt"></i> 1-Click Demo Customer Sign In
          </button>

          {/* Regular Login Option */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleGoToLogin}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: 'var(--radius-full, 9999px)',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <i className="fa-regular fa-envelope"></i> Sign In with Email & Password
          </button>

          {/* New Account / Cancel Options */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.85rem' }}>
            <button
              type="button"
              onClick={handleGoToRegister}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary)',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              Don't have an account? Sign Up
            </button>

            <button
              type="button"
              onClick={() => setIsCustomerLoginModalOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
