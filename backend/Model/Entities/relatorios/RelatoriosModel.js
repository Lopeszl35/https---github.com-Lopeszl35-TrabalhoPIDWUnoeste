const AbstractRelatoriosModel = require('../../abstratos/AbstractRelatoriosModel');

class RelatoriosModel extends AbstractRelatoriosModel {
    constructor(RelatorioPacientesRepository, RelatorioAgendamentoRepository) {
        super();
        this.RelatorioPacientesRepository = RelatorioPacientesRepository;
        this.RelatorioAgendamentoRepository = RelatorioAgendamentoRepository;
    }

    async obterDadosRelatorio(tipo, filtros) {
        console.log("Filtros recebidos no Model:", filtros);
        switch (tipo) {
            case 'pacientes':
                const pacientes = await this.RelatorioPacientesRepository.baixarRelatorioPacientes(filtros);
                return pacientes;
            case 'agendamentos':
                return await this.RelatorioAgendamentoRepository.obterDadosAgendamentosParaRelatorio(filtros);
            default:
                throw new Error(`Tipo de relatório "${tipo}" não suportado.`);
        }
    }
}

module.exports = RelatoriosModel;
