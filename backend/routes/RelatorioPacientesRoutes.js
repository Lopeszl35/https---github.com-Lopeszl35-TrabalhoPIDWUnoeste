const express = require("express");
const cors = require("cors");

const dependencyInjector = require("../utils/DependencyInjector");  
const RelatorioPacientes = dependencyInjector.get(
    "RelatorioPacientesControl"
);

const router = express.Router();
router.use(cors());

router.get("/relatorio/pacientes/gerarExecel", (req, res) => 
    RelatorioPacientes.gerarRelatorioExcel(req, res)
); 

router.get("/relatorio/pacientes/gerarPDF", (req, res) => 
    RelatorioPacientes.gerarRelatorioPDF(req, res)
);


module.exports = router;