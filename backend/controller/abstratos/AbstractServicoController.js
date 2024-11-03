class AbstractServicoController {
    constructor() {
        if(new.target === AbstractServicoController) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async obterServicos(req, res) {
        throw new Error("Metodo não implementado");
    }

}

module.exports = AbstractServicoController;