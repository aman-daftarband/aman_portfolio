import React, { useEffect, useRef } from 'react';

export const CursorSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable cursor spotlight on pointer devices (desktop with mouse)
    const isPointer = window.matchMedia('(pointer: fine)').matches;
    if (!isPointer) return;

    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Direct DOM manipulation to prevent React re-renders on every mouse movement
      spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(59, 130, 246, 0.04), transparent 80%)`;
      spotlight.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-0 hidden md:block"
      style={{
        background: 'radial-gradient(600px circle at 0px 0px, transparent, transparent)'
      }}
    />
  );
};

export default CursorSpotlight;
