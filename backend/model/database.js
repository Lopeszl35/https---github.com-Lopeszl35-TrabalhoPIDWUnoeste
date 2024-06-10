const mysql = require('mysql2/promise');

class DataBase {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'careconnectdb'
        });
    }

    async executaComando(sql, params = []) {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.query(sql, params);
            return rows;
        } catch (error) {
            console.error(`Erro ao executar comando SQL: ${sql}`, error);
            throw new Error('Erro ao executar comando SQL');
        } finally {
            connection.release();
        }
    }

    async executaComandoNonQuery(sql, params = []) {
        const connection = await this.pool.getConnection();
        try {
            const [results] = await connection.query(sql, params);
            return results.affectedRows; 
        } catch (error) {
            console.error(`Erro ao executar comando non-query SQL: ${sql}`, error);
            throw new Error('Erro ao executar comando non-query SQL');
        } finally {
            connection.release();
        }
    }
}

module.exports = DataBase;
