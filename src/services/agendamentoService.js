const API_BASE_URL = 'http://localhost:3001'

class AgendamentoService {
    async criarAgendamento(agendamento) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/agendamentos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agendamento)
            });
            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao criar o Agendamento!');
            } else {
                const dados = await response.json();
                return dados;
            }
            
        } catch (error) {
            console.log('Erro ao criar o Agendamento:', error);
            throw error;
        }
    }
}

export default AgendamentoService