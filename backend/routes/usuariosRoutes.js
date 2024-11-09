const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');

// Importa o UsuariosController e injeta o UsuariosService
const UsuariosController = DependencyInjector.get('UsuariosController');

// Configurações
const router = express.Router();
router.use(cors());

// Rota para obter todos os usuários
router.get('/usuarios', (req, res) => 
    UsuariosController.obterUsuarios(req, res)
);

// Rota para adicionar um novo usuário
router.post('/usuarios/registrar', (req, res) => 
    UsuariosController.adicionarUsuario(req, res)
);

// Rota para editar um usuário
router.put('/usuarios/editar/:id', (req, res) => 
    UsuariosController.editarUsuario(req, res)
);

// Rota para excluir um usuário
router.delete('/usuarios/excluir/:id', (req, res) => 
    UsuariosController.excluirUsuario(req, res)
);

module.exports = router