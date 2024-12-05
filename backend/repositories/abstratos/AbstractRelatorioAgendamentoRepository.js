class AbstractRelatorioAgendamentoRepository {
    constructor() {
        if (new.target === AbstractRelatorioAgendamentoRepository) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }

    async obterRelatorioAgendamentos({ data, paciente, profissional, servico }) {
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

module.exports = AbstractRelatorioAgendamentoRepository