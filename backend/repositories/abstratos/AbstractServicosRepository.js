class AbstractServicosRepository {
  constructor() {
    if (new.target === AbstractServicosRepository) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }

  async obterServicos() {
    throw new Error("Metodo não implementado");
  }

}

module.exports = AbstractServicosRepository;