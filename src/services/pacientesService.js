const API_BASE_URL = 'http://localhost:3001';

class PacientesService {
    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/pacientes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao obter os Pacientes!');
        } else {
            const dados = await response.json();
            return dados;
        }
    }    
}  

export default PacientesService;
