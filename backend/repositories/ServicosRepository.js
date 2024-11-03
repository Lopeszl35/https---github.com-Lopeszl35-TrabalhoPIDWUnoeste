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

}

module.exports = ServicosRepository;