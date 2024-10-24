const express = require('express');
const cors = require('cors');
const { check } = require('express-validator');
const ProfissionalServicosController = require('../../controller/profissionalServicosController/ProfissionalServicosController');

const router = express.Router();
const profissionalServicosController = new ProfissionalServicosController();

router.get('/profissionaiservicos', profissionalServicosController.obterTodos);

router.post('/profissionaiservicos', profissionalServicosController.adicionar);

router.put('/profissionaiservicos/:id_profissional/:id_servico', profissionalServicosController.atualizar);

router.delete('/profissionaiservicos/:id_servico', profissionalServicosController.remover);

// Rota para listar profissionais por serviço
router.get('/servicos/:idServico/profissionais', profissionalServicosController.obterProfissionaisPorServico);

module.exports = router;
