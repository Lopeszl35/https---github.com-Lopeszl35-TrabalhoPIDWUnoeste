const AbstractServicosModel = require("../../abstratos/AbstractServicosModel");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");

class ServicosModel extends AbstractServicosModel {
  constructor(servicoRepository) {
    super();
    this.servicoRepository = servicoRepository;
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
      return servicos;
    } catch (error) {
      console.log("Erro ao obter servico por ID");
      throw error;
    }
  }

  async deletar(id, connection) {
    try {
      await this.servicoRepository.deletar(id, connection);
      return { message: "Serviço excluido com sucesso" };
    } catch (error) {
      ErroSqlHandler.tratarErroSql(error, "servico");
      throw error;
    }
  }

  async servicoExiste(nomeServico) {
    try {
      const existe = await this.servicoRepository.servicoExiste(nomeServico);
      if (existe) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async adicionar(Nome_Servico, Descricao, Data_De_Cadastro, Status, connection) {
    try {
      //verifica se serviço ja existe
      const existe = await this.servicoExiste(Nome_Servico);
      if (existe) {
        throw new Error("Serviço ja cadastrado com esse nome");
      }
      const novoServico = {
        Nome_Servico,
        Descricao,
        Data_De_Cadastro,
        Status
      }
      const adicionado = await this.servicoRepository.adicionar(novoServico, connection);
      if (!adicionado) {
        throw error;
      }
      return { message: "Serviço adicionado com sucesso!" };
    } catch (error) {
      throw error;
    }
  }

  async atualizar(id, Nome_Servico, Descricao, Data_De_Cadastro, Status, connection) {
    try {
      const servico = {
        Nome_Servico,
        Descricao,
        Data_De_Cadastro,
        Status
      }
      const { sucesso, servicoAtualizado } = await this.servicoRepository.atualizar(servico, id, connection);
      if (!sucesso) {
        throw new Error("Erro ao atualizar servico");
      }
      return { message: "Serviço atualizado com sucesso!", servicoAtualizado };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ServicosModel;
