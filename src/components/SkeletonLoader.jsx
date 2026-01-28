// src/components/SkeletonLoader.jsx
import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-info">
              <div className="skeleton-text title"></div>
              <div className="skeleton-text price"></div>
              <div className="skeleton-text button"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'text') {
    return (
      <div className="skeleton-text-block">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-text line"></div>
        ))}
      </div>
    );
  }

  if (type === 'chat') {
    return (
      <div className="skeleton-chat">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={`skeleton-message ${index % 2 === 0 ? 'user' : 'bot'}`}>
            <div className="skeleton-text bubble"></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;