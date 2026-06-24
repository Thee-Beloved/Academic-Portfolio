import React, { useState } from 'react';
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

// Initialize EmailJS
emailjs.init('FD4N-W7eu9DfHhyr1');

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_s7cucwd',
        'template_x0ml2zn',
        {
          to_email: 'mugim4325@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email
        }
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-title text-inventory-title">Let's Connect</h2>
        <p className="page-subtitle">Send me a message about collaborations, opportunities, or technical discussions.</p>
      </div>

      <div className="contact-content-grid">
        {/* Contact Form */}
        <div className="glass-card contact-form-card">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Share your thoughts, questions, or proposal..."
                rows="6"
                disabled={isSubmitting}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="form-success-message">
                <CheckCircle size={18} />
                <span>Message sent successfully! I'll get back to you soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-error-message">
                <AlertCircle size={18} />
                <span>Oops! Something went wrong. Please try again or email directly.</span>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary contact-submit-btn"
              disabled={isSubmitting}
            >
              <Send size={16} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info Card */}
        <div className="glass-card contact-info-card">
          <h3>Contact Information</h3>
          
          <div className="contact-info-item">
            <div className="contact-icon">
              <Mail size={20} />
            </div>
            <div className="contact-details">
              <h4>Email</h4>
              <a href="mailto:mugim4325@gmail.com" className="contact-link">
                mugim4325@gmail.com
              </a>
              <p className="contact-note">Fastest way to reach me</p>
            </div>
          </div>

          <div className="contact-separator"></div>

          <div className="contact-info-links">
            <h4>Connect On Social</h4>
            <div className="social-links-contact">
              <a href="https://linkedin.com/in/moses-mugi-52a553355" target="_blank" rel="noreferrer" className="social-link-item">
                <span className="link-label">LinkedIn</span>
                <span className="link-arrow">→</span>
              </a>
              <a href="https://github.com/Thee-Beloved" target="_blank" rel="noreferrer" className="social-link-item">
                <span className="link-label">GitHub</span>
                <span className="link-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="contact-separator"></div>

          <div className="response-time">
            <div className="response-badge">
              <span className="online-indicator"></span>
              Typically respond within 24-48 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
