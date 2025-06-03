// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173/api';

// User Roles
export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

// Room Types
export const ROOM_TYPES = {
  STANDARD: 'standard',
  DELUXE: 'deluxe',
  SUITE: 'suite'
};

// Room Status
export const ROOM_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance'
};

// Guest House Status
export const GUEST_HOUSE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Date Formats
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DISPLAY_DATE_FORMAT = 'DD MMM YYYY';

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ROLE: 'userRole',
  USER_INFO: 'userInfo',
  THEME: 'theme'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  DEFAULT: 'Something went wrong.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  LOGOUT: 'Successfully logged out!',
  CREATE: 'Successfully created!',
  UPDATE: 'Successfully updated!',
  DELETE: 'Successfully deleted!'
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    GUEST_HOUSES: '/admin/guest-houses',
    ROOMS: '/admin/rooms',
    RESERVATIONS: '/admin/reservation-list',
    PENDING_REQUESTS: '/admin/pending-requests',
    REPORTS: '/admin/reports',
    MASTER: '/admin/master'
  },
  USER: {
    DASHBOARD: '/user/dashboard',
    BOOK_ROOM: '/user/book-room',
    MY_BOOKINGS: '/user/my-bookings',
    BOOKING_STATUS: '/user/booking-status'
  }
}; 