
const moment = require('moment');

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

    async obterPorId(id) {
        const result = await dataBase.executaComando("SELECT * FROM profissionais WHERE ID_Profissional = ?", [id]);
        return result[0];
    }

    async obterIdProfissionalPorNome(nomeProfissional) {
        const result = await dataBase.executaComando("SELECT ID_Profissional FROM profissionais WHERE LOWER(Nome_Completo) = LOWER(?)", [nomeProfissional]);
        if (result.length === 1) {
            return result[0].ID_Profissional;
        }
        console.log(`Profissional com nome ${nomeProfissional} não encontrado ou múltiplos resultados.`);
        return null;
    }

    async obterNomeProfissionalPorId(idServico) {
        const result = await dataBase.executaComando(
            `SELECT p.Nome_Completo 
             FROM Profissionais p
             JOIN ProfissionalServicos ps ON p.ID_Profissional = ps.ID_Profissional
             WHERE ps.ID_Servico = ?`,
            [idServico]
        );
        if (result.length === 1) {
            return result[0].Nome_Completo;
        }
        return null;
    }

    async editarProfissional(profissional, id, connection) {
        profissional.Data_Nascimento = moment(profissional.Data_Nascimento).format('YYYY-MM-DD');
        const result = await connection.query("UPDATE Profissionais SET ? WHERE ID_Profissional = ?", [profissional, id]);
        return result;
    }

    async excluirProfissional(id, connection) {
        await connection.query('DELETE FROM Profissionais WHERE ID_Profissional = ?', [id]);
    }

    async filtrarPorEspecialidade(especialidade) {
        try {
            const result = await dataBase.executaComando("SELECT * FROM Profissionais WHERE LOWER(Especialidade) LIKE LOWER(?)", [`%${especialidade}%`]);
            return result;
        } catch (error) {
            throw new Error('Erro ao filtrar profissionais por especialidade', error);
        }
    }

    async buscarProfissionais(searchTerm, searchType) {
        try {
            let sql = 'SELECT * FROM Profissionais WHERE 1=1';
            if (searchTerm) {
                if (searchType === 'nome') {
                    sql += ` AND LOWER(Nome_Completo) LIKE LOWER('%${searchTerm}%')`;
                } else if (searchType === 'especialidade') {
                    sql += ` AND LOWER(Especialidade) LIKE LOWER('%${searchTerm}%')`;
                }
            }
            const result = await dataBase.executaComando(sql);
            return result;
        } catch (error) {
            throw new Error('Erro ao buscar profissionais', error);
        }
    }
}

module.exports = ProfissionaisModel;
