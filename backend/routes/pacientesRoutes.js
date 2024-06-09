const express = require('express');
const cors = require('cors');
const PacientesController = require('../controller/pacientesController');

const router = express.Router();
const pacientesController = new PacientesController();

// Rota para obter todos os pacientes
router.get('/pacientes', pacientesController.obterTodos.bind(pacientesController));

// Rota para obter o paciente por ID
router.get('/pacientes/:id', pacientesController.obterPorId.bind(pacientesController));

module.exports = router;
