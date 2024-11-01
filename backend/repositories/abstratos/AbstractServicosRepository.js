class AbstractServicosRepository {
  constructor() {
    if (new.target === AbstractServicosRepository) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }
}

module.exports = AbstractServicosRepository;
