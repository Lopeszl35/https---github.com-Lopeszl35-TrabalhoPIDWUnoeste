class AbstractPacienteRepository {
    constructor() {
        if (new.target === AbstractPacienteRepository) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async obterPacientes() {
        throw new Error("Metodo não implementado");
    }

    async obterDadosCompletosDoPaciente(prontuario) {
        throw new Error("Metodo não implementado");
    }

}

module.exports = AbstractPacienteRepository;