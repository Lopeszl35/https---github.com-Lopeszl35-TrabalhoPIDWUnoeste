const AbstractRelatoriosPacientesRepository = require("./abstratos/AbstractRelatorioPacientesRepository");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

class RelatoriosPacientesRepository extends AbstractRelatoriosPacientesRepository {
    constructor(db) {
        super();
        this.db = db; // instância do banco de dados ou ORM
    }

    // Método para buscar pacientes no banco de dados
    async obterPacientes(nome) {
        try {
            const query = nome
                ? `SELECT * FROM pacientes WHERE nome LIKE '%${nome}%'`
                : "SELECT * FROM pacientes";
            const pacientes = await this.db.query(query);  // Ou db.pacientes.findAll() se estiver usando ORM
            return pacientes;
        } catch (error) {
            console.error("Erro ao buscar pacientes: ", error);
            throw new Error("Erro ao buscar pacientes");
        }
    }

    // Método para gerar o relatório Excel
    async gerarRelatorioExcel(pacientes) {
        try {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Relatório de Pacientes');
            
            // Definindo o cabeçalho
            sheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Nome', key: 'nome', width: 30 },
                { header: 'Idade', key: 'idade', width: 10 },
                { header: 'Diagnóstico', key: 'diagnostico', width: 30 },
                { header: 'Data de Cadastro', key: 'data_cadastro', width: 20 },
            ];

            // Adicionando os dados
            pacientes.forEach(paciente => {
                sheet.addRow({
                    id: paciente.id,
                    nome: paciente.nome,
                    idade: paciente.idade,
                    diagnostico: paciente.diagnostico,
                    data_cadastro: paciente.data_cadastro,
                });
            });

            // Gerando o arquivo Excel
            const filePath = 'relatorio_pacientes.xlsx';
            await workbook.xlsx.writeFile(filePath);
            return filePath;
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
