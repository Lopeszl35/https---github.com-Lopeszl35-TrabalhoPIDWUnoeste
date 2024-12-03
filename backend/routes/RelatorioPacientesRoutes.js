const express = require("express");
const cors = require("cors");

const dependencyInjector = require("../utils/DependencyInjector");  
const RelatorioPacientes = dependencyInjector.get(
    "RelatorioPacientesControl"
);

const router = express.Router();
router.use(cors());

router.get("/relatorio/pacientes", (req, res) => 
    RelatorioPacientes.relatorioPacientes(req, res)
); 


module.exports = router;