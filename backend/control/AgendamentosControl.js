const AbstractAgendamentoControl = require("./abstratos/AbstractAgendamentoControl");
const { validationResult } = require("express-validator");

class AgendamentosControl extends AbstractAgendamentoControl {
  constructor(agendamentoModel, transactionUtil) {
    super();
    this.agendamentoModel = agendamentoModel;
    this.transactionUtil = transactionUtil;
  }

  // Obtém todas as consultas
  async obterTodasConsultas(req, res) {
    try {
      const consultas = await this.agendamentoModel.obterTodasConsultas();
      res.status(200).json(consultas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Obtém as consultas de um paciente específico
  async obterConsultasDoPaciente(req, res) {
    const { prontuario } = req.params;
    try {
      const consultasPaciente = await this.agendamentoModel.obterConsultasDoPaciente(prontuario);
      res.status(200).json(consultasPaciente);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Cria um novo agendamento, usando transações para garantir atomicidade
  async criarAgendamento(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      prontuario,
      idProfissional,
      idServico,
      dataHora,
      observacoes,
      status,
      idHorarioProfissional,
    } = req.body;

    try {
      const result = await this.transactionUtil.executeTransaction(async (connection) => {
        // Cria o agendamento no banco de dados
        const novoAgendamento = await this.agendamentoModel.criarAgendamento(
          prontuario,
          idProfissional,
          idServico,
          dataHora,
          observacoes,
          status,
          idHorarioProfissional,
          connection
        );

        return novoAgendamento;
      });

      console.log("Novo Agendamento: ", result);
      res.status(201).json(result);
    } catch (error) {
      console.error("Erro ao criar o agendamento:", error);
      res.status(400).json({ message: error.message });
    }
  }

  // Edita um agendamento existente, garantindo a integridade com transações
  async editarAgendamento(req, res) {
    const { idAgendamento } = req.params;
    const { prontuario, idProfissional, idServico, dataHora, observacoes, status } = req.body;

    try {
      const result = await this.transactionUtil.executeTransaction(async (connection) => {
        // Atualiza o agendamento no banco de dados
        const agendamento = await this.agendamentoModel.editarAgendamento(
          prontuario,
          idProfissional,
          idServico,
          dataHora,
          observacoes,
          status,
          idAgendamento,
          connection
        );

        return agendamento;
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao editar o agendamento:", error);
      res.status(400).json({ message: error.message });
    }
  }

  // Arquiva uma consulta
  async arquivarConsulta(req, res) {
    try {
      const { id } = req.params;

      const result = await this.transactionUtil.executeTransaction(async (connection) => {
        // Arquiva a consulta no banco de dados
        const agendamento = await this.agendamentoModel.arquivarAgendamento(id, connection);
        return agendamento;
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao arquivar a consulta:", error);
      res.status(400).json({ message: error.message });
    }
  }

  // Obtém consultas que não estão arquivadas
  async obterConsultasNaoArquivadas(req, res) {
    try {
      const consultas = await this.agendamentoModel.obterConsultasNaoArquivadas();
      res.status(200).json(consultas);
    } catch (error) {
      console.error("Erro ao obter consultas não arquivadas:", error);
      res.status(400).json({ message: error.message });
    }
  }

  // Busca consultas por data para um paciente específico
  async buscarConsultaPorData(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { prontuario, data } = req.query;

    try {
      const consultas = await this.agendamentoModel.buscarConsultaPorData(prontuario, data);
      res.status(200).json(consultas);
    } catch (error) {
      console.error("Erro ao buscar consultas por data:", error);
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AgendamentosControl;
