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

  async deletar(id) {
    const sql = `DELETE FROM Servicos WHERE ID_Servico = ?`;
    try {
      await this.database.executaComando(sql, [id]);
    } catch (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        // ERRO DE VIOLACAO DE CHAVE ESTRANGEIRA
        throw new Error(
          "ViolacaoChaveEstrangeira: Não é possivel excluir o serviço porque ele esta em uso"
        );
      } else if (error.code === "ER_NO_REFERENCED_ROW_2") {
        // ERRO DE RESTRIÇÃO DE INTEGRIDADE REFERENCIAL
        throw new Error(
          "RestricaoIntegridadeReferencial: Serviço possui relacionamentos que impedem a exclusão"
        );
      } else {
        throw error;
      }
    }
  }

  async servicoExiste(nomeServico) {
    const sql = `SELECT * FROM Servicos WHERE Nome_Servico = ? `;
    try {
      await this.database.executaComando(sql, [nomeServico]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ServicosRepository;
