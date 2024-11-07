class AbstractPacienteService {
    constructor() {
        if (new.target === AbstractPacienteService) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async adicionarPaciente(paciente, endereco, responsavel) {
        throw new Error("Metodo não implementado");
    }

    async obterPacientes() {
        throw new Error("Metodo não implementado");
    }

    async obterDadosCompletosDoPaciente(prontuario) {
        throw new Error("Metodo não implementado");
    }
}

module.exports = AbstractPacienteService;