import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [isBgFaded, setIsBgFaded] = useState(false);
  const [bgTranslateY, setBgTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Fade bg-image once user scrolls past 400px (drives a 0.5s CSS animation)
      if (scrollPosition > 400) {
        setIsBgFaded(true);
      } else {
        setIsBgFaded(false);
      }
      
      // Calculate slow parallax translation
      const translateY = scrollPosition * 0.15;
      setBgTranslateY(translateY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header id="home" className="hero-section">
      {/* Background Image Container Wrapper */}
      <div 
        className={`hero-bg-wrapper ${isBgFaded ? 'faded' : ''}`}
      >
        <div 
          className="hero-bg"
          style={{ 
            transform: `translateY(${bgTranslateY}px)`
          }}
        ></div>
        {/* Vignette/Gradient Overlay */}
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-container container">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in-up">
            <span className="badge badge-dark">Luxury Pop-Up Picnics</span>
          </div>

          <h1 className="hero-title animate-fade-in-up delay-1">
            Welcome to <span className="hero-title-highlight">Uptown Picnic Co.</span>
          </h1>

          <p className="hero-description animate-fade-in-up delay-2">
            Experience premium curated picnics and luxury event designs in the Dallas-Fort Worth area. We style, set up, and clean up for your perfect day.
          </p>

          <div className="hero-actions animate-fade-in-up delay-3">
            <button className="btn btn-primary btn-hero-book" onClick={() => handleScrollToSection('booking')}>
              Book Your Picnic <ArrowRight size={18} />
            </button>
            <a href="tel:+12145550199" className="btn btn-secondary btn-hero-call">
              <Phone size={18} />
              <span>(214) 555-0199</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="scroll-indicator" onClick={() => handleScrollToSection('about')}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </header>
  );
}
