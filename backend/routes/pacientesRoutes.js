const express = require('express');
const cors = require('cors');
const PacientesController = require('../controller/pacientesController');
const { body, param, query } = require('express-validator');

const router = express.Router();
const pacientesController = new PacientesController();

//Rora para filtrar paciente por nome
router.get('/pacientes/filtrar', [
    query('nome').notEmpty().withMessage('Nome do paciente é obrigatório')
], pacientesController.filtrarPorNome.bind(pacientesController));


// Rota para obter todos os pacientes
router.get('/pacientes', pacientesController.obterTodos.bind(pacientesController));

// Rota para obter o paciente por ID
router.get('/pacientes/:id', pacientesController.filtrarPorProntuario.bind(pacientesController));

// Rota para adicionar um paciente
router.post('/pacientes', [
    body('Prontuario').notEmpty().withMessage('Prontuário é obrigatório'),
    body('Nome_Completo').notEmpty().withMessage('Nome completo é obrigatório'),
    body('Data_De_Nascimento').isISO8601().withMessage('Data de nascimento inválida'),
    body('CPF').notEmpty().withMessage('CPF é obrigatório'),
    body('RG').notEmpty().withMessage('RG é obrigatório'),
    body('CartaoSUS').notEmpty().withMessage('Cartão SUS é obrigatório'),
    body('Escola').notEmpty().withMessage('Escola é obrigatória'),
    body('Ano_Escolar').notEmpty().withMessage('Ano escolar é obrigatório'),
    body('Periodo').notEmpty().withMessage('Período é obrigatório')
], pacientesController.adicionar.bind(pacientesController));

// Rota para atualizar um paciente
router.put('/pacientes/:id', [
    body('Prontuario').optional().notEmpty().withMessage('Prontuário é obrigatório'),
    body('Nome_Completo').optional().notEmpty().withMessage('Nome completo é obrigatório'),
    body('Data_De_Nascimento').optional().isISO8601().withMessage('Data de nascimento inválida'),
    body('CPF').optional().notEmpty().withMessage('CPF é obrigatório'),
    body('RG').optional().notEmpty().withMessage('RG é obrigatório'),
    body('CartaoSUS').optional().notEmpty().withMessage('Cartão SUS é obrigatório'),
    body('Escola').optional().notEmpty().withMessage('Escola é obrigatória'),
    body('Ano_Escolar').optional().notEmpty().withMessage('Ano escolar é obrigatório'),
    body('Periodo').optional().notEmpty().withMessage('Período é obrigatório')
], pacientesController.atualizar.bind(pacientesController));

// Rota para deletar um paciente
router.delete('/pacientes/:id', [
    param('id').isInt().withMessage('ID do paciente inválido')
], pacientesController.deletar.bind(pacientesController));


module.exports = router;
