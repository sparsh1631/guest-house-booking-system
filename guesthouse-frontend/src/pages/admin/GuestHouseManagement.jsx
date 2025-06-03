import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { guestHouseAPI } from '../../utils/api';
import { GUEST_HOUSE_STATUS } from '../../utils/constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GuestHouseManagement = () => {
  const [guestHouses, setGuestHouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    totalRooms: 0,
    totalBeds: 0,
    status: GUEST_HOUSE_STATUS.ACTIVE
  });

  useEffect(() => {
    fetchGuestHouses();
  }, []);

  const fetchGuestHouses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await guestHouseAPI.getAll();
      // Ensure we always have an array
      const data = Array.isArray(response?.data) ? response.data : 
                  Array.isArray(response) ? response : [];
      setGuestHouses(data);
    } catch (error) {
      console.error('Error fetching guest houses:', error);
      setError('Failed to load guest houses. Please try again later.');
      toast.error('Failed to load guest houses');
      // Set empty array on error
      setGuestHouses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: '',
      location: '',
      totalRooms: 0,
      totalBeds: 0,
      status: GUEST_HOUSE_STATUS.ACTIVE
    });
  };

  const handleShow = (guestHouse = null) => {
    if (guestHouse) {
      setEditingId(guestHouse._id);
      setFormData({
        name: guestHouse.name,
        location: guestHouse.location,
        totalRooms: guestHouse.totalRooms,
        totalBeds: guestHouse.totalBeds,
        status: guestHouse.status
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await guestHouseAPI.update(editingId, formData);
        toast.success('Guest house updated successfully');
      } else {
        await guestHouseAPI.create(formData);
        toast.success('Guest house created successfully');
      }
      handleClose();
      fetchGuestHouses();
    } catch (error) {
      console.error('Error saving guest house:', error);
      toast.error(error.response?.data?.message || 'Failed to save guest house');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guest house?')) {
      try {
        await guestHouseAPI.delete(id);
        toast.success('Guest house deleted successfully');
        fetchGuestHouses();
      } catch (error) {
        console.error('Error deleting guest house:', error);
        toast.error(error.response?.data?.message || 'Failed to delete guest house');
      }
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
          <Button variant="outline-danger" size="sm" className="ms-3" onClick={fetchGuestHouses}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Guest House Management</h2>
        <Button variant="primary" onClick={() => handleShow()}>
          <FaPlus className="me-2" /> Add Guest House
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          {guestHouses.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-muted">No guest houses found</p>
              <Button variant="primary" size="sm" onClick={() => handleShow()}>
                Add Guest House
              </Button>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Total Rooms</th>
                  <th>Total Beds</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {guestHouses.map((house) => (
                  <tr key={house._id}>
                    <td>{house.name}</td>
                    <td>{house.location}</td>
                    <td>{house.totalRooms}</td>
                    <td>{house.totalBeds}</td>
                    <td>
                      <span className={`badge bg-${house.status === GUEST_HOUSE_STATUS.ACTIVE ? 'success' : 'danger'}`}>
                        {house.status}
                      </span>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(house)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(house._id)}>
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
          <Modal.Title>{editingId ? 'Edit Guest House' : 'Add Guest House'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Rooms</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.totalRooms}
                    onChange={(e) => setFormData({ ...formData, totalRooms: parseInt(e.target.value) })}
                    required
                    min="0"
                  />
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
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value={GUEST_HOUSE_STATUS.ACTIVE}>Active</option>
                <option value={GUEST_HOUSE_STATUS.INACTIVE}>Inactive</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingId ? 'Update' : 'Add'} Guest House
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default GuestHouseManagement; 