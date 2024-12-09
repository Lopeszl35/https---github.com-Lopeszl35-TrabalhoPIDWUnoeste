class AbstractRelatoriosPacientesModel {
    constructor() {
        if (new.target === AbstractRelatoriosPacientesModel) {
            throw new Error("Classe abstrata não pode ser instanciada diretamente");
        }
    }

    async obterRelatorioPacientes() {
        throw new Error("Método nao implementado");
    }

    async obterDistribuicaoPorEstado() {
        throw new Error("Método nao implementado");
    }

    async obterDistribuicaoPorCidade() {
        throw new Error("Método nao implementado");
    }

    async obterEstatisticasPorFaixaEtaria() {
        throw new Error("Método nao implementado");
    }

    async obterDistribuicaoPorSexo() {
        throw new Error("Método nao implementado");
    }

    async obterDistribuicaoPorDataNascimento() {
        throw new Error("Método nao implementado");
    }

}

module.exports = AbstractRelatoriosPacientesModel;