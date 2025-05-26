// App.js
import React, { useState } from 'react';
import LoginPage from './component/auth/Loginpage';
import RegisterPage from './component/auth/RegisterPage';
import ForgotPassword from './component/auth/ForgotPassword';
import './component/auth/auth.css';
import LandingPage from './component/user/landingPage';


function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'forgot', 'register'

  return (
    <div className="auth-container">
      {currentView === 'login' && (
     <LoginPage
        onForgotPassword={() => setCurrentView('forgot')}
        onSwitchToRegister={() => setCurrentView('register')}
        onLoginSuccess={() => setCurrentView('landing')}  
    />

      )}
      {currentView === 'forgot' && (
        <ForgotPassword onBackToLogin={() => setCurrentView('login')} />
      )}
      {currentView === 'register' && (
        <RegisterPage onBackToLogin={() => setCurrentView('login')} />
      )}
      {currentView === 'landing' && (
        <LandingPage />
      )}   
    </div>
  );
}

export default App;
