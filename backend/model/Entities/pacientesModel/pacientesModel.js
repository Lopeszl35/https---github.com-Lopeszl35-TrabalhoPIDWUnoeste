const AbstractPacientesModel = require("../../abstratos/AbstractPacientesModel");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");


class PacientesService extends AbstractPacientesModel {
    constructor(pacientesRepository) {
        super();
        this.pacientesRepository = pacientesRepository;
    }

    async adicionarPaciente(pacienteData, connection) {
        try {
            const prontuario = await this.pacientesRepository.adicionarPaciente(pacienteData, connection);
            if(!prontuario) {
                throw new Error("Erro ao adicionar paciente na chamada ao repository");
            }
            return prontuario;
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
        }
    }

    async atualizarPaciente(pacienteData, connection) {
        try {
            const prontuario = await this.pacientesRepository.atualizarPaciente(pacienteData, connection)
            if(!prontuario) {
                throw new Error("Erro ao atualizar paciente na chamada ao repository");
            }
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
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
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

    async salvarEvolucao(evolucao, connection) {
        try {
            const evolucaoSalva = await this.pacientesRepository.salvarEvolucao(evolucao, connection);
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

module.exports = PacientesService