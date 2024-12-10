const { validationResult } = require("express-validator");
const AbstractRelatorioAgendamentoControl = require("./abstratos/AbstractRelatorioAgendamentoControl");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

class RelatorioAgendamentoControl extends AbstractRelatorioAgendamentoControl {
    constructor(relatorioAgendamentoModel) {
        super();
        this.relatorioAgendamentoModel = relatorioAgendamentoModel;
    }

    async gerarRelatorioPdf(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const filtros = req.query;
        try {
            const data = await this.relatorioAgendamentoModel.relatorioAgendamentos(filtros);
            const doc = new PDFDocument();
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=relatorio-agendamentos.pdf");

            doc.pipe(res);
            doc.fontSize(20).text("Relatório de Agendamentos", { align: "center" });
            doc.moveDown();

            //Adicionar dados ao PDF
            data.forEach((item) => {
                doc.text(`ID: ${item.id_agendamento}`);
                doc.text(`Data: ${item.data_hora}`);
                doc.text(`Paciente: ${item.paciente}`);
                doc.text(`Profissional: ${item.profissional}`);
                doc.text(`Servico: ${item.servico}`);
                doc.text(`Status: ${item.status}`);
                doc.moveDown();
            });

            doc.end();
        } catch (error) {
            console.log("Erro ao gerar relatório PDF:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async gerarRelatorioExcel(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const filtros = req.query;
        try{
            const data = await this.relatorioAgendamentoModel.relatorioAgendamentos(filtros);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Relatório de Agendamentos");

            worksheet.columns = [
                { header: "ID", key: "id_agendamento", width: 10 },
                { header: "Data", key: "data_hora", width: 20 },
                { header: "Paciente", key: "paciente", width: 20 },
                { header: "Profissional", key: "profissional", width: 20 },
                { header: "Servico", key: "servico", width: 20 },
                { header: "Status", key: "status", width: 20 },
            ];
            
            data.forEach((item) => worksheet.addRow(item));

            res.setHeader(
                "Content-Disposition",
                "attachment; filename=relatorio-agendamentos.xlsx"
            );
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

            await workbook.xlsx.write(res);
            
        } catch (error) {
            console.log("Erro ao gerar relatório Excel:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async relatorioAgendamentos(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { data, paciente, profissional, servico, status, dataInicio, dataFim } = req.query;
        try {
            const filtros = {
                data: data || null,
                paciente: paciente || null,
                profissional: profissional || null,
                servico: servico || null,
                status: status || null,
                dataInicio: dataInicio || null,
                dataFim: dataFim || null
            };

            const result = await this.relatorioAgendamentoModel.relatorioAgendamentos(filtros);
            return res.status(200).json(result);
        } catch (error) {
            console.log("Erro ao obter agendamentos:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async estatisticasAgendamentos(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await this.relatorioAgendamentoModel.obterEstatisticasAgendamentos();
            return res.status(200).json(result);
        } catch (error) {
            console.log("Erro ao obter estatísticas de agendamentos:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async distribuicaoPorData(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await this.relatorioAgendamentoModel.obterDistribuicaoPorData();
            return res.status(200).json(result);
        } catch (error) {
            console.log("Erro ao obter distribuição por data:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async distribuicaoPorProfissional(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await this.relatorioAgendamentoModel.obterDistribuicaoPorProfissional();
            return res.status(200).json(result);
        } catch (error) {
            console.log("Erro ao obter distribuição por profissional:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async distribuicaoPorServico(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await this.relatorioAgendamentoModel.obterDistribuicaoPorServico();
            return res.status(200).json(result);
        } catch (error) {
            console.log("Erro ao obter distribuição por serviço:", error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = RelatorioAgendamentoControl;
