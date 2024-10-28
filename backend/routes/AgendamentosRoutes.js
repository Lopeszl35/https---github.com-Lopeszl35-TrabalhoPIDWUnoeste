const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');

// Importa o AgendamentoController e injeta o AgendamentoService
const AgendamentoController = DependencyInjector.get('AgendamentoController');

// Configurações
const router = express.Router();
router.use(cors());


// Defini rota para cadastro de agendamento
router.post('/agendamentos', (req, res) => AgendamentoController.criarAgendamento(req, res));

module.exports = router;
