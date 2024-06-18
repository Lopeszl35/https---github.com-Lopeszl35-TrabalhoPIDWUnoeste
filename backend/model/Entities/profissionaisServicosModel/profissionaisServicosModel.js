const DataBase = require("../../database");

const dataBase = new DataBase();

class ProfissionaisServicosModel {
    async inserir(idProfissional, idServico, connection) {
        const [profissional] = await connection.query("SELECT * FROM profissionais WHERE ID_Profissional = ?", [idProfissional]);
        if (profissional.length === 0) {
            throw new Error(`Profissional com ID ${idProfissional} não encontrado`);
        }

        const [servico] = await connection.query("SELECT * FROM servicos WHERE ID_Servico = ?", [idServico]);
        if (servico.length === 0) {
            throw new Error(`Serviço com ID ${idServico} não encontrado`);
        }

        const result = await connection.query("INSERT INTO profissionalservicos (ID_Profissional, ID_Servico) VALUES (?, ?)", [idProfissional, idServico]);
        return result;
    }

    async atualizar(idProfissional, idServico, connection) {
        const [profissional] = await connection.query("SELECT * FROM profissionais WHERE ID_Profissional = ?", [idProfissional]);
        if (profissional.length === 0) {
            throw new Error(`Profissional com ID ${idProfissional} não encontrado`);
        }

        const [servico] = await connection.query("SELECT * FROM servicos WHERE ID_Servico = ?", [idServico]);
        if (servico.length === 0) {
            throw new Error(`Serviço com ID ${idServico} não encontrado`);
        }

        const result = await connection.query(
            "UPDATE profissionalservicos SET ID_Profissional = ? WHERE ID_Servico = ?",
            [idProfissional, idServico]
        );
        return result;
    }
}

module.exports = ProfissionaisServicosModel;
