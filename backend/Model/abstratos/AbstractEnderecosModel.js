class AbstractEnderecosModel {
    constructor() {
        if (new.target === AbstractEnderecosModel) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }

    async adicionarEndereco(enderecoData, connection) {
        throw new Error("Metodo nao implementado");
    }

    async atualizarEndereco(enderecoData, connection) {
        throw new Error("Metodo nao implementado");
    }
}

module.exports = AbstractEnderecosModel;