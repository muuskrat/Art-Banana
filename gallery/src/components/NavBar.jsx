import React from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/yourhandle' },
  { name: 'X/Twitter', url: 'https://www.x.com/yourhandle' },
  { name: 'Contact', url: 'mailto:you@example.com' },
];

export default function NavBar() {
  return (
    // Framer Motion for a subtle intro animation for the entire bar
    <motion.nav 
      className="main-nav"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 1. Artist Name / Logo */}
      <div className="nav-name">
        <a href="/">
          Dane Coonboy Gallery
        </a>
      </div>

      {/* 2. Main Links (About) */}
      <div className="nav-links">
        <a href="/" className="nav-link-item">
          Home
        </a>
        <a href="about" className="nav-link-item">
          About
        </a>
      </div>
      
      {/* 3. Social Media Links */}
      <div className="nav-socials">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-item"
          >
            {link.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}