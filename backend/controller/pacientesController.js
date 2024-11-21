const { validationResult } = require('express-validator');
const AbstractPacientesController = require('./abstratos/AbstractPacientesController');


class PacientesController extends AbstractPacientesController {
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

    async atualizarPaciente(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { prontuario } = req.params;
            const { paciente, endereco, responsavel } = req.body;
            paciente.Prontuario = prontuario;
            const resultado = await this.pacientesService.atualizarPaciente(paciente, endereco, responsavel);
            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao atualizar o Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async deletarPaciente(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        const { prontuario } = req.params;
        try {
            const resultado = await this.pacientesService.deletarPaciente(prontuario);
            return res.status(200).json({ message: 'Paciente excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao excluir o Paciente:', error);
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
