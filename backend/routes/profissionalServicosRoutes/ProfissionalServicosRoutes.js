const express = require('express');
const cors = require('cors');
const { check } = require('express-validator');
const ProfissionalServicosController = require('../../controller/profissionalServicosController/ProfissionalServicosController');

const authMiddleware = require('../../middleware/middleware');
const router = express.Router();
const profissionalServicosController = new ProfissionalServicosController();

router.get('/profissionaiservicos', authMiddleware, profissionalServicosController.obterTodos);

router.post('/profissionaiservicos', authMiddleware, profissionalServicosController.adicionar);

router.put('/profissionaiservicos/:id_profissional/:id_servico', authMiddleware, profissionalServicosController.atualizar);

router.delete('/profissionaiservicos/:id_profissional/:id_servico', authMiddleware, profissionalServicosController.remover);

module.exports = router;
