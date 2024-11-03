const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');
const { body, param, query } = require('express-validator');

const ServicoController = DependencyInjector.get('ServicoController');


const router = express.Router();
router.use(cors());

// Rota para obter todos os servicos
router.get('/servicos', (req, res) => 
    ServicoController.obterServicos(req, res)
);

module.exports = router;
