const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');

// Importa o AgendamentoController e injeta o AgendamentoService
const AgendamentoController = DependencyInjector.get('AgendamentoController');

// Configurações
const router = express.Router();
router.use(cors());

// Rota para obter consulta do paciente por prontuário
router.get('/agendamentos/paciente/:prontuario', (req, res) => 
    AgendamentoController.obterConsultasDoPaciente(req, res)
);

// Rota para obter todas as consultas não arquivadas
router.get('/agendamentos/nao-arquivadas', (req, res) => 
    AgendamentoController.obterConsultasNaoArquivadas(req, res)
);

// Rota para obter todos os agendamentos
router.get('/agendamentos', (req, res) => 
    AgendamentoController.obterTodasConsultas(req, res)
);

// Rota para criar novo agendamento
router.post('/agendamentos', (req, res) => 
    AgendamentoController.criarAgendamento(req, res)
);

// Rota para arquivar consulta
router.put('/agendamentos/:id/arquivar', (req, res) => 
    AgendamentoController.arquivarConsulta(req, res)
);

// Rota para editar consulta
router.put('/agendamentos/:idAgendamento', (req, res) => 
    AgendamentoController.editarAgendamento(req, res)
);

module.exports = router;
