const express = require('express');
const { body, param, query } = require('express-validator');
const ServicoController = require('../controller/servicoController');

const router = express.Router();
const servicoController = new ServicoController();

// Rota para filtrar serviços
router.get('/servicos/filtrar', [
    query('filtro').isIn(['nome', 'profissional', 'status']).withMessage('Filtro inválido'),
    query('valor').notEmpty().withMessage('Valor do filtro não pode ser vazio')
], servicoController.filtrar.bind(servicoController));

// Rotas para CRUD de serviços
router.get('/servicos', servicoController.obterTodos.bind(servicoController));

router.post('/servicos', [
    body('Nome_Servico').notEmpty().withMessage('Nome do serviço é obrigatório'),
    body('Descricao').notEmpty().withMessage('Descrição é obrigatória'),
    body('Data_De_Cadastro').isISO8601().withMessage('Data de cadastro inválida'),
    body('Status').isIn(['Ativo', 'Inativo']).withMessage('Status inválido'),
    body('Profissional_Responsavel').notEmpty().withMessage('Profissional responsável é obrigatório')
], servicoController.adicionar.bind(servicoController));

router.put('/servicos/:id', [
    param('id').isInt().withMessage('ID do serviço inválido'),
    body('Nome_Servico').optional().notEmpty().withMessage('Nome do serviço é obrigatório'),
    body('Descricao').optional().notEmpty().withMessage('Descrição é obrigatória'),
    body('Data_De_Cadastro').optional().isISO8601().withMessage('Data de cadastro inválida'),
    body('Status').optional().isIn(['Ativo', 'Inativo']).withMessage('Status inválido'),
    body('Profissional_Responsavel').optional().notEmpty().withMessage('Profissional responsável é obrigatório')
], servicoController.atualizar.bind(servicoController));

router.delete('/servicos/:id', [
    param('id').isInt().withMessage('ID do serviço inválido')
], servicoController.deletar.bind(servicoController));

router.get('/servicos/:id', [
    param('id').isInt().withMessage('ID do serviço inválido')
], servicoController.obterPorId.bind(servicoController));

module.exports = router;
