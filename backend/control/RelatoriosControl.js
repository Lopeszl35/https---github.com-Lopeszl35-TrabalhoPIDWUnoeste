const AbstractRelatoriosControl = require('./abstratos/AbstractRelatoriosControl');
const RelatorioGenerator = require('../utils/RelatorioGenerator');
const RelatorioConfigFactory = require('../factories/RelatorioConfigFactory');

class RelatoriosControl extends AbstractRelatoriosControl {
    constructor(relatoriosModel) {
        super();
        this.relatoriosModel = relatoriosModel;
    }

    async gerarRelatorioExcel(req, res) {
        try {
            const { tipo } = req.query;

            if (!['pacientes', 'agendamentos'].includes(tipo)) {
                return res.status(400).json({ success: false, message: "Tipo de relatório inválido" });
            }

            const dados = await this.relatoriosModel.obterDadosRelatorio(tipo);
            console.log('dados', dados);
            const campos = RelatorioConfigFactory.getConfig(tipo).campos;
            console.log('campos', campos);
            const buffer = await RelatorioGenerator.gerarExcel(campos, dados);

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename=relatorio_${tipo}.xlsx`);
            res.send(buffer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async gerarRelatorioPdf(req, res) {
        try {
            const { tipo } = req.query;

            if (!['pacientes', 'agendamentos'].includes(tipo)) {
                return res.status(400).json({ success: false, message: "Tipo de relatório inválido" });
            }

            const dados = await this.relatoriosModel.obterDadosRelatorio(tipo);
            console.log('dados', dados);
            const campos = RelatorioConfigFactory.getConfig(tipo).campos;
            console.log('campos', campos);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=relatorio_${tipo}.pdf`);
            RelatorioGenerator.gerarPdf(res, campos, dados);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = RelatoriosControl;
