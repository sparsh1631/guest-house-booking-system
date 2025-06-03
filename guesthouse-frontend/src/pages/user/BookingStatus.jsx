import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, Container } from 'react-bootstrap';

const BookingStatus = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          setError('Please login to view your booking status.');
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/user/bookings/pending`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setPendingBookings(response.data);
      } catch (err) {
        console.error('Error fetching pending bookings:', err);
        if (err.response?.status === 403) {
          setError('Session expired. Please login again.');
        } else {
          setError('Failed to load booking status.');
        }
      }
    };

    fetchPendingBookings();
  }, []);

  return (
    <Container fluid className="p-4">
      <h2 className="mb-3">Booking Status</h2>
      <p className="text-muted mb-4">Check the status of your pending booking requests.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <Card className="shadow-sm">
        <Card.Body>
          {pendingBookings.length === 0 ? (
            <p className="text-center my-4">No pending booking requests found.</p>
          ) : (
            <div className="table-responsive">
              <Table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Booking ID</th>
                    <th>Guesthouse</th>
                    <th>Room</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Status</th>
                    <th>Submitted On</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.guesthouse?.name || '-'}</td>
                      <td>Room {booking.room?.roomNumber || '-'}</td>
                      <td>{booking.checkInDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>
                        <span className={`badge bg-${booking.status === 'PENDING' ? 'warning' : 
                          booking.status === 'APPROVED' ? 'success' : 'danger'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingStatus; 