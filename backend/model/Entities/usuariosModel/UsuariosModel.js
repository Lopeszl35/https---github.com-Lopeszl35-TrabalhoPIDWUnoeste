const DataBase = require("../../database");

const dataBase = new DataBase();

class UsuariosModel {
    constructor(profissionalId, email, senha, tipoPermissao) {
        this.ID_Profissional = profissionalId;
        this.Email = email;
        this.Senha = senha;
        this.Tipo_Permissao = tipoPermissao;
    }

    async adicionar(usuario, connection) {
        await connection.query('INSERT INTO Usuarios SET ?', [usuario]);
    }

    async editarUsuarioPeloProfissional(usuario, connection) {
        await connection.query('UPDATE usuarios SET ? WHERE ID_Profissional = ?', [usuario, usuario.ID_Profissional]);
    }

    async excluirUsuarioPeloProfissional(id, connection) {
        await connection.query('DELETE FROM usuarios WHERE ID_Profissional = ?', [id]);
    }

    async obterPorIdProfissional(id) {
        const result =await dataBase.executaComando('SELECT * FROM usuarios WHERE ID_Profissional = ?', [id]);
        return result[0];
    }

    async obterPorEmail(email) {
        const sql = `SELECT * FROM usuarios WHERE Email = ?`;
        const result = await DataBase.executaComando(sql, [email]);
        return result;
    }
}

module.exports = UsuariosModel;
