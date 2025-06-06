import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: () => api.get('/admin/dashboard/stats'),
  getRevenueStats: (startDate, endDate) => 
    api.get('/admin/dashboard/revenue', { params: { startDate, endDate } }),
  getOccupancyStats: (startDate, endDate) => 
    api.get('/admin/dashboard/occupancy', { params: { startDate, endDate } })
};

// Guest House API calls
export const guestHouseAPI = {
  getAll: () => api.get('/admin/guest-houses/with-rooms'),
  getById: (id) => api.get(`/admin/guest-houses/${id}`),
  create: (data) => api.post('/admin/guest-houses', data),
  update: (id, data) => api.put(`/admin/guest-houses/${id}`, data),
  delete: (id) => api.delete(`/admin/guest-houses/${id}`),
};

// Room API calls
export const roomAPI = {
  getAll: () => api.get('/admin/rooms'),
  getById: (id) => api.get(`/admin/rooms/${id}`),
  create: (data) => api.post('/admin/rooms', data),
  update: (id, data) => api.put(`/admin/rooms/${id}`, data),
  delete: (id) => api.delete(`/admin/rooms/${id}`),
};

// Bed API calls
export const bedAPI = {
  getByRoom: (roomId) => api.get(`/admin/rooms/${roomId}/beds`),
  create: (data) => api.post('/admin/beds', data),
  update: (id, data) => api.put(`/admin/beds/${id}`, data),
  delete: (id) => api.delete(`/admin/beds/${id}`),
};

// Booking API calls
export const bookingAPI = {
  getAll: () => api.get('/admin/bookings'),
  getById: (id) => api.get(`/admin/bookings/${id}`),
  create: (data) => api.post('/admin/bookings', data),
  update: (id, data) => api.put(`/admin/bookings/${id}`, data),
  delete: (id) => api.delete(`/admin/bookings/${id}`),
  getPendingRequests: () => api.get('/admin/bookings/pending'),
  approveBooking: (id) => api.put(`/admin/bookings/${id}/approve`),
  rejectBooking: (id) => api.put(`/admin/bookings/${id}/reject`),
};

// User API calls
export const userAPI = {
  getAll: () => api.get('/admin/users'),
  getById: (id) => api.get(`/admin/users/${id}`),
  update: (id, data) => api.put(`/admin/users/${id}`, data),
  delete: (id) => api.delete(`/admin/users/${id}`),
};

export default api; 