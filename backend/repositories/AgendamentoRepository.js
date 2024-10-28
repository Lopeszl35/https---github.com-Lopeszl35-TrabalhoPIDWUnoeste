const InterfaceAgendamentoRepository = require('../interfaces/InterfaceAgendamentoRepository');

class AgendamentoRepository extends InterfaceAgendamentoRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    async verificarAgendamentoExistente(prontuario, idServico, dataHora) {
        const sql = `
            SELECT * FROM Agendamentos 
            WHERE Prontuario = ? AND ID_Servico = ? AND DATE(Data_Hora) = DATE(?)
        `;
        const params = [prontuario, idServico, dataHora];

        try {
            const rows = await this.database.executaComando(sql, params);
            return rows.length > 0;
        } catch (error) {
            console.error('Erro ao verificar agendamento existente:', error);
            throw new Error('Erro ao verificar agendamento existente');
        }
    }

    async criarAgendamento(agendamento, connection) {
        const sql = `
            INSERT INTO Agendamentos (Prontuario, ID_Profissional, ID_Servico, Data_Hora, Status, Observacoes)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            agendamento.prontuario,
            agendamento.idProfissional,
            agendamento.idServico,
            agendamento.dataHora,
            agendamento.status,
            agendamento.observacoes
        ];
        
        try {
            const [result] = await connection.query(sql, params);
            const mensagem = 'Agendamento criado com sucesso';
            return { id: result.insertId, mensagem };
        } catch (error) {
            console.error('Erro ao criar agendamento no banco de dados:', error);
            throw new Error('Erro ao criar agendamento no banco de dados');
        }
    }
}

module.exports = AgendamentoRepository;
