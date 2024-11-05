const { validationResult } = require("express-validator");
const moment = require("moment");
const DataBase = require("../../database");

const dataBase = new DataBase();

class ServicosModel {
  constructor(nomeServico, descricao, dataDeCadastro, status) {
    this.Nome_Servico = nomeServico;
    this.Descricao = descricao;
    this.Data_De_Cadastro = dataDeCadastro;
    this.Status = status;
  }

  async adicionar(dadosServico, connection) {
    try {
      const servicoExiste = await dataBase.executaComando(
        "SELECT * FROM servicos WHERE Nome_Servico = ?",
        [dadosServico.Nome_Servico]
      );
      if (servicoExiste.length > 0) {
        return false;
      }
      dadosServico.Data_De_Cadastro = moment(
        dadosServico.Data_De_Cadastro
      ).format("YYYY-MM-DD");
      const [result] = await connection.query(
        "INSERT INTO servicos SET ?",
        dadosServico
      );
      return result.insertId;
    } catch (error) {
      console.log("Erro ao adicionar o Serviço:", error);
    }
  }

  async atualizar(id, dadosServico, connection) {
    dadosServico.Data_De_Cadastro = moment(
      dadosServico.Data_De_Cadastro
    ).format("YYYY-MM-DD");
    const [result] = await connection.query(
      "UPDATE servicos SET ? WHERE ID_Servico = ?",
      [dadosServico, id]
    );
    return result;
  }


  async filtrarPorNome(nome) {
    const result = await dataBase.executaComando(
      "SELECT * FROM servicos WHERE LOWER(Nome_Servico) LIKE LOWER(?)",
      [`%${nome}%`]
    );
    return result;
  }

  async filtrarPorProfissional(profissional) {
    const result = await dataBase.executaComando(
      `
            SELECT s.* 
            FROM servicos s
            JOIN profissionais p ON s.Profissional_Responsavel = p.ID_Profissional
            WHERE LOWER(p.Nome_Completo) LIKE LOWER(?)`,
      [`%${profissional}%`]
    );

    return result;
  }

  async filtrarPorStatus(status) {
    const result = await dataBase.executaComando(
      "SELECT * FROM servicos WHERE LOWER(Status) = LOWER(?)",
      [status]
    );
    return result;
  }
}

module.exports = ServicosModel;
