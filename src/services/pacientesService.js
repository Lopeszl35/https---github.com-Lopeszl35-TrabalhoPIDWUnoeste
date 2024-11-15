import { json } from "react-router-dom";

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

        if (response.status === 400) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }  

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
            throw new Error(`Erro ao atualizar o paciente: ${JSON.stringify(errorData)}`);
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
                throw new Error('Erro ao excluir o paciente');
            }
            const data = await response.json();
            return data;
    }
    
    
}  

export default PacientesService;
