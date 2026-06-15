import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Compass } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Cards.css';

export const PACKAGES = [
  {
    id: 'boho-dream',
    title: 'The Boho Dream',
    price: 'X',
    tagline: 'Perfect for social gatherings & girls day out',
    icon: Sparkles,
    color: 'gold',
    features: [
      'Curated bohemian styling & layout',
      'Low rustic wooden picnic table',
      'Plush cushions & high-quality rugs',
      'Custom chalkboard message board',
      'Sparkling water & setups for up to 4 guests'
    ],
    duration: '2 Hours'
  },
  {
    id: 'romantic-rendezvous',
    title: 'Romantic Rendezvous',
    price: 'X',
    tagline: 'Ideal for proposals, dates, & anniversaries',
    icon: Heart,
    color: 'orange',
    features: [
      'Intimate setup styled for two guests',
      'Rose petal walkway & decor accents',
      'Champagne bucket with sparkling cider',
      'Chocolate-covered strawberries or sweet treats',
      'Perfect for anniversary or marriage proposals'
    ],
    duration: '2 Hours'
  },
  {
    id: 'grand-celebration',
    title: 'The Grand Celebration',
    price: 'X',
    tagline: 'For birthdays, showers, & micro-events',
    icon: Gift,
    color: 'purple',
    features: [
      'Extended seating for 5 to 10 guests',
      'Multiple styled low-profile tables',
      'Premium floral arrangements & balloon accents',
      'Lawn game package (cornhole, giant Jenga)',
      'Cheese & charcuterie grazing platter'
    ],
    duration: '2.5 Hours'
  },
  {
    id: 'dfw-custom-luxe',
    title: 'DFW Custom Luxe',
    price: 'X',
    tagline: 'Completely tailored corporate or social events',
    icon: Compass,
    color: 'green',
    features: [
      'Tailored for large groups of 10 to 30 guests',
      'Fully customized color palette & design theme',
      'Full tablescape styling with dinnerware',
      'Dedicated on-site coordinator options',
      'Catering coordination & custom upgrades'
    ],
    duration: '3+ Hours'
  }
];

export default function Cards({ onSelectPackage }) {
  const [revealRef, isRevealed] = useIntersectionObserver({ triggerOnce: false });
  const [flippedCard, setFlippedCard] = useState(null);

  const handleBookClick = (e, pkg) => {
    e.stopPropagation(); // prevent card flip on button click
    onSelectPackage(pkg.id);
    const element = document.getElementById('booking');
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
    <section id="packages" className="section cards-section">
      <div 
        ref={revealRef} 
        className={`container cards-container reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="section-header">
          <span className="badge">Styled Experiences</span>
          <h2 className="title-lg cards-title">Our Picnic Packages</h2>
          <p className="section-subtitle">
            Hover over any card to flip and explore inclusions, timings, and custom rates.
          </p>
        </div>

        <div className="cards-grid">
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div 
                key={pkg.id} 
                className="card-perspective"
                onClick={() => setFlippedCard(flippedCard === pkg.id ? null : pkg.id)}
              >
                <div className={`card-inner ${flippedCard === pkg.id ? 'flipped' : ''}`}>
                  {/* FRONT side */}
                  <div className="card-front">
                    <div className={`card-front-top color-bg-${pkg.color}`}>
                      <div className="card-icon-wrapper">
                        <Icon size={32} />
                      </div>
                      <span className="card-duration-tag">{pkg.duration}</span>
                    </div>
                    
                    <div className="card-front-body">
                      <h3 className="card-title">{pkg.title}</h3>
                      <p className="card-tagline">{pkg.tagline}</p>
                      
                      <div className="card-price-block">
                        <span className="price-symbol">$</span>
                        <span className="price-value">{pkg.price}</span>
                        <span className="price-unit">/ person</span>
                      </div>
                    </div>

                    <div className="card-front-footer">
                      <span className="flip-hint">Hover / Tap to Reveal Inclusions</span>
                    </div>
                  </div>

                  {/* BACK side */}
                  <div className="card-back">
                    <div className="card-back-header">
                      <h3 className="card-back-title">{pkg.title}</h3>
                      <span className="card-back-duration">{pkg.duration}</span>
                    </div>

                    <ul className="card-features-list">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="card-feature-item-back">
                          <span className="bullet">✦</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="card-back-actions">
                      <div className="card-back-price">
                        <span>Total Rate:</span>
                        <strong>${pkg.price} <small>/ head</small></strong>
                      </div>
                      <button 
                        className="btn btn-accent btn-sm"
                        onClick={(e) => handleBookClick(e, pkg)}
                      >
                        Book This Package
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
