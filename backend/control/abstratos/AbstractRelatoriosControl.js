class AbstractRelatoriosControl {
    constructor() {
        if (new.target === AbstractRelatoriosControl) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }

    async gerarRelatorioExcel(req, res) {
        throw new Error("Método não implementado");
    }

    async gerarRelatorioPdf(req, res) {
        throw new Error("Método não implementado");
    }

}

module.exports = AbstractRelatoriosControl;