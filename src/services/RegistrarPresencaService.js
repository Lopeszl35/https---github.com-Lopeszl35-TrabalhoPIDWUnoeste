const API_BASE_URL = 'http://localhost:3001'

class RegistrarPresencaService {

    async  buscarAgendamentoPorData(data) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/agendamento/buscarPorData?data=${data}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter agendamentos para data informada!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }
    async registrarPresenca(idAgendamento, observacoes) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/agendamento/registrarPresenca?idAgendamento=${idAgendamento}&observacoes=${observacoes}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao registrar a presença!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async registrarAusencia(idAgendamento, motivo) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/agendamento/registrarAusencia?idAgendamento=${idAgendamento}&motivo=${motivo}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao registrar a ausência!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async cancelarAgendamento(idAgendamento, motivo) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/agendamento/cancelarAgendamento?idAgendamento=${idAgendamento}&motivo=${motivo}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao cancelar o agendamento!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

}