const AbstractRelatoriosPacientesRepository = require("./abstratos/AbstractRelatorioPacientesRepository");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

class RelatoriosPacientesRepository extends AbstractRelatoriosPacientesRepository {
    constructor(database) {
        super();
        this.database = database;
    }


    // Método para gerar o relatório Excel
    async gerarRelatorioExcel(res, pacientes) {
        try {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Relatório de Pacientes');
            
            // Definindo o cabeçalho
            sheet.columns = [
                { header: 'ID', key: 'Prontuario', width: 15 },
                { header: 'Nome', key: 'Nome_Completo', width: 30 },
                { header: 'Data de Nascimento', key: 'Data_De_Nascimento', width: 20 },
                { header: 'CPF', key: 'CPF', width: 15 },
                { header: 'RG', key: 'RG', width: 15 },
                { header: 'Email', key: 'Email', width: 25 },
                { header: 'Nome da Mãe', key: 'Nome_Mae', width: 30 },
                { header: 'Número', key: 'Numero', width: 10 },
                { header: 'Cidade', key: 'Cidade', width: 20 },
            ];
    
            // Adicionando os dados
            pacientes.forEach(paciente => {
                sheet.addRow(paciente);
            });
    
            // Configurando cabeçalhos para download no navegador/Postman
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=relatorio_pacientes.xlsx'
            );
    
            // Enviando o arquivo diretamente na resposta
            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            console.error("Erro ao gerar relatório Excel: ", error);
            throw new Error("Erro ao gerar relatório Excel");
        }
    }

    // Método para gerar o relatório PDF
    async gerarRelatorioPdf(pacientes) {
        try {
            const doc = new PDFDocument();
            const filePath = 'relatorio_pacientes.pdf';
            
            doc.pipe(fs.createWriteStream(filePath));

            // Adicionando título
            doc.fontSize(20).text('Relatório de Pacientes', { align: 'center' });

            // Adicionando os pacientes ao relatório
            pacientes.forEach((paciente, index) => {
                doc.fontSize(12).text(`Paciente ${index + 1}:`);
                doc.text(`ID: ${paciente.id}`);
                doc.text(`Nome: ${paciente.nome}`);
                doc.text(`Idade: ${paciente.idade}`);
                doc.text(`Diagnóstico: ${paciente.diagnostico}`);
                doc.text(`Data de Cadastro: ${paciente.data_cadastro}`);
                doc.text('----------------------');
            });

            // Finalizando o documento PDF
            doc.end();
            return filePath;
        } catch (error) {
            console.error("Erro ao gerar relatório PDF: ", error);
            throw new Error("Erro ao gerar relatório PDF");
        }
    }
}

module.exports = RelatoriosPacientesRepository;
