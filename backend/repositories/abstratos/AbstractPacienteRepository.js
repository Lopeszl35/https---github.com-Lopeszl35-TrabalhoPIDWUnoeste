class AbstractPacienteRepository {
    constructor() {
        if (new.target === AbstractPacienteRepository) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async adicionarPaciente(paciente, connection) {
        throw new Error("Metodo não implementado");
    }

    async atualizarPaciente(paciente, connection) {
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

    async salvarEvolucao(evolucao) {
        throw new Error("Metodo não implementado");
    }

    async obterEvolucoesDoPaciente(prontuario) {
        throw new Error("Metodo não implementado");
    }

}

module.exports = AbstractPacienteRepository;