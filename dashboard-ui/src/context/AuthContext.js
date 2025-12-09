import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, register as registerService } from '../services/authService';
import { setAuthToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      // You would typically decode the token here to get user info
      // For simplicity, we'll just set a placeholder user
      setUser({ token });
    }
  }, [token]);

  const login = async (username, password) => {
    const { token: newToken, user: loggedInUser } = await loginService(username, password);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(loggedInUser);
  };

  const register = async (username, password, roleId) => {
    const { token: newToken, user: registeredUser } = await registerService(username, password, roleId);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(registeredUser);
  };

  const logout = () => {
    logoutService();
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
