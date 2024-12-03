const AbstractServicosRepository = require("./abstratos/AbstractServicosRepository");

class ServicosRepository extends AbstractServicosRepository {
  constructor(database) {
    super();
    this.database = database;
  }

  async obterServicos() {
    const sql = `SELECT * FROM Servicos`;
    try {
      const servicos = await this.database.executaComando(sql);
      return servicos;
    } catch (error) {
      throw error;
    }
  }

  async obterPorId(id) {
    const sql = `SELECT * FROM Servicos WHERE ID_Servico = ?`;
    try {
      const servico = await this.database.executaComando(sql, [id]);
      return servico[0];
    } catch (error) {
      throw error;
    }
  }

  async deletar(id, connection) {
    const sql = `DELETE FROM Servicos WHERE ID_Servico = ?`;
    try {
      await connection.query(sql, [id]);
    } catch (error) {
      throw error;
    }
  }

  async servicoExiste(nomeServico) {
    const sql = `SELECT * FROM Servicos WHERE Nome_Servico = ? `;
    try {
      const servicoExiste = await this.database.executaComando(sql, [
        nomeServico,
      ]);
      return servicoExiste.length > 0;
    } catch (error) {
      throw error;
    }
  }

  async adicionar(novoServico, connection) {
    const sql = `
      INSERT INTO Servicos (Nome_Servico, Descricao, Data_De_Cadastro, Status)
      VALUES (?, ?, ?, ?)
    `;
    const params = [
      novoServico.Nome_Servico,
      novoServico.Descricao,
      novoServico.Data_De_Cadastro.split("T")[0],
      novoServico.Status,
    ];
    try {
      const [resultado] = await connection.query(sql, params);
      return resultado.affectedRows > 0;
    } catch (error) {
      console.log("Erro ao adicionar serviço");
      throw error;
    }
  }

  async atualizar(servico, id, connection) {
    const sql = `
      UPDATE Servicos
      SET Nome_Servico = ?, Descricao = ?, Data_De_Cadastro = ?, Status = ?
      WHERE ID_Servico = ?
    `;
    const params = [
      servico.Nome_Servico,
      servico.Descricao,
      servico.Data_De_Cadastro.split("T")[0],
      servico.Status,
      id,
    ];
    try {
      const [resultado] = await connection.query(sql, params);
      return {sucesso: resultado.affectedRows > 0, servicoEditado: servico};
    } catch (error) {
      throw error;
    }
  }

}

module.exports = ServicosRepository;
