import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RoomManagement.css';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [guestHouses, setGuestHouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    guest_house_id: '',
    room_number: '',
    type: '',
    price: '',
    status: 'AVAILABLE'
  });

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Add auth token to requests
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [roomsResponse, guestHousesResponse] = await Promise.all([
        api.get('/api/admin/rooms'),
        api.get('/api/admin/guest-houses')
      ]);
      
      // Normalize the response data
      const normalizedRooms = Array.isArray(roomsResponse?.data) ? roomsResponse.data :
                            Array.isArray(roomsResponse) ? roomsResponse : [];
      
      const normalizedGuestHouses = Array.isArray(guestHousesResponse?.data) ? guestHousesResponse.data :
                                  Array.isArray(guestHousesResponse) ? guestHousesResponse : [];
      
      // Map the data to ensure consistent field names
      const mappedRooms = normalizedRooms.map(room => ({
        ...room,
        id: room.id || room._id,
        guest_house_id: room.guestHouseId || room.guest_house_id,
        room_number: room.roomNumber || room.room_number
      }));

      const mappedGuestHouses = normalizedGuestHouses.map(gh => ({
        ...gh,
        id: gh.id || gh._id
      }));

      setRooms(mappedRooms);
      setGuestHouses(mappedGuestHouses);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 403) {
        setError('Access denied. Please make sure you are logged in.');
        // Redirect to login if token is invalid
        if (!localStorage.getItem('token')) {
          window.location.href = '/login';
        }
      } else {
        setError('Failed to load rooms and guest houses. Please try again later.');
      }
      toast.error('Failed to load data');
      // Set empty arrays on error
      setRooms([]);
      setGuestHouses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      guest_house_id: '',
      room_number: '',
      type: '',
      price: '',
      status: 'AVAILABLE'
    });
  };

  const handleShow = (room = null) => {
    if (room) {
      setEditingId(room.id);
      setFormData({
        guest_house_id: room.guest_house_id,
        room_number: room.room_number,
        type: room.type,
        price: room.price,
        status: room.status
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...formData,
        price: parseFloat(formData.price),
        roomNumber: formData.room_number.toString(),
        room_number: formData.room_number.toString()
      };

      if (editingId) {
        await api.put(`/api/admin/rooms/${editingId}`, roomData);
        toast.success('Room updated successfully');
      } else {
        await api.post('/api/admin/rooms', roomData);
        toast.success('Room created successfully');
      }
      handleClose();
      fetchData();
    } catch (error) {
      console.error('Error saving room:', error);
      if (error.response?.status === 403) {
        toast.error('Access denied. Please log in again.');
        window.location.href = '/login';
      } else {
        toast.error(error.response?.data?.message || 'Failed to save room');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await api.delete(`/api/admin/rooms/${id}`);
        toast.success('Room deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting room:', error);
        if (error.response?.status === 403) {
          toast.error('Access denied. Please log in again.');
          window.location.href = '/login';
        } else {
          toast.error(error.response?.data?.message || 'Failed to delete room');
        }
      }
    }
  };

  const getGuestHouseName = (id) => {
    if (!Array.isArray(guestHouses)) return 'Unknown';
    const guestHouse = guestHouses.find(gh => gh && (gh.id === id || gh._id === id));
    return guestHouse ? guestHouse.name : 'Unknown';
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toUpperCase()) {
      case 'AVAILABLE':
        return 'status-available';
      case 'OCCUPIED':
        return 'status-occupied';
      case 'MAINTENANCE':
        return 'status-maintenance';
      default:
        return 'status-available';
    }
  };

  if (loading) {
    return (
      <Container fluid className="p-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="p-4">
        <Alert variant="danger">
          {error}
          <Button variant="outline-danger" size="sm" className="ms-3" onClick={fetchData}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="room-management-container">
      <div className="room-management-header">
        <h2>Room Management</h2>
        <Button variant="primary" className="add-room-btn" onClick={() => handleShow()}>
          <FaPlus /> Add Room
        </Button>
      </div>

      <div className="table-wrapper">
        {rooms.length === 0 ? (
          <div className="empty-state">
            <p>No rooms found</p>
            <Button variant="primary" onClick={() => handleShow()}>
              Add Room
            </Button>
          </div>
        ) : (
          <Table responsive hover className="room-table">
            <thead>
              <tr>
                <th>Guest House</th>
                <th>Room Number</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{getGuestHouseName(room.guest_house_id)}</td>
                  <td className="room-number">{room.roomNumber || room.room_number}</td>
                  <td className="room-type">{room.type}</td>
                  <td className="price-text">₹{room.price}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(room.status)}`}>
                      {room.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Button 
                        variant="link" 
                        className="action-btn edit-btn"
                        onClick={() => handleShow(room)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="link"
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(room.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Room' : 'Add Room'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Guest House</Form.Label>
                  <Form.Select
                    value={formData.guest_house_id}
                    onChange={(e) => setFormData({ ...formData, guest_house_id: e.target.value })}
                    required
                  >
                    <option value="">Select Guest House</option>
                    {guestHouses.map((gh) => (
                      <option key={gh.id} value={gh.id}>
                        {gh.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.room_number}
                    onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Royal">Royal</option>
                    <option value="Royal Delux">Royal Delux</option>
                    <option value="Delux">Delux</option>
                    <option value="DELUXE">DELUXE</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="OCCUPIED">Occupied</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingId ? 'Update' : 'Add'} Room
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomManagement; 