const { validationResult } = require("express-validator");
const AbstractRelatorioAgendamentoControl = require("./abstratos/AbstractRelatorioAgendamentoControl");

class RelatorioAgendamento extends AbstractRelatorioAgendamentoControl {
    constructor(relatorioAgendamentoModel){
        super();
        this.relatorioAgendamentoModel = relatorioAgendamentoModel;
    }

    async relatorioAgendamentos(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { data, paciente, profissional, servico } = req.query;
        try {
            const filtros = {
                data: data || null,
                paciente: paciente || null,
                profissional: profissional || null,
                servico: servico || null
            }
            const result = await this.relatorioAgendamentoModel.relatorioAgendamentos(filtros);
            return res.status(200).json(result);
        } catch (error) {
            console.log("Erro ao obter agendamentos:", error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = RelatorioAgendamento;