const AbstractAgendamentoController = require("./abstratos/AbstractAgendamentoController");

class AgendamentosController extends AbstractAgendamentoController {
  constructor(agendamentoService) {
    super();
    this.agendamentoService = agendamentoService;
  }

  async obterTodasConsultas(req, res) {
    try {
      const consultas = await this.agendamentoService.obterTodasConsultas();
      res.status(200).json(consultas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async obterConsultasDoPaciente(req, res) {
    const { prontuario } = req.params;
    try {
      const consultasPaciente =
        await this.agendamentoService.obterConsultasDoPaciente(prontuario);
      res.status(200).json(consultasPaciente);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async criarAgendamento(req, res) {
    try {
      const {
        prontuario,
        idProfissional,
        idServico,
        dataHora,
        observacoes,
        status,
        idHorarioProfissional
      } = req.body;
      const novoAgendamento = await this.agendamentoService.criarAgendamento(
        prontuario,
        idProfissional,
        idServico,
        dataHora,
        observacoes,
        status,
        idHorarioProfissional
      );
      console.log("Novo Agendamento: ", novoAgendamento);
      res.status(201).json(novoAgendamento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async editarAgendamento(req, res) {
    const { idAgendamento } = req.params;
    const { prontuario, idProfissional, idServico, dataHora, observacoes, status } = req.body;

    try {
      const agendamento = await this.agendamentoService.editarAgendamento(
        prontuario,
        idProfissional,
        idServico,
        dataHora,
        observacoes,
        status,
        idAgendamento
      );
      res.status(200).json(agendamento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  }

  async arquivarConsulta(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await this.agendamentoService.arquivarAgendamento(id);
      res.status(200).json(agendamento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async obterConsultasNaoArquivadas(req, res) {
    try {
      const consultas = await this.agendamentoService.obterConsultasNaoArquivadas();
      res.status(200).json(consultas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}

module.exports = AgendamentosController;
