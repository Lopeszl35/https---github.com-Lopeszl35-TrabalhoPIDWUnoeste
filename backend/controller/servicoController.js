const { validationResult } = require('express-validator');
const ServicosModel = require('../model/Entities/servicosModel/servicosModel');
const DataBase = require('../model/database');
const ProfissionaisServicos = require('../model/Entities/profissionaisServicosModel/profissionaisServicosModel');
const ProfissionaisModel = require('../model/Entities/profissionaisModel/ProfissionaisModel');
const AbstractServicoController = require('./abstratos/AbstractServicoController');

const profissionalModel = new ProfissionaisModel();
const servicoModel = new ServicosModel();
const profissionaisServicosModel = new ProfissionaisServicos();
const dataBase = new DataBase();

class ServicoController extends AbstractServicoController {
    constructor(servicoService) {
        super();
        this.servicoService = servicoService;
    }
    async obterServicos(req, res) {
        try {
            const servicos = await this.servicoService.obterServicos();
            return res.status(200).json(servicos);
        } catch (error) {
            console.log('Erro ao obter os Serviços:', error);
            return res.status(500).json({ message: error.message });
        }
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
    
        const { Nome_Servico, Descricao, Data_De_Cadastro, Status } = req.body;
        let connection;
        try {
            connection = await dataBase.beginTransaction();
    
            const servico = new ServicosModel(Nome_Servico, Descricao, Data_De_Cadastro, Status);
            const servicoAdicionado = await servicoModel.adicionar(servico, connection);

            if (servicoAdicionado === false) {
                await dataBase.rollbackTransaction(connection);
                console.error("Serviço ja existe");
                return res.status(400).json({ message: "Serviço ja existe" });
            } else {
                await dataBase.commitTransaction(connection);
                return res.status(201).json({ message: "Serviço adicionado com sucesso!" });
            }
    
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
    
        const { Nome_Servico, Descricao, Data_De_Cadastro, Status } = req.body;
    
        let connection;
        try {
            connection = await dataBase.beginTransaction();
    
            const servico = new ServicosModel(Nome_Servico, Descricao, Data_De_Cadastro, Status);
            
            // Atualiza o serviço
            const result = await servicoModel.atualizar(id, servico, connection);
            
            // Validação com base no número de linhas afetadas
            if (result.changedRows === 0) {
                throw new Error('Nenhum dado foi alterado para este serviço.');
            }
    
            await dataBase.commitTransaction(connection);
            const servicoFinal = await servicoModel.obterPorId(id);
            return res.status(200).json(servicoFinal);
    
        } catch (error) {
            console.log(error);
            if (connection) await dataBase.rollbackTransaction(connection);
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
        let connection;
        try {
            connection = await dataBase.beginTransaction();

            const excluirRelacao = await profissionaisServicosModel.excluir(id, connection);
            const excluirServico = await servicoModel.deletar(id, connection);

            if(excluirRelacao.affectedRows === 0) {
                throw new Error('Erro ao excluir o Serviço.');
            }

            if(excluirServico.affectedRows === 0) {
                throw new Error('Erro ao excluir o Serviço.');
            }

            await dataBase.commitTransaction(connection);
            return res.status(200).json({ message: "Serviço excluído com sucesso!" });
        } catch (error) {
            console.log('Erro ao excluir o serviço:', error);
            await dataBase.rollbackTransaction(connection);
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
