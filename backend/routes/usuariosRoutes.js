const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');

// Importa o UsuariosController e injeta o UsuariosService
const UsuariosController = DependencyInjector.get('UsuariosController');

// Configurações
const router = express.Router();
router.use(cors());

// Rota para adicionar um novo usuário
router.post('/usuarios/registrar', (req, res) => 
    UsuariosController.adicionarUsuario(req, res)
);

module.exports = router