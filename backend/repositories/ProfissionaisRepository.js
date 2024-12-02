    const AbstractProfissionaisRepository = require('./abstratos/AbstractProfissionaisRepository');

    class ProfissionaisRepository extends AbstractProfissionaisRepository {
        constructor(database) {
            super();
            this.database = database;
        }

        async obterProfissionais() {
            const sql = `SELECT * FROM Profissionais`;;
            try {
                const profissionais = await this.database.executaComando(sql);
                return profissionais;
            } catch (error) {
                throw error;
            }
        }

        async obterPorId(id) {
            const sql = `SELECT * FROM Profissionais WHERE ID_Profissional = ?`;
            try {
                const profissional = await this.database.executaComando(sql, [id]);
                return profissional[0];
            } catch (error) {
                throw error;
            }
        }

        async editarProfissional(id, profissional, connection) {
            const campos = Object.keys(profissional);
            const params = Object.values(profissional);
    
            if (campos.length === 0) {
                return { message: "Nenhuma alteração necessária" };
            }
    
            const setClause = campos.map(campo => `${campo} = ?`).join(", ");
            const sql = `UPDATE Profissionais SET ${setClause} WHERE ID_Profissional = ?`;
            params.push(id);
    
            try {
                const [resultado] = await connection.query(sql, params);
                return { message: "Profissional atualizado com sucesso", rowsAffected: resultado.affectedRows };
            } catch (error) {
                console.error("Erro ao editar o profissional no repositório:", error);
                throw error;
            }
        }
    
        async cadastrarHorarios(id, data, horaInicio, horaFim, connection) {
            const sql = `INSERT INTO HorariosDisponiveis (ID_Profissional, Data, HorarioInicio, HorarioTermino) VALUES (?, ?, ?, ?)`;
            const params = [id, data, horaInicio, horaFim];
    
            try {
                await connection.query(sql, params);
                return { message: "Horários cadastrados com sucesso" };
            } catch (error) {
                console.error("Erro ao cadastrar horários no repositório:", error);
                throw error;
            }
        }

        async obterHorariosProfissional(id) {
            const sql = `
                SELECT * FROM HorariosDisponiveis
                WHERE ID_Profissional = ?
            `;
            try {
                const horarios = await this.database.executaComando(sql, [id]);
                return horarios;
            } catch (error) {
                console.error("Erro ao obter os horários do Profissional:", error);
                throw error;
            }
        }

    }

    module.exports = ProfissionaisRepository