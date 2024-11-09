const AbstractUsuariosService = require("./abstratos/AbstractUsuariosService");
const Usuario = require("../model/Entities/usuariosModel/UsuariosModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsuariosService extends AbstractUsuariosService {
  constructor(UsuarioRepository, database) {
    super();
    this.UsuarioRepository = UsuarioRepository;
    this.database = database;
  }

  async adicionarUsuario(email, senha, tipoPermissao) {
    try {
      const salt = await bycrypt.genSalt(10);
      const senhaHash = await bycrypt.hash(senha, salt);

      const novoUsuarioModel = new Usuario(email, senhaHash, tipoPermissao);
      const novoUsuairo = await this.UsuarioRepository.adicionarUsuario(
        novoUsuarioModel
      );

      return novoUsuairo;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error(
          `O email '${email}' já está cadastrado. Escolha outro.`
        );
      }
      throw new Error("Erro ao cadastrar usuário: " + error.message);
    }
  }

  async login(email, senha) {
    try {
      const usuario = await this.UsuarioRepository.login(email);
      if (!usuario) {
        throw new Error("Usuario não encontrado");
      }
      if (usuario) {
        const senhaDcrypt = bycrypt.compareSync(senha, usuario.Senha);
        if (!senhaDcrypt) {
          throw new Error("Senha incorreta");
        }
        const token = jwt.sign(
          { id: usuario.ID_Usuario, email: usuario.Email },
          process.env.CHAVE_SECRETA,
          {
            expiresIn: 86400,
          }
        );
        return { token };
      }
    } catch (error) {
      throw new Error("Erro ao realizar login: " + error.message);
    }
  }

  async editarUsuario(id, email, senha, tipoPermissao) {
    try {
      const salt = await bycrypt.genSalt(10);
      const senhaHash = await bycrypt.hash(senha, salt);

      const novoUsuarioModel = new Usuario(email, senhaHash, tipoPermissao);

      const usuarioAtualizado = await this.UsuarioRepository.editarUsuario(
        id, novoUsuarioModel
      );
      return usuarioAtualizado;
    } catch (error) {
      console.log("Erro ao editar usuário");
      throw error;
    }
  }

  async excluirUsuario(id) {
    try {
      const usuarioExcluido = await this.UsuarioRepository.excluirUsuario(id);
      return usuarioExcluido;
    } catch (error) {
      console.log("Erro ao excluir usuário");
      throw error;
    }
  }

  async obterUsuarios() {
    try {
      const usuarios = await this.UsuarioRepository.obterUsuarios();
      if(!usuarios) {
        throw new Error("Usuários nao encontrados");
      }
      return usuarios;
    } catch (error) {
      console.log("Erro ao obter usuários");
      throw error;
    }
  }

}

module.exports = UsuariosService;
