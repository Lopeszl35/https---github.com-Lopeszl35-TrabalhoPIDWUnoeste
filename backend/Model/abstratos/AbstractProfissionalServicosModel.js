class AbstractProfissionalServicosModel {
  constructor() {
    if (new.target === AbstractProfissionalServicosModel) {
      throw new Error("Classe abstrata nao pode ser instanciada");
    }
  }

  async relacionarProfissionalAServico(idProfissional, idServico) {
    throw new Error("Metodo não implementado");
  }

  async deletarRelacao(idProfissional, idServico) {
    throw new Error("Metodo não implementado");
  }

  async obterRelacoesServico(id) {
    throw new Error("Metodo não implementado");
  }

  async buscarProfissionais(searchTerm, searchType) {
    throw new Error("Metodo não implementado");
  }
}

module.exports = AbstractProfissionalServicosModel;
