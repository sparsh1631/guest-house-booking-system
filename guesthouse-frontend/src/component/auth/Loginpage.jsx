import React, { useState } from 'react';

const Login = ({ onSwitchToRegister, onForgotPassword,  onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    console.log('Login submitted:', formData);
    onLoginSuccess();
    
  };

  return (
    <div className="form-box">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
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
        <button type="submit">Login</button>
      </form>
      <p className="toggle-text" onClick={onForgotPassword}>Forgot Password?</p>
      <p className="toggle-text" onClick={onSwitchToRegister}>
        Don't have an account? Register
      </p>
    </div>
  );
};

export default Login;