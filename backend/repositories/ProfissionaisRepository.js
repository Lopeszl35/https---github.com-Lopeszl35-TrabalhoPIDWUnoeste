const AbstractProfissionaisRepository = require('./abstratos/AbstractProfissionaisRepository');

class ProfissionaisRepository extends AbstractProfissionaisRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    async obterProfissionais() {
        const sql = `SELECT * FROM Profissionais`;;
        try {
            const profissionais = await this.database.executaComando(sql);
            return profissionais;
        } catch (error) {
            throw error;
        }
    }

    async obterPorId(id) {
        const sql = `SELECT * FROM Profissionais WHERE ID_Profissional = ?`;
        try {
            const profissional = await this.database.executaComando(sql, [id]);
            return profissional[0];
        } catch (error) {
            throw error;
        }
    }

    /*
    async profissionalDoServico(servico) {
        const params = [servico];
        const sql = `
            SELECT 
                p.ID_Profissional,
                p.Nome_Completo,
                p.CPF,
                p.Email,
                p.Especialidade
            FROM 
                Profissionais p
            JOIN 
                ProfissionalServicos ps ON p.ID_Profissional = ps.ID_Profissional
            JOIN 
                Servicos s ON ps.ID_Servico = s.ID_Servico
            WHERE 
                s.ID_Servico = ?;
        `;
        try {
            const profissionais = await this.database.executaComando(sql, params);
            return profissionais;
        } catch (error) {
            throw error;
        }
    }*/


}

module.exports = ProfissionaisRepository