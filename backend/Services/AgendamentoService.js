const AbstractAgendamentoService = require('./abstratos/AbstractAgendamentoService');
const Agendamento = require('../model/Entities/agendamentoModel/Agendamento');

class AgendamentoService extends AbstractAgendamentoService {
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
            novoAgendamento.id = agendamentoId; 
            
            await this.database.commitTransaction(connection);
            return novoAgendamento;
        } catch (error) {
            await this.database.rollbackTransaction(connection);
            throw new Error(`Erro ao criar novo agendamento: ${error.message}`);
        }
    }
}

module.exports = AgendamentoService;
