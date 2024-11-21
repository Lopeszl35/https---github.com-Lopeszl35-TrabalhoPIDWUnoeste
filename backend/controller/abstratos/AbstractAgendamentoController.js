class AbstractAgendamentoController {
  constructor() {
    if (new.target === AbstractAgendamentoController) {
      throw new Error("Não é possível instanciar uma classe abstrata");
    }
  }

  async obterTodasConsultas(req, res) {
    throw new Error("Metodo não implementado");
  }

  async criarAgendamento(req, res) {
    throw new Error("Metodo não implementado");
  }

  async arquivarConsulta(req, res) {
    throw new Error("Metodo não implementado");
  }

  async obterConsultasDoPaciente(req, res) {
    throw new Error("Metodo não implementado");
  }

  async editarAgendamento(req, res) {
    throw new Error("Metodo não implementado");
  }

  async obterConsultasNaoArquivadas(req, res) {
    throw new Error("Metodo não implementado");
  }

  /* implementar posteriormente
  async obterAgendamentosPendentes() {
    throw new Error("Metodo nao implementado");
  } 
  */


}

module.exports = AbstractAgendamentoController;
