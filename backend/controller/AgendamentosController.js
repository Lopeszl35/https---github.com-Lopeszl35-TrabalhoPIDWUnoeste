const AgendamentoService = require('../Services/AgendamentoService');

class AgendamentosController {
    constructor(agendamentoService) {
        this.agendamentoService = agendamentoService;
    };

    async criarAgendamento(req, res) {
        try {
            const { prontuario, idProfissional, idServico, dataHora, observacoes, status } = req.body; // atualizando para manter a consistência
            const novoAgendamento = await this.agendamentoService.criarAgendamento(prontuario, idProfissional, idServico, dataHora, observacoes, status);
            res.status(201).json(novoAgendamento);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = AgendamentosController;
