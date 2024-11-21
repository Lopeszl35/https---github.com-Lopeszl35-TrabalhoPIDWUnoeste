class AbstractPacientesController {
    constructor() {
        if (new.target === AbstractPacientesController) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async adicionarPaciente(req, res) {
        throw new Error("Metodo não implementado");
    }

    async atualizarPaciente(req, res) {
        throw new Error("Metodo não implementado");
    }

    async deletarPaciente(req, res) {
        throw new Error("Metodo não implementado");
    }

    async obterPacientes(req, res) {
        throw new Error("Metodo não implementado");
    }

    async obterDadosCompletosDoPaciente(req, res) {
        throw new error("Metodo não implementado");
    }

}

module.exports = AbstractPacientesController