class AbstractServicosService {
  constructor() {
    if (new.target === AbstractServicosService) {
      throw new Error("Classe abstrata não pode ser instanciada");
    }
  }

  async obterServicos() {
    throw new Error("Metodo não implementado");
  }

  async obterPorId(id) {
    throw new Error("Metodo não implementado");
  }

  async deletar(id) {
    throw new Error("Metodo não implementado");
  }

  async servicoExiste(nomeServico) {
    throw new Error("Metodo não implementado");
  }

  async adicionar(Nome_Servico, Descricao, Data_De_Cadastro, Status) {
    throw new Error("Metodo não implementado");
  }

  async atualizar(id, Nome_Servico, Descricao, Data_De_Cadastro, Status) {
    throw new Error("Metodo não implementado");
  }

}

module.exports = AbstractServicosService;
