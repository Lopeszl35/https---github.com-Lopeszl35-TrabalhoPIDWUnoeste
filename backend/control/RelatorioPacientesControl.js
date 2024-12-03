class RelatorioPacientesControl {
    constructor(db) {
        this.relatoriosPacientesRepository = new RelatoriosPacientesRepository(db);
    }

    async gerarRelatorioExcel(req, res) {
        try {
            const { nome } = req.query;
            const pacientes = await this.relatoriosPacientesRepository.obterPacientes(nome);

            const relatorioExcel = await this.relatoriosPacientesRepository.gerarRelatorioExcel(pacientes);
            res.json({ success: true, relatorio: relatorioExcel });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Erro ao gerar relatório Excel" });
        }
    }

    async gerarRelatorioPdf(req, res) {
        try {
            const { nome } = req.query;
            const pacientes = await this.relatoriosPacientesRepository.obterPacientes(nome);

            const relatorioPdf = await this.relatoriosPacientesRepository.gerarRelatorioPdf(pacientes);
            res.json({ success: true, relatorio: relatorioPdf });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Erro ao gerar relatório PDF" });
        }
    }
}

module.exports = RelatorioPacientesControl;
