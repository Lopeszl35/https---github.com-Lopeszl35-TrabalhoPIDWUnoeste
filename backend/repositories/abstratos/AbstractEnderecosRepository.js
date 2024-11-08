class AbstractEnderecosRepository {
    constructor() {
        if (new.target === AbstractEnderecosRepository) {
            throw new Error("Não é possivel instanciar uma classe abstrata");
        }
    }

    async adicionarEndereco(endereco, connection) {
        throw new Error("Metodo nao implementado");
    }
}

module.exports = AbstractEnderecosRepository;