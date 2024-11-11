const DependencyInjector = require('../../utils/DependencyInjector');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

// Importa o ProfissionaisController e injeta o ProfissionaisService
const ProfissionaisController = DependencyInjector.get('ProfissionaisController');

// Rota para adicionar profissional
router.post('/profissionais/adicionar', (req, res) => 
    ProfissionaisController.adicionarProfissional(req, res)
);

// Rota para editar profissional
router.put('/profissionais/editar/:id', (req, res) => 
    ProfissionaisController.editarProfissional(req, res)
);

// Rota para obter todos os profissionais
router.get('/profissionais', (req, res) => 
    ProfissionaisController.obterProfissionais(req, res)
);

// Rota para obter profissional por id
router.get('/profissionais/:id', (req, res) => 
    ProfissionaisController.obterProfissionalPorId(req, res)
);

// Rota para deletar profissional
router.delete('/profissionais/excluir/:id', (req, res) => 
    ProfissionaisController.deletarProfissional(req, res)
);




module.exports = router;
