const AbstractRelatorioPacientesModel = require("../../abstratos/AbstracRelatorioPacientesModel");
const { gerarRelatorioExcel, gerarRelatorioPdf } = require("../../../utils/relatorioUtils");
const Paciente = require("../../../Model/Entities/pacientesModel/pacientesModel");

class RelatoriosPacientesModel extends AbstractRelatorioPacientesModel {
    constructor(relatoriosPacientesRepository) {
        super()
        this.relatoriosPacientesRepository = relatoriosPacientesRepository;
    }

    // Implementação do método para gerar relatório em Excel
    async gerarRelatorioExcel(pacientes) {
        try {
            return await gerarRelatorioExcel(pacientes);
        } catch (error) {
            throw new Error("Erro ao gerar relatório Excel: " + error.message);
        }
    }

    // Implementação do método para gerar relatório em PDF
    async gerarRelatorioPdf(pacientes) {
        try {
            return await gerarRelatorioPdf(pacientes);
        } catch (error) {
            throw new Error("Erro ao gerar relatório PDF: " + error.message);
        }
    }

}

module.exports = RelatoriosPacientesModel;