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

}

module.exports = RelatorioAgendamentoModel;