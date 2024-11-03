class AbstractProfissionaisController {
    constructor() {
        if(new.target === AbstractProfissionaisController) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }

    async obterProfissionais(req, res) {
        throw new Error("Metodo nao implementado");
    }

}

module.exports = AbstractProfissionaisController