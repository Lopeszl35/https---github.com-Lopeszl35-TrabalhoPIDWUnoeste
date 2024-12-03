class RelatorioPacientesControl {
    constructor(relatoriosPacientesModel, pacientesModel) {
        this.relatoriosPacientesModel = relatoriosPacientesModel;
        this.pacientesModel = pacientesModel;
    }

    async gerarRelatorioExcel(req, res) {
        try {
            const { nome } = req.query;
            const searchType = 'Nome_Completo';
            const pacientes = await this.pacientesModel.buscarPaciente(nome, searchType);

            const relatorioExcel = await this.relatoriosPacientesModel.gerarRelatorioExcel(pacientes);
            res.json({ success: true, relatorio: relatorioExcel });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Erro ao gerar relatório Excel" });
        }
    }

    async gerarRelatorioPdf(req, res) {
        try {
            const { nome } = req.query;
            const searchType = 'Nome_Completo';
            const pacientes = await this.pacientesModel.buscarPaciente(nome, searchType);

            const relatorioPdf = await this.relatoriosPacientesModel.gerarRelatorioPdf(pacientes);
            res.json({ success: true, relatorio: relatorioPdf });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Erro ao gerar relatório PDF" });
        }
    }
}

module.exports = RelatorioPacientesControl;
