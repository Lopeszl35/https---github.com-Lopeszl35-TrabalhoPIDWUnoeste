class Agendamento {

    #idAgendamento;
    #prontuario;
    #idProfissional;
    #idServico;
    #dataHora;
    #status;
    #observacoes;

    constructor(IdAgendamento, prontuario, IdProfissional, IdServico, dataHora, status, observacoes) {
        this.#idAgendamento = IdAgendamento;
        this.#prontuario = prontuario;
        this.#idProfissional = IdProfissional;
        this.#idServico = IdServico;
        this.#dataHora = dataHora;
        this.#status = status;
        this.#observacoes = observacoes;
    }



}

module.exports = Agendamento