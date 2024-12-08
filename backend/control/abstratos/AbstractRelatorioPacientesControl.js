class AbstractRelatorioPacientesControl {
    constructor() {
        if (new.target === AbstractRelatorioPacientesControl) {
            throw new Error("Classe abstrata não pode ser instanciada diretamente");
        }
    }

    
}

module.exports = AbstractRelatorioPacientesControl;