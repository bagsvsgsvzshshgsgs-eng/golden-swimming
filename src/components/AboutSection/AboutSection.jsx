import React, { useEffect, useRef } from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const contentRef = useRef(null);
  const imageRef   = useRef(null);
  const listRefs   = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    if (contentRef.current) observer.observe(contentRef.current);
    if (imageRef.current)   observer.observe(imageRef.current);
    listRefs.current.forEach((el) => { if (el) observer.observe(el); });

    return () => observer.disconnect();
  }, []);

  const points = [
    'State-of-the-art water filtration systems',
    'Low student-to-instructor ratio',
    'Flexible schedules for all ages',
    'Advanced video analysis for technique',
  ];

  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        <div className="about-content reveal-left" ref={contentRef}>
          <p className="section-eyebrow">Why Us</p>
          <h2 className="section-title">Why Choose <span className="highlight">Golden Swimming</span>?</h2>
          <p className="about-text">
            For over a decade, we have been dedicated to producing top-tier athletes and confident swimmers.
            Our facility features Olympic-sized pools and our program is directed by internationally certified coaches.
          </p>
          <ul className="about-list">
            {points.map((point, i) => (
              <li
                key={i}
                className="reveal"
                ref={(el) => (listRefs.current[i] = el)}
                style={{ transitionDelay: `${i * 0.1 + 0.2}s` }}
              >
                <span className="bullet">
                  <span className="bullet-inner" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <button className="btn-primary">Meet Our Coaches</button>
        </div>

        <div className="about-image-grid reveal-right" ref={imageRef}>
          <div className="image-placeholder image-1">
            <div className="img-overlay" />
          </div>
          <div className="image-placeholder image-2">
            <div className="img-overlay" />
          </div>
          <div className="image-placeholder image-3">
            <div className="img-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
