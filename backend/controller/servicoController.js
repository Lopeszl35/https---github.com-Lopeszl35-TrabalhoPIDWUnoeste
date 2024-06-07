const { validationResult } = require('express-validator');
const ServicosModel = require('../model/Entities/servicosModel');
const servicoModel = new ServicosModel();

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

    async obterNomeProfissionalPorId(req, res) {
        console.log('Obtendo o nome do profissional por ID...');
        const { id } = req.params;
        try {
            const nomeProfissional = await servicoModel.obterNomeProfissionalPorId(id);
            if (!nomeProfissional) {
                return res.status(404).json({ message: 'Profissional não encontrado' });
            }
            return res.status(200).json({ nomeProfissional });
        } catch (error) {
            console.log('Erro ao obter o nome do profissional:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async adicionar(req, res) {
        console.log('Adicionando o Serviço...');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Nome_Servico, Descricao, Data_De_Cadastro, Status, Profissional_Responsavel } = req.body;

        try {
            const profissionalId = await servicoModel.obterIdProfissionalPorNome(Profissional_Responsavel);
            if (!profissionalId) {
                return res.status(400).json({ message: "Profissional não encontrado ou nome incompleto." });
            }
            const servico = new ServicosModel(Nome_Servico, Descricao, Data_De_Cadastro, Status, profissionalId);
            await servicoModel.adicionar(servico);
            return res.status(201).json({ message: "Serviço adicionado com sucesso!" });
        } catch (error) {
            console.log(error);
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
    
        try {
            const profissionalId = await servicoModel.obterIdProfissionalPorNome(Profissional_Responsavel);
            if (!profissionalId) {
                return res.status(400).json({ message: "Profissional não encontrado ou nome incompleto." });
            }
            const servico = new ServicosModel(Nome_Servico, Descricao, Data_De_Cadastro, Status, profissionalId);
            await servicoModel.atualizar(id, servico);
            const servicoAtualizado = await servicoModel.obterPorId(id);
            return res.status(200).json(servicoAtualizado);
        } catch (error) {
            console.log(error);
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
