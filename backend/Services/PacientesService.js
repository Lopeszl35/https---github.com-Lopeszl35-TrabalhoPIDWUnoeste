const AbstractPacienteService = require("./abstratos/AbstractPacientesService");
const ErroSqlHandler = require("../utils//ErroSqlHandler")

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
            ErroSqlHandler.tratarErroSql(error, "paciente");
        }
    }

    async atualizarPaciente(pacienteData, enderecoData, responsavelData) {
        let connection;
        try {
            connection = await this.database.beginTransaction();
            const prontuario = await this.pacientesRepository.atualizarPaciente(pacienteData, connection)
            if(!prontuario) {
                throw new Error("Erro ao atualizar paciente na chamada ao repository");
            }

            // Atualiza prontuario nos dados de endereço e responsável
            enderecoData.Prontuario = pacienteData.Prontuario;
            responsavelData.Prontuario = pacienteData.Prontuario;

            const enderecoAtualizado = await this.enderecosRepository.atualizarEndereco(enderecoData, connection);
            if(!enderecoAtualizado) {
                throw new Error("Erro ao atualizar endereço");
            }

            const responsavelAtualizado = await this.responsaveisRepository.atualizarResponsavel(responsavelData, connection);
            if(!responsavelAtualizado) {
                throw new Error("Erro ao atualizar responsável");
            }

            await this.database.commitTransaction(connection);
            return {message: 'Paciente atualizado com sucesso'};
        } catch (error) {
            if (connection) {
                await this.database.rollbackTransaction(connection);
            }
            ErroSqlHandler.tratarErroSql(error, "paciente");
        }
    }

    async deletarPaciente(prontuario) {
        try {
            const deletado = await this.pacientesRepository.deletarPaciente(prontuario);
            if(!deletado) {
                throw new Error("Erro ao deletar paciente na chamada ao repository");
            }
            return {message: 'Paciente excluído com sucesso'};
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
        }
    }

    async obterPacientes() {
        try {
            const pacientes = await this.pacientesRepository.obterPacientes();
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
            const paciente = await this.pacientesRepository.obterDadosCompletosDoPaciente(prontuario);
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