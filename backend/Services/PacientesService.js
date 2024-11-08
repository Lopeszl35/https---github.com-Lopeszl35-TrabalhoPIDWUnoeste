const AbstractPacienteService = require("./abstratos/AbstractPacientesService");

class PacientesService extends AbstractPacienteService {
    constructor(pacientesRepository, enderecosRepository, responsaveisRepository, database) {
        super();
        this.pacientesRepository = pacientesRepository;
        this.enderecosRepository = enderecosRepository;
        this.responsaveisRepository = responsaveisRepository;
        this.database = database;
    }

    async adicionarPaciente(pacienteData, enderecoData, responsavelData) {
        let connection;
        try {
            connection = await this.database.beginTransaction();

            const prontuario = await this.pacientesRepository.adicionarPaciente(pacienteData, connection);
            console.log('prontuario: ', prontuario)
            if(!prontuario) {
                throw new Error("Erro ao adicionar paciente na chamada ao repository");
            }
            // Atualiza prontuario nos dados de endereço e responsável
            enderecoData.Prontuario = prontuario;
            responsavelData.Prontuario = prontuario;

            const enderecoAdicionado = await this.enderecosRepository.adicionarEndereco(enderecoData, connection);
            if(!enderecoAdicionado) {
                throw new Error("Erro ao adicionar endereço");
            }

            const responsavelAdicionado = await this.responsaveisRepository.adicionarResponsavel(responsavelData, connection);
            if(!responsavelAdicionado) {
                throw new Error("Erro ao adicionar responsável");
            }

            await this.database.commitTransaction(connection);
            return {message: 'Paciente adicionado com sucesso'};

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