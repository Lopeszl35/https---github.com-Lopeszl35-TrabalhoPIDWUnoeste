const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

class DataBase {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: process.env.USUARIO_BD,
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

    async beginTransaction() {
        const connection = await this.pool.getConnection();
        await connection.beginTransaction();
        return connection;
    }

    async commitTransaction(connection) {
        try {
            await connection.commit();
        } catch (error) {
            console.error('Erro ao cometer transação:', error);
            throw new Error('Erro ao cometer transação');
        } finally {
            connection.release();
        }
    }

    async rollbackTransaction(connection) {
        if (connection) {
            try {
                await connection.rollback();
            } catch (error) {
                console.error('Erro ao reverter transação:', error);
                throw new Error('Erro ao reverter transação');
            } finally {
                connection.release();
            }
        }
    }
}

module.exports = DataBase;