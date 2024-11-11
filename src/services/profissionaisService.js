const API_BASE_URL = 'http://localhost:3001'

class ProfissionaisService {

    async obterTodos() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionais`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao obter os Profissionais!');
            } else {
                const dados = await response.json();
                console.log(dados);
                return dados;
            }
        } catch (error) {
            console.log('Erro ao obter os Profissionais:', error);
            throw error;
        }
    }

    async cadastrarProfissional(profissional) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionais/adicionar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profissional)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar o Profissional!');
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.log('Erro ao cadastrar o Profissional:', error);
            throw error;
        }
    }

    async obterPorId(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionais/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok) {
                throw new Error('Erro ao obter o Profissional!');
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.log('Erro ao obter o Profissional:', error);
            throw error;
        }
    }

    async editarProfissional(id, profissional) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionais/editar/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profissional)
            });
            if(!response.ok) {
                throw new Error('Erro ao editar o Profissional!');
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.log('Erro ao editar o Profissional:', error);
            throw error;
        }
    }

    async deletarProfissional(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionais/excluir/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok) {
                throw new Error('Erro ao deletar o Profissional!');
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.log('Erro ao deletar o Profissional:', error);
            throw error;
        }
    }
        
}

export default ProfissionaisService;