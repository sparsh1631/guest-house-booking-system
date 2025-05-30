import React, { useState } from 'react';
import { registerUser } from '../../services/authService';

const Register = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    role: 'user' // Default role
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const validatePassword = (password) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return pattern.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError('');
    setMessage('');

    // Validate password strength
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters, contain uppercase, lowercase and special character.');
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Prepare user data for registration
      const userData = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      // Send registration request
      const response = await registerUser(userData);
      
      // Handle successful registration
      setMessage(response.message || 'Registration successful! Redirecting to login...');
      setError('');

      // Redirect to login after 2 seconds
      setTimeout(onBackToLogin, 2000);
    } catch (err) {
      // Handle different error formats
      let errorMessage = 'Registration failed';
      
      if (err.response) {
        // Backend returned an error response
        errorMessage = err.response.data?.message || 
                       err.response.data?.error || 
                       JSON.stringify(err.response.data);
      } else if (err.message) {
        // Network or other error
        errorMessage = err.message;
      }

      setError(errorMessage);
      setMessage('');
    }
  };

  return (
    <div className="form-box">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Username" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text"  // Changed back to text input as requested
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required 
        />
        {/* Hidden role field */}
        <input 
          type="hidden" 
          name="role" 
          value={formData.role} 
        />
        <button type="submit">Register</button>
      </form>
      <p className="toggle-text" onClick={onBackToLogin}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default Register;