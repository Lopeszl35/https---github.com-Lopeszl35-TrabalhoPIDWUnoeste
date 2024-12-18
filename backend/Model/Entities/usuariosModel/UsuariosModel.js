const AbstractUsuariosModel = require("../../abstratos/AbstractUsuariosModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");

class UsuariosModel extends AbstractUsuariosModel {
  constructor(UsuarioRepository) {
    super();
    this.UsuarioRepository = UsuarioRepository;
  }

  async adicionarUsuario(email, senha, nome, tipoPermissao, connection) {
    console.log(`Usuario: Nome: ${nome} Email: ${email} Senha: ${senha} Permissão: ${tipoPermissao}`);
    try {
      const salt = await bycrypt.genSalt(10);
      const senhaHash = await bycrypt.hash(senha, salt);

      const novoUsuarioModel = {
        Email: email,
        Senha: senhaHash,
        nomeUsuario: nome,
        Tipo_Permissao: tipoPermissao,
      };
      console.log("novoUsuarioModel", novoUsuarioModel);
      const novoUsuairo = await this.UsuarioRepository.adicionarUsuario(novoUsuarioModel, connection);
      if (!novoUsuairo) {
        throw new Error("Erro ao adicionar usuario");
      }
      return novoUsuairo;
    } catch (error) {
     ErroSqlHandler.tratarErroSql(error, "usuario");
     throw error;
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
        return { token, user: usuario.Nome, tipoPermissao: usuario.Tipo_Permissao };
      }
    } catch (error) {
      throw error;
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

      if (!usuarioAtualizado) {
        throw new Error("Erro ao atualizar usuario");
      }
      return usuarioAtualizado;
    } catch (error) {
      throw error;
    }
  }

  async excluirUsuario(id) {
    try {
      const usuarioExcluido = await this.UsuarioRepository.excluirUsuario(id);
      if (!usuarioExcluido) {
        throw new Error("Erro ao excluir usuário");
      }
      return { message: "Usuário excluido com sucesso" };
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

module.exports = UsuariosModel;
