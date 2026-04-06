import React, { useEffect, useRef } from 'react';
import './FeaturesSection.css';

const features = [
  {
    title: 'Beginner Classes',
    desc: 'Learn the fundamentals of swimming in a safe, supportive environment with expert guidance.',
    icon: '🏊',
    color: '#3b9eff'
  },
  {
    title: 'Pro Training',
    desc: 'Refine your technique and build explosive endurance with our elite-level coaching.',
    icon: '⚡',
    color: '#ff6b00'
  },
  {
    title: 'Competitive Squad',
    desc: 'Join our professional team and prepare to compete at national championships.',
    icon: '🏆',
    color: '#ffd700'
  }
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="features-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <p className="section-eyebrow">What We Offer</p>
          <h2 className="section-title">Our <span className="highlight">Programs</span></h2>
          <p className="section-subtitle">Discover the perfect track for your skill level.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card glass-panel reveal"
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ transitionDelay: `${index * 0.15}s`, '--accent': feature.color }}
            >
              <div className="feature-icon-wrap">
                <div className="feature-icon">{feature.icon}</div>
                <div className="icon-glow" />
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.desc}</p>
              <a href="#learn-more" className="feature-link">
                Learn More <span className="arrow">→</span>
              </a>
              <div className="card-accent-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
