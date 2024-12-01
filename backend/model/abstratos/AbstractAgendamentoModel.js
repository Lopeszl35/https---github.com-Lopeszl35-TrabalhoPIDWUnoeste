class AbstractAgendamentoModel {
  constructor() {
    if (new.target === AbstractAgendamentoModel) {
      throw new Error("Não é possível instanciar uma classe abstrata");
    }
  }

  async obterTodasConsultas() {
    throw new Error("Metodo não implementado");
  }

  async obterConsultasDoPaciente(prontuario) {
    throw new Error("Metodo deve ser implementado");
  }

  async criarAgendamento(
    prontuario,
    idProfissional,
    idServico,
    dataHora,
    observacoes,
    status = "Pendente",
    idHorarioProfissional
  ) {
    throw new Error("Metodo não implementado");
  }

  async editarAgendamento(
    prontuario,
    idProfissional,
    idServico,
    dataHora,
    observacoes,
    status
  ) {
    throw new Error("Metodo não implementado");
  }

  async arquivarAgendamento(idAgendamento) {
    throw new Error("Metodo não implementado");
  }

  async obterConsultasNaoArquivadas() {
    throw new Error("Metodo não implementado");
  }

  async buscarConsultaPorData(data) {
    throw new Error("Metodo nao implementado");
  }

  /* implementar posteriormente
  async obterAgendamentosPendentes() {
    throw new Error("Metodo nao implementado");
  } 
  */


}

module.exports = AbstractAgendamentoModel;
