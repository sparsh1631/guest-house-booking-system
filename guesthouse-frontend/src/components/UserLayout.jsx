import React from 'react';
import UserSidebar from './UserSidebar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import '../styles/dashboard.css';

// Layout wrapper for USER pages
const UserLayout = ({ children }) => {
  return (
    <div className="dashboard-wrapper">
      <UserSidebar />
      <div className="main-content">
        <TopNavbar />
        <div className="content-area p-4">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
