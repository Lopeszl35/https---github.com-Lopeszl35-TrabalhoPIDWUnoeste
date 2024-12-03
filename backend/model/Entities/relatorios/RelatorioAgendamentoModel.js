const AbstractRelatorioAgendamentoModel = require("../../abstratos/AbstractRelatorioAgendamentoModel");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");

class RelatorioAgendamentoModel extends AbstractRelatorioAgendamentoModel {
    constructor(relatorioAgendamentoRepository) {
        super();
        this.relatorioAgendamentoRepository = relatorioAgendamentoRepository;
    }

    async relatorioAgendamentos(filtros) {
        try {
            return await this.relatorioAgendamentoRepository.obterRelatorioAgendamentos(filtros);
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "relatorioAgendamento");
            throw error;
        }
    }

    async obterEstatisticasAgendamentos() {
        try {
            return await this.relatorioAgendamentoRepository.obterEstatisticasAgendamentos();
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "relatorioAgendamento");
            throw error;
        }
    }

    async obterDistribuicaoPorData() {
        try {
            return await this.relatorioAgendamentoRepository.obterDistribuicaoPorData();
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "relatorioAgendamento");
            throw error;
        }
    }

    async obterDistribuicaoPorProfissional() {
        try {
            return await this.relatorioAgendamentoRepository.obterDistribuicaoPorProfissional();
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "relatorioAgendamento");
            throw error;
        }
    }

    async obterDistribuicaoPorServico() {
        try {
            return await this.relatorioAgendamentoRepository.obterDistribuicaoPorServico();
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "relatorioAgendamento");
            throw error;
        }
    }
}

module.exports = RelatorioAgendamentoModel;
