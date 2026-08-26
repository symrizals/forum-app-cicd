import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <LoadingBar
      style={{
        backgroundColor: '#4f46e5',
        height: '4px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        boxShadow: '0 0 8px rgba(79, 70, 229, 0.6)',
      }}
      updateTime={100}
      maxProgress={95}
    />
  );
}

export default Loading;
