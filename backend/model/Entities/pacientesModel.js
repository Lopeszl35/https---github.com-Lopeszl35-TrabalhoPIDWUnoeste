const DataBase = require("../database");

const dataBase = new DataBase();

class PacientesModel {
    constructor(Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSus, Escola, Ano_Escolar, Periodo) {
        this.Prontuario = Prontuario;
        this.Nome_Completo = Nome_Completo;
        this.Data_De_Nascimento = Data_De_Nascimento;
        this.CPF = CPF;
        this.RG = RG;
        this.CartaoSus = CartaoSus;
        this.Escola = Escola;
        this.Ano_Escolar = Ano_Escolar;
        this.Periodo = Periodo;
    }

    async obterTodos() {
        const listaPacientes = await dataBase.executaComando("SELECT * FROM pacientes");
        return listaPacientes;
    }

}

module.exports = PacientesModel