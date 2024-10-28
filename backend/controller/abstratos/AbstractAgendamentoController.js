class AbstractAgendamentoController {
    constructor() {
        if (new.target === AbstractAgendamentoController) {
            throw new Error('Não é possível instanciar uma classe abstrata');
        }
    }

    async criarAgendamento(req, res) {
        throw new Error('Metodo não implementado');
    }

}

module.exports = AbstractAgendamentoController;