class AbstractUsuariosRepository {
  constructor() {
    if (new.target === AbstractUsuariosRepository) {
      throw new Error("Não é possivel instanciar uma classe abstrata");
    }
  }

  
}

module.exports = AbstractUsuariosRepository;
