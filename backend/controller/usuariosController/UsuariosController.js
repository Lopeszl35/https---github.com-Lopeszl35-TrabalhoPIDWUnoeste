const AbstractUsuariosController = require("../abstratos/AbstractUsuariosController");
const { validationResult } = require('express-validator');

class UsuariosController extends AbstractUsuariosController {
    constructor(UsuariosService) {
        super();
        this.UsuariosService = UsuariosService;
    }

    async adicionarUsuario(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, senha, tipoPermissao } = req.body;
            const result = await this.UsuariosService.adicionarUsuario(email, senha, tipoPermissao);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, senha } = req.body;
            const result = await this.UsuariosService.login(email, senha);
            return res.status(200).json(result);
        } catch (error) {
            const statusCode = error.message.includes("já está cadastrado") ? 409 : 500;
            return res.status(statusCode).json({ message: error.message });
        }
    }

}

module.exports = UsuariosController;
