const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsuariosModel = require('../../model/Entities/usuariosModel/UsuariosModel');
const { validationResult } = require('express-validator');

const usuarioModel = new UsuariosModel();

class AuthController {
    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, senha } = req.body;

        try {
            // Usuário fake
            const usuarioFake = {
                ID_Usuario: 1,
                Email: 'teste@exemplo.com',
                Senha: await bcrypt.hash('senha123', 10), // Senha encriptada
                Tipo_Permissao: 'profissionalSaude'
            };

            // Verifique se o email corresponde ao usuário fake
            if (email !== usuarioFake.Email) {
                return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
            }

            // Verifique a senha
            const senhaValida = await bcrypt.compare(senha, usuarioFake.Senha);
            if (!senhaValida) {
                return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
            }

            // Gera o token JWT
            const token = jwt.sign({ id: usuarioFake.ID_Usuario, tipoPermissao: usuarioFake.Tipo_Permissao }, 'seu_segredo', {
                expiresIn: '1h', // Define o tempo de expiração do token
            });

            // Retorne o token JWT ao cliente
            res.status(200).json({
                message: 'Login realizado com sucesso!',
                token: token,
            });
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            res.status(500).json({ message: 'Erro ao fazer login' });
        }
    }
}


module.exports = AuthController;
