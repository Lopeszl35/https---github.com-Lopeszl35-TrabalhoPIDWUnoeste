class AbstractResponsaveisRepository {
    constructor() {
        if (new.target === AbstractResponsaveisRepository) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async adicionarResponsavel(responsavel, connection) {
        throw new Error("Metodo não implementado");
    }

    async atualizarResponsavel(responsavel, connection) {
        throw new Error("Metodo não implementado");
    }
}

module.exports = AbstractResponsaveisRepository