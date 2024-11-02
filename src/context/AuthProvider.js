import React, { createContext, useContext, useState } from 'react';
import { AuthService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  const login = async (email, senha) => {
    try {
      const data = await AuthService.login(email, senha);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
