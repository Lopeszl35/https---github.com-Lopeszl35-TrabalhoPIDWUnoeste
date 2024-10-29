class AbstractAgendamentoRepository {
    constructor() {
        if(new.target === AbstractAgendamentoRepository) {
            throw new Error('Não é possível instanciar uma classe abstrata.');
        }
    }

    async obterTodasConsultas() {
        throw new Error('Metodo não implementado');
    }

    async verificarAgendamentoExistente(prontuario, idServico, dataHora) {
        throw new Error('Metodo não implementado');
    }

    async criarAgendamento(agendamento) {
        throw new Error('Metodo não implementado');
    }

    async buscarConsultaPorId(idAgendamento) {
        throw new Error('Metodo não implementado');
    }

    async arquivarConsulta(idAgendamento) {
        throw new Error('Metodo não implementado');
    }

    async verificarStatusAgendamento(id) {
        throw new Error('Metodo não implementado');
    }

}

module.exports = AbstractAgendamentoRepository