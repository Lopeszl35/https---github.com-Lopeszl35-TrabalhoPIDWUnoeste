class AbstractPacientesModel {
    constructor() {
        if (new.target === AbstractPacientesModel) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async adicionarPaciente(paciente, endereco, responsavel) {
        throw new Error("Metodo não implementado");
    }

    async atualizarPaciente(paciente, endereco, responsavel) {
        throw new Error("Metodo não implementado");
    }

    async deletarPaciente(prontuario) {
        throw new Error("Metodo não implementado");
    }

    async obterPacientes() {
        throw new Error("Metodo não implementado");
    }

    async obterDadosCompletosDoPaciente(prontuario) {
        throw new Error("Metodo não implementado");
    }

    async buscarPaciente(searchTerm, searchType) {
        throw new Error("Metodo não implementado");
    }

    async salvarEvolucao(evolucao, connection) {
        throw new Error("Metodo não implementado");
    }

    async deletarEvolucao(idEvolucao, connection) {
        throw new Error("Metodo não implementado");
    }

    async obterEvolucoesDoPaciente(prontuario) {
        throw new Error("Metodo não implementado");
    }
}

module.exports = AbstractPacientesModel;