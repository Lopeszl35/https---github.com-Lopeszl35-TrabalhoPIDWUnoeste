const AbstractProfissionaisController = require('../abstratos/AbstractProfissionaisController');
const { validationResult } = require('express-validator');

class ProfissionaisController extends AbstractProfissionaisController {
    constructor(profissionaisService, profissionalUsuarioService) {
        super();
        this.profissionaisService = profissionaisService;
        this.profissionalUsuarioService = profissionalUsuarioService;
    }

    async obterProfissionais(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const profissionais = await this.profissionaisService.obterProfissionais();
            return res.status(200).json(profissionais);
        } catch (error) {
            console.error('Erro ao obter os Profissionais:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterProfissionalPorId(req, res) {
        const { id } = req.params;
        try {
            const profissional = await this.profissionaisService.obterPorId(id);
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
            console.error('Erro ao adicionar profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async editarProfissional(req, res) {
        const { id } = req.params;
        const { Nome_Completo, Email, Telefone, registroProfissional } = req.body;
        let connection;
        try {
            connection = await dataBase.beginTransaction();
            const profissional = await profissionalModel.obterPorId(id);
            const usuario = await usuarioModel.obterPorIdProfissional(id);
            if (!profissional || !usuario) {
                return res.status(404).json({ message: `Profissional ou Usuario não encontrado
                    Profissional: ${profissional} | Usuario: ${usuario}` });
            } else {
                const novoProfissional = { ...profissional, Nome_Completo, Email, Telefone, registroProfissional };
                await profissionalModel.editarProfissional(novoProfissional, id, connection);

                const novoUsuario = { ...usuario, Email };
                await usuarioModel.editarUsuarioPeloProfissional(novoUsuario, connection);

                await dataBase.commitTransaction(connection);
                return res.status(200).json({ message: 'Profissional editado com sucesso!' });
            }
        } catch (error) {
            if (connection) {
                await dataBase.rollbackTransaction(connection);
            }
            console.error('Erro ao editar o profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterNomeProfissionalPorId(req, res) {
        console.log('Obtendo o nome do profissional por ID...');
        const { id } = req.params;
        try {
            const nomeProfissional = await profissionalModel.obterNomeProfissionalPorId(id);
            if (!nomeProfissional) {
                return res.status(404).json({ message: 'Profissional não encontrado' });
            }
            return res.status(200).json({ nomeProfissional });
        } catch (error) {
            console.log('Erro ao obter o nome do profissional:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    /*
    async profissionalDoServico(req, res) {
        const { servico } = req.params;
        try {
            const profissionais = await this.profissionaisService.profissionalDoServico(servico);
            return res.status(200).json(profissionais);
        } catch (error) {
            console.log('Erro ao obter os Profissionais:', error);
            return res.status(500).json({ message: error.message });
        }
    }*/


}

module.exports = ProfissionaisController;
