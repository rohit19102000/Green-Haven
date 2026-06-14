import React, { useState } from 'react';
import { Calendar, Leaf, Compass, Coffee, Utensils, HelpCircle } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Cards.css';

export const PACKAGES = [
  {
    id: 'rustic-picnic',
    title: 'Rustic Cottage Picnic',
    price: 25,
    tagline: 'Perfect for family day outs',
    icon: Leaf,
    color: 'green',
    features: [
      'Access to a private garden cottage',
      'Traditional chulha lunch & buttermilk',
      'Free archery and lawn games',
      'Guided farm tour & animal feeding'
    ],
    duration: '9:00 AM - 6:00 PM'
  },
  {
    id: 'sunset-hilltop',
    title: 'Sunset Hilltop Escape',
    price: 35,
    tagline: 'Unwind under the open skies',
    icon: Compass,
    color: 'orange',
    features: [
      'Reserved hillside sunset deck',
      'Evening high tea & hot village snacks',
      'Rustic swing sets & hammock access',
      'Campfire circle (winter/monsoons)'
    ],
    duration: '3:00 PM - 9:00 PM'
  },
  {
    id: 'organic-feast',
    title: 'Traditional Farm Feast',
    price: 45,
    tagline: 'Savor local village culinary arts',
    icon: Utensils,
    color: 'gold',
    features: [
      'Live traditional cooking demo',
      'Unlimited wood-fired Maharashtrian buffet',
      'Organic sugarcane juice extraction tour',
      'Chulha bread (bhakri) workshops'
    ],
    duration: '11:00 AM - 4:00 PM'
  },
  {
    id: 'agri-harvest',
    title: 'The Orchard Harvest Tour',
    price: 20,
    tagline: 'Connect with agriculture & soils',
    icon: Coffee,
    color: 'purple',
    features: [
      'Mango & guava orchard walking tour',
      'Fresh fruit harvesting (seasonal)',
      'Traditional pottery wheel lesson',
      'Take-home organic seed kit'
    ],
    duration: '8:00 AM - 1:00 PM'
  }
];

export default function Cards({ onSelectPackage }) {
  const [revealRef, isRevealed] = useIntersectionObserver({ triggerOnce: true });
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
          <span className="badge">Curated Escapes</span>
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
