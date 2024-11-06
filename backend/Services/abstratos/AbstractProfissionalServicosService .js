class AbstractProfissionalServicosService {
  constructor() {
    if (new.target === AbstractProfissionalServicosService) {
      throw new Error("Classe abstrata nao pode ser instanciada");
    }
  }

  async relacionarProfissionalAServico(idProfissional, idServico) {
    throw new Error("Metodo não implementado");
  }

  async deletarRelacao(idServico, idProfissional) {
    throw new Error("Metodo não implementado");
  }
}

module.exports = AbstractProfissionalServicosService;
