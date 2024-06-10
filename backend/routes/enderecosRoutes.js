const express = require('express');
const cors = require('cors');
const EnderecosController = require('../controller/enderecosController');
const { body, param, query } = require('express-validator');

const router = express.Router();
const enderecosController = new EnderecosController();

// Rota para obter todos os endereços
router.get('/enderecos', enderecosController.obterTodos.bind(enderecosController));

// Rota para obter o endereço por ID
router.get('/enderecos/:id', [
    param('id').isInt().withMessage('ID do endereço inválido')
], enderecosController.obterPorProntuario.bind(enderecosController));

module.exports = router;