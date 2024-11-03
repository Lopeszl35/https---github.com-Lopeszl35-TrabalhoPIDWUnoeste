const AbstractPacienteRepository = require('./abstratos/AbstractPacienteRepository');

class PacienteRepository extends AbstractPacienteRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    async obterPacientes() {
        const sql = `SELECT * FROM Pacientes`;
        try {
            const result = await this.database.executaComando(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PacienteRepository;