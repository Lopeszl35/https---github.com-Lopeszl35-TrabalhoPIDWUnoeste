const express = require('express');
const ServicoController = require('../controller/servicoController');

const router = express.Router();
const servicoController = new ServicoController();

// Rota para filtrar serviços
router.get('/servicos/filtrar', servicoController.filtrar.bind(servicoController));

// Rotas para CRUD de serviços
router.get('/servicos', servicoController.obterTodos.bind(servicoController));
router.post('/servicos', servicoController.adicionar.bind(servicoController));
router.put('/servicos/:id', servicoController.atualizar.bind(servicoController));
router.delete('/servicos/:id', servicoController.deletar.bind(servicoController));

// Rota para obter serviço por ID (mantida após as rotas de filtragem)
router.get('/servicos/:id', servicoController.obterPorId.bind(servicoController));

module.exports = router;
