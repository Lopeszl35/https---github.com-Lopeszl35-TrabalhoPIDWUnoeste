const { validationResult } = require("express-validator");
const AbstractRelatorioAgendamentoControl = require("./abstratos/AbstractRelatorioAgendamentoControl");

class RelatorioAgendamentoControl extends AbstractRelatorioAgendamentoControl {
    constructor(relatorioAgendamentoModel) {
        super();
        this.relatorioAgendamentoModel = relatorioAgendamentoModel;
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
        try {
            const result = await this.relatorioAgendamentoModel.obterEstatisticasAgendamentos();
            return res.status(200).json(result);
        } catch (error) {
            console.log("Erro ao obter estatísticas de agendamentos:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async distribuicaoPorData(req, res) {
        try {
            const result = await this.relatorioAgendamentoModel.obterDistribuicaoPorData();
            return res.status(200).json(result);
        } catch (error) {
            console.log("Erro ao obter distribuição por data:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async distribuicaoPorProfissional(req, res) {
        try {
            const result = await this.relatorioAgendamentoModel.obterDistribuicaoPorProfissional();
            return res.status(200).json(result);
        } catch (error) {
            console.log("Erro ao obter distribuição por profissional:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async distribuicaoPorServico(req, res) {
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
