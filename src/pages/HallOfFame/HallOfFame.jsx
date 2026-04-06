import React, { useEffect, useState } from 'react';
import './HallOfFame.css';

const MOCK_HONORED = [
  { id: 1, name: 'Yassin Mohamed', title: 'Athlete of the Month', year: 'March 2024', image: '/yassin.png' },
  { id: 2, name: 'Laila Hassan', title: 'National Gold medalist', year: '2023 Season', image: '/laila.png' },
  { id: 3, name: 'Omar Sherif', title: 'Best Performance - Juniors', year: 'Elite Squad', image: '/omar.png' },
];

const HallOfFame = () => {
  const [members, setMembers] = useState(MOCK_HONORED);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="hall-of-fame-page">
      <div className="hof-hero">
        <div className="container">
          <div className="hof-badge animate-fade">🏆 GOLDEN LEGACY</div>
          <h1 className="hof-title animate-slide-up">Our <span className="gold-text">Gallery</span></h1>
          <p className="hof-subtitle animate-fade">Celebrating the exceptional talent and dedication of our golden athletes.</p>
        </div>
      </div>

      <section className="hof-grid-section">
        <div className="container">
          <div className="hof-grid">
            {members.map((member, index) => (
              <div 
                key={member.id} 
                className="hof-card animate-scale" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="card-outer-glow" />
                <div className="hof-card-inner">
                  <div className="hof-image-wrap">
                    {member.image ? (
                      <img src={member.image} alt={member.name} />
                    ) : (
                      <div className="hof-placeholder">🏊‍♂️</div>
                    )}
                    <div className="card-badge">TOP TIER</div>
                  </div>
                  <div className="hof-info">
                    <h3 className="hof-name">{member.name}</h3>
                    <p className="hof-member-title">{member.title}</p>
                    <div className="hof-footer">
                      <span className="hof-year">{member.year}</span>
                      <div className="hof-star">★ ★ ★</div>
                    </div>
                  </div>
                  <div className="card-gold-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="bg-gradient-spot spot-1" />
      <div className="bg-gradient-spot spot-2" />
    </div>
  );
};

export default HallOfFame;
