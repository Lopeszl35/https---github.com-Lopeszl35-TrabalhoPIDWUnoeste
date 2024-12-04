const AbstractRelatoriosPacientesRepository = require("./abstratos/AbstractRelatorioPacientesRepository");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

class RelatoriosPacientesRepository extends AbstractRelatoriosPacientesRepository {
    constructor(database) {
        super();
        this.database = database;
    }


    // Método para gerar o relatório Excel
    async gerarRelatorioPdf(res, pacientes) {
        try {
            // Configura o documento PDF
            const doc = new PDFDocument({ margin: 30 });
            
            // Configura os cabeçalhos da resposta HTTP
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=relatorio_pacientes.pdf");
    
            // Envia o PDF diretamente como stream para o cliente
            doc.pipe(res);
    
            // Adiciona o título
            doc.fontSize(20).text("Relatório de Pacientes", { align: "center" }).moveDown(2);
    
            // Adiciona os dados dos pacientes
            pacientes.forEach((paciente, index) => {
                doc.fontSize(12).text(`Paciente ${index + 1}:`, { continued: true })
                    .text(`ID: ${paciente.Prontuario}`, { align: "left" });
                doc.text(`Nome: ${paciente.Nome_Completo}`);
                doc.text(`Data de Nascimento: ${paciente.Data_De_Nascimento}`);
                doc.text(`CPF: ${paciente.CPF}`);
                doc.text(`RG: ${paciente.RG}`);
                doc.text(`Email: ${paciente.Email}`);
                if (paciente.Nome_Mae) doc.text(`Nome da Mãe: ${paciente.Nome_Mae}`);
                if (paciente.Numero) doc.text(`Número: ${paciente.Numero}`);
                if (paciente.Cidade) doc.text(`Cidade: ${paciente.Cidade}`);
                doc.moveDown(1).text("----------------------").moveDown(1);
            });
    
            // Finaliza o documento PDF
            doc.end();
        } catch (error) {
            console.error("Erro ao gerar relatório PDF: ", error);
            res.status(500).json({ success: false, message: "Erro ao gerar relatório PDF" });
        }
    }
}

module.exports = RelatoriosPacientesRepository;
