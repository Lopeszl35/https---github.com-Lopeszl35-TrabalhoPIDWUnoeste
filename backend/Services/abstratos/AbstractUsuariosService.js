class AbstractUsuariosService {
  constructor() {
    if (new.target === AbstractUsuariosService) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }

  async adicionarUsuario(idProfissional, email, senha, tipoPermissao) {
    throw new Error("Metodo deve ser implementado");
  }
}

module.exports = AbstractUsuariosService;
