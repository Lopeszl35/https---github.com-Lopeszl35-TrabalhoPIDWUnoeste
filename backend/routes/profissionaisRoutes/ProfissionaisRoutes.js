const express = require('express');
const router = express.Router();
const ProfissionaisController = require('../../controller/profissionaisController/ProfissionaisController');
const profissionaisController = new ProfissionaisController();

// Rota para filtrar profissionais por especialidade
router.get('/profissionais/especialidade/:especialidade', profissionaisController.filtrarPorEspecialidade.bind(profissionaisController));

// Rota para obter um profissional por ID
router.get('/profissionais/:id', profissionaisController.obterPorId.bind(profissionaisController));

// Rota para obter todos os profissionais
router.get('/profissionais', profissionaisController.obterTodos.bind(profissionaisController));

// Rota para adicionar um profissional
router.post('/profissionais', profissionaisController.adicionar.bind(profissionaisController));

//Rota para atualizar profissional
router.put('/profissionais/:id', profissionaisController.editarProfissional.bind(profissionaisController));

// Rota para excluir um profissional
router.delete('/profissionais/:id', profissionaisController.excluirUsuario.bind(profissionaisController));



module.exports = router;
