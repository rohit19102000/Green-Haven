import React from 'react';
import { Check, ShieldCheck, Heart, MapPin, Award } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './About.css';

export default function About() {
  const [revealRef, isRevealed] = useIntersectionObserver({ triggerOnce: true });

  const features = [
    { title: 'Lush Family Picnic Spots', desc: 'Beautifully manicured, shaded green lawns perfect for family seating, games, and relaxation.' },
    { title: 'Farm-to-Table Dining', desc: 'Indulge in authentic local Maharashtrian meals, freshly cooked using farm-grown organic ingredients.' },
    { title: 'Interactive Agri-Tourism', desc: 'Embark on guided farm walkthroughs, fruit picking sessions, and interact with friendly farm animals.' },
    { title: 'Scenic Countryside Views', desc: 'Overlook Solapur’s peaceful rolling hills, sunset points, and beautiful farm horizons.' }
  ];

  return (
    <section id="about" className="section about-section">
      <div 
        ref={revealRef} 
        className={`container about-container reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
      >
        {/* Left text column */}
        <div className="about-text-content">
          <span className="badge">Our Sanctuary</span>
          <h2 className="title-lg about-title">
            About <span className="text-primary">Green Haven</span>
          </h2>
          <p className="about-paragraph">
            Nestled in the serene outskirts of Solapur, Green Haven is a premier agri-tourism resort 
            designed to reconnect families with nature. We offer an authentic slice of rural beauty 
            complemented by modern comforts. Whether you want to lounge on the grass, harvest fresh mangoes, 
            or savor a traditional wooden-stove lunch, Green Haven is your peaceful weekend escape.
          </p>

          <div className="about-features-grid">
            {features.map((feature, i) => (
              <div key={i} className="about-feature-item">
                <div className="feature-icon-box">
                  <Check size={18} />
                </div>
                <div className="feature-text-box">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right stats and cards column */}
        <div className="about-visuals-content">
          <div className="stats-grid">
            <div className="stat-card glass-panel card-hover-up">
              <div className="stat-icon-wrapper color-green">
                <MapPin size={24} />
              </div>
              <span className="stat-number">15+</span>
              <span className="stat-label">Scenic Picnic Zones</span>
            </div>
            
            <div className="stat-card glass-panel card-hover-up">
              <div className="stat-icon-wrapper color-orange">
                <ShieldCheck size={24} />
              </div>
              <span className="stat-number">100%</span>
              <span className="stat-label">Organic Dining</span>
            </div>

            <div className="stat-card glass-panel card-hover-up">
              <div className="stat-icon-wrapper color-blue">
                <Heart size={24} />
              </div>
              <span className="stat-number">8k+</span>
              <span className="stat-label">Happy Visitors</span>
            </div>

            <div className="stat-card glass-panel card-hover-up">
              <div className="stat-icon-wrapper color-purple">
                <Award size={24} />
              </div>
              <span className="stat-number">4.9★</span>
              <span className="stat-label">Google Rating</span>
            </div>
          </div>

          <div className="about-quote-card glass-panel">
            <p className="quote-text">
              "We had the best family gathering here. The food was cooked on traditional chulhas, 
              giving it an amazing authentic flavor, and the children absolutely loved playing on the lawns!"
            </p>
            <div className="quote-author">
              <div className="author-avatar">SK</div>
              <div className="author-details">
                <span className="author-name">Saurabh Kedar</span>
                <span className="author-title">Family Visitor, Pune</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
