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
import BookingStatus from '../pages/user/BookingStatus';

// Import layout component that wraps user pages with sidebar/navbar/footer
import UserLayout from '../components/UserLayout';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* USER ROUTES (With Layout) */}
      <Route path="/user" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="book-room" element={<BookRoom />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="booking-status" element={<BookingStatus />} />
      </Route>

      {/* FALLBACK ROUTE */}
      <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
