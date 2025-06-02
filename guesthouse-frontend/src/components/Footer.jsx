import React from 'react';
import '../styles/footer.css';

// Shared footer across all pages
const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center">
      <div className="container p-2">
        <small>&copy; 2025 Guest House Booking App. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
