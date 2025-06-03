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

// Import admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ReservationList from '../pages/admin/ReservationList';
import PendingRequests from '../pages/admin/PendingRequests';
import Reports from '../pages/admin/Reports';
import MasterPage from '../pages/admin/MasterPage';
import GuestHouseManagement from '../pages/admin/GuestHouseManagement';
import RoomManagement from '../pages/admin/RoomManagement';

// Import layouts and protected route
import UserLayout from '../components/UserLayout';
import AdminLayout from '../components/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Routes - Place these before user routes for priority */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="reservation-list" element={<ReservationList />} />
        <Route path="pending-requests" element={<PendingRequests />} />
        <Route path="reports" element={<Reports />} />
        <Route path="master" element={<MasterPage />} />
        <Route path="guest-houses" element={<GuestHouseManagement />} />
        <Route path="rooms" element={<RoomManagement />} />
      </Route>

      {/* User Routes */}
      <Route 
        path="/user" 
        element={
          <ProtectedRoute allowedRole="USER">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="book-room" element={<BookRoom />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="booking-status" element={<BookingStatus />} />
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<RoleBasedRedirect />} />

      {/* Catch all other routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Helper component to redirect based on role
const RoleBasedRedirect = () => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check for ADMIN role first
  if (userRole === 'ADMIN') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Default to user dashboard
  if (userRole === 'USER') {
    return <Navigate to="/user/dashboard" replace />;
  }

  // If role is neither ADMIN nor USER, redirect to login
  localStorage.clear(); // Clear invalid session
  return <Navigate to="/login" replace />;
};

export default AppRoutes;
