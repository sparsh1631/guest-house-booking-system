import React, { useState } from 'react';
import { loginUser } from '../../services/authService';

const Login = ({ onSwitchToRegister, onForgotPassword, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Password rule: at least 8 chars, 1 uppercase, 1 lowercase, 1 special char
  const validatePassword = (password) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return pattern.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters, include upper/lowercase and special character.');
      return;
    }

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });

      setMessage(response.token); // Backend sends success string
      localStorage.setItem('token', response.token); // Store token
      setError('');
      setTimeout(onLoginSuccess, 2000); // Proceed after login
    } catch (err) {
      setError(err.response?.data || 'Login failed');
      setMessage('');
    }
  };

  return (
    <div className="form-box">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p className="toggle-text" onClick={onForgotPassword}>Forgot Password?</p>
      <p className="toggle-text" onClick={onSwitchToRegister}>Don't have an account? Register</p>
    </div>
  );
};

export default Login;





// import React, { useState } from 'react';

// const Login = ({ onSwitchToRegister, onForgotPassword,  onLoginSuccess }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       setError('Please fill in all fields');
//       return;
//     }
//     console.log('Login submitted:', formData);
//     onLoginSuccess();
    
//   };

//   return (
//     <div className="form-box">
//       <h2>Login</h2>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" name="/register">Login</button>
//       </form>
//       <p className="toggle-text" onClick={onForgotPassword}>Forgot Password?</p>
//       <p className="toggle-text" onClick={onSwitchToRegister}>
//         Don't have an account? Register
//       </p>
//     </div>
//   );
// };

// export default Login;