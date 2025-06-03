import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css';

// ✅ This is the main user dashboard with cards showing user functionality
const UserDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Container fluid className="dashboard-container p-4">
      <div className="content-header">
        <h2 className="mb-3">Welcome to User Dashboard</h2>
        <p className="text-muted">Manage your bookings and room reservations easily.</p>
      </div>

      <Row className="mt-4 g-4">
        <Col md={4}>
          <Card 
            className="shadow-sm dashboard-card h-100 cursor-pointer"
            onClick={() => handleCardClick('/user/my-bookings')}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex align-items-center">
                <span className="me-2">📅</span>
                My Bookings
              </Card.Title>
              <Card.Text>View your active and previous bookings in one place.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card 
            className="shadow-sm dashboard-card h-100 cursor-pointer"
            onClick={() => handleCardClick('/user/book-room')}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex align-items-center">
                <span className="me-2">🛏️</span>
                Book a Room
              </Card.Title>
              <Card.Text>Reserve rooms for your preferred dates effortlessly.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card 
            className="shadow-sm dashboard-card h-100 cursor-pointer"
            onClick={() => handleCardClick('/user/booking-status')}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex align-items-center">
                <span className="me-2">📋</span>
                Booking Status
              </Card.Title>
              <Card.Text>Check the status of your pending booking requests.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
