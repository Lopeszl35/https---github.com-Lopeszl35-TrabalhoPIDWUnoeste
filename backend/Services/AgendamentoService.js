const AbstractAgendamentoService = require("./abstratos/AbstractAgendamentoService");
const Agendamento = require("../model/Entities/agendamentoModel/Agendamento");

class AgendamentoService extends AbstractAgendamentoService {
  constructor(agendamentoRepository, database) {
    super();
    this.agendamentoRepository = agendamentoRepository;
    this.database = database;
  }

  async obterTodasConsultas() {
    try {
      const consultas = await this.agendamentoRepository.obterTodasConsultas();
      if (!consultas) {
        throw new Error("Nenhum agendamento encontrado");
      }
      return consultas;
    } catch (error) {
      throw new Error(`Erro ao obter consultas: ${error.message}`);
    }
  }

  async obterConsultasDoPaciente(prontuario) {
    try {
      const consultas =
        await this.agendamentoRepository.obterConsultasDoPaciente(prontuario);
      if (consultas.length < 1) {
        throw new Error("Nenhuma consulta encontrada para esse paciente");
      }
      return consultas;
    } catch (error) {
      throw new Error(`Erro ao obter consultas: ${error.message}`);
    }
  }

  async criarAgendamento(
    prontuario,
    idProfissional,
    idServico,
    dataHora,
    observacoes,
    status = "Pendente"
  ) {
    const connection = await this.database.beginTransaction();
    try {
      // Verifica se o agendamento ja existe
      const existeAgendamento =
        await this.agendamentoRepository.verificarAgendamentoExistente(
          prontuario,
          idServico,
          dataHora
        );
      if (existeAgendamento) {
        throw new Error(
          "Já existe um agendamento para este paciente para este serviço nesta data"
        );
      }

      // Cria o novo agendamento
      const novoAgendamento = new Agendamento(
        null,
        prontuario,
        idProfissional,
        idServico,
        dataHora,
        status,
        observacoes
      );
      const agendamentoId = await this.agendamentoRepository.criarAgendamento(
        novoAgendamento,
        connection
      );
      novoAgendamento.id = agendamentoId;

      await this.database.commitTransaction(connection);
      return novoAgendamento;
    } catch (error) {
      await this.database.rollbackTransaction(connection);
      throw new Error(`Erro ao criar novo agendamento: ${error.message}`);
    }
  }

  async editarAgendamento() {}

  async arquivarAgendamento(idAgendamento) {
    const connection = await this.database.beginTransaction();
    try {
      // Verifica se o agendamento existe
      const consulta = await this.agendamentoRepository.buscarConsultaPorId(
        idAgendamento
      );
      if (!consulta) {
        throw new Error(
          "Nenhum agendamento encontrado para este paciente para este serviço nesta data"
        );
      }

      // Verifica se o status é "Concluído" ou "Cancelado"
      if (consulta.Status !== "Concluído" && consulta.Status !== "Cancelado") {
        throw new Error(
          "Apenas consultas concluídas ou canceladas podem ser arquivadas."
        );
      }

      // Arquiva o agendamento
      const resultado = await this.agendamentoRepository.arquivarConsulta(
        idAgendamento
      );
      await this.database.commitTransaction(connection);
      return resultado;
    } catch (error) {
      await this.database.rollbackTransaction(connection);
      throw new Error(`Erro ao deletar agendamento: ${error.message}`);
    }
  }
}

module.exports = AgendamentoService;
