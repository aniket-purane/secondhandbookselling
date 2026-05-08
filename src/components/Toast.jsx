import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className={`toast ${type === 'error' ? 'error' : ''}`}>
        <div className="toast-icon">
          {type === 'success' ? '✓' : '!'}
        </div>
        <div className="toast-message">
          <p className="font-bold text-sm" style={{ margin: 0 }}>{type === 'success' ? 'Success' : 'Attention'}</p>
          <p className="text-xs text-white/70" style={{ margin: 0 }}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
