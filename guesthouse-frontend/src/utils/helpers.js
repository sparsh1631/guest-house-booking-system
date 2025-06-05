import moment from 'moment';
import { DATE_FORMAT, DISPLAY_DATE_FORMAT } from './constants';

// Date formatting helpers
export const formatDate = (date) => {
  return moment(date).format(DATE_FORMAT);
};

export const formatDisplayDate = (date) => {
  return moment(date).format(DISPLAY_DATE_FORMAT);
};

export const isDateValid = (date) => {
  return moment(date).isValid();
};

// Currency formatting
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

// String helpers
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

// Array helpers
export const sortByField = (array, field, direction = 'asc') => {
  return [...array].sort((a, b) => {
    if (direction === 'asc') {
      return a[field] > b[field] ? 1 : -1;
    }
    return a[field] < b[field] ? 1 : -1;
  });
};

export const filterByField = (array, field, value) => {
  if (!value) return array;
  return array.filter(item => 
    item[field].toString().toLowerCase().includes(value.toLowerCase())
  );
};

// Form helpers
export const validateRequired = (value) => {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }
  return '';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!re.test(email)) return 'Invalid email format';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return '';
};

// Error handling helpers
export const getErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return 'An unexpected error occurred';
};

// Pagination helpers
export const paginate = (array, pageSize, pageNumber) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
};

export const calculateTotalPages = (totalItems, pageSize) => {
  return Math.ceil(totalItems / pageSize);
};

// Object helpers
export const removeEmptyFields = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});
};

// File helpers
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const isImageFile = (filename) => {
  const ext = getFileExtension(filename).toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
}; 