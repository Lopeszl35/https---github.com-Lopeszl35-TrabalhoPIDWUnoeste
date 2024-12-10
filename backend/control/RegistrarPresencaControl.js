const AbstractRegistrarPresenca = require("./abstratos/AbstractRegistrarPresenca");
const { validationResult } = require("express-validator");

class RegistrarPresencaControl extends AbstractRegistrarPresenca {
    constructor(registrarPresencaModel) {
        super();
        this.registrarPresencaModel = registrarPresencaModel;
    }

    async buscarAgendamentoPorData(data) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const { data } = req.query
        try {
            if (!data) {
                throw new Error("Data não informada");
            }
            const result = await this.registrarPresencaModel.buscarAgendamentoPorData(data);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao obter agendamentos para data informada, Erro: ", error.message)
            throw error;
        }
    }

    async registrarPresenca(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { idAgendamento, observacoes } = req.query;
        try {
            if(!idAgendamento) {
                throw new Error("Id agendamento não informado")
            }
           const result = await this.registrarPresencaModel.registrarPresenca(idAgendamento, observacoes);
           return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao registrar presença", error.message);
            throw error;
        }
    }
}

module.exports = RegistrarPresencaControl;