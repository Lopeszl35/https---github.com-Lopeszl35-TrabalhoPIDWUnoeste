class AbstractAgendamentoService {
    constructor() {
        if (new.target === AbstractAgendamentoService) {
            throw new Error('Não é possível instanciar uma classe abstrata');
        }
    }

    async obterTodasConsultas() {
        throw new Error('Metodo não implementado');
    }

    async criarAgendamento(prontuario, idProfissional, idServico, dataHora, observacoes, status = 'Pendente') {
        throw new Error('Metodo não implementado');
    }

    async arquivarAgendamento(idAgendamento) {
        throw new Error('Metodo não implementado');
    }

}

module.exports = AbstractAgendamentoService