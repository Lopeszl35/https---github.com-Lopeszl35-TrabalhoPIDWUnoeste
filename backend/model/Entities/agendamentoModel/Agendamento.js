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

    get idAgendamento() { return this.#idAgendamento; }
    get prontuario() { return this.#prontuario; }
    get idProfissional() { return this.#idProfissional; }
    get idServico() { return this.#idServico; }
    get dataHora() { return this.#dataHora; }
    get status() { return this.#status; }
    get observacoes() { return this.#observacoes; }

    set status(value) { this.#status = value; }
    set observacoes(value) { this.#observacoes = value; }


}

module.exports = Agendamento