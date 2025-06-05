import axiosInstance from './axios';

// Helper function to handle API responses
const handleResponse = (response) => {
  if (!response || !response.data) return [];
  return Array.isArray(response.data) ? response.data : [];
};

// Guest House API calls
export const guestHouseAPI = {
  getAll: async () => {
    const response = await axiosInstance.get('/api/admin/guest-houses/with-rooms');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axiosInstance.get(`/api/admin/guest-houses/${id}/with-rooms`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await axiosInstance.post('/api/admin/guest-houses', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await axiosInstance.put(`/api/admin/guest-houses/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axiosInstance.delete(`/api/admin/guest-houses/${id}`);
    return response.data;
  }
};

// Room API calls
export const roomAPI = {
  getAll: async () => {
    const response = await axiosInstance.get('/api/admin/rooms');
    const data = response.data;
    return Array.isArray(data) ? data : [];
  },
  
  getById: async (id) => {
    const response = await axiosInstance.get(`/api/admin/rooms/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await axiosInstance.post('/api/admin/rooms', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await axiosInstance.put(`/api/admin/rooms/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axiosInstance.delete(`/api/admin/rooms/${id}`);
    return response.data;
  },

  getByGuestHouse: async (guestHouseId) => {
    const response = await axiosInstance.get(`/api/admin/guest-houses/${guestHouseId}/rooms`);
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }
};

// Booking API calls
export const bookingAPI = {
  getAll: async () => {
    const response = await axiosInstance.get('/api/admin/bookings');
    return handleResponse(response);
  },
  
  getPending: async () => {
    const response = await axiosInstance.get('/api/admin/bookings/pending');
    return handleResponse(response);
  },
  
  approve: async (id) => {
    const response = await axiosInstance.put(`/api/admin/bookings/${id}/approve`);
    return response.data;
  },
  
  reject: async (id, reason) => {
    const response = await axiosInstance.put(`/api/admin/bookings/${id}/reject`, { reason });
    return response.data;
  }
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: async () => {
    const response = await axiosInstance.get('/api/admin/dashboard-stats');
    return response.data;
  },
  
  getRevenueStats: async (startDate, endDate) => {
    const response = await axiosInstance.get('/api/admin/revenue-stats', {
      params: { startDate, endDate }
    });
    return response.data;
  },
  
  getOccupancyStats: async (startDate, endDate) => {
    const response = await axiosInstance.get('/api/admin/occupancy-stats', {
      params: { startDate, endDate }
    });
    return response.data;
  }
}; 