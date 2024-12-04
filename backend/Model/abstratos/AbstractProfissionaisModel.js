class AbstractProfissionaisModel {
    constructor() {
        if(new.target === AbstractProfissionaisModel) {
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

    async cadastrarHorarios(id, data, hora) {
        throw new Error("Metodo nao implementado");
    }

    async obterHorariosProfissional(id) {
        throw new Error("Metodo nao implementado");
    }

}

module.exports = AbstractProfissionaisModel;