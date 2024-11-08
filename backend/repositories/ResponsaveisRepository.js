const AbstractResponsaveisRepository = require("./abstratos/AbstractResponsaveisRepository");

class ResponsaveisRepository extends AbstractResponsaveisRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    async adicionarResponsavel(responsavel, connection) {
        const sql = `
            INSERT INTO Responsaveis (Prontuario, Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai)
            VALUES (?, ?, ?, ?, ?)
        `;
        const params = [
            responsavel.Prontuario,
            responsavel.Nome_Mae,
            responsavel.Telefone_Mae,
            responsavel.Nome_Pai,
            responsavel.Telefone_Pai
        ];
        try {
            const resultado = await connection.query(sql, params);
            return resultado[0].affectedRows > 0;
        } catch (error) {
            console.error("Erro ao adicionar responsável:", error);
            throw error;
        }
    }
}

module.exports = ResponsaveisRepository;