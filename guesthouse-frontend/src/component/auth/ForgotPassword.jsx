import React, { useState } from 'react';

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Password reset link sent to ${email}`);
    setTimeout(onBackToLogin, 3000);
  };

  return (
    <div className="form-box">
      <h2>Forgot Password</h2>
      {message && <div className="error-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p className="toggle-text" onClick={onBackToLogin}>
        Back to Login
      </p>
    </div>
  );
};

export default ForgotPassword;