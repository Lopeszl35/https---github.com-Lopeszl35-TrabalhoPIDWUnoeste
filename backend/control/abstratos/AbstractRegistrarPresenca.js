class AbstractRegistrarPresencaControl {
    constructor() {
        if (new.target === AbstractRegistrarPresencaControl) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }
    async bucarAgendamentoPorData(data) {
        throw new Error("Método não implementado");
    }

    async registrarPresenca(req, res) {
        throw new Error("Método deve sem implementado na classe");
    }
}

module.exports = AbstractRegistrarPresencaControl;