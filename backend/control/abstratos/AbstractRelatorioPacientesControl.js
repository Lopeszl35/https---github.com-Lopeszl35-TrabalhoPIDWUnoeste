class AbstractRelatorioPacientesControl {
    constructor() {
        if (new.target === AbstractRelatorioPacientesControl) {
            throw new Error("Classe abstrata não pode ser instanciada diretamente");
        }
    }

    // Métodos abstratos para geração dos relatórios
    async gerarRelatorioExcel(req, res) {
        throw new Error("Método não implementado");
    }

    async gerarRelatorioPdf(req, res) {
        throw new Error("Método não implementado");
    }
}

module.exports = AbstractRelatorioPacientesControl;