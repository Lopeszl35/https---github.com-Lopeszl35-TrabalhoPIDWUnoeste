import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial

  // Inicializa o estado com base no token armazenado
  useEffect(() => {
    const token = AuthService.isAuthenticated();
    if (token) {
      try {
        // Recupera os dados do usuário a partir do token ou do localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do localStorage:", error);
        AuthService.logout();
      }
    }
    setLoading(false); // Finaliza o carregamento inicial
  }, []);

  const login = async (email, senha) => {
    try {
      const data = await AuthService.login(email, senha);
      // Salva os dados do usuário no localStorage
      localStorage.setItem("user", JSON.stringify({ nome: data.user, tipoPermissao: data.tipoPermissao }));
      setUser({ nome: data.user, tipoPermissao: data.tipoPermissao });
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    localStorage.removeItem("user"); // Remove os dados do usuário
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

