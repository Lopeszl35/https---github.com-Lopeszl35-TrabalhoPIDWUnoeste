const API_BASE_URL = 'http://localhost:3001'

class ProfissionaisService {

    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/profissionais`, {
            method: 'GET',
            headers: {
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
    }

    async obterPorServico(servico) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionais/servico/${servico}`, {
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
                return dados;
            }
        } catch (error) {
            console.log('Erro ao obter os Profissionais:', error);
            throw error;
        }
    }

    async cadastrarProfissional(profissional) {
        const response = await fetch(`${API_BASE_URL}/profissionais`, {
            method: 'POST',
            headers: {
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
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/profissionais/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok) {
            throw new Error('Erro ao obter o Profissional!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async editarProfissional(id, profissional) {
        const response = await fetch(`${API_BASE_URL}/profissionais/${id}`, {
            method: 'PUT',
            headers: {
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
    }

    async deletarProfissional(id) {
        const response = await fetch(`${API_BASE_URL}/profissionais/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok) {
            throw new Error('Erro ao deletar o Profissional!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async obterNomeProfissionalPorId(id) {
        const response = await fetch(`${API_BASE_URL}/profissionais/profissionalNome/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao obter o nome do profissional!');
        } else {
            const dados = await response.json();
            return dados.nomeProfissional;
        }
    }
        
}

export default ProfissionaisService;