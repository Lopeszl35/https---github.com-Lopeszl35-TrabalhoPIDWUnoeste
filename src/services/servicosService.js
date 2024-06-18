const API_BASE_URL = 'http://localhost:3001';

class ServicosService {
    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/servicos`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao obter os Serviços!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async adicionar(servico) {
        const response = await fetch(`${API_BASE_URL}/servicos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(servico)
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar o Serviço!');
        }

        const dados = await response.json();
        return dados;
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/servicos/${id}`, {
            headers: {
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
        const response = await fetch(`${API_BASE_URL}/servicos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servico) 
        });

        if (response.status === 400) {
            const errorData = await response.json();
            if (errorData.message.includes("Profissional não encontrado")) {
                throw new Error('Profissional não encontrado');
            }
        }

        if (!response.ok) {
            throw new Error('Erro ao atualizar o Serviço!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async excluir(id) {
        const response = await fetch(`${API_BASE_URL}/servicos/${id}`, {
            method: 'DELETE',
            headers: {
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

    async filtrar(filtro, valor) {
        const response = await fetch(`${API_BASE_URL}/servicos/filtrar?filtro=${filtro}&valor=${valor}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('Erro ao filtrar os Serviços!');
        }
    
        const dados = await response.json();
        return dados;
    }
}

export default ServicosService;
