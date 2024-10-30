class AbstractUsuariosService {
  constructor() {
    if (new.target === AbstractUsuariosService) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }
}

module.exports = AbstractUsuariosService;
