const API_BASE_URL = 'http://localhost:3001';

class RelatoriosPacientesService {
    async obterRelatorioPacientes(filtros = {}) {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams(filtros).toString();
        const response = await fetch(`${API_BASE_URL}/relatorio/pacientes?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter o relatório de pacientes.');
        }
        return await response.json();
    }

    async obterDistribuicaoPorEstado() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/relatorio/pacientes/estatisticas-estado`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter a distribuição por estado.');
        }
        return await response.json();
    }

    async obterDistribuicaoPorCidade() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/relatorio/pacientes/estatisticas-cidade`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter a distribuição por cidade.');
        }
        return await response.json();
    }

    async obterEstatisticasPorFaixaEtaria(idadeMin, idadeMax) {
        const token = localStorage.getItem('token');
        const response = await fetch(
            `${API_BASE_URL}/relatorio/pacientes/estatisticas-faixa-etaria?idadeMin=${idadeMin}&idadeMax=${idadeMax}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter estatísticas por faixa etária.');
        }
        return await response.json();
    }

    async obterDistribuicaoPorSexo() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/relatorio/pacientes/estatisticas-sexo`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter a distribuição por sexo.');
        }
        return await response.json();
    }

    async obterDistribuicaoPorDataNascimento() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/relatorio/pacientes/estatisticas-data-nascimento`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter a distribuição por data de nascimento.');
        }
        return await response.json();
    }
}

export default RelatoriosPacientesService;
