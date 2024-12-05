class AbstractRelatoriosPacientesModel {
    constructor() {
        if (new.target === AbstractRelatoriosPacientesModel) {
            throw new Error("Classe abstrata não pode ser instanciada diretamente");
        }
    }

    async gerarRelatorioExcel(pacientes) {
        throw new Error("Método não implementado");
    }

    async gerarRelatorioPdf(pacientes) {
        throw new Error("Método não implementado");
    }
}

module.exports = AbstractRelatoriosPacientesModel;