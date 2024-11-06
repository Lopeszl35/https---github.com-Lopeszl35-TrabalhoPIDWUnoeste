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
}

module.exports = ProfissionalServicosRepository;
