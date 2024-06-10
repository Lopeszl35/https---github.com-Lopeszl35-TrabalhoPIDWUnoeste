const expres = require("express");
const cors = require("cors");
const { body, param, query } = require('express-validator');
const ResponsaveisController = require('../controller/responsaveisController');

const router = expres.Router();
const responsaveisController = new ResponsaveisController();

// Rota para obter todos os responsáveis
router.get('/responsaveis', responsaveisController.obterTodos.bind(responsaveisController));

// Rota para obter o responsável por ID
router.get('/responsaveis/:id', responsaveisController.obterPorProntuario.bind(responsaveisController));




module.exports = router