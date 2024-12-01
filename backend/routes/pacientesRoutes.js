const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');
const { body, param, query } = require('express-validator');

// Importa o PacientesController e injeta o PacientesService
const PacientesControl = DependencyInjector.get('PacientesControl');

// Configurações
const router = express.Router();
router.use(cors());

// Rota para adicionar paciente
router.post('/pacientes/adicionar', (req, res) => 
    PacientesControl.adicionarPaciente(req, res)
);

// Rota para salvar evolução do paciente
router.post('/evolucoes/salvar', (req, res) => 
    PacientesControl.salvarEvolucao(req, res)
);

// Rota para editar paciente
router.put('/pacientes/editar/:prontuario', (req, res) => 
    PacientesControl.atualizarPaciente(req, res)
);

// Rota para excluir paciente
router.delete('/pacientes/excluir/:prontuario', (req, res) => 
    PacientesControl.deletarPaciente(req, res)
);

// Rota para obter todos os pacientes
router.get('/pacientes', (req, res) => 
    PacientesControl.obterPacientes(req, res)
);

// Rota para buscar pacientes diretamente do banco de dados
router.get('/pacientes/buscar', (req, res) => 
    PacientesControl.buscarPaciente(req, res)
);

// Rota para obter dados completos do paciente
router.get('/pacientes/:prontuario', (req, res) => 
    PacientesControl.obterDadosCompletosDoPaciente(req, res)
);

// Rota para obter avaliações do paciente
router.get('/evolucoes/buscar/:prontuario', (req, res) => 
    PacientesControl.obterEvolucoesDoPaciente(req, res)
);



module.exports = router;