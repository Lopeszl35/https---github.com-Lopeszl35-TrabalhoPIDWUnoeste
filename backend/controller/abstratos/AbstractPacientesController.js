class AbstractAgendamentoController {
    constructor() {
        if (new.target === AbstractAgendamentoController) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async obterPacientes(req, res) {
        throw new Error("Metodo não implementado");
    }

}

module.exports = AbstractAgendamentoController