const DataBase = require("../../database");
const moment = require('moment');

const dataBase = new DataBase();

class ProfissionaisModel {
    constructor(Nome_Completo, CPF, RG, Data_Nascimento, Telefone, Email, Especialidade, registroProfissional) {
        this.Nome_Completo = Nome_Completo;
        this.CPF = CPF;
        this.RG = RG;
        this.Data_Nascimento = Data_Nascimento;
        this.Telefone = Telefone;
        this.Email = Email;
        this.Especialidade = Especialidade;
        this.registroProfissional = registroProfissional;
    }

    async adicionar(profissional, connection) {
        profissional.Data_Nascimento = moment(profissional.Data_Nascimento).format('YYYY-MM-DD');
        const [result] = await connection.query('INSERT INTO Profissionais SET ?', [profissional]);
        return result.insertId;
    }

    async obterTodos() {
        const listaProfissionais = await dataBase.executaComando("SELECT * FROM Profissionais");
        return listaProfissionais;
    }

    async filtrarPorEspecialidade(especialidade) {
        try {
            const result = await dataBase.executaComando("SELECT * FROM Profissionais WHERE LOWER(Especialidade) LIKE LOWER(?)", [`%${especialidade}%`]);
            return result;
        } catch (error) {
            throw new Error('Erro ao filtrar profissionais por especialidade', error);
        }
    }
}

module.exports = ProfissionaisModel;
