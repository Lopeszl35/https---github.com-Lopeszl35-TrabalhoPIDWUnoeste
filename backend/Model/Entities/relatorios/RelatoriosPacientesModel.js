const AbstractRelatorioPacientesModel = require("../../abstratos/AbstracRelatorioPacientesModel");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");

class RelatorioPacientesModel extends AbstractRelatorioPacientesModel {
    constructor(relatorioPacientesRepository) {
        super();
        this.relatorioPacientesRepository = relatorioPacientesRepository;
    }

    async obterRelatorioPacientes(filtros) {
        try {
            return await this.relatorioPacientesRepository.obterRelatorioPacientes(filtros);
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
        }
    }

    async obterDistribuicaoPorEstado() {
        try {
            return await this.relatorioPacientesRepository.obterDistribuicaoPorEstado();
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
        }
    }

    async obterDistribuicaoPorCidade() {
        try {
            return await this.relatorioPacientesRepository.obterDistribuicaoPorCidade();
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
        }
    }

    async obterEstatisticasPorFaixaEtaria() {
        try {
            return await this.relatorioPacientesRepository.obterEstatisticasPorFaixaEtaria();
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
        }
    }

    async obterDistribuicaoPorSexo() {
        try {
            return await this.relatorioPacientesRepository.obterDistribuicaoPorSexo();
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
        }
    }

   async obterDistribuicaoPorDataNascimento() {
        try {
            return await this.relatorioPacientesRepository.obterDistribuicaoPorDataNascimento();
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "paciente");
            throw error;
        }
    }

    
}

module.exports = RelatorioPacientesModel;
