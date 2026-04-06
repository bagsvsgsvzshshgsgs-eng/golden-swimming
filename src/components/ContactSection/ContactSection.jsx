import React, { useState, useEffect, useRef } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', level: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    if (leftRef.current)  observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const msg =
      `🏊‍♂️ *طلب تسجيل جديد - Golden Swimming Academy*\n\n` +
      `👤 الاسم: ${formData.name}\n` +
      `📱 الموبايل: ${formData.phone}\n` +
      `🎯 المستوى: ${formData.level}\n` +
      (formData.message ? `💬 ملاحظات: ${formData.message}\n` : '');

    const whatsapp = '201203333204';
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', level: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      {/* Background decoration */}
      <div className="contact-bg-glow" />

      <div className="container contact-container">

        {/* LEFT — Info */}
        <div className="contact-info reveal-left" ref={leftRef}>
          <p className="section-eyebrow">Connect With Us</p>
          <h2 className="section-title">Contact <span className="highlight">Us</span></h2>
          <p className="contact-desc">
            Ready to dive in? Fill out the form and our team will reach out within 24 hours to get you started.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Location</strong>
                <p>6th October, Bashayer</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div>
                <strong>WhatsApp</strong>
                <p>+20 120 333 3204</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <div>
                <strong>Working Hours</strong>
                <p>Mon – Fri: 4 PM – 9 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="contact-form-wrap reveal-right" ref={rightRef}>
          {submitted ? (
            <div className="success-state">
              <div className="success-icon">🎉</div>
              <h3>Request Sent!</h3>
              <p>WhatsApp is opening with your details. We'll be in touch soon!</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <h3 className="form-title">Send a Message</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>👤 Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ahmed Mohamed"
                  />
                </div>
                <div className="form-group">
                  <label>📱 Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="01203333204"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>🎯 Swimming Level</label>
                <select name="level" value={formData.level} onChange={handleChange} required>
                  <option value="" disabled>Select your level...</option>
                  <option value="Beginner">🏊 Beginner — I'm just starting out</option>
                  <option value="Intermediate">⚡ Intermediate — I know the basics</option>
                  <option value="Advanced">🏆 Advanced — I compete / train seriously</option>
                  <option value="Kids">👦 Kids Program (Under 12)</option>
                </select>
              </div>

              <div className="form-group">
                <label>💬 Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any questions or special requirements..."
                />
              </div>

              <button type="submit" className="btn-submit">
                <span>Send via WhatsApp 💬</span>
                <div className="btn-shimmer" />
              </button>

              <p className="form-note">We'll respond within 24 hours. No spam, ever.</p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
