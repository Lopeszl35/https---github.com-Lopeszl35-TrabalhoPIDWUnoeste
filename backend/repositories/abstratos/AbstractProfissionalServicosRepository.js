class AbstractProfissionalServicosRepository {
    constructor() {
        if (new.target === AbstractProfissionalServicosRepository) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    async relacionarProfissionalAServico(idProfissional, idServico) {
        throw new Error("Metodo nao implementado");
    }

}

module.exports = AbstractProfissionalServicosRepository;