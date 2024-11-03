class AbstractServicosService {
  constructor() {
    if (new.target === AbstractServicosService) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }

  async obterServicos() {
    throw new Error("Metodo não implementado");
  }


}

module.exports = AbstractServicosService;
