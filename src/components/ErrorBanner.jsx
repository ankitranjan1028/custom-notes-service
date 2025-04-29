import React, { useState, useEffect } from 'react';
import './ErrorBanner.css';

// A reusable error banner component that automatically dismisses after a timeout
// Why display error banner: Provides clear feedback about operation failures without disrupting UX flow
const ErrorBanner = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-close the error after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="error-banner">
      <div className="error-content">
        <span>{message}</span>
        <button className="close-button" onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}>×</button>
      </div>
    </div>
  );
};

export default ErrorBanner;