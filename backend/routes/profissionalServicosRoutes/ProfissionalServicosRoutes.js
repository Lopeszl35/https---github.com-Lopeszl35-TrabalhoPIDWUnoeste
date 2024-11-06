const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../../utils/DependencyInjector');

// Importa o ProfissionaisServicosController e injeta o ProfissionaisServicosService
const ProfissionaisServicosController = DependencyInjector.get('ProfissionaisServicosController');

// Configurações
const router = express.Router();
router.use(cors());

// Rota para criar relação


module.exports = router;
