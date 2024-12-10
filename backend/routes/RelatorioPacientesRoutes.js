const express = require("express");
const cors = require("cors");
const dependencyInjector = require("../utils/DependencyInjector");

const RelatorioPacientesControl = dependencyInjector.get(
    "RelatorioPacientesControl"
);
const RelatoriosControl = dependencyInjector.get("RelatoriosControl");

const router = express.Router();
router.use(cors());

// Rotas para geração de relatórios gerais (Excel e PDF)
router.get("/relatorio/gerarExcel", (req, res) =>
    RelatoriosControl.gerarRelatorioExcel(req, res)
);

router.get("/relatorio/gerarPdf", (req, res) =>
    RelatoriosControl.gerarRelatorioPdf(req, res)
);

// Rotas para Relatório de Pacientes
router.get("/relatorio/pacientes", (req, res) =>
    RelatorioPacientesControl.relatorioPacientes(req, res)
);

router.get("/relatorio/pacientes/estatisticas-estado", (req, res) =>
    RelatorioPacientesControl.distribuicaoPorEstado(req, res)
);

router.get("/relatorio/pacientes/estatisticas-cidade", (req, res) =>
    RelatorioPacientesControl.distribuicaoPorCidade(req, res)
);

router.get("/relatorio/pacientes/estatisticas-faixa-etaria", (req, res) =>
    RelatorioPacientesControl.estatisticasPorFaixaEtaria(req, res)
);

router.get("/relatorio/pacientes/estatisticas-sexo", (req, res) =>
    RelatorioPacientesControl.distribuicaoPorSexo(req, res)
);

router.get("/relatorio/pacientes/estatisticas-data-nascimento", (req, res) =>
    RelatorioPacientesControl.distribuicaoPorDataNascimento(req, res)
);

module.exports = router;
