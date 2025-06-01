import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
// Add other imports later
//Register Page
import Register from '../pages/auth/Register';
// Forgot Password page
import ForgotPassword from '../pages/auth/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      {/* Future Routes: Register, ForgotPassword, User, Admin */}
      <Route path="/register" element={<Register />} /> {/*this is for register page */}
      <Route path="/forgot-password" element={<ForgotPassword />} /> {/*this is for forgot password page */}

    </Routes>
  );
};

export default AppRoutes;
