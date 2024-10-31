class AbstractUsuariosRepository {
  constructor() {
    if (new.target === AbstractUsuariosRepository) {
      throw new Error("Não é possivel instanciar uma classe abstrata");
    }
  }

  async adicionarUsuario(usuario) {
    throw new Error("Metodo deve ser implementado");
  }

  async login(email) {
    throw new Error("Metodo deve ser implementado");
  }

  async obterPorEmail(email) {
    throw new Error("Metodo deve ser implementado");
  }

  async editarUsuario(novoUsuario) {
    throw new Error("Metodo deve ser implementado");
  }
}

module.exports = AbstractUsuariosRepository;
