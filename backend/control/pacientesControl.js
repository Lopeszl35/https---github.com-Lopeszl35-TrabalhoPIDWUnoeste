const { validationResult } = require('express-validator');
const AbstractPacientesControl = require('./abstratos/AbstractPacientesControl');

class PacientesControl extends AbstractPacientesControl {
    constructor(pacientesModel, responsaveisModel, enderecosModel, transactionUtil) {
        super();
        this.pacientesModel = pacientesModel;
        this.responsaveisModel = responsaveisModel;
        this.enderecosModel = enderecosModel;
        this.transactionUtil = transactionUtil; // Utilitário para gerenciar transações
    }

    async adicionarPaciente(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { paciente, endereco, responsavel } = req.body;

        try {
            // Usa o utilitário de transação
            const result = await this.transactionUtil.executeTransaction(async (connection) => {
                // Adiciona o paciente e retorna o prontuário
                const prontuario = await this.pacientesModel.adicionarPaciente(paciente, connection);

                // Adiciona o endereço associado ao prontuário do paciente
                endereco.Prontuario = prontuario;
                await this.enderecosModel.adicionarEndereco(endereco, connection);

                // Adiciona o responsável associado ao prontuário do paciente
                responsavel.Prontuario = prontuario;
                await this.responsaveisModel.adicionarResponsavel(responsavel, connection);

                return { message: 'Paciente adicionado com sucesso!' };
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Erro ao adicionar o Paciente:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async atualizarPaciente(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { prontuario } = req.params;
        const { paciente, endereco, responsavel } = req.body;

        try {
            // Usa o utilitário de transação
            const result = await this.transactionUtil.executeTransaction(async (connection) => {
                // Atualiza as informações do paciente
                paciente.Prontuario = prontuario;
                await this.pacientesModel.atualizarPaciente(paciente, connection);

                // Atualiza as informações do endereço associado ao prontuário
                endereco.Prontuario = prontuario;
                await this.enderecosModel.atualizarEndereco(endereco, connection);

                // Atualiza as informações do responsável associado ao prontuário
                responsavel.Prontuario = prontuario;
                await this.responsaveisModel.atualizarResponsavel(responsavel, connection);

                return { message: 'Paciente atualizado com sucesso!' };
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Erro ao atualizar o Paciente:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async deletarPaciente(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { prontuario } = req.params;

        try {
            const result = await this.transactionUtil.executeTransaction(async (connection) => {
                await this.pacientesModel.deletarPaciente(prontuario, connection);
                return { message: 'Paciente excluído com sucesso!' };
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Erro ao excluir o Paciente:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async obterPacientes(req, res) {
        try {
            const pacientes = await this.pacientesModel.obterPacientes();
            res.status(200).json(pacientes);
        } catch (error) {
            console.error('Erro ao obter os Pacientes:', error);
            res.status(500).json({ message: error.message });
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
            res.status(200).json(paciente);
        } catch (error) {
            console.error('Erro ao obter o Paciente:', error);
            res.status(500).json({ message: error.message });
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
            res.status(200).json(paciente);
        } catch (error) {
            console.error('Erro ao buscar o Paciente:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async salvarEvolucao(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { evolucao } = req.body;

            const result = await this.transactionUtil.executeTransaction(async (connection) => {
                return await this.pacientesModel.salvarEvolucao(evolucao, connection);
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Erro ao salvar a evolução do Paciente:', error);
            res.status(500).json({ message: error.message });
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
            res.status(200).json(evolucoes);
        } catch (error) {
            console.error('Erro ao obter as evoluções do Paciente:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PacientesControl;
