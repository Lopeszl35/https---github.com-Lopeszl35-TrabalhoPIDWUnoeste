const DataBase = require('../database');

class UsuariosModel {
    async obterPorEmail(email) {
        const sql = `SELECT * FROM usuarios WHERE Email = ?`;
        const result = await DataBase.executaComando(sql, [email]);
        return result;
    }
}

module.exports = UsuariosModel;
