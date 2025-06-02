import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:8080/api/bookings/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(res.data);
      } catch (err) {
        setError('Failed to load bookings.');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Bookings</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Booking ID</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
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
                  <td>{booking.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
