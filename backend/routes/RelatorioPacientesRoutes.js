const express = require("express");
const cors = require("cors");
const dependencyInjector = require("../utils/DependencyInjector");  

const RelatorioPacientesControl = dependencyInjector.get(
    "RelatorioPacientesControl"
);

RelatorioControl = dependencyInjector.get(
    "RelatoriosControl"
);

const router = express.Router();
router.use(cors());

router.get("/relatorio/gerarExcel", (req, res) => 
    RelatorioControl.gerarRelatorioExcel(req, res)
); 

router.get("/relatorio/gerarPdf", (req, res) => 
    RelatorioControl.gerarRelatorioPdf(req, res)
);


module.exports = router;