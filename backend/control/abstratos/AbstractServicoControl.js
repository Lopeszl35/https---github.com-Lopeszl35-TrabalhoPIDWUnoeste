class AbstractServicoControl {
  constructor() {
    if (new.target === AbstractServicoControl) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }

  async obterServicos(req, res) {
    throw new Error("Metodo não implementado");
  }

  async obterPorId(req, res) {
    throw new Error("Metodo não implementado");
  }

  async deletar(req, res) {
    throw new Error("Metodo não implementado");
  }

  async adicionar(req, res) {
    throw new Error("Metodo não implementado");
  }

  async atualizar(req, res) {
    throw new Error("Metodo não implementado");
  }
}

module.exports = AbstractServicoControl;
