const AbstractAgendamentoModel = require("../../abstratos/AbstractAgendamentoModel");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");

class AgendamentoModel extends AbstractAgendamentoModel {
  constructor(agendamentoRepository) {
    super();
    this.agendamentoRepository = agendamentoRepository;
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
    status = "Pendente",
    idHorarioProfissional,
    connection
  ) {
    try {
      // Verifica se o horário é disponível
      const disponibilidadeHorario = await this.agendamentoRepository.verificarDisponibilidadeHorario(idHorarioProfissional);
      if (!disponibilidadeHorario) {
        throw new Error("Horário indisponível");
      }

      // Verifica se o agendamento ja existe
      const existeAgendamento = await this.agendamentoRepository.verificarAgendamentoExistente(prontuario, idServico,dataHora);
      if (existeAgendamento) {
        throw new Error(
          "Já existe um agendamento para este paciente para este serviço nesta data"
        );
      }

      // Cria o novo agendamento
      const novoAgendamento = {
        id: null,
        prontuario,
        idProfissional,
        idServico,
        dataHora,
        status,
        observacoes
      }
      const agendamentoId = await this.agendamentoRepository.criarAgendamento(novoAgendamento, idHorarioProfissional, connection);
      novoAgendamento.id = agendamentoId;
      return novoAgendamento;
    } catch (error) {
      throw error;
    }
  }

  async editarAgendamento(
    prontuario,
    idProfissional,
    idServico,
    dataHora,
    observacoes,
    status,
    idAgendamento,
    connection
  ) {
    let agendamentoAtualizado;
    try {
      const novoAgendamento = {
        idAgendamento,
        prontuario,
        idProfissional,
        idServico,
        dataHora,
        status,
        observacoes
    }
        agendamentoAtualizado = await this.agendamentoRepository.editarAgendamento(novoAgendamento, connection);
      // Se o status atualizado é "Concluído" ou "Cancelado", arquive o agendamento
      if (status === "Concluído" || status === "Cancelado") {
        await this.agendamentoRepository.arquivarConsulta(idAgendamento, connection);
      }
      else if (status === "Pendente" || status === "Confirmado") {
        await this.agendamentoRepository.desarquivarConsulta(idAgendamento, connection);
      }
      return agendamentoAtualizado;
    } catch (error) {
      throw new Error(`Erro ao editar agendamento: ${error.message}`);
    }
  }

  async arquivarAgendamento(idAgendamento, connection) {
    try {
      // Verifica se o agendamento existe
      const consulta = await this.agendamentoRepository.buscarConsultaPorId(idAgendamento);
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
      const resultado = await this.agendamentoRepository.arquivarConsulta(idAgendamento, connection);
      return resultado;
    } catch (error) {
      throw new Error(`Erro ao deletar agendamento: ${error.message}`);
    }
  }

  async obterConsultasNaoArquivadas() {
    try {
        const consultas = await this.agendamentoRepository.obterConsultasNaoArquivadas();
        if (!consultas) {
            throw new Error("Nenhum agendamento encontrado");
        }
        return consultas;
    } catch (error) {
        throw new Error(`Erro ao obter consultas: ${error.message}`);
    }
  }

  async buscarConsultaPorData(prontuario, data) {
    try {
        const consultas = await this.agendamentoRepository.buscarConsultaPorData(prontuario, data);
        if (!consultas) {
            throw new Error("Nenhum agendamento encontrado");
        }
        return consultas;
    } catch (error) {
        throw new Error(`Erro ao obter consultas: ${error.message}`);
    }
  }

}

module.exports = AgendamentoModel;
