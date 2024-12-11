class AbstractRegistrarPresencaControl {
    constructor() {
        if (new.target === AbstractRegistrarPresencaControl) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }
    async bucarAgendamentoPorData(req, res) {
        throw new Error("Método não implementado");
    }

    async registrarPresenca(req, res) {
        throw new Error("Método deve sem implementado na classe");
    }

    async registrarAusencia(req, res) {
        throw new Error("Método deve sem implementado");
    }

    async cancelarAgendamento(req, res) {
        throw new Error("Método deve ser implementado");
    }
}

module.exports = AbstractRegistrarPresencaControl;