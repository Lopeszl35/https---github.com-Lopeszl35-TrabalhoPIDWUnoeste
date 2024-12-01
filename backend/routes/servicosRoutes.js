const express = require("express");
const cors = require("cors");
const DependencyInjector = require("../utils/DependencyInjector");

const ServicoControl = DependencyInjector.get("ServicoControl");

const router = express.Router();
router.use(cors());

// Rota para adicionar serviço
router.post('/servicos', (req, res) =>
  ServicoControl.adicionar(req, res)
);

// Rota para editar serviço
router.put('/servicos/atualizar/:id', (req, res) =>
  ServicoControl.atualizar(req, res)
);

// Rota para obter servico por ID
router.get("/servicos/:id", (req, res) =>
  ServicoControl.obterPorId(req, res)
);

// Rota para obter todos os servicos
router.get("/servicos", (req, res) =>
  ServicoControl.obterServicos(req, res)
);

// Rota para deletar servico
router.delete("/servicos/deletar/:id", (req, res) =>
  ServicoControl.deletar(req, res)
);

module.exports = router;
