class AbstractProfissionaisService {
    constructor() {
        if(new.target === AbstractProfissionaisService) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async obterProfissionais() {
        throw new Error("Metodo nao implementado");
    }

    async obterPorId(id) {
        throw new Error("Metodo não implementado");
    }

    async adicionarProfissional(profissional) {
        throw new Error("Metodo nao implementado");
    }

    async editarProfissional(id, profissional) {
        throw new Error("Metodo nao implementado");
    }

}

module.exports = AbstractProfissionaisService;