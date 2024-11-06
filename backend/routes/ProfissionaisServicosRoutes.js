const express = require("express");
const cors = require("cors");
const DependencyInjector = require("../utils/DependencyInjector");

// Importa o ProfissionaisServicosController e injeta o ProfissionaisServicosService
const ProfissionaisServicosController = DependencyInjector.get(
  "ProfissionalServicosController"
);

// Configurações
const router = express.Router();
router.use(cors());

// Rota para criar relação
router.post("/profissionalServico/relacionar", (req, res) =>
  ProfissionaisServicosController.relacionarProfissionalAServico(req, res)
);

// Rota para excluir relação
router.delete("/profissionalServico/deletar", (req, res) =>
  ProfissionaisServicosController.deletarRelacao(req, res)
);

// Rota para obter profissionais do serviço
router.get("/profissionalServico/servico/:id", (req, res) =>
  ProfissionaisServicosController.profissionaisDoServico(req, res)
);

module.exports = router;
