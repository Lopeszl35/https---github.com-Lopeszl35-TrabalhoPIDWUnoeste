const API_BASE_URL = 'http://localhost:3001';

class ProfissionaisServicoService {

    async obterProfissionaisPorServico(idServico) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionalServico/servico/${idServico}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao obter os profissionais para o serviço!');
            } else {
                return await response.json();
            }
        } catch (error) {
            console.log('Erro ao obter os profissionais para o serviço:', error);
            throw error;
        }
    }

    async relacionarProfissionalServico(idProfissional, idServico) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionalServico/relacionar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { idProfissional, idServico } )
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao relacionar o profissional ao serviço!');
            } else {
                return await response.json();
            }
        } catch (error) {
            console.log('Erro ao relacionar o profissional ao serviço:', error);
            throw error;
        }
    }

    async deletarRelacaoProfissionalServico(idProfissional, idServico) {
        console.log("Profissional: ", idProfissional)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/profissionalServico/deletar`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { idProfissional, idServico } )
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Erro ao deletar a relação do profissional ao serviço:', errorMessage);
                throw new Error('Erro ao deletar a relação do profissional ao serviço!');
            } else {
                return await response.json();
            }
        } catch (error) {
            console.log('Erro ao deletar a relação do profissional ao serviço:', error);
            throw error;
        }
    }

    async buscarProfissionais(searchTerm, searchType) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(
                `${API_BASE_URL}/profissionaisServico/buscar?searchTerm=${encodeURIComponent(searchTerm)}&searchType=${encodeURIComponent(searchType)}`, 
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('Erro ao buscar profissionais:', errorResponse);
                throw new Error('Erro ao buscar profissionais!');
            } else {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
            throw error;
        }
    }
    


}

export default ProfissionaisServicoService;