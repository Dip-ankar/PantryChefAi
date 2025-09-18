import apiClient from './apiClient';

export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const login = (userData) => {
  return apiClient.post('/auth/login', userData);
};