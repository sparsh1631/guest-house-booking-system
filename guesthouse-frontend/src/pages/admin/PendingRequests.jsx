import React from 'react';
import { Container, Card, Table, Badge, Button } from 'react-bootstrap';

const PendingRequests = () => {
  // This will be replaced with actual data fetching logic
  const mockPendingRequests = [
    {
      id: 1,
      guestName: 'John Doe',
      roomType: 'Deluxe',
      checkIn: '2024-03-25',
      checkOut: '2024-03-27',
      status: 'pending'
    },
    {
      id: 2,
      guestName: 'Jane Smith',
      roomType: 'Standard',
      checkIn: '2024-03-26',
      checkOut: '2024-03-28',
      status: 'pending'
    }
  ];

  return (
    <Container fluid className="p-4">
      <div className="content-header">
        <h2 className="mb-3">Pending Requests</h2>
        <p className="text-muted">Review and manage pending booking requests.</p>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Guest Name</th>
                <th>Room Type</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPendingRequests.map((request) => (
                <tr key={request.id}>
                  <td>#{request.id}</td>
                  <td>{request.guestName}</td>
                  <td>{request.roomType}</td>
                  <td>{request.checkIn}</td>
                  <td>{request.checkOut}</td>
                  <td>
                    <Badge bg="warning" text="dark">
                      {request.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="success" size="sm" className="me-2">
                      Approve
                    </Button>
                    <Button variant="danger" size="sm">
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PendingRequests;
