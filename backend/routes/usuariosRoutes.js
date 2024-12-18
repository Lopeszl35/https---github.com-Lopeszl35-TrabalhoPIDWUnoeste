const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');

// Importa o UsuariosController e injeta o UsuariosService
const UsuariosControl = DependencyInjector.get('UsuariosControl');

// Configurações
const router = express.Router();
router.use(cors());

// Rota para obter todos os usuários
router.get('/usuarios', (req, res) => 
    UsuariosControl.obterUsuarios(req, res)
);

// Rota para adicionar um novo usuário
router.post('/usuarios/cadastrar', (req, res) => 
    UsuariosControl.adicionarUsuario(req, res)
);

// Rota para editar um usuário
router.put('/usuarios/editar/:id', (req, res) => 
    UsuariosControl.editarUsuario(req, res)
);

// Rota para excluir um usuário
router.delete('/usuarios/excluir/:id', (req, res) => 
    UsuariosControl.excluirUsuario(req, res)
);

module.exports = router