const express = require("express");
const router = express.Router();
const DependencyInjector = require("../utils/DependencyInjector");

// Obter o controlador de relatórios de pacientes
const pacientesReportController = DependencyInjector.get("PacientesReportController");

router.get("/reports/pacientes/pdf", (req, res) => pacientesReportController.exportPDF(req, res));
router.get("/reports/pacientes/excel", (req, res) => pacientesReportController.exportExcel(req, res));

module.exports = router;