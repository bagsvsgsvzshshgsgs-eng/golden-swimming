import React, { useEffect, useRef } from 'react';
import './HeroSection.css';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const HeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);

  useEffect(() => {
    const items = [
      { el: titleRef.current, delay: 0 },
      { el: subtitleRef.current, delay: 200 },
      { el: actionsRef.current, delay: 400 },
      { el: badge1Ref.current, delay: 600 },
      { el: badge2Ref.current, delay: 700 },
    ];

    items.forEach(({ el, delay }) => {
      if (!el) return;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
    });
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-particles">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="container hero-content">
        <div className="hero-badge" ref={badge1Ref}>
          <span className="badge-dot" /> Academy Est. 2015
        </div>

        <h1 className="hero-title reveal-hero" ref={titleRef}>
          Master the <span className="highlight">Water</span>
        </h1>
        <p className="hero-subtitle reveal-hero" ref={subtitleRef}>
          Join Golden Swimming Academy. Reach your peak performance with professional coaching and modern facilities.
        </p>
        <div className="hero-actions reveal-hero" ref={actionsRef}>
          <button className="btn-primary" onClick={() => scrollTo('contact')}>Start Training</button>
          <button className="btn-secondary" onClick={() => scrollTo('features')}>View Programs</button>
        </div>

        <div className="hero-stats" ref={badge2Ref}>
          <div className="stat-item">
            <span className="stat-num">500+</span>
            <span className="stat-label">Athletes</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">10+</span>
            <span className="stat-label">Years</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">50+</span>
            <span className="stat-label">Champions</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span />
      </div>
    </section>
  );
};

export default HeroSection;
