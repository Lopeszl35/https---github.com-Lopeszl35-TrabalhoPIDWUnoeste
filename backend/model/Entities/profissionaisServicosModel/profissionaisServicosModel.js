const DataBase = require("../../database");

const dataBase = new DataBase();

class ProfissionaisServicosModel {

    async inserir(idProfissional, idServico, connection) {
        const result = await connection.query("INSERT INTO profissionalservicos (ID_Profissional, ID_Servico) VALUES (?, ?)", [idProfissional, idServico]);
        return result;
    }
}

module.exports = ProfissionaisServicosModel