import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo">
            <img src="/logo.png" alt="GSA Logo" className="footer-logo" />
          </div>
          <p className="footer-desc">
            Inspiring excellence in every stroke. Join the community of passionate swimmers today.
          </p>
        </div>
        
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/store">Store</Link></li>
            <li><a href="/#features">Programs</a></li>
            <li><a href="/#about">About Us</a></li>
            <li><a href="/#classes">Schedule</a></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📍 6th October, Bashayer</p>
          <p>📞 012 03333204</p>
          <p>✉️ goldenswimmingacademy@gmail.com</p>
          <div className="social-links">
            <a href="https://facebook.com/golden.swimming.academy.gsa" target="_blank" rel="noreferrer">FB</a>
            <a href="https://instagram.com/golden.swimming.academy.gsa" target="_blank" rel="noreferrer">IG</a>
            <a href="https://tiktok.com/@golden.swimming.academy.gsa" target="_blank" rel="noreferrer">TT</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Golden Swimming Academy. All rights reserved.</p>
          <Link to="/admin" className="admin-link-footer">🔑 Admin Access</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
