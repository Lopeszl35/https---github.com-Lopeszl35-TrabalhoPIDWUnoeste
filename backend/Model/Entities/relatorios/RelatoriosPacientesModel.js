const AbstractRelatorioPacientesModel = require("../../abstratos/AbstracRelatorioPacientesModel");
const { gerarRelatorioExcel, gerarRelatorioPdf } = require("../../../utils/relatorioUtils");
const Paciente = require("../../../Model/Entities/pacientesModel/pacientesModel");

class RelatoriosPacientesModel extends AbstractRelatorioPacientesModel {
    constructor(db) {
        super();
        this.db = db;  // A conexão com o banco de dados será passada aqui
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

    // Implementação do método para obter os dados dos pacientes (filtrados por nome, se necessário)
    async obterPacientes(nome) {
        try {
            const pacientes = await Paciente.buscarPaciente(nome);  // Buscando os pacientes pelo nome, se houver filtro
            return pacientes;
        } catch (error) {
            throw new Error("Erro ao obter pacientes: " + error.message);
        }
    }
}

module.exports = RelatoriosPacientesModel;