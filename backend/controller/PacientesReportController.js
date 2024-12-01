class PacientesReportController {
    constructor(pacientesReportService) {
      this.pacientesReportService = pacientesReportService;
    }
  
    async exportPDF(req, res) {
      try {
        await this.pacientesReportService.generatePDF(res);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async exportExcel(req, res) {
      try {
        await this.pacientesReportService.generateExcel(res);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = PacientesReportController;  