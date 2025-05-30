// src/services/authService.js
import axios from 'axios';

// Base URL of your Spring Boot backend
const API_URL = 'http://localhost:8080/api/auth';

/**
 * Sends registration data to backend
 * @param {Object} formData - Contains username, email, and password
 * @returns {String} - Success message from backend
 */
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data; // Backend sends a simple success message
  } catch (error) {
    throw error.response?.data || 'Registration failed';
  }
};

/**
 * Sends login credentials to backend
 * @param {Object} formData - Contains email and password
 * @returns {String} - Success message (can be extended to return token later)
 */
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};
