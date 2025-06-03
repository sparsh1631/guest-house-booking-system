import React, { useEffect, useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

// Common top navbar used in both admin and user layouts
const TopNavbar = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <Navbar className="top-navbar">
      <Container fluid className="px-4">
        <Navbar.Brand className="text-white">Welcome to Guest House</Navbar.Brand>
        <div className="d-flex align-items-center">
          {userName && (
            <div className="user-info me-4">
              <div className="user-avatar">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="user-name-container">
                <span className="welcome-text">Welcome,</span>
                <span className="user-name">{userName}</span>
              </div>
            </div>
          )}
          <Button 
            variant="light" 
            size="sm" 
            onClick={handleLogout}
            className="logout-btn"
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
