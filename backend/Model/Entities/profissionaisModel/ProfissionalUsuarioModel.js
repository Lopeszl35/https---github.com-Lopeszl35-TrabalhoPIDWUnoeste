const AbstractrProfissionalUsuarioModel = require("../../abstratos/AbstractProfissionalUsuarioModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErroSqlHandler = require("../../../utils/ErroSqlHandler");

class ProfissionalUsuarioModel extends AbstractrProfissionalUsuarioModel {
    constructor(profissionalUsuarioRepository, database) {
        super();
        this.profissionalUsuarioRepository = profissionalUsuarioRepository;
    }

    async adicionarProfissionalComUsuario(profissional, usuario, connection) {
        try {

            const profissionalAdicionado = await this.profissionalUsuarioRepository.adicionarProfissional(profissional, connection);
            if(!profissionalAdicionado) {
                throw new Error("Erro ao adicionar profissional");
            }

            usuario.Tipo_Permissao = "profissionalSaude";
            const salt = await bycrypt.genSalt(10);
            const senhaHash = await bycrypt.hash(usuario.Senha, salt);
            usuario.Senha = senhaHash;
            const usuarioAdicionado = await this.profissionalUsuarioRepository.adicionarUsuarioProfissional(usuario, connection);
            if(!usuarioAdicionado) {
                throw new Error("Erro ao adicionar usuario na chamada ao repository");
            }

            return {
                message: 'Profissional e usuário adicionados com sucesso',
                profissionalId: profissionalAdicionado,
                usuarioId: usuarioAdicionado
            };
    
        } catch (error) {
            ErroSqlHandler.tratarErroSql(error, "profissional");
        }
    }

    async deletarProfissionalUsuario(id, connection) {
        try {

            const profissionalDeletado = await this.profissionalUsuarioRepository.deletarProfissional(id, connection);
            if(!profissionalDeletado.affectedRows) {
                throw new Error("Erro ao deletar profissional");
            }
            const emailUsuario = profissionalDeletado.email;
            const usuarioDeletado = await this.profissionalUsuarioRepository.deletarProfissionalUsuario(emailUsuario, connection);
            if(!usuarioDeletado) {
                throw new Error("Erro ao deletar usuario");
            }

            return {message: "Profissional e usuario deletados com sucesso"}

        } catch (error) {
            console.error("Erro ao deletar o Profissional:", error);
            throw error;
        }
    }
    
}

module.exports = ProfissionalUsuarioModel;