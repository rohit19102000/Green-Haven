import React from 'react';
import { Check, ShieldCheck, Heart, MapPin, Award } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './About.css';

export default function About() {
  const [revealRef, isRevealed] = useIntersectionObserver({ triggerOnce: true });

  const features = [
    { title: 'Bespoke Styled Themes', desc: 'From boho-chic to classic romance, we design and coordinate themes that perfectly match your vision.' },
    { title: '100% Turnkey Service', desc: 'We handle everything from delivery and setup to cleanup. All you have to do is show up and enjoy.' },
    { title: 'Gourmet Collaborations', desc: 'Indulge in curated charcuterie boards, local pastries, and custom food options tailored for your event.' },
    { title: 'Scenic DFW Locations', desc: 'Select from our curated list of scenic local parks, lakeshores, or the comfort of your own backyard.' }
  ];

  return (
    <section id="about" className="section about-section">
      <div 
        ref={revealRef} 
        className={`container about-container reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
      >
        {/* Left text column */}
        <div className="about-text-content">
          <span className="badge">Our Passion</span>
          <h2 className="title-lg about-title">
            About <span className="text-primary">Uptown Picnic Co.</span>
          </h2>
          <p className="about-paragraph">
            Uptown Picnic Company is a luxury picnic and event experience company serving the Dallas-Fort Worth area. 
            We specialize in creating styled, custom pop-up picnic experiences that turn ordinary days into unforgettable memories. 
            Whether you are planning a romantic proposal, celebrating a birthday, hosting a baby shower, or organizing a corporate gathering, 
            our dedicated team coordinates every design detail so you can relax and celebrate in style.
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
              <span className="stat-number">DFW</span>
              <span className="stat-label">Service Area</span>
            </div>
            
            <div className="stat-card glass-panel card-hover-up">
              <div className="stat-icon-wrapper color-orange">
                <ShieldCheck size={24} />
              </div>
              <span className="stat-number">100%</span>
              <span className="stat-label">Turnkey Service</span>
            </div>

            <div className="stat-card glass-panel card-hover-up">
              <div className="stat-icon-wrapper color-blue">
                <Heart size={24} />
              </div>
              <span className="stat-number">1k+</span>
              <span className="stat-label">Happy Guests</span>
            </div>

            <div className="stat-card glass-panel card-hover-up">
              <div className="stat-icon-wrapper color-purple">
                <Award size={24} />
              </div>
              <span className="stat-number">5.0★</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>

          <div className="about-quote-card glass-panel">
            <p className="quote-text">
              "Uptown Picnic Co. made our wedding anniversary proposal absolutely magical! The Boho Dream setup at Turtle Creek Park was stunning, down to the custom message board and flower choices. 10/10 turnkey service!"
            </p>
            <div className="quote-author">
              <div className="author-avatar">SH</div>
              <div className="author-details">
                <span className="author-name">Sarah H.</span>
                <span className="author-title">Dallas Resident</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
