const AbstractServicosRepository = require("./abstratos/AbstractServicosRepository");

class ServicosRepository extends AbstractServicosRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    async obterServicos() {
        const sql = `SELECT * FROM Servicos`;
        try {
            const servicos = await this.database.executaComando(sql);
            return servicos;
        } catch (error) {
            throw error;
        }
    }

    async obterPorId(id) {
        const sql = `SELECT * FROM Servicos WHERE ID_Servico = ?`
        try {
            const servico = await this.database.executaComando(sql, [id]);
            return servico[0];
        } catch (error) {
            throw error;
        }
        
    }

}

module.exports = ServicosRepository;