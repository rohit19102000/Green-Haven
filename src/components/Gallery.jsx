import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Gallery.css';

const GALLERY_IMAGES = [
  {
    id: 1,
    url: '/hero_luxe_picnic.png',
    category: 'boho',
    title: 'Luxe Picnic on the Lawn'
  },
  {
    id: 2,
    url: '/boho_dream_picnic.png',
    category: 'boho',
    title: 'Pampas Grass Boho Styling'
  },
  {
    id: 3,
    url: '/romantic_proposal.png',
    category: 'romantic',
    title: 'Anniversary & Proposals'
  },
  {
    id: 4,
    url: '/garden_party.png',
    category: 'group',
    title: 'Celebrations & Bridal Showers'
  },
  {
    id: 5,
    url: '/sunset_toast.png',
    category: 'details',
    title: 'Charcuterie & Toast Details'
  }
];

export default function Gallery() {
  const [revealRef, isRevealed] = useIntersectionObserver({ triggerOnce: true });
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = filter === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div 
        ref={revealRef} 
        className={`container gallery-container reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="section-header">
          <span className="badge">Visual Tour</span>
          <h2 className="title-lg gallery-title">Scenic Highlights</h2>
          <p className="section-subtitle">
            Explore snapshots of our beautiful setups, themed events, and curated details in DFW.
          </p>
        </div>

        {/* Filter categories */}
        <div className="gallery-filters">
          {['all', 'boho', 'romantic', 'group', 'details'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-item-wrapper"
              onClick={() => openLightbox(index)}
            >
              <img src={image.url} alt={image.title} className="gallery-img" loading="lazy" />
              <div className="gallery-item-overlay">
                <Maximize2 size={24} className="zoom-icon" />
                <span className="gallery-item-title">{image.title}</span>
                <span className="gallery-item-cat">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
            <X size={32} />
          </button>
          
          <button className="lightbox-nav nav-left" onClick={showPrev} aria-label="Previous Image">
            <ChevronLeft size={36} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredImages[lightboxIndex].url} 
              alt={filteredImages[lightboxIndex].title} 
              className="lightbox-img" 
            />
            <div className="lightbox-caption">
              <h3>{filteredImages[lightboxIndex].title}</h3>
              <p>Category: {filteredImages[lightboxIndex].category}</p>
            </div>
          </div>
          
          <button className="lightbox-nav nav-right" onClick={showNext} aria-label="Next Image">
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
}
