const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');

// Importa o AgendamentoController e injeta o AgendamentoService
const AgendamentoController = DependencyInjector.get('AgendamentoController');

// Configurações
const router = express.Router();
router.use(cors());

// Rota para obter todos os agendamentos
router.get('/agendamentos', (req, res) => AgendamentoController.obterTodasConsultas(req, res));

// Defini rota para cadastro de agendamento
router.post('/agendamentos', (req, res) => AgendamentoController.criarAgendamento(req, res));

// Rota para arquivar consulta
router.put('/agendamentos/:id/arquivar', (req, res) => AgendamentoController.arquivarConsulta(req, res));

module.exports = router;
