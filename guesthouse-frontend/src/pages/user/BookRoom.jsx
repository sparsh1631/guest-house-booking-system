import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/dashboard.css";
import { Card, Col, Row, Container } from 'react-bootstrap';

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
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    // Check authentication on component mount
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      setMessage('Please login to book a room.');
      return;
    }

    axios.get('http://localhost:8080/api/user/guesthouses', getAuthHeader())
      .then(res => setGuesthouses(res.data))
      .catch(err => {
        console.error("Error fetching guesthouses", err);
        if (err.response?.status === 403) {
          setMessage('Session expired. Please login again.');
        }
      });
  }, []);

  useEffect(() => {
    if (formData.guesthouseId) {
      console.log('Fetching rooms for guesthouse:', formData.guesthouseId);
      axios.get(`http://localhost:8080/api/user/guesthouses/${formData.guesthouseId}/rooms`, getAuthHeader())
        .then(res => {
          console.log('Rooms received:', res.data);
          setRooms(res.data);
        })
        .catch(err => {
          console.error("Error fetching rooms:", err.response?.data);
          console.error("Error status:", err.response?.status);
          console.error("Full error:", err);
        });
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
      const token = localStorage.getItem('token');

      if (!token || !userId) {
        setMessage('Please login to book a room.');
        return;
      }

      // Add validation for roomId
      if (!formData.roomId) {
        setMessage('Please select a room.');
        return;
      }

      // Log all the values before creating bookingData
      console.log('User ID from localStorage:', userId);
      console.log('Token from localStorage:', token ? 'Present' : 'Missing');
      console.log('Room ID from form:', formData.roomId);
      console.log('All form data:', formData);

      const parsedUserId = parseInt(userId, 10);
      const parsedRoomId = parseInt(formData.roomId, 10);

      if (isNaN(parsedUserId)) {
        setMessage('Invalid user ID. Please login again.');
        return;
      }

      if (isNaN(parsedRoomId)) {
        setMessage('Invalid room ID. Please select a room again.');
        return;
      }

      const bookingData = {
        userId: parsedUserId,
        roomId: parsedRoomId,
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        guestCount: parseInt(formData.guests, 10) || 1,
        note: formData.purpose,
        status: 'PENDING'
      };

      // Log the final booking data being sent
      console.log('Sending booking data:', JSON.stringify(bookingData, null, 2));

      const response = await axios.post('http://localhost:8080/api/user/bookings', bookingData, getAuthHeader());
      console.log('Booking response:', response.data);
      
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
      console.error('Full error object:', err);
      console.error('Error response data:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      if (err.response?.status === 403) {
        setMessage('Session expired. Please login again.');
      } else if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Booking failed. Please try again.');
      }
    }
  };

  return (
    <Container fluid className="p-0">
      <div className="content-wrapper">
        <div className="content-header">
          <h2 className="mb-2">Book a Room</h2>
          <p className="text-muted mb-4">Reserve rooms for your preferred dates effortlessly.</p>
        </div>

        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                {message && (
                  <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'} mb-4`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Select Guesthouse</label>
                    <select
                      name="guesthouseId"
                      className={`form-select ${errors.guesthouseId ? 'is-invalid' : ''}`}
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
                      className={`form-select ${errors.roomId ? 'is-invalid' : ''}`}
                      value={formData.roomId}
                      onChange={handleChange}
                    >
                      <option value="">-- Choose Room --</option>
                      {rooms.length === 0 && formData.guesthouseId ? (
                        <option disabled>No rooms available for this guesthouse</option>
                      ) : (
                        rooms.map(r => (
                          <option key={r.id} value={r.id}>
                            Room {r.roomNumber} - {r.type} - ₹{r.price}
                          </option>
                        ))
                      )}
                    </select>
                    {errors.roomId && <div className="invalid-feedback">{errors.roomId}</div>}
                  </div>

                  <Row>
                    <Col md={6} className="mb-3">
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
                    </Col>

                    <Col md={6} className="mb-3">
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
                    </Col>
                  </Row>

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

                  <div className="mb-4">
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
    </Container>
  );
};

export default BookRoom;