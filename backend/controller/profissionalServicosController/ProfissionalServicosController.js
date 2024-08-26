const ProfissionaisServicosModel = require('../model/Entities/profissionaisServicosModel/profissionaisServicosModel');
const DataBase = require('../database');
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
}

module.exports = ProfissionalServicosController;
