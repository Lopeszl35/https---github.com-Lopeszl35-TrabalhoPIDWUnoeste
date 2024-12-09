class AbstractResponsaveisModel {
    constructor() {
        if (new.target === AbstractResponsaveisModel) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async adicionarResponsavel(responsavelData, connection) {
        throw new Error("Metodo abstrato nao implementado");
    }

    async atualizarResponsavel(responsavelData, connection) {
        throw new Error("Metodo abstrato nao implementado");
    }

}

module.exports = AbstractResponsaveisModel