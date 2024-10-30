const AbstractUsuariosRepository = require("./abstratos/AbstractUsuariosRepository");

class UsuariosRepository extends AbstractUsuariosRepository {
  constructor(database) {
    super();
    this.database = database;
  }

  async adicionarUsuario(usuario) {
    try {
      await this.database.executaComandoNonQuery("INSERT INTO Usuarios SET ?", [
        usuario,
      ]);
    } catch (error) {
      throw new Error("Erro ao adicionar usuário");
    }
  }

  async verificarSeUsuarioExiste(usuario) {
    const email = usuario.email;
    try {
      const usuarioExiste = await this.database.executaComando(
        "SELECT * FROM Usuarios WHERE Email = ?",
        [email]
      );
      return usuarioExiste;
    } catch (error) {
      throw new Error("Erro ao verificar usuario", error.message);
    }
  }

  async obterPorEmail(email) {
    const sql = `SELECT * FROM usuarios WHERE Email = ?`;
    const result = await DataBase.executaComando(sql, [email]);
    return result;
  }
}
