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

    async editarProfissional(id, profissional) {
        // Obter as chaves do objeto `profissional` para construir a query
        const campos = Object.keys(profissional);
        const params = Object.values(profissional);
        
    
        // Se não houver campos no objeto `profissional`, retornar sem realizar atualização
        if (campos.length === 0) {
            return { message: "Nenhuma alteração necessária" };
        }
    
        // Construir a query dinamicamente com base nos campos presentes
        const setClause = campos.map(campo => `${campo} = ?`).join(", ");
        console.log("setClause", setClause);
        const sql = `UPDATE Profissionais SET ${setClause} WHERE ID_Profissional = ?`;
        
        // Adicionar o `id` ao final dos parâmetros para a cláusula WHERE
        params.push(id);
    
        try {
            await this.database.executaComandoNonQuery(sql, params);
            return { message: "Profissional atualizado com sucesso" };
        } catch (error) {
            throw error;
        }
    }

    async cadastrarHorarios(id, data, horaInicio, horaFim) {
        const sql = `INSERT INTO HorariosDisponiveis (ID_Profissional, Data, HorarioInicio, HorarioTermino) VALUES (?, ?, ?, ?)`;
        const params = [id, data, horaInicio, horaFim];
        console.log("Params:", params);
        try {
            await this.database.executaComandoNonQuery(sql, params);
            return { message: "Horarios cadastrados com sucesso" };
        } catch (error) {
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