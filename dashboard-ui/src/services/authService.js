import api, { setAuthToken } from './api';

export const login = async (username, password) => {
  const response = await api.post('/users/login', { username, password });
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response.data;
};

export const register = async (username, password, roleId) => {
  const response = await api.post('/users/register', { username, password, roleId });
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response.data;
};

export const logout = () => {
  setAuthToken(null);
};
