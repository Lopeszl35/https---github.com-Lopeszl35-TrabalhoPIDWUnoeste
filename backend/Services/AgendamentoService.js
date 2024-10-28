const InterfaceAgendamentoService = require('../interfaces/InterfaceAgendamentoService');
const Agendamento = require('../model/Entities/agendamentoModel/Agendamento');

class AgendamentoService extends InterfaceAgendamentoService {
    constructor(agendamentoRepository, database) {
        super();
        this.agendamentoRepository = agendamentoRepository;
        this.database = database;
    }

    async criarAgendamento(prontuario, idProfissional, idServico, dataHora, observacoes, status = 'Pendente') {
        const connection = await this.database.beginTransaction();
        try {

            // Verifica se o agendamento ja existe
            const existeAgendamento = await this.agendamentoRepository.verificarAgendamentoExistente(prontuario, idServico, dataHora);
            if (existeAgendamento) {
                throw new Error('Já existe um agendamento para este paciente para este serviço nesta data');
            }

            // Cria o novo agendamento
            const novoAgendamento = new Agendamento(null, prontuario, idProfissional, idServico, dataHora, status, observacoes);
            const agendamentoId = await this.agendamentoRepository.criarAgendamento(novoAgendamento, connection);
            novoAgendamento.id = agendamentoId; // Atualiza o objeto com o ID gerado
            await this.database.commitTransaction(connection);
            return novoAgendamento;
        } catch (error) {
            await this.database.rollbackTransaction(connection);
            throw new Error(`Erro ao criar novo agendamento: ${error.message}`);
        }
    }
}

module.exports = AgendamentoService;
