class AbstractRelatoriosPacientesModel {
    constructor() {
        if (new.target === AbstractRelatoriosPacientesModel) {
            throw new Error("Classe abstrata não pode ser instanciada diretamente");
        }
    }

}

module.exports = AbstractRelatoriosPacientesModel;