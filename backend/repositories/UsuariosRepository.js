const AbstractUsuariosRepository = require("./abstratos/AbstractUsuariosRepository");

class UsuariosRepository extends AbstractUsuariosRepository {
  constructor(database) {
    super();
    this.database = database;
  }

  async adicionarUsuario(usuario, connection) {
    const sql = `INSERT INTO usuarios (Email, Senha, Tipo_Permissao) VALUES (?, ?, ?)`;
    const params = [usuario.Email, usuario.Senha, usuario.Tipo_Permissao];
    try {
      const [result] = await connection.query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
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

  async obterPorEmail(email) {
    const sql = `SELECT * FROM usuarios WHERE Email = ?`;
    try {
      const result = await this.database.executaComando(sql, [email]);
      return result.length > 0;
    } catch (error) {
      throw new Error("Erro ao obter usuário: " + error.message);
    }
  }

  async editarUsuario(id, novoUsuario, connection) {
    const sql = `UPDATE usuarios SET Senha = ?, Tipo_Permissao = ?, Email = ? WHERE ID_Usuario = ?`;
    const params = [
      novoUsuario.Senha,
      novoUsuario.Tipo_Permissao,
      novoUsuario.Email,
      id
    ];
    try {
      const [result] = await connection.query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  async excluirUsuario(id, connection) {
    const sql = `DELETE FROM usuarios WHERE ID_Usuario = ?`;
    try {
      const [result] = await connection.query(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao excluir hete:", error);
      throw error;
    }
  }

  async obterUsuarios() {
    const sql = `SELECT * FROM usuarios`;
    try {
      const result = await this.database.executaComando(sql);
      return result;
    } catch (error) {
      throw new Error("Erro ao obter usuários: " + error.message);
    }
  }

}

module.exports = UsuariosRepository;
