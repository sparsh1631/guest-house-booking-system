// src/component/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">All Apps</NavLink>
        </li>
        <li>
          <NavLink to="/guest-house" activeClassName="active">Guest House System</NavLink>
        </li>
        <li>
          <NavLink to="/booking" activeClassName="active">Booking Page</NavLink>
        </li>
        <li>
          <NavLink to="/my-booking" activeClassName="active">My Booking</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
