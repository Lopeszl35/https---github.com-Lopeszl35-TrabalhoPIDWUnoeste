class AbstractPacienteService {
    constructor() {
        if (new.target === AbstractPacienteService) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async obterPacientes() {
        throw new Error("Metodo não implementado");
    }
}

module.exports = AbstractPacienteService;