class AbstractProfissionalServicosRepository {
  constructor() {
    if (new.target === AbstractProfissionalServicosRepository) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }

  async relacionarProfissionalAServico(idProfissional, idServico) {
    throw new Error("Metodo nao implementado");
  }

  async existeRelacionamentoProfissionalServico(idProfissional, idServico) {
    throw new Error("Metodo não implementado");
  }

  async deletarRelacao(idProfissional, idServico) {
    throw new Error("Metodo não implementado");
  }

  async obterRelacoesServico(id) {
    throw new Error("Metodo não implementado");
  }
}

module.exports = AbstractProfissionalServicosRepository;
