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
          console.log("Query recebida:", req.query);
          const { tipo, ...filtros } = req.query;
          console.log("Filtros extraídos:", filtros);
      
          if (!['pacientes', 'agendamentos'].includes(tipo)) {
            return res.status(400).json({ success: false, message: "Tipo de relatório inválido" });
          }
      
          const dados = await this.relatoriosModel.obterDadosRelatorio(tipo, filtros);
          const campos = RelatorioConfigFactory.getConfig(tipo).campos;
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
          const { tipo, ...filtros } = req.query;
          console.log("Filtros:", filtros);
      
          if (!['pacientes', 'agendamentos'].includes(tipo)) {
            return res.status(400).json({ success: false, message: "Tipo de relatório inválido" });
          }
      
          const dados = await this.relatoriosModel.obterDadosRelatorio(tipo, filtros);
          const campos = RelatorioConfigFactory.getConfig(tipo).campos;
      
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
