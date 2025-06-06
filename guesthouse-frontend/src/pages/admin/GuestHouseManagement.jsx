import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form, Row, Col, Badge, Spinner, Nav, Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaBed, FaMapMarkerAlt, FaHotel } from 'react-icons/fa';
import { guestHouseAPI, bedAPI, roomAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GuestHouseManagement.css';

const GuestHouseManagement = () => {
  const [guestHouses, setGuestHouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    isActive: true,
    rooms: []
  });

  useEffect(() => {
    fetchGuestHouses();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchGuestHouses, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchGuestHouses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await guestHouseAPI.getAll();
      const guestHouses = response.data || [];
      setGuestHouses(guestHouses);
    } catch (error) {
      console.error('Error fetching guest houses:', error);
      setError('Failed to load guest houses. Please try again later.');
      toast.error('Failed to load guest houses');
      setGuestHouses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingId(null);
    setActiveTab('basic');
    setFormData({
      name: '',
      location: '',
      description: '',
      isActive: true,
      rooms: []
    });
  };

  const handleShow = (guestHouse = null) => {
    if (guestHouse) {
      setEditingId(guestHouse.id);
      setFormData({
        name: guestHouse.name,
        location: guestHouse.location,
        description: guestHouse.description || '',
        isActive: guestHouse.isActive,
        rooms: (guestHouse.rooms || []).map(room => ({
          roomNumber: room.roomNumber,
          type: room.type,
          price: room.price.toString(),
          status: room.status,
          beds: room.beds || []
        }))
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        rooms: formData.rooms.map(room => ({
          roomNumber: room.roomNumber,
          type: room.type,
          price: parseFloat(room.price),
          status: room.status,
          beds: (room.beds || []).map(bed => ({
            bedNumber: bed.bedNumber,
            type: bed.type,
            status: bed.status || 'AVAILABLE'
          }))
        }))
      };

      if (editingId) {
        await guestHouseAPI.update(editingId, dataToSubmit);
        toast.success('Guest house updated successfully');
      } else {
        await guestHouseAPI.create(dataToSubmit);
        toast.success('Guest house created successfully');
      }
      handleClose();
      fetchGuestHouses();
    } catch (error) {
      console.error('Error saving guest house:', error);
      toast.error(error.response?.data?.message || 'Failed to save guest house');
    }
  };

  const handleAddRoom = () => {
    const newRoom = {
      roomNumber: '',
      type: 'STANDARD',
      price: '0',
      status: 'AVAILABLE',
      beds: []
    };
    setFormData({
      ...formData,
      rooms: [...formData.rooms, newRoom]
    });
  };

  const handleUpdateRoom = (index, field, value) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index] = {
      ...updatedRooms[index],
      [field]: value
    };
    setFormData({
      ...formData,
      rooms: updatedRooms
    });
  };

  const handleDeleteRoom = (index) => {
    const updatedRooms = formData.rooms.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      rooms: updatedRooms
    });
  };

  const handleAddBed = (roomIndex) => {
    const updatedRooms = [...formData.rooms];
    const newBed = {
      bedNumber: '',
      type: 'SINGLE',
      status: 'AVAILABLE'
    };
    
    // Initialize beds array if it doesn't exist
    if (!updatedRooms[roomIndex].beds) {
      updatedRooms[roomIndex].beds = [];
    }
    
    updatedRooms[roomIndex].beds.push(newBed);
    setFormData({
      ...formData,
      rooms: updatedRooms
    });
  };

  const handleUpdateBed = (roomIndex, bedIndex, field, value) => {
    const updatedRooms = [...formData.rooms];
    if (!updatedRooms[roomIndex].beds) {
      updatedRooms[roomIndex].beds = [];
    }
    updatedRooms[roomIndex].beds[bedIndex] = {
      ...updatedRooms[roomIndex].beds[bedIndex],
      [field]: value
    };
    setFormData({
      ...formData,
      rooms: updatedRooms
    });
  };

  const handleDeleteBed = (roomIndex, bedIndex) => {
    const updatedRooms = [...formData.rooms];
    if (updatedRooms[roomIndex].beds) {
      updatedRooms[roomIndex].beds = updatedRooms[roomIndex].beds.filter((_, i) => i !== bedIndex);
    }
    setFormData({
      ...formData,
      rooms: updatedRooms
    });
  };

  const handleToggleActive = async (guestHouse) => {
    try {
      const updatedGuestHouse = {
        ...guestHouse,
        isActive: !guestHouse.isActive
      };
      await guestHouseAPI.update(guestHouse.id, updatedGuestHouse);
      fetchGuestHouses();
      toast.success(`Guest house ${updatedGuestHouse.isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error updating guest house status:', error);
      toast.error('Failed to update guest house status');
    }
  };

  if (loading) {
    return (
      <Container fluid className="p-4">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="p-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Guest House Management</h2>
        <Button variant="primary" className="add-button" onClick={() => handleShow(null)}>
          <FaPlus className="me-2" /> Add Guest House
        </Button>
      </div>

      {guestHouses.length === 0 ? (
        <Card className="text-center p-5 empty-state">
          <Card.Body>
            <FaHotel size={48} className="mb-3 text-muted" />
            <h4>No guest houses found</h4>
            <p className="text-muted">Get started by adding your first guest house</p>
            <Button variant="primary" onClick={() => handleShow(null)}>
              Add Guest House
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {guestHouses.map((guestHouse) => (
            <Col key={guestHouse.id}>
              <Card className="h-100 guest-house-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <Card.Title className="mb-1">{guestHouse.name}</Card.Title>
                      <div className="text-muted location">
                        <FaMapMarkerAlt className="me-1" />
                        {guestHouse.location}
                      </div>
                    </div>
                    <Badge 
                      bg={guestHouse.isActive ? 'success' : 'danger'}
                      className="status-badge"
                    >
                      {guestHouse.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-label">Rooms</div>
                      <div className="stat-value">
                        <FaHotel className="me-1" />
                        {guestHouse.rooms?.length || 0}
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-label">Beds</div>
                      <div className="stat-value">
                        <FaBed className="me-1" />
                        {guestHouse.rooms?.reduce(
                          (total, room) => total + (room.beds?.length || 0),
                          0
                        ) || 0}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleShow(guestHouse)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleToggleActive(guestHouse)}
                    >
                      {guestHouse.isActive ? <FaTrash /> : <FaPlus />}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? 'Edit Guest House' : 'Add Guest House'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'basic'}
                onClick={() => setActiveTab('basic')}
              >
                Basic Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'rooms'}
                onClick={() => setActiveTab('rooms')}
              >
                Rooms & Beds
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Form onSubmit={handleSubmit}>
            {activeTab === 'basic' ? (
              <>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter guest house name"
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
                        placeholder="Enter location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="active-switch"
                    label="Active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                </Form.Group>
              </>
            ) : (
              <div className="rooms-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Rooms</h6>
                  <Button variant="outline-primary" size="sm" onClick={handleAddRoom}>
                    <FaPlus className="me-1" /> Add Room
                  </Button>
                </div>

                {formData.rooms.map((room, roomIndex) => (
                  <div key={roomIndex} className="room-card">
                    <div className="room-header">
                      <h6 className="mb-0">Room {roomIndex + 1}</h6>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteRoom(roomIndex)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                    <div className="room-body">
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Room Number</Form.Label>
                            <Form.Control
                              type="text"
                              value={room.roomNumber || ''}
                              onChange={(e) => handleUpdateRoom(roomIndex, 'roomNumber', e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Room Type</Form.Label>
                            <Form.Select
                              value={room.type || 'STANDARD'}
                              onChange={(e) => handleUpdateRoom(roomIndex, 'type', e.target.value)}
                            >
                              <option value="STANDARD">Standard</option>
                              <option value="DELUXE">Deluxe</option>
                              <option value="SUITE">Suite</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="number"
                              value={room.price || '0'}
                              onChange={(e) => handleUpdateRoom(roomIndex, 'price', e.target.value)}
                              required
                              min="0"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                              value={room.status || 'AVAILABLE'}
                              onChange={(e) => handleUpdateRoom(roomIndex, 'status', e.target.value)}
                            >
                              <option value="AVAILABLE">Available</option>
                              <option value="OCCUPIED">Occupied</option>
                              <option value="MAINTENANCE">Maintenance</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="beds-section mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <Form.Label className="mb-0">Beds</Form.Label>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleAddBed(roomIndex)}
                          >
                            <FaPlus className="me-1" /> Add Bed
                          </Button>
                        </div>

                        {room.beds?.length > 0 ? (
                          <Table responsive bordered hover size="sm" className="beds-table mb-0">
                            <thead>
                              <tr>
                                <th style={{width: "40%"}}>Bed Number</th>
                                <th style={{width: "40%"}}>Type</th>
                                <th style={{width: "20%"}}>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {room.beds.map((bed, bedIndex) => (
                                <tr key={bedIndex}>
                                  <td>
                                    <Form.Control
                                      type="text"
                                      size="sm"
                                      value={bed.bedNumber || ''}
                                      onChange={(e) => handleUpdateBed(roomIndex, bedIndex, 'bedNumber', e.target.value)}
                                      required
                                    />
                                  </td>
                                  <td>
                                    <Form.Select
                                      size="sm"
                                      value={bed.type || 'SINGLE'}
                                      onChange={(e) => handleUpdateBed(roomIndex, bedIndex, 'type', e.target.value)}
                                    >
                                      <option value="SINGLE">Single</option>
                                      <option value="DOUBLE">Double</option>
                                      <option value="QUEEN">Queen</option>
                                      <option value="KING">King</option>
                                    </Form.Select>
                                  </td>
                                  <td className="text-center">
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={() => handleDeleteBed(roomIndex, bedIndex)}
                                    >
                                      <FaTrash />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        ) : (
                          <div className="text-center text-muted py-3">
                            No beds added yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {formData.rooms.length === 0 && (
                  <div className="text-center text-muted py-4">
                    No rooms added yet. Click the "Add Room" button to add your first room.
                  </div>
                )}
              </div>
            )}

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingId ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GuestHouseManagement; 