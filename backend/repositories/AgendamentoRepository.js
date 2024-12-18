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

  async verificarDisponibilidadeHorario(idHorarioProfissional) {
    const sql = `
            SELECT * FROM HorariosDisponiveis 
            WHERE ID_Horario = ? AND Disponivel = 1
        `;
    const params = [idHorarioProfissional];

    try {
      const rows = await this.database.executaComando(sql, params);
      return rows.length > 0;
    } catch (error) {
      console.error("Erro ao verificar disponibilidade de horario:", error);
      throw new Error("Erro ao verificar disponibilidade de horario");
    }
  }

  async criarAgendamento(agendamento, idHorarioProfissional, connection) {
    console.log("DataHora recebido no repositório:", agendamento.dataHora);
    const sqlAgendamento = `
            INSERT INTO Agendamentos (Prontuario, ID_Profissional, ID_Servico, Data_Hora, Status, Observacoes, arquivado)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const paramsAgendamento = [
      agendamento.prontuario,
      agendamento.idProfissional,
      agendamento.idServico,
      agendamento.dataHora,
      agendamento.status,
      agendamento.observacoes,
      false,
    ];

    const sqlHorarioProfissional = `
      UPDATE HorariosDisponiveis SET Disponivel = 0 WHERE ID_Horario = ?
    `;
    const paramsHorarioProfissional = [idHorarioProfissional];

    try {
      const [resultAgendamento] = await connection.query(sqlAgendamento, paramsAgendamento);
      await connection.query(sqlHorarioProfissional, paramsHorarioProfissional);
      return { id: resultAgendamento.insertId, message: "Agendamento criado com sucesso" };
    } catch (error) {
      console.error("Erro ao criar agendamento no banco de dados:", error);
      throw error;
    }
  }

  async editarAgendamento(agendamento, connection) {
    const sql = `
        UPDATE Agendamentos
        SET 
            ID_Profissional = ?, 
            ID_Servico = ?, 
            Data_Hora = ?, 
            Status = ?, 
            Observacoes = ?
        WHERE 
            ID_Agendamento = ?
    `;
    const params = [
      agendamento.idProfissional,
      agendamento.idServico,
      agendamento.dataHora,
      agendamento.status,
      agendamento.observacoes,
      agendamento.idAgendamento,
    ];

    try {
      const [result] = await connection.query(sql, params);
      if (result.affectedRows === 0) {
        throw new Error("Nenhum agendamento encontrado para atualizar");
      }
      return { message: "Agendamento atualizado com sucesso" };
    } catch (error) {
      console.error("Erro ao atualizar agendamento no banco de dados:", error);
      throw new Error("Erro ao atualizar agendamento no banco de dados");
    }
  }

  async buscarConsultaPorId(idAgendamento) {
    const sql = `SELECT * FROM Agendamentos WHERE ID_Agendamento = ?`;
    const result = await this.database.executaComando(sql, [idAgendamento]);
    return result.length > 0 ? result[0] : null;
  }


  async obterConsultasNaoArquivadas() {
    try {
      const sql = `
            SELECT * FROM Agendamentos
            WHERE Arquivado = FALSE
    `
      const rows = await this.database.executaComando(sql);
      return rows;
    } catch (error) {
      console.log("Erro ao obter consultas nao arquivadas");
      throw error;
    }
  }

  async buscarConsultaPacientePorData(prontuario, data) {
    const sql = `
    SELECT 
      a.ID_Agendamento,
      a.Prontuario,
      a.ID_Profissional,
      a.ID_Servico,
      a.Data_Hora,
      a.Status,
      a.Observacoes,
      a.Arquivado,
      p.Nome_Completo AS Profissional,
      s.Nome_Servico AS Servico
    FROM 
      Agendamentos a
    JOIN 
      Profissionais p ON a.ID_Profissional = p.ID_Profissional
    JOIN 
      Servicos s ON a.ID_Servico = s.ID_Servico
    WHERE 
      a.Prontuario = ?
      AND DATE(CONVERT_TZ(a.Data_Hora, '+00:00', '-03:00')) = DATE(?)
  `;
    const params = [prontuario, data];
    try {
      const result = await this.database.executaComando(sql, params);
      return result;
    } catch (error) {
      console.error("Erro ao buscar consulta por data:", error);
      throw new Error("Erro ao buscar consulta por data");
    } 
  }

  // Metodos relacionados ao relatorio
  async obterDadosAgendamentosParaRelatorio() {
    try {
      const sql = `
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
      `;
      const result = await this.database.executaComando(sql);
      return result;
    } catch (error) {
      console.error("Erro ao obter dados de agendamentos para relatório:", error);
      throw error;
    }
  }

    // Métodos relacionados a registro de presença
    async buscarAgendamentoPorData(data) {
      const sql = `
        SELECT a.ID_Agendamento, a.Data_Hora, a.ID_Servico, a.Status, a.Observacoes, s.Nome_Servico, pr.Nome_Completo AS Profissional,
        p.Nome_Completo AS Paciente
        FROM Agendamentos a
        JOIN Pacientes p ON a.Prontuario = p.Prontuario
        JOIN Servicos s ON a.ID_Servico = s.ID_Servico
        JOIN Profissionais pr ON a.ID_Profissional = pr.ID_Profissional
        WHERE DATE(Data_Hora) = DATE(?)
      `
      try {
        const result = await this.database.executaComando(sql, [data]);
        return result;
      } catch (error) {
        console.error("Erro ao buscar consulta por data:", error);
        throw error;
      }
    }

    async registrarPresenca(idAgendamento, observacoes) {
      const sql = `
        UPDATE Agendamentos
        SET Status = 'Concluído', Observacoes = ?, Arquivado = TRUE
        WHERE ID_Agendamento = ?
      `
      try {
        const result = await this.database.executaComandoNonQuery(sql, [observacoes, idAgendamento]);
        return result;
      } catch (error) {
        console.error("Erro ao registrar presença:", error);
        throw error;
      }
    }

    async registrarAusencia(idAgendamento, motivo) {
      const sql = `
        UPDATE Agendamentos
        SET Status = 'Cancelado', Observacoes = ?, Arquivado = TRUE
        WHERE ID_Agendamento = ?
      `
      try {
        const result = await this.database.executaComandoNonQuery(sql, [motivo, idAgendamento]);
        return result;
      } catch (error) {
        console.error("Erro ao registrar ausência:", error);
        throw error;
      }
    }
    
    async cancelarAgendamento(idAgendamento, motivo) {
      const sql = `
        UPDATE Agendamentos
        SET Status = 'Cancelado', Observacoes = ?, Arquivado = TRUE
        WHERE ID_Agendamento = ?
      `
      try {
        const result = await this.database.executaComandoNonQuery(sql, [motivo, idAgendamento]);
        return result;
      } catch (error) {
        console.error("Erro ao registrar ausência:", error);
        throw error;
      }

    }

}

module.exports = AgendamentoRepository;
