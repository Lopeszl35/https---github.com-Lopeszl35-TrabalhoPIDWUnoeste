class AbstractRelatorioAgendamentoModel {
    constructor() {
        if (new.target === AbstractRelatorioAgendamentoModel) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }

    async relatorioAgendamentos(filtros) {
        throw new Error("Metodo abstrato nao implementado");
    }

    async obterEstatisticasAgendamentos() {
        throw new Error("Metodo abstrato nao implementado");
    }

    async obterDistribuicaoPorData() {
        throw new Error("Metodo abstrato nao implementado");
    }

    async obterDistribuicaoPorProfissional() {
        throw new Error("Metodo abstrato nao implementado");
    }

    async obterDistribuicaoPorServico() {
        throw new Error("Metodo abstrato nao implementado");
    }

    
}

module.exports = AbstractRelatorioAgendamentoModel;