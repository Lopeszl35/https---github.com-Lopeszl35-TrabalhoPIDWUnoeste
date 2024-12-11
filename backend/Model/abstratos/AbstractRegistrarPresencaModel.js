class AbstractRegistrarPresencaModel {
    constructor() {
        if (new.target === AbstractRegistrarPresencaModel) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }

    async bucarAgendamentoPorData(data) {
        throw new Error("Método não implementado");
    }

    async registrarPresenca(idAgendamento, observacoes) {
        throw new Error("Método não implementado");
    }

    async registrarAusencia(idAgendamento, motivo) {
        throw new Error("Método deve ser implementado");
    }

    async cancelarAgendamento(idAgendamento, motivo) {
        throw new Error("Método deve ser implementado");
    }

}

module.exports = AbstractRegistrarPresencaModel;