import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import './auth.css';

const AuthContainer = () => {
  const [currentForm, setCurrentForm] = useState('login');

  return (
    <div className="auth-container">
      {currentForm === 'login' && (
        <Login 
          onSwitchToRegister={() => setCurrentForm('register')}
          onForgotPassword={() => setCurrentForm('forgot')}
        />
      )}
      {currentForm === 'register' && (
        <Register onSwitchToLogin={() => setCurrentForm('login')} />
      )}
      {currentForm === 'forgot' && (
        <ForgotPassword onBackToLogin={() => setCurrentForm('login')} />
      )}
    </div>
  );
};

export default AuthContainer;