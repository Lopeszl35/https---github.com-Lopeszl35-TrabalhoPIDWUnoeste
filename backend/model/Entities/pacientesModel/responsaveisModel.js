const DataBase = require("../../database");

const dataBase = new DataBase();

class ResponsaveisModel {
    constructor(Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai) {
        this.Nome_Mae = Nome_Mae;
        this.Telefone_Mae = Telefone_Mae;
        this.Nome_Pai = Nome_Pai;
        this.Telefone_Pai = Telefone_Pai;
    }

    async obterPorProntuario(prontuario) {
        const result = await dataBase.executaComando("SELECT * FROM responsaveis WHERE Prontuario = ?", [prontuario]);
        return result[0];
    }

    async adicionar(dadosResponsavel, connection) {
        await connection.query('INSERT INTO responsaveis SET ?', dadosResponsavel);
    }

    async atualizar(prontuario, dadosResponsavel, connection) {
        await connection.query('UPDATE responsaveis SET ? WHERE Prontuario = ?', [dadosResponsavel, prontuario]);
    }

    async deletar(prontuario) {
        await dataBase.executaComandoNonQuery('DELETE FROM responsaveis WHERE Prontuario = ?', [prontuario]);
    }
}

module.exports = ResponsaveisModel;
