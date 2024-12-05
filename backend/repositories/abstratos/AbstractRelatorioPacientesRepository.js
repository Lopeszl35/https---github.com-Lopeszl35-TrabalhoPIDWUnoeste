class AbstractRelatoriosPacientesRepository {
    constructor() {
        if (new.target === AbstractRelatoriosPacientesRepository) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

}

module.exports = AbstractRelatoriosPacientesRepository;