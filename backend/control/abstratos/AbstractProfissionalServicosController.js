class AbstractProfissionalServicosController {
  constructor() {
    if (new.target === AbstractProfissionalServicosController) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }

  async relacionarProfissionalAServico(req, res) {
    throw new Error("Metodo não implementado");
  }

  async deletarRelacao(req, res) {
    throw new Error("Metodo não implementado");
  }

  async profissionaisDoServico(req, res) {
    throw new Error("Metodo não implementado");
  }

  async buscarProfissionais(req, res) {
    throw new Error("Metodo não implementado");
  }
}

module.exports = AbstractProfissionalServicosController;
