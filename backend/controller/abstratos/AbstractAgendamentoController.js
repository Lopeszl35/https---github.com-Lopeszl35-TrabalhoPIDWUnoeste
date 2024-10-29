class AbstractAgendamentoController {
    constructor() {
        if (new.target === AbstractAgendamentoController) {
            throw new Error('Não é possível instanciar uma classe abstrata');
        }
    }

    async obterTodasConsultas(req, res) {
        throw new Error('Metodo não implementado');
    }

    async criarAgendamento(req, res) {
        throw new Error('Metodo não implementado');
    }

    async arquivarConsulta(req, res) {
        throw new Error('Metodo não implementado');
    }

}

module.exports = AbstractAgendamentoController;