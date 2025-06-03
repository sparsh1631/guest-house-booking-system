import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBed, FaHotel, FaUsers, FaClipboardList } from 'react-icons/fa';
import { dashboardAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalGuestHouses: 0,
    totalRooms: 0,
    totalBeds: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    totalBookings: 0,
    pendingRequests: 0,
    totalRevenue: 0,
    totalUsers: 0
  });

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        const data = await dashboardAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Failed to load dashboard statistics');
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card 
      className="mb-4 shadow-sm" 
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className="mb-0">{value}</h3>
          </div>
          <div className={`rounded-circle p-3 bg-${color} bg-opacity-10`}>
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col lg={3} sm={6}>
          <StatCard
            title="Total Guest Houses"
            value={stats.totalGuestHouses}
            icon={<FaHotel size={24} className="text-primary" />}
            color="primary"
            onClick={() => navigate('/admin/guest-houses')}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatCard
            title="Total Rooms"
            value={stats.totalRooms}
            icon={<FaHotel size={24} className="text-success" />}
            color="success"
            onClick={() => navigate('/admin/rooms')}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatCard
            title="Total Beds"
            value={stats.totalBeds}
            icon={<FaBed size={24} className="text-info" />}
            color="info"
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatCard
            title="Available Rooms"
            value={stats.availableRooms}
            icon={<FaHotel size={24} className="text-warning" />}
            color="warning"
            onClick={() => navigate('/admin/rooms')}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={3} sm={6}>
          <StatCard
            title="Occupied Rooms"
            value={stats.occupiedRooms}
            icon={<FaHotel size={24} className="text-danger" />}
            color="danger"
            onClick={() => navigate('/admin/rooms')}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<FaClipboardList size={24} className="text-primary" />}
            color="primary"
            onClick={() => navigate('/admin/reservation-list')}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatCard
            title="Pending Requests"
            value={stats.pendingRequests}
            icon={<FaClipboardList size={24} className="text-warning" />}
            color="warning"
            onClick={() => navigate('/admin/pending-requests')}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<FaUsers size={24} className="text-success" />}
            color="success"
          />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Total Revenue</h5>
              <h2 className="mb-0">₹{stats.totalRevenue?.toLocaleString() || 0}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
