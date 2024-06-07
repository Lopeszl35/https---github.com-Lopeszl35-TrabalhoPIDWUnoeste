const { validationResult } = require('express-validator');
const moment = require('moment');
const DataBase = require("../database");

const dataBase = new DataBase();

class ServicosModel {
    constructor(nomeServico, descricao, dataDeCadastro, status, profissionalResponsavel) {
        this.Nome_Servico = nomeServico;
        this.Descricao = descricao;
        this.Data_De_Cadastro = dataDeCadastro;
        this.Status = status;
        this.Profissional_Responsavel = profissionalResponsavel;
    }

    async obterTodos() {
        const listaServicos = await dataBase.executaComando("SELECT * FROM servicos");
        return listaServicos;
    }

    async obterPorId(id) {
        const result = await dataBase.executaComando("SELECT * FROM servicos WHERE ID_Servico = ?", [id]);
        return result[0];
    }

    async obterIdProfissionalPorNome(nomeProfissional) {
        const result = await dataBase.executaComando("SELECT ID_Profissional FROM profissionais WHERE LOWER(Nome_Completo) = LOWER(?)", [nomeProfissional]);
        if (result.length === 1) {
            return result[0].ID_Profissional;
        }
        return null;
    }

    async obterNomeProfissionalPorId(idProfissional) {
        const result = await dataBase.executaComando("SELECT Nome_Completo FROM profissionais WHERE ID_Profissional = ?", [idProfissional]);
        console.log('Resultado da query obterNomeProfissionalPorId:', result); // Log adicional
        if (result.length === 1) {
            return result[0].Nome_Completo;
        }
        return null;
    }

    async adicionar(dadosServico) {
        dadosServico.Data_De_Cadastro = moment(dadosServico.Data_De_Cadastro).format('YYYY-MM-DD');
        await dataBase.executaComandoNonQuery('INSERT INTO servicos SET ?', dadosServico);
    }

    async atualizar(id, dadosServico) {
        dadosServico.Data_De_Cadastro = moment(dadosServico.Data_De_Cadastro).format('YYYY-MM-DD');
        await dataBase.executaComandoNonQuery('UPDATE servicos SET ? WHERE ID_Servico = ?', [dadosServico, id]);
    }

    async deletar(id) {
        await dataBase.executaComandoNonQuery('DELETE FROM servicos WHERE ID_Servico = ?', [id]);
    }

    async filtrarPorNome(nome) {
        const result = await dataBase.executaComando("SELECT * FROM servicos WHERE LOWER(Nome_Servico) LIKE LOWER(?)", [`%${nome}%`]);
        return result;
    }

    async filtrarPorProfissional(profissional) {
        const result = await dataBase.executaComando(`
            SELECT s.* 
            FROM servicos s
            JOIN profissionais p ON s.Profissional_Responsavel = p.ID_Profissional
            WHERE LOWER(p.Nome_Completo) LIKE LOWER(?)`, [`%${profissional}%`]);
    
        return result;
    }

    async filtrarPorStatus(status) {
        const result = await dataBase.executaComando("SELECT * FROM servicos WHERE LOWER(Status) = LOWER(?)", [status]);
        return result;
    }
}

module.exports = ServicosModel;
