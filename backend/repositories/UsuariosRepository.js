const AbstractUsuariosRepository = require("./abstratos/AbstractUsuariosRepository");

class UsuariosRepository extends AbstractUsuariosRepository {
  constructor(database) {
    super();
    this.database = database;
  }

  async adicionar(usuario, connection) {
    await connection.query("INSERT INTO Usuarios SET ?", [usuario]);
  }

  async editarUsuarioPeloProfissional(usuario, connection) {
    await connection.query("UPDATE usuarios SET ? WHERE ID_Profissional = ?", [
      usuario,
      usuario.ID_Profissional,
    ]);
  }

  async excluirUsuarioPeloProfissional(id, connection) {
    await connection.query("DELETE FROM usuarios WHERE ID_Profissional = ?", [
      id,
    ]);
  }

  async obterPorIdProfissional(id) {
    const result = await dataBase.executaComando(
      "SELECT * FROM usuarios WHERE ID_Profissional = ?",
      [id]
    );
    return result[0];
  }

  async obterPorEmail(email) {
    const sql = `SELECT * FROM usuarios WHERE Email = ?`;
    const result = await DataBase.executaComando(sql, [email]);
    return result;
  }
}
