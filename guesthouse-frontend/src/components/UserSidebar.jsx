import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

// Sidebar for regular USER role
const UserSidebar = () => {
  return (
    <div className="sidebar bg-light">
      <h5 className="text-center mt-3">User Panel</h5>
      <Nav className="flex-column p-3">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/user/booking" className="nav-link">Book Room</Link>       
        <Link to="/user/my-bookings" className="nav-link">My Bookings</Link> 
      </Nav>
    </div>
  );
};

export default UserSidebar;
