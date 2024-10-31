const AbstractUsuariosRepository = require("./abstratos/AbstractUsuariosRepository");

class UsuariosRepository extends AbstractUsuariosRepository {
  constructor(database) {
    super();
    this.database = database;
  }

  async adicionarUsuario(usuario) {
    console.log(`Adicionando o usuário ${usuario}`);
    const sql = `INSERT INTO usuarios (Email, Senha, Tipo_Permissao) VALUES (?, ?, ?)`;
    const params = [usuario.Email, usuario.Senha, usuario.Tipo_Permissao];
    try {
      await this.database.executaComandoNonQuery(sql, params);
      return { message: 'Usuário adicionado com sucesso' };
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error;  // Propaga o erro para captura detalhada no service
    }
  }

  async login(email) {
    const sql = `SELECT * FROM usuarios WHERE Email = ?`;
    try {
      const result = await this.database.executaComando(sql, [email]);
      return result[0];
    } catch (error) {
      throw new Error("Erro ao realizar login: " + error.message);
    }
  }

   async verificarSeUsuarioExiste(email) {
    const sql = `SELECT * FROM usuarios WHERE Email = ?`;
    try {
      const result = await this.database.executaComando(sql, [email]);
      return result.length > 0;
    } catch (error) {
      throw new Error("Erro ao verificar se usuário existe: " + error.message);
    }
  }

  async obterPorEmail(email) {
    const sql = `SELECT * FROM usuarios WHERE Email = ?`;
    const result = await DataBase.executaComando(sql, [email]);
    return result;
  }
}

module.exports = UsuariosRepository;
