const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');
const { body, param, query } = require('express-validator');

// Importa o PacientesController e injeta o PacientesService
const PacientesController = DependencyInjector.get('PacientesController');

// Configurações
const router = express.Router();
router.use(cors());



// Rota para obter todos os pacientes
router.get('/pacientes', (req, res) => 
    PacientesController.obterPacientes(req, res)
);

// Rota para obter dados completos do paciente
router.get('/pacientes/:prontuario', (req, res) => 
    PacientesController.obterDadosCompletosDoPaciente(req, res)
);

module.exports = router;