const { validationResult } = require("express-validator");
const AbstractProfissionaisServicosControl = require("./abstratos/AbstractProfissionalServicosControl");

class ProfissionaisServicosControl extends AbstractProfissionaisServicosControl {
  constructor(profissionalServicosModel, transactionUtils) {
    super();
    this.profissionalServicosModel = profissionalServicosModel;
    this.transactionUtils = transactionUtils;
  }

  // Relaciona um profissional a um serviço, garantindo atomicidade com transações
  async relacionarProfissionalAServico(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { idProfissional, idServico } = req.body;

    try {
      const result = await this.transactionUtils.executeTransaction(async (connection) => {
        // Relaciona o profissional ao serviço no banco de dados
        return await this.profissionalServicosModel.relacionarProfissionalAServico(
          idProfissional,
          idServico,
          connection
        );
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error("Erro ao relacionar profissional com serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Remove a relação entre profissional e serviço, garantindo atomicidade com transações
  async deletarRelacao(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { idProfissional, idServico } = req.body;

    try {
      const result = await this.transactionUtils.executeTransaction(async (connection) => {
        // Remove a relação no banco de dados
        return await this.profissionalServicosModel.deletarRelacao(
          idProfissional,
          idServico,
          connection
        );
      });

      return res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao deletar relação profissional-serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Obtém profissionais associados a um serviço
  async profissionaisDoServico(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
      // Obtém as relações no banco de dados
      const resultado = await this.profissionalServicosModel.obterRelacoesServico(id);
      return res.status(200).json(resultado);
    } catch (error) {
      console.error("Erro ao obter profissionais do serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Busca profissionais no banco de dados com base em termos e tipos de busca
  async buscarProfissionais(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { searchTerm, searchType } = req.query;

    try {
      // Busca os profissionais no banco de dados
      const resultado = await this.profissionalServicosModel.buscarProfissionais(searchTerm, searchType);
      return res.status(200).json(resultado);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ProfissionaisServicosControl;
