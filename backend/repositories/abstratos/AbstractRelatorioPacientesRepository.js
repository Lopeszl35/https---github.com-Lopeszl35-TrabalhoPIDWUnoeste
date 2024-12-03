class AbstractRelatoriosPacientesRepository {
    constructor() {
        if (new.target === AbstractRelatoriosPacientesRepository) {
            throw new Error("Classe abstrata não pode ser instanciada");
        }
    }

    // Método para buscar pacientes no banco de dados
    async obterPacientes(nome) {
        throw new Error("Método não implementado");
    }

    // Método para gerar relatório em Excel
    async gerarRelatorioExcel(pacientes) {
        throw new Error("Método não implementado");
    }

    // Método para gerar relatório em PDF
    async gerarRelatorioPdf(pacientes) {
        throw new Error("Método não implementado");
    }
}

module.exports = AbstractRelatoriosPacientesRepository;