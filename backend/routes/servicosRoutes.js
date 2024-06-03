const ServicoController = require('../controller/servicoController');
const servicoController = new ServicoController;
const express = require('express');
const router = express.Router();

router.get('/servicos', servicoController.obterTodos);
router.get('/servicos/:id', servicoController.obterPorId);
router.put('/servicos/:id', servicoController.atualizar);
router.post('/servicos', servicoController.adicionar);


module.exports = router;