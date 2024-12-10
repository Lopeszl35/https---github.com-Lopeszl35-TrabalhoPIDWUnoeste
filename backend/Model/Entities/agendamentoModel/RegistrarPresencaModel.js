const AbstractRegistrarPresencaModel = require("../../abstratos/AbstractRegistrarPresencaModel");

class RegistrarPresencaModel extends AbstractRegistrarPresencaModel {
    constructor(agendamentoRepository) {
        super();
        this.agendamentoRepository = agendamentoRepository;
    }

    async bucarAgendamentoPorData(data) {
        if(!data) {
            throw new Error("Data nao informada");
        }
        try {
            const consultas = await this.agendamentoRepository.buscarAgendamentoPorData(data);
            if (!consultas) {
                throw new Error("Nenhum agendamento encontrado");
            }
            return consultas;
        } catch (error) {
            console.log("Erro ao buscar agendamento por data", error);
            throw error;
        }
    }

}

module.exports = RegistrarPresencaModel;