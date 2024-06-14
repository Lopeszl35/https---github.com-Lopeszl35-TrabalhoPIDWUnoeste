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
}

export default ProfissionaisService;