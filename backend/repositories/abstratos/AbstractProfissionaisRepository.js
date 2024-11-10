class AbstractProfissionaisRepository {
    constructor() {
        if (new.target === AbstractProfissionaisRepository) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async obterProfissionais() {
        throw new Error("Metodo nao implementado");
    }

    async obterPorId(id) {
        throw new Error("Metodo não implementado");
    }

    async editarProfissional(id, profissional) {
        throw new Error("Metodo nao implementado");
    }

    /*
    async profissionalDoServico(id) {
        throw new Error("Metodo nao implementado");
    }*/

}

module.exports = AbstractProfissionaisRepository