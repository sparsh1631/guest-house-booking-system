import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { roomAPI, guestHouseAPI } from '../../utils/api';
import { ROOM_TYPES, ROOM_STATUS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [guestHouses, setGuestHouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    guestHouseId: '',
    roomNumber: '',
    type: ROOM_TYPES.STANDARD,
    totalBeds: 1,
    pricePerNight: 0,
    status: ROOM_STATUS.AVAILABLE
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [roomsResponse, guestHousesResponse] = await Promise.all([
        roomAPI.getAll(),
        guestHouseAPI.getAll()
      ]);
      // Ensure we always have arrays
      setRooms(Array.isArray(roomsResponse) ? roomsResponse : []);
      setGuestHouses(Array.isArray(guestHousesResponse) ? guestHousesResponse : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load rooms and guest houses. Please try again later.');
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
      guestHouseId: '',
      roomNumber: '',
      type: ROOM_TYPES.STANDARD,
      totalBeds: 1,
      pricePerNight: 0,
      status: ROOM_STATUS.AVAILABLE
    });
  };

  const handleShow = (room = null) => {
    if (room) {
      setEditingId(room._id);
      setFormData({
        guestHouseId: room.guestHouseId,
        roomNumber: room.roomNumber,
        type: room.type,
        totalBeds: room.totalBeds,
        pricePerNight: room.pricePerNight,
        status: room.status
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await roomAPI.update(editingId, formData);
        toast.success('Room updated successfully');
      } else {
        await roomAPI.create(formData);
        toast.success('Room created successfully');
      }
      handleClose();
      fetchData();
    } catch (error) {
      console.error('Error saving room:', error);
      toast.error(error.response?.data?.message || 'Failed to save room');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await roomAPI.delete(id);
        toast.success('Room deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting room:', error);
        toast.error(error.response?.data?.message || 'Failed to delete room');
      }
    }
  };

  const getGuestHouseName = (id) => {
    if (!Array.isArray(guestHouses)) return 'Unknown';
    const guestHouse = guestHouses.find(gh => gh && gh._id === id);
    return guestHouse ? guestHouse.name : 'Unknown';
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
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Room Management</h2>
        <Button variant="primary" onClick={() => handleShow()}>
          <FaPlus className="me-2" /> Add Room
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          {rooms.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-muted">No rooms found</p>
              <Button variant="primary" size="sm" onClick={() => handleShow()}>
                Add Room
              </Button>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Guest House</th>
                  <th>Room Number</th>
                  <th>Type</th>
                  <th>Total Beds</th>
                  <th>Price/Night</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id}>
                    <td>{getGuestHouseName(room.guestHouseId)}</td>
                    <td>{room.roomNumber}</td>
                    <td className="text-capitalize">{room.type}</td>
                    <td>{room.totalBeds}</td>
                    <td>{formatCurrency(room.pricePerNight)}</td>
                    <td>
                      <span className={`badge bg-${room.status === ROOM_STATUS.AVAILABLE ? 'success' : 'warning'}`}>
                        {room.status}
                      </span>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(room)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(room._id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

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
                    value={formData.guestHouseId}
                    onChange={(e) => setFormData({ ...formData, guestHouseId: e.target.value })}
                    required
                  >
                    <option value="">Select Guest House</option>
                    {guestHouses.map((gh) => (
                      <option key={gh._id} value={gh._id}>
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
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
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
                  >
                    <option value={ROOM_TYPES.STANDARD}>Standard</option>
                    <option value={ROOM_TYPES.DELUXE}>Deluxe</option>
                    <option value={ROOM_TYPES.SUITE}>Suite</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Beds</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.totalBeds}
                    onChange={(e) => setFormData({ ...formData, totalBeds: parseInt(e.target.value) })}
                    required
                    min="1"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price per Night</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.pricePerNight}
                    onChange={(e) => setFormData({ ...formData, pricePerNight: parseInt(e.target.value) })}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value={ROOM_STATUS.AVAILABLE}>Available</option>
                    <option value={ROOM_STATUS.OCCUPIED}>Occupied</option>
                    <option value={ROOM_STATUS.MAINTENANCE}>Maintenance</option>
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
    </Container>
  );
};

export default RoomManagement; 