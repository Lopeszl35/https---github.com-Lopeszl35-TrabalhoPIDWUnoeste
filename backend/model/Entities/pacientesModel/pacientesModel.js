const AbstractPacientesModel = require("./abstratos/AbstractPacientesModel");
class PacientesModel extends AbstractPacientesModel {
    constructor(pacientesRepository, enderecosRepository, responsaveisRepository) {
        super();
        this.pacientesRepository = pacientesRepository;
        this.enderecosRepository = enderecosRepository;
        this.responsaveisRepository = responsaveisRepository;
    }

    async adicionarPaciente(pacienteData, enderecoData, responsavelData, connection) {
        try {
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

            return {message: 'Paciente adicionado com sucesso'};
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
        }
    }

    async atualizarPaciente(pacienteData, enderecoData, responsavelData, connection) {
        try {
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
            return {message: 'Paciente atualizado com sucesso'};
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
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

    async buscarPaciente(searchTerm, searchType) {
        try {
            const pacientes = await this.pacientesRepository.buscarPaciente(searchTerm, searchType);
            if (!pacientes) {
                throw new Error("Nenhum paciente encontrado");
            }
            return pacientes;
        } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
            throw error;
        }
    }

    async salvarEvolucao(evolucao) {
        try {
            const evolucaoSalva = await this.pacientesRepository.salvarEvolucao(evolucao);
            if (!evolucaoSalva) {
                throw new Error("Erro ao salvar evolução");
            }
            return evolucaoSalva;
        } catch (error) {
            console.error("Erro ao salvar evolução:", error);
            throw error;
        }
    }

    async obterEvolucoesDoPaciente(prontuario) {
        try {
            const evolucoes = await this.pacientesRepository.obterEvolucoesDoPaciente(prontuario);
            if (!evolucoes) {
                throw new Error("Nenhuma evolução encontrada");
            }
            return evolucoes;
        } catch (error) {
            console.error("Erro ao obter evoluções do paciente:", error);
            throw error;
        }
    }
}

module.exports = PacientesModel;
