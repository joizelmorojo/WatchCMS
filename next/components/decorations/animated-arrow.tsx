"use client";
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedArrowProps {
  onComplete: () => void;
}

export const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ onComplete }) => {
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const arrowRef = useRef<SVGPolylineElement>(null);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  useEffect(() => {
    if (!progressCircleRef.current) return;

    // Animation parameters
    const duration = 7000; // 7 seconds
    const startTime = Date.now();
    const circumference = 2 * Math.PI * 29; // 2πr (r=29 from viewBox)

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Update the stroke dashoffset
      if (progressCircleRef.current) {
        const offset = circumference - (progress * circumference);
        progressCircleRef.current.style.strokeDashoffset = `${offset}px`;
        progressCircleRef.current.style.opacity = '1';
      }

      // Hide the circle after animation completes
      if (progress >= 1 && progressCircleRef.current) {
        progressCircleRef.current.style.display = 'none'; // Hide the circle after animation
        setTimeout(onComplete, 500); // Trigger action after a small delay
      } else {
        requestAnimationFrame(animate);
      }
    };

    // Initialize the circle with stroke-dasharray
    if (progressCircleRef.current) {
      progressCircleRef.current.style.strokeDasharray = `${circumference}px`;
      progressCircleRef.current.style.strokeDashoffset = `${circumference}px`;
      progressCircleRef.current.style.opacity = '0';
    }

    animate();

    return () => {
      // Cleanup if needed
    };
  }, [onComplete]);

  return (
    <div 
      className="relative w-16 h-16 cursor-pointer" 
      onClick={onComplete} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 60 60" 
        className="absolute inset-0 w-full h-full"
      >
        {/* Background Circle (Thicker Border) */}
        <circle 
          cx="30" 
          cy="30" 
          r="29" 
          className="background"
          opacity={0.3}
          style={{ fill: '#737373' }} // , enableBackground: 'new'
        />
        
        {/* Animated Progress Circle */}
        <circle 
          ref={progressCircleRef}
          cx="30" 
          cy="30" 
          r="29" 
          className="progress" 
          opacity={0}
          style={{
            fill: 'none',
            stroke: 'rgb(255, 255, 255)',
            strokeWidth: '2',  // Thicker circle border
            strokeLinecap: 'round',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            transition: 'opacity 0.3s ease',
          }}
        />
        
        {/* Arrow (initially hidden) */}
        <polyline 
          ref={arrowRef}
          points="35.7,29 30,34.7 24.3,29" 
          style={{
            fill: 'none',
            stroke: '#FFFFFF',
            strokeWidth: '1.5',
            transition: 'opacity 0.5s ease, transform 0.3s ease',
            transform: isHovered ? 'translateY(4px)' : 'translateY(0)',  // Arrow movement on hover
          }}
        />
      </svg>
    </div>
  );
};
