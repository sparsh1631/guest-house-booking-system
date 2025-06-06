import React, { useState, useEffect, useCallback } from 'react';
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
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const response = await dashboardAPI.getStats();
      const data = response.data || {};
      
      setStats({
        totalGuestHouses: data.totalGuestHouses || 0,
        totalRooms: data.totalRooms || 0,
        totalBeds: data.totalBeds || 0,
        availableRooms: data.availableRooms || 0,
        occupiedRooms: data.occupiedRooms || 0,
        totalBookings: data.totalBookings || 0,
        pendingRequests: data.pendingRequests || 0,
        totalRevenue: data.totalRevenue || 0,
        totalUsers: data.totalUsers || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount || 0);
  };

  const StatCard = ({ title, value, icon, color, onClick, isCurrency }) => (
    <Card 
      className="mb-4 shadow-sm" 
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className="mb-0">{isCurrency ? formatCurrency(value) : formatNumber(value)}</h3>
          </div>
          <div className={`rounded-circle p-3 bg-${color} bg-opacity-10`}>
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <Container fluid className="p-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

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
            onClick={() => navigate('/admin/bookings')}
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
              <h2 className="mb-0">{formatCurrency(stats.totalRevenue)}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
