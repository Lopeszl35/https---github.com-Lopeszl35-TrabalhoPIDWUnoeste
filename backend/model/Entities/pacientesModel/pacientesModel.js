
const moment = require('moment');


class PacientesModel {
    constructor(Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo, Email) {
        this.Prontuario = Prontuario;
        this.Nome_Completo = Nome_Completo;
        this.Data_De_Nascimento = Data_De_Nascimento;
        this.CPF = CPF;
        this.RG = RG;
        this.CartaoSUS = CartaoSUS;
        this.Escola = Escola;
        this.Ano_Escolar = Ano_Escolar;
        this.Periodo = Periodo;
        this.Email = Email;
    }

   
    async filtrarPorProntuario(id) {
        const result = await dataBase.executaComando("SELECT * FROM Pacientes WHERE Prontuario = ?", [id]);
        return result[0];
    }

    async filtrarPorNome(nome) {
        const result = await dataBase.executaComando("SELECT * FROM Pacientes WHERE LOWER(Nome_Completo) LIKE LOWER(?)", [`%${nome}%`]);
        return result;
    }

    async buscarUltimoPaciente() {
        const result = await dataBase.executaComando("SELECT MAX(prontuario) AS ultimo FROM Pacientes");
        return result[0];
    }

    async adicionar(dadosPaciente, connection) {
        dadosPaciente.Data_De_Nascimento = moment(dadosPaciente.Data_De_Nascimento).format('YYYY-MM-DD');
        await connection.query('INSERT INTO Pacientes SET ?', [dadosPaciente]);
    }

    async atualizar(id, dadosPaciente, connection) {
        dadosPaciente.Data_De_Nascimento = moment(dadosPaciente.Data_De_Nascimento).format('YYYY-MM-DD');
        await connection.query('UPDATE Pacientes SET ? WHERE Prontuario = ?', [dadosPaciente, id]);
    }

    async deletar(id) {
        await dataBase.executaComandoNonQuery('DELETE FROM Pacientes WHERE Prontuario = ?', [id]);
    }
}

module.exports = PacientesModel;
