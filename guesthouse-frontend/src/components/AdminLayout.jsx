import React from 'react';
import AdminSidebar from './AdminSidebar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import '../styles/dashboard.css';

// Layout wrapper for ADMIN pages
const AdminLayout = ({ children }) => {
  return (
    <div className="dashboard-wrapper">
      <AdminSidebar />
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

export default AdminLayout;
