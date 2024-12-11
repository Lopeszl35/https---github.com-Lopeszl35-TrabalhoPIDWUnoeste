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
      ErroSqlHandler.tratarErroSql(error, 'agendamento');
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
      return agendamentoAtualizado;
    } catch (error) {
      ErroSqlHandler.tratarErroSql(error, 'agendamento');
      throw new Error(`Erro ao editar agendamento: ${error.message}`);
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

  async buscarConsultaPacientePorData(prontuario, data) {
    try {
        const consultas = await this.agendamentoRepository.buscarConsultaPacientePorData(prontuario, data);
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
