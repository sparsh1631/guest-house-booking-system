import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin 360</h2>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            All Apps
          </NavLink>
        </li>
        <li>
          <NavLink to="/guest-house" className={({ isActive }) => isActive ? 'active' : ''}>
            Guest House System
          </NavLink>
        </li>
        <li>
          <NavLink to="/booking" className={({ isActive }) => isActive ? 'active' : ''}>
            Booking Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-booking" className={({ isActive }) => isActive ? 'active' : ''}>
            My Booking
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
