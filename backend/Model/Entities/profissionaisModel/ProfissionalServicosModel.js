const AbstractProfissionalServicosModel = require("../../abstratos/AbstractProfissionalServicosModel");

class ProfissionalServicosModel extends AbstractProfissionalServicosModel {
  constructor(profissionaisRepository, servicoRepository, profissionalServicosRepository) {
    super();
    this.profissionaisRepository = profissionaisRepository;
    this.servicoRepository = servicoRepository;
    this.profissionalServicosRepository = profissionalServicosRepository;
  }

  async relacionarProfissionalAServico(idProfissional, idServico, connection) {
    try {
      const profissional = await this.profissionaisRepository.obterPorId(
        idProfissional
      );
      if (!profissional) {
        throw new Error("Profissional nao encontrado");
      }
      const servico = await this.servicoRepository.obterPorId(idServico);
      if (!servico) {
        throw new Error("Servico nao encontrado");
      }
      const profissionalServico = await this.profissionalServicosRepository.existeRelacionamentoProfissionalServico(idProfissional,idServico);
      if (profissionalServico) {
        throw new Error("Profissional ja possui esse servico");
      }
      const relacionado = await this.profissionalServicosRepository.relacionarProfissionalAServico(idProfissional, idServico, connection);
      if (!relacionado) {
        throw new Error("Erro ao relacionar profissional com o servico");
      }
      return { message: "Profissional associado ao serviço com sucesso!" };
    } catch (error) {
      console.error("Erro ao relacionar profissional com serviço:", error);
      throw error;
    }
  }

  async deletarRelacao(idProfissional, idServico) {
    try {
      const relacaoDeletada = await this.profissionalServicosRepository.deletarRelacao(idProfissional, idServico);
      if (!relacaoDeletada) {
        throw new Error("Não foi possivel deletar a relação Error: ");
      }
      return { message: "Relação deletada com sucesso" };
    } catch (error) {
      console.error("Erro ao deletar relação Erro: ", error);
      throw error;
    }
  }

  async obterRelacoesServico(id) {
    try {
      const relacoes = await this.profissionalServicosRepository.obterRelacoesServico(id);
      if (relacoes.length === 0) {
        console.warn(`Nenhuma relação encontrada para o serviço com ID: ${id}`);
        return []; // Retorna um array vazio, indicando que não há relações
      }
      return relacoes;
    } catch (error) {
      console.error("Erro ao procurar relações Erro: ", error);
      throw error;
    }
  }

  async buscarProfissionais(searchTerm, searchType) {
    // adicionar validação para searchTerm e Type
    if (!searchTerm || !searchType) {
      return { message: "Termo de busca e tipo de busca obrigatórios" };
    }
    try {
      const profissionais = await this.profissionalServicosRepository.buscarProfissionais(searchTerm, searchType);
      if(!profissionais){
        throw new Error(`Nenhum profissional encontrado para seleção ${searchTerm}`);
      }
      return profissionais;
    } catch (error) {
      console.error("Erro ao busca profissionais: ", error);
      throw error;
    }
  }
}

module.exports = ProfissionalServicosModel;
