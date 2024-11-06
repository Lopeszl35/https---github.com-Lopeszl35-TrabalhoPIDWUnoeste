const express = require("express");
const cors = require("cors");
const DependencyInjector = require("../utils/DependencyInjector");

// Importa o ProfissionaisServicosController e injeta o ProfissionaisServicosService
const ProfissionaisServicosController = DependencyInjector.get(
  "ProfissionaisServicosController"
);

// Configurações
const router = express.Router();
router.use(cors());

// Rota para criar relação
router.post("./profissionalServico/relacionar", (req, res) =>
  ProfissionaisServicosController.relacionarProfissionalAServico(req, res)
);

// Rota para excluir relação
router.delete(fissionalServico / deletar, (req, res) =>
  ProfissionaisServicosController.deletarRelacao(req, res)
);

module.exports = router;
