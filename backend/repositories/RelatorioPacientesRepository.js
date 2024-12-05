const AbstractRelatoriosPacientesRepository = require("./abstratos/AbstractRelatorioPacientesRepository");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

class RelatoriosPacientesRepository extends AbstractRelatoriosPacientesRepository {
    constructor(database) {
        super();
        this.database = database;
    }

}

module.exports = RelatoriosPacientesRepository;
