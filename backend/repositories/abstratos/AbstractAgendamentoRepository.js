class AbstractAgendamentoRepository {
  constructor() {
    if (new.target === AbstractAgendamentoRepository) {
      throw new Error("Não é possível instanciar uma classe abstrata.");
    }
  }

  async obterTodasConsultas() {
    throw new Error("Metodo não implementado");
  }

  async obterConsultasDoPaciente(prontuario) {
    throw new Error("Metodo nãp implementado");
  }
  async verificarDisponibilidadeHorario(idHorarioProfissional) {
    throw new Error("Metodo nao implementado");
  }

  async verificarAgendamentoExistente(prontuario, idServico, dataHora) {
    throw new Error("Metodo não implementado");
  }

  async criarAgendamento(agendamento, idHorarioProfissional, connection) {
    throw new Error("Metodo não implementado");
  }

  async buscarConsultaPorId(idAgendamento) {
    throw new Error("Metodo não implementado");
  }

  async arquivarConsulta(idAgendamento) {
    throw new Error("Metodo não implementado");
  }

  async desarquivarConsulta(idAgendamento) {
    throw new Error("Metodo não implementado");
  }

  async editarAgendamento(agendamento, connection) {
    throw new Erroe("metodo não implementado");
  }

  async obterConsultasNaoArquivadas() {
    throw new Error("Metodo não implementado");
  }

  //Métodos para relatório
  async obterDadosAgendamentosParaRelatorio() {
    throw new Error("Método não implementado");
  }

  // Métodos para função registrar presença
  async buscarConsultaPorData(prontuario, data) {
    throw new Error("Metodo nao implementado");
  }

  async registrarPresenca(idAgendamento, motivo) {
    throw new Error("Método não implementado");
  }

  async registrarAusencia(Idagendamento, motivo) {
    throw new Error("Método nnão implementado")
  }

  async cancelarAgendamento(idAgendamento, motivo) {
    throw new Error("Método não implementado");
  }

}

module.exports = AbstractAgendamentoRepository;
