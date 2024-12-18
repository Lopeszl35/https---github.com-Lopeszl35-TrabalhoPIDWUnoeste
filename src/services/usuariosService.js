const API_BASE_URL = 'http://localhost:3001'

class UsuariosService {
    async adicionarUsuario(usuario) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/cadastrar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Erro ao adicionar usuário", error.message);
            throw error;
        }
    }
}

export default UsuariosService;