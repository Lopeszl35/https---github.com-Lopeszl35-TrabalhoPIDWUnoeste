const AbstractRelatorioAgendamentoRepository = require("./abstratos/AbstractRelatorioAgendamentoRepository");

class RelatorioAgendamentoRepository extends AbstractRelatorioAgendamentoRepository  {
    constructor(database) {
        super();
        this.database = database;
    }

    // repositories/AgendamentosRepository.js
    async obterRelatorioAgendamentos({ data, paciente, profissional, servico }) {
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

        try {
            const resultados = await this.database.executaComando(query, params);
            return resultados;
        } catch (error) {
            console.error('Erro ao gerar relatório de agendamentos:', error);
            throw error;
        }
    }
}

module.exports = RelatorioAgendamentoRepository;