const { validationResult } = require('express-validator');
const AbstractAgendamentoController = require('./abstratos/AbstractAgendamentoController');


class PacientesController extends AbstractAgendamentoController {
    constructor(pacientesService) {
        super();
        this.pacientesService = pacientesService;
    }

    async adicionarPaciente(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { paciente, endereco, responsavel } = req.body;

        try {
            const resultado = await this.pacientesService.adicionarPaciente(paciente, endereco, responsavel);
            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao adicionar o Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterPacientes(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const paciente = await this.pacientesService.obterPacientes();
            return res.status(200).json(paciente);
        } catch (error) {
            console.log('Erro ao obter os Pacientes:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterDadosCompletosDoPaciente(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { prontuario } = req.params;
        try {
            const paciente = await this.pacientesService.obterDadosCompletosDoPaciente(prontuario);
            return res.status(200).json(paciente);
        } catch (error) {
            console.log('Erro ao obter o Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    
}

module.exports = PacientesController;
