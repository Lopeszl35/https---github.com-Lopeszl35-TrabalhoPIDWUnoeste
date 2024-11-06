class AbstractProfissionalServicosController {
  constructor() {
    if (new.target === AbstractProfissionalServicosRepository) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }

  async relacionarProfissionalAServico(req, res) {
    throw new Error("Metodo não implementado");
  }

  async deletarRelacao(req, res) {
    throw new Error("Metodo não implementado");
  }
}

module.exports = AbstractProfissionalServicosController;
