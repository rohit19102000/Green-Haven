import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, Send, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

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
    <footer className="footer">
      <div className="container footer-container">
        
        {/* Footer info brand column */}
        <div className="footer-column footer-brand">
          <div className="nav-logo" onClick={() => handleScrollToSection('home')}>
            <div className="logo-icon">
              <Sparkles size={18} fill="#ffffff" />
            </div>
            <span className="logo-text color-white">
              Uptown <span className="logo-text-accent">Picnic Co.</span>
            </span>
          </div>
          <p className="brand-tagline">
            Dallas-Fort Worth's premier luxury picnic and event experience company. 
            We design, style, set up, and clean up custom pop-up picnics for your special celebrations.
          </p>
          <div className="social-links">
            <a href="https://instagram.com/uptownpicnicco" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com/uptownpicnic" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>

        {/* Footer links column */}
        <div className="footer-column">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li onClick={() => handleScrollToSection('home')}>Home</li>
            <li onClick={() => handleScrollToSection('about')}>About Us</li>
            <li onClick={() => handleScrollToSection('packages')}>Picnic Packages</li>
            <li onClick={() => handleScrollToSection('gallery')}>Scenic Gallery</li>
            <li onClick={() => handleScrollToSection('booking')}>Reserve Spot</li>
          </ul>
        </div>

        {/* Footer contacts column */}
        <div className="footer-column">
          <h4 className="footer-title">Contact Us</h4>
          <ul className="footer-contact-list">
            <li>
              <Phone size={16} className="contact-icon text-accent" />
              <a href="tel:+12145550199">(214) 555-0199</a>
            </li>
            <li>
              <Mail size={16} className="contact-icon text-accent" />
              <a href="mailto:uptownpicnic@gmail.com">uptownpicnic@gmail.com</a>
            </li>
            <li className="align-start">
              <MapPin size={16} className="contact-icon text-accent mt-1" />
              <span>Serving Dallas, Fort Worth, and the surrounding DFW Metroplex areas</span>
            </li>
          </ul>
        </div>

        {/* Footer newsletter column */}
        <div className="footer-column footer-newsletter">
          <h4 className="footer-title">Newsletter</h4>
          <p className="newsletter-text">
            Subscribe for exclusive seasonal deals, styling tips, and new package announcements.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
          ) : (
            <div className="newsletter-success animate-scale-in">
              <Sparkles size={16} className="text-accent" />
              <span>Subscribed successfully!</span>
            </div>
          )}
        </div>

      </div>

      {/* Copyright row */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} Uptown Picnic Company. All rights reserved.</p>
          <p className="developer-tag">
            Made with <Heart size={12} fill="var(--accent)" stroke="var(--accent)" /> in Dallas, TX
          </p>
        </div>
      </div>
    </footer>
  );
}
