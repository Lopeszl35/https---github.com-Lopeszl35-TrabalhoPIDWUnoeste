const express = require("express");
const cors = require("cors");

const dependencyInjector = require("../utils/DependencyInjector");
const RelatorioAgendamento = dependencyInjector.get(
    "RelatorioAgendamentoControl"
);

const router = express.Router();
router.use(cors());

// Relatório de Agendamentos com filtros
router.get("/relatorio/agendamentos", (req, res) =>
    RelatorioAgendamento.relatorioAgendamentos(req, res)
);

// Estatísticas de Agendamentos por Status
router.get("/relatorio/agendamentos/estatisticas", (req, res) =>
    RelatorioAgendamento.estatisticasAgendamentos(req, res)
);

// Distribuição de Agendamentos por Data
router.get("/relatorio/agendamentos/distribuicao-por-data", (req, res) =>
    RelatorioAgendamento.distribuicaoPorData(req, res)
);

// Distribuição de Agendamentos por Profissional
router.get("/relatorio/agendamentos/distribuicao-por-profissional", (req, res) =>
    RelatorioAgendamento.distribuicaoPorProfissional(req, res)
);

// Distribuição de Agendamentos por Serviço
router.get("/relatorio/agendamentos/distribuicao-por-servico", (req, res) =>
    RelatorioAgendamento.distribuicaoPorServico(req, res)
);

router.get("/relatorio/gerarExcel", (req, res) => 
    RelatorioControl.gerarRelatorioExcel(req, res)
); 

router.get("/relatorio/gerarPdf", (req, res) => 
    RelatorioControl.gerarRelatorioPdf(req, res)
);

module.exports = router;
