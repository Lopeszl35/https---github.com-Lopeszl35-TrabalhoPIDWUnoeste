const RelatorioConfigFactory = require('../factories/RelatorioConfigFactory');
const RelatorioGenerator = require('../utils/RelatorioGenerator');

class RelatorioPacientesControl {
    constructor(relatoriosPacientesModel, pacientesModel, relatorioConfigFactory, relatorioGenerator) {
        this.relatoriosPacientesModel = relatoriosPacientesModel;
        this.pacientesModel = pacientesModel;
    }

    async gerarRelatorioExcel(req, res) {
        try {
            const { nome } = req.query;
            const searchType = 'Nome_Completo';
            const { campos } = RelatorioConfigFactory.getConfig('pacientes');  
    
            // Buscar os pacientes
            const pacientes = await this.pacientesModel.buscarPaciente(nome, searchType);
    
            // Enviar o arquivo Excel diretamente na resposta
            await RelatorioGenerator.gerarExcel(res, campos, pacientes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
    
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
            const { campos } = this.relatorioConfigFactory.getConfig('pacientes');

            // Buscar os pacientes
            const pacientes = await this.pacientesModel.buscarPaciente(nome, searchType);

            // Enviar o PDF diretamente na resposta
            const relatorioPdf = await this.relatorioGenerator.gerarPdf(res, campos, pacientes);
            res.json({ success: true, relatorio: relatorioPdf });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
    
            // Caso ocorra um erro antes do envio do Excel, responder com erro
            if (!res.headersSent) {
                res.status(500).json({ success: false, message: "Erro ao gerar relatório Excel" });
            }
        }
    }
}

module.exports = RelatorioPacientesControl;
