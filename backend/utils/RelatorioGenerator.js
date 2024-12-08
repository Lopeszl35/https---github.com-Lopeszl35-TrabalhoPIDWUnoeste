const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

// Função para formatar data e hora
function formatarDataHora(dataHora) {
    if (!dataHora) return "N/A";
    
    // Certifique-se de que dataHora é um objeto Date válido
    const dateObj = new Date(dataHora);

    // Formate a data no formato brasileiro numérico
    const data = dateObj.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const hora = dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${data} ${hora}`;
}


class RelatorioGenerator {
    static async gerarExcel(campos, dados) {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Relatório");

        sheet.columns = campos.map(campo => ({
            header: campo.header,
            key: campo.key,
            width: campo.width || 15,
        }));

        // Formate os campos de data/hora antes de adicionar as linhas
        const dadosFormatados = dados.map(item => ({
            ...item,
            data_hora: item.data_hora ? formatarDataHora(item.data_hora) : "Data não informada",
        }));

        dadosFormatados.forEach(item => sheet.addRow(item));

        return await workbook.xlsx.writeBuffer();
    }

    static gerarPdf(res, campos, dados) {
        const PDFDocument = require("pdfkit");
        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text("Relatório", { align: "center" }).moveDown(2);

        dados.forEach((item, index) => {
            doc.fontSize(12).text(`Registro ${index + 1}:`);
            campos.forEach(campo => {
                const valor =
                    campo.key === "data_hora"
                        ? formatarDataHora(item[campo.key])
                        : item[campo.key] || "Dado não informado";
                doc.text(`${campo.header}: ${valor}`);
            });
            doc.moveDown(1);
        });

        doc.end();
    }
}

module.exports = RelatorioGenerator;
