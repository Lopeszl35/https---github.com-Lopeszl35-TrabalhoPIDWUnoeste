const PDFGeneratorService = require("./PDFGeneratorService");
const ExcelGeneratorService = require("./ExcelGeneratorService");
const PacientesReportRepository = require("../repositories/PacientesReportRepository");

class PacientesReportService {
  constructor(database) {
    this.pacientesReportRepository = new PacientesReportRepository(database);
  }

  async getPacientesReportData() {
    try {
      const pacientes = await this.pacientesRepository.findAll();
      return pacientes.map((paciente) => ({
        Prontuario: paciente.Prontuario,
        Nome: paciente.Nome_Completo,
        DatadeNascimento: paciente.Data_De_Nascimento,
        CPF: paciente.CPF,
        RG: paciente.RG,
        CartãoSUS: paciente.CartaoSUS,
        Escola: paciente.Escola,
        AnodeEscolaridade: paciente.Ano_Escolar,
        Periodo: paciente.Periodo,
        Email: paciente.Email,
      }));
    } catch (error) {
      throw new Error("Erro ao buscar dados dos pacientes para relatório: " + error.message);
    }
  }

  async generatePDF(res) {
    try {
      const pacientes = await this.getPacientesReportData();
      PDFGeneratorService.generatePacientesPDF(pacientes, res);
    } catch (error) {
      throw new Error("Erro ao gerar PDF: " + error.message);
    }
  }

  async generateExcel(res) {
    try {
      const pacientes = await this.getPacientesReportData();
      ExcelGeneratorService.generatePacientesExcel(pacientes, res);
    } catch (error) {
      throw new Error("Erro ao gerar Excel: " + error.message);
    }
  }
}

module.exports = PacientesReportService;
