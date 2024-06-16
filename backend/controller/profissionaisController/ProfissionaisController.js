const ProfissionaisModel = require('../../model/Entities/profissionaisModel/ProfissionaisModel');
const UsuariosModel = require('../../model/Entities/usuariosModel/UsuariosModel');
const { validationResult } = require('express-validator');
const DataBase = require('../../model/database');

const profissionalModel = new ProfissionaisModel();
const usuarioModel = new UsuariosModel();
const dataBase = new DataBase();

class ProfissionaisController {

    async obterTodos(req, res) {
        console.log('Obtendo todos os Profissionais...');
        try {
            const profissionais = await profissionalModel.obterTodos();
            if (!profissionais) {
                return res.status(404).json({ message: 'Profissionais não encontrados' });
            }
            return res.status(200).json(profissionais);
        } catch (error) {
            console.log('Erro ao obter os Profissionais:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async filtrarPorEspecialidade(req, res) {
        const { especialidade } = req.params;
        try {
            const profissionais = await profissionalModel.filtrarPorEspecialidade(especialidade);
            if (!profissionais) {
                return res.status(404).json({ message: `Profissionais da especialidade ${especialidade} não encontrados` });
            }
            return res.status(200).json(profissionais);
        } catch (error) {
            console.log('Erro ao filtrar os Profissionais por especialidade:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async adicionar(req, res) {
        console.log('Adicionando Profissional...');
        console.log(req.body);
        console.log(JSON.stringify(req.body));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nomeCompleto, dataNasc, cpf, rg, email, telefone, especialidade, registroProfissional, senha } = req.body;
        let connection;
        try {
            connection = await dataBase.beginTransaction();

            const profissional = new ProfissionaisModel(nomeCompleto, cpf, rg, dataNasc, telefone, email, especialidade, registroProfissional);
            const profissionalId = await profissionalModel.adicionar(profissional, connection);

            const usuario = new UsuariosModel(profissionalId, email, senha, 'profissionalSaude');
            await usuarioModel.adicionar(usuario, connection);

            await dataBase.commitTransaction(connection);
            return res.status(201).json({ message: 'Profissional adicionado com sucesso!' });
        } catch (error) {
            if (connection) {
                await dataBase.rollbackTransaction(connection);
            }
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

    async excluirUsuario(req, res) {
        const { id } = req.params;
        let connection;
        try {
            connection = await dataBase.beginTransaction();
            const profissional = await profissionalModel.obterPorId(id);
            const usuario = await usuarioModel.obterPorIdProfissional(id);
            if (!profissional || !usuario) {
                return res.status(404).json({ message: `Profissional ou Usuario não encontrado
                    Profissional: ${profissional} | Usuario: ${usuario}` });
            }
            await usuarioModel.excluirUsuarioPeloProfissional(id, connection);
            await profissionalModel.excluirProfissional(id, connection);
            await dataBase.commitTransaction(connection);
            return res.status(200).json({ message: 'Profissional excluído com sucesso!' });
        } catch (error) {
            if (connection) {
                await dataBase.rollbackTransaction(connection);
            }
            console.error('Erro ao excluir o profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterPorId(req, res) {
        const { id } = req.params;
        try {
            const profissional = await profissionalModel.obterPorId(id);
            if (!profissional) {
                return res.status(404).json({ message: `Profissional não encontrado` });
            }
            return res.status(200).json(profissional);
        } catch (error) {
            console.error('Erro ao obter o profissional:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProfissionaisController;
