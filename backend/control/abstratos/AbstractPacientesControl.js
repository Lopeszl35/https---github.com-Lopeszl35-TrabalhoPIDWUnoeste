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

    async buscarPaciente(req, res) {
        throw new Error("Metodo não implementado");
    }

    async salvarEvolucao(req, res) {
        throw new Error("Metodo não implementado");
    }

    async deletarEvolucao(req, res) {
        throw new Error("Metodo não implementado");
    }

    async obterEvolucoesDoPaciente(req, res) {
        throw new Error("Metodo não implementado");
    }

}

module.exports = AbstractPacientesController