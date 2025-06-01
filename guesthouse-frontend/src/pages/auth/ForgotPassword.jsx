import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim()) {
      setErrors('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors('Invalid email format');
      return false;
    }
    setErrors('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setSuccessMessage('Reset token sent to your email.');
      setServerError('');
      setEmail('');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2>Forgot Password</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors('');
              }}
            />
            {errors && <div className="invalid-feedback">{errors}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
        </form>

        <div className="mt-3 text-center">
          <p>
            Remembered your password?{' '}
            <a href="#!" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
