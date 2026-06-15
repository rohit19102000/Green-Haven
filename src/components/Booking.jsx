import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, CheckCircle, Sparkles, Mail, PhoneCall } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { PACKAGES } from './Cards';
import './Booking.css';

export default function Booking({ selectedPackageId, onSelectPackage }) {
  const [revealRef, isRevealed] = useIntersectionObserver({ triggerOnce: false });
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    guests: 2
  });

  const [pricing, setPricing] = useState({
    basePrice: 0,
    subtotal: 0,
    tax: 0,
    total: 0
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  // Sync selected package ID
  const activePackage = PACKAGES.find(pkg => pkg.id === selectedPackageId) || PACKAGES[0];

  useEffect(() => {
    const base = activePackage ? activePackage.price : 'X';
    if (base === 'X' || typeof base === 'string') {
      setPricing({
        basePrice: 'X',
        subtotal: 'X',
        tax: 'X',
        total: 'X'
      });
    } else {
      const sub = base * formData.guests;
      const taxVal = Math.round(sub * 0.0825); // 8.25% Dallas sales tax
      const totalVal = sub + taxVal;

      setPricing({
        basePrice: base,
        subtotal: sub,
        tax: taxVal,
        total: totalVal
      });
    }
  }, [selectedPackageId, formData.guests, activePackage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const adjustGuests = (amount) => {
    setFormData(prev => {
      const newVal = prev.guests + amount;
      return {
        ...prev,
        guests: newVal < 1 ? 1 : newVal > 100 ? 100 : newVal
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate API reservation request
    const randNum = 'UP-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationNumber(randNum);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      date: '',
      guests: 2
    });
    setIsSubmitted(false);
    onSelectPackage(PACKAGES[0].id);
  };

  // Get today's date in YYYY-MM-DD format for input validation
  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <section id="booking" className="section booking-section">
      <div 
        ref={revealRef} 
        className={`container booking-container reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="section-header">
          <span className="badge">Reservations</span>
          <h2 className="title-lg booking-title">Book Your Picnic</h2>
          <p className="section-subtitle">
            Secure your preferred date and time. No credit card required to request.
          </p>
        </div>

        <div className="booking-card glass-panel">
          {!isSubmitted ? (
            <form onSubmit={handleFormSubmit} className="booking-form-wrapper">
              
              {/* Form Input fields */}
              <div className="booking-inputs">
                <h3 className="form-sub-title">1. Your Details</h3>
                
                <div className="input-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-row-2">
                  <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Enter mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h3 className="form-sub-title pt-4">2. Plan Your Visit</h3>

                <div className="input-row-2">
                  <div className="input-group">
                    <label htmlFor="selectedPackageId">Select Package</label>
                    <select
                      id="selectedPackageId"
                      name="selectedPackageId"
                      value={selectedPackageId}
                      onChange={(e) => onSelectPackage(e.target.value)}
                    >
                      {PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.title} (${pkg.price}/person)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label htmlFor="date">Visit Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      min={getTodayDate()}
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Custom Guest Counter */}
                <div className="guest-counter-group">
                  <label>Number of Guests</label>
                  <div className="counter-controls">
                    <button 
                      type="button" 
                      className="counter-btn" 
                      onClick={() => adjustGuests(-1)}
                      disabled={formData.guests <= 1}
                    >
                      -
                    </button>
                    <span className="counter-value">{formData.guests}</span>
                    <button 
                      type="button" 
                      className="counter-btn" 
                      onClick={() => adjustGuests(1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Pricing Estimate Card Sidebar */}
              <div className="booking-estimate-panel">
                <h3 className="estimate-title">Order Estimate</h3>
                
                <div className="selected-package-summary">
                  <div className="summary-icon">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4>{activePackage.title}</h4>
                    <p>{activePackage.duration}</p>
                  </div>
                </div>

                <div className="price-details-table">
                  <div className="price-row">
                    <span>Base rate:</span>
                    <span>${pricing.basePrice} / guest</span>
                  </div>
                  <div className="price-row">
                    <span>Guests count:</span>
                    <span>{formData.guests}</span>
                  </div>
                  <div className="price-row border-top">
                    <span>Subtotal:</span>
                    <span>${pricing.subtotal}</span>
                  </div>
                  <div className="price-row">
                    <span>Dallas Sales Tax (8.25%):</span>
                    <span>${pricing.tax}</span>
                  </div>
                  <div className="price-row total-row border-top">
                    <span>Estimated Total:</span>
                    <span className="grand-total-value">${pricing.total}</span>
                  </div>
                </div>

                <div className="payment-guarantee">
                  <Users size={16} />
                  <span>No credit card required to submit request.</span>
                </div>

                <button type="submit" className="btn btn-primary btn-submit-booking">
                  Request This Picnic
                </button>
              </div>

            </form>
          ) : (
            /* Successful reservation page layout */
            <div className="booking-success-message animate-scale-in">
              <div className="success-icon-wrapper">
                <CheckCircle size={64} />
              </div>
              <h3 className="success-heading">Booking Request Received!</h3>
              <p className="success-desc">
                Thank you, <strong>{formData.fullName}</strong>. We have received your picnic request. 
                A confirmation has been sent to <strong>{formData.email}</strong>. Our styling coordinator will contact you within 24 hours to confirm date availability and coordinate theme details.
              </p>

              <div className="success-ticket glass-panel">
                <div className="ticket-header">
                  <span className="ticket-logo">UP Uptown Picnic</span>
                  <span className="ticket-id">#{confirmationNumber}</span>
                </div>
                
                <div className="ticket-grid">
                  <div className="ticket-item">
                    <span>Package</span>
                    <strong>{activePackage.title}</strong>
                  </div>
                  <div className="ticket-item">
                    <span>Date</span>
                    <strong>{formData.date}</strong>
                  </div>
                  <div className="ticket-item">
                    <span>Guests</span>
                    <strong>{formData.guests} {formData.guests > 1 ? 'People' : 'Person'}</strong>
                  </div>
                  <div className="ticket-item">
                    <span>Total Cost</span>
                    <strong className="text-primary">${pricing.total}</strong>
                  </div>
                </div>
              </div>

              <div className="success-notice">
                <p><strong>Next Steps:</strong> We will review date availability and reach out to finalize location details and coordinate setup details. Payment instructions will be sent with your finalized invoice.</p>
              </div>

              <button className="btn btn-secondary mt-6" onClick={handleResetForm}>
                Book Another Visit
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
