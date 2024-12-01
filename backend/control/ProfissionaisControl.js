const AbstractProfissionaisControl = require('./abstratos/AbstractProfissionaisControl');
const { validationResult } = require('express-validator');

class ProfissionaisControl extends AbstractProfissionaisControl {
    constructor(profissionaisModel, profissionalUsuarioService, transactionUtil) {
        super();
        this.profissionaisModel = profissionaisModel;
        this.profissionalUsuarioService = profissionalUsuarioService;
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

    async adicionarProfissional(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { profissional, usuario } = req.body;
        try {
            const resultado = await this.profissionalUsuarioService.adicionarProfissionalComUsuario(profissional, usuario);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async editarProfissional(req, res) {
        const { id } = req.params;
        const { profissional } = req.body;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const resultado = await this.profissionaisModel.editarProfissional(id, profissional);
            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao editar profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async deletarProfissional(req, res) {
        const { id } = req.params;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const resultado = await this.profissionalUsuarioService.deletarProfissionalUsuario(id);
            return res.status(200).json({ message: 'Profissional excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async cadastrarHorarios(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { data, horaInicio, horaFim } = req.body;
        try {
            const resultado = await this.profissionaisModel.cadastrarHorarios(id, data, horaInicio, horaFim);
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
