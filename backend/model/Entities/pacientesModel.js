const DataBase = require("../database");
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

    async obterPorId(id) {
        const result = await dataBase.executaComando("SELECT * FROM pacientes WHERE Prontuario = ?", [id]);
        return result[0];
    }

    async adicionar(dadosPaciente) {
        dadosPaciente.Data_De_Nascimento = moment(dadosPaciente.Data_De_Nascimento).format('YYYY-MM-DD');
        await dataBase.executaComandoNonQuery('INSERT INTO pacientes SET ?', dadosPaciente);
    }

    async atualizar(id, dadosPaciente) {
        dadosPaciente.Data_De_Nascimento = moment(dadosPaciente.Data_De_Nascimento).format('YYYY-MM-DD');
        await dataBase.executaComandoNonQuery('UPDATE pacientes SET ? WHERE Prontuario = ?', [dadosPaciente, id]);
    }

    async deletar(id) {
        await dataBase.executaComandoNonQuery('DELETE FROM pacientes WHERE Prontuario = ?', [id]);
    }
    
} 

module.exports = PacientesModel;
