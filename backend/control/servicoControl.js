const { validationResult } = require("express-validator");
const AbstractServicoControl = require("./abstratos/AbstractServicoControl");

class ServicoControl extends AbstractServicoControl {
  constructor(servicosModel, transactionUtils) {
    super();
    this.servicoModel = servicosModel;
    this.transactionUtils = transactionUtils; // Utilitário para gerenciar transações
  }

  // Obtém todos os serviços (leitura, sem necessidade de transação)
  async obterServicos(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const servicos = await this.servicoModel.obterServicos();
      return res.status(200).json(servicos);
    } catch (error) {
      console.log("Erro ao obter os Serviços:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Obtém um serviço pelo ID (leitura, sem necessidade de transação)
  async obterPorId(req, res) {
    console.log("Obtendo o Serviço por ID...");
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const servico = await this.servicoModel.obterPorId(id);
      return res.status(200).json(servico);
    } catch (error) {
      console.log("Erro ao obter o serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Adiciona um novo serviço dentro de uma transação
  async adicionar(req, res) {
    console.log("Adicionando o Serviço...");
    const errors = validationResult(req);
    console.log(JSON.stringify(req.body));
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Nome_Servico, Descricao, Data_De_Cadastro, Status } = req.body;
    try {
      const resultado = await this.transactionUtils.executeTransaction(async (connection) => {
        // Adiciona o serviço dentro da transação
        return await this.servicoModel.adicionar(
          Nome_Servico,
          Descricao,
          Data_De_Cadastro,
          Status,
          connection
        );
      });

      return res.status(201).json(resultado);
    } catch (error) {
      console.log("Erro ao adicionar o serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Atualiza um serviço dentro de uma transação
  async atualizar(req, res) {
    console.log("Atualizando o Serviço...");
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Nome_Servico, Descricao, Data_De_Cadastro, Status } = req.body;
    try {
      const resultado = await this.transactionUtils.executeTransaction(async (connection) => {
        // Atualiza o serviço dentro da transação
        return await this.servicoModel.atualizar(
          id,
          Nome_Servico,
          Descricao,
          Data_De_Cadastro,
          Status,
          connection
        );
      });

      return res.status(200).json(resultado);
    } catch (error) {
      console.log("Erro ao atualizar o serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Deleta um serviço dentro de uma transação
  async deletar(req, res) {
    console.log("Deletando o Serviço...");
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const resultado = await this.transactionUtils.executeTransaction(async (connection) => {
        // Deleta o serviço dentro da transação
        return await this.servicoModel.deletar(id, connection);
      });

      return res.status(200).json({ message: "Serviço excluído com sucesso!" });
    } catch (error) {
      console.log("Erro ao excluir o serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ServicoControl;
