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
      //Verifica se usuario ja existe
      const usuarioExiste = await this.UsuarioRepository.verificarSeUsuarioExiste(email);
      if (usuarioExiste.legth > 0) {
        throw new Error(`Usuário já cadastrado com o email: ${email}`);
      }

      const salt = await bycrypt.genSalt(10);
      const senhaHash = await bycrypt.hash(senha, salt);

      const novoUsuarioModel = new Usuario(email, senhaHash, tipoPermissao);
      const novoUsuairo = await this.UsuarioRepository.adicionarUsuario(novoUsuarioModel);

      return novoUsuairo;
    } catch (error) {
      // Identifique o erro duplicado pelo código específico
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error(`O email '${email}' já está cadastrado. Escolha outro.`);
      }
      // Se for outro erro, lança a mensagem original do SQL
      throw new Error("Erro ao cadastrar usuário: " + error.message);
    }
  }

  async login(email, senha) {
    const usuario = await this.UsuarioRepository.login(email);
    if (!usuario) {
      throw new Error("Usuario não encontrado");
    }
    if(usuario) {
      const senhaDcrypt = bycrypt.compareSync(senha, usuario.Senha);
      if(!senhaDcrypt) {
        throw new Error("Senha incorreta");
      }
      const token = jwt.sign({ id: usuario.ID_Usuario, email: usuario.Email }, process.env.CHAVE_SECRETA, {
        expiresIn: 86400, 
      });
      return {token}

    }

  }



}

module.exports = UsuariosService;
