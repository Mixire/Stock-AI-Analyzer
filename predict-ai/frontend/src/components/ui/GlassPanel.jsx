import React from 'react';

const GlassPanel = ({ children, className = "" }) => {
  return (
    <div className={`glass-panel p-xs rounded-xl overflow-hidden shadow-2xl ${className}`}>
      {children}
    </div>
  );
};

export default GlassPanel;
