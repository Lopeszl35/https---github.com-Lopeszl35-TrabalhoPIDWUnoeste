class AbstractRelatoriosModel {
    consutructor() {
        if (new.target === AbstractRelatoriosModel) {
            throw new Error("Não é possivel instanciar uma classe abstrata");
        }
    }

    async obterDadosRelatorio(tipo) {
        throw new Error("Classe abstrata não pode ser instanciada diretamente");
    }

}

module.exports = AbstractRelatoriosModel;