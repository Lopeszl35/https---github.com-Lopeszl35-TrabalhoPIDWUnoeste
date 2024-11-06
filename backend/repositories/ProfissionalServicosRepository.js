const AbstractProfissionalServicosRepository = require("./abstratos/AbstractProfissionalServicosRepository");

class ProfissionalServicosRepository extends AbstractProfissionalServicosRepository {
  constructor(database) {
    super();
    this.database = database;
  }

  async relacionarProfissionalAServico(idProfissional, idServico) {
    const sql = `
          INSERT INTO ProfissionalServicos (ID_Profissional, ID_Servico)
          VALUES (?, ?)
        `;
    try {
      const resultado = await this.database.executaComando(sql, [
        idProfissional,
        idServico,
      ]);
      return resultado.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao relacionar profissional com serviço:", error);
      throw error;
    }
  }

  async existeRelacionamentoProfissionalServico(idProfissional, idServico) {
    const sql = `
          SELECT * FROM ProfissionalServicos 
          WHERE ID_Profissional = ?
          AND ID_Servico = ?
        `;
    const params = [idProfissional, idServico];
    try {
      const profissionalServico = await this.database.executaComando(
        sql,
        params
      );
      return profissionalServico.length > 0;
    } catch (error) {
      console.error(
        "Erro ao verificar relacionamento profissional-serviço:",
        error
      );
      throw error;
    }
  }

  async deletarRelacao(idServico, idProfissional) {
    const sql = `
      DELETE FROM ProfissionalServicos
      WHERE ID_Servico = ?
      AND ID_Profissional = ?
    `;
    const params = [idServico, idProfissional];
    try {
      const relacaoDeletada = await this.database.executaComando(sql, params);
      return relacaoDeletada.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  async obterRelacoesServico(id) {
    const sql = `
    SELECT 
    p.Nome_Completo AS Nome_Profissional,
    p.Email,
    p.Telefone,
    p.registroProfissional
  FROM 
    ProfissionalServicos ps
  JOIN 
    Profissionais p ON ps.ID_Profissional = p.ID_Profissional
  WHERE 
    ps.ID_Servico = ?
    `;
    try {
      const relacoesObtidas = await this.database.executaComando(sql, [id]);
      return relacoesObtidas;
    } catch (error) {
      console.error("Erro ao obter relações de serviço:", error);
      throw error;
    }
  }
}

module.exports = ProfissionalServicosRepository;
