const express = require('express');
const router = express.Router();
const ProfissionaisController = require('../../controller/profissionaisController/ProfissionaisController');
const profissionaisController = new ProfissionaisController();

// Rota para obter todos os profissionais
router.get('/profissionais', profissionaisController.obterTodos.bind(profissionaisController));

// Rota para filtrar profissionais por especialidade
router.get('/profissionais/especialidade/:especialidade', profissionaisController.filtrarPorEspecialidade.bind(profissionaisController));

// Rota para adicionar um profissional
router.post('/profissionais', profissionaisController.adicionar.bind(profissionaisController));

module.exports = router;
