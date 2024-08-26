const express = require('express');
const cors = require('cors');
const { check } = require('express-validator');
const ProfissionalServicosController = require('../controller/profissionalServicosController');

const router = express.Router();
const profissionalServicosController = new ProfissionalServicosController();

// Rota para associar um profissional a um serviço
router.post(
    '/profissionais-servicos',
    [
        // Validação dos campos
        check('idProfissional')
            .notEmpty().withMessage('O ID do profissional é obrigatório.')
            .isInt().withMessage('O ID do profissional deve ser um número inteiro.'),
        check('idServico')
            .notEmpty().withMessage('O ID do serviço é obrigatório.')
            .isInt().withMessage('O ID do serviço deve ser um número inteiro.')
    ],
    (req, res) => profissionalServicosController.adicionar(req, res)
);

module.exports = router;
