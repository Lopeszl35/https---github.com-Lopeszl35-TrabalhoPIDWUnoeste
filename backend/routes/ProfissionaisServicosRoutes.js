const express = require("express");
const cors = require("cors");
const DependencyInjector = require("../utils/DependencyInjector");

const ProfissionaisServicosControl = DependencyInjector.get(
  "ProfissionalServicosControl"
);

// Configurações
const router = express.Router();
router.use(cors());

// Rota para buscar profissionais
router.get("/profissionaisServico/buscar", (req, res) => 
  ProfissionaisServicosControl.buscarProfissionais(req, res)
);

// Rota para criar relação
router.post("/profissionalServico/relacionar", (req, res) =>
  ProfissionaisServicosControl.relacionarProfissionalAServico(req, res)
);

// Rota para excluir relação
router.delete("/profissionalServico/deletar", (req, res) =>
  ProfissionaisServicosControl.deletarRelacao(req, res)
);

// Rota para obter profissionais do serviço
router.get("/profissionalServico/servico/:id", (req, res) =>
  ProfissionaisServicosControl.profissionaisDoServico(req, res)
);

module.exports = router;
