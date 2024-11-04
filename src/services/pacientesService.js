const API_BASE_URL ='http://localhost:3001';

class PacientesService {
    async buscarUltimoPaciente() {
        const response = await fetch(`${API_BASE_URL}/pacientes/ultimo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Erro ao obter ultimo prontuario!');
        } else {
            const dados = await response.json();
            return dados;
        }
      }
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
                throw new Error('Erro ao obter os Pacientes!');
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
                throw new Error('Erro ao obter o Paciente!');  
            } else {
                const dados = await response.json();
                return dados;
            }
        } catch (error) {
            console.error("Erro ao obter dados do paciente:", error);
            throw error;
        }
    }

    async adicionar(paciente) {
        const response = await fetch(`${API_BASE_URL}/pacientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paciente)
        });

        if (response.status === 400) {
            const errorData = await response.json();
            if (errorData.message.includes("Prontuario ja existe")) {
                throw new Error('Prontuario ja existe');
            }
        }  

        if (!response.ok) {
            throw new Error('Erro ao adicionar o Paciente!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async atualizar(prontuario, pacienteInfo) {
        const response = await fetch(`${API_BASE_URL}/pacientes/${prontuario}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pacienteInfo),
        });
        if (!response.ok) {
          throw new Error('Erro ao atualizar o paciente');
        }
        const data = await response.json();
        return data;
      }

    async excluirPaciente(prontuario) {
        const response = await fetch(`${API_BASE_URL}/pacientes/${prontuario}`, {
            method: 'DELETE',
            }); 
            if (!response.ok) {
                throw new Error('Erro ao excluir o paciente');
            }
        }
    
    
}  

export default PacientesService;
