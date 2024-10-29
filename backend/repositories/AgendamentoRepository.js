const AbstractAgendamentoRepository = require("./abstratos/AbstractAgendamentoRepository");

class AgendamentoRepository extends AbstractAgendamentoRepository {
  constructor(database) {
    super();
    this.database = database;
  }

  async obterTodasConsultas() {
    const sql = `SELECT * FROM Agendamentos`;
    const rows = await this.database.executaComando(sql);
    return rows;
  }

  async obterConsultasDoPaciente(prontuario) {
    const sql = `
      SELECT 
        a.ID_Agendamento,
        a.Data_Hora,
        a.Status,
        a.Observacoes,
        s.Nome_Servico,
        p.Nome_Completo AS Nome_Profissional
      FROM 
        Agendamentos a
      JOIN 
        Servicos s ON a.ID_Servico = s.ID_Servico
      JOIN 
        Profissionais p ON a.ID_Profissional = p.ID_Profissional
      WHERE 
        a.Prontuario = ?;
    `;
    const parametros = [prontuario];

    try {
      const result = await this.database.executaComando(sql, parametros);
      return result;
    } catch (error) {
      console.log("Erro ao obter consultas de paciente");
      throw new Error("Erro ao obter consultas de paciente");
    }
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
      console.error("Erro ao verificar agendamento existente:", error);
      throw new Error("Erro ao verificar agendamento existente");
    }
  }

  async criarAgendamento(agendamento, connection) {
    const sql = `
            INSERT INTO Agendamentos (Prontuario, ID_Profissional, ID_Servico, Data_Hora, Status, Observacoes, arquivado)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const params = [
      agendamento.prontuario,
      agendamento.idProfissional,
      agendamento.idServico,
      agendamento.dataHora,
      agendamento.status,
      agendamento.observacoes,
      false,
    ];

    try {
      const [result] = await connection.query(sql, params);
      return { id: result.insertId, message: "Agendamento criado com sucesso" };
    } catch (error) {
      console.error("Erro ao criar agendamento no banco de dados:", error);
      throw new Error("Erro ao criar agendamento no banco de dados");
    }
  }

  async buscarConsultaPorId(idAgendamento) {
    const sql = `SELECT * FROM Agendamentos WHERE ID_Agendamento = ?`;
    const result = await this.database.executaComando(sql, [idAgendamento]);
    return result.length > 0 ? result[0] : null;
  }

  async arquivarConsulta(idAgendamento) {
    const sql = `
            UPDATE Agendamentos 
            SET Arquivado = TRUE, Status = CASE WHEN Status = 'Pendente' THEN 'Cancelado' ELSE Status END
            WHERE ID_Agendamento = ? AND (Status = 'Concluído' OR Status = 'Cancelado')
        `;
    const params = [idAgendamento];

    try {
      const result = await this.database.executaComandoNonQuery(sql, params);
      if (result.affectedRows === 0) {
        throw new Error("Consulta não encontrada ou já arquivada");
      }
      return { message: "Consulta arquivada com sucesso" };
    } catch (error) {
      console.error("Erro ao arquivar consulta:", error);
      throw new Error("Erro ao arquivar consulta");
    }
  }
}

module.exports = AgendamentoRepository;
