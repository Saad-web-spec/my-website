import React from 'react';
import { use3DTilt } from '../../hooks/use3DTilt';

export const TiltCard = ({ children, className = '', maxRotation = 10, scale = 1.02, ...props }) => {
  const cardRef = use3DTilt(maxRotation, scale);

  return (
    <div
      ref={cardRef}
      className={`glass-card tilt-card ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      <div
        className="card-glare"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 3,
          opacity: 0,
        }}
      />
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d', height: '100%' }}>
        {children}
      </div>
    </div>
  );
};
export default TiltCard;
