import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <LoadingBar
      style={{ backgroundColor: '#4f46e5', height: '3px' }}
      updateTime={100}
      maxProgress={95}
    />
  );
}

export default Loading;
