const { validationResult } = require("express-validator");
const AbstractServicoController = require("./abstratos/AbstractServicoController");


class ServicoController extends AbstractServicoController {
  constructor(servicoService) {
    super();
    this.servicoService = servicoService;
  }

  async obterServicos(req, res) {
    try {
      const servicos = await this.servicoService.obterServicos();
      return res.status(200).json(servicos);
    } catch (error) {
      console.log("Erro ao obter os Serviços:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  async obterPorId(req, res) {
    console.log("Obtendo o Serviço por ID...");
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const servico = await this.servicoService.obterPorId(id);
      return res.status(200).json(servico);
    } catch (error) {
      console.log("Erro ao obter o serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  async deletar(req, res) {
    console.log("Deletando o Serviço...");
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await this.servicoService.deletar(id);
      return res.status(200).json({ message: "Serviço excluído com sucesso!" });
    } catch (error) {
      console.log("Erro ao excluir o serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  async adicionar(req, res) {
    console.log("Adicionando o Serviço...");
    const errors = validationResult(req);
    console.log(JSON.stringify(req.body));
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Nome_Servico, Descricao, Data_De_Cadastro, Status } = req.body;
    try {
      const resultado = await this.servicoService.adicionar(
        Nome_Servico,
        Descricao,
        Data_De_Cadastro,
        Status
      );
      return res.status(201).json(resultado);
    } catch (error) {
      console.log("log acionado pelo controller adicionar: ", error);
      return res.status(500).json({ message: error.message });
    }
  }

  async atualizar(req, res) {
    console.log("Atualizando o Serviço...");
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Nome_Servico, Descricao, Data_De_Cadastro, Status } = req.body;
    try {
      const result = await this.servicoService.atualizar(id, Nome_Servico, Descricao, Data_De_Cadastro, Status);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ServicoController;
