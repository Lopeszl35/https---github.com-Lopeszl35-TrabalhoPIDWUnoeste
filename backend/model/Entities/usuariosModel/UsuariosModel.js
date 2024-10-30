const DataBase = require("../../database");

const dataBase = new DataBase();

class UsuariosModel {
    constructor(profissionalId, email, senha, tipoPermissao) {
        this.ID_Profissional = profissionalId;
        this.Email = email;
        this.Senha = senha;
        this.Tipo_Permissao = tipoPermissao;
    }
}

module.exports = UsuariosModel;
