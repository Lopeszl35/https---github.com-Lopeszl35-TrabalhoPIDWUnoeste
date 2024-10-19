const DataBase = require("../../database");

const dataBase = new DataBase();

class ProfissionaisServicosModel {
    async inserir(idProfissional, idServico, connection) {
        const [profissional] = await connection.query("SELECT * FROM profissionais WHERE ID_Profissional = ?", [idProfissional]);
        if (profissional.length === 0) {
            throw new Error(`Profissional com ID ${idProfissional} não encontrado`);
        }

        const [servico] = await connection.query("SELECT * FROM servicos WHERE ID_Servico = ?", [idServico]);
        if (servico.length === 0) {
            throw new Error(`Serviço com ID ${idServico} não encontrado`);
        }

        const result = await connection.query("INSERT INTO profissionalservicos (ID_Profissional, ID_Servico) VALUES (?, ?)", [idProfissional, idServico]);
        return result;
    }

    async atualizar(idProfissional, idServico, connection) {
        const [profissional] = await connection.query("SELECT * FROM profissionais WHERE ID_Profissional = ?", [idProfissional]);
        if (profissional.length === 0) {
            throw new Error(`Profissional com ID ${idProfissional} não encontrado`);
        }

        const [servico] = await connection.query("SELECT * FROM servicos WHERE ID_Servico = ?", [idServico]);
        if (servico.length === 0) {
            throw new Error(`Serviço com ID ${idServico} não encontrado`);
        }

        const result = await connection.query(
            "UPDATE profissionalservicos SET ID_Profissional = ? WHERE ID_Servico = ?",
            [idProfissional, idServico]
        );
        return result;
    }

    async excluir(idProfissional, connection) {
        const result = await connection.query(
            "DELETE FROM profissionalservicos WHERE ID_Servico = ?",
            [idProfissional]
        );
        return result;
    }

    async obterTodos() {
        const sql = `
          SELECT p.Nome_Completo AS Nome_Profissional, s.Nome_Servico
          FROM profissionalservicos ps
          JOIN profissionais p ON ps.ID_Profissional = p.ID_Profissional
          JOIN servicos s ON ps.ID_Servico = s.ID_Servico
        `;
        console.log('Executando consulta SQL:', sql);  
        const result = await dataBase.executaComando(sql);
        console.log('Resultado da consulta:', result); 
        return result;
    }

    // Método para obter todos os profissionais responsáveis por um serviço
    async obterProfissionaisPorServico(idServico) {
        const sql = `
            SELECT p.Nome_Completo AS Nome_Profissional, p.Email, p.Telefone
            FROM profissionalservicos ps
            JOIN profissionais p ON ps.ID_Profissional = p.ID_Profissional
            WHERE ps.ID_Servico = ?
        `;
        const result = await dataBase.executaComando(sql, [idServico]);
        return result;
    }

}

module.exports = ProfissionaisServicosModel;
