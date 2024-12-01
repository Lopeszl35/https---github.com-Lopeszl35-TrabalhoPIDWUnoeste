const XLSX = require("xlsx");

class ExcelGeneratorService {
  static generatePacientesExcel(pacientes, res) {
    const worksheet = XLSX.utils.json_to_sheet(pacientes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pacientes");

    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=pacientes.xlsx");
    res.send(excelBuffer);
  }
}

module.exports = ExcelGeneratorService;