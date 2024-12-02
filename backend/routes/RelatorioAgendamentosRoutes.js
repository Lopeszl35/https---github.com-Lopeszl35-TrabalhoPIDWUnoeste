const express = require("express");
const cors = require("cors");

const dependencyInjector = require("../utils/DependencyInjector");  
const RelatorioAgendamento = dependencyInjector.get(
    "RelatorioAgendamentoControl"
);

const router = express.Router();
router.use(cors());

// Relatorio Agendamentos
router.get("/relatorio/agendamentos", (req, res) => 
    RelatorioAgendamento.relatorioAgendamentos(req, res)
); 


module.exports = router;