class AbstractProfissionaisController {
    constructor() {
        if(new.target === AbstractProfissionaisController) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }

    async obterProfissionais(req, res) {
        throw new Error("Metodo nao implementado");
    }

    async obterProfissionalPorId(req, res) {
        throw new Error("Metodo nao implementado");
    }

    async adicionarProfissional(req, res) {
        throw new Error("Metodo nao implementado");
    }

    async editarProfissional(req, res) {
        throw new Error("Metodo nao implementado");
    }

    async deletarProfissional(req, res) {
        throw new Error("Metodo nao implementado");
    }

    /*
    async profissionalDoServico(req, res) {
        throw new Error("Metodo nao implementado");
    }*/

}

module.exports = AbstractProfissionaisController