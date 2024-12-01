const AbstractProfissionaisControl = require('./abstratos/AbstractProfissionaisControl');
const { validationResult } = require('express-validator');

class ProfissionaisControl extends AbstractProfissionaisControl {
    constructor(profissionaisModel, profissionalUsuarioModel, transactionUtil) {
        super();
        this.profissionaisModel = profissionaisModel;
        this.profissionalUsuarioModel = profissionalUsuarioModel;
        this.transactionUtil = transactionUtil;
    }

    async obterProfissionais(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const profissionais = await this.profissionaisModel.obterProfissionais();
            return res.status(200).json(profissionais);
        } catch (error) {
            console.error('Erro ao obter os Profissionais:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterProfissionalPorId(req, res) {
        const { id } = req.params;
        try {
            const profissional = await this.profissionaisModel.obterPorId(id);
            return res.status(200).json(profissional);
        } catch (error) {
            console.error('Erro ao obter o profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    // Adiciona um novo profissional e seu usuário associado dentro de uma transação
    async adicionarProfissional(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { profissional, usuario } = req.body;
        try {
            const resultado = await this.transactionUtil.executeTransaction(async (connection) => {
                return await this.profissionalUsuarioModel.adicionarProfissionalComUsuario(
                    profissional,
                    usuario,
                    connection
                );
            });

            return res.status(201).json(resultado);
        } catch (error) {
            console.error('Erro ao adicionar profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    // Edita os dados de um profissional em uma transação
    async editarProfissional(req, res) {
        const { id } = req.params;
        const { profissional } = req.body;

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const resultado = await this.transactionUtil.executeTransaction(async (connection) => {
                // Edita as informações do profissional dentro de uma transação
                return await this.profissionaisModel.editarProfissional(id, profissional, connection);
            });

            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao editar profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    // Remove um profissional e seu usuário associado dentro de uma transação
    async deletarProfissional(req, res) {
        const { id } = req.params;

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            await this.transactionUtil.executeTransaction(async (connection) => {
                // Exclui o profissional e o usuário associado em uma transação
                await this.profissionalUsuarioModel.deletarProfissionalUsuario(id, connection);
            });

            return res.status(200).json({ message: 'Profissional excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    // Cadastra horários para um profissional
    async cadastrarHorarios(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { data, horaInicio, horaFim } = req.body;

        try {
            const resultado = await this.transactionUtil.executeTransaction(async (connection) => {
                // Cadastra os horários em uma transação
                return await this.profissionaisModel.cadastrarHorarios(id, data, horaInicio, horaFim, connection);
            });

            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao cadastrar horários:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterHorariosProfissional(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;

        try {
            const resultado = await this.profissionaisModel.obterHorariosProfissional(id);
            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao obter horários:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProfissionaisControl;
