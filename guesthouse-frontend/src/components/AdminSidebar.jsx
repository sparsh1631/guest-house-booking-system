import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

// Sidebar for ADMIN role
const AdminSidebar = () => {
  return (
    <div className="sidebar bg-light">
      <h5 className="text-center mt-3">Admin Panel</h5>
      <Nav className="flex-column p-3">
        <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/admin/reservation-list" className="nav-link">Reservation List</Link>
        <Link to="/admin/pending-requests" className="nav-link">Pending Requests</Link>
        <Link to="/admin/reports" className="nav-link">Reports</Link>
        <Link to="/admin/master" className="nav-link">Master Page</Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
