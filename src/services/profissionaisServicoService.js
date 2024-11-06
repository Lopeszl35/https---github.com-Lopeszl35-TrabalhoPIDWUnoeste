const API_BASE_URL = 'http://localhost:3001';

class ProfissionaisServicoService {

    async obterProfissionaisPorServico(idServico) {
        const response = await fetch(`${API_BASE_URL}/servicos/${idServico}/profissionais`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao obter os profissionais para o serviço!');
        } else {
            return await response.json();
        }
    }

    async relacionarProfissionalServico(idProfissional, idServico) {
        const response = await fetch(`${API_BASE_URL}/servicos/${idServico}/profissionais/${idProfissional}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao relacionar o profissional ao serviço!');
        } else {
            return await response.json();
        }
    }

    async deletarRelacaoProfissionalServico(idServico) {
        const response = await fetch(`${API_BASE_URL}/profissionaiservicos/${idServico}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log('response: ', response);
            throw new Error('Erro ao deletar a relação do profissional ao serviço!');
        } else {
            return await response.json();
        }
    }

}

export default ProfissionaisServicoService;