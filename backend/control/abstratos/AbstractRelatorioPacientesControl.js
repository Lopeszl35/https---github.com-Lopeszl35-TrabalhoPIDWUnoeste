class AbstractRelatorioPacientesControl {
    constructor() {
        if (new.target === AbstractRelatorioPacientesControl) {
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

module.exports = AbstractRelatorioPacientesControl;