const { validationResult } = require('express-validator');
const ServicosModel = require('../model/Entities/servicosModel');
const DataBase = require('../model/database');
const ProfissionaisServicos = require('../model/Entities/profissionaisServicosModel/profissionaisServicosModel');
const ProfissionaisModel = require('../model/Entities/profissionaisModel/ProfissionaisModel');

const profissionalModel = new ProfissionaisModel();
const servicoModel = new ServicosModel();
const profissionaisServicosModel = new ProfissionaisServicos();
const dataBase = new DataBase();

class ServicoController {
    async obterTodos(req, res) {
        console.log('Obtendo todos os Serviços...');
        const servicos = await servicoModel.obterTodos();
        return res.status(200).json(servicos);
    }

    async obterPorId(req, res) {
        console.log('Obtendo o Serviço por ID...');
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const servico = await servicoModel.obterPorId(id);
            return res.status(200).json(servico);
        } catch (error) {
            console.log('Erro ao obter o serviço:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async adicionar(req, res) {
        console.log('Adicionando o Serviço...');
        const errors = validationResult(req);
        console.log(JSON.stringify(req.body));
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Nome_Servico, Descricao, Data_De_Cadastro, Status, Profissional_Responsavel } = req.body;
        let connection;
        try {
            connection = await dataBase.beginTransaction();

            const servico = new ServicosModel(Nome_Servico, Descricao, Data_De_Cadastro, Status);
            const servicoId = await servicoModel.adicionar(servico, connection);

            const profissionalId = await profissionalModel.obterIdProfissionalPorNome(Profissional_Responsavel);
            if (!profissionalId) {
                throw new Error(`Profissional com nome ${Profissional_Responsavel} não encontrado`);
            }

            await profissionaisServicosModel.inserir(profissionalId, servicoId, connection);

            await dataBase.commitTransaction(connection);
            return res.status(201).json({ message: "Serviço adicionado com sucesso!" });
        } catch (error) {
            console.log(error);
            await dataBase.rollbackTransaction(connection);
            return res.status(500).json({ message: error.message });
        }
    }

    async atualizar(req, res) {
        console.log('Atualizando o Serviço...');
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { Nome_Servico, Descricao, Data_De_Cadastro, Status, Profissional_Responsavel } = req.body;
    
        let connection;
        try {
            connection = await dataBase.beginTransaction();
    
            // Obter ID do profissional pelo nome
            const profissionalId = await profissionalModel.obterIdProfissionalPorNome(Profissional_Responsavel);
            if (!profissionalId) {
                throw new Error(`Profissional com nome ${Profissional_Responsavel} não encontrado ou múltiplos resultados.`);
            }
    
            const servico = new ServicosModel(Nome_Servico, Descricao, Data_De_Cadastro, Status);
            await servicoModel.atualizar(id, servico);
    
            // Atualizar a relação entre o serviço e o profissional
            await profissionaisServicosModel.atualizar(profissionalId, id, connection);
    
            await dataBase.commitTransaction(connection);
            const servicoAtualizado = await servicoModel.obterPorId(id);
            return res.status(200).json(servicoAtualizado);
        } catch (error) {
            console.log(error);
            await dataBase.rollbackTransaction(connection);
            return res.status(500).json({ message: error.message });
        }
    }
    
    async deletar(req, res) {
        console.log('Deletando o Serviço...');
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await servicoModel.deletar(id);
            return res.status(200).json({ message: "Serviço excluído com sucesso!" });
        } catch (error) {
            console.log('Erro ao excluir o serviço:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async filtrar(req, res) {
        console.log("Filtrando os Serviços...");
        const { filtro, valor } = req.query;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let result;

            if (filtro === 'nome') {
                result = await servicoModel.filtrarPorNome(valor);
            } else if (filtro === 'profissional') {
                result = await servicoModel.filtrarPorProfissional(valor);
            } else if (filtro === 'status') {
                result = await servicoModel.filtrarPorStatus(valor);
            } else {
                return res.status(400).json({ message: "Filtro inválido." });
            }

            return res.status(200).json(result);
        } catch (error) {
            console.log('Erro ao filtrar os serviços:', error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ServicoController;
