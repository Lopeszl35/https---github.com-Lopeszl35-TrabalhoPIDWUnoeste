const AbstractRelatoriosModel = require('../../abstratos/AbstractRelatoriosModel');

class RelatoriosModel extends AbstractRelatoriosModel {
    constructor(pacientesRepository, agendamentoRepository) {
        super();
        this.pacientesRepository = pacientesRepository;
        this.agendamentoRepository = agendamentoRepository;
    }

    async obterDadosRelatorio(tipo) {
        switch (tipo) {
            case 'pacientes':
                const pacientes = await this.pacientesRepository.obterPacientes();
                return pacientes;
            case 'agendamentos':
                return await this.agendamentoRepository.obterDadosAgendamentosParaRelatorio();
            default:
                throw new Error(`Tipo de relatório "${tipo}" não suportado.`);
        }
    }
}

module.exports = RelatoriosModel;
