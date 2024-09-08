const express = require('express');
const cors = require('cors');
const { check } = require('express-validator');
const ProfissionalServicosController = require('../../controller/profissionalServicosController/ProfissionalServicosController');

const router = express.Router();
const profissionalServicosController = new ProfissionalServicosController();

// Rota para associar um profissional a um serviço
router.post('/profissionaisservicos', profissionalServicosController.adicionar.bind(profissionalServicosController),
);

module.exports = router;
