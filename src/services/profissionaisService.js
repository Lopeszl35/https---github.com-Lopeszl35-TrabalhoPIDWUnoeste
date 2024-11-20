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
                const erroData = await response.json();
                throw new Error(erroData.message || 'Erro ao obter os Profissionais!');
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
            console.log("response: ", response);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao adicionar o Profissional!');
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
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
                const erroData = await response.json();
                throw new Error(erroData.message || 'Erro ao obter o Profissional!');
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
                const erroData = await response.json();
                throw new Error(erroData.message || 'Erro ao editar o Profissional!');
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
                const erroData = await response.json();
                throw new Error(erroData.message || 'Erro ao deletar o Profissional!');
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.log('Erro ao deletar o Profissional:', error);
            throw error;
        }
    }

    async obterHorariosProfissional(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionais/horarios/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok) {
                const erroData = await response.json();
                throw new Error(erroData.message || 'Erro ao obter os horários do Profissional!');
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.log('Erro ao obter os horários do Profissional:', error);
            throw error;
        }
    }

    async cadastrarHorarioProfissional(id, horario) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionais/horarios/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(horario)
            });
            if(!response.ok) {
                const erroData = await response.json();
                throw new Error(erroData.message || 'Erro ao adicionar o horário ao Profissional!');
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.log('Erro ao adicionar o horário ao Profissional:', error);
            throw error;
        }
    }
}

export default ProfissionaisService;