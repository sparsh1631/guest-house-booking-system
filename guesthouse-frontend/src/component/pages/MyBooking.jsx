import React from 'react';
import Sidebar from '../component/Sidebar';
import '../component/LandingPage.css';

const MyBooking = () => (
  <div className="landing-container">
    <Sidebar />
    <div className="main-content">
      <h2>My Booking</h2>
      <p>This is where user bookings will be shown.</p>
    </div>
  </div>
);

export default MyBooking;
