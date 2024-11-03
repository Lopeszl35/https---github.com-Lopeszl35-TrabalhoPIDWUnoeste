const AbstractPacienteService = require("./abstratos/AbstractPacientesService");

class PacientesService extends AbstractPacienteService {
    constructor(PacienteRepository, database) {
        super();
        this.PacienteRepository = PacienteRepository;
        this.database = database;
    }

    async obterPacientes() {
        try {
            const pacientes = await this.PacienteRepository.obterPacientes();
            if(!pacientes) {
                throw new Error("Nenhum paciente encontrado");  
            }
            return pacientes;
        } catch (error) {
            console.error("Erro ao obter pacientes:", error);
            throw error;
        }
    }

}

module.exports = PacientesService