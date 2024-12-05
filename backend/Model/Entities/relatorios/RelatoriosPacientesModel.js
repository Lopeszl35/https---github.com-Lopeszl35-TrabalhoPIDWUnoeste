const AbstractRelatorioPacientesModel = require("../../abstratos/AbstracRelatorioPacientesModel");
const { gerarRelatorioExcel, gerarRelatorioPdf } = require("../../../utils/RelatorioGenerator");
const Paciente = require("../../../Model/Entities/pacientesModel/pacientesModel");

class RelatoriosPacientesModel extends AbstractRelatorioPacientesModel {
    constructor(relatoriosPacientesRepository) {
        super()
        this.relatoriosPacientesRepository = relatoriosPacientesRepository;
    }
}

module.exports = RelatoriosPacientesModel;