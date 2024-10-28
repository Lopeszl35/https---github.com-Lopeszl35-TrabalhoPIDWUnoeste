const express = require('express');
const cors = require('cors');
const AgendamentoRepository = require('../repositories/AgendamentoRepository');
const AgendamentoService = require('../Services/AgendamentoService');
const AgendamentosController = require('../controller/AgendamentosController');
const DataBase = require('../model/database');

// Configurações
const router = express.Router();
router.use(cors());

// Inicializando dependências e injetando-as
const dataBase = new DataBase();
const agendamentoRepository = new AgendamentoRepository(dataBase);
const agendamentoService = new AgendamentoService(agendamentoRepository, dataBase);
const agendamentosController = new AgendamentosController(agendamentoService);

// Definindo as rotas de agendamentos
router.post('/agendamentos', agendamentosController.criarAgendamento.bind(agendamentosController));

module.exports = router;
