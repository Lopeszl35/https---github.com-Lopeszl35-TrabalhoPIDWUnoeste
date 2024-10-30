class AbstractUsuariosRepository {
  constructor() {
    if (new.target === AbstractUsuariosRepository) {
      throw new Error("Não é possivel instanciar uma classe abstrata");
    }
  }

  async adicionarUsuario(usuario, connection) {
    throw new Error("Metodo deve ser implementado");
  }
  
}

module.exports = AbstractUsuariosRepository;
