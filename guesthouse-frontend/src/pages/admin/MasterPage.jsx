import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const MasterPage = () => {
  return (
    <Container fluid className="p-4">
      <div className="content-header">
        <h2 className="mb-3">Master Settings</h2>
        <p className="text-muted">Manage guest house settings and configurations.</p>
      </div>

      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">Room Types</h5>
              <p className="text-muted">Configure different types of rooms available in the guest house.</p>
              <ul className="list-unstyled">
                <li>✓ Add/Edit room types</li>
                <li>✓ Set room capacities</li>
                <li>✓ Define amenities</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">Pricing</h5>
              <p className="text-muted">Manage room rates and special pricing rules.</p>
              <ul className="list-unstyled">
                <li>✓ Set base rates</li>
                <li>✓ Configure seasonal pricing</li>
                <li>✓ Define special rates</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">Policies</h5>
              <p className="text-muted">Set booking policies and house rules.</p>
              <ul className="list-unstyled">
                <li>✓ Booking rules</li>
                <li>✓ Cancellation policy</li>
                <li>✓ House guidelines</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">User Management</h5>
              <p className="text-muted">Manage user roles and permissions.</p>
              <ul className="list-unstyled">
                <li>✓ User roles</li>
                <li>✓ Access control</li>
                <li>✓ Staff accounts</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">Maintenance</h5>
              <p className="text-muted">Schedule and track room maintenance.</p>
              <ul className="list-unstyled">
                <li>✓ Maintenance schedule</li>
                <li>✓ Room status</li>
                <li>✓ Service records</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">Reports</h5>
              <p className="text-muted">Generate and view system reports.</p>
              <ul className="list-unstyled">
                <li>✓ Booking reports</li>
                <li>✓ Revenue analysis</li>
                <li>✓ Occupancy stats</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MasterPage;
