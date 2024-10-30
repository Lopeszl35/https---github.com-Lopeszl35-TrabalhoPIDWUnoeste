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

  async verificarAgendamentoExistente(prontuario, idServico, dataHora) {
    throw new Error("Metodo não implementado");
  }

  async criarAgendamento(agendamento, connection) {
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

  async verificarStatusAgendamento(id) {
    throw new Error("Metodo não implementado");
  }

  async editarAgendamento(agendamento, connection) {
    throw new Erroe("metodo não implementado");
  }

  async obterConsultasNaoArquivadas() {
    throw new Error("Metodo não implementado");
  }

  /* implementar posteriormente
  async obterAgendamentosPendentes() {
    throw new Error("Metodo nao implementado");
  } 
  */

}

module.exports = AbstractAgendamentoRepository;
