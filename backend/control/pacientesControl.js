const { validationResult } = require('express-validator');
const AbstractPacientesControl = require('./abstratos/AbstractPacientesControl');


class PacientesControl extends AbstractPacientesControl {
    constructor(pacientesModel, database) {
        super();
        this.pacientesModel = pacientesModel;
        this.database = database;
    }

    async adicionarPaciente(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { paciente, endereco, responsavel } = req.body;

        try {

            let connection = await this.database.beginTransaction();
            const resultado = await this.pacientesModel.adicionarPaciente(paciente, endereco, responsavel, connection);
            await this.database.commitTransaction(connection);
            return res.status(200).json(resultado);

        } catch (error) {
            if(connection) {
                await this.database.rollbackTransaction(connection);
            }
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
            const resultado = await this.pacientesModel.atualizarPaciente(paciente, endereco, responsavel);
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
            const resultado = await this.pacientesModel.deletarPaciente(prontuario);
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
            const paciente = await this.pacientesModel.obterPacientes();
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
            const paciente = await this.pacientesModel.obterDadosCompletosDoPaciente(prontuario);
            return res.status(200).json(paciente);
        } catch (error) {
            console.log('Erro ao obter o Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async buscarPaciente(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { searchTerm, searchType } = req.query;
        try {
            const paciente = await this.pacientesModel.buscarPaciente(searchTerm, searchType);
            return res.status(200).json(paciente);
        } catch (error) {
            console.log('Erro ao buscar o Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async salvarEvolucao(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { evolucao } = req.body;
            const resultado = await this.pacientesModel.salvarEvolucao(evolucao);
            return res.status(200).json(resultado);
        } catch (error) {
            console.log('Erro ao salvar a evolução do Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }    

    async obterEvolucoesDoPaciente(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { prontuario } = req.params;
        try {
            const evolucoes = await this.pacientesModel.obterEvolucoesDoPaciente(prontuario);
            return res.status(200).json(evolucoes);
        } catch (error) {
            console.log('Erro ao obter as evoluções do Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PacientesControl;
