

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
        const result = await dataBase.executaComando("SELECT * FROM Enderecos");
        return result;
    }

    async obterPorProntuario(prontuario) {
        const result = await dataBase.executaComando("SELECT * FROM Enderecos WHERE Prontuario = ?", [prontuario]);
        return result[0];
    }

    async adicionar(dadosEndereco, connection) {
        await connection.query('INSERT INTO Enderecos SET ?', dadosEndereco);
    }

    async atualizar(prontuario, dadosEndereco, connection) {
        await connection.query('UPDATE Enderecos SET ? WHERE Prontuario = ?', [dadosEndereco, prontuario]);
    }

    async deletar(prontuario, connection) {
        await dataBase.executaComandoNonQuery('DELETE FROM Enderecos WHERE Prontuario = ?', [prontuario]);
    }
}

module.exports = EnderecosModel;
