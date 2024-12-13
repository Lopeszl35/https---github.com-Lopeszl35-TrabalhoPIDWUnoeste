const API_BASE_URL ='http://localhost:3001';

class PacientesService {
    async obterTodos() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/pacientes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
    
                }
            });

            if (response.status === 403) {
                throw new Error('Acesso negado. Você não tem permissão para acessar esta página.');
              }
    
            if (!response.ok) {
                const errors = await response.json();
                throw new Error(errors.message || 'Erro ao obter os pacientes!');
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }    

    async obterDadosCompletosDoPaciente(prontuario) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/pacientes/${prontuario}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const errors = await response.json();
                throw new Error(errors.message || 'Erro ao obter os dados completos do paciente!');  
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.error("Erro ao obter dados do paciente:", error);
            throw error;
        }
    }

    async adicionar(dadosPaciente) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/pacientes/adicionar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosPaciente),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao adicionar o Paciente!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async atualizar(prontuario, pacienteInfo) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/pacientes/editar/${prontuario}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pacienteInfo),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao atualizar o Paciente!');
        }
        const data = await response.json();
        return data;
        } catch (error) {
            console.error("Erro ao atualizar paciente:", error.message);
            throw error;
        }
      }

    async excluirPaciente(prontuario) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/pacientes/excluir/${prontuario}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            }); 
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao excluir o Paciente!');
            }
            const data = await response.json();
            return data;
    }

    async buscarPaciente(searchTerm, searchType) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/pacientes/buscar?searchTerm=${searchTerm}&searchType=${searchType}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar o paciente!');
        }
        const data = await response.json();
        return data;
    }

    async salvarEvolucao(evolucao) {
        console.log("Evolucao: ", evolucao);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/evolucoes/salvar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({evolucao}),
            });
            if (!response.ok) {
                const errorData = response.json();
                throw new Error(errorData.message || 'Erro ao salvar a evolução!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Erro ao salvar evolução:", error);
            throw error;
        }
    }

    async deletarEvolucao(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/evolucoes/deletar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao deletar a evolução!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Erro ao deletar evolução:", error);
            throw error;
        }
    }

    async buscarEvolucaoPaciente(prontuario) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/evolucoes/buscar/${prontuario}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao buscar a evolução!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Erro ao buscar evolução:", error);
            throw error;
        }
    }
    
    
}  

export default PacientesService;
