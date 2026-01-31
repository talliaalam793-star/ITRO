import React, { useState, useEffect } from 'react';
import Mobile from './Mobile'; // Assuming Mobile.jsx is in the same folder
import Desktop from './Desktop'; // Assuming Desktop.jsx is in the same folder

const MobileDesktop = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount

  const isMobile = width <= 768;

  return (
    <>
      {isMobile ? <Mobile /> : <Desktop />}
    </>
  );
};

export default MobileDesktop;