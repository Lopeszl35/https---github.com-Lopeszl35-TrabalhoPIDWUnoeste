const API_BASE_URL = 'http://localhost:3001';

class ProfissionaisService {

    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/profissionais`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao obter os Profissionais!');
        } else {
            const dados = await response.json();
            console.log(dados);
            return dados;
        }
    }

    async cadastrarProfissional(profissional) {
        const response = await fetch(`${API_BASE_URL}/profissionais`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profissional)
        });
        if (!response.ok) {
            throw new Error('Erro ao cadastrar o Profissional!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/profissionais/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok) {
            throw new Error('Erro ao obter o Profissional!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async editarProfissional(id, profissional) {
        const response = await fetch(`${API_BASE_URL}/profissionais/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profissional)
        });
        if(!response.ok) {
            throw new Error('Erro ao editar o Profissional!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }
        
}

export default ProfissionaisService;