import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Clear any existing session data
      localStorage.clear();
      
      // Login request
      console.log('Sending login request with:', formData);
      const res = await axios.post('http://localhost:8080/api/auth/login', formData);
      console.log('Login response:', res.data);
      const token = res.data.token;
      
      // Fetch user info using token
      console.log('Fetching user info with token:', token);
      const userInfoRes = await axios.get('http://localhost:8080/api/auth/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('User info response:', userInfoRes.data);

      // The role is in userInfoRes.data.token
      const role = userInfoRes.data.token;
      console.log('User role:', role);
      
      // Store user information
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.email.split('@')[0]);

      // Navigate based on role
      console.log('Navigating based on role:', role);
      if (role === 'ADMIN') {
        console.log('Redirecting to admin dashboard');
        navigate('/admin/dashboard');
      } else {
        console.log('Redirecting to user dashboard');
        navigate('/user/dashboard');
      }

      // Force a page reload to ensure clean state
      window.location.reload();
      
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.status === 401) {
        setServerError('Invalid email or password');
      } else {
        setServerError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2>Login</h2>
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <div className="mt-3 text-center">
          <p>Don't have an account? <a href="/register">Register</a></p>
          <p><a href="/forgot-password">Forgot Password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
