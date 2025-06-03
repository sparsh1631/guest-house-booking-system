import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/dashboard.css';

// Sidebar for ADMIN role
const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h5 className="text-center mt-3 mb-4">Admin Panel</h5>
      <Nav className="flex-column">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-grid me-2"></i>
          Dashboard
        </NavLink>

        <NavLink 
          to="/admin/reservation-list" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-calendar-week me-2"></i>
          Reservation List
        </NavLink>

        <NavLink 
          to="/admin/pending-requests" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-hourglass-split me-2"></i>
          Pending Requests
        </NavLink>

        <NavLink 
          to="/admin/reports" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-graph-up me-2"></i>
          Reports
        </NavLink>

        <NavLink 
          to="/admin/master" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-gear me-2"></i>
          Master Settings
        </NavLink>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
