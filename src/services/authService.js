const API_URL = 'http://localhost:3001';

export const AuthService = {
  async login(email, senha) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Salva o token JWT
        return data;
      } else {
        throw new Error(data.message || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token'); // Remove o token JWT
  },

  isAuthenticated() {
    return !!localStorage.getItem('token'); // Verifica se o token está presente
  },
};
