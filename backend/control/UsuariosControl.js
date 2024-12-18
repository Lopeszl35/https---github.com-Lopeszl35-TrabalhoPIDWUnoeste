const AbstractUsuariosControl = require("./abstratos/AbstractUsuariosControl");
const { validationResult } = require('express-validator');

class UsuariosControl extends AbstractUsuariosControl {
    constructor(UsuariosModel, transactionUtil) {
        super();
        this.UsuariosModel = UsuariosModel;
        this.transactionUtil = transactionUtil;
    }

    async adicionarUsuario(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, nome, senha, tipoPermissao } = req.body;
        console.log("req.body: ", req.body);

        try {
            const result = await this.transactionUtil.executeTransaction(async (connection) => {
                return await this.UsuariosModel.adicionarUsuario(
                    email,  
                    senha,
                    nome,
                    tipoPermissao, 
                    connection
                );
            });

            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao adicionar usuário: " + error.message });
        }
    }

    async editarUsuario(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { email, senha, tipoPermissao } = req.body;

        try {
            const result = await this.transactionUtil.executeTransaction(async (connection) => {
                return await this.UsuariosModel.editarUsuario(
                    id, 
                    email, 
                    senha, 
                    tipoPermissao, 
                    connection
                );
            });

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao editar usuário: " + error.message });
        }
    }

    async excluirUsuario(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;

        try {
            const result = await this.transactionUtil.executeTransaction(async (connection) => {
                return await this.UsuariosModel.excluirUsuario(id, connection);
            });

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao excluir usuário: " + error.message });
        }
    }

    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, senha } = req.body;
            const result = await this.UsuariosModel.login(email, senha);
            return res.status(200).json(result);
        } catch (error) {
            const statusCode = error.message.includes("já está cadastrado") ? 409 : 500;
            return res.status(statusCode).json({ message: error.message });
        }
    }

    async obterUsuarios(req, res) {
        try {
            const usuarios = await this.UsuariosModel.obterUsuarios();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao obter usuários: " + error.message });
        }
    }
}

module.exports = UsuariosControl;
