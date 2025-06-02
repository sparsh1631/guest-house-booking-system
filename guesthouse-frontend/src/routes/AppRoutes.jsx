import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import authentication pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Import user dashboard-related pages
import UserDashboard from '../pages/user/UserDashboard';
import BookRoom from '../pages/user/BookRoom';
import MyBookings from '../pages/user/MyBookings';

//  Import layout component that wraps user pages with sidebar/navbar/footer
import UserLayout from '../components/UserLayout';

const AppRoutes = () => {
  return (
    <Routes>

      {/*AUTH ROUTES*/}
      {/* These routes do not require any layout (used for login/register/forgot password) */}
      <Route path="/" element={<Login />} />                      {/* Default route */}
      <Route path="/login" element={<Login />} />                {/* Login page */}
      <Route path="/register" element={<Register />} />          {/* Register page */}
      <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot password */}

      {/* USER ROUTES (With Layout) */}
      {/* These are user-accessible pages, wrapped with layout including sidebar/navbar/footer */}
      <Route 
        path="/dashboard" 
        element={
          <UserLayout>                {/* UserLayout adds sidebar/navbar/footer */}
            <UserDashboard />         {/* Actual page content */}
          </UserLayout>
        } 
      />
      
      <Route 
        path="/user/booking" 
        element={
          <UserLayout>
            <BookRoom />
          </UserLayout>
        } 
      />

      <Route 
        path="/user/my-bookings" 
        element={
          <UserLayout>
            <MyBookings />
          </UserLayout>
        } 
      />

      {/*  FALLBACK ROUTE */}
      {/* Any undefined URL will redirect user back to login page */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
