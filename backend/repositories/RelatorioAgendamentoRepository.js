const AbstractRelatorioAgendamentoRepository = require("./abstratos/AbstractRelatorioAgendamentoRepository");

class RelatorioAgendamentoRepository extends AbstractRelatorioAgendamentoRepository {
    constructor(database) {
        super();
        this.database = database;
    }

     // Metodos relacionados ao relatorio
     async obterDadosAgendamentosParaRelatorio(filtros = {}) {
        try {
            // Corrigir estrutura de filtros
            const { dataInicio, dataFim, paciente, profissional, servico, status } = filtros.filtros || {};
    
            let query = `
                SELECT 
                    a.ID_Agendamento AS id_agendamento,
                    a.Data_Hora AS data_hora,
                    p.Nome_Completo AS paciente,
                    pr.Nome_Completo AS profissional,
                    s.Nome_Servico AS servico,
                    a.Status AS status,
                    a.Observacoes AS observacoes
                FROM 
                    Agendamentos a
                JOIN 
                    Pacientes p ON a.Prontuario = p.Prontuario
                JOIN 
                    Profissionais pr ON a.ID_Profissional = pr.ID_Profissional
                JOIN 
                    Servicos s ON a.ID_Servico = s.ID_Servico
                WHERE 1=1
            `;
    
            const params = [];
    
            // Adicione os filtros apenas se existirem
            if (dataInicio && dataFim) {
                query += ' AND DATE(a.Data_Hora) BETWEEN ? AND ?';
                params.push(dataInicio, dataFim);
            }
            if (paciente) {
                query += ' AND p.Nome_Completo LIKE ?';
                params.push(`%${paciente}%`);
            }
            if (profissional) {
                query += ' AND pr.Nome_Completo LIKE ?';
                params.push(`%${profissional}%`);
            }
            if (servico) {
                query += ' AND s.Nome_Servico LIKE ?';
                params.push(`%${servico}%`);
            }
            if (status) {
                query += ' AND a.Status = ?';
                params.push(status);
            }
    
            console.log("Query SQL:", query);
            console.log("Parâmetros:", params);
    
            const result = await this.database.executaComando(query, params);
            return result;
        } catch (error) {
            console.error("Erro ao obter dados de agendamentos para relatório:", error);
            throw error;
        }
    }
    

    async obterRelatorioAgendamentos({ data, paciente, profissional, servico, status, dataInicio, dataFim }) {
        let query = `
            SELECT 
                a.ID_Agendamento AS id_agendamento,
                a.Data_Hora AS data_hora,
                p.Nome_Completo AS paciente,
                pr.Nome_Completo AS profissional,
                s.Nome_Servico AS servico,
                a.Status AS status,
                a.Observacoes AS observacoes
            FROM Agendamentos a
            JOIN Pacientes p ON a.Prontuario = p.Prontuario
            JOIN Profissionais pr ON a.ID_Profissional = pr.ID_Profissional
            JOIN Servicos s ON a.ID_Servico = s.ID_Servico
            WHERE 1=1
        `;

        const params = [];
        if (data) {
            query += ' AND DATE(a.Data_Hora) = ?';
            params.push(data);
        }
        if (paciente) {
            query += ' AND p.Nome_Completo LIKE ?';
            params.push(`%${paciente}%`);
        }
        if (profissional) {
            query += ' AND pr.Nome_Completo LIKE ?';
            params.push(`%${profissional}%`);
        }
        if (servico) {
            query += ' AND s.Nome_Servico LIKE ?';
            params.push(`%${servico}%`);
        }
        if (status) {
            query += ' AND a.Status = ?';
            params.push(status);
        }
        if (dataInicio && dataFim) {
            query += ' AND DATE(a.Data_Hora) BETWEEN ? AND ?';
            params.push(dataInicio, dataFim);
          }

        try {
            const resultados = await this.database.executaComando(query, params);
            return resultados;
        } catch (error) {
            console.error('Erro ao gerar relatório de agendamentos:', error);
            throw error;
        }
    }

    async obterEstatisticasAgendamentos() {
        const query = `
            SELECT 
                a.Status AS status,
                COUNT(a.ID_Agendamento) AS total
            FROM Agendamentos a
            GROUP BY a.Status
        `;

        try {
            const resultados = await this.database.executaComando(query);
            return resultados;
        } catch (error) {
            console.error('Erro ao obter estatísticas de agendamentos:', error);
            throw error;
        }
    }

    async obterDistribuicaoPorData() {
        const query = `
            SELECT 
                DATE(a.Data_Hora) AS data,
                COUNT(a.ID_Agendamento) AS total
            FROM Agendamentos a
            GROUP BY DATE(a.Data_Hora)
            ORDER BY DATE(a.Data_Hora) ASC
        `;
    
        try {
            const resultados = await this.database.executaComando(query);
            return resultados;
        } catch (error) {
            console.error('Erro ao obter distribuição de agendamentos por data:', error);
            throw error;
        }
    }

    async obterDistribuicaoPorProfissional() {
        const query = `
            SELECT 
                pr.Nome_Completo AS profissional,
                COUNT(a.ID_Agendamento) AS total
            FROM Agendamentos a
            JOIN Profissionais pr ON a.ID_Profissional = pr.ID_Profissional
            GROUP BY pr.Nome_Completo
            ORDER BY total DESC
        `;

        try {
            const resultados = await this.database.executaComando(query);
            return resultados;
        } catch (error) {
            console.error('Erro ao obter distribuição por profissional:', error);
            throw error;
        }
    }

    async obterDistribuicaoPorServico() {
        const query = `
            SELECT 
                s.Nome_Servico AS servico,
                COUNT(a.ID_Agendamento) AS total
            FROM Agendamentos a
            JOIN Servicos s ON a.ID_Servico = s.ID_Servico
            GROUP BY s.Nome_Servico
            ORDER BY total DESC
        `;

        try {
            const resultados = await this.database.executaComando(query);
            return resultados;
        } catch (error) {
            console.error('Erro ao obter distribuição por serviço:', error);
            throw error;
        }
    }
}

module.exports = RelatorioAgendamentoRepository;
