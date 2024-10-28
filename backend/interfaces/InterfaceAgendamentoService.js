class InterfaceAgendamentoService {
    async criarAgendamento(agendamento) {}
    async atualizarAgendamento(idAgendamento, status, observacoes) {}
    async excluirAgendamento(idAgendamento) {}
    async buscarAgendamentoPorId(idAgendamento) {}
    async listarAgendamentos() {}
}

module.exports = InterfaceAgendamentoService