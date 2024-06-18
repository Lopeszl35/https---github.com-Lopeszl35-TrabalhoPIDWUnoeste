const DataBase = require("../../database");
const moment = require('moment');

const dataBase = new DataBase();

class PacientesModel {
    constructor(Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo) {
        this.Prontuario = Prontuario;
        this.Nome_Completo = Nome_Completo;
        this.Data_De_Nascimento = Data_De_Nascimento;
        this.CPF = CPF;
        this.RG = RG;
        this.CartaoSUS = CartaoSUS;
        this.Escola = Escola;
        this.Ano_Escolar = Ano_Escolar;
        this.Periodo = Periodo;
    }

    async obterTodos() {
        const listaPacientes = await dataBase.executaComando("SELECT * FROM pacientes");
        return listaPacientes;
    }

    async filtrarPorProntuario(id) {
        const result = await dataBase.executaComando("SELECT * FROM pacientes WHERE Prontuario = ?", [id]);
        return result[0];
    }

    async filtrarPorNome(nome) {
        const result = await dataBase.executaComando("SELECT * FROM pacientes WHERE LOWER(Nome_Completo) LIKE LOWER(?)", [`%${nome}%`]);
        return result;
    }

    async buscarUltimoPaciente() {
        const result = await dataBase.executaComando("SELECT MAX(prontuario) AS ultimo FROM pacientes");
        return result;
    }

    async adicionar(dadosPaciente, connection) {
        dadosPaciente.Data_De_Nascimento = moment(dadosPaciente.Data_De_Nascimento).format('YYYY-MM-DD');
        await connection.query('INSERT INTO pacientes SET ?', [dadosPaciente]);
    }

    async atualizar(id, dadosPaciente, connection) {
        dadosPaciente.Data_De_Nascimento = moment(dadosPaciente.Data_De_Nascimento).format('YYYY-MM-DD');
        await connection.query('UPDATE pacientes SET ? WHERE Prontuario = ?', [dadosPaciente, id]);
    }

    async deletar(id) {
        await dataBase.executaComandoNonQuery('DELETE FROM pacientes WHERE Prontuario = ?', [id]);
    }
}

module.exports = PacientesModel;
