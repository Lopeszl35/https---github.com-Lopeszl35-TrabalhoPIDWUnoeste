class AbstractServicosService {
  constructor() {
    if (new.target === AbstractServicosService) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }
}

module.exports = AbstractServicosService;
