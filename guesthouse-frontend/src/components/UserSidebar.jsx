import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/dashboard.css';

// Sidebar for regular USER role
const UserSidebar = () => {
  return (
    <div className="sidebar">
      <h5 className="text-center mt-3 mb-4">User Panel</h5>
      <Nav className="flex-column">
        <NavLink 
          to="/user/dashboard" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-grid me-2"></i>
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/user/book-room" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-calendar-plus me-2"></i>
          Book Room
        </NavLink>
        
        <NavLink 
          to="/user/my-bookings" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-calendar-check me-2"></i>
          My Bookings
        </NavLink>

        <NavLink 
          to="/user/booking-status" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-clipboard-check me-2"></i>
          Booking Status
        </NavLink>
      </Nav>
    </div>
  );
};

export default UserSidebar;
