const AbstractRegistrarPresencaModel = require("../../abstratos/AbstractRegistrarPresencaModel");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");
class RegistrarPresencaModel extends AbstractRegistrarPresencaModel {
    constructor(agendamentoRepository) {
        super();
        this.agendamentoRepository = agendamentoRepository;
    }

    async bucarAgendamentoPorData(data) {
        try {
            const agendamentos = await this.agendamentoRepository.buscarAgendamentoPorData(data);
            if (!agendamentos) {
                throw new Error("Nenhum agendamento encontrado");
            }
            return agendamentos;
        } catch (error) {
            console.log("Erro ao buscar agendamento por data", error);
            throw error;
        }
    }

    async registrarPresenca(idAgendamento, observacoes) {
        try {
            const resposta = await this.agendamentoRepository.registrarPresenca(idAgendamento, observacoes);
            return resposta;
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, 'agendamento');
            throw error;
        }
    }

    async registrarAusencia(idAgendamento, motivo) {
        try {
            const resposta = await this.agendamentoRepository.registrarAusencia(idAgendamento, motivo);
            return resposta;
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, 'agendamento');
            throw error;
        }
    }

    async cancelarAgendamento(idAgendamento, motivo) {
        try {
            const resposta = await this.agendamentoRepository.cancelarAgendamento(idAgendamento, motivo);
            return resposta;
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, 'agendamento');
            throw error;
        }
    }

}

module.exports = RegistrarPresencaModel;