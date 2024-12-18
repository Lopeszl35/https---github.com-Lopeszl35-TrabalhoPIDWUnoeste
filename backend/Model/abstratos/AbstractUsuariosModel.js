class AbstractUsuariosModel {
  constructor() {
    if (new.target === AbstractUsuariosModel) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }

  async adicionarUsuario(email, senha, nome, tipoPermissao) {
    throw new Error("Metodo deve ser implementado");
  }

  async login(email, senha) {
    throw new Error("Metodo deve ser implementado");
  }

  async editarUsuario(id, email, senha, tipoPermissao) {
    throw new Error("Metodo deve ser implementado");
  }

  async excluirUsuario(id) {
    throw new Error("Metodo deve ser implementado");
  }

  async obterUsuarios() {
    throw new Error("Metodo deve ser implementado");
  }

}

module.exports = AbstractUsuariosModel;
