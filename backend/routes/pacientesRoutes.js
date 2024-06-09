const express = require('express');
const cors = require('cors');
const PacientesController = require('../controller/pacientesController');

const router = express.Router();
const pacientesController = new PacientesController();

// Rota para obter todos os pacientes
router.get('/pacientes', pacientesController.obterTodos.bind(pacientesController));

module.exports = router;
