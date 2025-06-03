import axiosInstance from './axios';
import { toast } from 'react-toastify';

export const TOKEN_KEY = 'token';
export const USER_ROLE = 'userRole';
export const USER_INFO = 'userInfo';

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    const { token, user } = response.data;
    
    // Store auth data
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ROLE, user.role);
    localStorage.setItem(USER_INFO, JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
    return { success: false, error };
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ROLE);
  localStorage.removeItem(USER_INFO);
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserRole = () => {
  return localStorage.getItem(USER_ROLE);
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_INFO);
  return userInfo ? JSON.parse(userInfo) : null;
};

export const isAdmin = () => {
  return getUserRole() === 'ADMIN';
};

export const isUser = () => {
  return getUserRole() === 'USER';
};

export const checkPermission = (requiredRole) => {
  const userRole = getUserRole();
  if (!userRole) return false;
  if (requiredRole === 'ADMIN') return userRole === 'ADMIN';
  return true; // For USER role or when no specific role is required
}; 