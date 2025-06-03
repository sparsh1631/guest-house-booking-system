import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Container fluid className="dashboard-container p-4">
      <div className="content-header">
        <h2 className="mb-3">Admin Dashboard</h2>
        <p className="text-muted">Manage guest house bookings, reservations, and system settings.</p>
      </div>

      <Row className="mt-4 g-4">
        <Col md={4}>
          <Card 
            className="shadow-sm dashboard-card h-100 cursor-pointer"
            onClick={() => handleCardClick('/admin/reservation-list')}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex align-items-center">
                <span className="me-2">📋</span>
                Reservation List
              </Card.Title>
              <Card.Text>
                View and manage all guest house reservations and bookings.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card 
            className="shadow-sm dashboard-card h-100 cursor-pointer"
            onClick={() => handleCardClick('/admin/pending-requests')}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex align-items-center">
                <span className="me-2">⏳</span>
                Pending Requests
              </Card.Title>
              <Card.Text>
                Review and approve pending booking requests from users.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card 
            className="shadow-sm dashboard-card h-100 cursor-pointer"
            onClick={() => handleCardClick('/admin/reports')}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex align-items-center">
                <span className="me-2">📊</span>
                Reports
              </Card.Title>
              <Card.Text>
                Generate and view booking reports and analytics.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card 
            className="shadow-sm dashboard-card h-100 cursor-pointer"
            onClick={() => handleCardClick('/admin/master')}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex align-items-center">
                <span className="me-2">⚙️</span>
                Master Settings
              </Card.Title>
              <Card.Text>
                Manage guest houses, rooms, and system configurations.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card 
            className="shadow-sm dashboard-card h-100"
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex align-items-center">
                <span className="me-2">📈</span>
                Overview
              </Card.Title>
              <div className="d-flex justify-content-around mt-3">
                <div className="text-center">
                  <h3 className="mb-0">0</h3>
                  <small className="text-muted">Total Bookings</small>
                </div>
                <div className="text-center">
                  <h3 className="mb-0">0</h3>
                  <small className="text-muted">Pending</small>
                </div>
                <div className="text-center">
                  <h3 className="mb-0">0</h3>
                  <small className="text-muted">Today's Check-ins</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
