class AbstractProfissionaisControl {
    constructor() {
        if(new.target === AbstractProfissionaisControl) {
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

    async cadastrarHorarios(req, res) {
        throw new Error("Metodo nao implementado");
    }

    async obterHorariosProfissional(req, res) {
        throw new Error("Metodo nao implementado");
    }

}

module.exports = AbstractProfissionaisControl