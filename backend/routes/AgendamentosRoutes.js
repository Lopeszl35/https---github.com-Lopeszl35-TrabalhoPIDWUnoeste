const express = require('express');
const cors = require('cors');
const DependencyInjector = require('../utils/DependencyInjector');

// Importa o AgendamentoController e injeta o AgendamentoService
const AgendamentoControl = DependencyInjector.get('AgendamentoControl');

// Configurações
const router = express.Router();
router.use(cors());

// Rota para buscar consulta de paciente por data
router.get('/agendamentos/buscar', (req, res) => 
    AgendamentoControl.buscarConsultaPorData(req, res)
);

// Rota para obter consulta do paciente por prontuário
router.get('/agendamentos/paciente/:prontuario', (req, res) => 
    AgendamentoControl.obterConsultasDoPaciente(req, res)
);

// Rota para obter todas as consultas não arquivadas
router.get('/agendamentos/nao-arquivadas', (req, res) => 
    AgendamentoControl.obterConsultasNaoArquivadas(req, res)
);

// Rota para obter todos os agendamentos
router.get('/agendamentos', (req, res) => 
    AgendamentoControl.obterTodasConsultas(req, res)
);

// Rota para criar novo agendamento
router.post('/agendamentos', (req, res) => 
    AgendamentoControl.criarAgendamento(req, res)
);

// Rota para arquivar consulta
router.put('/agendamentos/:id/arquivar', (req, res) => 
    AgendamentoControl.arquivarConsulta(req, res)
);

// Rota para editar consulta
router.put('/agendamentos/:idAgendamento', (req, res) => 
    AgendamentoControl.editarAgendamento(req, res)
);

module.exports = router;
