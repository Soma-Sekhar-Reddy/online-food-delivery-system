import React from 'react';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function ToastContainer() {
  const { toasts, removeToast } = useQuickBite();

  const iconMap = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };

  return (
    <div className="toast-container" id="toast-container" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type} toast-enter`}>
          <i className={`fa-solid ${iconMap[t.type] || 'fa-bell'} toast-icon`}></i>
          <div className="toast-content">
            <p className="toast-message">{t.message}</p>
          </div>
          <button className="toast-close" onClick={() => removeToast(t.id)} aria-label="Close notification">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ))}
    </div>
  );
}
