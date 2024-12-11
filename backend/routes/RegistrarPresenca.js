const express = require("express");
const cors = require("cors");

const DependencyInjector = require("../utils/DependencyInjector")

const RegistrarPresencaControl = DependencyInjector.get(
    "RegistrarPresencaControl"
);

const router = express.Router();
router.use(cors());

// Rota para buscar agendamentos por data
router.get("/agendamento/buscarAgendamento", (req, res) => 
    RegistrarPresencaControl.buscarAgendamentoPorData(req, res)
);

// Rota para registrar presença em consulta
router.update("/agendamento/registrarPresenca", (req, res) => 
    RegistrarPresencaControl.registrarPresenca(req, res)
);

// Rota para registra ausência em consulta
router.update("/agendamento/registrarAusencia", (req, res) =>
    RegistrarPresencaControl.registrarAusencia(req, res)
);

// Rota para cancelar agendamento
router.update("/agendamento/cancelarAgendamento", (req, res) => 
    RegistrarPresencaControl.cancelarAgendamento(req, res)
)


module.exports = router;