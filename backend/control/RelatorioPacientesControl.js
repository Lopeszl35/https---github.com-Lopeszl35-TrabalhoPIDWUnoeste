class RelatorioPacientesControl {
    constructor(relatoriosPacientesModel, pacientesModel) {
        this.relatoriosPacientesModel = relatoriosPacientesModel;
        this.pacientesModel = pacientesModel;
    }

    async gerarRelatorioExcel(req, res) {
        try {
            const { nome } = req.query;
            const searchType = 'Nome_Completo';
    
            // Buscar os pacientes
            const pacientes = await this.pacientesModel.buscarPaciente(nome, searchType);
    
            // Enviar o arquivo Excel diretamente na resposta
            await this.relatoriosPacientesModel.gerarRelatorioExcel(res, pacientes);
        } catch (error) {
            console.error(error);
    
            // Caso ocorra um erro antes do envio do Excel, responder com erro
            if (!res.headersSent) {
                res.status(500).json({ success: false, message: "Erro ao gerar relatório Excel" });
            }
        }
    }

    async gerarRelatorioPdf(req, res) {
        try {
            const { nome } = req.query;
            const searchType = 'Nome_Completo';
            const pacientes = await this.pacientesModel.buscarPaciente(nome, searchType);

            const relatorioPdf = await this.relatoriosPacientesModel.gerarRelatorioPdf(res, pacientes);
            res.json({ success: true, relatorio: relatorioPdf });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Erro ao gerar relatório PDF" });
        }
    }
}

module.exports = RelatorioPacientesControl;
