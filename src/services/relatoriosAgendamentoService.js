const API_BASE_URL = 'http://localhost:3001';

class RelatorioAgendamentoService {
    // Obter agendamentos com filtros
    async obterAgendamentos(filtros = {}) {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams(filtros).toString();
        const response = await fetch(`${API_BASE_URL}/relatorio/agendamentos?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter os Agendamentos!');
        }
        const data = await response.json();
        return data;
    }

    // Obter estatísticas de agendamentos por status
    async obterEstatisticasAgendamentos() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/relatorio/agendamentos/estatisticas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter as estatísticas de Agendamentos!');
        }
        const data = await response.json();
        return data;
    }

    // Obter distribuição de agendamentos por data
    async obterDistribuicaoPorData() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/relatorio/agendamentos/distribuicao-por-data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter a distribuição por data!');
        }
        const data = await response.json();
        return data;
    }

    // Obter distribuição de agendamentos por profissional
    async obterDistribuicaoPorProfissional() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/relatorio/agendamentos/distribuicao-por-profissional`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter a distribuição por profissional!');
        }
        const data = await response.json();
        return data;
    }

    // Obter distribuição de agendamentos por serviço
    async obterDistribuicaoPorServico() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/relatorio/agendamentos/distribuicao-por-servico`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao obter a distribuição por serviço!');
        }
        const data = await response.json();
        return data;
    }

       // Baixar relatório em PDF
       async gerarRelatorioPdf(filtros = {}) {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams(filtros).toString();
        const response = await fetch(`${API_BASE_URL}/relatorio/gerarPdf?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao gerar o relatório em PDF!');
        }
        const blob = await response.blob();
        return blob;
    }

    // Baixar relatório em Excel
    async gerarRelatorioExcel(filtros = {}) {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams(filtros).toString();
        const response = await fetch(`${API_BASE_URL}/relatorio/gerarExcel?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao gerar o relatório em Excel!');
        }
        const blob = await response.blob();
        return blob;
    }
}

export default RelatorioAgendamentoService;