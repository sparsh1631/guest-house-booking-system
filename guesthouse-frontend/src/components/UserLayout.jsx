import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import '../styles/dashboard.css';

// Layout wrapper for USER pages
const UserLayout = () => {
  return (
    <div className="dashboard-wrapper">
      <UserSidebar />
      <div className="main-content">
        <TopNavbar />
        <div className="content-area">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
