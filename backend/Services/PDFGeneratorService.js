const PDFDocument = require("pdfkit");

class PDFGeneratorService {
  static generatePacientesPDF(pacientes, res) {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=pacientes.pdf");

    doc.pipe(res);

    doc.fontSize(16).text("Relatório de Pacientes", { align: "center" });
    doc.moveDown();

    pacientes.forEach((paciente, index) => {
      doc.text(`${index + 1}. Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Idade: ${paciente.idade}`);
    });

    doc.end();
  }
}

module.exports = PDFGeneratorService;