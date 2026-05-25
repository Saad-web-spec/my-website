import React, { useState, useCallback } from 'react';
import { IconMap } from '../Icons';
import { TiltCard } from '../ui/TiltCard';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error

  const CheckIcon = IconMap['Check'];
  const SendIcon = IconMap['Send'];
  const CopyIcon = IconMap['Copy'];
  const WhatsAppIcon = IconMap['WhatsApp'];
  const FacebookIcon = IconMap['Facebook'];
  const XIcon = IconMap['X'];
  const InstagramIcon = IconMap['Instagram'];

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('maliksaad2443@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xpqnlwra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title reveal" data-aos="fade-up">Get In Touch</h2>
        <p className="section-subtitle reveal" data-aos="fade-up">Have an interesting project, question, or want to collaborate? Drop a message!</p>
        <div className="section-divider reveal" data-aos="fade-up" />

        <div className="contact-wrapper">
          {/* Contact Form wrapped in static glass-card to prevent 3D transform click interference */}
          <div className="glass-card contact-form-card reveal" data-aos="fade-up">
            <h3 className="contact-form-heading">Send Me a Message</h3>
            <form className="contact-form" onSubmit={handleFormSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className={`form-input${formErrors.name ? ' form-input-error' : ''}`}
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
                {formErrors.name && <span className="form-error">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className={`form-input${formErrors.email ? ' form-input-error' : ''}`}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
                {formErrors.email && <span className="form-error">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`form-input form-textarea${formErrors.message ? ' form-input-error' : ''}`}
                  placeholder="Write your message..."
                  rows="5"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                />
                {formErrors.message && <span className="form-error">{formErrors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn-primary contact-submit-btn"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? (
                  <>Sending...</>
                ) : formStatus === 'success' ? (
                  <>
                    <CheckIcon /> Message Sent!
                  </>
                ) : (
                  <>
                    <SendIcon /> Send Message
                  </>
                )}
              </button>

              {formStatus === 'error' && (
                <p className="form-status-error">
                  Something went wrong. Please try again or email me at maliksaad2443@gmail.com.
                </p>
              )}
              {formStatus === 'success' && (
                <p className="form-status-success">Thanks! I'll get back to you soon.</p>
              )}
            </form>
          </div>

          {/* Contact Info Card wrapped in static glass-card to prevent click interference */}
          <div className="glass-card contact-card reveal" data-aos="fade-up" data-aos-delay="150">
            <div className="contact-label">Email</div>
            <div className="email-row">
              <span className="email-address">maliksaad2443@gmail.com</span>
              <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
                {copied ? (
                  <>
                    <CheckIcon /> Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon /> Copy
                  </>
                )}
              </button>
            </div>

            <div className="contact-divider" />
            <div className="contact-socials-label">Find me on</div>
            <div className="contact-socials contact-socials--horizontal">
              <a
                href="https://wa.me/message/SEUXWPS46POGF1?src=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.facebook.com/share/189N5ahB5J/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://x.com/Cheme1569231"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="X"
              >
                <XIcon />
              </a>
              <a
                href="https://www.instagram.com/i_m_arsonist?igsh=OGdiOW11a3J5bGlq"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
