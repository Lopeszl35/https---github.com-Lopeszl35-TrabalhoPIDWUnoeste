const ProfissionaisServicosModel = require('../../model/Entities/profissionaisServicosModel/profissionaisServicosModel');
const DataBase = require('../../model/database');
const { validationResult } = require('express-validator');

const profissionaisServicosModel = new ProfissionaisServicosModel();
const dataBase = new DataBase();

class ProfissionalServicosController {

    async adicionar(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { idProfissional, idServico } = req.body;
        let connection;

        try {
            connection = await dataBase.beginTransaction();

            // Verifica se o profissional já está associado ao serviço
            const [existingAssociation] = await connection.query(
                "SELECT * FROM profissionalservicos WHERE ID_Profissional = ? AND ID_Servico = ?",
                [idProfissional, idServico]
            );

            if (existingAssociation.length > 0) {
                await dataBase.rollbackTransaction(connection);
                return res.status(400).json({ message: 'Profissional já associado a este serviço.' });
            }

            // Adiciona a nova associação entre o profissional e o serviço
            await profissionaisServicosModel.inserir(idProfissional, idServico, connection);

            await dataBase.commitTransaction(connection);
            return res.status(201).json({ message: 'Profissional associado ao serviço com sucesso!' });
        } catch (error) {
            if (connection) {
                await dataBase.rollbackTransaction(connection);
            }
            console.error('Erro ao associar profissional ao serviço:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterTodos(req, res) {
        try {
          const relacoes = await profissionaisServicosModel.obterTodos();
          console.log('Relações encontradas:', relacoes);
          res.status(200).json(relacoes);
        } catch (error) {
          console.error('Erro ao buscar as relações:', error); 
          res.status(500).json({ message: 'Erro ao buscar as relações' });
        }
    }

    async remover(req, res) {
        const { id_profissional, id_servico } = req.params;
        let connection;
    
        try {
            connection = await dataBase.beginTransaction();
    
            // Verifica se a associação entre o profissional e o serviço existe
            const [existingAssociation] = await connection.query(
                "SELECT * FROM profissionalservicos WHERE ID_Profissional = ? AND ID_Servico = ?",
                [id_profissional, id_servico]
            );
    
            if (existingAssociation.length === 0) {
                await dataBase.rollbackTransaction(connection);
                return res.status(404).json({ message: 'Associação entre o profissional e o serviço não encontrada.' });
            }
    
            // Remove a associação
            await connection.query(
                "DELETE FROM profissionalservicos WHERE ID_Profissional = ? AND ID_Servico = ?",
                [id_profissional, id_servico]
            );
    
            await dataBase.commitTransaction(connection);
            return res.status(200).json({ message: 'Associação removida com sucesso' });
    
        } catch (error) {
            if (connection) {
                await dataBase.rollbackTransaction(connection);
            }
            console.error('Erro ao remover a associação entre profissional e serviço:', error.message);
            return res.status(500).json({ message: `Erro ao remover a associação: ${error.message}` });
        }
    }

    async atualizar(req, res) {
        const { id_profissional, id_servico } = req.params;
        const { novoID_Profissional } = req.body;
        let connection;
    
        try {
            connection = await dataBase.beginTransaction();
    
            // Verifica se o profissional existe
            const [profissional] = await connection.query("SELECT * FROM profissionais WHERE ID_Profissional = ?", [id_profissional]);
    
            if (profissional.length === 0) {
                await dataBase.rollbackTransaction(connection);
                res.status(404).json({ message: 'Profissional nao encontrado' });
            }
    
            // Verifica se o serviço existe
            const [servico] = await connection.query("SELECT * FROM servicos WHERE ID_Servico = ?", [id_servico]);
    
            if (servico.length === 0) {
                await dataBase.rollbackTransaction(connection);
                res.status(404).json({ message: 'Servico nao encontrado' });
            }
    
            // Verifica se a nova associação já existe
            const [existingAssociation] = await connection.query(
                "SELECT * FROM profissionalservicos WHERE ID_Profissional = ? AND ID_Servico = ?",
                [novoID_Profissional, id_servico]
            );
    
            if (existingAssociation.length > 0) {
                await dataBase.rollbackTransaction(connection);
                res.status(400).json({ message: 'A nova associação entre o profissional e o servico ja existe' });
            }
    
            // Atualizar o relacionamento na tabela profissionalservicos
            const result = await connection.query(
                "UPDATE profissionalservicos SET ID_Profissional = ? WHERE ID_Profissional = ? AND ID_Servico = ?",
                [novoID_Profissional, id_profissional, id_servico]
            );
    
            await dataBase.commitTransaction(connection);
            return res.status(200).json({
                message: 'Associação entre profissional e serviço atualizada com sucesso!',
                result
            });
    
        } catch (error) {
            if (connection) {
                await dataBase.rollbackTransaction(connection);
            }
            console.error('Erro ao atualizar a associação entre profissional e serviço:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterProfissionaisPorServico(req, res) {
        const { idServico } = req.params;

        try {
            const profissionais = await profissionaisServicosModel.obterProfissionaisPorServico(idServico);
            if (profissionais.length === 0) {
                return res.status(404).json({ message: 'Nenhum profissional encontrado para este serviço.' });
            }
            return res.status(200).json(profissionais);
        } catch (error) {
            console.error('Erro ao obter profissionais por serviço:', error);
            return res.status(500).json({ message: 'Erro ao buscar profissionais responsáveis pelo serviço.' });
        }
    }

}

module.exports = ProfissionalServicosController;
