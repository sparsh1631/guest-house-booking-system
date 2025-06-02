import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

// Common top navbar used in both admin and user layouts
const TopNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" className="shadow">
      <Container>
        <Navbar.Brand>Guest House Booking</Navbar.Brand>
        <Navbar.Text className="ms-auto">Welcome, User</Navbar.Text> {/* You can replace with dynamic name */}
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
