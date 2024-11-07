const AbstractPacienteService = require("./abstratos/AbstractPacientesService");

class PacientesService extends AbstractPacienteService {
    constructor(pacientesRepository, enderecosRepository, responsaveisRepository, database) {
        super();
        this.pacientesRepository = pacientesRepository;
        this.enderecosRepository = enderecosRepository;
        this.responsaveisRepository = responsaveisRepository;
        this.database = database;
    }

    async adicionarPaciente(paciente, endereco, responsavel) {
        let connection;
        try {
            connection = await this.database.beginTransaction();

            const pacienteAdicionado = await this.pacientesRepository.adicionarPaciente(
            paciente,
            connection
            );
            if(!pacienteAdicionado) {
                throw new Error("Erro ao adicionar paciente");
            }

            const endereco = await this.enderecosRepository.adicionarEndereco(endereco, connection);
            if(!endereco) {
                throw new Error("Erro ao adicionar endereço");
            }

            const responsavel = await this.responsaveisRepository.adicionarResponsavel(responsavel, connection);
            if(!responsavel) {
                throw new Error("Erro ao adicionar responsável");
            }

            await this.database.commitTransaction(connection);
            return {message: "Paciente adicionado com sucesso!"}
        } catch (error) {
            if (connection) {
                await this.database.rollbackTransaction(connection);
            }
            throw error;
        }
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