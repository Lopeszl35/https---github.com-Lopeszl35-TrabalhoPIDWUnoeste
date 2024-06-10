const express = require('express');
const cors = require('cors');
const PacientesController = require('../controller/pacientesController');
const { body, param, query } = require('express-validator');

const router = express.Router();
const pacientesController = new PacientesController();

// Rota para obter todos os pacientes
router.get('/pacientes', pacientesController.obterTodos.bind(pacientesController));

// Rota para obter o paciente por ID
router.get('/pacientes/:id', pacientesController.obterPorId.bind(pacientesController));


router.post('/pacientes', [
    body('Prontuario').notEmpty().withMessage('Prontuario é obrigatório'),
    body('Nome_Completo').notEmpty().withMessage('Nome do usuário é obrigatório'),
    body('Data_De_Nascimento').isISO8601().withMessage('Data de nascimento inválida'),
    body('CPF').notEmpty().withMessage('CPF é obrigatório'),
    body('RG').notEmpty().withMessage('RG é obrigatório'),
    body('CartaoSus').notEmpty().withMessage('Cartão SUS é obrigatório'),
    body('Escola').notEmpty().withMessage('Escola é obrigatório'),
    body('Ano_Escolar').notEmpty().withMessage('Ano escolar é obrigatório'),
    body('Periodo').notEmpty().withMessage('Periodo é obrigatório')
], pacientesController.adicionar.bind(pacientesController));   


module.exports = router;
