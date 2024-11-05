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
      const existe = await this.servicoRepository.servicoExiste(nomeServico);
      if (!existe) {
        throw new Error("Serviço não encontrado");
      } else {
        return true;
      }
    } catch (error) {
      console.error("Erro ao verificar serviço:", error.message);
      throw error;
    }
  }

  async adicionar(Nome_Servico, Descricao, Data_De_Cadastro, Status) {
    try {
      //verifica se serviço ja existe
      const existe = await this.servicoExiste(Nome_Servico);
      if (existe) {
        throw new Error("Serviço ja cadastrado com esse nome");
      }
      const novoServico = new Servico(
        Nome_Servico,
        Descricao,
        Data_De_Cadastro,
        Status
      );
      const adicionado = await this.servicoRepository.adicionar(novoServico);
      if (!adicionado) {
        throw new Error("Erro ao adicionar serviço");
      }
      return { message: "Serviço adicionado com sucesso!" };
    } catch (error) {
      console.log("Erro ao adicionar serviço");
      throw error;
    }
  }
}

module.exports = ServicosService;
