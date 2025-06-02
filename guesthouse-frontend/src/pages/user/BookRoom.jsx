import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/dashboard.css";
import { Card, Col, Row } from 'react-bootstrap';

const BookRoom = () => {
  const [formData, setFormData] = useState({
    guesthouseId: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    purpose: ''
  });

  const [guesthouses, setGuesthouses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split('T')[0];

  // Get the authentication token
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/guesthouses', getAuthHeader())
      .then(res => setGuesthouses(res.data))
      .catch(err => console.error("Error fetching guesthouses", err));
  }, []);

  useEffect(() => {
    if (formData.guesthouseId) {
      axios.get(`http://localhost:8080/api/user/guesthouses/${formData.guesthouseId}/rooms`, getAuthHeader())
        .then(res => setRooms(res.data))
        .catch(err => console.error("Error fetching rooms", err));
    } else {
      setRooms([]);
    }
  }, [formData.guesthouseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.guesthouseId) newErrors.guesthouseId = 'Please select a guesthouse';
    if (!formData.roomId) newErrors.roomId = 'Please select a room';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (formData.checkIn && formData.checkOut && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const userId = localStorage.getItem('userId');
      const bookingData = {
        user: { id: userId },
        room: { id: formData.roomId },
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        guestCount: formData.guests,
        note: formData.purpose
      };

      await axios.post('http://localhost:8080/api/user/bookings', bookingData, getAuthHeader());
      setMessage('Booking successful!');
      setFormData({
        guesthouseId: '',
        roomId: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        purpose: ''
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="mb-3">Book a Room</h2>
      <p className="text-muted">Reserve rooms for your preferred dates effortlessly.</p>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm dashboard-card">
            <Card.Body>
              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} mb-4`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Select Guesthouse</label>
                  <select
                    name="guesthouseId"
                    className={`form-control ${errors.guesthouseId ? 'is-invalid' : ''}`}
                    value={formData.guesthouseId}
                    onChange={handleChange}
                  >
                    <option value="">-- Choose Guesthouse --</option>
                    {guesthouses.map(g => (
                      <option key={g.id} value={g.id}>{g.name} - {g.location}</option>
                    ))}
                  </select>
                  {errors.guesthouseId && <div className="invalid-feedback">{errors.guesthouseId}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Select Room</label>
                  <select
                    name="roomId"
                    className={`form-control ${errors.roomId ? 'is-invalid' : ''}`}
                    value={formData.roomId}
                    onChange={handleChange}
                  >
                    <option value="">-- Choose Room --</option>
                    {rooms.map(r => (
                      <option key={r.id} value={r.id}>
                        Room {r.roomNumber} - {r.type} - ₹{r.price}
                      </option>
                    ))}
                  </select>
                  {errors.roomId && <div className="invalid-feedback">{errors.roomId}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Check-in Date</label>
                  <input
                    type="date"
                    name="checkIn"
                    className={`form-control ${errors.checkIn ? 'is-invalid' : ''}`}
                    value={formData.checkIn}
                    onChange={handleChange}
                    min={today}
                  />
                  {errors.checkIn && <div className="invalid-feedback">{errors.checkIn}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Check-out Date</label>
                  <input
                    type="date"
                    name="checkOut"
                    className={`form-control ${errors.checkOut ? 'is-invalid' : ''}`}
                    value={formData.checkOut}
                    onChange={handleChange}
                    min={formData.checkIn || today}
                  />
                  {errors.checkOut && <div className="invalid-feedback">{errors.checkOut}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Number of Guests</label>
                  <input
                    type="number"
                    name="guests"
                    className="form-control"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Purpose / Notes</label>
                  <textarea
                    name="purpose"
                    rows="3"
                    className={`form-control ${errors.purpose ? 'is-invalid' : ''}`}
                    value={formData.purpose}
                    onChange={handleChange}
                  />
                  {errors.purpose && <div className="invalid-feedback">{errors.purpose}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit Booking
                </button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookRoom;
