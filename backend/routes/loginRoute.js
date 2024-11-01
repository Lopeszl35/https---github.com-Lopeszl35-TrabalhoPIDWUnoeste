const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');

// Importa o UsuariosController e injeta o UsuariosService
const UsuariosController = DependencyInjector.get('UsuariosController');

// Configurações
const router = express.Router();
router.use(cors());

// Rota para login
router.post('/login', (req, res) => 
    UsuariosController.login(req, res)
);

module.exports = router