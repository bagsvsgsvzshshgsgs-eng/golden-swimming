import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="GSA Logo" className="navbar-logo" />
        </Link>
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/store" onClick={() => setIsMobileMenuOpen(false)}>Store</Link>
          <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
          <a href="/#features" onClick={() => setIsMobileMenuOpen(false)}>Programs</a>
          <a href="/#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="/#classes" onClick={() => setIsMobileMenuOpen(false)}>Schedule</a>
          <a href="/#contact" className="btn-join" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
        </nav>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
