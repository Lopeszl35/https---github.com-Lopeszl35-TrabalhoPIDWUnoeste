const express = require("express");
const cors = require("cors");
const DependencyInjector = require("../utils/DependencyInjector");

const ServicoController = DependencyInjector.get("ServicoController");

const router = express.Router();
router.use(cors());

// Rota para adicionar serviço
router.post('/servicos', (req, res) =>
  ServicoController.adicionar(req, res)
);

// Rota para editar serviço
router.put('/servicos/atualizar/:id', (req, res) =>
  ServicoController.atualizar(req, res)
);

// Rota para obter servico por ID
router.get("/servicos/:id", (req, res) =>
  ServicoController.obterPorId(req, res)
);

// Rota para obter todos os servicos
router.get("/servicos", (req, res) =>
  ServicoController.obterServicos(req, res)
);

// Rota para deletar servico
router.delete("/servicos/deletar/:id", (req, res) =>
  ServicoController.deletar(req, res)
);

module.exports = router;
