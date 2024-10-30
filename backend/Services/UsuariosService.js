const AbstractUsuariosService = require("./abstratos/AbstractUsuariosService");
const Usuario = require("../model/Entities/usuariosModel/UsuariosModel");

class UsusariosService extends AbstractUsuariosService {
  constructor(UsuarioRepository, database) {
    super();
    this.UsuarioRepository = UsuarioRepository;
    this.database = database;
  }

  async adicionarUsuario(email, senha, tipoPermissao) {
    try {
      //Verifica se usuario ja existe
      const usuarioExiste = await this.UsuarioRepository.verificarSeUsuarioExiste(email);
      if (usuarioExiste) {
        throw new Error("Usuario ja cadastrado com o email: ", email);
      }
      const novoUsuarioModel = new Usuario(email, senha, tipoPermissao);
      const novoUsuairo = await this.UsuarioRepository.adicionarUsuario(novoUsuarioModel);
      return novoUsuairo;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuário", error.message);
    }
  }
}

module.exports = UsusariosService;
