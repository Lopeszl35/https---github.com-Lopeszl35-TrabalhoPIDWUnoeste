const AbstractUsuariosService = require("./abstratos/AbstractUsuariosService");
const Usuario = require("../model/Entities/usuariosModel/UsuariosModel");

class UsusariosService extends AbstractUsuariosService {
  constructor(UsuarioRepository, database) {
    super();
    this.UsuarioRepository = UsuarioRepository;
    this.database = database;
  }

  async adicionarUsuario(idProfissional, email, senha, tipoPermissao) {}
}

module.exports = UsusariosService;
