import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Reports = () => {
  return (
    <Container fluid className="p-4">
      <div className="content-header">
        <h2 className="mb-3">Reports & Analytics</h2>
        <p className="text-muted">View detailed reports and analytics about guest house operations.</p>
      </div>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Booking Statistics</h5>
              <div className="text-center p-4">
                <p className="text-muted">Booking statistics visualization will be implemented here.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Revenue Analysis</h5>
              <div className="text-center p-4">
                <p className="text-muted">Revenue analysis chart will be implemented here.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Occupancy Rates</h5>
              <div className="text-center p-4">
                <p className="text-muted">Occupancy rate trends will be displayed here.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">User Activity</h5>
              <div className="text-center p-4">
                <p className="text-muted">User activity metrics will be shown here.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
