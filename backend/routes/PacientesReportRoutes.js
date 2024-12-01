const express = require("express");
const router = express.Router();
const DependencyInjector = require("../utils/DependencyInjector");

// Obtemos o controlador de relatórios de pacientes a partir do DependencyInjector
const pacientesReportController = DependencyInjector.get("PacientesReportController");

// Rota para gerar relatório em PDF
router.get("/reports/pacientes/pdf", (req, res) => pacientesReportController.exportPDF(req, res));

// Rota para gerar relatório em Excel
router.get("/reports/pacientes/excel", (req, res) => pacientesReportController.exportExcel(req, res));

module.exports = router;