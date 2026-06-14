import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlighters on scroll
      const sections = ['home', 'about', 'packages', 'gallery', 'booking', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <div className="logo-icon">
            <Sparkles size={20} fill="#ffffff" />
          </div>
          <span className="logo-text">
            Uptown <span className="logo-text-accent">Picnic Co.</span>
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li className={activeSection === 'home' ? 'active' : ''} onClick={() => handleNavClick('home')}>Home</li>
          <li className={activeSection === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}>About Us</li>
          <li className={activeSection === 'packages' ? 'active' : ''} onClick={() => handleNavClick('packages')}>Pricing</li>
          <li className={activeSection === 'gallery' ? 'active' : ''} onClick={() => handleNavClick('gallery')}>Gallery</li>
          <li className={activeSection === 'booking' ? 'active' : ''} onClick={() => handleNavClick('booking')}>Contact</li>
        </ul>

        {/* Action CTAs */}
        <div className="nav-actions">
          <a href="tel:+12145550199" className="nav-phone-link">
            <div className="phone-icon-wrapper">
              <Phone size={16} />
            </div>
            <span>(214) 555-0199</span>
          </a>
          <button className="btn btn-accent" onClick={() => handleNavClick('booking')}>
            Book Now
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-container glass-panel">
          <div className="drawer-header">
            <div className="nav-logo" onClick={() => handleNavClick('home')}>
              <div className="logo-icon">
                <Sparkles size={18} fill="#ffffff" />
              </div>
              <span className="logo-text">Uptown Picnic Co.</span>
            </div>
            <button className="mobile-toggle" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <ul className="drawer-links">
            <li className={activeSection === 'home' ? 'active' : ''} onClick={() => handleNavClick('home')}>Home</li>
            <li className={activeSection === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}>About Us</li>
            <li className={activeSection === 'packages' ? 'active' : ''} onClick={() => handleNavClick('packages')}>Pricing</li>
            <li className={activeSection === 'gallery' ? 'active' : ''} onClick={() => handleNavClick('gallery')}>Gallery</li>
            <li className={activeSection === 'booking' ? 'active' : ''} onClick={() => handleNavClick('booking')}>Contact</li>
          </ul>

          <div className="drawer-actions">
            <a href="tel:+12145550199" className="nav-phone-link">
              <Phone size={18} />
              <span>(214) 555-0199</span>
            </a>
            <button className="btn btn-accent w-full" onClick={() => handleNavClick('booking')}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
