const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

module.exports = {
    // Função de formatação, caso precise, por exemplo, para formatar os dados antes de adicionar ao relatório
    formatarDadosPaciente(paciente) {
        return {
            nome: paciente.nome.toUpperCase(),
            idade: paciente.idade,
            diagnostico: paciente.diagnostico,
            // Adicione outras formatações ou ajustes aqui
        };
    }
};