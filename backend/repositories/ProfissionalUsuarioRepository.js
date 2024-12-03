const AbstractProfissionalUsuarioRepository = require("./abstratos/AbstractProfissionalUsuarioRepository");

class ProfissionalUsuarioRepository extends AbstractProfissionalUsuarioRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    async adicionarProfissional(profissional, connection) {
        const sql = `
            INSERT INTO Profissionais
            (Nome_Completo, CPF, RG, Data_Nascimento, registroProfissional, Telefone, Email)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            profissional.Nome_Completo,
            profissional.CPF,
            profissional.RG,
            profissional.Data_Nascimento,
            profissional.registroProfissional,
            profissional.Telefone,
            profissional.Email
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
            INSERT INTO usuarios
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
            console.log("Erro ao adicionar usuario no repository:", error);
            throw error;
        }
    }

    async deletarProfissional(id, connection) {
        const sqlSelect = `
            SELECT Email FROM Profissionais
            WHERE ID_Profissional = ?
        `;
        const sqlDelete = `
            DELETE FROM Profissionais
            WHERE ID_Profissional = ?
        `;
        
        try {
            // Primeiro, busca o email do profissional
            const [result] = await connection.query(sqlSelect, [id]);
            const email = result[0]?.Email; // Verifica se o email existe
    
            // Em seguida, deleta o profissional
            const [deleteResult] = await connection.query(sqlDelete, [id]);
    
            return {
                affectedRows: deleteResult.affectedRows,
                email: email || null, // Retorna o email ou null se não encontrado
            };
        } catch (error) {
            console.error("Erro ao deletar profissional no repository:", error);
            throw error;
        }
    }
    

    async deletarProfissionalUsuario(email, connection) {
        const sql = `
            DELETE FROM Usuarios
            WHERE Email = ?
        `;
        
        try {
            const [resultado] = await connection.query(sql, [email]);
            return resultado.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao deletar usuario no repository:", error);
            throw error;
        }
    }
}

module.exports = ProfissionalUsuarioRepository;