

class ResponsaveisModel {
    constructor(Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai) {
        this.Nome_Mae = Nome_Mae;
        this.Telefone_Mae = Telefone_Mae;
        this.Nome_Pai = Nome_Pai;
        this.Telefone_Pai = Telefone_Pai;
    }

    async obterTodos() {
        const result = await dataBase.executaComando("SELECT * FROM Responsaveis");
        return result;
    }

    async obterPorProntuario(prontuario) {
        const result = await dataBase.executaComando("SELECT * FROM Responsaveis WHERE Prontuario = ?", [prontuario]);
        return result[0];
    }

    async adicionar(dadosResponsavel, connection) {
        await connection.query('INSERT INTO Responsaveis SET ?', dadosResponsavel);
    }

    async atualizar(prontuario, dadosResponsavel, connection) {
        await connection.query('UPDATE Responsaveis SET ? WHERE Prontuario = ?', [dadosResponsavel, prontuario]);
    }

    async deletar(prontuario, connection) {
        await dataBase.executaComandoNonQuery('DELETE FROM Responsaveis WHERE Prontuario = ?', [prontuario]);
    }
}

module.exports = ResponsaveisModel;
