const AbstractRegistrarPresencaModel = require("../../abstratos/AbstractRegistrarPresencaModel");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");
const moment = require('moment-timezone');
class RegistrarPresencaModel extends AbstractRegistrarPresencaModel {
    constructor(agendamentoRepository) {
        super();
        this.agendamentoRepository = agendamentoRepository;
    }

    async buscarAgendamentoPorData(data) {
        try {
            const agendamentos = await this.agendamentoRepository.buscarAgendamentoPorData(data);
            if (!agendamentos) {
                throw new Error("Nenhum agendamento encontrado");
            }

            // Ajusta o campo Data_Hora e separa em Data e Hora
            const agendamentosAjustados = agendamentos.map((agendamento) => {
                const dataHoraLocal = moment(agendamento.Data_Hora).tz('America/Sao_Paulo');
                return {
                    ...agendamento,
                    Data: dataHoraLocal.format('YYYY-MM-DD'),
                    Hora: dataHoraLocal.format('HH:mm:ss'),
                };
            });

            return agendamentosAjustados;
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