const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

class RelatorioGenerator {
    static async gerarExcel(res, campos, dados) {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Relatório");

        sheet.columns = campos.map(campo => ({
            header: campo.header,
            key: campo.key,
            width: campo.width || 15,
        }));

        dados.forEach(item => sheet.addRow(item));

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=relatorio.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();
    }

    static gerarPdf(res, campos, dados) {
        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=relatorio.pdf");

        doc.pipe(res);

        doc.fontSize(20).text("Relatório", { align: "center" }).moveDown(2);

        dados.forEach((item, index) => {
            doc.fontSize(12).text(`Registro ${index + 1}:`);
            campos.forEach(campo => {
                doc.text(`${campo.header}: ${item[campo.key] || "N/A"}`);
            });
            doc.moveDown(1);
        });

        doc.end();
    }
}

module.exports = RelatorioGenerator;
