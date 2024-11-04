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

    async obterDadosCompletosDoPaciente(prontuario) {
        try {
            const paciente = await this.PacienteRepository.obterDadosCompletosDoPaciente(prontuario);
            if (!paciente) {
                throw new Error("Paciente não encontrado");
            }
            return paciente;
        } catch (error) {
            console.error("Erro ao obter dados do paciente:", error);
            throw error;
        }
    }

}

module.exports = PacientesService