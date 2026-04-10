import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
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

  const handleHashClick = (e, targetId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
          <img src="/logo.png" alt="GSA Logo" className="navbar-logo" />
        </Link>
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}>Home</Link>
          <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
          <a href="/#about" onClick={(e) => handleHashClick(e, 'about')}>About</a>
          <a href="/#classes" onClick={(e) => handleHashClick(e, 'classes')}>Programs</a>
          <Link to="/store" onClick={() => setIsMobileMenuOpen(false)}>Store</Link>
          <a href="/#contact" className="btn-join" onClick={(e) => handleHashClick(e, 'contact')}>Contact Us</a>
          <Link to="/admin" className="admin-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Admin Dashboard">
            <FaUserCog size={24} />
          </Link>
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
