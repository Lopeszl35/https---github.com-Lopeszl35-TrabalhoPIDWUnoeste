const ServicoController = require('../controller/servicoController');
const servicoController = new ServicoController;
const express = require('express');
const router = express.Router();

router.get('/servicos', servicoController.obterTodos);

module.exports = router;