'use client'

import React, { useState, useEffect } from 'react';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  minHeight?: number;
}

export default function ResponsiveWrapper({ 
  children, 
  minHeight = 300 
}: ResponsiveWrapperProps) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // Adjust height based on screen size
  const responsiveHeight = isMobile 
    ? Math.max(minHeight - 50, 250) 
    : isTablet 
    ? Math.max(minHeight - 25, 275)
    : minHeight;

  return (
    <div 
      className={`w-full transition-all duration-300 ${
        isMobile ? 'px-2' : isTablet ? 'px-4' : 'px-6'
      }`}
      style={{ minHeight: responsiveHeight }}
    >
      {children}
    </div>
  );
}