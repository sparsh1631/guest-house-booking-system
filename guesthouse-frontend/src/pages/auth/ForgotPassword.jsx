import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      // Call your backend API to initiate password reset
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setIsSubmitted(true);
      setMessage('Password reset instructions have been sent to your email.');
      setError('');
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.response?.data?.message || 'Failed to process request. Please try again.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2>Forgot Password</h2>
        
        {!isSubmitted ? (
          <>
            <p className="text-muted mb-4">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your email"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Send Reset Instructions
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="alert alert-success">{message}</div>
          </div>
        )}

        <div className="mt-3 text-center">
          <p>Remember your password? <a href="/login">Login</a></p>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
