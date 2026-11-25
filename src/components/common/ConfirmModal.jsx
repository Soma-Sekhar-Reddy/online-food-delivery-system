import React, { useEffect } from 'react';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function ConfirmModal() {
  const { confirmModalState, closeConfirmModal } = useQuickBite();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!confirmModalState?.isOpen) return;
      if (e.key === 'Escape') {
        confirmModalState.onCancel?.();
        closeConfirmModal();
      } else if (e.key === 'Enter') {
        confirmModalState.onConfirm?.();
        closeConfirmModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmModalState, closeConfirmModal]);

  if (!confirmModalState || !confirmModalState.isOpen) return null;

  const {
    title = 'Please Confirm',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'warning', // 'warning', 'danger', 'info', 'success'
    onConfirm,
    onCancel
  } = confirmModalState;

  const typeConfig = {
    danger: {
      icon: 'fa-trash-can',
      iconColor: '#EF4444',
      iconBg: 'rgba(239, 68, 68, 0.12)',
      btnClass: 'btn-danger',
      btnColor: '#EF4444'
    },
    warning: {
      icon: 'fa-triangle-exclamation',
      iconColor: 'var(--color-primary, #FF5A26)',
      iconBg: 'rgba(255, 90, 38, 0.12)',
      btnClass: 'btn-primary',
      btnColor: 'var(--color-primary, #FF5A26)'
    },
    info: {
      icon: 'fa-circle-info',
      iconColor: '#3B82F6',
      iconBg: 'rgba(59, 130, 246, 0.12)',
      btnClass: 'btn-primary',
      btnColor: '#3B82F6'
    },
    success: {
      icon: 'fa-circle-check',
      iconColor: '#10B981',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      btnClass: 'btn-primary',
      btnColor: '#10B981'
    }
  };

  const config = typeConfig[type] || typeConfig.warning;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeConfirmModal();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeConfirmModal();
  };

  return (
    <div
      className="custom-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={handleCancel}
    >
      <div
        className="custom-modal-card"
        style={{
          background: 'var(--color-surface, #FFFFFF)',
          color: 'var(--color-text-main, #0F172A)',
          border: '1px solid var(--color-border, #E2E8F0)',
          borderRadius: 'var(--radius-xl, 24px)',
          boxShadow: 'var(--shadow-xl, 0 24px 48px -12px rgba(0,0,0,0.25))',
          width: '100%',
          maxWidth: '460px',
          overflow: 'hidden',
          padding: '28px',
          textAlign: 'center',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Icon Circle */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: config.iconBg,
            color: config.iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            margin: '0 auto 18px',
            boxShadow: `0 8px 20px ${config.iconBg}`
          }}
        >
          <i className={`fa-solid ${config.icon}`}></i>
        </div>

        {/* Title & Prose */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            marginBottom: '10px',
            color: 'var(--color-text-main, #0F172A)',
            letterSpacing: '-0.3px'
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: '0.925rem',
            color: 'var(--color-text-muted, #64748B)',
            lineHeight: 1.55,
            marginBottom: '26px',
            whiteSpace: 'pre-line'
          }}
        >
          {message}
        </p>

        {/* Buttons Action Strip */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: 'var(--radius-full, 9999px)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`btn ${config.btnClass}`}
            onClick={handleConfirm}
            style={{
              flex: 1.2,
              padding: '12px 20px',
              borderRadius: 'var(--radius-full, 9999px)',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: config.btnColor,
              color: '#FFFFFF',
              border: 'none',
              boxShadow: `0 4px 14px ${config.iconBg}`
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
