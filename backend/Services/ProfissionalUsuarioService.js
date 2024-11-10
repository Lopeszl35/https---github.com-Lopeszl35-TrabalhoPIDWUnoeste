const AbstractrProfissionalUsuarioService = require("./abstratos/AbstractProfissionalUsuarioService");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErroSqlHandler = require("../utils/ErroSqlHandler");

class ProfissionalUsuarioService extends AbstractrProfissionalUsuarioService {
    constructor(profissionalUsuarioRepository, database) {
        super();
        this.profissionalUsuarioRepository = profissionalUsuarioRepository;
        this.database = database;
    }

    async adicionarProfissionalComUsuario(profissional, usuario) {
        let connection;
        try {
            connection = await this.database.beginTransaction();

            const profissionalAdicionado = await this.profissionalUsuarioRepository.adicionarProfissional(profissional, connection);
            if(!profissionalAdicionado) {
                throw new Error("Erro ao adicionar profissional na chamada ao repository");
            }

            usuario.Tipo_Permissao = "profissionalSaude";
            const salt = await bycrypt.genSalt(10);
            const senhaHash = await bycrypt.hash(usuario.Senha, salt);
            usuario.Senha = senhaHash;
            const usuarioAdicionado = await this.profissionalUsuarioRepository.adicionarUsuarioProfissional(usuario, connection);
            if(!usuarioAdicionado) {
                throw new Error("Erro ao adicionar usuario na chamada ao repository");
            }

            await this.database.commitTransaction(connection);
            return {
                message: 'Profissional e usuário adicionados com sucesso',
                profissionalId: profissionalAdicionado,
                usuarioId: usuarioAdicionado
            };
    
        } catch (error) {
            if(connection) {
                await this.database.rollbackTransaction(connection);
            }
            ErroSqlHandler.tratarErroSql(error, "profissional");
        }
    }
}

module.exports = ProfissionalUsuarioService