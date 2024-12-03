class AbstractRelatorioAgendamentoControl {
    constructor() {
        if (new.target === AbstractRelatorioAgendamentoControl) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }

    async relatorioAgendamentos(req, res) {
        throw new Error("Metodo nao implementado");
    }

    async estatisticasAgendamentos(req, res) {
        throw new Error("Metodo nao implementado");
    }

    async distribuicaoPorData(req, res) {
        throw new Error("Metodo nao implementado");
    }

    async distribuicaoPorProfissional(req, res) {
        throw new Error("Metodo nao implementado");
    }

    async distribuicaoPorServico(req, res) {
        throw new Error("Metodo nao implementado");
    }

}

module.exports = AbstractRelatorioAgendamentoControl