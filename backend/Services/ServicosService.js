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
      await this.servicoRepository.deletar(id);
      return { message: "Serviço excluido com sucesso" };
    } catch (error) {
      if (error.message.includes("ViolacaoChaveEstrageira")) {
        throw new Error(
          "Erro: Este serviço não pode ser excluido porque está associado a registros ativos"
        );
      } else if (error.message.includes("RestricaoIntegridadeReferencial")) {
        throw new Error(
          "Erro: O serviço possui relacionamentos que impedem a exclusão"
        );
      } else {
        throw error;
      }
    }
  }

  async servicoExiste(nomeServico) {
    try {
      const servico = await this.
    } catch (error) {

    }
  }

}

module.exports = ServicosService;
