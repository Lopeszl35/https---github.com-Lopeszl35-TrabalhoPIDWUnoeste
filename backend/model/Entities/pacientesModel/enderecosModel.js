const DataBase = require("../../database");

const dataBase = new DataBase();

class EnderecosModel {
    constructor(Prontuario, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP) {
        this.Prontuario = Prontuario;
        this.Logradouro = Logradouro;
        this.Numero = Numero;
        this.Complemento = Complemento;
        this.Bairro = Bairro;
        this.Cidade = Cidade;
        this.Estado = Estado;
        this.CEP = CEP;
    }

    async obterTodos() {
        const result = await dataBase.executaComando("SELECT * FROM enderecos");
        return result;
    }

    async obterPorProntuario(prontuario) {
        const result = await dataBase.executaComando("SELECT * FROM enderecos WHERE Prontuario = ?", [prontuario]);
        return result[0];
    }

    async adicionar(dadosEndereco, connection) {
        await connection.query('INSERT INTO enderecos SET ?', dadosEndereco);
    }

    async atualizar(prontuario, dadosEndereco, connection) {
        await connection.query('UPDATE enderecos SET ? WHERE Prontuario = ?', [dadosEndereco, prontuario]);
    }

    async deletar(prontuario, connection) {
        await dataBase.executaComandoNonQuery('DELETE FROM enderecos WHERE Prontuario = ?', [prontuario]);
    }
}

module.exports = EnderecosModel;
