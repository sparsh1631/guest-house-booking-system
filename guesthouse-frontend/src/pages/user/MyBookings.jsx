import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          setError('Please login to view your bookings.');
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/user/bookings/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        if (err.response?.status === 403) {
          setError('Session expired. Please login again.');
        } else {
          setError('Failed to load bookings.');
        }
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Bookings</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <Table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Booking ID</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.checkInDate}</td>
                  <td>{booking.checkOutDate}</td>
                  <td>{booking.guestCount}</td>
                  <td>{booking.status}</td>
                  <td>{booking.note}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
