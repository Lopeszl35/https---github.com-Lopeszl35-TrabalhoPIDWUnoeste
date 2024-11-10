const AbstractProfissionalUsuarioRepository = require("./abstratos/AbstractProfissionalUsuarioRepository");

class ProfissionalUsuarioRepository extends AbstractProfissionalUsuarioRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    async adicionarProfissional(profissional, connection) {
        console.log("profissional no repository: ", profissional);
        const sql = `
            INSERT INTO Profissionais
            (Nome_Completo, CPF, RG, Data_Nascimento, registroProfissional, Telefone, Email, Especialidade)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            profissional.Nome_Completo,
            profissional.CPF,
            profissional.RG,
            profissional.Data_Nascimento,
            profissional.registroProfissional,
            profissional.Telefone,
            profissional.Email,
            profissional.Especialidade
        ];

        try {
            const [resultado] = await connection.query(sql, params);
            return resultado.insertId;
        } catch (error) {
            console.error("Erro ao adicionar profissional no repository:", error);
            throw error;
        }
    }

    async adicionarUsuarioProfissional(usuario, connection) {
        const sql = `
            INSERT INTO Usuarios
            (Email, Senha, Tipo_Permissao)
            VALUES (?, ?, ?)
        `;
        const params = [
            usuario.Email,
            usuario.Senha,
            usuario.Tipo_Permissao
        ]; 

        try {
            const [resultado] = await connection.query(sql, params);
            return resultado.insertId;
        } catch (error) {
            console.error("Erro ao adicionar usuario no repository:", error);
            throw error;
        }
    }
}

module.exports = ProfissionalUsuarioRepository;