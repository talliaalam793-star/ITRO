// src/MobileDesktop.jsx
import { useState, useEffect } from 'react';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp';

export default function MobileDesktop() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width <= 768;

  return isMobile ? <MobileApp /> : <DesktopApp />;
}