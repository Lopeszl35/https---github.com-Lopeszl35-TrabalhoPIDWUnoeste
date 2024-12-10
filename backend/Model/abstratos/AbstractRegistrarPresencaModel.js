class AbstractRegistrarPresencaModel {
    constructor() {
        if (new.target === AbstractRegistrarPresencaModel) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }
}

module.exports = AbstractRegistrarPresencaModel;