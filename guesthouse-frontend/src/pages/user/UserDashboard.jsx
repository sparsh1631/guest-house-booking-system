import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

// ✅ This is the main user dashboard with cards showing user functionality
const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="mb-3">Welcome to User Dashboard</h2>
      <p className="text-muted">Manage your bookings and room reservations easily.</p>

      {/* Bootstrap responsive grid with cards */}
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card className="shadow-sm dashboard-card h-100">
            <Card.Body>
              <Card.Title>📅 My Bookings</Card.Title>
              <Card.Text>View your active and previous bookings in one place.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="shadow-sm dashboard-card h-100">
            <Card.Body>
              <Card.Title>🛏️ Book a Room</Card.Title>
              <Card.Text>Reserve rooms for your preferred dates effortlessly.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="shadow-sm dashboard-card h-100">
            <Card.Body>
              <Card.Title>📋 Booking Status</Card.Title>
              <Card.Text>Check the status of your pending booking requests.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
