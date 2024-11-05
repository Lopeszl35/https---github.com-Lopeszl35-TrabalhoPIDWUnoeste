const AbstractServicosService = require("./abstratos/AbstractServicosService");

class ServicosService extends AbstractServicosService {
  constructor(servicoRepository, database) {
    super();
    this.servicoRepository = servicoRepository;
    this.database = database;
  }

  async obterServicos() {
    try {
      const servicos = await this.servicoRepository.obterServicos();
      if (!servicos) {
        throw new Error("Erro ao obter os Serviços!");
      }
      return servicos;
    } catch (error) {
      console.log("Erro ao obter os Serviços:", error);
      throw error;
    }
  }

  async obterPorId(id) {
    try {
      const servicos = await this.servicoRepository.obterPorId(id);
      if (!servicos) {
        throw new Error("Servico não encontrado para esse ID");
      }
    } catch (error) {
      console.log("Erro ao obter servico por ID");
      throw error;
    }
  }

  async deletar(id) {
    try {
        
    }
  }

}

module.exports = ServicosService;
