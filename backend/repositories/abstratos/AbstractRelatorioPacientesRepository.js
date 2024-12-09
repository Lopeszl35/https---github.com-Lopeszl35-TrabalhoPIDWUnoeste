class AbstractRelatoriosPacientesRepository {
    constructor() {
        if (new.target === AbstractRelatoriosPacientesRepository) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async obterRelatorioPacientes({ nome, cidade, estado, dataInicio, dataFim }) {
        throw new Error("Método não implementado");
    }

    async obterDistribuicaoPorEstado() {
        throw new Error("Método não implementado");
    }

    async obterDistribuicaoPorCidade() {
        throw new Error("Método não implementado");
    }

    async obterEstatisticasPorFaixaEtaria() {

    }

    async obterDistribuicaoPorSexo() {
        throw new Error("Método não implementado");
    }

    async obterDistribuicaoPorDataNascimento() {
        throw new Error("Método não implementado");
    }

}

module.exports = AbstractRelatoriosPacientesRepository;