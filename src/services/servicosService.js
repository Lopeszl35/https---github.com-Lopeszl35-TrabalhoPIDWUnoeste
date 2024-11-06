const API_BASE_URL = 'http://localhost:3001';

class ServicosService {
    async obterTodos() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/servicos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Erro ao obter os Serviços!');
            } else {
                const dados = await response.json();
                return dados;
            }

        } catch (error) {
            console.log('Erro ao obter os Serviços:', error);
            throw error;
        }
    }

    async adicionar(servico) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/servicos`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(servico)
        });

        if (!response.ok) {
            console.log('response: ', response);
            throw new Error('Erro ao adicionar o Serviço!');
        }

        const dados = await response.json();
        return dados;
    }

    async obterPorId(id) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/servicos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao obter o Serviço!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async atualizar(id, servico) { 
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/servicos/atualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servico) 
        });

        if (!response.ok) {
            console.error('response: ', response);
            throw new Error('Erro ao atualizar o Serviço!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async excluir(id) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/servicos/deletar/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar serviço');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

}

export default ServicosService;
