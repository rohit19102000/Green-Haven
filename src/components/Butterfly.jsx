import React, { useState, useEffect, useRef } from 'react';
import './Butterfly.css';

export default function Butterfly() {
  const [position, setPosition] = useState({ x: 85, y: 15, rotate: -20 });
  const [dots, setDots] = useState([]);
  const [isScrolling, setIsScrolling] = useState(true);
  
  const lastPosition = useRef({ x: 85, y: 15 });
  const scrollTimeoutRef = useRef(null);

  // Initial load timeout: fade out after 1.5s of page load if no scroll happens
  useEffect(() => {
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1500);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // User is scrolling: set active state
      setIsScrolling(true);

      // Clear the idle timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Schedule a new timeout to hide the butterfly after 0.3 seconds of inactivity
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);

      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;
      
      const scrollPercent = scrollY / docHeight;
      
      // Calculate Y coordinate (flies from 15vh down to 85vh)
      const y = 15 + scrollPercent * 70;
      
      // Calculate X coordinate (zigzag wave using cosine)
      const wave = Math.cos(scrollPercent * Math.PI * 4);
      const x = 50 + 35 * wave;
      
      // Calculate rotation based on horizontal direction
      const direction = -Math.sin(scrollPercent * Math.PI * 4);
      const rotate = direction * 35; // tilt up to +/- 35 degrees
      
      setPosition({ x, y, rotate });

      // Calculate distance moved in vw/vh units
      const distance = Math.hypot(x - lastPosition.current.x, y - lastPosition.current.y);
      
      // Only spawn a trail dot if the butterfly has moved a minimum distance
      if (distance > 0.8) {
        const colors = [
          '#C5A880', // Champagne Gold
          '#D0985C', // Warm Copper Accent
          '#E5A9A9', // Whimsical Rose Pink
          '#FFFFFF'  // Pure White
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const newDot = {
          id: Math.random().toString(36).substring(2, 9),
          x,
          y,
          size: Math.random() * 5 + 4,
          color: randomColor,
          time: Date.now()
        };
        
        setDots(prev => [...prev.slice(-45), newDot]);
        lastPosition.current = { x, y };
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set starting position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Periodic cleanup for fading particles older than 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setDots(prev => prev.filter(d => now - d.time < 2000));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Sparkle Trail */}
      {dots.map(dot => (
        <div 
          key={dot.id}
          className="butterfly-dot"
          style={{
            left: `${dot.x}vw`,
            top: `${dot.y}vh`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            color: dot.color
          }}
        />
      ))}

      {/* Butterfly Container */}
      <div 
        className={`butterfly-container ${isScrolling ? 'active' : 'idle'}`}
        style={{
          left: `${position.x}vw`,
          top: `${position.y}vh`,
          transform: `translate(-50%, -50%) rotate(${position.rotate}deg)`,
        }}
      >
        <svg className="butterfly-svg" viewBox="0 0 100 100">
          {/* Left Wings Group */}
          <g className="butterfly-wing wing-left">
            {/* Upper Wing */}
            <path 
              d="M 50,52 C 32,24 12,24 12,40 C 12,56 38,60 50,55" 
              stroke="#A87E66" 
              strokeWidth="1.8" 
              fill="rgba(197, 168, 128, 0.2)" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Upper Wing Inner Detail */}
            <path 
              d="M 50,52 C 38,32 23,32 23,40 C 23,48 42,52 50,53" 
              stroke="#D0985C" 
              strokeWidth="1" 
              fill="rgba(208, 152, 92, 0.15)" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Lower Wing */}
            <path 
              d="M 50,55 C 38,62 18,65 24,76 C 30,86 44,76 50,58" 
              stroke="#A87E66" 
              strokeWidth="1.8" 
              fill="rgba(197, 168, 128, 0.2)" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </g>
          
          {/* Right Wings Group */}
          <g className="butterfly-wing wing-right">
            {/* Upper Wing */}
            <path 
              d="M 50,52 C 68,24 88,24 88,40 C 88,56 62,60 50,55" 
              stroke="#A87E66" 
              strokeWidth="1.8" 
              fill="rgba(197, 168, 128, 0.2)" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Upper Wing Inner Detail */}
            <path 
              d="M 50,52 C 62,32 77,32 77,40 C 77,48 58,52 50,53" 
              stroke="#D0985C" 
              strokeWidth="1" 
              fill="rgba(208, 152, 92, 0.15)" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Lower Wing */}
            <path 
              d="M 50,55 C 62,62 82,65 76,76 C 70,86 56,76 50,58" 
              stroke="#A87E66" 
              strokeWidth="1.8" 
              fill="rgba(197, 168, 128, 0.2)" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </g>

          {/* Slender Body */}
          <ellipse 
            cx="50" 
            cy="56" 
            rx="2.2" 
            ry="12" 
            fill="#A87E66" 
          />
          {/* Head */}
          <circle 
            cx="50" 
            cy="41" 
            r="2.2" 
            fill="#A87E66" 
          />
          {/* Antennas */}
          <path 
            d="M 49,40 Q 42,27 34,27" 
            stroke="#A87E66" 
            strokeWidth="1.2" 
            fill="none" 
            strokeLinecap="round" 
          />
          <path 
            d="M 51,40 Q 58,27 66,27" 
            stroke="#A87E66" 
            strokeWidth="1.2" 
            fill="none" 
            strokeLinecap="round" 
          />
          {/* Antenna Tips */}
          <circle 
            cx="34" 
            cy="27" 
            r="1" 
            fill="#D0985C" 
          />
          <circle 
            cx="66" 
            cy="27" 
            r="1" 
            fill="#D0985C" 
          />
        </svg>
      </div>
    </>
  );
}
