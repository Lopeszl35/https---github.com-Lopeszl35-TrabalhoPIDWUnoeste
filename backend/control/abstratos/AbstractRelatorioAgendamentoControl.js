class AbstractRelatorioAgendamentoControl {
    constructor() {
        if (new.target === AbstractRelatorioAgendamentoControl) {
            throw new Error("Classe abstrata nao pode ser instanciada");
        }
    }

    async relatorioAgendamentos(req, res) {
        throw new Error("Metodo nao implementado");
    }

}

module.exports = AbstractRelatorioAgendamentoControl